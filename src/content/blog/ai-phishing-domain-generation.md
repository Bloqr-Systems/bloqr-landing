---
title: "AI is generating phishing domains faster than filter lists can track them"
description: "Threat actors are using LLMs to spin up thousands of convincing lookalike domains per day. Static filter lists can't keep up. Here's what's changing — and why real-time threat intelligence matters now more than ever."
pubDate: 2026-05-08
author: "Jayson Knight"
category: "industry"
tags: ["ai", "phishing", "threat-intelligence", "security", "malware", "dns", "industry-news"]
draft: false
---

For most of the history of DNS-based threat blocking, the threat landscape was relatively static. A malicious domain was registered, it showed up in abuse feeds or researcher reports, filter list maintainers added it to the next update, and users who kept their lists current were protected. The lag time — from domain registration to filter list inclusion — was measured in hours or days. Acceptable.

That model is breaking down.

## The LLM-assisted domain factory

Researchers at several security firms have documented a consistent pattern over the past year: threat actors are using large language models to generate convincing lookalike domains at industrial scale. Not just typosquats — those have existed for decades — but semantically plausible variants that fool both users and automated detection.

The economics are stark. A capable model can generate thousands of plausible phishing domain candidates in minutes. Bulk domain registration services mean the cost to register all of them is measured in tens of dollars. DNS hosting is effectively free. The entire supply chain for a large-scale phishing campaign — domain generation, registration, hosting, and initial traffic — can be bootstrapped for less than the cost of a decent lunch.

The result: campaigns that used to require days of preparation can be stood up in hours, and the domains used are fresh enough that no static filter list has seen them before.

## Why static lists can't keep up

Traditional filter lists are maintained by humans — skilled, dedicated volunteers and professionals, but humans nonetheless. They triage reports from abuse feeds, run automated scans, review submissions, and push updates on a schedule. A well-maintained list like Hagezi or OISD might update several times a day.

Several times a day isn't fast enough when the other side is generating thousands of new domains between your update cycles.

There's also a structural problem: static lists require a domain to have been seen before it can be blocked. A domain registered this morning and used in a campaign this afternoon is invisible to every list that hasn't been updated in the last six hours.

This isn't a criticism of filter list maintainers. They're doing excellent work at the scale that's humanly possible. The problem is that the threat side has automated its supply chain and the defense side largely hasn't.

## What real-time threat intelligence looks like

The alternative is moving threat detection from a list-lookup model to a classification model. Rather than asking "is this domain on a list?", you ask "does this domain look like a threat based on everything we know about how malicious domains are structured?"

This approach can use:

- **Lexical features**: character n-grams, entropy, lookalike distance from legitimate brands
- **Registration metadata**: domain age, registrar patterns, registration velocity in a given TLD
- **Infrastructure signals**: ASN reputation, hosting provider patterns, IP range associations
- **Behavioral signals**: query volume relative to domain age, geographic anomalies

A model trained on these features can classify a never-before-seen domain as high-risk without it appearing on any existing list. The classification happens in milliseconds, in-line with the DNS resolution.

This is what Bloqr's AI threat list does. It runs continuously, not on an update schedule. When a new domain registration pattern matches what we know about malicious infrastructure, it gets flagged immediately — not after a human reviews it.

## What this means for users

If your current DNS blocking setup relies entirely on static filter lists, you have a gap. It's not huge for most personal use cases — the vast majority of malicious domains do eventually appear on reputable lists. But it exists.

For organizations, the gap matters more. Business email compromise and credential harvesting campaigns routinely use fresh domains specifically because they know static lists won't catch them in the first hours of a campaign, and the first hours are when the most damage is done.

The practical recommendation: supplement your static lists with a live threat feed. Whether that's Bloqr's AI list, a commercial threat intelligence feed integrated into your DNS resolver, or another solution — the key is classification that doesn't depend on prior sightings.

---

*Bloqr's AI threat list is included in the Personal and Team tiers. It's updated continuously, not on a cron schedule. If you're on the waitlist, early-access pricing is available.*
