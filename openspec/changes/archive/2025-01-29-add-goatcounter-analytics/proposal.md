## Why

Google Analytics is powerful but privacy-invasive and overkill for a personal blog. GoatCounter provides lightweight, privacy-friendly analytics without cookies or GDPR consent banners. Running both in parallel allows comparison before potentially removing GA entirely.

## What Changes

- Add GoatCounter tracking script to all pages
- GoatCounter runs alongside existing Google Analytics (no removal yet)
- No user interaction changes - analytics tracking is invisible to visitors

## Capabilities

### New Capabilities
- `analytics`: Defines how the site tracks visitor analytics, including which providers are enabled and how they're configured

### Modified Capabilities
<!-- None - this is additive to the existing GA setup -->

## Impact

- **Code**: Modify `_app.tsx` to include GoatCounter script alongside GoogleAnalytics component
- **Dependencies**: No new npm packages - GoatCounter uses a simple script tag
- **Privacy**: GoatCounter is cookieless and GDPR-compliant by design
- **Performance**: Minimal - GoatCounter script is ~3KB and async-loaded
