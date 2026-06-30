# Contributing to bloqr-landing

This repo is the Bloqr marketing site (`bloqr.dev`) — an Astro 6 + Svelte 5 site served via a Cloudflare Worker. Read `AGENTS.md` before making changes; this guide covers the pull request process specifically.

## Before you start

- Read `AGENTS.md` in full, especially the Design System and Sensitive Areas sections.
- Read `SECURITY_INCIDENT.md`. This repo has had a real credential-exposure incident (a Cloudflare API token committed via `.dev.vars`). **Never commit `.dev.vars` or any secret** — see AGENTS.md's Environment Variables table for where each secret belongs.
- All visual design, tokens, fonts, and brand assets come from `@bloqr/design-system`. Do not add local brand copies or hardcode colors/fonts — use `var(--token-name)` from `src/styles/global.css`.

## Pull request process

1. **Branch from `main`.**
2. **Make your change.**
3. **Run tests and a build locally:**

   ```bash
   npm test
   npm run build
   ```

4. **Open a PR against `main`.** GitHub auto-populates the default template. If your change is **content-only** (a new/updated blog post, changelog entry, or copy edit with no code changes), switch to the lighter `content` template from the "Preview" dropdown on the PR compare page (or append `?expand=1&template=content.md` to the compare URL):

   | Template | File | Use for |
   |---|---|---|
   | Default | `.github/pull_request_template.md` | Any code change: components, pages, Worker/API, config, dependencies |
   | Content | `.github/PULL_REQUEST_TEMPLATE/content.md` | Blog posts, changelog entries, copy-only edits — no code |

   A filled-out, on-template description is **required** — the "PR Template Check" CI job (`.github/workflows/pr-template-check.yml`) fails the PR if the description is empty, is left as the unedited template boilerplate, or has fewer than 20 characters of real content.

5. **Address review feedback.** Merging to `main` triggers an automatic Cloudflare Worker deployment, so reviews are the last checkpoint before production.

## Secrets and credentials

Every PR template includes a secrets/credential-safety checklist. Before requesting review, confirm:

- No `.dev.vars`, `.env`, API keys, tokens, or connection strings appear in the diff.
- You never used `git add -f` to force-add an ignored file.
- New secrets are added via `wrangler secret put SECRET_NAME` (or `.dev.vars` locally) and documented in `AGENTS.md`'s Environment Variables table — never hardcoded, never read from `process.env` in Worker code (use the `env` binding).

If a secret is ever accidentally committed, follow the recovery steps in `SECURITY_INCIDENT.md`: rotate the credential immediately, then purge it from git history.

## Cloudflare dashboard warning

**Never edit variables or secrets directly in the Cloudflare Workers dashboard.** Doing so creates a new Worker version with no static assets attached, breaking the live site. Use `wrangler.toml` `[vars]` for plain vars and `wrangler secret put` for secrets — see AGENTS.md's "Critical: Cloudflare Dashboard Is Dangerous" section for emergency recovery steps if this happens.

## Design system compliance

Per `AGENTS.md`, every UI change must:

- Use `var(--token-name)` from `src/styles/global.css` — no hardcoded hex/rgb or font-family strings.
- Reference logos/fonts/assets from `@bloqr/design-system`, never local copies or external CDNs.
- Preserve dark-first styling — no white/light-mode backgrounds.
- Use Svelte 5 runes (`$props()`, `$state()`, `$derived()`, `$effect()`) — not Svelte 4 `export let`.
- Avoid introducing Tailwind, UnoCSS, or any utility-class framework.

## Worker / API changes

Changes to `src/worker.ts` or `functions/` must:

- Validate input before use.
- Read secrets from the Worker `env` binding, never `process.env`.
- Return `Content-Type: application/json` with correct HTTP status codes for API responses.
- Leave `compatibility_flags = ["nodejs_compat"]` in `wrangler.toml` untouched unless the change is intentional and explained in the PR.

## Brand voice

Content and copy changes should follow `guidelines/BLOQR_COPY_PATTERNS.md` and `guidelines/BLOQR_DESIGN_LANGUAGE.md` in the `bloqr-design-system` repo — short declarative sentences, specific verifiable numbers, "you"-focused copy, and avoidance of forbidden vocabulary ("leveraging", "seamlessly", "best-in-class", "enterprise-grade", "game-changing"). See AGENTS.md's "Sensitive Areas" table for topics that need careful framing (AI vs. list makers, DNS vendor relationships, privacy vs. anonymity).

## Testing

```bash
npm test          # Vitest
npm run build     # Astro build to dist/
npm run dev       # local dev server for manual verification
npm run preview   # wrangler dev — use this to verify Worker/CSP changes
```
