## Context

The site currently uses Google Analytics via `@next/third-parties/google` loaded in `_app.tsx`. The GA ID is configured via `NEXT_PUBLIC_GA_ID` environment variable. We want to add GoatCounter as a privacy-friendly alternative that runs alongside GA.

GoatCounter provides a simple script tag:
```html
<script data-goatcounter="https://inspiredit.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

## Goals / Non-Goals

**Goals:**
- Add GoatCounter tracking to all pages
- Run alongside existing Google Analytics
- Load asynchronously to avoid performance impact
- Skip analytics in development mode

**Non-Goals:**
- Removing Google Analytics (future work)
- Creating an abstraction layer for analytics providers
- Server-side analytics or custom event tracking

## Decisions

### Decision: Use Next.js Script component
**Choice**: Use `next/script` with `strategy="afterInteractive"`

**Rationale**: Next.js Script component handles async loading optimally and integrates with the framework's lifecycle. The `afterInteractive` strategy loads the script after hydration, ensuring it doesn't block the page.

**Alternatives considered**:
- Raw `<script>` tag: Would work but doesn't integrate with Next.js optimization
- `beforeInteractive`: Too early, could impact page load
- `lazyOnload`: Too late, might miss page views

### Decision: Hardcode GoatCounter endpoint
**Choice**: Hardcode `https://inspiredit.goatcounter.com/count` directly in the component

**Rationale**: Unlike GA which might vary between environments, GoatCounter has a single endpoint. Keeping it simple avoids unnecessary configuration complexity.

**Alternatives considered**:
- Environment variable: Adds complexity without benefit since the endpoint is fixed
- Config file: Overkill for a single value

### Decision: Add GoatCounter component alongside GoogleAnalytics
**Choice**: Create a `GoatCounter` component and render it next to `GoogleAnalytics` in `_app.tsx`

**Rationale**: Follows the existing pattern used by GoogleAnalytics. Each provider is a separate component, making it easy to add/remove providers later.

## Risks / Trade-offs

**[Risk] Script blocking**: GoatCounter script from external CDN could fail → Mitigation: `async` attribute ensures non-blocking; site works fine if script fails

**[Trade-off] Duplicate analytics**: Running two analytics providers means double the tracking → Accepted: This is intentional for comparison period; can remove GA later

**[Trade-off] No environment variable**: Hardcoded endpoint means code change to switch accounts → Accepted: Account changes are rare; simplicity wins
