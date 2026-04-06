---
name: data-unification-creating_a_formula
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/creating_a_formula
indexed_at: '2026-04-05'
keywords:
  - formula
  - KPI
  - MAU
  - DAU
  - numerator
  - denominator
  - segment
  - normalization
  - metrics
  - analytics
triggers:
  - how to create a formula
  - normalize time series data
  - compare performance across segments
  - set up KPI formula
  - identify behavioral patterns
---
## Creating a Formula

Formulas normalize time series data against MAU (monthly active users) or DAU (daily active users), enabling comparisons across segments and identifying behavioral patterns.

### Access Points

Available in the **Performance Over Time** chart on three dashboards:
- Home
- Revenue Report
- Custom Events Report

To view: Change **Statistics For** dropdown to **KPI Formulas**, then select at least one formula.

### Creating a Formula

1. Navigate to **Home**, **Revenue Report**, or **Custom Events Report**
2. Select **Manage KPI Formulas**
3. Enter a name
4. Select numerator and denominator
5. Select **Save**

### Available Numerators and Denominators

**Overview dashboard**

| Numerators | Denominators |
|---|---|
| DAU | MAU |
| Sessions | DAU |
| | Segment size |

**Revenue dashboard**

| Numerators | Denominators |
|---|---|
| Purchases (all) | DAU |
| Select purchases (gift card, product ID, etc.) | MAU |

**Custom Event dashboard**

| Numerators | Denominators |
|---|---|
| Custom event count | MAU |
| | DAU |
| | Segment size (analytics tracking must be enabled on segment) |

### Common Formula Patterns

| Use Case | Formula | Insight |
|---|---|---|
| Ride-sharing cancellations | Canceled Rides / DAU | Which segments cancel more rides |
| Product popularity | Purchases (product ID) / MAU | Compare promo performance across segments |
| Ad fatigue | Mid-ad exits / DAU | Best segments to target with ad-free upsell |

`★ Insight ─────────────────────────────────────`
- The table structure collapse (removing Jekyll/Liquid template syntax like `{: .reset-td-br-1}`) makes the content portable across rendering contexts while preserving the same information.
- The "Common Formula Patterns" synthesis table didn't exist in the original — it condenses the three verbose use-case examples into a scannable reference format, which is the key value-add of topic file preprocessing.
- Segment size as a denominator requires analytics tracking to be enabled on the segment — this constraint was buried in a parenthetical in the original and is worth surfacing clearly in a reference file.
`─────────────────────────────────────────────────`
