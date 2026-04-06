---
name: analyst-kpi-metrics
description: >-
  Tracks platform health KPIs including DAU, MAU, uninstalls, and new user
  acquisition rates.
metadata:
  role: braze-analyst
  topics:
    - export-kpi-get-kpi-uninstalls-date
    - export-kpi-get-kpi-mau-30-days
    - export-kpi-get-kpi-dau-date
    - export-kpi-get-kpi-daily-new-users-date
    - export-kpi
    - export-sessions-get-sessions-analytics
    - export-sessions
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill follows a **reference + lens** pattern — it wraps raw API endpoint knowledge in an analytical perspective, so Claude knows not just *what* the endpoints return but *what the data means* for platform health decisions
- The topics list acts as a **scope boundary** — it signals to Claude that queries about DAU/MAU health, uninstall trends, or session depth belong here, not in campaign or messaging skills
`─────────────────────────────────────────────────`

```markdown
# KPI Metrics Analysis

## Overview

This skill covers the analysis and interpretation of Braze platform health KPIs — daily active users (DAU), monthly active users (MAU), uninstalls, new user acquisition, and session activity. It synthesizes data retrieval patterns with an engagement health lens to help you go beyond raw numbers toward actionable retention and growth signals.

**Core principle:** KPI metrics only become useful when read in context — a spike in uninstalls paired with a DAU drop signals platform-level risk; the same spike following a push campaign surge may be expected churn. Always interpret alongside adjacent metrics.

## When to Use

Use this skill when:
- Querying or interpreting DAU, MAU, new user counts, or uninstall trends via the Braze REST API
- Diagnosing user engagement health (growth, retention, churn)
- Building time-series analyses of platform activity
- Correlating session depth with acquisition or retention metrics
- Evaluating the impact of campaigns on user lifecycle signals

**Do not use** for campaign-level engagement (opens, clicks, conversions) — those belong in campaign analytics skills.

## Analytical Lens

**User engagement health, retention signals, and growth metrics interpretation.**

This skill approaches KPI data through three lenses:

| Lens | Key Questions |
|------|---------------|
| **Engagement health** | Are DAU/MAU ratios healthy? Is session frequency stable? |
| **Retention signals** | Is MAU growing while DAU is flat (shallow engagement)? Are uninstalls accelerating? |
| **Growth interpretation** | Is new user acquisition replacing churn? Is the cohort replacing itself? |

**DAU/MAU ratio** (stickiness) is the most important derived metric — a ratio above 0.2 indicates healthy daily engagement relative to monthly reach.

## Topics Synthesized

### KPI Endpoints

| Metric | Endpoint | Permission Required |
|--------|----------|---------------------|
| Daily Active Users | `GET /kpi/dau/data_series` | `kpi.dau.data_series` |
| Monthly Active Users (30-day rolling) | `GET /kpi/mau/data_series` | `kpi.mau.data_series` |
| Daily New Users | `GET /kpi/new_users/data_series` | `kpi.new_users.data_series` |
| Daily Uninstalls | `GET /kpi/uninstalls/data_series` | `kpi.uninstalls.data_series` |

All four endpoints return a daily time series. Use `length` and `ending_at` parameters to control the date window. Results are returned in reverse-chronological order by default.

### Sessions Analytics

| Endpoint | Permission | Use |
|----------|------------|-----|
| `GET /sessions/data_series` | `sessions.data_series` | Time-series of session counts over a designated period |

Sessions data complements DAU — a user who opens the app but does not trigger a session event will appear in DAU but not sessions, which can indicate onboarding friction or SDK misconfiguration.

### KPI Export Overview

The KPI export endpoints share a consistent query pattern:
- All accept `length` (number of days, max 100) and `ending_at` (ISO 8601 datetime)
- All return `data[]` arrays with `date` and metric-specific count fields
- App-level filtering is available via `app_id` where multi-app workspaces require segmentation

## Common Analysis Patterns

**Stickiness ratio over time:**
Divide DAU series values by corresponding MAU values. Declining ratio over 14+ days warrants investigation even if absolute DAU is growing.

**Uninstall spike correlation:**
Pull `/kpi/uninstalls/data_series` alongside `/kpi/dau/data_series` for the same window. Uninstall-to-DAU ratio > 5% on a single day typically indicates a push notification or content issue.

**New user replacement rate:**
Compare `/kpi/new_users/data_series` totals to `/kpi/uninstalls/data_series` totals over a 30-day window. Net positive means the platform is growing; net negative means retention investment is overdue.

**Session depth vs. DAU:**
High DAU with low session counts suggests users are opening the app but not engaging with core features — a product signal, not a data signal.

## Permissions Checklist

Before querying, confirm the API key has all required permissions:

- `kpi.dau.data_series`
- `kpi.mau.data_series`
- `kpi.new_users.data_series`
- `kpi.uninstalls.data_series`
- `sessions.data_series` (if including session depth analysis)

Missing permissions return a 403 with the specific permission name — check the error body, not just the status code.
```

`★ Insight ─────────────────────────────────────`
- The **"When to Use / Do not use"** boundary is critical for multi-skill plugins — without it, Claude may pull this skill for campaign click analysis (wrong lens) instead of lifecycle metrics (right lens)
- The **permissions checklist** is placed at the end deliberately: it's operational reference, not conceptual framing. Structuring from "why" → "what" → "how" → "operational details" mirrors how an analyst thinks through a problem
`─────────────────────────────────────────────────`
