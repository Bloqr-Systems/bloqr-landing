## Description

<!-- Brief description of what this PR does and why. Link related issues with "Closes #NNN". -->

## Area(s) changed

- [ ] `src/components/` — Svelte 5 components
- [ ] `src/pages/` — Astro pages / routing
- [ ] `src/worker.ts` / `functions/` — Cloudflare Worker entry point & API handlers
- [ ] `src/content/` / `src/content.config.ts` — blog/changelog content
- [ ] `src/styles/global.css` — design token aliases
- [ ] `astro.config.mjs` / `wrangler.toml` / `tsconfig.json` — build & deploy config
- [ ] `scripts/` — build/ops scripts
- [ ] Dependencies (`package.json`)

> If this is a content-only change (new/updated blog post, changelog entry, copy edit — no code), consider using the [`content`](?expand=1&template=content.md) template instead — pick it from the "Preview" dropdown when opening the PR.

## Secrets & credential safety

This repo had a real incident where a Cloudflare API token was committed in `.dev.vars` (see `SECURITY_INCIDENT.md`). Confirm before merging:

- [ ] No `.dev.vars`, `.env`, API keys, tokens, or connection strings are present in this diff
- [ ] No `git add -f` was used to force-add an ignored file
- [ ] Any new environment variable is read via the Worker `env` binding (or `.dev.vars`/CF secret locally), never hardcoded or read from `process.env`
- [ ] Any new secret is documented in `AGENTS.md`'s Environment Variables table

## Worker / API checklist

<!-- Skip this section if your change doesn't touch src/worker.ts or functions/ -->

- [ ] N/A — no Worker/API changes
- [ ] Input is validated before use
- [ ] Secrets are read from the `env` binding, not `process.env`
- [ ] Responses set `Content-Type: application/json` and correct HTTP status codes
- [ ] `compatibility_flags = ["nodejs_compat"]` in `wrangler.toml` left untouched (or change is intentional and explained below)
- [ ] No new database write path bypasses existing validation (waitlist/Neon, Apollo enrichment)

## Design system compliance (AGENTS.md)

- [ ] Styled with `var(--token-name)` from `src/styles/global.css` — no hardcoded hex/rgb or literal font-family strings
- [ ] No new `brand/`, `theme/`, or local copy of `@bloqr/design-system` content
- [ ] Logos/favicons/OG images referenced from `@bloqr/design-system/assets/` — no local copies
- [ ] Fonts loaded via `@bloqr/design-system/fonts/` — never Google Fonts CDN or another external font CDN
- [ ] Dark-first preserved — no white/light-mode background introduced
- [ ] Svelte components use runes (`$props()`, `$state()`, `$derived()`, `$effect()`) — no Svelte 4 `export let`
- [ ] No Tailwind/UnoCSS/utility-class framework introduced

## Testing

```bash
npm test
npm run build
```

- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] Manually verified in `npm run dev` (and `npm run preview` for Worker/CSP changes)

## Screenshots / Visual diff

<!-- Required for any change to src/components/, src/pages/, or src/styles/global.css. -->

## Notes for reviewers

<!-- Anything the reviewer should know that isn't obvious from the diff? -->
