---
name: reporting-retention-reports
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/retention_reports
indexed_at: '2026-04-05'
keywords:
  - retention
  - reports
  - analytics
  - campaign
  - canvas
  - cohort
  - event
  - rolling
  - range
  - users
triggers:
  - how to generate retention report
  - understanding retention metrics
  - reading retention report
  - rolling vs range retention
  - campaign retention analysis
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase are atomic knowledge units stored in `skills/{id}/references/` — they're designed for fast lookup by agents, so the goal is maximum signal density: strip navigation chrome, preserve actionable facts and edge cases, keep the content self-explanatory without requiring surrounding context.
`─────────────────────────────────────────────────`

## Retention Reports

Retention Reports show the rate at which users who received a campaign or Canvas returned to perform a specified retention event over a 30-day window. Available on the **Analytics** page of any campaign or Canvas.

**Not available for:** API-triggered campaigns.

---

## Generating a Report

**Step 1 — Select date range:** Navigate to the campaign or Canvas Analytics page. The report includes all users who entered during the selected window and performed the retention event within that range.

**Step 2 — Select a retention event:**
- **Campaigns:** Go to the **Campaign Retention** section
- **Canvases:** Select **Analyze Variants**, then view the retention report

**Step 3 — Run:** Click **Run Report**. May take up to 5 minutes. Reports cannot be re-run with the same retention event for 24 hours, but you can change the retention event and re-run immediately.

The report only lists days on which the campaign/Canvas was sending messages.

---

## Retention Types

### Rolling Retention

Measures how many users performed the retention event **on or after** each listed day.

- A user who completes the event on day 3 is counted under columns ≥0, ≥1, and ≥3
- Users completing the event in multiple windows are counted in multiple time frames — **can exceed 100%**
- Day 30 column = users who returned on day 30 or later

**Reading example:** "Day 7 retention = 57.89%" means 57.89% of users performed the event 7 or more days after receiving the campaign.

### Range Retention

Measures how many users performed the retention event **within each day range** (e.g., Day 3–7).

- A user active on day 5 and day 13 is counted in both "Day 3–7" and "Day 7–14"
- More intuitive to read: directly states what % of a cohort acted within a given range

---

## Report Components

| Component | Description |
|-----------|-------------|
| **Users column** | Unique users who performed the start action in the selected timeframe; current day excluded |
| **Cohort Z rows** | Each row = a day the campaign/Canvas was sending |
| **Day X columns** | Span 0–30 days at various increments |
| **All Users row** | Summary row for the full period; users in multiple cohorts are counted twice |
| **Percentages/Numbers** | Weighted averages; asterisk (`*`) = incomplete value |
| **Units toggle** | Switch between % of users and raw user count (upper-right corner) |
| **Color mapping** | Darker shading = higher retention percentage or count |

---

## Key Behaviors

- **24-hour re-run lock:** Same retention event cannot be regenerated for 24 hours; timestamp and regenerate option are always shown
- **Date range scoping:** Only users who both entered the campaign/Canvas and performed the retention event within the selected date range appear
- **Rolling vs. Range trade-off:** Rolling retention is better for understanding long-term stickiness; range retention is better for cohort-window comparison
