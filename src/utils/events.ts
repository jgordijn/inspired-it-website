import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export interface EventItem {
  slug: string;
  title: string;
  dates: string[];
  description: string;
  descriptionHtml: string;
  image: string | null;
  imageAlt: string;
  imageCredit: string | null;
  publish_status: 'draft' | 'published' | null;
}

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events');

function parseDates(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((d) => (typeof d === 'string' ? d : new Date(d).toISOString().split('T')[0]));
  }
  if (typeof raw === 'string') {
    return [raw];
  }
  return [];
}

export function getEvents(): EventItem[] {
  if (!fs.existsSync(EVENTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(EVENTS_DIR);
  const events = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(EVENTS_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      const slug = file.replace(/\.md$/, '');
      const dates = parseDates(data.dates || data.date);

      // Description can come from frontmatter or body content
      const descriptionSource = data.description || content;
      const descriptionHtml = markdown.render(descriptionSource);

      return {
        slug,
        title: data.title || 'Untitled',
        dates,
        description: descriptionSource,
        descriptionHtml,
        image: data.image || null,
        imageAlt: data.image_alt || data.title || 'Event image',
        imageCredit: data.image_credit || null,
        publish_status: data.publish_status || null,
      } as EventItem;
    })
    .filter((event) => {
      if (process.env.NODE_ENV === 'production') {
        return event.publish_status !== 'draft';
      }
      return true;
    })
    // Sort by latest date descending (upcoming first)
    .sort((a, b) => {
      const latestA = Math.max(...a.dates.map((d) => new Date(d).getTime()));
      const latestB = Math.max(...b.dates.map((d) => new Date(d).getTime()));
      return latestB - latestA;
    });

  return events;
}
