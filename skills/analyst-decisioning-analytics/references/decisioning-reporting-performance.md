---
name: decisioning-reporting-performance
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/reporting/performance
indexed_at: '2026-04-05'
keywords:
  - decisioning
  - performance
  - KPI
  - uplift
  - conversion
  - revenue
  - reporting
  - metrics
  - segments
  - dashboard
triggers:
  - how to read the performance report
  - understand KPI calculations
  - compare decisioning groups
  - analyze uplift performance
  - interpret conversion metrics
---
## Decisioning Performance Reports

The Performance report shows how your decisioning agent performs compared to control groups (e.g., Decisioning Studio vs. Business as Usual).

### How the Report is Built

Built in layers in collaboration with your team and Braze:

1. Define what counts as an **action** (send, click, purchase, conversion)
2. Define how to **measure** that action daily (volume, revenue, unique people)
3. Define the **business metric** (conversion rate, revenue per user)
4. Apply time rules and segmentation
5. Results display on the **Performance** tab

The dashboard visualizes stored daily results — it creates no new data.

### Dashboard Controls

| Control | Description |
|---|---|
| **Date range** | Time period for the report |
| **Comparison groups** | Groups being compared (e.g., Decisioning Studio vs. BAU) |
| **Aggregation** | Daily, 7-day rolling, or 30-day rolling (chart display only — does not change stored data) |
| **Segments** | Custom-configured population filters (set with AI Expert Services) |
| **Timeline events** | Overlay events on chart to contextualize performance changes |

> Recent dates may be disabled due to data pipeline delays — typically a few days from CDP to Decisioning Studio.

### Report Sections

#### KPI Cards (left panel)
- Show key performance indicators (e.g., Incremental LTV/Customer, Conversions/Customer, Unsubscribes/Customer)
- Represent the **full-period** value across the entire selected date range — not a daily average

#### KPI Trend Chart (center)
- Same KPI as the top card, but calculated **per day**
- 7-day rolling smooths daily volatility
- **Key distinction**: chart = daily performance; KPI card = full-period performance

**Rate metric example:**
- Day 1: 10/100 customers = 10%
- Day 2: 2/10 customers = 20%
- KPI card = 12/110 = **10.9%** (recalculated across both days, not an average of 10% + 20%)

#### Uplift Chart (right)
- Percentage difference between comparison groups
- Formula: **(Primary Group − Comparison Group) / Comparison Group**
- Computed dynamically from KPI results — not stored independently

#### Aggregate Table (bottom)
- Raw totals across the selected date range (total LTV, total customers, derived KPI)
- Reinforces the relationship: KPI card = window-level, chart = daily, table = underlying totals

#### Driver Tree
- Breaks a KPI into component drivers (e.g., Incremental LTV/Customer → Conversions/Customer + Revenue per Conversion)
- Uses same KPI definitions as the rest of the dashboard — no new calculations
- Updates automatically when KPI definitions change

### Key Concepts

**Volume vs. Rate KPIs:**
- **Volume** (total conversions, total revenue): "How much happened?"
- **Rate** (conversion rate, revenue per user): "How efficiently did it happen?"
- A campaign can drive higher volume but lower efficiency — always confirm which type you're reading

**Segments:**
- Membership calculated daily; a customer's past segment reflects who they were *on that day*
- Historical segment membership does not retroactively update — preserves report stability

**Go vs. Pro agents:**
- Go use case KPIs are standardized automatically (target metric: unique clicks)
- Pro use case KPIs are custom-configured per use case

**Date picker restrictions:**
- Intentional guardrails for activation delays, data availability delays, or excluded dates
- Contact AI Success Manager for use-case-specific configuration details
