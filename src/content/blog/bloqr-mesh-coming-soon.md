---
title: "Bloqr Mesh: A Private Network for Every Device You Own"
description: "We're building Bloqr Mesh — a device-native private network powered by Cloudflare Mesh that brings your adblocking, filter policies, and privacy rules with you everywhere. Here's what it is, how it compares to NordVPN Meshnet, and where we are today."
pubDate: 2026-05-29
author: "Bloqr Team"
category: "product"
tags: ["mesh", "privacy", "cloudflare", "roadmap", "networking", "coming-soon"]
draft: false
---

We're building something we've been thinking about for a while. We're calling it **Bloqr Mesh**.

Here's what it is, what it isn't, and where we are.

## The problem it solves

Your Bloqr filter lists live in a dashboard. Your DNS config lives on your router, or in AdGuard Home, or in Pi-hole — wherever you've wired it up. That works fine at home.

But then you open your laptop at a coffee shop. Or you hand your kid a tablet. Or you spin up a dev machine in the cloud. The moment a device leaves your local network, your rules go with it exactly nowhere.

You end up with one set of privacy rules at home and a free-for-all everywhere else. That's the problem Bloqr Mesh fixes.

## What Bloqr Mesh will do

Bloqr Mesh enrolls your devices — desktop, laptop, phone, tablet, server, router — into a secure, private network. Once a device is enrolled, your Bloqr privacy policies follow it. The same adblock rules, the same filter lists, the same allowlists you've configured in your dashboard. Everywhere.

Specifically, you'll get:

- **Uniform policy enforcement** across every enrolled device, regardless of network
- **Per-device or per-group rules** — set a "Kids" group, a "Work" group, a "Travel" group, each with their own adblock and allowlist configuration
- **Device manager in your dashboard** — add, view, revoke, and monitor devices from one place
- **Encrypted traffic** — peer-to-peer, no third-party servers in the path, no traffic logs on our side
- **Real-time stats** — see what's being blocked on which device, from the dashboard
- **Upgrade path** — Free tier starts at 2 devices; we're targeting 50 for the free tier via Cloudflare's infrastructure (we'll finalize this after real-world cost data)

We're building this. It's not live yet.

## How it compares to NordVPN Meshnet

NordVPN Meshnet is the closest existing product. It's good. Here's how Bloqr Mesh is different:

| | NordVPN Meshnet | Bloqr Mesh |
|---|---|---|
| Peer-to-peer | Yes | Yes |
| Requires VPN subscription | Yes | No |
| Unified adblocking | No | Yes |
| Per-device policy control | Basic | Full (adblock, allowlist, filter lists, audit log) |
| Free devices | Plan-dependent | 50 (planned, Cloudflare free tier) |
| Price | $3–5/month standalone | Cheaper — free tier out of the box |
| Transparency | NordVPN-controlled infra | No traffic logs; open design |

The key difference: NordVPN Meshnet is a networking feature bolted onto a VPN product. Bloqr Mesh is a privacy enforcement layer that happens to use private networking as its delivery mechanism. The goal isn't tunneling. The goal is making sure your internet hygiene rules apply to every device you own, all the time.

## What we're building on

Bloqr Mesh runs on [Cloudflare Mesh](https://blog.cloudflare.com), which launched in April 2026. It's brand new infrastructure, and we're being deliberate about how we build on it.

Right now we're in the evaluation and planning phase. That means:

- Mapping our current agent and network topology to what Mesh supports
- Extending `CloudflareApiService` to anticipate node enrollment
- Drafting the device manager UI and policy control surfaces
- Preparing a pilot private network on staging before anything touches production

We're not rushing this. Cloudflare Mesh is a new launch, and we're giving the SDK and documentation a few weeks to stabilize before we commit to production integration. We'd rather ship this right than ship it fast and break your devices.

## This is Phase 3

Bloqr Mesh is Phase 3 of our infrastructure roadmap. Phases 0–2 cover the agent, binding, and registry work that the mesh layer will depend on. We're not building the user-facing product until that foundation is solid.

What that means for you: Bloqr Mesh is coming, but it's not the next release. We wanted to tell you about it now because the direction matters — and because if you're a power user, a small office, or a developer, this is exactly the product you've been waiting for.

## What you can do now

If you're on a Personal or Team plan, you already get the filter distribution and policy control that Mesh will extend to all your devices. Set it up now. When Mesh ships, enrollment will be one step from the same dashboard you already use.

If you're on Free, you'll still get access to Mesh for 2 devices. We'll announce when enrollment opens.

---

We'll post updates here as the roadmap moves. Full changelog at [bloqr.ai/changelog](/changelog). Questions or early feedback? Reach us at the link in the footer.

"Internet Hygiene. Automated." — everywhere you go.
