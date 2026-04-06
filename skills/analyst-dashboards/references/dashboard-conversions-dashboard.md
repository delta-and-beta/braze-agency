---
name: dashboard-conversions-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/conversions_dashboard
indexed_at: '2026-04-05'
keywords:
  - conversions
  - attribution
  - campaigns
  - Canvas
  - channels
  - events
  - funnel
  - conversion-rate
  - breakdown
  - analytics
triggers:
  - set up conversions report
  - analyze conversions across channels
  - configure attribution method
  - create custom event conversion
  - view conversion funnel
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — they live in `skills/{id}/references/*.md` and are designed to be loaded independently at query time. Stripping Liquid template tags (`{% alert %}`, `{{site.baseurl}}`), image references, and navigation chrome is essential since these won't render in an LLM context. The goal is maximum information density per token.
`─────────────────────────────────────────────────`

## Conversions Dashboard

Analyzes conversions across campaigns, Canvases, and channels using configurable attribution methods. Supports up to a 90-day date range.

### Report Setup

**Required steps:**
1. Go to **Analytics > Conversions**
2. Select a **Date Range** (up to 90 days)
3. Select campaigns and/or Canvases to analyze (optional: filter by tag)
4. Select **Channel(s)** to analyze
5. Select a **Breakdown by** layer (variant, Canvas step, country, language)
6. Optionally enable **Use custom events** to calculate conversions for non-preconfigured events
7. Select an **Attribution Method**
   - Analyzing multiple channels forces **Last-Touch Attribution**
8. Select **Create**

After loading, select a **Conversion Event** to filter results (populated from preconfigured events on the selected campaigns/Canvases).

### Custom Events

**When to use:** When the conversion event wasn't preconfigured on the campaign or Canvas.

**Requirements for custom event metrics to appear:** Both a conversion event and a Canvas entry event must exist within the specified date range.

**Setup:**
1. Enable **Use custom events** during report setup
2. Select the custom event as the conversion event
3. Set the conversion window

**Limitation:** Selecting a custom event disables the Conversion Event dropdown — re-run the report to view different custom events.

### User Inclusion Criteria

A user must do all three within the **selected date range**:
1. Enter the Canvas or campaign
2. Log an attribution method event
3. Perform the conversion event

**Important:** If a user enters the Canvas *before* the date range starts, they are excluded — even if steps 2 and 3 occur within the range. Set the date range to include the entry date.

---

### Report Sections

#### Conversion Details (table)

| Metric | Description |
|--------|-------------|
| Recipients | Users who received a message through the selected channel in the date range |
| Conversion Rate (Recipients) | (Unique conversions) / (Unique recipients) |
| Attribution Method column | Count per the selected attribution method; labeled "Touches" for Last-Touch or multi-channel |
| Conversion Rate (Attribution Method) | (Touches or method-specific conversions) / (Unique recipients) |

Rows can be expanded (click chevron) when breakdown-level details are configured.

#### Conversion Funnel (bar graph)

- Shows absolute counts for each engagement event (send, open, click, etc.) per selected channel
- Conversions counted per selected attribution method
- Hover over bars for engagement event details
- Use the **Channel** dropdown to switch channels (single channel at a time)
- Export: PNG, JPEG, PDF, SVG, CSV

#### Conversions Over Time (time series)

- Shows conversions per campaign/Canvas over time
- Click campaign/Canvas names to deselect them
- Export via menu icon: PNG, JPEG, PDF, SVG, CSV

---

### Attribution Methods

| Method | Definition | Rate Formula | Channel Options |
|--------|------------|--------------|-----------------|
| **Upon Receipt** | Conversions after message receipt | (Unique Received Conversions) / (Unique Recipients) | Email delivery, SMS delivery |
| **Upon Send** | Conversions after message send | (Unique Send Conversions) / (Unique Recipients) | Push send, Content Card send, SMS send |
| **Upon Open** | Conversions after message open | (Unique Open Conversions) / (Unique Recipients) | Email open, Push open |
| **Upon Click** | Conversions after message click | (Unique Click Conversions) / (Unique Recipients) | Email click, Content Card click, IAM click |
| **Upon Impression** | Conversions after an impression | (Unique Impression Conversions) / (Unique Recipients) | IAM impression, Content Card impression |
| **Last-Touch** | Full credit to last-touched/clicked message in the conversion window | (Number of Touches) / (Unique Recipients) | Default when multiple channels selected |
