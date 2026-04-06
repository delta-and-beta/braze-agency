---
name: strategist-campaign-management
description: >-
  Plans campaign launches, canvas journey designs, and multi-step engagement
  flows using performance data.
metadata:
  role: braze-strategist
  topics:
    - export-campaigns-get-campaigns
    - export-campaigns-get-campaign-details
    - export-campaigns-get-campaign-analytics
    - export-canvas-get-canvases
    - export-canvas-get-canvas-details
    - export-canvas-get-canvas-analytics-summary
    - export-campaigns
    - export-canvas
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files follow a "lens" pattern — each skill isn't just a knowledge dump, it's a **perspective** on that knowledge. The same Braze API data read by a `braze:engineer` (implementation details) vs a `braze-strategist` (performance patterns) should produce fundamentally different guidance. The lens shapes how topics are synthesized, not just what topics are included.
`─────────────────────────────────────────────────`

# Campaign Strategy

## Overview

This skill guides strategic planning for Braze campaign launches and Canvas journey design using performance data. It synthesizes analytics, delivery details, and engagement metrics into actionable decisions about timing, sequencing, and flow optimization — not implementation mechanics.

The core principle: **data precedes decisions**. Before designing a journey or launching a campaign, pull performance baselines. Let send analytics, conversion attribution, and Canvas rollups inform the strategy rather than default to intuition.

## When to Use

Use this skill when:

- Planning a new campaign launch and deciding on timing, audience segmentation, or message sequencing
- Designing or auditing a multi-step Canvas journey for engagement flow
- Evaluating whether an existing Canvas or campaign is underperforming and needs restructuring
- Comparing campaign variants or channels to prioritize future efforts
- Building a reporting narrative around campaign or Canvas results for stakeholders

**Not for:** Debugging API integration issues, writing campaign delivery code, or managing Braze SDK setup — use `braze:engineer` for those.

## Lens: Campaign Timing, Journey Optimization, and Engagement Strategy

This skill reads all Braze campaign and Canvas data through a **strategic performance lens**:

- **Timing** — When did sends occur, and how did time-of-send correlate with conversion? The `/sends/data_series` endpoint provides daily granularity; use this to identify send-time patterns before scheduling new campaigns.
- **Journey optimization** — Canvas analytics summaries (`/canvas/data_summary`) expose rollup conversion rates across journey steps. Weak steps signal where users disengage and where branching logic should be revised.
- **Engagement strategy** — Multi-step flows should be designed around actual drop-off data, not assumed behavior. Canvas component-level exports reveal which touchpoints drive conversions vs. add noise.

## Topics Synthesized

| Topic | Strategic Relevance |
|-------|---------------------|
| **Export Send Analytics** (`/sends/data_series`) | Daily send stats for API campaigns; 14-day retention window means time-sensitive pull for post-launch reviews |
| **Get Campaign Details** (`/campaigns/details`) | Full delivery configuration — use to audit targeting, schedule, and conversion event alignment before launch or retrospective |
| **Get Campaign Analytics** (`/sends/data_series`) | Conversion attribution and send performance; baseline for A/B comparison and timing decisions |
| **List Canvases** (`/canvas/list`) | Paginated index of all Canvases; starting point for auditing active journey inventory |
| **Get Canvas Details** | Full Canvas configuration including steps, variants, and entry rules; required before redesigning a journey |
| **Get Canvas Analytics Summary** (`/canvas/data_summary`) | Rollup time series for a Canvas; the fastest way to assess overall journey health |
| **Canvas Export Overview** | CSV export paths for full Canvas or individual components; use for deep offline analysis or stakeholder reporting |
| **Campaigns Export Overview** | Send analytics export for API campaigns; complements in-API analytics for historical comparisons |

## Strategic Planning Workflow

When a stakeholder asks "how is this campaign performing?" or "should we redesign this Canvas?":

1. **Establish baseline** — Pull `/sends/data_series` or `/canvas/data_summary` for the target timeframe
2. **Check configuration** — Use `/campaigns/details` or Canvas details to verify delivery settings match intent
3. **Identify drop-off** — For Canvases, compare step-level analytics to find where users disengage
4. **Form a hypothesis** — Is the problem timing, message sequencing, audience mismatch, or conversion event definition?
5. **Recommend a change** — Propose specific adjustments to journey structure, entry cadence, or send timing based on data

## Key Constraints to Keep in Mind

- **14-day analytics retention** for `send_id`-level data — urgent pulls for recent campaigns
- **Canvas list is paginated** (100 per page, oldest-to-newest) — account for pagination when auditing large Canvas inventories
- **Conversion attribution** in send analytics follows the window defined at campaign creation — mismatched windows distort comparison across campaigns

## Common Mistakes

| Mistake | Better Approach |
|---------|-----------------|
| Designing a new Canvas without pulling existing Canvas analytics | Always benchmark against `/canvas/data_summary` for similar flows first |
| Recommending send-time changes based on a single day's data | Use daily series over 7–14 days to smooth variance |
| Treating Canvas rollup data as step-level insight | Rollups indicate overall health; export component-level data for step diagnosis |
| Comparing campaigns with different conversion event windows | Normalize or flag the discrepancy before drawing conclusions |

`★ Insight ─────────────────────────────────────`
Notice how the "Topics Synthesized" table doesn't just list topics — it annotates each with its **strategic relevance**. This is the lens pattern in action: the same `/sends/data_series` endpoint that an engineer reads as "how to call this API" becomes "time-sensitive pull for post-launch reviews" when filtered through the strategist lens. The table structure also serves as a quick reference that Claude can scan to decide which API call to reach for given a planning question.
`─────────────────────────────────────────────────`
