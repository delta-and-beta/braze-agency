---
name: engineer-extension-integrations
description: >-
  Technical implementation of platform extensions including surveys, rewards,
  gamification, learning, and landing page partners.
metadata:
  role: braze-engineer
  topics:
    - extensions-surveys
    - extensions-rewards
    - extensions-learning
    - extensions-landing-pages
    - extensions-gamification
    - extensions-learning-edume
    - extensions-rewards-punchh
    - extensions-rewards-nift
    - extensions-rewards-dots-eco
    - extensions-surveys-typeform
    - extensions-surveys-survicate
    - extensions-surveys-komo
    - extensions-surveys-jebbit
    - extensions-surveys-iterate
    - extensions-surveys-digioh
    - additional-channels-and-extensions-extensions
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files in this codebase serve a dual purpose: they act as **routing hints** (helping the agent selector match queries to the right domain) AND as **context documents** (giving the loaded agent the right mental model before it acts). The `references/` subdirectory holds atomic topic files, while the `SKILL.md` synthesizes them into an opinionated lens.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Extension Integration Engineering

## Overview

This skill covers the technical implementation of Braze's extension partner ecosystem — surveys, rewards, gamification, learning platforms, and landing page tools. The focus is on the **engineer's lens**: how to configure SDK data passthrough, wire up event callbacks, and validate that user attribute updates flow correctly between Braze and partner platforms.

Use this skill when a task involves connecting a third-party extension to Braze, troubleshooting data not flowing between systems, or implementing event-driven callbacks from partner SDKs.

## Scope

This skill synthesizes knowledge across the following extension categories and specific partner integrations:

### Extension Categories
- **Surveys** — collecting user feedback through embeddable forms and in-app prompts
- **Rewards** — loyalty, gifting, and environmental impact reward flows
- **Gamification** — engagement mechanics tied to user behavior events
- **Learning** — mobile-first training delivery linked to workforce segments
- **Landing Pages** — partner-hosted pages with Braze-tracked attribution

### Specific Partner Integrations Covered

| Partner | Category | Integration Type |
|---------|----------|-----------------|
| Typeform | Surveys | Webhook → Braze attribute update |
| Survicate | Surveys | SDK embed + profile sync |
| Iterate | Surveys | In-app survey SDK + event triggers |
| Jebbit | Surveys / Interactive | First-party data capture → Braze |
| Komo | Surveys | Partner-maintained |
| Digioh | Surveys | Partner-maintained |
| eduMe | Learning | Deep link delivery via Braze messages |
| Punchh | Rewards | Partner-maintained loyalty sync |
| Nift | Rewards | Gift card delivery + Braze event tracking |
| dots.eco | Rewards | Environmental certificate + metadata passthrough |

## Engineering Lens

When approaching extension integration tasks, reason from three layers:

### 1. SDK / Embed Setup
How does the partner SDK get initialized in the host app or webpage? What credentials, API keys, or initialization parameters does it require? Does it need to be loaded before or after the Braze SDK?

### 2. Data Passthrough Configuration
How do user attributes, custom events, and segment memberships move between Braze and the partner? Common patterns:
- **Webhook-based**: Partner fires a webhook on completion → Braze `/users/track` updates the profile (Typeform, Survicate)
- **Deep link with query params**: Braze message contains a partner URL with user identifiers embedded (eduMe)
- **First-party data capture**: Partner collects responses and POSTs to Braze via REST API (Jebbit, Iterate)
- **Event callback**: Partner SDK calls a callback function when an action completes, which the host app then logs as a Braze custom event (Nift, dots.eco)

### 3. Event Callback Setup
Most extension partners surface completion or interaction events. These should be mapped to Braze custom events to enable downstream campaign triggering, segmentation, and analytics. Verify:
- Event names are agreed upon and consistent with Braze naming conventions
- User identity (external ID or alias) is passed correctly so events attach to the right profile
- Any metadata (e.g., certificate ID for dots.eco, gift card value for Nift) is included as event properties

## When to Use This Skill

Use this skill when:
- Implementing or debugging a Braze extension partner integration (any category above)
- A user attribute is not updating in Braze after a survey completion or reward redemption
- Designing the event schema for a new extension partner
- Choosing between webhook vs. SDK-callback integration approaches for a given partner
- Setting up deep link delivery for a learning or rewards partner via a Braze campaign

Do **not** use this skill for:
- Core Braze SDK instrumentation (use the SDK setup skill)
- Canvas or campaign logic that doesn't involve extension partners
- Server-side Braze API calls unrelated to extension data passthrough

## Key Integration Patterns

### Typeform → Braze (Webhook Pattern)
Typeform submits responses to a configured webhook URL. The receiving endpoint maps form fields to Braze user attributes and calls `/users/track`. The Braze external ID must be embedded in the Typeform URL as a hidden field so it's included in the webhook payload.

### eduMe → Braze (Deep Link Delivery)
Braze sends a message containing a deep link to the eduMe course. The link includes the user's Braze external ID or a partner-specific token. eduMe tracks completion and can fire a completion webhook back to Braze.

### Nift / dots.eco → Braze (Event Callback)
The partner SDK exposes a callback (e.g., `onRewardClaimed`) that the host app implements. Inside the callback, log a Braze custom event with relevant properties. Ensure the Braze SDK is initialized before the partner SDK fires callbacks.

### Survicate / Iterate (Embedded SDK)
These SDKs embed directly in the app. They identify the user via an external ID passed at initialization. Survey responses are synced to Braze via their respective REST API integrations — configure the Braze API key and base URL in the partner dashboard.

## Common Mistakes

- **Missing user identity in webhook payload**: If the Braze external ID isn't threaded through the partner flow from the start, webhook events cannot be attributed to a profile.
- **Race condition on SDK init**: Logging Braze events inside a partner callback before `Appboy.initialize()` completes silently drops events.
- **Attribute name mismatch**: Survey response fields mapped to Braze custom attributes must match exactly (case-sensitive) across the webhook handler and Braze schema.
- **Forgetting event properties**: Completion events without metadata (e.g., survey ID, reward value) limit downstream segmentation and personalization.
