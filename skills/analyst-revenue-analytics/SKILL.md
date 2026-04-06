---
name: analyst-revenue-analytics
description: >-
  Analyzes revenue trends, purchase frequency, and product performance from
  transaction data.
metadata:
  role: braze-analyst
  topics:
    - export-purchases-get-revenue-series
    - export-purchases-get-number-of-purchases
    - export-purchases-get-list-product-id
    - export-purchases
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files for Nick plugins are pure knowledge documents — they inform Claude *when* and *how* to act, not just what APIs exist. The "lens" concept shapes how Claude interprets and frames its analysis.
- The imperative writing style ("Analyze X using Y", not "You should analyze X") is critical — these files are consumed by another Claude instance, and second-person creates unnecessary indirection.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Revenue & Purchase Analytics

Analyze revenue trends, purchase frequency, and product performance from Braze transaction data. Use this skill when working with purchase event metrics, time-series revenue data, product-level performance, or purchase funnel analysis across any time range.

## Scope

This skill covers the Braze Purchases API surface, which exposes three primary data streams:

| Endpoint | What It Returns |
|---|---|
| `GET /purchases/revenue_series` | Total money spent over a time range |
| `GET /purchases/quantity_series` | Number of purchase events over a time range |
| `GET /purchases/product_list` | Paginated list of product IDs with purchase history |

Together, these enable revenue attribution, conversion rate analysis, product performance ranking, and purchase funnel evaluation without requiring access to raw event exports.

## Analytical Lens

Apply a **revenue attribution and purchase funnel** lens when using this skill:

- **Attribution**: Trace revenue back to campaigns, segments, time periods, or product categories. Prefer unit (per-app) groupings when attribution boundaries matter.
- **Funnel analysis**: Treat `quantity_series` as the top of the funnel (purchase events) and `revenue_series` as the outcome metric. Average order value (AOV) = revenue ÷ quantity — compute this whenever both series are available for the same window.
- **Product performance**: Use `product_list` as a discovery step before drilling into product-specific revenue or quantity slices. Products not appearing in recent windows may signal inventory, catalog, or campaign gaps.

## Working With Revenue Time Series

Use `GET /purchases/revenue_series` to retrieve total monetary value of purchases over a time range.

**Key parameters:**
- `length` (required): Number of days in the series, max 100
- `unit`: `day` (default) or `week`
- `ending_at`: ISO 8601 timestamp for the series endpoint (defaults to now)
- `app_id`: Scope to a single app; omit to aggregate across all apps
- `product`: Filter to a specific product ID

**When analyzing revenue trends:**
1. Always specify `ending_at` explicitly when the analysis covers a fixed historical window — relying on the default "now" produces non-reproducible results.
2. Use `unit=week` for trend analysis spanning more than 4 weeks to reduce noise.
3. Compare revenue windows of equal length (e.g., last 30 days vs. prior 30 days) before drawing conclusions about growth or decline.
4. When `app_id` is omitted, the response aggregates all apps — flag this in any report to avoid misattribution.

## Working With Purchase Quantity Series

Use `GET /purchases/quantity_series` to retrieve the count of purchase events over a time range. The parameters are identical to `revenue_series`.

**When analyzing purchase frequency:**
1. Compute AOV inline: `revenue[i] / quantity[i]` for each time unit — a rising AOV with flat quantity signals upsell success; a falling AOV with rising quantity signals volume growth at lower price points.
2. Treat days with `quantity = 0` as data gaps, not confirmed zero-purchase days, unless the time range is recent and operational status can be confirmed.
3. Frequency spikes around campaign send dates are expected — annotate time series with campaign timing when available.

## Working With Product Lists

Use `GET /purchases/product_list` to discover all product IDs that have been purchased. This endpoint is paginated.

**Key parameters:**
- `page`: Zero-indexed page number
- `product_count`: Products per page (default 255, max 1000)

**When using the product list:**
1. Retrieve all pages before filtering — the first page alone is not representative of the full catalog.
2. Use the product list as a discovery step to identify product IDs for subsequent `revenue_series` or `quantity_series` calls filtered by `product`.
3. Products absent from the list have zero recorded purchases — include them in funnel gap analysis if they appear in other catalog sources.
4. The list does not include revenue or quantity data directly; always follow up with time-series calls to quantify product-level performance.

## Required Permissions

Ensure the API key in use has the following permissions before making requests:

| Operation | Required Permission |
|---|---|
| Revenue time series | `purchases.revenue_series` |
| Quantity time series | `purchases.quantity_series` |
| Product list | `purchases.product_list` |

If a 403 is returned, diagnose permissions before assuming the data is unavailable.

## Common Analysis Patterns

### Revenue Trend Report
1. Fetch `revenue_series` for the current period (e.g., 30 days)
2. Fetch `revenue_series` for the prior equivalent period
3. Fetch `quantity_series` for both periods
4. Compute: period-over-period revenue change (%), AOV for each period, AOV change
5. Surface inflection points — days where revenue/quantity diverge significantly

### Top Product Analysis
1. Fetch `product_list` (all pages)
2. For each product ID of interest, fetch `revenue_series` with `product` filter over the target window
3. Rank products by total revenue; optionally fetch `quantity_series` per product to compute per-product AOV
4. Flag products with high quantity but low revenue (volume drivers vs. revenue drivers)

### Purchase Funnel Snapshot
1. Identify the cohort window and app scope
2. Fetch `quantity_series` (event volume at top of funnel)
3. Fetch `revenue_series` (monetary outcome)
4. Calculate conversion quality metrics: AOV, revenue per day, purchase velocity (quantity/day)
5. Compare against a baseline window to contextualize the snapshot

## Data Limitations and Caveats

- **Max 100-day window**: Single requests cannot exceed 100 days. Stitch multiple requests for longer windows, ensuring `ending_at` offsets are aligned precisely to avoid gaps or overlaps.
- **No user-level data**: These endpoints return aggregated metrics only — no individual user purchase history.
- **Currency**: Revenue values are returned in the app's configured currency. Flag cross-currency comparisons when multiple app IDs are involved.
- **Eventual consistency**: Very recent data (last 24–48 hours) may be incomplete. Prefer windows ending 2+ days prior for finalized metrics.
- **Product filter granularity**: The `product` parameter on time-series endpoints filters by a single product ID per request — batch multiple product lookups across separate calls.

## Output Guidance

When presenting purchase analytics:
- Lead with the headline metric (total revenue, AOV, or purchase count) before trend breakdowns
- Use percentage change alongside absolute values — stakeholders need both
- Explicitly state the time window, app scope, and any product filters applied
- Note data caveats (e.g., recent data lag, cross-app aggregation) inline with the metrics they affect
- Recommend follow-up segmentation (by campaign, segment, or product) when aggregate trends show unexpected movement
