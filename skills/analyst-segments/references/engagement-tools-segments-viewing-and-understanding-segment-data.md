---
name: engagement-tools-segments-viewing-and-understanding-segment-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/viewing_and_understanding_segment_data
indexed_at: '2026-04-05'
keywords:
  - segments
  - dashboard
  - analytics
  - campaigns
  - metrics
  - statistics
  - tracking
  - performance
  - email
  - push
triggers:
  - view segment data
  - understand segment statistics
  - breakdown performance by segment
  - track segment analytics
  - view campaign metrics by segment
---
## Viewing and Understanding Segment Data

### Accessing Segment Data

Navigate to **Segments** in your Braze dashboard to see a summary of all segments. Select a segment name to view statistics, filters, and edit it. Enable [analytics tracking](https://www.braze.com/docs/user_guide/analytics/tracking/segment_analytics_tracking/) on a segment to unlock sessions, custom events, and revenue over time charts.

### Segment Statistics (Real-Time)

| Statistic | Definition |
|-----------|------------|
| **Total Users** | Total users in your app |
| **Selected Users** | Count and % of total user base in this segment |
| **LTV (Paying Users)** | Lifetime value per user = lifetime revenue ÷ lifetime users; also shows LTV per paying user |
| **Emailable (Opted-In)** | Users reachable via email who have opted in. Double opt-in recommended for spam compliance. Target neither-opted-in-nor-out users to grow this count. |
| **Push Enabled (Opted-In)** | Users with ≥1 push token. May exceed actual user count (one user can have multiple tokens). "Opted In" = explicitly opted in — required before sending push. |

### Segment Dashboard Sections

- **Segment Insights** — Compare performance across segments on pre-selected KPIs
- **Messaging Use** — Shows which enabled campaigns and Canvases are currently targeting this segment
- **Historical Membership** — Segment size over time; filter by date range dropdown
- **User Preview** — Per-user attributes (gender, age, sessions, push/email opt-in status). Access via **User Data > User Preview**. If preview shows zero users on a small segment, run **Calculate Exact Stats** to confirm actual size.

### Performance Data by Segment (Query Builder)

Break down campaign/Canvas/variant/step metrics by segment using Query Builder report templates:

1. Go to **Query Builder > Create SQL Query > Query Template**
2. Filter templates for "segment breakdowns"
3. Select a template and fill in the **Variables** tab

#### Variables

| Variable | Notes |
|----------|-------|
| Campaign or Canvas | One or many; omit to include all from the time range |
| Variant | Select after choosing a campaign/Canvas; multiple variants group results by variant |
| Step | Requires a Canvas variant to be selected first |
| Time range | Defaults to past 30 days if unspecified |
| Product name | For purchase data reports |
| Conversion window | Required for revenue/purchase reports; days after email receipt/click to attribute purchases |
| Segments | Segments to break down by; defaults to all segments with analytics tracking enabled |
| Tags | Run report across all campaigns/Canvases with specified tags; combinable with explicit campaign/Canvas selection |

### Data Availability Requirements

Data is only available for time periods where **both** conditions are met:
1. Segment analytics tracking is enabled for the target segments
2. The "performance data by segment" feature is enabled for your company

Historical data before feature enablement is not accessible.
