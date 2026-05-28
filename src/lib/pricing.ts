/**
 * Canonical pricing data — single source of truth for all Bloqr plan definitions.
 *
 * ── Sync note ────────────────────────────────────────────────────────────────
 * When changing plans, prices, or limits here, you MUST also update the
 * mirrored model in bloqr-compiler:
 *   frontend/src/app/models/pricing.model.ts
 *
 * The compiler repo cannot import this file at runtime (different deploy
 * target), so the two files are kept in sync manually. The comment at the top
 * of pricing.model.ts points back here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { LINKS } from '../config';

export interface PricingTier {
  id: 'personal' | 'payg' | 'power' | 'dev';
  name: string;
  price: string;
  period: string;
  aside: string;
  tagline: string;
  cta: string;
  href: string;
  featured?: boolean;
  payg?: boolean;
  external?: boolean;
  items: string[];
}

export interface PricingFeatureRow {
  label: string;
  free: string | boolean;
  payg: string | boolean;
  pro: string | boolean;
  vendor: string | boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'personal',
    name: 'Personal',
    price: '~$5',
    period: '/month',
    aside: 'Roughly the price of a decent coffee.',
    tagline: 'For households who just want it handled.',
    cta: 'Join the waitlist',
    href: '/#waitlist',
    featured: false,
    items: [
      'AI-curated filter list, maintained for you',
      'Works with NextDNS, AdGuard, Pi-hole & more',
      'Multi-device coverage (whole network)',
      'Weekly threat list updates',
      'Email notifications for major incidents',
    ],
  },
  {
    id: 'payg',
    name: 'Pay As You Go',
    price: 'Usage-based',
    period: '',
    aside: 'No subscription. No commitment.',
    tagline: 'Try the full pipeline before you commit. Pay for what you use — billed by API and resource consumption via Stripe.',
    cta: 'Start now — no signup',
    href: `${LINKS.pricing}#payg`,
    featured: false,
    payg: true,
    items: [
      'No account required to start',
      'Up to 50,000 rules per compile',
      'Up to 5 filter sources per job',
      '500 compiles/day max',
      '7-day output retention',
      'Charged via Stripe — no crypto',
      'Auto-upsell to Pro when it saves you money',
    ],
  },
  {
    id: 'power',
    name: 'Power User',
    price: '~$9',
    period: '/month',
    aside: 'Less than one mediocre cocktail.',
    tagline: 'For people who have opinions about Hagezi vs. OISD.',
    cta: 'Join the waitlist',
    href: '/#waitlist',
    featured: true,
    items: [
      'Everything in Personal',
      'Custom transformation pipelines',
      'Natural language rule builder',
      'Multi-instance management',
      'API access + JSR package',
      'Priority threat intelligence feed',
      'Full config export (JSON/YAML, version-controllable)',
    ],
  },
  {
    id: 'dev',
    name: 'Developer / Self-Hosted',
    price: 'Free',
    period: 'open-source',
    aside: "GPL-3.0. It's yours.",
    tagline: "Run it yourself. We won't be weird about it.",
    cta: 'View on GitHub',
    href: LINKS.github,
    featured: false,
    external: true,
    items: [
      'Full compiler source on GitHub',
      'Deno + Node.js + Cloudflare Workers compatible',
      'Self-host anywhere',
      'JSR package: @jk-com/adblock-compiler',
      'OpenAPI spec included',
      'Community support',
    ],
  },
];

export const PRICING_FEATURE_ROWS: PricingFeatureRow[] = [
  { label: 'Monthly price',            free: '$0',           payg: 'Usage-based',  pro: '~$9/mo',    vendor: 'Custom' },
  { label: 'Compiles/day',             free: '1,000',        payg: '500',          pro: 'Unlimited', vendor: 'Unlimited' },
  { label: 'Rules per compile',        free: '10,000',       payg: '50,000',       pro: 'Unlimited', vendor: 'Unlimited' },
  { label: 'Filter sources/compile',   free: '3',            payg: '5',            pro: 'Unlimited', vendor: 'Unlimited' },
  { label: 'AST storage',              free: false,          payg: false,          pro: true,        vendor: true },
  { label: 'Batch API',                free: false,          payg: false,          pro: true,        vendor: true },
  { label: 'Multi-format translation', free: false,          payg: false,          pro: true,        vendor: true },
  { label: 'Output retention',         free: '90 days',      payg: '7 days',       pro: '90 days',   vendor: '365 days' },
  { label: 'Custom pipelines',         free: false,          payg: false,          pro: true,        vendor: true },
  { label: 'Priority queue',           free: false,          payg: false,          pro: false,       vendor: true },
  { label: 'SLA',                      free: false,          payg: false,          pro: false,       vendor: true },
  { label: 'API marketplace listing',  free: 'Coming soon',  payg: 'Coming soon',  pro: 'Coming soon', vendor: 'Coming soon' },
  { label: 'Support',                  free: 'Community',    payg: 'Community',    pro: 'Email',     vendor: 'Dedicated' },
];
