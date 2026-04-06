---
name: reporting-report-builder
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/report_builder
indexed_at: '2026-04-05'
keywords:
  - report
  - analytics
  - campaign
  - canvas
  - metrics
  - drilldown
  - templates
  - dashboard
  - variants
  - channels
triggers:
  - create a new report
  - customize report metrics
  - use a report template
  - view report results
  - filter campaigns and canvases
---
## Report Builder

### Overview

Report Builder (New) creates granular, customizable reports using Braze campaign and Canvas data, with support for templates, drilldowns, and dashboard sharing.

---

### Creating a Report

**Navigation:** Analytics > Report Builder (New)

**Step-by-step:**

1. Select **Create New Report** (or use a template via the dropdown arrow)
2. In **Rows**, choose what to report on:
   - Campaigns, Canvases, Campaigns and Canvases, Channels, or Tags
   - ⚠️ Rows selection affects available metrics (e.g., multivariate metrics only available for Canvases or Campaigns with Variant drilldown)
3. (Optional) **Add drilldown** for more granular views:
   - Channels, Date, Variants, Campaigns and Canvases
   - Date drilldown example: Rows=Campaigns + Grouping=Date + Interval=Days → performance by day
4. In **Columns**, select **Customize Metrics** — check desired metrics, drag to reorder
5. Set **date range** in Report content
6. Add campaigns/Canvases:
   - **Manually:** Filter by Last Sent dates, tags, channels, or search by name
   - **Automatically:** Set rules — campaigns/Canvases matching rules are auto-added to future report runs
7. Select **Save & Run**

> Report may take a few minutes depending on date range and number of items selected.

---

### Using Report Templates

1. Go to **Analytics** > **Report Builder (New)**
2. Click the arrow next to **Create New Report** → **Use a report template**
3. Browse the Braze template library (filter by Row items and Tags)
4. Customize further using the standard creation flow from step 3 onward

---

### Metrics Availability

| Metric | Available For |
|---|---|
| Conversion metrics | Campaigns, Canvases, Campaigns and Canvases |
| Entries | Campaigns, Canvases, Campaigns and Canvases, Tags |
| Last Sent Date | Scheduled campaigns only (not action-based or API-triggered) |
| Sends | Each relevant channel |
| Messages Sent | Campaigns, Canvases, Campaigns and Canvases, Tags |
| Subject line | Email Campaigns (Variant drilldown), Canvases, Canvases (Variant drilldown) |
| Total Revenue | Campaigns, Canvases, Campaigns and Canvases, Tags — **not** with Channels drilldown |
| Unique Impressions | Campaigns, Canvases, Campaigns and Canvases, Tags |
| Unique Recipients | Campaigns, Canvases, Campaigns and Canvases, Tags — **not** with Channels drilldown |

**Canvas variant/step metrics:** Select Canvases for rows + Date drilldown (or none) → use **Canvas View** dropdown to view metrics by Canvas, variant, step, or message.

**Deleted variants:** Stats for deleted variants are excluded from campaign/Canvas breakdowns, but channel-level totals include all sends regardless of deletion.

---

### Viewing & Charting Results

- Results display in table format on the report page
- Create a chart at the bottom of the page: select **Chart type** and configure metrics
- For trend lines over time, select **Date** as a drilldown when configuring the report
- **Download chart:** Select the dotted icon → choose file format

---

### Sharing a Report

- **Share a link:** Copy a direct dashboard link to the report
- **Send or schedule an email:** Sends immediately or at a scheduled time with a download link (expires after 1 hour); recipients selected from company users
