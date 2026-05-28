---
title: "Bloqr 0.82: Clerk is out, AI threat list is GA, and a natural language rule builder"
description: "The auth migration completes. AI threat intelligence moves from beta to generally available. And you can now describe what you want to block in plain English — no syntax required."
pubDate: 2026-05-20
author: "Bloqr Team"
category: "release"
tags: ["release", "auth", "ai", "better-auth", "natural-language", "rule-builder"]
draft: false
---

0.82 is live. Three significant changes.

## Clerk is gone

The Better Auth migration that started in 0.80 is complete. Clerk has been fully removed from the auth chain. If you signed up during the 0.80 or 0.81 window and were on a Clerk-backed session, you've been migrated automatically — your session data moved to Neon, and you shouldn't have noticed a thing.

What this means in practice: authentication now runs entirely on infrastructure we control. Session validation happens in the same Cloudflare Worker request that processes your API call. There's no external auth service in the critical path, no round-trip to a third-party SaaS, and no dependency on Clerk's uptime.

For developers building on the Bloqr API: the auth token format is unchanged. If you're using API keys, nothing changes at all. If you're using session-based auth from a browser client, the only visible change is that the session cookie domain is now `bloqr.ai` exclusively.

## AI threat list: general availability

The AI threat list has been in beta since 0.80 shipped. It's now GA for all Personal and Team subscribers.

What changed between beta and GA:

- **Reduced false positive rate** — we tuned the classification threshold after reviewing beta flagging patterns. A small number of legitimate domains in unusual TLDs were over-triggering. That's been corrected.
- **Infrastructure reliability** — the classification pipeline now runs with redundant workers. During the beta, there were three brief windows where the live feed lagged due to single-point failures. Those are gone.
- **Audit log integration** — Team tier subscribers can now see AI threat list decisions in the audit log. When a domain is blocked by the AI classifier (not a static list), the entry shows classification confidence and which feature categories drove the decision.

The AI threat list is included in Personal and Team automatically. There's nothing to enable. If you were in the beta, you're already on the GA model.

## Natural language rule builder (beta)

This is the new thing. You can now describe what you want to block — in plain English — and get a filter rule.

A few examples of what works today:

> "Block all social media tracking but keep social share buttons working"

> "Block YouTube recommendations and autoplay but keep YouTube itself working"

> "Block all cookie consent popup domains without breaking cookie preferences on sites I use"

The rule builder generates Adblock Plus-compatible filter rules that Bloqr compiles into your DNS configuration. The output is fully inspectable — you can see exactly what rule was generated before it goes live, and edit it if you want to adjust the scope.

This is a beta. There are edge cases where the generated rule is too broad, too narrow, or just wrong. The review step before activation is there because of exactly this. We're collecting feedback on where the outputs are good and where they need work.

To access the rule builder: dashboard → Rules → New Rule → Describe in plain language.

The feature requires a Personal or Team subscription.

## What's next

**0.83** — Self-hosted deployment guide. Your own DNS-over-HTTPS resolver endpoint. DNS filtering service integration (configure Bloqr's compiled lists directly in AdGuard Home, Pi-hole, and similar setups without leaving our dashboard). Target: late June.

---

Full changelog at [bloqr.ai/changelog](/changelog). The [GitHub repo](https://github.com/jaypatrick/adblock-compiler) has the tRPC API changes if you're building on the type-safe client.
