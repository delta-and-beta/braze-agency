---
name: analyst-retargeting
description: >-
  Audience segmentation, retargeting performance analysis, and cross-platform
  audience insights across ad and data partners.
metadata:
  role: braze-analyst
  topics:
    - message-orchestration-retargeting
    - retargeting-vizbee
    - retargeting-swym
    - retargeting-remerge
    - retargeting-quikly
    - retargeting-looker
    - retargeting-liveramp
    - retargeting-jampp
    - retargeting-facebook
    - retargeting-contentsquare
    - retargeting-adikteev
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skill files follow a **two-layer hierarchy**: the SKILL.md synthesizes topics into a coherent perspective, while individual topic files in `references/` hold the raw partner details. This skill sits at the synthesis layer.
- The **lens concept** is key here — a braze-analyst skill doesn't just catalog facts, it frames how an analyst should *interpret* those facts (ROI, segmentation quality, reach attribution).
- For partners with minimal source docs, the skill should acknowledge the gap gracefully and focus on what *is* known from adjacent topics.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Retargeting & Audience Analytics

## Overview

This skill covers audience segmentation, retargeting partner integrations, and cross-platform audience performance analysis within Braze. It synthesizes documentation across Braze's retargeting partner ecosystem — from mobile-first performance platforms to data clean rooms and urgency marketing tools — through the lens of **audience segmentation analysis, retargeting ROI, and cross-platform reach measurement**.

Use this skill when analyzing how Braze segments flow into paid media, how retargeting campaigns are structured and measured, or when evaluating partner integrations for audience activation workflows.

## When to Use This Skill

Use this skill when:
- Evaluating or configuring a Braze retargeting partner integration (Remerge, Jampp, Adikteev, Facebook, Quikly, LiveRamp, Looker, Vizbee, Swym, Contentsquare)
- Analyzing retargeting ROI or attributing conversions from re-engagement campaigns
- Performing audience segmentation analysis across Braze and downstream ad platforms
- Advising on cross-platform reach measurement strategies (app, web, CTV, social)
- Assessing churn risk and building suppression or win-back audiences
- Exporting Braze segments to external platforms for custom audience matching

**Not intended for:** initial campaign setup, in-app messaging configuration, or email/push channel strategy (see channel-specific skills).

## Analyst Lens

This skill takes the perspective of a **data analyst evaluating retargeting effectiveness**. Key questions it helps answer:

- Which audience segments are being retargeted, and how are they defined in Braze?
- What is the incremental lift from retargeting versus organic re-engagement?
- How does audience overlap across platforms affect reach and frequency?
- Are retargeting partners receiving fresh, well-qualified segments — or stale, broad ones?
- Where are churn-risk signals being incorporated into retargeting logic?

## Partner Ecosystem Covered

### Mobile App Retargeting

| Partner | Specialty | Integration Type |
|--------|-----------|-----------------|
| **Remerge** | App retargeting at scale; audience segmentation for mobile | Maintained integration |
| **Jampp** | Behavioral data + predictive/programmatic retargeting for mobile | Partner integration |
| **Adikteev** | Churn prediction + full-service app retargeting | Maintained integration |

**Key pattern:** Mobile retargeting partners (Remerge, Jampp, Adikteev) typically ingest Braze segments as seed audiences and apply their own predictive layers. The analyst's role is to ensure segment definitions in Braze are tight enough to avoid diluting partner models with low-intent users.

### Social & Paid Media

| Partner | Specialty | Integration Type |
|--------|-----------|-----------------|
| **Facebook** | Custom Audience export for paid social retargeting | Manual, one-time static export |

**Important constraint:** The Facebook integration is a **static, one-time export** — not a live sync. Audience freshness must be managed manually. This has direct implications for retargeting ROI analysis: segment staleness is a confounding variable.

### Urgency & Activation Marketing

| Partner | Specialty |
|--------|-----------|
| **Quikly** | Urgency-driven consumer psychology to accelerate response on key marketing initiatives |

Quikly operates as an activation layer rather than a traditional retargeting partner. Relevant for analysts measuring time-to-conversion lift and urgency-driven funnel acceleration.

