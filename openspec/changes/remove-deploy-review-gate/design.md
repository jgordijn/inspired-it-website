## Context

The site is a Next.js static export. All pages are pre-rendered at build time via `getStaticProps`. Draft filtering happens in `src/utils/blog.ts` during `getBlogPosts()`, which runs at build time. The current check is:

```typescript
if (process.env.NODE_ENV === 'production') {
  return post.publish_status !== 'draft';
}
```

Since both test and prod run `npm run build` (which sets `NODE_ENV=production`), drafts are hidden on both environments. The GitHub Actions workflow builds both environments in parallel, deploys test first, then deploys prod — but the `production` GitHub environment has a review gate requiring manual approval.

## Goals / Non-Goals

**Goals:**
- Push to `main` deploys to both test and prod automatically, no manual approval
- Drafts visible on test (softwaremaniac.nl), hidden on prod (inspired-it.nl)
- Local `npm run dev` continues to show drafts (development behavior unchanged)
- The draft filtering mechanism is reusable by future content types (e.g., moments)

**Non-Goals:**
- Changing the blog post format or frontmatter schema
- Adding new draft states beyond `draft` / `published` / `null`
- Changing the deployment infrastructure (rclone, Fastmail hosting)

## Decisions

### Decision 1: Use `SHOW_DRAFTS` environment variable instead of `NODE_ENV`

**Choice:** Replace `process.env.NODE_ENV === 'production'` check with `process.env.SHOW_DRAFTS === 'true'`.

**Rationale:** `NODE_ENV` is controlled by Next.js — `npm run build` always sets it to `production`, `npm run dev` sets it to `development`. We can't use it to distinguish between test and prod builds. A dedicated env var is explicit and independent of the build tool.

**Alternatives considered:**
- `NEXT_PUBLIC_SHOW_DRAFTS`: Not needed — draft filtering runs in `getStaticProps` (server/build-time only), not in client-side code. Using `NEXT_PUBLIC_` would unnecessarily expose the flag in the client bundle.
- `BASE_URL` check (e.g., `if BASE_URL includes 'softwaremaniac'`): Couples draft logic to URL configuration. Fragile — breaks if URLs change.
- Separate `NODE_ENV` values: Not possible — Next.js enforces `production` for builds.

**Logic change:**
```typescript
// Before
if (process.env.NODE_ENV === 'production') {
  return post.publish_status !== 'draft';
}
return true;

// After
if (process.env.SHOW_DRAFTS === 'true') {
  return true;
}
return post.publish_status !== 'draft';
```

The default behavior flips: drafts are hidden by default, shown only when explicitly opted in. This is safer — if `SHOW_DRAFTS` is accidentally omitted, drafts stay hidden rather than leaking to production.

### Decision 2: Extract draft filtering into a reusable utility

**Choice:** Extract the draft check into a shared function in `src/utils/blog.ts` (e.g., `shouldShowDrafts()` or `isDraftVisible()`) so future content types (moments) can reuse it.

**Rationale:** The moments feature will need identical draft filtering. A shared function avoids duplicating the env var check.

### Decision 3: Remove GitHub environment protection rules

**Choice:** Remove the required reviewers from the `production` GitHub environment settings. The workflow YAML itself doesn't need changes for this — the gate is configured in GitHub repo settings, not in the workflow file.

**Rationale:** The workflow already has the correct deployment sequence (test deploys before prod). The only gate is the environment protection rule requiring manual approval.

### Decision 4: Clean up debug logging in prod build step

**Choice:** Remove the `DEBUG:` echo statements from the production build step in the workflow while we're touching the file.

**Rationale:** These were added for troubleshooting GA integration and are no longer needed. Keeps the workflow clean.

## Risks / Trade-offs

**[Risk: Accidental draft publication]** → Mitigated by the "hidden by default" approach. If `SHOW_DRAFTS` is missing or misconfigured, drafts are hidden. Only an explicit `SHOW_DRAFTS=true` reveals them.

**[Risk: Local dev shows drafts differently]** → In `npm run dev`, `SHOW_DRAFTS` is not set, so drafts would be hidden by default. Need to set `SHOW_DRAFTS=true` in local dev. Can add to `scripts/deploy-test.sh` and document in README, or set in `.env.development`.

**[Risk: Forgetting to remove GitHub environment protection]** → This is a manual step in GitHub settings. Will be documented as a task with explicit instructions.

**[Trade-off: `SHOW_DRAFTS` in `.env.development`]** → Adding `SHOW_DRAFTS=true` to a `.env.development` file means local dev automatically shows drafts without needing to remember to set it. Minor: adds a dotenv file, but it's a standard Next.js pattern.
