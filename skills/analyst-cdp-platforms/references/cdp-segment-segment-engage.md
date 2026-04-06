---
name: cdp-segment-segment-engage
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/viewing_and_understanding_segment_data
indexed_at: '2026-04-05'
keywords:
  - segments
  - analytics
  - statistics
  - campaigns
  - canvas
  - push
  - email
  - LTV
  - reporting
  - performance
triggers:
  - how to view segment statistics
  - how to track segment performance
  - how to analyze user data by segment
  - how to create segment reports
  - how to access user preview data
---
The `learn` skill is for capturing conversation insights, not applicable here. Processing the documentation directly.

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" stored in `skills/{skill}/references/*.md` — they're designed to be self-contained chunks that can be retrieved independently during semantic search
- Removing Jekyll template syntax (`{% %}`, `{{site.baseurl}}`) and HTML table markup while preserving the semantic content is the core transformation needed here
`─────────────────────────────────────────────────`

## Segment Engage (Data & Analytics)

### Accessing Segment Data

The **Segments** dashboard page shows all segments with summary statistics. Select a segment to view its stats, edit filters, and access analytics.

Enable **analytics tracking** on a segment to unlock time-series views of sessions, custom events, and revenue.

### Segment Statistics (real-time, update as filters change)

| Statistic | Definition |
|---|---|
| Total Users | Total users in your app |
| Selected Users | Count and % of total user base in this segment |
| LTV (Paying Users) | Lifetime value per user = lifetime revenue ÷ lifetime users; also shown per paying user |
| Emailable (Opted-In) | Users reachable by email who have opted in. Use double opt-in to stay spam-compliant. Target users who have neither opted in nor out to grow this pool. |
| Push Enabled (Opted-In) | Users with at least one push token. One user may hold multiple tokens (e.g., iPhone + iPad), so push send count can exceed this number. All push sends require explicit opt-in. |

### Segment Insights

Compare segment performance across pre-selected KPIs via the **Segment Insights** dashboard page.

### Messaging Use

Shows which campaigns and Canvases are currently targeting the segment.

### Historical Membership

Tracks segment size over time. Filter by date range via dropdown. Use **Calculate Exact Stats** for precise current counts — User Preview may return zero for very small segments relative to workspace size.

### User Preview

Access via **User Data > User Preview**. Shows per-user attributes: gender, age, session count, push/email opt-in status.

---

### Performance Data by Segment (Query Builder)

Break down campaign/Canvas performance metrics by segment using Query Builder report templates.

**Steps:**
1. Go to **Query Builder > Create SQL Query > Query Template**
2. Filter for templates with "segment breakdowns"
3. Select template and fill **Variables** tab
4. Optionally edit SQL directly
5. Run Query

### Report Variables

| Variable | Notes |
|---|---|
| Campaign or Canvas | One or many; defaults to all in time range if unspecified |
| Variant | Available after selecting campaign/Canvas; results group by variant if multiple selected |
| Step | Canvas step; requires Canvas variant selected first |
| Time range | Defaults to past 30 days |
| Product name | For purchase data reports only |
| Conversion window | **Required** for revenue/purchase reports — days after email receipt/click to attribute purchases |
| Segments | Segments to break down by; defaults to all with analytics tracking enabled |
| Tags | Filter to campaigns/Canvases with specific tags; additive with explicit campaign/Canvas selections |

### Data Availability Requirements

Data is only available when **both** conditions are met:
1. Segment analytics tracking is enabled for the target segments
2. The performance-data-by-segment feature is enabled for your company

Data from before the feature was enabled is not accessible retroactively.

`★ Insight ─────────────────────────────────────`
- The Jekyll template includes (`{% multi_lang_include %}`) and image busters (`{% image_buster %}`) are removed entirely — these are build-time artifacts that have no meaning outside the Jekyll site
- The conversion window variable is marked "Always required" for revenue reports — worth surfacing prominently since it's easy to miss and directly affects attribution accuracy
`─────────────────────────────────────────────────`
