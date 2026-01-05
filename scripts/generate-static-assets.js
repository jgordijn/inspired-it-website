const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const BASE_URL = process.env.BASE_URL || 'https://inspired-it.nl';
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function getBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const filePath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Jeroen Gordijn',
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover || null,
        content,
        html: markdown.render(content),
        publish_status: data.publish_status || null,
      };
    })
    .filter((post) => post.publish_status !== 'draft')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
}

function generateSitemap(posts) {
  const staticRoutes = ['', '/blog', '/about', '/contact'];
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    ...staticRoutes.map((route) => {
      const loc = route ? `${BASE_URL}${route}` : BASE_URL;
      const priority = route === '' ? '1.0' : '0.8';
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    }),
    ...posts.map((post) => {
      return `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <priority>0.7</priority>
  </url>`;
    }),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return mimeTypes[ext] || null;
}

function isLocalPath(coverPath) {
  const trimmed = coverPath.trim();
  // Reject scheme-relative URLs (//example.com)
  if (trimmed.startsWith('//')) {
    return false;
  }
  // Reject URLs with schemes (http:, https:, ftp:, file:, data:, etc.)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return false;
  }
  // Reject backslashes (Windows paths / escape attempts)
  if (trimmed.includes('\\')) {
    return false;
  }
  return true;
}

function getMediaData(coverPath) {
  if (!coverPath) {
    return null;
  }

  // Only accept local paths (reject URLs, schemes, etc.)
  if (!isLocalPath(coverPath)) {
    return null;
  }

  // Normalize path: ensure leading slash for URL, strip it for local path
  const normalizedPath = coverPath.startsWith('/') ? coverPath : `/${coverPath}`;
  const localPath = path.resolve(PUBLIC_DIR, normalizedPath.slice(1));

  // Ensure resolved path is within PUBLIC_DIR (prevent path traversal)
  const resolvedPublicDir = path.resolve(PUBLIC_DIR);
  const relativePath = path.relative(resolvedPublicDir, localPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null;
  }

  let stats;
  try {
    stats = fs.statSync(localPath);
  } catch {
    return null;
  }

  // Ensure it's a file, not a directory
  if (!stats.isFile()) {
    return null;
  }

  const type = getMimeType(normalizedPath);
  if (!type) {
    return null;
  }

  const url = escapeXml(`${BASE_URL}${normalizedPath}`);
  const fileSize = String(stats.size);

  return {
    url,
    fileSize,
    type,
  };
}

function generateRss(posts) {
  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');
      const mediaData = getMediaData(post.cover);

      // Convert relative URLs to absolute URLs in content
      let absoluteHtml = post.html
        .replace(/src="\//g, `src="${BASE_URL}/`)
        .replace(/href="\//g, `href="${BASE_URL}/`);

      // Remove the first H1 from content as it duplicates the RSS item title
      absoluteHtml = absoluteHtml.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '');

      if (mediaData) {
        // Prepend cover image to content so it's picked up as the main image by readers
        const coverImageHtml = `<img src="${mediaData.url}" alt="${escapeXml(post.title)}" style="width:100%; display:block; margin-bottom: 20px;" />`;
        absoluteHtml = coverImageHtml + absoluteHtml;
      }

      return `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.description)}</description>
    <content:encoded><![CDATA[${absoluteHtml}]]></content:encoded>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>contact@inspired-it.nl (${escapeXml(post.author)})</author>
    ${categories}
  </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Inspired IT - Technical Blog</title>
    <link>${BASE_URL}</link>
    <description>AI Development Advocate insights, architecture patterns, and technical expertise from Jeroen Gordijn</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function main() {
  ensurePublicDir();
  const posts = getBlogPosts();

  const sitemap = generateSitemap(posts);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap.trim());

  const rss = generateRss(posts);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss.trim());
}

main();
