
# Agent Guide for Inspired IT Website

Use 'bd' for task tracking

## Build & Development
- **Dev server**: `npm run dev` (http://localhost:3000)
- **Build**: `npm run build` (generates static site in `out/`)
- **Type check**: `npx tsc --noEmit`
- **No test framework configured** - this is a static blog site

## Deployment

Each environment requires its own build because RSS/sitemap URLs are baked in at build time.

- **Deploy to TEST**: `./scripts/deploy-test.sh`
  - Builds with `BASE_URL=https://www.softwaremaniac.nl`
  - Deploys to `SoftwaremaniacWebsite:` rclone remote
  - Site: https://www.softwaremaniac.nl

- **Deploy to PROD**: `./scripts/deploy-prod.sh`
  - Builds with `BASE_URL=https://inspired-it.nl`
  - Deploys to `InspiredITWebsite:` rclone remote
  - Site: https://inspired-it.nl

- **Full instructions**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Infrastructure & DNS

**CRITICAL: Do NOT enable Cloudflare proxy (orange cloud) for inspired-it.nl**

The website is hosted by **Fastmail** (via `web.fastmail.com`). Cloudflare is used for DNS only.

### Why DNS-only mode is required:
- Fastmail provisions and manages SSL certificates for custom domains
- If Cloudflare proxies traffic, it terminates TLS and presents its own certificate
- This breaks Fastmail's certificate provisioning and domain verification
- The site will fail to load properly with proxying enabled

### DNS Records that MUST stay "DNS only" (gray cloud):
- `inspired-it.nl` CNAME → `web.fastmail.com`
- `www` CNAME → `web.fastmail.com`
- `*` (wildcard) CNAME → `web.fastmail.com`
- All MX records (email)
- All DKIM records (`fm1._domainkey`, etc.)

### Consequence:
Cloudflare analytics will show zero traffic - this is expected. Use Google Analytics or Fastmail's stats for traffic data.

## Project Type
Next.js 16 static site export (`output: 'export'`) with TypeScript (strict mode), React 19, Tailwind CSS 3.3. Markdown-based blog with gray-matter frontmatter, markdown-it with highlight.js for syntax highlighting, Mermaid diagrams, and GFM admonitions.

## Code Style

### Imports
- Use `@/` path alias for `src/` imports (`@/components/Layout`, `@/utils/blog`)
- Order: React/Next imports, third-party, local modules, types

### TypeScript
- Strict mode enabled - all types must be explicit
- Interface for component props: `interface ComponentProps { children: React.ReactNode }`
- Export interfaces used by multiple files

### React Components
- Functional components with TypeScript interfaces for props
- Default exports for pages/components: `export default function Component() {}`
- Named exports for utilities: `export function utilityFunction() {}`

### Naming
- Files: kebab-case for content (`blog-post.md`), PascalCase for components (`Layout.tsx`)
- Components: PascalCase (`BlogPost`, `Layout`)
- Functions/variables: camelCase (`getBlogPosts`, `allTags`)
- Constants: UPPER_SNAKE_CASE (`BLOG_DIR`)

### Styling
- Tailwind CSS utility classes only - no custom CSS except in `globals.css`
- Responsive: `className="text-lg lg:text-xl"`

### Error Handling
- Defensive checks: `if (!fs.existsSync(BLOG_DIR)) return []`
- Graceful fallbacks: `data.title || 'Untitled'`

## Writing Style
- **Tone**: Conversational, personal, slightly humorous, "tech enthusiast" but grounded.
- **Structure**: Short, punchy paragraphs. Use rhetorical questions to engage the reader.
- **Perspective**: First-person ("I").
- **Content**: Use specific examples, screenshots, and dialogues where possible.
- **Ending**: End with a clear end. It can be a reflective question or thought or a conclusing sentence.

## Project Structure

```
├── content/blog/          # Markdown blog posts (YYYY-MM-DD-slug.md)
├── public/                # Static assets (images, logo, favicon)
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Next.js pages (file-based routing)
│   └── utils/             # Utility functions (blog.ts, seo.ts)
├── scripts/               # Build and deployment scripts
└── out/                   # Generated static site (git-ignored)
```

## Architecture Patterns

- **Static Site Generation (SSG)**: All pages pre-rendered at build time
- **File-based Content**: Blog posts as markdown files with frontmatter
- **Component Composition**: Reusable Layout component wraps all pages
- **Utility Functions**: Shared logic in `src/utils/` (blog parsing, SEO helpers)

## Blog Post Format

```markdown
---
title: Post Title
description: Brief description for SEO
date: '2025-01-25'
author: Jeroen Gordijn
tags:
  - Tag1
  - Tag2
cover: /images/cover-image.png
publish_status: draft  # Optional, omit or set 'published' for live posts
---

Content here...
```

## Content Constraints

- Draft posts (`publish_status: draft`) are hidden in production
- Blog posts sorted by date (newest first)
- Reading time calculated automatically (200 words/minute)

## Domain Context

**Author**: Jeroen Gordijn - Software consultant since 2005, specializing in:
- AI-assisted development advocacy
- Software architecture (Domain-Driven Design, Ports & Adapters)
- Reactive programming (Project Reactor, Akka)
- Kotlin/Java ecosystem

**Content Focus**:
- AI coding tools and workflows (Claude, GitHub Copilot, OpenSpec)
- Technical deep-dives on reactive streams, Kotlin vs Java
- Software engineering practices and patterns
- Industry observations and commentary

## Analytics

- Google Analytics configured in production
- Cloudflare analytics NOT available (DNS-only mode) - use Google Analytics or Fastmail stats
