---
name: strategist-canvas-design
description: >-
  Canvas journey design including use cases, entry/exit criteria, launch
  strategy, and best practices.
metadata:
  role: braze-strategist
  topics:
    - canvas-ideas-best-practices
    - canvas-ideas-ecommerce-use-cases
    - canvas-ideas-booking-use-case
    - canvas-ideas-matching-entry-and-exit-criteria
    - canvas-ideas-launching-canvas-flow
    - canvas-ideas-pre-post-launch-checklist
    - sms-mms-rcs-retargeting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Plugin skills synthesize domain knowledge from documentation sources — they differ from personal skills (behavioral enforcement) in that they're reference guides agents consult for *what to do*, not *how to behave*
- Organizing topics by workflow stage (plan → configure → launch → validate) creates a stronger mental model than listing them by name alone
- The "lens" concept is the most important differentiator: identical topics could serve a technical lens ("how to configure") vs a strategy lens ("when and why to use") — making this explicit helps the router select the right skill
`─────────────────────────────────────────────────`

---

# Canvas Journey Strategy

## Overview

This skill covers the strategic design and lifecycle management of Braze Canvas journeys — from defining use cases and audience entry conditions through to launch readiness and post-launch validation.

**Lens: Strategy** — This skill approaches Canvas from the perspective of *how to design, plan, and optimize* user journeys. It addresses the *why* and *when* of Canvas decisions, not the technical mechanics of how to configure individual components. Use this skill when planning a new journey, evaluating whether a Canvas design is sound, or preparing for a launch review.

---

## When to Use This Skill

Use this skill when:

- Defining the purpose and scope of a new Canvas journey
- Choosing entry conditions, exit criteria, or audience segmentation strategy
- Planning ecommerce, booking, or SMS retargeting use cases in Canvas
- Preparing for a Canvas launch (pre-launch checklist, testing, sign-off)
- Evaluating whether an existing Canvas follows best practices
- Advising on how to structure multi-step journeys using Canvas Flow

Do **not** use this skill for step-by-step technical configuration (e.g., how to set up a specific message step, Liquid syntax, or API triggers) — those belong to implementation-focused skills.

---

## Topics This Skill Synthesizes

| Topic | What It Covers |
|---|---|
| **Canvas Best Practices** | Core principles for purposeful journey design: defining goals, identifying audience, and structuring flows for clarity and effectiveness |
| **Entry & Exit Criteria** | How to align exit criteria with entry events so users leave or branch only when semantically correct conditions are met |
| **Launching Canvas Flow** | Pre-launch checkpoints specific to Canvas Flow — verifying targeting, frequency caps, and message readiness before going live |
| **Canvas Pre/Post Launch Checklist** | End-to-end launch checklist covering audience checks, message QA, timing review, and post-launch monitoring |
| **Ecommerce Canvas Use Cases** | How to apply Braze eCommerce recommended events in Canvas templates (browse abandon, cart abandon, purchase follow-up) |
| **Booking Canvas Use Case** | Journey patterns for booking-oriented flows where confirmations, reminders, and follow-ups must be sequenced correctly |
| **SMS Retargeting** | Using Canvas to retarget users based on SMS interactions, subscription state changes, and keyword-triggered behaviors |

---

## Strategic Framework

### 1. Define Purpose First

Every Canvas should start with three questions:
- **What** outcome does this journey drive? (conversion, retention, re-engagement)
- **Who** is the right audience? (segment fit, subscription status, lifecycle stage)
- **Why** Canvas? (multi-step logic, branching, timing control — not single sends)

### 2. Design Entry and Exit Together

Entry and exit criteria are a matched pair. A user who enters based on an action (e.g., abandoned cart) should exit when that action resolves (e.g., purchase made) or when a maximum journey duration has elapsed. Mismatched entry/exit logic causes users to receive irrelevant messages mid-journey.

### 3. Match Use Case to Canvas Pattern

| Use Case | Recommended Pattern |
|---|---|
| Ecommerce abandonment | Event-triggered Canvas with action-based exit on purchase |
| Booking confirmation + reminder | Scheduled Canvas with relative timing steps |
| SMS retargeting | Keyword-triggered entry with subscription-state branching |
| Winback / re-engagement | Segment-entry Canvas with Audience Sync or sunset path |

### 4. Launch Readiness Gates

Before launching any Canvas, verify:
- Targeting and entry segment are correctly scoped
- All message variants have been proofed and tested
- Frequency cap and quiet hours settings are appropriate
- Exit criteria are configured and tested against expected user behaviors
- Conversion tracking events are attached

---

## Key Strategic Principles

- **Purposeful branching**: Add branches only when the path genuinely changes the user experience. Excessive branching creates maintenance burden without strategic benefit.
- **Journey length discipline**: Shorter journeys with clear goals outperform long journeys with vague objectives. Default to fewer steps and add complexity when data justifies it.
- **Exit as a first-class concern**: Designing exit criteria at the same time as entry prevents users from being trapped in stale journeys.
- **Test before scale**: Use Canvas preview, seed sends, and limited rollout before full launch — especially for ecommerce and transactional flows where mis-sends carry real cost.

`★ Insight ─────────────────────────────────────`
- The "Entry & Exit Together" framing is specific to Braze Canvas behavior — in most marketing automation tools, exit is an afterthought, but Braze's Canvas Flow makes entry/exit symmetry semantically meaningful at the engine level
- The "match use case to pattern" table is the most reusable part of this skill: it gives the strategist a starting point without having to derive it from first principles each time
`─────────────────────────────────────────────────`
