---
name: engagement-tools-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/viewing_and_understanding_segment_data
indexed_at: '2026-04-05'
keywords:
  - segments
  - audience
  - statistics
  - campaigns
  - analytics
  - messaging
  - conversion
  - performance
triggers:
  - view segment statistics
  - compare segments
  - break down campaign by segment
  - enable segment analytics
  - query segment metrics
---
## Audience Segments

### Segment Dashboard Overview

The **Segments** page provides a summary of all segments with real-time statistics. From it you can search, select, edit, and view data for any segment.

### Segment Statistics (Real-Time)

| Statistic | Definition |
|---|---|
| **Total Users** | Total users in your app |
| **Selected Users** | Count and percentage of total user base in this segment |
| **LTV (Paying Users)** | Lifetime value per user and per paying user (lifetime revenue ÷ lifetime users) |
| **Emailable (Opted-In)** | Users reachable by email who have explicitly opted in. Implement double opt-in to stay compliant with spam regulations. |
| **Push Enabled (Opted-In)** | Users with at least one push token. A single user may have multiple tokens (e.g., iPhone + iPad), so sends can exceed this count. All push recipients must explicitly opt in. |

### Analytics Tracking

Enable **analytics tracking** on a segment to unlock time-series views of sessions, custom events, and revenue for that segment's members.

### Segment Sub-Sections

| Section | Purpose |
|---|---|
| **Segment Insights** | Compare one segment against another across pre-selected KPIs |
| **Messaging Use** | Shows which campaigns and Canvases currently target this segment |
| **Historical Membership** | Segment size over time, filterable by date range |
| **User Preview** | Sample of user-specific attributes (gender, age, sessions, opt-in status). If segment is very small relative to workspace, preview may return 0 — use **Calculate Exact Stats** to confirm real count. |

### Performance Data by Segment (Query Builder)

Break down campaign/Canvas metrics by segment using Query Builder report templates:

1. Go to **Query Builder** → **Create SQL Query** → **Query Template**
2. Filter templates for "segment breakdowns"
3. Select template and fill in **Variables** tab
4. Optionally edit the SQL directly
5. Click **Run Query**

### Query Builder Variables

| Variable | Notes |
|---|---|
| **Campaign or Canvas** | One or many; omit to include all in the time range |
| **Variant** | Available after selecting a campaign/Canvas; multiple variants group results by variant |
| **Step** | Canvas step; requires a Canvas variant to be selected first |
| **Time range** | Defaults to past 30 days if unspecified |
| **Product name** | For purchase data reports only |
| **Conversion window** | Required for revenue/purchase reports — days after email receipt or click to attribute revenue |
| **Segments** | Segments to break down by; defaults to all with analytics tracking enabled |
| **Tags** | Filter by campaign/Canvas tags; combines with any explicitly named campaigns/Canvases |

### Data Availability Requirements

Segment performance data is only available for time periods where **both** conditions are true:

1. **Segment analytics tracking** is enabled for the target segment
2. The **performance data by segment** feature is enabled for your company

Data from before either feature was enabled is not accessible retroactively.

`★ Insight ─────────────────────────────────────`
- Jekyll template tags (`{% image_buster %}`, `{% multi_lang_include %}`, `{{site.baseurl}}`) were stripped — topic files are consumed by AI agents, not rendered by Jekyll, so raw template syntax adds noise without value.
- The HTML `<table>` with inline `<style>` was converted to Markdown tables — agents parse structured text more reliably than raw HTML, and the `word-break: keep-all` CSS had no semantic meaning worth preserving.
- The Variables section was collapsed from prose paragraphs into a table — scannable reference format serves lookup patterns better than narrative descriptions for this type of content.
`─────────────────────────────────────────────────`
