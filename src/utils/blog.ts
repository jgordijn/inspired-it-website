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
    // Helper to escape HTML special characters
    const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => 
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c)
    );

    // Mermaid diagrams: output escaped code with special class for client-side rendering
    // The Mermaid library reads textContent which auto-unescapes the HTML entities
    if (lang === 'mermaid') {
      return '<pre class="mermaid-diagram">' + escapeHtml(str) + '</pre>';
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (__) { }
    }
    // Escape special HTML characters for unknown languages
    return '<pre class="hljs"><code>' + escapeHtml(str) + '</code></pre>';
  },
});

// Custom plugin to handle GFM alerts / admonitions w/ icons and fixed title duplication
type MdToken = ReturnType<InstanceType<typeof MarkdownIt>['parse']>[0];
interface StateCore {
  tokens: MdToken[];
  Token: new (type: string, tag: string, nesting: number) => MdToken;
}
function admonitions(md: InstanceType<typeof MarkdownIt>) {
  md.core.ruler.push('admonition', (state: StateCore) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'blockquote_open') continue;

      const openIndex = i;
      let contentIndex = -1;

      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].type === 'blockquote_close') break;
        if (tokens[j].type === 'inline') {
          contentIndex = j;
          break;
        }
      }

      if (contentIndex === -1) continue;

      const inlineToken = tokens[contentIndex];
      const content = inlineToken.content;

      // Match [!TYPE] Title text (ensure we don't cross newlines)
      const match = content.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\](?:[ \t]+(.*))?$/im);

      if (match) {
        const type = match[1].toLowerCase();
        // Capture title text if present, else capitalize type
        const titleText = match[2] || type.charAt(0).toUpperCase() + type.slice(1);

        const icons: Record<string, string> = {
          note: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>',
          tip: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>',
          info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>',
          warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
          important: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>',
          caution: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>',
        };
        const iconHtml = icons[type] || icons['note'];

        tokens[openIndex].type = 'admonition_open';
        tokens[openIndex].tag = 'div';
        tokens[openIndex].attrs = [['class', `admonition admonition-${type}`]];

        let closeIndex = -1;
        let depth = 1;
        for (let j = openIndex + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'blockquote_open') depth++;
          else if (tokens[j].type === 'blockquote_close') {
            depth--;
            if (depth === 0) {
              closeIndex = j;
              break;
            }
          }
        }

        if (closeIndex !== -1) {
          tokens[closeIndex].type = 'admonition_close';
          tokens[closeIndex].tag = 'div';
        }

        // Cleanup: remove the marker and title from the inline content (the header line)
        // We filter out all tokens until we hit a softbreak or hardbreak
        if (inlineToken.children) {
          const newChildren = [];
          let foundBreak = false;
          for (const child of inlineToken.children) {
            if (foundBreak) {
              newChildren.push(child);
            } else if (child.type === 'softbreak' || child.type === 'hardbreak') {
              foundBreak = true;
              // Optional: if you want to remove the newline after title, don't push this break.
              // If you push it, the body content will start with a newline (which HTML might ignore or treat as space).
              // Let's drop the break so content starts flush.
            }
          }
          inlineToken.children = newChildren;
        }

        const titleToken = new state.Token('html_block', '', 0);
        titleToken.content = `<div class="admonition-title">${iconHtml}${titleText}</div><div class="admonition-content">`;
        tokens.splice(openIndex + 1, 0, titleToken);

        const closeContentToken = new state.Token('html_block', '', 0);
        closeContentToken.content = '</div>';
        // closeIndex + 1 to account for inserted title token
        tokens.splice(closeIndex + 1, 0, closeContentToken);

        i++;
      }
    }
  });
}

markdown.use(admonitions);

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
  publish_status?: 'draft' | 'published';
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function shouldShowDrafts(): boolean {
  return process.env.SHOW_DRAFTS === 'true';
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
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
        publish_status: data.publish_status || null,
      } as BlogPost;
    })
    .filter((post) => {
      if (shouldShowDrafts()) {
        return true;
      }
      return post.publish_status !== 'draft';
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

// Add IDs and anchor links to headings for linking
function addHeadingIds(html: string): string {
  const linkIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heading-anchor-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>';
  
  return html.replace(/<h([2-6])([^>]*)>(.*?)<\/h\1>/g, (match, level, attrs, content) => {
    const slug = slugify(content.replace(/<[^>]*>/g, ''));
    const anchorLink = `<a href="#${slug}" class="heading-anchor" aria-label="Link to this section">${linkIcon}</a>`;
    return `<h${level} id="${slug}"${attrs}>${content}${anchorLink}</h${level}>`;
  });
}

export function markdownToHtml(markdownText: string): string {
  return markdown.render(markdownText);
}

export function hasMermaidDiagrams(html: string): boolean {
  return html.includes('class="mermaid-diagram"');
}

export function hasLanguageTabs(html: string): boolean {
  return html.includes('<lang-tabs>');
}
