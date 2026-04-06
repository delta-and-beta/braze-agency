---
name: strategist-loyalty-programs
description: >-
  Designs loyalty program architectures and rewards partner integrations to
  drive retention and lifetime value.
metadata:
  role: braze-strategist
  topics:
    - loyalty-voucherify
    - loyalty-talonone
    - loyalty-sessionm
    - loyalty-punchh
    - loyalty-openloyalty
    - loyalty-kognitiv
    - loyalty-friendbuy
    - loyalty-eagleeye
    - loyalty-antavo
    - loyalty-punchh-overview
    - loyalty-punchh-code-generation
    - extensions-rewards-punchh
    - extensions-rewards-nift
    - extensions-rewards-dots-eco
    - data-and-analytics-loyalty
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Plugin skill files differ from personal process skills — they serve as routing documents that help Claude understand *when* to activate domain expertise, not enforce workflow discipline. The key challenge here is that many source topics have minimal documentation, so the skill needs to synthesize what *is* known while being honest about gaps.
`─────────────────────────────────────────────────`

Here's the generated skill file content:

---

# Loyalty & Rewards Strategy

## Overview

This skill covers the design, architecture, and integration of loyalty programs and rewards ecosystems within Braze-powered customer engagement stacks. It applies a **program economics lens** — evaluating partner capabilities, tier mechanics, referral structures, and long-term retention ROI rather than just technical integration details.

Use this skill when the task involves:
- Selecting or comparing loyalty platform partners (Voucherify, Talon.One, Antavo, Kognitiv, Punchh, Open Loyalty, SessionM, Eagle Eye)
- Designing rewards tiers, point economies, or milestone structures
- Integrating referral mechanics (Friendbuy) or gift/incentive networks (Nift)
- Adding environmental/impact rewards (dots.eco certificates)
- Evaluating trade-offs between build vs. buy for loyalty infrastructure
- Connecting loyalty program events to Braze campaigns and Canvas flows

---

## Lens: Program Economics & Partner Capability Comparison

Approach every loyalty question through four lenses:

| Lens | Key Questions |
|---|---|
| **Program economics** | What is the cost-per-point, redemption liability, breakage rate? Does the reward structure drive net-positive LTV? |
| **Reward tier design** | Are tiers differentiated enough to motivate progression? Are thresholds calibrated to realistic behavior? |
| **Referral mechanics** | What is the attribution model? Are referrer/referee incentives balanced to avoid fraud? |
| **Partner capability comparison** | Which platforms support real-time event sync with Braze? Which offer dynamic coupon generation vs. static codes? |

---

## Partner & Platform Reference Map

### Full-Service Loyalty Platforms
- **SessionM** (Mastercard Services) — Enterprise-grade campaign management and loyalty with deep Braze integration; supports points, tiers, offers, and real-time triggers
- **Open Loyalty** — Cloud-based, API-first; flexible rules engine for points, rewards, and tiers; well-documented Braze connector
- **Eagle Eye** — SaaS/AI platform for retail, travel, and hospitality; strong in promotions and coalition loyalty; real-time issuance and redemption
- **Kognitiv** — Partner-focused loyalty ecosystem; limited public documentation available

### Specialized Loyalty Engines
- **Voucherify** — Promotion and loyalty API; strong coupon/voucher management; Braze partner
- **Talon.One** — Rule-based promotions engine; campaign and loyalty API; Braze integration supported
- **Antavo** — Enterprise loyalty platform; gamification and tier management focus
- **Punchh** (PAX Technology) — Restaurant and retail loyalty; dynamic coupon code generation via Braze Canvas is a documented capability

### Rewards Extensions
- **Nift** — Two-sided gift card network for acquisition, engagement, and retention; partners thank customers with Nift gift cards routed through Braze
- **dots.eco** — Environmental impact rewards via trackable digital certificates; metadata-rich certificates are shareable and embeddable in Braze messages

### Referral Programs
- **Friendbuy** — Referral program platform; minimal Braze-specific documentation available; check current integration docs for event schema

---

## Topics This Skill Synthesizes

| Topic | Coverage Level |
|---|---|
| Punchh Loyalty (Overview, Deep Dive, Code Generation) | Partial — dynamic code generation via Braze Canvas is documented |
| SessionM Loyalty Platform | Documented — campaign management and Braze event integration |
| Open Loyalty Platform | Documented — API structure and Braze connector |
| Eagle Eye Loyalty & Promotions | Documented — real-time issuance, retail/hospitality focus |
| Nift Rewards Extension | Documented — two-sided gift network mechanics |
| dots.eco Rewards Extension | Documented — digital environmental certificates |
| Voucherify Loyalty Partner | Minimal source docs — use general API knowledge |
| Talon.One Loyalty Partner | Minimal source docs — use general API knowledge |
| Antavo Loyalty Partner | Minimal source docs — use general API knowledge |
| Kognitiv Loyalty Partner | Minimal source docs — use general API knowledge |
| Friendbuy Referral Program | Minimal source docs — verify current integration schema |
| Loyalty Partners Category Overview | Minimal source docs — use partner map above |

> Partners with minimal source documentation may have richer capabilities than reflected here. Always recommend verifying against current partner docs before finalizing architecture decisions.

---

## Decision Guidance

### Choosing a Loyalty Platform

```
Need full loyalty stack (points + tiers + offers)?
  → SessionM (enterprise), Open Loyalty (API-first), Eagle Eye (retail/hospitality)

Need flexible promotion/coupon rules engine?
  → Voucherify, Talon.One

Need restaurant/retail loyalty with POS integration?
  → Punchh

Need add-on rewards without building a full program?
  → Nift (gift network), dots.eco (environmental)

Need referral attribution and incentive management?
  → Friendbuy
```

### When Braze Canvas Is the Orchestration Layer

For platforms like Punchh that support dynamic code generation, Braze Canvas can drive the issuance flow — triggering coupon generation at the moment of send rather than pre-generating codes. This reduces code waste and supports personalized reward delivery without a separate batch process.

---

## Common Mistakes

- **Treating loyalty as a campaign add-on**: Loyalty program events should feed *back* into Braze segmentation and Canvas triggers — the integration is bidirectional
- **Ignoring redemption liability**: A generous points economy can create accounting exposure; always model breakage assumptions
- **Conflating referral and loyalty**: Referral mechanics (Friendbuy) optimize acquisition; loyalty programs optimize retention — they require different incentive structures and success metrics
- **Assuming minimal-doc partners have minimal capability**: Voucherify, Talon.One, and Antavo are mature platforms; gaps in source docs reflect documentation availability, not product maturity

---

`★ Insight ─────────────────────────────────────`
The partner reference map uses a coverage level column to signal documentation confidence — this is a useful pattern when source topics have uneven quality. It prevents the skill from overpromising on partners where docs were unavailable while still surfacing them for comparison. The decision tree keeps the lens actionable rather than purely descriptive.
`─────────────────────────────────────────────────`
