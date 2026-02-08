import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export interface Moment {
  date: string;
  content: string;
  html: string;
  publish_status: 'draft' | 'published' | null;
}

const MOMENTS_DIR = path.join(process.cwd(), 'content', 'moments');

export function getMoments(): Moment[] {
  if (!fs.existsSync(MOMENTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(MOMENTS_DIR);
  const moments = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(MOMENTS_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      // Date from frontmatter, fallback to filename pattern
      const filenameDate = file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
      const date = data.date || filenameDate || new Date().toISOString().split('T')[0];

      const html = markdown.render(content);

      return {
        date: typeof date === 'string' ? date : new Date(date).toISOString().split('T')[0],
        content,
        html,
        publish_status: data.publish_status || null,
      } as Moment;
    })
    .filter((moment) => {
      if (process.env.NODE_ENV === 'production') {
        return moment.publish_status !== 'draft';
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return moments;
}
