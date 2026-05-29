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

// ── Audience types ────────────────────────────────────────────────────────────

export type AudienceId = 'personal' | 'developer' | 'vendor';

export interface Audience {
  id: AudienceId;
  label: string;
}

export interface AudienceTier {
  name: string;
  price: string;
  period: string;
  aside: string;
  tagline: string;
  cta: string;
  href: string;
  featured?: boolean;
  items: string[];
}

export interface PricingAddon {
  group: string;
  name: string;
  price: string;
}

// ── Comparison table types ────────────────────────────────────────────────────

export type PricingComparisonPlanId = 'starter' | 'devPro' | 'vendor' | 'enterprise';

export type PricingFeatureRow = {
  label: string;
} & Record<PricingComparisonPlanId, string | boolean>;

// ── Audience selector ─────────────────────────────────────────────────────────

export const PRICING_AUDIENCES: Audience[] = [
  { id: 'personal',  label: 'Personal' },
  { id: 'developer', label: 'Developer' },
  { id: 'vendor',    label: 'Vendor / Business' },
];

// ── Tier cards by audience ────────────────────────────────────────────────────

export const PRICING_TIERS_BY_AUDIENCE: Record<AudienceId, AudienceTier[]> = {
  personal: [
    {
      name:     'Starter',
      price:    '$3.99',
      period:   '/month',
      aside:    'Less than a streaming rental.',
      tagline:  'For households who just want it handled.',
      cta:      'Get started',
      href:     LINKS.app,
      featured: false,
      items: [
        'Web API / SaaS — fully managed',
        'AI-curated filter list maintained for you',
        'Works with NextDNS, AdGuard, Pi-hole & more',
        '50 compiles/day · 2,000 rules/compile',
        '2 filter sources',
        '30-day output retention',
        'Weekly threat list updates',
        'Community support',
      ],
    },
    {
      name:     'Plus',
      price:    '$7.99',
      period:   '/month',
      aside:    'Roughly the price of a decent coffee.',
      tagline:  'More sources, more DNS integrations, more control.',
      cta:      'Get started',
      href:     LINKS.app,
      featured: false,
      items: [
        'Everything in Starter',
        '200 compiles/day · 10,000 rules/compile',
        '5 filter sources',
        '3 DNS provider integrations',
        '90-day output retention',
        'Email notifications for major incidents',
        'Email support',
      ],
    },
    {
      name:     'Premium',
      price:    '$14.99',
      period:   '/month',
      aside:    'The full personal experience.',
      tagline:  'Natural language rules + REST API included.',
      cta:      'Get started',
      href:     LINKS.app,
      featured: true,
      items: [
        'Everything in Plus',
        '500 compiles/day · 25,000 rules/compile',
        '10 filter sources',
        'Natural language rule builder included',
        'REST API access included',
        'Full config export (JSON/YAML)',
        'Priority email support',
      ],
    },
  ],
  developer: [
    {
      name:     'Dev',
      price:    '$9.99',
      period:   '/month',
      aside:    'Build without limits on calls.',
      tagline:  'CLI and REST API — all unlocked.',
      cta:      'Start building',
      href:     LINKS.app,
      featured: false,
      items: [
        'Web API/SaaS + CLI build tools',
        'REST API access',
        '1,000 compiles/day · 50,000 rules/compile',
        '10 filter sources',
        'Basic custom pipelines',
        '90-day output retention',
        'Email support',
      ],
    },
    {
      name:     'Dev Pro',
      price:    '$24.99',
      period:   '/month',
      aside:    'The full pipeline — locally and in the cloud.',
      tagline:  'SDK license + streaming + async API included.',
      cta:      'Start building',
      href:     LINKS.app,
      featured: true,
      items: [
        'Everything in Dev',
        'SDK license for local library embedding',
        'Web APIs callable from local SDK (usage billed)',
        'Streaming API + async/batch API included',
        '200 compiles/day · 100,000 rules/compile',
        'Unlimited filter sources',
        'Full transformation pipeline suite',
        'Priority queue · priority threat intelligence',
        '1-year output retention',
        'Priority email support',
      ],
    },
    {
      name:     'Dev Enterprise',
      price:    '$49.99',
      period:   '/month',
      aside:    'Unlimited scale. Guaranteed uptime.',
      tagline:  'Full suite, SLA, and dedicated support.',
      cta:      'Contact us',
      href:     '/#waitlist',
      featured: false,
      items: [
        'Everything in Dev Pro',
        'Unlimited compiles/day',
        'Unlimited rules per compile',
        'All API modes (REST, streaming, async, batch)',
        'SLA — 99.9% uptime guaranteed',
        '2-year output retention',
        'Dedicated support channel (Slack or email)',
        'Custom pipeline consulting',
      ],
    },
  ],
  vendor: [
    {
      name:     'Vendor',
      price:    '$29.99',
      period:   '/month',
      aside:    'Pipeline-first for teams and products.',
      tagline:  'Multi-instance, resource consumption, API marketplace.',
      cta:      'Contact us',
      href:     '/#waitlist',
      featured: false,
      items: [
        'All Dev features',
        '500 compiles/day',
        'Resource-based consumption (Cloudflare usage included)',
        'Multi-instance management',
        'REST + async API included',
        'API marketplace listing (when live)',
        'Invoice billing available',
        'Priority queue',
        '90-day output retention',
        'Email support',
      ],
    },
    {
      name:     'Vendor Pro',
      price:    '$79.99',
      period:   '/month',
      aside:    'The full stack — edge-deployed and SLA-backed.',
      tagline:  'Cloudflare edge + full pipeline suite + dedicated support.',
      cta:      'Contact us',
      href:     '/#waitlist',
      featured: true,
      items: [
        'Everything in Vendor',
        'Cloudflare edge deployment',
        'Streaming API + full pipeline suite',
        'SDK license for local embedding',
        'Web APIs from SDK (usage billed)',
        'Priority threat intelligence feed',
        '2-year output retention',
        'SLA — 99.9% uptime',
        'Dedicated support channel',
      ],
    },
    {
      name:     'Enterprise',
      price:    'Custom',
      period:   '',
      aside:    'White-label. Custom SLA. Dedicated infra.',
      tagline:  'For high-volume vendors and OEM integrators.',
      cta:      'Talk to us',
      href:     '/#waitlist',
      featured: false,
      items: [
        'Everything in Vendor Pro',
        'Unlimited compiles + custom rate limits',
        'White-label / OEM options',
        'Custom integrations',
        'Dedicated infrastructure',
        'Custom SLA negotiated',
        'Dedicated account manager',
      ],
    },
  ],
};

