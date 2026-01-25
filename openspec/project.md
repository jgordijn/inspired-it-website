# Project Context

## Purpose

Professional blog and portfolio website for Jeroen Gordijn (Inspired IT). The site showcases expertise in AI-assisted development, software architecture, and serves as a platform for technical blog posts about reactive programming, Kotlin, AI workflows, and software engineering practices.

**Goals:**
- Publish technical blog content with markdown-based authoring
- Showcase professional expertise and consulting services
- Build thought leadership in AI-assisted software development
- Provide contact information for potential clients

## Tech Stack

- **Framework**: Next.js 16 with static site export (`output: 'export'`)
- **Language**: TypeScript (strict mode)
- **UI**: React 19 with functional components
- **Styling**: Tailwind CSS 3.3 (utility-first, no custom CSS except globals.css)
- **Content**: Markdown files with gray-matter frontmatter
- **Markdown Processing**: markdown-it with highlight.js for syntax highlighting
- **Features**: RSS feed generation, sitemap, Mermaid diagrams, GFM admonitions

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

## Project Conventions

### Code Style

**Imports:**
- Use `@/` path alias for `src/` imports (`@/components/Layout`, `@/utils/blog`)
- Order: React/Next imports, third-party, local modules, types

**TypeScript:**
- Strict mode enabled - all types must be explicit
- Interface for component props: `interface ComponentProps { children: React.ReactNode }`
- Export interfaces used by multiple files

**React Components:**
- Functional components with TypeScript interfaces for props
- Default exports for pages/components: `export default function Component() {}`
- Named exports for utilities: `export function utilityFunction() {}`

**Naming:**
- Files: kebab-case for content (`blog-post.md`), PascalCase for components (`Layout.tsx`)
- Components: PascalCase (`BlogPost`, `Layout`)
- Functions/variables: camelCase (`getBlogPosts`, `allTags`)
- Constants: UPPER_SNAKE_CASE (`BLOG_DIR`)

**Styling:**
- Tailwind CSS utility classes only - no custom CSS except in `globals.css`
- Responsive: `className="text-lg lg:text-xl"`

**Error Handling:**
- Defensive checks: `if (!fs.existsSync(BLOG_DIR)) return []`
- Graceful fallbacks: `data.title || 'Untitled'`

### Architecture Patterns

- **Static Site Generation (SSG)**: All pages pre-rendered at build time
- **File-based Content**: Blog posts as markdown files with frontmatter
- **Component Composition**: Reusable Layout component wraps all pages
- **Utility Functions**: Shared logic in `src/utils/` (blog parsing, SEO helpers)

### Blog Post Format

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

### Writing Style (Blog Posts)

- **Tone**: Conversational, personal, slightly humorous, "tech enthusiast" but grounded
- **Structure**: Short, punchy paragraphs. Use rhetorical questions to engage the reader
- **Perspective**: First-person ("I")
- **Content**: Use specific examples, screenshots, and dialogues where possible
- **Ending**: End with a clear conclusion - reflective question or thought

### Testing Strategy

No test framework configured - this is a static blog site. Quality is ensured through:
- TypeScript strict mode (`npx tsc --noEmit`)
- Build verification (`npm run build`)
- Manual testing on dev server (`npm run dev`)

### Git Workflow

- Feature branches for new work
- Commits should be atomic and descriptive
- Use `bd` for task tracking

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

## Important Constraints

**Infrastructure:**
- Hosted on Fastmail static hosting (NOT Cloudflare-proxied)
- DNS on Cloudflare in DNS-only mode (gray cloud) - CRITICAL
- Cloudflare proxy breaks Fastmail SSL certificate provisioning

**Build Considerations:**
- RSS/sitemap URLs are baked in at build time
- Separate builds required for TEST and PROD environments
- BASE_URL environment variable controls generated URLs

**Content:**
- Draft posts (publish_status: draft) hidden in production
- Blog posts filtered by date (newest first)
- Reading time calculated automatically (200 words/minute)

## External Dependencies

**Hosting:**
- Production: inspired-it.nl (via Fastmail `web.fastmail.com`)
- Test: softwaremaniac.nl (via Fastmail)
- DNS: Cloudflare (DNS-only mode)

**Deployment:**
- rclone remotes: `InspiredITWebsite:`, `SoftwaremaniacWebsite:`
- Deploy scripts: `./scripts/deploy-prod.sh`, `./scripts/deploy-test.sh`

**Analytics:**
- Google Analytics (configured in production)
- Cloudflare analytics NOT available (DNS-only mode)

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build static site to out/
npx tsc --noEmit     # Type check
./scripts/deploy-test.sh   # Deploy to test environment
./scripts/deploy-prod.sh   # Deploy to production
```
