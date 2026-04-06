---
name: reporting-data-by-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/data_by_segments
indexed_at: '2026-04-05'
keywords:
  - segments
  - breakdown
  - metrics
  - campaigns
  - Canvas
  - performance
  - revenue
  - conversions
  - analytics
  - engagement
triggers:
  - break down performance by segments
  - create segment breakdown report
  - analyze metrics by segment
  - compare campaign performance across segments
  - track revenue and purchases by segment
---
## Data by Segments

Break down performance metrics for campaigns, Canvas, variants, and steps by segments using Query Builder report templates.

**Prerequisite:** Analytics tracking must be enabled for each segment you want to analyze.

### Setup

1. In **Query Builder**, create a new SQL report with a template
2. Select **Segment breakdowns** as the metric filter

### Available Report Templates

| Template | Level |
|----------|-------|
| Email performance metrics by segment | Campaign / Canvas |
| Email engagement metrics for variants or steps, by segment | Variant / Step |
| Purchases and revenue by segment | Campaign / Canvas |
| Purchases and revenue for variants or steps, by segment | Variant / Step |
| Push performance by segment | Campaign / Canvas |

---

### Email Engagement Metrics by Segment

**Available metrics:** Sends, Deliveries, Complaints, Unique opens, Unique machine opens, Unique non-machine opens, Unique clicks, Unsubscribes, Bounces, Soft bounces, Deferred

**Campaign/Canvas level** — Variables tab options:
- One or more campaigns or Canvases (optional; omit for all)
- Time frame
- Tags (optional filter)

**Variant/Step level** — Variables tab options:
- Specific campaign or Canvas (**required**)
- Variants (**required**)
- Canvas step (optional)

**Results format:** Rows = Segments, Columns = Email engagement metrics. Multiple variants are grouped by variant.

---

### Purchases and Revenue by Segment

**Available metrics:**
- Unique purchases upon receipt
- Revenue upon receipt
- Unique purchases upon click
- Revenue upon click
- Unique recipients
- Unique email clicks

All rate metrics use unique email recipients as the denominator.

**Metric definitions:**
- **Upon receipt** — purchase events/revenue within conversion window after users *received* the campaign/Canvas
- **Upon click** — purchase events/revenue within conversion window after users *clicked* the campaign/Canvas

> Example: 10 users in segment, 5 purchased after receiving email, 1 of those 5 purchased after clicking → "Unique purchases upon receipt rate" = 50%, "Unique purchases upon click rate" = 10%

**Variables tab options:**
- Conversion window (days after receipt or click for purchase attribution)
- Specific campaign, Canvas, or tags (optional; omit for all)
- Specific product (optional)

**Note:** Only email channel data is included. Other channels are excluded.

**Variant/Step level** additionally requires:
- Specific campaign or Canvas
- Variants

**Results format:** Rows = Segments, Columns = Purchase metrics

---

### Top/Bottom Performers — Email Engagement

Identify highest or lowest performing campaigns, Canvases, or Canvas steps for a specific email metric.

**Example use cases:**
- Top 10 campaigns by unique open rate
- Bottom 25 Canvases by unsubscribes
- Top 50 Canvas steps by unique clicks

**Required variables:**
- **Metric** — one of: Sends, Deliveries, Complaints, Unique opens, Unique machine opens, Unique non-machine opens, Unique clicks, Unsubscribes, Bounces, Soft bounces, Complaints
- **Number of results** — top or bottom N (e.g., top 10, bottom 15)
- **Message type** — campaigns, Canvases, or Canvas steps

**Results format:** Ranked list with all email engagement metrics as columns.

---

### Top/Bottom Performers — Purchases

Identify highest or lowest performing campaigns, Canvases, or Canvas steps for purchase/revenue metrics.

**Example use cases:**
- Top 20 campaigns by purchase rate for a specific product
- Top 25 Canvases by revenue generated
- Bottom 10 Canvas steps by product purchase rate

`★ Insight ─────────────────────────────────────`
- The two-level structure (campaign vs. variant/step) reflects Braze's hierarchy: campaign → variant → step. Each level unlocks more granular attribution but requires more specific variable inputs.
- "Upon receipt" vs. "upon click" attribution is a standard last-touch model — receipt measures passive exposure, click measures active intent. This matters for interpreting conversion causality.
- The top/bottom performer template inverts the segment-breakdown pattern: instead of rows=segments, it ranks message containers — useful for optimization queries rather than audience analysis.
`─────────────────────────────────────────────────`
