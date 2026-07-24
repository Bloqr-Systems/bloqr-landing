/**
 * Site configuration — single source of truth for all external URLs.
 *
 * ── URL Migration Guide ────────────────────────────────────────────────────
 * Current (production): bloqr.dev subdomain scheme
 *
 * To migrate to a new domain in the future:
 *   1. Update the URL constants in EXTERNAL_URLS below (4 values)
 *   2. Update CANONICAL_DOMAIN below
 *   3. Update wrangler.toml [[routes]] pattern
 *   4. Run `npm run build && wrangler deploy`
 *   No other files need changes — all components consume from LINKS.
 * ────────────────────────────────────────────────────────────────
 */

// ── External service URLs — edit these to change domains ──────────────────────
// These are the ONLY values that need updating for a domain migration.
const EXTERNAL_URLS = {
  /** Landing page / this site */
  landing: 'https://bloqr.dev',
  /** Angular app frontend */
  app:     'https://app.bloqr.dev',
  /** Backend API worker */
  api:     'https://api.bloqr.dev',
  /** mdBook documentation site */
  docs:    'https://docs.bloqr.dev',
} as const;

/**
 * The canonical production domain. Used by the Worker to set
 * `X-Robots-Tag: noindex, nofollow` on responses from non-canonical hosts.
 */
// Future domain: bloqr.ai (update CANONICAL_DOMAIN and EXTERNAL_URLS.landing when ready)
export const CANONICAL_DOMAIN = 'bloqr.dev';

/**
 * SITE_URL — the canonical URL of this landing site.
 * Read from the SITE_URL build-time env var if set (Cloudflare Pages dashboard),
 * falls back to the value in EXTERNAL_URLS.
 */
export const SITE_URL: string =
  (typeof import.meta.env !== 'undefined'
    ? (import.meta.env.SITE_URL as string | undefined)
    : undefined) ?? EXTERNAL_URLS.landing;

/**
 * PLAUSIBLE_HOST — canonical Plausible Analytics script host.
 *
 * Used by BaseHead.astro for the preconnect hint and by Analytics.astro for
 * the script src. Centralised here so a proxy migration only needs one edit.
 */
export const PLAUSIBLE_HOST = 'https://plausible.io';
/** Bare hostname extracted from PLAUSIBLE_HOST — used for dns-prefetch hints. */
export const PLAUSIBLE_HOSTNAME = new URL(PLAUSIBLE_HOST).hostname;

/**
 * POSTHOG_HOST — subdomain reverse-proxy for PostHog analytics.
 *
 * All PostHog event/decide/asset requests are routed through this first-party
 * subdomain so they are not blocked by ad blockers. The Cloudflare Worker
 * (src/worker.ts) routes requests arriving on this hostname to
 * handlePostHogProxy (functions/posthog-proxy.ts).
 *
 * This value must stay in sync with:
 *   - wrangler.toml  [[routes]]  pattern = "f.bloqr.dev"
 *   - src/components/PostHog.astro  api_host (consumed via define:vars)
 */
export const POSTHOG_HOST = 'https://f.bloqr.dev';

/**
 * POSTHOG_UI_HOST — canonical PostHog cloud host for toolbar and OAuth flows.
 *
 * PostHog splits traffic between two hosts:
 *   - api_host  (POSTHOG_HOST)    — event ingestion, routed through the
 *                                   first-party proxy so ad blockers can't
 *                                   fingerprint the destination.
 *   - ui_host   (POSTHOG_UI_HOST) — toolbar JS, session replay links, and
 *                                   OAuth callbacks that must reach PostHog
 *                                   cloud directly. Cannot be proxied because
 *                                   the proxy only handles /ingest/* routes.
 *
 * This value must stay in sync with:
 *   - src/components/PostHog.astro  ui_host (consumed via define:vars)
 */
export const POSTHOG_UI_HOST = 'https://us.i.posthog.com';

/**
 * LINKS — all external and internal URLs consumed by components and pages.
 * Internal routes (blog, changelog, etc.) stay as relative paths — never absolute.
 */
export const LINKS = {
  // ── External services (update via EXTERNAL_URLS above) ────────────────────
  app:    EXTERNAL_URLS.app,
  api:    EXTERNAL_URLS.api,
  docs:   EXTERNAL_URLS.docs,
  // ── Third-party ─────────────────────────────────────────────────────────
  github:  'https://github.com/Bloqr-Systems/bloqr-compiler',
  jsr:     'https://jsr.io/@bloqr-systems/bloqr-bloqr-compiler',
  author:  'https://jaysonknight.com',
  bloqrSystems: 'https://bloqr.systems', // TODO(jayson): update once the Bloqr Systems site URL is finalized
  // ── Internal routes ───────────────────────────────────────────────────────
  vpnMyths:      '/vpn-myths',
  whyNotPrivate: '/why-not-private',
  about:         '/about',
  blog:          '/blog',
  changelog:     '/changelog',
  pricing:       '/pricing',
  test:          '/test',
  rss:           '/rss.xml',
  privacy:       '/privacy',
  terms:         '/terms',
} as const;

/**
 * CHANGELOG_URL — raw URL for the upstream CHANGELOG.md.
 * Used by the changelog Content Layer loader at build time.
 * Centralised here so a repo move only requires a single edit.
 */
