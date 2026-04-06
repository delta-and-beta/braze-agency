---
name: analyst-ecommerce
description: >-
  Analytics for e-commerce performance, customer behavior, and operational
  workflow optimization across partner platforms.
metadata:
  role: braze-analyst
  topics:
    - ecommerce-analytics-workflow
    - analytics-workflow-wunderkind
    - analytics-workflow-tangerine
    - analytics-workflow-personalize
    - analytics-workflow-peak
    - analytics-workflow-okendo
    - analytics-workflow-lexer
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files for Claude Code plugins serve as **routing guides** — Claude reads the description and body to decide *when* to load it. The lens section is especially valuable because it tells Claude *how* to interpret the topics, not just *what* they are.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# E-commerce Analytics & Workflow

## Overview

This skill covers analytics integrations and workflow optimization for e-commerce performance, grounded in Braze's partner ecosystem. It synthesizes how behavioral data flows from specialized analytics partners into actionable insights — covering identity resolution, omnichannel attribution, customer advocacy, and AI-driven decision intelligence.

**Core lens:** Customer behavior analysis, conversion optimization, and workflow performance metrics.

Use this skill when analyzing customer journeys, evaluating partner data pipelines, optimizing conversion workflows, or interpreting behavioral signals from Braze's e-commerce analytics integrations.

## When to Use

- Investigating how an analytics partner enriches or extends Braze customer profiles
- Mapping behavioral signals (site activity, purchase history, advocacy scores) to campaign decisions
- Evaluating conversion funnel performance using partner-sourced data
- Optimizing omnichannel workflows that span physical and digital touchpoints
- Answering questions about identity resolution, decision intelligence, or customer lifetime value in an e-commerce context

**When NOT to use:** For core Braze campaign mechanics, message delivery, or non-analytics partner integrations, use a more targeted skill.

## Topics Synthesized

### Wunderkind (Signals)
Identity resolution platform that recognizes anonymous website visitors and resolves them into known customer profiles. Key use cases: behavioral signal capture, anonymous-to-known resolution, and performance attribution for e-commerce traffic. Feeds Braze with enriched identity data to power triggered and personalized messaging.

### Tangerine Store360
Omnichannel platform connecting physical retail stores with online commerce. Relevant when analyzing unified customer behavior across in-store and digital channels — particularly for attribution, inventory-aware personalization, and cross-channel workflow optimization.

### Personalize Analytics Partner
Source documentation is minimal. Treat as a behavioral personalization integration. When encountered, focus on how personalization signals are passed to Braze and how they influence segmentation or content decisions.

### Peak
Decision intelligence platform applying AI to commercial decisions. Relevant for questions about AI-assisted forecasting, demand prediction, customer scoring, or automating business decisions based on behavioral and transactional data.

### Okendo
Customer marketing platform focused on reviews, referrals, and loyalty — mobilizing customers as advocates to drive word-of-mouth and lifetime value. Use when analyzing review-driven conversion signals, UGC integration, or post-purchase advocacy workflows in Braze.

### Lexer
Source documentation is minimal. Treat as a customer data platform (CDP) or segmentation-enrichment partner. Focus on how Lexer-sourced audience data surfaces in Braze for targeting or suppression.

## Analytical Lens

Apply this skill with the following perspective:

**Customer behavior analysis** — How are customers moving through funnels, and what signals indicate intent, churn risk, or advocacy potential?

**Conversion optimization** — Where do partner integrations create leverage points for improving conversion rates — through better identity resolution, smarter personalization, or timely triggered messages?

**Workflow performance metrics** — How do data pipelines between partners and Braze perform operationally? What latency, match rates, or data quality issues affect downstream campaign effectiveness?

## Quick Reference

| Partner | Primary Value | Data Type |
|---|---|---|
| Wunderkind | Anonymous visitor identity resolution | Behavioral / Identity |
| Tangerine Store360 | Omnichannel physical + digital unification | Transactional / Location |
| Personalize | Behavioral personalization signals | Behavioral |
| Peak | AI-driven decision intelligence | Predictive / Scoring |
| Okendo | Customer advocacy and review signals | Social / UGC |
| Lexer | Audience enrichment and segmentation | Audience / CDP |

## Common Mistakes

- **Treating minimal-doc partners (Personalize, Lexer) as unsupported** — these are live integrations; infer behavior from partner category and data flow patterns
- **Conflating identity resolution (Wunderkind) with segmentation enrichment (Lexer)** — different data layers with different latency and match-rate considerations
- **Ignoring omnichannel attribution gaps** — Tangerine's Store360 data often has in-store lag; account for this in workflow timing analysis
- **Overlooking advocacy signals as conversion inputs** — Okendo review data can directly influence purchase likelihood scoring in downstream Braze segments

`★ Insight ─────────────────────────────────────`
Notice the **Quick Reference table** — this is the highest-value section for a Claude agent because it allows pattern matching at a glance before diving into topic detail. The `Common Mistakes` section is equally important: it encodes known failure modes so Claude avoids repeating them.
`─────────────────────────────────────────────────`
