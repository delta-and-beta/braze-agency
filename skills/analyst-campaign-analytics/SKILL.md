---
name: analyst-campaign-analytics
description: >-
  Analyzes WhatsApp campaign metrics, message usage patterns, and
  channel-specific performance data.
metadata:
  role: braze-analyst
  topics:
    - whatsapp-whatsapp_campaign_analytics
    - whatsapp-whatsapp_campaign_analytics-message_usage
    - data-activation-report_metrics
    - export-campaigns-get-send-analytics
    - export-campaigns-get-campaigns
    - export-campaigns-get-campaign-details
    - export-campaigns-get-campaign-analytics
    - export-canvas-get-canvases
    - export-canvas-get-canvas-details
    - export-canvas-get-canvas-analytics-summary
    - export-canvas-get-canvas-analytics
    - export-campaigns
    - export-canvas
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` skill specifies that SKILL.md bodies should stay 1,500–2,000 words, use imperative form (verb-first, not "you should"), and reference `references/` files for detailed content rather than embedding everything inline. This keeps context loading lean — the full topic content lives in atomic reference files, not here.
`─────────────────────────────────────────────────`

# Campaign Performance Analytics

This skill provides the analytical framework for measuring, interpreting, and acting on campaign performance data in Braze. Apply it when working with campaign metrics across channels — particularly WhatsApp — including send analytics, delivery rates, engagement signals, Canvas performance, and message quota tracking.

Use this skill to answer questions like:
- "How is my WhatsApp campaign performing?"
- "What metrics should I track for this campaign?"
- "How do I pull Canvas analytics via API?"
- "Why is my message usage higher than expected?"
- "What's the difference between campaign and Canvas analytics endpoints?"

---

## Scope

This skill synthesizes knowledge across two analytical domains:

**1. Campaign & Canvas Analytics**
Covers the Braze REST API endpoints for retrieving send-level, campaign-level, and Canvas-level metrics. Includes the correct endpoints, required API permissions, rate limits, data retention windows, and response shapes for both campaigns and Canvases.

**2. Channel-Specific Performance**
Covers how to interpret metrics that differ by channel — with particular depth on WhatsApp, including message usage tracking, billing implications, and the distinction between inbound and outbound message types.

---

## Analytical Lens

Approach all performance questions through three layers:

### 1. Measure — What data exists and how to retrieve it

Braze exposes campaign and Canvas analytics through distinct REST endpoints. Retrieve time-series data at the send level using `/sends/data_series` for API campaigns, and at the Canvas level using `/canvas/data_summary`. Always confirm:
- Which endpoint applies (campaign vs. Canvas; API-triggered vs. scheduled)
- The required API key permission for the endpoint
- The data retention window (send analytics: 14 days; Canvas: varies)
- Whether the query is a time series or a rollup summary

### 2. Interpret — What the metrics mean

Not all metrics are universal. A metric like "AMP Clicks" only applies to AMP-enabled email sends. WhatsApp has channel-specific signals (e.g., reads, failures by error category) that have no email equivalent. When analyzing results:
- Match metrics to their applicable channel
- Distinguish delivery metrics (sent, delivered, failed) from engagement metrics (opens, clicks, reads)
- Treat Canvas analytics as aggregates across steps — drill into step-level data when diagnosing drop-off
- Treat message usage separately from engagement: usage tracks quota consumption, not recipient behavior

### 3. Act — What to do with the findings

Translate metric patterns into actionable next steps:
- Low delivery rates → investigate error categories, check opt-in status
- High usage without proportional engagement → audit send frequency and audience targeting
- Canvas conversion drop-off → identify the step with the highest exit rate and inspect that component
- Quota approaching limits → surface usage trends to stakeholders before billing impact occurs

---

## Topics Synthesized

This skill draws on the following reference topics. Load them when deeper detail is needed:

| Topic | What it covers |
|---|---|
| **Report Metrics** | Full glossary of Braze metric names by channel (AMP Clicks, AMP Opens, Audience, and others), with channel applicability flags |
| **WhatsApp Campaign Analytics** | Channel-specific metrics for WhatsApp campaigns: reads, sends, deliveries, failures, and how to interpret WhatsApp-specific engagement signals |
| **WhatsApp Message Usage** | How Braze tracks WhatsApp message volume for billing/quota purposes; distinction between inbound and outbound; where to find usage data in the dashboard |
| **Get Campaign Send Analytics** | `GET /sends/data_series` — daily stats for a tracked `send_id` on API campaigns; 14-day retention; request parameters and response shape |
| **List Campaigns** | `GET /campaigns/list` — paginated campaign index; how to retrieve `send_id` values for use in analytics queries |
| **Get Campaign Details** | `GET /campaigns/details` — full campaign metadata including message variants, schedule, and conversion events; requires `campaigns.details` permission |
| **Get Campaign Analytics** | `GET /sends/data_series` — consolidated reference for retrieving API campaign analytics with correct parameter construction |
| **List Canvases** | `GET /canvas/list` — paginated Canvas index sorted oldest-to-newest; 100 results per page; retrieving Canvas IDs for downstream queries |
| **Get Canvas Details** | `GET /canvas/details` — full Canvas metadata including steps, variants, and schedule; required before interpreting step-level analytics |
| **Get Canvas Analytics Summary** | `GET /canvas/data_summary` — rollup time-series for a Canvas; concise statistical summary across all steps; requires `canvas.data_summary` permission |
| **Get Canvas Analytics** | Full reference for constructing `/canvas/data_summary` requests including time range parameters and response interpretation |
| **Canvas Export Overview** | How to export Canvas user data as CSV — from either the full Canvas or individual step components; dashboard navigation path |
| **Campaigns Export Overview** | How to export campaign send analytics via `/sends/data_series`; field definitions and data structure for exported records |

---

## Key API Patterns

### Campaign analytics query flow

```
1. GET /campaigns/list          → retrieve campaign_id and send_id
2. GET /campaigns/details       → confirm message variants and conversion events
3. GET /sends/data_series       → pull daily stats for the send_id
```

### Canvas analytics query flow

```
1. GET /canvas/list             → retrieve canvas_id
2. GET /canvas/details          → understand step structure
3. GET /canvas/data_summary     → retrieve rollup time-series
```

### WhatsApp usage audit flow

```
1. Navigate to Dashboard > WhatsApp > Message Usage
2. Filter by date range and workspace
3. Cross-reference with send analytics to distinguish quota consumption from engagement
```

---

## Common Pitfalls

**Data retention cutoff:** Send analytics via `/sends/data_series` are only retained for 14 days. For campaigns older than 14 days, direct API access to granular send stats is unavailable — use dashboard exports instead.

**API campaign requirement:** The `/sends/data_series` endpoint only applies to API-triggered campaigns with a tracked `send_id`. It does not apply to scheduled or action-based campaigns.

**Canvas vs. campaign endpoints:** Canvas data lives under `/canvas/` endpoints, not `/campaigns/`. Mixing these produces 404s or empty results.

**WhatsApp metric availability:** WhatsApp engagement metrics (reads) depend on recipients having read receipts enabled. Absence of read data does not indicate delivery failure.

**Permission scoping:** Each endpoint requires a specific API key permission. Confirm the permission scope before constructing a query — a missing permission returns a 401, not an empty result set.

---

## Additional Resources

### Reference Files

For full metric definitions and endpoint specifications, consult the `references/` directory for this skill:

- **`references/report-metrics.md`** — Complete channel-by-channel metric glossary
- **`references/whatsapp-analytics.md`** — WhatsApp campaign and message usage specifics
- **`references/campaign-api-endpoints.md`** — Full request/response reference for campaign endpoints
- **`references/canvas-api-endpoints.md`** — Full request/response reference for Canvas endpoints
- **`references/export-overview.md`** — Dashboard and CSV export procedures

`★ Insight ─────────────────────────────────────`
The three-layer lens (Measure → Interpret → Act) mirrors a classic analytical workflow but is valuable here because Braze metrics span multiple channels with different semantics. By making this explicit in the skill, an agent using it will automatically frame answers in terms of what to *do* with findings — not just what the numbers are. This is especially important for WhatsApp where "no read data" is frequently misread as a delivery problem.
`─────────────────────────────────────────────────`
