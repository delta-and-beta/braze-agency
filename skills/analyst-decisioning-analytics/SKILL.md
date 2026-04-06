---
name: analyst-decisioning-analytics
description: >-
  Analyzing decisioning studio performance through timeline, diagnostics, and
  insight reports.
metadata:
  role: braze-analyst
  topics:
    - decisioning-studio-reporting
    - decisioning-reporting-timeline
    - decisioning-reporting-performance
    - decisioning-reporting-insights
    - decisioning-reporting-diagnostics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes "lens" as critical context: it tells Claude *how* to interpret data, not just *what* data exists. For an analyst role, the lens (evaluating AI decisioning effectiveness) shapes every table and recommendation in the skill.
`─────────────────────────────────────────────────`

# Decisioning Performance Analytics

## Overview

This skill covers how to analyze, interpret, and act on reporting data from BrazeAI Decisioning Studio™. Use it when evaluating whether an AI decisioning agent is performing effectively—comparing against control groups, diagnosing data health, tracing recommendation logic, and reading timeline events.

**Analyst lens:** Approach all reports through the lens of *AI decisioning effectiveness*—not just whether messages were sent, but whether the agent's recommendations outperformed baseline behavior, why selections were made, and where data gaps may be distorting the signal.

---

## When to Use This Skill

Use this skill when asked to:
- Interpret uplift charts, control group comparisons, or BAU benchmarks
- Diagnose why a decisioning agent's performance looks unexpected
- Explain what the Outbound or Inbound diagnostics tabs are flagging
- Read timeline annotations and correlate events to performance shifts
- Evaluate recommendation diversity, option selection, or agent coverage
- Confirm whether reporting prerequisites (population size, control group setup) are met

**Do not use** for campaign-level reporting unrelated to Decisioning Studio, or for standard Canvas/email analytics.

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **Decisioning Reporting Overview** | Prerequisites, report access, data freshness, and overall reporting structure |
| **Timeline Reports** | Visual event annotations overlaid on uplift charts; key change tracking |
| **Performance Reports** | Uplift vs. control group (BAU); how the report is structured and interpreted |
| **Insights Reports** | Agent Insights (how options are generated) and Selection Insights (why options were chosen) |
| **Diagnostics Reports** | Outbound (message volume) and Inbound (profile data health) monitoring views |

---

## Report Types at a Glance

### Performance Report
- Compares decisioning agent results against a control group
- Primary metric: **uplift** over Business as Usual (BAU)
- Look for: statistical significance, cohort size, time window alignment
- Analyst flag: uplift without a properly sized control group is unreliable

### Timeline Report
- Overlays annotations (agent changes, data events, configuration updates) on the uplift chart
- Dedicated timeline table lists events chronologically
- Use to explain inflection points: "why did performance drop on this date?"

### Insights Reports
Two sub-reports:
1. **Agent Insights** — how recommendation options in the action bank are generated
2. **Selection Insights** — which options are being selected and at what frequency

Use Selection Insights to detect over-selection (one option dominating) or under-exploration (options never surfaced).

### Diagnostics Report
Two views:
1. **Outbound** — daily volume of messages sent by the agent; tracks delivery health
2. **Inbound** — quality of profile data flowing into the agent; flags missing attributes or stale signals

Inbound diagnostics are often the root cause of unexplained performance issues.

---

## Common Analytical Patterns

**Performance looks flat despite agent being active**
→ Check Inbound diagnostics for data gaps; verify control group population is comparable

**Unexpected performance drop on a specific date**
→ Open Timeline report; look for agent configuration changes, action bank edits, or data pipeline events near that date

**One recommendation option dominates Selection Insights**
→ Review action bank diversity and whether exploration settings are configured; may indicate insufficient option variety or reward signal bias

**Outbound volume drops suddenly**
→ Check Outbound diagnostics for send failures or eligibility filter changes; cross-reference with Timeline annotations

---

## Reporting Prerequisites

Before interpreting results, confirm:
- A control group (holdout) is configured for the agent
- The agent has been running long enough to accumulate statistically meaningful data
- Profile attributes feeding the agent are fresh and populated (Inbound diagnostics)
- The reporting time window aligns with the agent's active period

Missing any of these invalidates performance comparisons.

---

## Key Terms

| Term | Meaning |
|---|---|
| **BAU (Business as Usual)** | Control group baseline; non-decisioned behavior |
| **Uplift** | Performance gain of the agent over BAU |
| **Action bank** | The set of recommendation options available to the agent |
| **Inbound diagnostics** | Health of profile data entering the decisioning system |
| **Outbound diagnostics** | Volume and delivery health of messages sent by the agent |
| **Selection Insights** | Frequency and distribution of which options the agent chose |
| **Agent Insights** | How the agent generates and scores its recommendation set |

`★ Insight ─────────────────────────────────────`
The skill separates *what happened* (Performance/Timeline) from *why it happened* (Insights/Diagnostics) — a deliberate diagnostic layering. The "common analytical patterns" section encodes the analyst's decision tree, so Claude routes to the right report type without the user needing to specify it.
`─────────────────────────────────────────────────`
