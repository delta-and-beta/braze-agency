---
name: strategist-predictions
description: >-
  Building and applying predictive models for churn prevention and event
  likelihood targeting.
metadata:
  role: braze-strategist
  topics:
    - predictive-suite-predictive-churn
    - predictive-churn-creating-a-churn-prediction
    - predictive-churn-messaging-users
    - predictive-churn-use-case
    - predictive-churn-analytics
    - predictive-churn-troubleshooting
    - predictive-suite-predictive-events
    - predictive-events-creating-an-event-prediction
    - predictive-events-messaging-users
    - predictive-events-use-case
    - predictive-events-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill loaded here is primarily about TDD for creating reusable meta-skills. This request is different — it's generating the *body content* of a domain knowledge SKILL.md for a Braze plugin. The TDD rigor applies when building framework skills; for domain reference files like this, the structure guidance (overview, when to use, quick reference, common mistakes) is what matters.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Predictive Modeling & Churn Prevention

## Overview

This skill synthesizes Braze's Predictive Suite capabilities — Predictive Churn and Predictive Events — into actionable retention strategy. It covers how to define, train, interpret, and act on ML models that surface at-risk users and event-likely users before observable signals appear.

**Core lens:** Treat user retention as a forward-looking problem. Instead of reacting to churn after it happens, use predicted risk scores to intercept users at the optimal intervention window — before they've already decided to leave or act.

---

## When to Use This Skill

Use when:
- A client wants to reduce churn but isn't sure how to define or segment "at-risk" users
- You're designing a re-engagement Canvas and need a data-driven entry criterion
- A team asks how to use Predictive Churn or Predictive Events filters in campaigns
- You need to explain training windows, prediction windows, or churn definitions to stakeholders
- A prediction model isn't generating results and you're troubleshooting low-quality data
- You're targeting users based on likelihood to purchase, convert, or perform a key event

---

## Lens: Proactive Retention Through Predictive Intelligence

The default framing for retention campaigns is reactive — a user goes quiet, a lapse timer fires, a win-back message sends. Predictive modeling inverts this.

**The strategic shift:** Surface the risk score *before* the user churns, then apply the lightest-touch intervention that changes trajectory. High-risk users get more assertive re-engagement. Low-risk users get left alone (protecting deliverability and reducing message fatigue). Medium-risk users get soft nudges.

This skill applies that lens to both churn prevention (stop someone from leaving) and event likelihood (capture someone about to convert). Both use the same infrastructure; the directionality differs.

---

## Topics Synthesized

### Predictive Churn

| Topic | What It Covers |
|---|---|
| **Predictive Churn Overview** | How Braze trains gradient boosted decision trees on your app's behavioral signals; definition of churn window vs. prediction window |
| **Creating a Churn Prediction** | Step-by-step: navigating to Analytics > Predictive Churn, setting churn definition, configuring the training and prediction windows, enforcing the 2-prediction limit per workspace |
| **Messaging At-Risk Users** | Using `Churn Risk Score` and `Churn Category` as filters in segments, campaigns, and Canvas steps — same interface as any other Braze filter |
| **Churn Prediction Use Case** | End-to-end re-engagement Canvas pattern: high-risk → aggressive intervention, medium-risk → soft nudge, low-risk → exclude |
| **Churn Prediction Analytics** | Reading the Prediction Quality chart, interpreting the audience size bar, finding the optimal score threshold for your target segment size |
| **Churn Prediction Troubleshooting** | Resolving "Not Enough Data to Train" errors; expanding churn definitions; handling stale predictions when user behavior shifts seasonally |

### Predictive Events

| Topic | What It Covers |
|---|---|
| **Predictive Events Overview** | How event prediction works: identifies users likely to perform a custom event (purchase, booking, upgrade) within a future window |
| **Creating an Event Prediction** | Navigating to Analytics > Predictive Events; choosing the target event; setting correlation events; workspace limits |
| **Messaging Predicted Users** | `Event Likelihood Score` and `Likelihood Category` filters; how to combine with other filters for precision targeting |
| **Event Prediction Use Case** | Purchase likelihood targeting pattern: score-based tiering, time-sensitive messaging for highest-likelihood users, catalog personalization |
| **Event Prediction Analytics** | Reading the analytics page after a prediction finalizes; correlating messaging sends with event conversion rates |

---

## Core Patterns

### Defining a Good Churn Window

The churn definition is the single highest-leverage configuration decision. Common mistakes:
- **Too narrow:** Fewer than 10,000 users meet the definition → model can't train
- **Too broad:** Half your MAU qualifies as "churned" → score has no discriminatory power

Good heuristics:
- Start with your app's natural engagement cadence (daily app → 7-day churn; weekly email → 30-day churn)
- The prediction window should be shorter than the churn window (predict before the window closes)
- If training fails with "Not Enough Data," expand the window or reduce activity requirements

### Score Thresholding vs. Category Targeting

Braze provides both a continuous `Churn Risk Score` (0–100) and bucketed `Churn Category` (High / Medium / Low / Very Low). 

- Use **categories** when you want a simple Canvas branch (High → aggressive, Medium → soft)
- Use **score thresholds** when you need precise audience sizing or are optimizing for a budget constraint (e.g., "target the top 5,000 at-risk users")

### Prediction Freshness

Predictions are not real-time. They train on a historical window and score users at a point in time. Plan re-training cadence:
- Seasonal behavior shifts (holiday shopping, school year) can make stale predictions misleading
- Reassemble or retrain predictions when significant product changes alter user behavior baselines

---

## Quick Reference

```
Churn prediction location:     Analytics > Predictive Churn
Event prediction location:     Analytics > Predictive Events
Max active predictions:        2 per workspace (both types combined)
Filter names (churn):          "Churn Risk Score", "Churn Category"
Filter names (events):         "Event Likelihood Score", "Likelihood Category"
Model type:                    Gradient boosted decision tree
Minimum training data:         ~10,000 qualifying users (approximate)
Score range:                   0–100 (higher = higher risk/likelihood)
Categories:                    High, Medium, Low, Very Low
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Churn window too restrictive → training fails | Expand days or reduce required inactivity threshold |
| Targeting only "High" churn category | Test Medium-risk too — often larger audience, lower intervention cost |
| Using event prediction for rare events (<1% base rate) | Choose a higher-frequency upstream event as proxy |
| Building Canvas before prediction model finalizes | Wait for "Ready" status in prediction dashboard before building targeting logic |
| Ignoring Prediction Quality score | Low quality (<60%) means model has weak signal — reconsider churn definition or data hygiene |

---

## Strategic Playbook: Tiered Retention Canvas

```
Entry: Segment "Churn Risk Score > 50"
  │
  ├── High (70–100)  → Immediate personal outreach + strong incentive
  ├── Medium (40–69) → Re-engagement series (3-step, value-led)
  └── Low (<40)      → Passive nurture or exclude entirely

Exit: Convert prediction score improvement into retention metric dashboard
```

For event prediction, invert the same structure: highest likelihood users receive time-sensitive CTAs; medium likelihood users receive social proof; low likelihood users receive educational content building toward the event.

---

`★ Insight ─────────────────────────────────────`
The "Quick Reference" code block with exact filter names is intentional — when Claude is mid-canvas-build and needs the filter name verbatim, scanning a table or prose is slower than finding it in a pre-formatted block. Skill files that frontload copy-pasteable strings reduce lookup latency in tool-augmented flows.
`─────────────────────────────────────────────────`