// ── À la carte add-ons ────────────────────────────────────────────────────────

export const PRICING_ADDONS: PricingAddon[] = [
  { group: 'API access',       name: 'REST API',                  price: '$2.99/mo' },
  { group: 'API access',       name: 'Streaming API',             price: '$4.99/mo' },
  { group: 'API access',       name: 'Async / batch API',         price: '$3.99/mo' },
  { group: 'Compiler',         name: 'SDK license (local embed)', price: '$9.99/mo' },
  { group: 'Compiler',         name: 'CLI build tools',           price: '$1.99/mo' },
  { group: 'Compiler',         name: 'Natural language rules',    price: '$3.99/mo' },
  { group: 'Compiler',         name: 'Custom pipelines',          price: '$4.99/mo' },
  { group: 'Compiler',         name: 'Priority threat intel',     price: '$4.99/mo' },
  { group: 'Infrastructure',   name: 'Priority queue',            price: '$2.99/mo' },
  { group: 'Infrastructure',   name: '1-year output retention',   price: '$2.99/mo' },
  { group: 'Infrastructure',   name: 'Multi-instance mgmt',       price: '$3.99/mo' },
  { group: 'Infrastructure',   name: 'Cloudflare edge deploy',    price: '$9.99/mo' },
  { group: 'DNS integrations', name: 'NextDNS',                   price: '$1.99/mo' },
  { group: 'DNS integrations', name: 'AdGuard Home',              price: '$1.99/mo' },
  { group: 'DNS integrations', name: 'Pi-hole',                   price: '$1.99/mo' },
  { group: 'DNS integrations', name: 'Cloudflare Gateway',        price: '$2.99/mo' },
  { group: 'DNS integrations', name: 'Custom DNS provider',       price: '$2.99/mo' },
  { group: 'Support',          name: 'Priority email support',    price: '$4.99/mo' },
  { group: 'Support',          name: 'SLA (99.9% uptime)',        price: '$9.99/mo' },
  { group: 'Support',          name: 'Dedicated support channel', price: '$19.99/mo' },
];

// ── Feature comparison table ──────────────────────────────────────────────────

export const PRICING_FEATURE_ROWS: PricingFeatureRow[] = [
  { label: 'Monthly price (personal)',    starter: '$3.99',     devPro: '$24.99',                      vendor: false,                         enterprise: false },
  { label: 'Monthly price (business)',    starter: '$5.99',     devPro: '$29.99',                      vendor: '$39.99',                      enterprise: 'Custom' },
  { label: 'Deployment model',            starter: 'SaaS',      devPro: 'SaaS + SDK',                  vendor: 'SaaS + SDK + Edge',           enterprise: 'All' },
  { label: 'Compiles/day',                starter: '50',        devPro: '200',                         vendor: '500',                         enterprise: 'Unlimited' },
  { label: 'Rules per compile',           starter: '2,000',     devPro: '100,000',                     vendor: '100,000',                     enterprise: 'Unlimited' },
  { label: 'Filter sources/compile',      starter: '2',         devPro: 'Unlimited',                   vendor: 'Unlimited',                   enterprise: 'Unlimited' },
  { label: 'REST API',                    starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Streaming API',               starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Async / batch API',           starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'CLI build tools',             starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'SDK license (local embed)',   starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Web APIs from local SDK',     starter: false,       devPro: 'Yes (usage fees apply)',      vendor: 'Yes (usage fees apply)',      enterprise: 'Yes (usage fees apply)' },
  { label: 'Custom pipelines',            starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Natural language rules',      starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Priority threat intel',       starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'AST storage',                 starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'Output retention',            starter: '30 days',   devPro: '1 year',                      vendor: '2 years',                     enterprise: 'Custom' },
  { label: 'Multi-instance management',   starter: false,       devPro: false,                         vendor: true,                          enterprise: true },
  { label: 'Cloudflare edge deploy',      starter: false,       devPro: false,                         vendor: 'Add-on',                      enterprise: true },
  { label: 'Priority queue',              starter: false,       devPro: true,                          vendor: true,                          enterprise: true },
  { label: 'SLA',                         starter: false,       devPro: false,                         vendor: '99.9%',                       enterprise: 'Custom' },
  { label: 'API marketplace listing',     starter: false,       devPro: 'Coming soon',                 vendor: 'Coming soon',                 enterprise: 'Coming soon' },
  { label: 'Invoice billing',             starter: false,       devPro: false,                         vendor: true,                          enterprise: true },
  { label: 'Support',                     starter: 'Community', devPro: 'Priority email',              vendor: 'Dedicated',                   enterprise: 'Dedicated + Slack' },
];
