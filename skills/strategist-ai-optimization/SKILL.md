---
name: strategist-ai-optimization
description: >-
  Leveraging intelligence suite and generative AI for optimal send timing,
  channel selection, and content creation.
metadata:
  role: braze-strategist
  topics:
    - intelligence-suite-tutorial
    - intelligence-suite-intelligent-timing
    - intelligence-suite-intelligent-selection
    - intelligence-suite-intelligent-channel
    - generative-ai-copywriting
    - generative-ai-images
    - generative-ai-liquid
    - generative-ai-brand-guidelines
    - generative-ai-content-qa
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skill files are the "Layer 1" in the two-layer hierarchy — they synthesize atomic topic references into cohesive domain guidance. The skill itself is what agents read at runtime to gain expertise.
- The `lens` concept is key: the same underlying topics (e.g., Intelligent Timing) might be framed differently for an `engineer` vs a `strategist` — engineers care about API parameters, strategists care about when and why to deploy each feature.
`─────────────────────────────────────────────────`

Here is the skill body:

---

# AI-Powered Content & Timing Optimization

## Overview

This skill covers the full suite of BrazeAI capabilities available to a strategist building campaigns and Canvases: from delivery intelligence (when and where to reach users) to generative AI (what to say and show). The lens throughout is strategic — not implementation mechanics, but decision-making: which AI feature to apply, under what conditions, and how to combine them for compounding lift.

Use this skill when advising on how to make messages smarter, faster, or more on-brand without manual guesswork.

## When to Use This Skill

- Designing a campaign or Canvas and want to reduce manual timing/channel decisions
- Evaluating which AI optimization tool fits a specific use case or constraint
- Writing or reviewing AI-generated copy, images, or Liquid and need quality guardrails
- Setting up multi-variant tests and want traffic allocation to self-optimize
- Ensuring AI-generated content reflects brand voice consistently

**Not for:** Pure A/B testing without AI optimization, segmentation logic, or backend data integration.

## Topics Synthesized

This skill draws from the following reference topics:

| Topic | Core Concept |
|---|---|
| **Intelligent Timing** | Per-user optimal send time based on engagement history |
| **Intelligent Selection** | Multi-armed bandit for automatic variant traffic reallocation |
| **Intelligent Channel** | Filters for the channel with highest per-user engagement likelihood |
| **Intelligence Suite Tutorial** | Practical Canvas walkthrough combining Timing + Selection together |
| **AI Copywriting** | GPT-powered marketing copy generation in-dashboard |
| **AI Image Generation** | DALL-E image creation within the Media Library |
| **AI Liquid Templating** | Chat-driven Liquid code generation for personalization |
| **Brand Guidelines** | Voice and tone rules that constrain AI copy output |
| **AI Content QA** | Pre-send AI quality check for SMS, push, and in-app messages |

## Delivery Intelligence

### Intelligent Timing
Delays message delivery to each user's individually predicted best time window. Best for one-time campaigns where maximizing open rates matters more than exact send time. Requires enough per-user engagement history to make a confident prediction — fall back to a defined default window for new or inactive users.

**Key constraint:** Timing is calculated per user at send time, so Canvas steps must allow sufficient scheduling slack. Not suitable when messages must arrive at a coordinated real-world moment.

### Intelligent Selection
Replaces static variant traffic splits with a live multi-armed bandit that rebalances every 12 hours toward better-performing variants. Use this in recurring campaigns or always-on Canvases where you want ongoing optimization without manual intervention.

**Strategic trade-off:** Intelligent Selection reduces exploration over time — it converges on winners. If you need a definitive statistical conclusion, run a fixed A/B test first. Use Selection for continuous improvement, not for one-shot hypothesis testing.

### Intelligent Channel
A user-level filter that routes each recipient to their historically highest-engagement channel. Apply early in a Canvas to avoid sending across channels where a user is demonstrably unresponsive.

**When not to use:** When a specific channel is required for compliance, product, or contractual reasons. Intelligent Channel is an optimization, not a fallback for missing channel setup.

### Combining All Three: The Intelligence Suite
The tutorial pattern is: **Intelligent Channel first → Intelligent Timing on each branch → Intelligent Selection across content variants.** This sequence ensures you're reaching the right user, at the right time, with the winning message — and that traffic continuously shifts toward what works. For QSR and similar high-frequency verticals, this combination materially reduces manual optimization cycles.

## Generative AI Features

### AI Copywriting
Generates draft marketing copy directly in the message composer using GPT. Strongest as a starting point or for overcoming blank-page friction. Always review output against brand guidelines before sending — the model optimizes for plausibility, not brand fit.

**Workflow:** Launch AI Copywriter → provide context/prompt → generate → edit → apply to message.

### AI Image Generation
Creates images via DALL-E from within the Braze Media Library. Useful for rapid concept visualization or filling in asset gaps mid-campaign. Output quality depends heavily on prompt specificity — be descriptive about style, composition, and subject.

**Access:** Templates > Media Library → AI generation entry point.

### AI Liquid Templating (BrazeAI Liquid Assistant)
A chat interface inside the message composer that writes and iterates on Liquid code for personalization logic. Supported for SMS, push, and email. Use it to scaffold complex conditional blocks, then review the output carefully — Liquid errors silently fail or fall through to defaults.

**Supported channels:** SMS, push, email (not all channels). Confirm channel support before building Liquid-heavy templates in unsupported message types.

## Quality and Brand Consistency

### Brand Guidelines
Configure brand voice, tone, and vocabulary rules to constrain what the AI Copywriting Assistant produces. Accessible via Settings > Brand Guidelines or directly from the composer. Well-defined brand guidelines are a force-multiplier: they reduce post-generation editing cycles across every AI-written message.

**Setup tip:** Include explicit negative guidance ("never use urgency language", "avoid technical jargon") — the model follows prohibitions as well as positive direction.

### AI Content QA
A pre-send automated check for content quality issues — grammar, clarity, tone flags, and SMS-specific concerns. Available for SMS, Android push, iOS push, and traditional in-app messages only (not email, not Content Cards). Run it as part of the pre-launch checklist, not as a replacement for human review.

**Limitation:** QA checks content quality, not strategic fit. It won't tell you if the message is relevant to the segment or correctly timed — those remain human judgment calls.

## Decision Guide

```
Is timing the primary optimization lever?
  → Yes, and message can be delayed per-user → Intelligent Timing
  → Yes, but must coordinate across users → Fixed schedule + Intelligent Selection for content

Is channel selection the bottleneck?
  → Yes → Intelligent Channel filter early in Canvas

Are you running variants and want automatic traffic optimization?
  → Recurring campaign/Canvas → Intelligent Selection
  → One-shot experiment needing statistical conclusion → Standard A/B test

Do you need to generate content quickly?
  → Copy → AI Copywriting (with brand guidelines configured)
  → Images → AI Image Generation
  → Personalization logic → AI Liquid Templating

Pre-launch review checklist:
  → SMS, push, or in-app message → AI Content QA
  → All channels → Manual brand voice review
```

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using Intelligent Selection for a campaign that runs once | Use only for recurring or always-on campaigns; one-shot campaigns don't have time for bandit convergence |
| Applying Intelligent Timing when the message is time-sensitive | Disable Timing and use a fixed window; Timing introduces unpredictable per-user delays |
| Skipping brand guidelines setup | Invest time upfront; AI copy without guidelines requires heavier editing downstream |
| Trusting AI Liquid output without testing | Always preview Liquid with representative user attributes; errors fall through silently |
| Running AI Content QA on email and expecting coverage | QA doesn't support email — rely on manual review for that channel |
