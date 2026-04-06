---
name: analyst-canvas-analytics
description: >-
  Canvas-specific analytics including funnel reports, retention measurement, and
  journey performance.
metadata:
  role: braze-analyst
  topics:
    - canvas-testing-retention-reports
    - canvas-testing-measuring-and-testing-with-canvas-analytics
    - canvas-testing-canvas-funnel-reports
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Braze Canvas skill files follow the **reference skill** archetype from the writing-skills guide — they're lookup documents, not discipline-enforcing rules. That means the structure should optimize for **retrieval**: a clear "when to use" section, tables for quick scanning, and topic sections that mirror the source material. The lens ("Measurement") is the key framing device — it scopes out the *build* use cases and focuses entirely on *analysis*.
`─────────────────────────────────────────────────`

Here's the skill file body:

---

# Canvas Analytics

## Overview

This skill covers Canvas-specific measurement and analysis in Braze. Use it to interpret what Canvas journeys tell you about engagement, conversion, and retention — not to configure or build them. The lens is **Measurement**: how to read Canvas data, diagnose performance problems, and quantify journey impact.

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| Canvas Analytics & Measurement | Journey-level performance, variant analysis, conversion tracking, step-level behavioral metrics |
| Canvas Funnel Reports | Step-by-step funnel visualization, drop-off identification, conversion path analysis |
| Canvas Retention Reports | Cohort-based retention curves, re-engagement measurement, long-term behavioral outcomes |

## When to Use

- Evaluating whether a Canvas is achieving its conversion or engagement goal
- Identifying which step in a multi-step journey is causing the most drop-off
- Measuring long-term retention impact of a Canvas campaign
- Comparing variant performance in a Canvas A/B or multivariate experiment
- Building a performance summary for a Canvas to share with stakeholders

**Not for:** Canvas configuration, step setup, or content decisions — use construction-focused skills for those.

---

## Canvas Analytics & Measurement

Canvas analytics surfaces performance across all steps, variants, and channels in a single journey view.

### Key Metrics

**Journey-level:**
- **Total entries** — unique users who entered the Canvas
- **Unique recipients** — users who received at least one message
- **Conversion rates** — primary and secondary conversion event completions
- **Revenue** (if configured) — attributed to Canvas entries within the conversion window

**Step-level:**
- **Step entries** — users who reached each step
- **Message performance** — delivery, open, click rates per step
- **Progression rate** — share of users advancing to the next step

### Variant Analysis

When Canvas includes variants or a control group:

1. Compare **conversion rates**, not just message engagement metrics
2. Check both primary conversion event (Canvas goal) and downstream behavioral signals
3. Confirm statistical significance before drawing conclusions — Braze surfaces significance indicators in the dashboard
4. Control group delta reveals true lift above baseline behavior

### Reading the Analytics Dashboard

Start broad, then drill down:

1. **Journey level** — is overall conversion on target?
2. **Step level** — where is the largest single drop-off?
3. **Message level** — is the channel or content underperforming at that step?
4. **Variant breakdown** — is one path significantly outperforming others?

---

## Canvas Funnel Reports

Funnel reports visualize how users move through a defined event sequence, showing exactly where the journey loses momentum.

### Funnel Structure

```
Entry → Step A → Step B → … → Conversion Event
```

Each stage shows users who completed it, the percentage who progressed from the prior stage, and drop-off volume.

### Diagnosing Drop-Off

When a step shows significant drop-off, check in this order:

| Check | What to Look For |
|-------|-----------------|
| Message delivery | Were messages sent and delivered successfully? |
| Message engagement | Low open/click rates suggest content or timing problems |
| Step delay | Users may be timing out before the next step triggers |
| Exit criteria | Users may be exiting the Canvas before reaching that step |

### Common Funnel Use Cases

| Scenario | Key Question |
|----------|-------------|
| Onboarding flow | Where do new users abandon before completing setup? |
| Purchase funnel | What is the cart → checkout → purchase conversion rate? |
| Re-engagement sequence | Which re-engagement message converts dormant users? |
| Feature adoption | Does the awareness message lead to feature-use events? |

---

## Canvas Retention Reports

Retention reports measure whether Canvas entrants exhibit lasting behavioral changes over time — not just a spike on message day.

### What Retention Measures

- **Day N retention** — share of users who returned or completed the target event N days after Canvas entry
- **Cohort comparison** — Canvas entrants vs. control group or non-entrants over the same window
- **Event-based retention** — users who performed a specific action within a defined time range

### Interpreting Retention Curves

A Canvas with genuine retention impact shows:
- Higher retention for entrants vs. control throughout the measurement window
- A durable effect beyond the initial send day
- A leveled-off baseline above non-messaged users

**Red flags:**
- Canvas entrants track the same curve as control → no measurable retention impact
- Spike on send day only → short-term engagement, no lasting behavior change
- Canvas entrants churn faster than control → possible over-messaging or irrelevant content

### Measurement Approach

1. Define the retention event (app open, purchase, feature use)
2. Set the measurement window (Day 7, Day 30, Day 90)
3. Compare Canvas entrants to an equivalent non-Canvas cohort or control group
4. Where possible, attribute retention changes to specific Canvas steps

---

## Common Analytical Mistakes

| Mistake | Better Approach |
|---------|----------------|
| Evaluating only open/click rates | Always trace through to conversion and retention events |
| Comparing variants without significance checks | Use Braze's significance indicators before acting on variant differences |
| Measuring retention on send day only | Track Day 7, 30, and 90 for durable impact evidence |
| Ignoring control groups | Always benchmark Canvas performance against an equivalent baseline |
| Aggregating step metrics without drill-down | Examine each step individually to locate the bottleneck |

---

`★ Insight ─────────────────────────────────────`
The "Common Analytical Mistakes" table at the end serves a specific discovery function: it gives Claude search-relevant terms ("variant", "retention", "control group", "statistical significance") that match the symptoms an analyst would describe when asking for help. In a RAG/semantic search retrieval scenario, the mistakes table often provides the highest-density signal for routing a query to this skill.
`─────────────────────────────────────────────────`
