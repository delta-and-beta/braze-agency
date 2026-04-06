---
name: strategist-canvas-planning
description: >-
  Strategic planning for Canvas-based engagement flows, lifecycle journeys, and
  multi-step user experiences leveraging templates and best practices.
metadata:
  role: braze-strategist
  topics:
    - canvas-get-started
    - canvas-get-started-the-basics
    - canvas-get-started-canvas-outlines
    - canvas-ideas-and-strategies
    - canvas-managing-canvases
    - canvas-get-started-braze-templates-lapsed-user
    - canvas-get-started-braze-templates-onboarding
    - canvas-get-started-braze-templates-feature-adoption
    - canvas-get-started-braze-templates-abandoned-cart
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Plugin skill files serve a different purpose than personal `~/.claude/skills` files — they're **domain knowledge synthesis artifacts** read by role agents (like `braze-strategist`) to answer queries, not behavioral directives for Claude itself. The "lens" field is key: it anchors how the agent interprets and applies the synthesized topics.
`─────────────────────────────────────────────────`

Here's the generated skill file content:

---

# Canvas Strategy & Planning

## Overview

This skill guides strategic planning for Braze Canvas — the multi-step, behavior-driven messaging orchestration tool. It synthesizes foundational Canvas concepts, lifecycle templates, pre/post-launch best practices, and flow management patterns into actionable strategy for engagement professionals.

**Lens:** How to strategically plan Canvas flows for maximum user engagement — from initial journey scoping through launch validation and ongoing optimization.

Use this skill when:
- Deciding whether to use a Campaign vs. a Canvas for a given use case
- Designing multi-step lifecycle journeys (onboarding, lapsed user re-engagement, feature adoption, abandoned cart)
- Structuring a Canvas before building it in the Braze UI
- Auditing a Canvas before or after launch
- Migrating from the original Canvas experience to Canvas Flow

---

## When to Use Canvas vs. Campaign

Canvas is the right choice when your messaging involves **multiple steps, branching logic, or time-delayed sequences**. For single, targeted messages to a group, a Campaign is simpler and faster.

| Use Case | Recommended Tool |
|----------|-----------------|
| One-time promotional blast | Campaign |
| Welcome series (3+ touches) | Canvas |
| Re-engagement with conditional branching | Canvas |
| A/B test of a single message | Campaign |
| Onboarding lifecycle with behavior triggers | Canvas |
| Abandoned cart with follow-up logic | Canvas |

---

## Canvas Journey Archetypes

This skill synthesizes five core lifecycle templates. Each represents a proven strategic pattern:

### 1. Onboarding
**Goal:** Drive strong initial adoption and build lasting user relationships.
- Trigger: New account creation or first app open
- Strategy: Start with value confirmation, layer in feature discovery, end with habit-forming nudges
- Key question: What actions define a "successfully onboarded" user?

### 2. Lapsed User Re-engagement
**Goal:** Remind users of brand value; incentivize return with personalized offers.
- Trigger: N days since last session or purchase (define your lapse threshold by segment)
- Strategy: Escalating value messaging → soft incentive → hard offer → sunset
- Key question: At what point does continued messaging hurt deliverability more than it helps re-engagement?

### 3. Feature Adoption
**Goal:** Drive usage of new or underutilized features, products, or offerings.
- Trigger: Feature release date or user eligibility flag
- Strategy: Awareness → education → activation → celebration of first use
- Key question: Which user segments are highest-propensity adopters?

### 4. Abandoned Cart
**Goal:** Recover purchase intent with timely, personalized messaging.
- Trigger: Cart abandonment event (real-time)
- Strategy: Immediate reminder → urgency nudge (limited stock/offer expiry) → final recovery attempt
- Key question: What incentive threshold converts without over-discounting?

### 5. Custom Lifecycle (Canvas Outlines)
For journeys outside these archetypes, use Canvas Outlines as a planning scaffold — answer the five W's (Who, What, When, Where, Why) before building a single step.

---

## Strategic Planning Framework

Before opening the Canvas builder, validate your journey design against these questions:

