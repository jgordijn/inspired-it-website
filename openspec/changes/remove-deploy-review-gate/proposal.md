## Why

The current deployment workflow has a manual review gate on the production GitHub environment, requiring approval before deploying to production. This adds friction to publishing without adding safety — content visibility should be controlled via draft status (drafts visible on test/softwaremaniac.nl, hidden on prod/inspired-it.nl). However, currently draft filtering checks `NODE_ENV === 'production'`, and since both test and prod use `npm run build` (which sets `NODE_ENV=production`), drafts are hidden on both environments. This defeats the purpose of having a test environment for previewing draft content.

Removing the review gate and fixing draft visibility means: push to `main` → immediate deploy to both environments → drafts visible on test for preview, hidden on prod. Drafts become the sole publishing control.

## What Changes

- **Remove production review gate** — pushing to `main` deploys straight through to test and production with no manual approval step
- **Fix draft filtering** — replace `NODE_ENV` check with an explicit environment variable (e.g., `SHOW_DRAFTS=true`) that is set only in the test build, so drafts show on test but remain hidden on production
- **Update build configurations** — test build sets `SHOW_DRAFTS=true`, production build does not

## Capabilities

### New Capabilities
- `deploy-pipeline`: The GitHub Actions deployment workflow — builds and deploys to test and production on every push to `main`, with no manual review gate. Production deploy runs automatically after successful test deploy.

### Modified Capabilities
- `blog-parsing`: Draft filtering changes from checking `NODE_ENV` to checking an explicit `SHOW_DRAFTS` environment variable. This also applies to any future content types (e.g., moments) that reuse the same pattern.

## Impact

- **Modified code**: `src/utils/blog.ts` — draft filter logic
- **Modified CI/CD**: `.github/workflows/deploy.yml` — add `SHOW_DRAFTS=true` to test build step
- **Modified scripts**: `scripts/deploy-test.sh` — add `SHOW_DRAFTS=true`
- **GitHub Settings**: Production environment protection rules need to be updated manually (remove required reviewers)
- **No breaking changes** to published content — only draft visibility on test changes
