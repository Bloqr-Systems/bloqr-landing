# AGENTS.md — Bloqr Landing

Authoritative guide for AI agents working in this repository. Read this before
making changes, running commands, or generating content.

---

## Project Overview

**Bloqr** is an AI-powered DNS filter list compiler and real-time threat
intelligence service. This repo is the **marketing landing site** — a static
Astro site served via a Cloudflare Worker with static assets.

| Field           | Value                                                               |
| --------------- | ------------------------------------------------------------------- |
| Product tagline | "The privacy you didn't know you needed."                           |
| Repo            | `bloqr-landing`                                                     |
| Owner           | `Bloqr-Systems`                                                     |
| Default branch  | `main`                                                              |
| Deploy target   | Cloudflare Worker with static assets (`src/worker.ts`)              |
| Production URL  | `https://bloqr.dev`                                                 |

---

## Design System

**Filter** is the official name of the Bloqr design system. All visual design, tokens, fonts, assets, and brand documentation are centralized in Filter, published as the `@bloqr/design-system` package (`Bloqr-Systems/bloqr-design-system`). Do not add local brand copies. Refer to it as "Filter" in docs and comments — never just "the design system" in prose.

| Rule | Detail |
|---|---|
| CSS tokens | Import `@bloqr/design-system/styles.css`; never hardcode hex or font-family values |
| Logos & favicons | Reference `@bloqr/design-system/assets/` — no local copies |
| Fonts | Self-hosted via `@bloqr/design-system/fonts/` — never Google Fonts CDN |
| Brand prose | Read `guidelines/BLOQR_BRAND_HANDOFF.md` and `guidelines/BLOQR_DESIGN_LANGUAGE.md` in the design-system repo |
| Dark-first | **Never** use white or light-mode backgrounds — Bloqr is exclusively dark |
| No local brand dir | The `brand/` directory has been removed; do not recreate it |

Runtime CSS custom properties are aliased in `src/styles/global.css`. When styling components, use the `var(--token)` values defined there. If a token is missing, add it to `global.css` as an alias of the corresponding `@bloqr/design-system` property.

---

## Tech Stack

| Layer          | Technology                                             |
| -------------- | ------------------------------------------------------ |
| Framework      | Astro 6 (`output: 'server'` + `@astrojs/cloudflare` adapter; all pages prerendered via `export const prerender = true`) |
| Components     | Svelte 5 (runes syntax)                                |
| Language       | TypeScript (strict mode)                               |
| Styling        | Plain CSS + CSS custom properties (`src/styles/global.css`) |
| Design tokens  | `@bloqr/design-system/styles.css` (canonical source)   |
| Edge runtime   | Cloudflare Worker (`src/worker.ts`) + handler modules in `functions/` |
| Database       | Neon Postgres (waitlist signups)                       |
| CRM            | Apollo.io (contact enrichment, fire-and-forget)        |
| Fonts          | Space Grotesk + JetBrains Mono — self-hosted via `@bloqr/design-system/fonts/` |
| CSP            | SHA-256 auto-hashing via `security.csp` (meta CSP); `applyCSP()` in `src/worker.ts` adds hardening headers |
| Code highlighting | Shiki 4 dual themes (`houston`/`vitesse-light`)     |
| Icons          | `@lucide/svelte` — import icons individually (`import Check from '@lucide/svelte/icons/check'`), never inline `<svg>` markup or emoji as UI icons |

---

## Directory Structure

