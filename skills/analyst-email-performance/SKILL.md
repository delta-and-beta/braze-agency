---
name: analyst-email-performance
description: 'Email reporting, analytics, and performance measurement.'
metadata:
  role: braze-analyst
  topics:
    - email-reporting-and-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes CSO (Claude Search Optimization): skills should be structured so Claude can quickly decide if the skill is relevant, scan key patterns, then dive into implementation. For a "lens"-based skill like this, the lens description upfront acts as a mental model filter — it helps Claude quickly know *how* to think about a topic, not just what topics it covers.
`─────────────────────────────────────────────────`

Here's the generated skill body:

---

# Email Performance Analytics

## Overview

This skill covers how to **measure, report on, and interpret email campaign performance** in Braze. The lens is **Measurement** — not campaign setup or sending mechanics, but how to assess what happened after the send: what worked, what didn't, and what to do next.

Use this skill when answering questions about email metrics, performance benchmarks, report interpretation, deliverability analysis, or presenting campaign results to stakeholders.

## Scope

This skill synthesizes knowledge from:

- **Email Reporting & Analytics** — core metrics, dashboard interpretation, and analytic workflows for evaluating email campaign outcomes

## Lens: Measurement

The measurement lens means this skill approaches email from the perspective of *outcome assessment*. Every concept here should answer one of three questions:

1. **What happened?** (metrics, dashboards, raw data)
2. **Why did it happen?** (interpretation, segmentation, attribution)
3. **What should we do next?** (benchmarking, optimization signals)

This skill does **not** cover campaign creation, template design, or audience segmentation — those belong to adjacent skills. If a question is about configuring a campaign to *enable* tracking, it's out of scope here.

## Core Email Metrics

| Metric | What It Measures | Watch For |
|--------|-----------------|-----------|
| **Delivery Rate** | % of sends that reached the inbox | Low rate signals list quality or sender reputation issues |
| **Open Rate** | % of delivered emails opened | Affected by Apple MPP; treat as directional, not absolute |
| **Click Rate (CTR)** | % of delivered emails with a click | More reliable than open rate post-MPP |
| **Click-to-Open Rate (CTOR)** | Clicks ÷ opens | Measures content relevance for those who opened |
| **Unsubscribe Rate** | % who opted out per send | Spike signals audience-content mismatch |
| **Bounce Rate (Hard/Soft)** | Undeliverable addresses | Hard bounces should trigger list suppression |
| **Spam Complaint Rate** | % marked as spam | >0.08% signals sender reputation risk |
| **Revenue / Conversion Rate** | Downstream business outcomes | Requires event tracking integration |

## When to Use This Skill

- Interpreting a Braze campaign or Canvas performance report
- Explaining what a metric means and how to act on it
- Comparing performance across campaigns, segments, or time periods
- Diagnosing deliverability or engagement drops
- Presenting email results to stakeholders or leadership
- Setting performance benchmarks or KPIs for email programs
- Answering questions about Apple Mail Privacy Protection (MPP) impact on reporting

## Key Interpretation Patterns

### Open Rate Caveat (Post-MPP)
Apple MPP prefetches email pixels, inflating open rates for Apple Mail users. Treat open rate as a trend indicator rather than a precise signal. Rely more heavily on **CTOR** and **click rate** for engagement measurement.

### Engagement Tier Analysis
Rather than looking at aggregate metrics, segment by engagement tier:
- **Highly engaged** (opened + clicked in last 90 days)
- **Lapsing** (opened but not clicked in 90 days)
- **Dormant** (no engagement in 180+ days)

Performance breakdowns by tier reveal whether a campaign's aggregate metrics are driven by your core audience or dragged down by dormant addresses.

### Attribution Window Awareness
Conversion metrics depend on attribution window configuration. When reporting revenue or purchase events, always confirm the window (e.g., 3-day, 7-day) and apply it consistently across comparisons.

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Comparing open rates across date ranges that span the MPP rollout (Sep 2021) | Normalize pre/post MPP comparisons using click-based metrics |
| Treating bounce rate as a one-time concern | Monitor bounce rates per send; hard bounces compound over time |
| Reporting CTOR without noting it excludes non-openers | Always clarify CTOR denominator in stakeholder reports |
| Using a single campaign's metrics as a benchmark | Build benchmarks from rolling 90-day averages across comparable sends |

---

`★ Insight ─────────────────────────────────────`
The "topics synthesized" section is important for provenance — it tells future Claude which knowledge sources were combined to create the skill, which matters when the skill needs to be refreshed or audited. Even when source docs are minimal (as noted in this case), naming the topic makes the skill's coverage boundary explicit rather than ambiguous.
`─────────────────────────────────────────────────`