export const CHANGELOG_URL =
  'https://raw.githubusercontent.com/Bloqr-Systems/bloqr-compiler/refs/heads/main/CHANGELOG.md?token=GHSAT0AAAAAAEA7GST7GHTWUAWPF3IKVFEQ2SABVAQ';

/**
 * PAGE_META — canonical title and description for static content pages.
 *
 * These values are the single source of truth consumed by:
 *   1. The page's own <BaseHead> `title` / `description` props.
 *   2. The prerendered per-page OG image generator (`/og/[page].png`).
 *
 * Keeping them here prevents the two consumers from drifting.
 */
export const PAGE_META = {
  home: {
    title:       "Bloqr AI — The privacy you didn't know you needed.",
    description: 'AI-powered adblock list management and real-time threat intelligence. Block ads, trackers, and malware at the network level — without routing your traffic anywhere.',
  },
  about: {
    title:       'About Bloqr AI — Why We Exist',
    description: "Bloqr started as a two-minute automation task that exposed a twenty-year gap at the center of consumer internet privacy. Here's the story.",
  },
  changelog: {
    title:       "Bloqr AI Changelog — What's New",
    description: 'A running log of every Bloqr release: features added, bugs fixed, things we broke and fixed again.',
  },
  'vpn-myths': {
    title:       'Consumer VPN Myths, Examined — Bloqr AI',
    description: "A sourced, honest look at what consumer VPNs actually do — and don't do. Fingerprinting, DNS, jurisdiction, vendor lock-in, and more.",
  },
  'why-not-private': {
    title:       "Why Your Browsing Isn't as Private as You Think — Bloqr AI",
    description: "HTTPS encrypts your page content. But your DNS lookups — the \"where is this website?\" requests your device makes thousands of times a day — travel unencrypted. Here's what that means.",
  },
  blog: {
    title:       'Bloqr AI Blog — Education, Industry News & Releases',
    description: 'DNS blocking explainers for everyday users, VPN incident coverage, and feature release notes from the Bloqr team.',
  },
  pricing: {
    title:       'Pricing — Bloqr AI',
    description: 'Transparent subscription pricing for every audience — personal, developer, and vendor. Starting at $3.99/month. Usage above plan limits billed via Stripe.',
  },
  test: {
    title:       'Ad Blocker Test — See How Exposed You Are — Bloqr AI',
    description: 'Test your exposure to ads and trackers. Compare performance with and without Bloqr enabled. See real-time metrics showing how much time you save.',
  },
} as const;

/**
 * Static metadata — used at build time for <title>, OG tags, and the manifest.
 * title/description are derived from PAGE_META.home so there is a single source of truth.
 */
export const META = {
  title:       PAGE_META.home.title,
  description: PAGE_META.home.description,
  ogImage:     '/og-image.png',
} as const;

// ── TypeScript types for site_config keys ─────────────────────────────────────
export type SiteConfigKey =
  | 'SITE_URL'
  | 'APP_URL'
  | 'DOCS_URL'
  | 'API_URL'
  | 'JSR_URL'
  | 'GITHUB_URL'
  | 'AUTHOR_URL'
  | 'PRODUCT_NAME'
  | 'PRODUCT_TAGLINE'
  | 'OG_IMAGE_PATH';

export type SiteConfig = Record<SiteConfigKey, string>;

/**
 * getConfig() — reads from Neon `site_config` at runtime when DATABASE_URL is
 * available, otherwise returns the EXTERNAL_URLS-derived fallbacks.
 * Static/prerendered pages use LINKS above at build time.
 *
 * **Callers MUST pass `databaseUrl` explicitly** — in Cloudflare Workers, env
 * vars are available only on the `env` binding (not `process.env`), so always
 * call `getConfig(env.DATABASE_URL)` from a Worker handler.
 *
 * The `process.env` fallback exists only for Node.js script contexts such as
 * the migration script (`scripts/migrate-site-config.ts`), where `process.env`
 * is available. It will never be set in a Worker invocation.
 */
export async function getConfig(databaseUrl?: string): Promise<SiteConfig> {
  const DEFAULTS: SiteConfig = {
    SITE_URL:        SITE_URL,
    APP_URL:         EXTERNAL_URLS.app,
    DOCS_URL:        EXTERNAL_URLS.docs,
    API_URL:         EXTERNAL_URLS.api,
    JSR_URL:         'https://jsr.io/@bloqr-systems/bloqr-bloqr-compiler',
    GITHUB_URL:      'https://github.com/Bloqr-Systems/bloqr-compiler',
    AUTHOR_URL:      'https://jaysonknight.com',
    PRODUCT_NAME:    'Bloqr AI',
    PRODUCT_TAGLINE: "The privacy you didn't know you needed.",
    OG_IMAGE_PATH:   '/og-image.png',
  };

  const url =
    databaseUrl ??
    (typeof process !== 'undefined' && typeof process.env !== 'undefined'
      ? process.env.DATABASE_URL
      : undefined);

  if (!url) return { ...DEFAULTS };

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    const rows = (await sql`
      SELECT key, value FROM site_config
    `) as { key: string; value: string }[];
    const config = { ...DEFAULTS };
    for (const row of rows) {
      if (row.key in config) {
        (config as Record<string, string>)[row.key] = row.value;
      }
    }
    return config;
  } catch (err) {
    console.warn('getConfig: failed to read site_config from DB, using fallbacks.', err);
    return { ...DEFAULTS };
  }
}
