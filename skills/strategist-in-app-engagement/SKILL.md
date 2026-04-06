---
name: strategist-in-app-engagement
description: >-
  In-app message strategy including best practices, creative guidance, surveys,
  and engagement patterns.
metadata:
  role: braze-strategist
  topics:
    - in-app-messages-best-practices
    - in-app-messages-prep-guide
    - in-app-messages-know-before-send
    - in-app-messages-creative-details
    - in-app-traditional-simple-survey
    - in-app-traditional-email-capture-form
    - in-app-messages-ios-app-rating-prompt
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill file follows a synthesized reference pattern: rather than being a how-to procedure, it acts as a **lens document** — it tells Claude *what perspective to apply* when consulting the underlying topic files. The topics are atomic knowledge units; the skill is the strategic wrapper that gives them coherent purpose.
`─────────────────────────────────────────────────`

```markdown
# In-App Engagement Strategy

## Overview

This skill guides strategy for in-app messaging campaigns — how to plan, design, and optimize messages that appear within a mobile or web app. It covers the full strategic lifecycle: pre-build preparation, creative format selection, engagement mechanics (surveys, rating prompts, email capture), and pre-send validation.

**Strategic lens:** Maximize in-app engagement through well-timed, appropriately formatted messages that feel native to the user experience — not disruptive to it.

## When to Use

Use this skill when:
- Planning an in-app message campaign from scratch
- Choosing between in-app message formats (slideup, modal, survey, rating prompt)
- Designing surveys or data-capture flows within the app
- Preparing to send an in-app campaign and need a pre-send checklist
- Evaluating whether an in-app message meets creative or strategic best practices
- Advising on email capture or iOS rating prompt strategy

Not for: push notification strategy, email campaign design, or Content Cards — those are separate skills.

## Topics This Skill Synthesizes

### In-App Message Prep Guide
Pre-build checklist covering general considerations before authoring a message. Covers targeting logic, trigger timing, display duration, and message layering decisions to make before opening the composer.

### In-App Message Best Practices
Strategic principles for effective in-app messaging: copy brevity, CTA clarity, frequency capping, contextual relevance, and how to avoid user fatigue. Apply these as a quality filter on any proposed campaign.

### In-App Know Before You Send
Pre-send validation checklist. Covers what to verify — segment logic, control groups, rate limits, SDK version requirements — before activating a campaign.

### In-App Creative Details
Format-level guidance for each in-app message type: slideup (top/bottom placement, ideal for transient alerts), modal (higher-commitment interactions), full-screen. Covers when each format fits the campaign goal and how to use them without overwhelming users.

### Simple Survey Template
Strategy for deploying in-app surveys to collect user attributes, preferences, and NPS-style insights. Covers question design, branching logic, and how survey results feed downstream segmentation.

### Email Capture Form
Approach for prompting app users to submit their email address via in-app message. Covers placement timing (post-onboarding, post-positive-action), copy framing, and how captured emails surface in the user profile for follow-on campaigns.

### iOS App Rating Prompt
Strategic guidance on when and how to ask users to rate your iOS app via Braze-triggered prompts. Covers Apple's SKStoreReviewRequest constraints, optimal timing (post-success moments), and how to avoid wasting the system prompt on low-sentiment users.

## Strategic Patterns

**Timing over frequency.** A single well-timed in-app message outperforms repeated generic ones. Trigger on user actions (purchase completion, feature adoption) rather than session start.

**Match format to commitment level.** Slideups for low-commitment notifications; modals for decisions or captures; full-screen for onboarding moments. Mismatched format/intent degrades conversion.

**Survey before you assume.** Use the Simple Survey template to validate assumptions about user preferences before building a segmentation-heavy campaign.

**Capture early, enrich later.** Email capture in-app should happen at peak trust moments (post-signup, post-first-value). Frame it as a benefit ("Get updates on your orders") not a request.

**Protect the iOS rating prompt.** Apple limits how often the system prompt can appear per year. Use Braze's sentiment gating (only trigger for users who responded positively to a softer in-app prompt) to preserve those impressions for high-probability raters.

## Key Considerations

- In-app messages only display to **active sessions** — unlike push, they cannot re-engage dormant users
- Re-eligibility settings control whether a user can see the same message again; default is once per session
- Local timezone delivery does not apply to in-app messages (they are session-triggered, not scheduled)
- Test on both iOS and Android if using custom HTML — rendering differences are common
```

`★ Insight ─────────────────────────────────────`
Notice the skill is structured as a **navigator, not a procedure**: each topic section tells Claude *what the topic is for* and *when to reach for it*, rather than duplicating the topic content. This keeps the skill lightweight while making Claude's topic selection deliberate. The "Strategic Patterns" section is where the real synthesis happens — it's knowledge that exists *across* the topics, not within any single one.
`─────────────────────────────────────────────────`
