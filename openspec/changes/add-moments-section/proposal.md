## Why

The blog works well for long-form, polished posts — but there's no place for quick observations, links, and ponderings that don't warrant a full article. A "Moments" section fills that gap: a low-friction microblog for short notes, interesting links, and thoughts captured in the moment. This mirrors a pattern seen on other developer blogs (e.g., aishepherd.nl/moments/) and fits naturally with the site's personal, conversational tone.

## What Changes

- **New `/moments` page** — a single scrollable page showing all moments grouped by date (newest first), with a "jump to date" navigation
- **New content format** — markdown files in `content/moments/` with a simple structure: date-based entries with short markdown content
- **New navigation item** — "Moments" added to the site header/footer navigation
- **Separate RSS feed** — `/moments-rss.xml` so blog subscribers aren't flooded with micro-posts
- **Draft support** — moments respect the same draft filtering as blog posts (hidden in production when marked as draft)

## Capabilities

### New Capabilities
- `moments-parsing`: Parsing moment entries from markdown files in `content/moments/`, extracting dates, and sorting by date (newest first). Includes draft filtering.
- `moments-page`: The `/moments` page displaying all moments grouped by date with a date navigation/archive sidebar. Inherits site theming via the existing Layout component.
- `moments-rss`: A separate RSS 2.0 feed at `/moments-rss.xml` publishing each day's moments as a feed entry.

### Modified Capabilities
- `site-layout`: Navigation updated to include "Moments" link in both desktop and mobile menus, and footer quick links.

## Impact

- **New directory**: `content/moments/` for moment markdown files
- **New utility**: `src/utils/moments.ts` for parsing moment content
- **New pages**: `src/pages/moments/index.tsx`
- **New script**: RSS generation for moments (alongside existing blog RSS)
- **Modified components**: `Layout.tsx` (navigation links)
- **Modified SEO**: Sitemap updated to include `/moments`
- **No breaking changes** to existing blog functionality
