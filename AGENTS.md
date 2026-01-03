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

## Project Type
Next.js 14 static site export with TypeScript, React 18, Tailwind CSS. Markdown-based blog with gray-matter frontmatter.

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