```
.
├── astro.config.mjs          # Astro 6 config: SSR adapter, Fonts API, CSP, Shiki dual themes
├── wrangler.toml             # Cloudflare Worker config
├── tsconfig.json
├── package.json              # includes @bloqr/design-system dependency
│
├── functions/                # Handler modules imported by src/worker.ts (not auto-routed)
│   ├── waitlist.ts           # POST /waitlist — writes to Neon, enriches via Apollo.io
│   ├── config.ts             # GET /config — site_config reader (public, cached)
│   ├── waitlist/
│   │   └── count.ts          # GET /waitlist/count
│   └── admin/
│       ├── config.ts         # POST /admin/config (requires ADMIN_SECRET)
│       └── blog.ts           # /admin/blog — blog post CRUD handler
│
├── public/                   # Static assets copied verbatim to dist/
│
├── scripts/
│   ├── gen-og.mjs            # OG image generation
│   └── setup-github.sh       # Repo initialisation utility
│
└── src/
    ├── worker.ts             # Cloudflare Worker entry point
    ├── config.ts             # SITE_URL, LINKS, META — single source of truth
    ├── content.config.ts     # Astro 6 Content Layer API: blog + changelog
    ├── env.d.ts              # Astro environment type declarations
    │
    ├── components/           # Svelte 5 components, one per landing page section
    │   ├── BaseHead.astro
    │   ├── Hero.svelte
    │   ├── Problem.svelte
    │   ├── Features.svelte
    │   ├── HowItWorks.svelte
    │   ├── Audiences.svelte
    │   ├── CodeDemo.svelte
    │   ├── Pricing.svelte
    │   ├── CtaBanner.svelte
    │   ├── WaitlistSignup.svelte
    │   ├── Nav.svelte
    │   └── Footer.svelte
    │
    ├── content/
    │   └── blog/             # Blog posts as Markdown
    │
    ├── pages/                # File-based routing — all pages prerendered
    │   ├── index.astro
    │   ├── about.astro
    │   ├── changelog.astro
    │   ├── vpn-myths.astro
    │   ├── privacy.astro
    │   ├── terms.astro
    │   ├── rss.xml.ts
    │   ├── admin/
    │   └── blog/
    │
    └── styles/
        └── global.css        # Runtime CSS custom properties — aliases @bloqr/design-system tokens
```

---

## Commands

| Command             | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `npm install`       | Install dependencies                                                   |
| `npm run dev`       | Astro dev server (HMR; uses Node.js adapter locally)                   |
| `npm run build`     | Build static output to `dist/`                                         |
| `npm run preview`   | Wrangler dev using `wrangler.toml` + `dist/` assets                    |
| `npm run deploy`    | `astro build && wrangler deploy`                                       |
| `npm test`          | Vitest                                                                 |

---

## Environment Variables

| Variable               | Local file  | CF secret | Notes                                                    |
| ---------------------- | ----------- | --------- | -------------------------------------------------------- |
| `DATABASE_URL`         | `.dev.vars` |        | Neon connection string, branch-specific                  |
| `APOLLO_API_KEY`       | `.dev.vars` |        | Apollo.io contact enrichment                             |
| `ADMIN_SECRET`         | `.dev.vars` |        | Required for admin-protected Worker flows                |
| `BETTER_AUTH_SECRET`   | `.dev.vars` |        | Better Auth signing/encryption secret                    |
| `BETTER_AUTH_URL`      | `.dev.vars` | CF env var | Base URL for Better Auth callbacks                      |
| `GITHUB_CLIENT_ID`     | `.dev.vars` |        | GitHub OAuth application client ID                       |
| `GITHUB_CLIENT_SECRET` | `.dev.vars` |        | GitHub OAuth application client secret                   |
| `SITE_URL`             | `.env`      | CF env var | Overrides default in `src/config.ts`                    |

**Never commit `.dev.vars` or any secret.**

---

## Key Patterns & Conventions

### URLs and Metadata

**Always import from `src/config.ts`** — never inline URLs or strings.

```ts
import { SITE_URL, LINKS, META } from "../config";
```

### Svelte Components

- Svelte 5 runes only: `$props()`, `$state()`, `$derived()`, `$effect()`.
- Do **not** use Svelte 4 `export let` syntax.
- Scoped `<style>` block per component.
- Use `var(--token-name)` from `src/styles/global.css` for all design values —
  never hardcode colours, spacing, or font sizes.

### CSS

- All design tokens originate from `@bloqr/design-system/styles.css` and are
  re-aliased as CSS custom properties in `src/styles/global.css` (the `:root` block).
- Class names: BEM-adjacent descriptive names (`.hero__title`, `.features__grid`).
- Do **not** introduce Tailwind, UnoCSS, or any utility-class framework.

### TypeScript

- Strict mode is on — no `// @ts-ignore`.
- Prefer `const`; use explicit type annotations for function parameters.
- Use `unknown` + type narrowing instead of `any`.

### Cloudflare Worker Routing

- All API routes are wired in `src/worker.ts`.
- Keep handlers thin: validate input → write to service → return `Response`.
- Read secrets from the `env` binding passed by the Worker, **not** `process.env`.
- Always set `Content-Type: application/json` and return correct HTTP status codes.
- `applyCSP()` in `src/worker.ts` injects a `Content-Security-Policy` header on every `text/html` response.
- `wrangler.toml` sets `compatibility_flags = ["nodejs_compat"]` — do not remove.

### Astro 6 Fonts API

- Fonts are declared in `astro.config.mjs` using `fontProviders.fontsource()`.
- `<Font cssVariable="--font-display" preload />` tags inject `@font-face` rules at build time.
- `src/styles/global.css` defines fallbacks in `:root`. The Fonts API overrides these.
- **Never hardcode a font family; always use `var(--font-display)` or `var(--font-mono)`.**

