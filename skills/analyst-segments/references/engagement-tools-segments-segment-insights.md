---
name: engagement-tools-segments-segment-insights
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/segment_insights
indexed_at: '2026-04-05'
keywords:
  - segments
  - insights
  - baseline
  - revenue
  - demographics
  - funnel
  - conversion
  - KPIs
  - analytics
  - messaging
triggers:
  - compare segments against baseline
  - analyze purchase funnel
  - identify demographic differences
  - measure lifetime revenue by segment
  - compare segment performance
---
## Segment Insights

Segment Insights compares up to 10 segments against a baseline across a fixed set of KPIs. Access via **Analytics > Segment Insights**.

### Available KPIs

| Measurement | Description | Formula |
|---|---|---|
| Sessions per day | Avg daily sessions per user | total sessions / days since first session |
| Days since first session | Avg days between first session and now | today – first session date |
| Days since last session | Avg days between last session and now | today – last session date |
| Lifetime revenue | Avg lifetime spend per user | user lifetime spend |
| Days since first purchase | Avg days from first session to first purchase | first purchase – first session date |
| Days since last purchase | Avg days since last purchase | today – last purchase date |

### Key Behaviors

- **Baseline**: Either a specific segment or "All Users"
- **Sharing**: Each comparison has a unique URL for sharing with teammates
- **Eye icon**: Reveals historical membership graph and estimated size by messaging channel
- **Workspace switching**: Comparisons reset when switching workspaces
- **Segment Details integration**: The same six stats appear inline on any Segment Details page; launching Segment Insights from there overwrites previously selected segments

### Use Cases

**Demographic analysis**
Compare segments by language, geography, or other demographics to identify LTV and activity differences. When a demographic underperforms, test whether the pattern holds in smaller, more homogeneous subpopulations before acting.

Recommended actions for underperforming language segments:
- Localize campaigns to the user's device language
- Run multivariate tests on foreign-language copy

**Purchase funnel analysis**
Identify pre-purchase behaviors (newsletter signup, social sharing, promotional opt-in) that correlate with higher lifetime revenue. Users who opt into promotions may have higher LTV even if currently less active.

Recommended actions:
- Add promotional signup invitations to onboarding campaigns
- Run lapsed user campaigns targeting users who previously converted, with a follow-up campaign for promotional opt-in
