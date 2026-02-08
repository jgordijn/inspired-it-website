## 1. Content Directory & Sample Content

- [ ] 1.1 Create `content/moments/` directory
- [ ] 1.2 Add a sample moment file (e.g., `2025-02-08.md`) with frontmatter and markdown content for development/testing

## 2. Moments Parsing Utility

- [ ] 2.1 Create `src/utils/moments.ts` with `Moment` interface (date, content, html, publish_status)
- [ ] 2.2 Implement `getMoments()` function: read files from `content/moments/`, parse with gray-matter, render markdown with markdown-it
- [ ] 2.3 Implement date extraction (frontmatter `date` field with fallback to filename pattern)
- [ ] 2.4 Implement draft filtering (exclude `publish_status: draft` when `NODE_ENV === 'production'`)
- [ ] 2.5 Implement sorting by date descending (newest first)

## 3. Moments Page

- [ ] 3.1 Create `src/pages/moments/index.tsx` with `getStaticProps` fetching moments data
- [ ] 3.2 Implement date-grouped display with formatted date headings and anchor IDs (`id="YYYY-MM-DD"`)
- [ ] 3.3 Implement date navigation sidebar (sticky on desktop, collapsible on mobile)
- [ ] 3.4 Add empty state message when no moments exist
- [ ] 3.5 Add SEO metadata via Layout component (title, description)

## 4. Navigation Updates

- [ ] 4.1 Add "Moments" link to desktop navigation in `Layout.tsx` (between Blog and About)
- [ ] 4.2 Add "Moments" link to mobile navigation menu in `Layout.tsx`
- [ ] 4.3 Add "Moments" link to footer Quick Links section
- [ ] 4.4 Add `moments-rss.xml` link to footer RSS links

## 5. RSS & Sitemap

- [ ] 5.1 Add moments file reading and parsing to `scripts/generate-static-assets.js` (reuse pattern from blog posts)
- [ ] 5.2 Implement `generateMomentsRss()` function: one RSS item per day, formatted date as title, link to `/moments#YYYY-MM-DD`, content:encoded with full HTML
- [ ] 5.3 Add channel metadata (title, description, atom:link) and BASE_URL support for absolute URLs
- [ ] 5.4 Write `moments-rss.xml` to `public/` directory
- [ ] 5.5 Add `/moments` route to sitemap generation

## 6. Verification

- [ ] 6.1 Run `npm run build` and verify static export succeeds
- [ ] 6.2 Verify `/moments` page renders correctly with sample content
- [ ] 6.3 Verify `moments-rss.xml` is generated with correct content
- [ ] 6.4 Verify sitemap includes `/moments`
- [ ] 6.5 Verify navigation links appear in header, mobile menu, and footer
