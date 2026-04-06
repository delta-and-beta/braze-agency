---
name: engineer-canvas-creation
description: >-
  Technical implementation of Canvas flows including entry properties, context
  variables, channel configuration, exit criteria, and rate limiting.
metadata:
  role: braze-engineer
  topics:
    - canvas-get-started
    - canvas-get-started-the-basics
    - canvas-get-started-canvas-outlines
    - canvas-create-a-canvas
    - canvas-create-a-canvas-rate-limiting
    - canvas-create-a-canvas-exit-criteria
    - canvas-create-a-canvas-context-variables
    - canvas-create-a-canvas-context-and-event-properties
    - canvas-create-a-canvas-canvas-persistent-entry-properties
    - canvas-create-a-canvas-canvas-comments
    - canvas-create-a-canvas-canvas-by-channel
    - canvas-create-a-canvas-in-app-messages-in-canvas
    - canvas-create-a-canvas-content-cards-in-canvas
    - canvas-managing-canvases
    - canvas-faqs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This is a **plugin skill** (not a personal superpowers skill), so it serves a different purpose: it provides domain knowledge synthesis for a `braze-engineer` agent role rather than enforcing workflows
- The writing-skills TDD checklist (RED/GREEN/REFACTOR) applies to process-enforcing skills; for reference/synthesis skills like this, the key goal is rich keyword coverage and clear "when to use" framing so the router selects it correctly
- The "lens" concept here is crucial — the same Canvas topics exist in other roles (e.g., a marketer), but the engineering lens filters toward API calls, config properties, and implementation details
`─────────────────────────────────────────────────`

