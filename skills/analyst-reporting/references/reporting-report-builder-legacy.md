---
name: reporting-report-builder-legacy
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/report_builder/report_builder_legacy
indexed_at: '2026-04-05'
keywords:
  - reporting
  - campaigns
  - canvas
  - metrics
  - variants
  - conversion
  - comparison
  - performance
  - export
  - analytics
triggers:
  - create a report
  - compare campaigns
  - export campaign data
  - analyze variant performance
  - set up campaign comparison
---
## Report Builder (Legacy)

Compare results across multiple campaigns or Canvases in a single view to identify which engagement strategies most impacted key metrics. Supports data export and report saving.

**Use cases:** Compare campaign performance by tag/channel, measure variant uplift vs. control, evaluate delivery method impact (scheduled vs. action-based vs. API-triggered), track KPI trends over time.

> Tip: Use the same conversion events across campaigns/Canvases you want to compare so conversions line up correctly in reports.

---

## Creating a Report

**Navigate to:** Analytics > Report Builder > Create New Report

### Report Types

Choose **Campaign Comparison** or **Canvas Comparison**. Campaigns and Canvases cannot be mixed. Eligible items: last sent within 12 months.

#### Campaign Reports: Manual vs. Automated

| | Manual | Automated |
|---|---|---|
| **Building** | Filter list, then check specific campaigns | Filter options define the report |
| **On re-view** | Shows same previously-added campaigns | Auto-updates to all campaigns matching current filters |
| **Editing** | Add/remove specific campaigns | Adjust filter criteria |

Both types: max **250 campaigns** per report.

**Canvas reports** work like manual campaign reports — selections and updates are manual. Max **5 Canvases** per report.

---

## Setup Steps

1. **Create report** — Select campaign or Canvas comparison type
2. **Choose metrics** — Select "Edit Columns" to add metrics; toggle **Average** (rates/numerical) or **Total** (numerical) calculations
3. **Set time period** — Rows with no data for the period appear blank
4. **Name and save** — Default name is "Campaign Comparison Report" if left unnamed; saved reports appear on the Report Builder page

---

## Multivariate Campaign Breakdown

Click the arrow next to a campaign name to expand variants and control group rows.

- **Variant rows**: Show performance for that variant
- **Control row**: Shows only conversion event results
- **Overall campaign row**: Reflects variant performance only — does **not** include control group data (e.g., Primary Conversion Event A = sum of variants, excluding control)

> Warning: Deleting a variant from a multivariate campaign permanently removes its data from future reports.

---

## Canvas Report Breakdowns

| View | What it shows |
|---|---|
| **By Variant** | High-level Canvas stats + per-variant stats (expandable) |
| **By Steps** | Step-level metrics, one step per row |
| **By Message** | Step names per row + message-level metrics (email clicks, push opens, etc.) |

Dashboard preview: first **50 rows** only. Full report available via CSV export.

---

## Accessing Saved Reports

- **Manual Report**: Shows the same previously-added campaigns (still within the "Last Sent" filter window)
- **Automatic Report**: Re-runs against current filters on each view — campaigns matching the filter at time of viewing are included
