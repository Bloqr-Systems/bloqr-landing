---
title: "Bloqr 0.81: pricing tiers, account dashboard, and early-access discounts"
description: "Account tiers are live. Here's what each tier includes, how Cloudflare billing is wired up, and what early-access subscribers get that everyone else won't."
pubDate: 2026-04-28
author: "Bloqr Team"
category: "release"
tags: ["release", "pricing", "billing", "cloudflare", "accounts"]
draft: false
---

0.81 is out. The headline is pricing — the one question we've gotten most since we first announced Bloqr. Here's the full picture.

## Account tiers

We're launching with three tiers: **Free**, **Personal**, and **Team**.

**Free** is a real tier, not a bait-and-switch. You get:

- Up to 3 devices
- 5 compiled filter lists (up to 500,000 rules each)
- Community filter list presets (Hagezi, OISD, EasyList, Steven Black)
- DNS-over-HTTPS and DNS-over-TLS
- 30-day query log retention

This covers the vast majority of individual users who just want ad blocking and tracker protection to work without configuration overhead.

**Personal** ($4/month, billed annually) adds:

- Unlimited devices
- Unlimited compiled filter lists
- Custom rule builder (up to 2,500 custom rules)
- AI threat list — live threat intelligence updated continuously, not just on a release schedule
- 90-day query log retention
- Priority support

**Team** ($12/seat/month, billed annually) adds everything in Personal plus:

- Shared filter lists and rules across the organization
- Role-based access control
- Audit log (who changed what, when)
- 1-year query log retention
- API access with higher rate limits
- Dedicated Slack channel during onboarding

Enterprise pricing for larger deployments is available — reach out via the contact form.

## Early-access subscriber pricing

If you're on the waitlist and have received an early-access invite, your pricing is locked at **50% off Personal for the life of your account**. That's $2/month forever, regardless of where pricing goes in the future. This is a thank-you for tolerating the rough edges of a pre-GA product — you gave us signal during the critical months, and we want to make sure that's worth something.

The discount is applied automatically when you complete signup. It appears on your first invoice and will continue as long as the account is active.

## How billing works

We're using Cloudflare's billing infrastructure. There's no Stripe integration, no separate billing dashboard to log into. Subscriptions are managed through the same Cloudflare account you likely already have if you're an API user.

Monthly and annual billing are both supported. Annual billing is discounted — the prices above are annual pricing. Monthly rates are slightly higher.

You can cancel at any time from the dashboard. Cancellation takes effect at the end of the current billing period. No data is deleted immediately on cancellation — you have 30 days to export before anything is removed.

## Usage limits vs. hard limits

We're not going to cut off your DNS resolution if you go over a query limit. That would break your internet, and we're not in the business of breaking your internet.

What happens instead: if you're consistently on Free and your usage suggests Personal would serve you better, we'll notify you in the dashboard and via email. Soft limits give us room to have a conversation rather than just throwing an error.

## What's next

**0.82** — Clerk auth removal completes. AI threat list moves from beta to GA for Personal and Team subscribers. Natural language rule builder enters beta: describe what you want to block in plain English, get a rule.

**0.83** — Self-hosted deployment guide, DNS-over-HTTPS endpoint (your own DoH resolver, not shared infrastructure), DNS filtering service integration.

---

The full pricing page is at [bloqr.ai/pricing](/pricing). Questions about Team or Enterprise? Use the contact form and someone on the team will respond directly.