### Scope Definition
- **Who** is the audience? (Entry criteria, segment filters)
- **What** is the desired end state? (Conversion, retention, activation)
- **When** should users enter? (Event trigger, scheduled, API-triggered)
- **Where** are you meeting them? (Push, email, in-app, SMS, webhook)
- **Why** this Canvas? (What fails if this doesn't exist?)

### Canvas Architecture Principles
- **Start narrow:** Overly broad entry audiences dilute message relevance
- **Model exit paths:** Every Canvas needs explicit exit criteria (conversion, disqualification, expiry)
- **Respect frequency caps:** Even high-priority Canvases should honor global frequency settings
- **Branch on behavior, not assumptions:** Use action-based splits over random splits for lifecycle flows
- **Plan for Canvas Flow:** All new Canvases must be built in Canvas Flow (original experience deprecated)

---

## Pre-Launch Checklist

Before activating any Canvas:

- [ ] Entry audience verified against test segment
- [ ] All message variants proofed (copy, links, personalization tokens)
- [ ] Quiet hours configured where applicable
- [ ] Conversion tracking events defined
- [ ] Exit conditions set (conversion event, re-eligibility window)
- [ ] Frequency cap conflict check completed
- [ ] Connected Content endpoints load-tested (if applicable)
- [ ] Test sends completed for each channel in the flow

## Post-Launch Validation

Within 24–48 hours of launch:

- [ ] Entry volume matches projected audience size
- [ ] Step-level conversion funnel inspected for unexpected drop-off
- [ ] Deliverability metrics (open rate, bounce rate) within baseline range
- [ ] Unsubscribe/opt-out spike check
- [ ] Any Liquid rendering errors surfaced in message logs

---

## Managing Canvases

### Canvas Flow Migration
Braze has deprecated the original Canvas experience. All Canvases must be created in **Canvas Flow**. To migrate:
- Clone the original Canvas (creates a Canvas Flow copy)
- Verify step mapping — original steps translate to Canvas Flow components
- Validate audience, triggers, and exit criteria in the cloned version before archiving the original

### Cloning Best Practices
- Clone as a starting point for similar journeys, not as a versioning mechanism
- Rename clones immediately to avoid confusion in the dashboard
- Tag Canvases with lifecycle stage and owning team for discoverability

---

## Topics Synthesized

This skill draws from the following Braze documentation topics:

| Topic | Strategic Contribution |
|-------|----------------------|
| Get Started: Campaigns and Canvases | Canvas vs. Campaign decision framework |
| Canvas Basics | Journey scoping questions and foundational concepts |
| Canvas Outlines | Pre-build planning scaffold (the five W's) |
| Onboarding Template | Onboarding archetype pattern |
| Lapsed User Template | Re-engagement escalation strategy |
| Feature Adoption Template | Activation journey structure |
| Abandoned Cart Template | Real-time recovery flow design |
| Managing Canvases (Clone to Flow) | Migration and lifecycle management |
| Canvas Ideas & Strategies (Pre/Post-launch Checklist) | Launch validation checklist |

---

## Common Strategic Mistakes

| Mistake | Better Approach |
|---------|----------------|
| Building Canvas before defining success metric | Define conversion event first; it shapes every branch |
| Using random splits for lifecycle logic | Use action-based splits to respond to actual behavior |
| No exit condition = users stuck forever | Always configure re-eligibility window and conversion exit |
| Launching to full audience immediately | Use a holdout or phased rollout for new Canvases |
| Treating all channels identically in a multi-channel Canvas | Sequence channels by friction (push first, email for depth, SMS for urgency) |
| Ignoring frequency caps in Canvas settings | Check global + local caps; re-engagement Canvases are high churn risk |

---

`★ Insight ─────────────────────────────────────`
The **"Topics Synthesized" table** at the end serves a dual purpose: it's attribution for the knowledge source AND a quick mental map for the agent to know which source document to reference when a query drills into a specific subtopic. This pattern mirrors how a well-structured textbook chapter ends with a bibliography that's also a navigation guide.
`─────────────────────────────────────────────────`
