---
name: strategist-loyalty
description: >-
  Strategic design of loyalty programs, promotional campaigns, and dynamic
  pricing initiatives using Braze partner integrations.
metadata:
  role: braze-strategist
  topics:
    - ecommerce-loyalty
    - ecommerce-dynamic-pricing-promotions
    - loyalty-yotpo
    - loyalty-voucherify
    - loyalty-talonone
    - loyalty-swym
    - loyalty-kognitiv
    - loyalty-antavo
    - loyalty-voucherify-voucherify
    - loyalty-voucherify-voucherify-using-braze-promotion-codes-list
    - >-
      loyalty-voucherify-voucherify-fetching-data-through-braze-connected-content
    - loyalty-voucherify-voucherify-distribution-with-braze-custom-attributes
    - dynamic-pricing-promotions-voucherify
    - dynamic-pricing-promotions-viralsweep
    - dynamic-pricing-promotions-talonone
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Plugin domain skills (assembled by Nick's pipeline) differ from personal superpowers skills: they express **domain expertise for an agent persona** rather than **process discipline**. The writing-skills TDD cycle applies to personal skills; here the goal is synthesizing topic references into a coherent knowledge lens for a `braze-strategist` agent to reason from. The "lens" framing is especially useful — it tells Claude *how to interpret* queries, not just *what to know*.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Loyalty & Promotions Strategy

## Overview

This skill covers the strategic design and technical execution of **loyalty programs, promotional campaigns, and dynamic pricing initiatives** within Braze, leveraging partner integrations to deliver personalized retention experiences at scale.

As a `braze-strategist`, apply this skill through the lens of **customer retention strategy, reward program design, and promotional campaign planning** — always asking: *how does this promotion deepen long-term customer value, not just drive a one-time conversion?*

---

## When to Use

Apply this skill when:

- Designing or evaluating a loyalty program that integrates with Braze (Yotpo, Talon.One, Voucherify, Antavo, Kognitiv, Swym)
- Planning promotional campaigns using dynamic pricing partners (Voucherify, Talon.One, ViralSweep)
- Distributing coupon codes, promotion codes, or vouchers through Braze messages
- Architecting data flows between a loyalty/promotions platform and Braze (custom attributes, Connected Content, promo code lists)
- Advising on partner selection for loyalty or promotions use cases
- Evaluating how to capture and act on shopping intent signals (wishlists, gift registries, back-in-stock alerts) within Braze campaigns

---

## Topic Coverage

This skill synthesizes the following reference topics:

### Loyalty Partners
| Partner | Capability |
|---------|------------|
| **Yotpo** | E-commerce loyalty — points, rewards, referrals |
| **Voucherify** | Loyalty programs + promotion code engine |
| **Talon.One** | Rule-based loyalty + dynamic pricing |
| **Antavo** | Enterprise loyalty program management |
| **Kognitiv** | Loyalty strategy consulting + platform |
| **Swym** | Intent capture (wishlists, save-for-later, gift registry, back-in-stock) |

### Dynamic Pricing & Promotions Partners
| Partner | Capability |
|---------|------------|
| **Voucherify** | Voucher generation, distribution, and validation |
| **Talon.One** | Coupon rules, cart promotions, dynamic pricing |
| **ViralSweep** | Sweepstakes, contests, and social promotions |

### Voucherify × Braze Integration Patterns
- **Promotion Codes List** — Export Voucherify codes into Braze promo code snippets for 1:1 personalized delivery
- **Connected Content** — Fetch voucher data from the Voucherify API at send time to inject personalized codes into messages
- **Custom Attributes** — Push Voucherify codes to Braze user profiles for segment-based distribution and tracking

---

## Strategic Lens

When advising on loyalty and promotions, evaluate every decision across three dimensions:

### 1. Retention vs. Acquisition Trade-off
Loyalty programs and promotions can cannibalize margin if not designed carefully. Prefer designs that reward **incremental behavior** (second purchase, referral, high-frequency engagement) over blanket discounting.

### 2. Data Architecture
The integration pattern you choose affects what Braze can personalize and what it can measure:
- **Connected Content** is best for real-time, one-to-one voucher personalization where uniqueness matters at send time
- **Custom Attributes** are best for pre-assigned codes where segment membership or loyalty tier drives eligibility
- **Promo Code Lists** are best for bulk campaigns where any unique code from a pool will do

### 3. Partner Selection Criteria
Match partner capability to program complexity:
- Simple point/reward systems → **Yotpo** or **Swym** (intent-driven)
- Complex rule-based promotions with cart logic → **Talon.One**
- Voucher-heavy campaigns with distribution control → **Voucherify**
- Full enterprise loyalty ecosystems → **Antavo** or **Kognitiv**
- Social/viral promotions → **ViralSweep**

---

## Key Patterns

### Personalizing Promotions at Scale
Use Voucherify Connected Content to generate and serve unique promo codes within Braze messages without pre-generating the full code list. This preserves code uniqueness, supports expiry logic, and reduces operational overhead.

### Triggering Loyalty Actions from Braze Events
Integrate loyalty partner webhooks into Braze as custom events, enabling loyalty tier changes or point milestones to trigger targeted Braze campaigns — closing the loop between reward status and messaging.

### Intent Signal Activation (Swym)
Swym's permission-based shopping intent data (wishlists, back-in-stock alerts) can feed Braze as custom events or attributes, enabling highly relevant re-engagement without relying on browsing behavior inference.

---

## Common Mistakes

| Mistake | Better Approach |
|---------|----------------|
| Using generic promo codes in loyalty campaigns | Use unique, trackable codes per user via Connected Content or promo lists |
| Ignoring code redemption tracking in Braze | Map redemption events back to Braze via webhook or API to close the attribution loop |
| Treating all loyalty partners as interchangeable | Match partner architecture to program complexity — over-engineering simple programs is costly |
| Over-relying on discounts for retention | Design loyalty mechanics around recognition, exclusivity, and early access — not just price cuts |

---

`★ Insight ─────────────────────────────────────`
The three Voucherify integration patterns (Connected Content, Custom Attributes, Promo Code Lists) represent a spectrum from **pull-at-send-time** to **pre-computed push** — a common architectural decision in real-time personalization systems. Each trades off freshness vs. predictability vs. operational simplicity, and the "right" choice depends on whether uniqueness, real-time validity, or batch throughput is the binding constraint.
`─────────────────────────────────────────────────`
