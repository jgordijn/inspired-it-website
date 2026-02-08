## 1. Draft Filtering Logic

- [x] 1.1 Add `shouldShowDrafts()` utility function to `src/utils/blog.ts` that returns `process.env.SHOW_DRAFTS === 'true'`
- [x] 1.2 Replace `process.env.NODE_ENV === 'production'` check in `getBlogPosts()` filter with `shouldShowDrafts()` — default to hiding drafts, show only when `SHOW_DRAFTS=true`
- [x] 1.3 Create `.env.development` with `SHOW_DRAFTS=true` so local dev continues to show drafts

## 2. Build Configuration

- [x] 2.1 Add `SHOW_DRAFTS=true` to the test build step in `.github/workflows/deploy.yml`
- [x] 2.2 Verify production build step does NOT set `SHOW_DRAFTS`
- [x] 2.3 Add `SHOW_DRAFTS=true` to `scripts/deploy-test.sh`
- [x] 2.4 Remove `DEBUG:` echo statements and diagnostic `grep` from the production build step in `.github/workflows/deploy.yml`

## 3. GitHub Environment Settings

- [x] 3.1 Remove required reviewers from the `production` environment in GitHub repo settings (Settings → Environments → production → remove protection rules). This is a manual step, not a code change.

## 4. Verification

- [x] 4.1 Run `npm run build` locally (without `SHOW_DRAFTS`) and verify draft posts are excluded from the output
- [x] 4.2 Run `SHOW_DRAFTS=true npm run build` locally and verify draft posts are included in the output
- [x] 4.3 Run `npm run dev` locally and verify draft posts are visible (via `.env.development`)