### Blog / Content Collections

- The content config is at `src/content.config.ts` (project root).
- Blog posts live in `src/content/blog/` as Markdown files.
- In Astro 6, blog post identifiers use `post.id` (not `post.slug`).
- Use `getCollection('blog')` / `getCollection('changelog')` to query.

---

## Brand Voice — Quick Reference

Full detail: `guidelines/BLOQR_DESIGN_LANGUAGE.md` and `guidelines/BLOQR_COPY_PATTERNS.md`
in `Bloqr-Systems/bloqr-design-system`.

### Core Mantras

| Mantra                             | Context                             |
| ---------------------------------- | ----------------------------------- |
| "Set it. Bloqr it. Forget it."     | Consumer promise — zero maintenance |
| "Bring your own. Or use ours."     | Vendor philosophy — no lock-in      |
| "The privacy you didn't know you needed." | Tagline — universal          |
| "Browsing Hygiene"                 | Our coined concept — not "security" |

### Write

- Short declarative sentences.
- Specific verifiable numbers ("48,291 rules" not "thousands of rules").
- "You"-focused copy — what the reader gains.
- Honest caveats for features not yet shipped ("We're building this").

### Do Not Write

- "Leveraging", "seamlessly", "best-in-class", "enterprise-grade", "game-changing".
- Passive voice when active is possible.
- "Privacy" and "anonymity" interchangeably — they mean different things here.

### The Four Personas

| #   | Persona     | Who They Are                                        |
| --- | ----------- | --------------------------------------------------- |
| 1   | Beneficiary | Everyday consumer — no DNS knowledge, one-switch UX |
| 2   | Pilot       | Power user — self-hosted DNS, technically literate  |
| 3   | Builder     | Developer / list maker — API, library, CLI user     |
| 4   | Ally        | DNS vendor / partner (AdGuard, NextDNS, Pi-hole)    |

---

## Sensitive Areas — Do Not Get These Wrong

| Topic                    | Rule                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| AI vs. list makers       | AI complements human curation — never frames it as a replacement                             |
| DNS vendor relationships | Bloqr is infrastructure that augments every vendor — never adversarial                       |
| Privacy vs. anonymity    | Bloqr improves privacy (data exposure control), not anonymity (identity hiding)              |
| AI opt-in                | Features using personal data must be explicitly opt-in — not buried in a privacy policy      |
| Code on landing page     | Code blocks are intentional and accessible — always pair with "you never need to write this" |

---

## Deployment

Merging to `main` triggers a Cloudflare Worker deployment automatically via CI.

Worker entrypoint: `src/worker.ts`
Deploy command: `npm run deploy`
Static assets (ASSETS binding): `./dist/client/` — Worker bundle: `./dist/server/`

To deploy manually:

```bash
npm run deploy   # astro build && wrangler deploy
```

---

## Critical: Cloudflare Dashboard Is Dangerous

**NEVER add, edit, or delete variables or secrets in the Cloudflare Workers dashboard for adblock-landing.**

Doing so creates a new Worker version with **NO static assets** — the ASSETS binding becomes empty and every request returns "Page not found" immediately.

### Safe alternatives

- **To change plain vars**: edit `wrangler.toml` `[vars]` and merge to `main`.
- **To add or rotate secrets**: use the CLI only:
  ```bash
  wrangler secret put SECRET_NAME
  ```

### Emergency recovery

If the dashboard was used accidentally and the site is broken:
1. CF dashboard → **adblock-landing** → **Deployments**
2. Find the last entry labelled **"Manually deployed"** (a `wrangler deploy` from CI)
3. Click `...` → **Rollback**
4. Re-run CI (`main` branch) to restore the latest code with assets attached

---

## References

- **Filter** — `@bloqr/design-system` (`Bloqr-Systems/bloqr-design-system`) — canonical brand assets, tokens, fonts, guidelines
- `guidelines/BLOQR_DESIGN_LANGUAGE.md` (in design-system repo) — product strategy, personas, voice
- `guidelines/BLOQR_ETHOS.md` (in design-system repo) — privacy philosophy, core promises
- `guidelines/BLOQR_BRAND_HANDOFF.md` (in design-system repo) — visual design spec, canonical `:root` block
- `@bloqr/design-system/styles.css` — CSS entry point; the source of all runtime tokens
- `src/styles/global.css` — runtime CSS custom properties (aliases from design-system)
- `src/config.ts` — canonical URLs, links, and site metadata