```markdown
# Canvas Creation Engineering

## Overview

This skill covers the **technical implementation** of Braze Canvas flows — from initial configuration through channel setup, data passing, and lifecycle management. It answers the question: *how do I build this correctly as an engineer?*

Use this skill when:
- Implementing a Canvas from scratch (entry rules, steps, targeting)
- Configuring entry properties, context variables, or persistent event metadata
- Setting up channel-specific steps (in-app messages, Content Cards)
- Applying rate limiting, exit criteria, or exception events
- Debugging data flow between Canvas steps (context vs. event properties)
- Managing Canvas lifecycle: cloning, commenting, auditing

Do **not** use this skill for campaign-level messaging decisions, audience strategy, or A/B testing design — those belong in campaign planning and analytics skills.

---

## Topics Synthesized

| Topic | Engineering Relevance |
|---|---|
| Canvas Get Started / Basics | Canvas vs. campaign decision criteria; Canvas Flow architecture |
| Canvas Outlines | Structural planning before building |
| Create a Canvas | Step-by-step construction: entry rules, scheduling, targeting |
| Canvas Rate Limiting | Per-user send frequency controls during Canvas execution |
| Canvas Exit Criteria | Exception events that eject users before step completion |
| Canvas Context Variables | Temporary per-user data for dynamic delays and segmentation |
| Context and Event Properties | `context` vs. `event_properties` — behavior differences and use cases |
| Persistent Entry Properties | API/event metadata preserved across all Canvas steps |
| Canvas by Channel Overview | Channel availability and constraints per step type |
| In-App Messages in Canvas | IAM-specific trigger model, impression tracking, step config |
| Content Cards in Canvas | Content Card nuances: expiration, feed behavior, removal logic |
| Managing Canvases | Cloning from original Canvas experience to Canvas Flow |
| Canvas Comments | Collaborative annotation for complex multi-step Canvases |
| Canvas FAQs | Step limits, editing live Canvases, entry re-eligibility rules |

---

## Engineering Lens

This skill views Canvas through the lens of **implementation correctness and technical configuration**. For each design decision, the relevant questions are:

- What is the correct API shape or UI configuration?
- Which data passing mechanism is appropriate (`context`, `event_properties`, or entry properties)?
- What are the technical constraints (step limits, rate limits, channel availability)?
- How does the Canvas lifecycle affect live edits and user re-eligibility?

---

## Key Concepts

### Canvas Flow vs. Original Canvas

Always build in **Canvas Flow** (the current experience). The original Canvas editor is deprecated — cloning to Canvas Flow via the migration path is the correct path for legacy Canvases.

### Entry Rules and Targeting

- **Action-based entry**: triggered by custom events, purchases, or API calls
- **Scheduled entry**: time-based delivery
- **Audience entry**: segment-driven

Entry rules control **who enters** and **when**. Exception events at the entry level eject users at step boundaries — configure these as **exit criteria** to keep journeys clean.

### Data Passing: Three Mechanisms

| Mechanism | Scope | Persists Across Steps | Use Case |
|---|---|---|---|
| `event_properties` | Trigger event only | No — first step only | Message personalization at entry |
| Persistent entry properties | Whole Canvas | Yes | Metadata from triggering API call or event |
| Context variables | Whole Canvas (user-level) | Yes | Dynamic delays, conditional branching, segment qualification |

> **Critical distinction**: `event_properties` from the triggering event are only available in the first step. Use persistent entry properties or context variables when downstream steps need trigger metadata.

### Context Variables

Context variables are created and mutated as a user progresses through the Canvas. They support:
- Personalized delay durations
- Conditional step branching
- Dynamic segmentation without re-querying the segment database

Declare context variables in the Canvas entry settings. Reference them in step conditions using Liquid.

### Exit Criteria

Add exception events directly to Canvas entry rules to eject users when a condition is met — e.g., a user completes a purchase before receiving all messages. This prevents over-messaging and keeps journey logic accurate.

### Rate Limiting

Canvas rate limiting applies **per user per time window** across the Canvas execution, not per step. Configure at the Canvas level under delivery settings. Rate limits interact with Braze's global frequency capping — understand the precedence order before configuring.

---

## Channel-Specific Notes

### In-App Messages (IAM)
- IAMs in Canvas are **session-triggered**: the message is queued after the step is reached, but delivered on next app open
- No hard delivery guarantee within a time window — design IAM steps with this asynchrony in mind
- Track impressions separately from delivery

### Content Cards
- Content Cards in Canvas have **per-card expiration** configurable at the step level
- Removing a card from a live Canvas removes it from all users' feeds immediately
- Cards are associated with the Canvas step, not the send time — updates to card content affect all users who haven't dismissed yet

---

## Implementation Checklist

When building a new Canvas:

- [ ] Choose entry type (action-based, scheduled, or audience)
- [ ] Define exit criteria (exception events)
- [ ] Identify data that must persist across steps → use persistent entry properties or context variables
- [ ] Set rate limiting at Canvas level
- [ ] Configure step-level channels with correct trigger/delivery model
- [ ] Add comments to complex branching points for team clarity
- [ ] Validate Canvas Flow structure before launching (not original Canvas)
- [ ] Check step limit headroom (Canvases support many steps, but audit depth for maintainability)

---

## Common Mistakes

| Mistake | Correct Approach |
|---|---|
| Using `event_properties` in step 3+ | Use persistent entry properties instead |
| Building in original Canvas editor | Always use Canvas Flow |
| No exit criteria on purchase-triggered Canvases | Add purchase exception event as exit criterion |
| Assuming IAM delivers instantly | IAM delivers on next session — account for timing in journey design |
| Cloning without migrating to Canvas Flow | Use the explicit clone-to-Canvas-Flow migration path |
```

`★ Insight ─────────────────────────────────────`
- The **data passing table** (event_properties vs. persistent entry vs. context variables) is the most engineering-critical section — this is a frequent source of bugs where marketers assume trigger metadata is available throughout the Canvas when it only exists in step 1
- The **channel-specific notes** section deliberately avoids duplicating general channel docs; it only captures Canvas-specific nuances (IAM session-trigger model, Content Card expiration) that differ from standalone campaign behavior
- The implementation checklist follows the Nick plugin pattern of synthesizing topics into actionable guidance rather than summarizing source docs
`─────────────────────────────────────────────────`