### Data & Identity Partners

| Partner | Specialty |
|--------|-----------|
| **LiveRamp** | Identity resolution and data connectivity for cross-platform audience matching |
| **Looker** | BI and data exploration for audience and campaign analytics |
| **Contentsquare** | Digital experience analytics informing behavioral segmentation |
| **Vizbee** | CTV/streaming audience connectivity |
| **Swym** | Wishlist and intent data for retargeting signals |

> **Note:** Source documentation for LiveRamp, Looker, Contentsquare, Vizbee, and Swym was minimal at time of synthesis. Consult current partner documentation directly for integration specifics.

## Key Analytical Concepts

### Segment Quality for Retargeting

Retargeting effectiveness is highly sensitive to segment definition quality in Braze. Overly broad segments increase media spend waste; overly narrow segments limit scale. Analysts should evaluate:

- **Recency**: How recent is the last qualifying event for segment membership?
- **Intent signal strength**: Is the segment based on explicit signals (cart abandon, product view) or weak proxies (app open)?
- **Suppression logic**: Are converting users excluded promptly to prevent wasteful retargeting post-conversion?

### Churn Prediction Integration (Adikteev)

Adikteev's churn prediction capability represents a hybrid of retention analytics and paid retargeting. The integration maps predicted churners from Braze behavioral data to retargeting campaigns before lapse occurs. When analyzing this workflow, distinguish between:
- **Preventive retargeting** (pre-churn intervention, higher ROI potential)
- **Win-back retargeting** (post-lapse re-engagement, typically lower conversion rates)

### Cross-Platform Reach Measurement

When audiences flow from Braze into multiple ad platforms simultaneously (e.g., Facebook + Remerge + Jampp), reach and frequency analysis must account for:
- **Identity overlap** across platforms (same user, different device/ID)
- **Attribution conflicts** when multiple platforms claim the same conversion
- **Holdout methodology** for measuring true incremental retargeting lift

LiveRamp's identity resolution layer is relevant here for cross-platform deduplication.

### Static vs. Dynamic Audience Exports

Facebook's one-time export model contrasts with platforms that support live segment syncs. Analysts should flag this distinction when reviewing retargeting performance data — a static audience will degrade in quality over time as user behavior evolves.

## Common Analytical Pitfalls

- **Measuring clicks/impressions instead of incremental lift**: Retargeting campaigns show inflated performance when measured against users who would have converted organically. Use holdout groups or PSM where possible.
- **Ignoring post-conversion suppression lag**: If converting users remain in retargeting audiences for hours or days post-conversion, reported ROAS is understated and wasted spend is underreported.
- **Conflating churn risk with low engagement**: Not all low-engagement users are churn risks. Adikteev's model accounts for behavioral patterns — don't substitute simpler engagement proxies when churn prediction data is available.
- **Treating partner segments as equivalent to Braze segments**: Partners apply their own modeling on top of Braze seed audiences. What enters a partner platform is not identical to what comes out as a targeting audience.

## References

Topic files in this skill's `references/` directory contain detailed documentation for each partner where available:
- `remerge.md` — App retargeting at scale
- `jampp.md` — Programmatic mobile retargeting
- `adikteev.md` — Churn prediction + retargeting
- `facebook-audience-export.md` — Static Custom Audience export
- `quikly.md` — Urgency marketing activation
- `liveramp.md`, `looker.md`, `contentsquare.md`, `vizbee.md`, `swym.md` — Partner stubs (minimal source docs available)

`★ Insight ─────────────────────────────────────`
- The **partner table structure** (grouping by mobile, social, data/identity) mirrors how analysts actually think about audience activation tiers — not all retargeting partners are equivalent, and grouping by capability helps Claude route questions to the right context.
- Surfacing the **Facebook static export constraint** prominently is analytically important: it's a non-obvious gotcha that directly impacts how you interpret retargeting performance data from that channel.
- The **"not intended for" exclusion** in When to Use is a CSO pattern from the writing-skills skill — it prevents false positive skill loads and sharpens Claude's routing confidence.
`─────────────────────────────────────────────────`
