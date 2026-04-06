---
name: strategist-dynamic-content
description: >-
  Designs dynamic content personalization strategies using personalization
  engines and content management platforms.
metadata:
  role: braze-strategist
  topics:
    - dynamic-content-visual-and-interactive-content
    - dynamic-content-personalized-recommendations
    - dynamic-content-personalization-engines
    - dynamic-content-content-optimization-testing
    - dynamic-content-otherlevels
    - personalization-engines-sheetlabs
    - personalization-engines-movable-ink
    - personalization-engines-limbik
    - personalization-engines-dynamic-yield
    - personalization-engines-amazon-personalize
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill sits at Layer 2 (role-level) in the Nick hierarchy — it synthesizes multiple atomic topic files into a coherent strategic perspective, not just a vendor docs dump
- The "lens" metadata is the most important orientation cue: it tells Claude *how* to apply all the underlying knowledge, not just *what* the knowledge is
- Listing topics explicitly in the skill body makes the routing index more likely to surface this skill when a query touches any of those vendor names
`─────────────────────────────────────────────────`

---

# Dynamic Content Strategy

## Overview

This skill covers designing personalization strategies that serve dynamically tailored content to users at the right moment, through the right channel, using the right engine. It is applied from the perspective of a **Braze strategist** — the lens is **content personalization strategy and engine selection**: which engine to choose, how to integrate it with Braze, and how to optimize results over time.

Use this skill when:
- Selecting or comparing personalization engines (Dynamic Yield, Amazon Personalize, Movable Ink, Limbik, OtherLevels, Sheetlabs)
- Designing a Braze campaign that must serve individually tailored content blocks, product recommendations, or AI-generated media
- Evaluating trade-offs between pre-computed vs. render-time personalization
- Integrating review signals (Trustpilot) or spreadsheet-managed data (Sheetlabs) into message templates
- Assessing audience resonance before launch (Limbik)
- Building visual or interactive content experiences inside Braze messages

## Lens: Content Personalization Strategy and Engine Selection

Apply knowledge in this skill through this strategic frame:

1. **Fit to use case** — match engine capabilities to campaign type (email open-time rendering vs. push video vs. recommendation carousel)
2. **Data ownership** — where does personalization data live and who controls it (ML platform, S3, spreadsheet, review platform)?
3. **Latency model** — does the engine resolve at send time, open time, or requires pre-population via Connected Content?
4. **Braze integration pattern** — Connected Content call, Catalog sync, SDK event trigger, or data export pipeline?

## Topics Synthesized

| Topic | What it covers |
|---|---|
| **Visual & Interactive Content** | Interactive and visual formats deliverable through Braze channels |
| **Personalized Recommendations** | Personalize.AI — export recommendation data into Braze templates |
| **Personalization Engines (Sheetlabs)** | Spreadsheet-to-API bridge for marketer-managed personalization data |
| **Content Optimization Testing** | Trustpilot integration — review invitations and review-data personalization |
| **OtherLevels Dynamic Content** | GenAI personalized video delivery via iOS push through Connected Content |
| **Sheetlabs Personalization Engine** | Google Sheets / Excel as live data APIs for Braze Liquid templating |
| **Movable Ink** | Render-time personalized image and content block generation for email |
| **Limbik** | AI pre-launch resonance testing — predict audience response before send |
| **Dynamic Yield** | Mastercard-owned Experience Blocks embedded in email at open time |
| **Amazon Personalize** | AWS ML recommendations pipeline feeding into Braze Connected Content |

## Engine Selection Quick Reference

| Engine | Integration Pattern | Best For |
|---|---|---|
| Dynamic Yield | Connected Content (open-time) | Email personalization blocks |
| Amazon Personalize | Connected Content + S3 export | Scalable ML recommendations |
| Personalize.AI | Data export → Braze attributes | Recommendation carousels |
| Movable Ink | Image URL rendering at open | Visual personalization in email |
| OtherLevels | API call → push payload | GenAI video in iOS push |
| Limbik | Pre-send resonance API | Pre-launch audience testing |
| Sheetlabs | Connected Content → spreadsheet API | Marketer-controlled data tables |
| Trustpilot | Webhook (review request) + Connected Content (review data) | Social proof personalization |

## Common Mistakes

- **Choosing open-time rendering for channels that don't support it** — Movable Ink and Dynamic Yield shine in email; push notifications resolve at send time
- **Treating Sheetlabs as a production ML system** — it is a lightweight bridge for human-managed data, not a replacement for Amazon Personalize or Dynamic Yield at scale
- **Skipping Limbik pre-launch** — resonance testing before a large send can surface copy or creative issues before they affect real users
- **Conflating recommendation export with real-time personalization** — Personalize.AI exports data into Braze user attributes; it does not resolve at render time

## When Not to Use This Skill

- Campaign orchestration or segmentation logic that does not involve dynamic content injection → use channel strategy or segmentation skills instead
- A/B testing of static copy variants → use Content Cards or Braze's native A/B test feature without external engines

`★ Insight ─────────────────────────────────────`
- The quick-reference table is the most load-bearing part of this skill for runtime use — Claude can answer "which engine should I use?" without reading the full topic files
- Calling out open-time vs. send-time resolution as a first-class concern reflects a non-obvious integration constraint that's easy to get wrong and costly to debug in production
`─────────────────────────────────────────────────`
