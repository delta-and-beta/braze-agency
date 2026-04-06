---
name: analyst-campaign-reporting
description: >-
  Campaign performance analysis including funnel reports, retention analysis,
  engagement metrics, alerts, and search operations.
metadata:
  role: braze-analyst
  topics:
    - campaigns-managing-campaigns
    - campaigns-testing-campaign-analytics
    - campaigns-testing-campaign-funnel-report
    - campaigns-testing-retention-reports
    - campaigns-managing-campaign-alerts
    - campaigns-managing-search-campaigns
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes **CSO (Claude Search Optimization)** — structuring a skill so future Claude instances can quickly determine when it applies and what it can answer. For a domain skill like this, the "When to Use" section with concrete symptoms is more valuable than abstract topic listings. The "lens" framing (measurement and reporting perspective) should permeate the whole document, not just one section.
`─────────────────────────────────────────────────`

# Campaign Reporting & Analytics

## Overview

This skill covers how to measure, analyze, and report on Braze campaign performance. Use it to answer questions about campaign health, user engagement trends, conversion funnels, retention over time, and alert configuration. The lens throughout is **analytical**: not how to build campaigns, but how to evaluate and communicate what they're doing.

## When to Use This Skill

Use this skill when:

- Someone asks how a campaign is performing or how to measure its success
- You need to explain or configure campaign threshold alerts
- You're analyzing user retention after a campaign or series of messages
- You're building or interpreting a funnel report to track conversion steps
- You're searching, filtering, or organizing campaigns in the workspace
- You need to explain which metrics matter for a given campaign type and why

Do **not** use this skill for: building campaigns from scratch, segmentation logic, or Content Card/Canvas-specific workflows (those belong to other skills).

## Topics This Skill Synthesizes

| Topic | What It Covers |
|---|---|
| **Campaign Analytics** | Core metrics available per campaign: sends, deliveries, opens, clicks, conversions, revenue |
| **Campaign Funnel Report** | Multi-step conversion analysis — tracking users through defined funnel stages |
| **Retention Reports** | Cohort-based retention over time — how many users return after receiving a message |
| **Campaign Alerts** | Threshold-based alerting — configuring alerts when metrics fall outside expected ranges |
| **Search Campaigns** | Filtering and organizing the campaign list by status, tag, channel, date, and custom columns |
| **Managing Campaigns Overview** | Workspace-level campaign organization — bulk actions, archiving, sorting |

## Analytical Lens

Every answer from this skill should be grounded in **measurement**: what the number means, how it's calculated, what a good or bad value looks like, and what action it implies. Prefer:

- Defining metrics precisely (e.g., "unique opens" vs. "total opens")
- Distinguishing leading indicators (clicks) from lagging ones (conversions, revenue)
- Connecting metrics to campaign goals — an alert threshold that matters for a transactional campaign differs from a promotional one
- Noting where Braze data is sampled, delayed, or requires a specific campaign configuration to appear

## Quick Reference: Key Metrics and Reports

**Campaign Analytics (per-campaign view)**
- Delivered, Bounced, Opens (unique/total), Clicks, Unsubscribes, Conversions (primary/secondary), Revenue
- Available breakdowns: by variant (A/B), by segment, over time

**Funnel Report**
- Define up to 8 steps; tracks unique users who complete each step in order
- Cross-campaign funnels possible — not limited to a single campaign

**Retention Report**
- Cohort by first receipt date; tracks return events (custom event or session) over N days/weeks
- Rolling vs. range retention options

**Campaign Alerts**
- Configurable thresholds: open rate, click rate, conversion rate, revenue
- Recipients: workspace members via email or Slack
- Trigger: evaluated after sufficient data accumulates (not real-time)

**Search & Filter**
- Filter by: status (active/draft/stopped/archived), channel, tag, team, date range
- Sort and add/remove columns in the campaign list view
- Saved filters not currently supported — filters reset on navigation

## Common Analytical Questions

**"Is this campaign performing well?"**  
Start with delivery rate (are messages reaching inboxes?), then open/click rates benchmarked against channel norms, then conversion rate tied to the campaign's stated goal.

**"Why did retention drop after this campaign?"**  
Use the Retention Report with a cohort anchored to the campaign send date. Compare against a control cohort if a holdout group was configured.

**"How do I get notified if something goes wrong?"**  
Campaign alerts are the right tool — set thresholds for the metric most likely to signal failure (e.g., conversion rate dropping below baseline) and configure recipients before launch.

**"I can't find a campaign in the list."**  
Check active filters — status filter defaults may hide archived or stopped campaigns. Use the search bar for name-based lookup; filter by channel or tag to narrow large workspaces.
