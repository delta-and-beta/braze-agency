---
name: dashboard-home-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/home_dashboard
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - metrics
  - performance
  - users
  - MAU
  - DAU
  - sessions
  - analytics
  - engagement
  - campaigns
triggers:
  - view home dashboard metrics
  - understand monthly active users
  - track session data
  - performance overview
  - user retention analysis
---
# Home Dashboard

The **Home** page provides key metrics and an at-a-glance understanding of your userbase. It has two main sections.

## Pick Up Where You Left Off

Appears after you've edited or created a campaign, Canvas, or segment. Shows cards for recently edited/created items with tags indicating content type (campaign, Canvas, segment) and status (active, draft, archived, stopped).

## Performance Overview

- Default view: last 30 days of data across all apps and sites
- All metrics calculated based on the selected date range
- Percentages compare current date range vs. previous date range (exception: MAU uses last day of prior period, not a range)

**Show Breakdown**: Expands each metric row to show daily values within the date range.

**Performance Over Time graph**: Chartable statistics include Banners, Content Cards, Daily Active Users, Email, In-app messages, KPI Formulas, LINE, MAU, New Users, Push, Sessions, Sessions per Hour, Sessions per MAU, SMS, Stickiness, Uninstalls, Users, Webhooks, WhatsApp. DAU, Push, Sessions, and Uninstalls support optional segment breakdowns; Sessions also supports app version breakdown.

## Statistics Reference

### Users
Total users created in the workspace (lifetime). The MAU-to-Users ratio shows user retention — a low ratio indicates lapsing users may need attention.

### Lifetime Sessions
Total session count since integration. A session = each time a user opens the app or visits the website.

### Monthly Active Users (MAU)
Users who recorded a session in the last 30 days. Calculated nightly with a rolling 30-day window.

**Change formula:**
$$\text{Change in MAU} = \frac{\text{MAU of last date in range} - \text{MAU of day before start date}}{\text{MAU of day before start date}}$$

**MAU calculation rules:**
- Calculated once daily at 12:05 UTC as a 30-day snapshot — never retroactively updated
- Anonymous profiles: count only when at least one session is logged
- Identified profiles: count automatically once they exist
- Orphaned profiles (merged duplicates): **not** counted
- CSV-uploaded users: count only if `date_of_first_session` or `date_of_last_session` is supplied, or after logging a session
- API-deleted users: MAU self-corrects in the next monthly cycle, not immediately

**MAU example:**

| Step | Action | MAU Change | Total |
|------|--------|-----------|-------|
| 1 | Create Anonymous User 1 + log session | +1 | 1 |
| 2 | Identify Anonymous User 1 (converts to identified) | 0 | 1 |
| 3 | Create Anonymous User 2 + log session | +1 | 2 |
| 4 | Identify User 2 as same person as User 1 (User 2 orphaned) | -1 | 1 |

Day-of snapshot after step 3 permanently records MAU = 2. Subsequent days reflect only the non-orphaned user. Within any 30-day window, this flow ultimately consumes **1 MAU**.

> Anonymous users count toward MAU. For mobile, anonymous users are device-dependent; for web, they are browser-cache-dependent.

### Daily Active Users (DAU)
Unique users who record at least one session on a given day. Useful for identifying usage patterns (e.g., weekend spikes) to time messaging campaigns effectively.

### New Users
Users who recorded their first session on a given day within the selected date range.
