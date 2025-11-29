import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    // Escape special HTML characters
    return '<pre class="hljs"><code>' +
           str.replace(/[&<>"]/g, (c) => {
             return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c;
           }) +
           '</code></pre>';
  },
});

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover: string | null;
  content: string;
  html: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace('.md', '');
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: rawContent } = matter(content);
      let html = markdown.render(rawContent);
      html = addHeadingIds(html);
      const readingTime = Math.ceil(rawContent.split(/\s+/).length / 200);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Jeroen Gordijn',
        tags: data.tags || [],
        cover: data.cover || null,
        content: rawContent,
        html,
        readingTime,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((post) => post.slug);
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];

  const allPosts = getBlogPosts().filter((p) => p.slug !== slug);
  
  const scored = allPosts.map((p) => {
    let score = 0;
    
    // Score based on shared tags
    const sharedTags = post.tags.filter((tag) => p.tags.includes(tag)).length;
    score += sharedTags * 10;
    
    // Slightly prefer recent posts
    const daysDiff = Math.abs(
      new Date(post.date).getTime() - new Date(p.date).getTime()
    ) / (1000 * 60 * 60 * 24);
    score -= daysDiff / 100;
    
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// Helper function to generate URL-friendly slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Add IDs to headings for linking
function addHeadingIds(html: string): string {
  return html.replace(/<h([2-6])([^>]*)>(.*?)<\/h\1>/g, (match, level, attrs, content) => {
    const slug = slugify(content.replace(/<[^>]*>/g, ''));
    return `<h${level} id="${slug}"${attrs}>${content}</h${level}>`;
  });
}

export function markdownToHtml(markdownText: string): string {
  return markdown.render(markdownText);
}
