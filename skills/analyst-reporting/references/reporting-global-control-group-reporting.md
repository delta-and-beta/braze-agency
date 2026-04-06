---
name: reporting-global-control-group-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/global_control_group_reporting
indexed_at: '2026-04-05'
keywords:
  - control
  - conversion
  - treatment
  - uplift
  - metrics
  - events
  - reporting
  - groups
triggers:
  - how to run a control group report
  - measure incremental uplift from messaging
  - compare conversion rates between control and treatment
  - analyze global control group reporting
  - configure control group experiment
---
## Global Control Group Reporting

Compare messaging impact by measuring conversion behavior between a **control group** (unexposed users) and a **treatment sample** (random selection of non-control users, roughly equal in size, generated via Random Bucket Number method).

### Accessing the Report

**Analytics** > **Global Control Group Report** → select event (sessions or custom event) → **Run Report**

### Configuration

- **Event**: Choose sessions or any custom event to compare across groups
- **Time period**: Select the date range for analysis
- Avoid spanning multiple saved control group experiments in a single report
- Percentage metrics are **rounded** — very low conversion rates may display as 0%
- **Confidence %** shown for "Change from Control": a 0% confidence means identical performance between groups (not a data error)

### Group Size Note

Before May 2024, only the treatment sample was subject to user archival (not the control group). Since May 2024, both are excluded. This may cause size discrepancies between groups until the next Global Control Group reset. Each workspace supports **one control group and one treatment sample group**.

---

### Report Metrics

| Metric | Definition | Formula |
|--------|------------|---------|
| **Change from Control** | Uplift between treatment and control conversion rates | `((Treatment CR – Control CR) ÷ Control CR) × 100` |
| **Incremental Uplift** | Additional conversion events attributed to treatment vs. control | `Total events (treatment) – Total events (control)` |
| **Incremental Uplift %** | Portion of treatment's total events attributable to messaging (not organic behavior) | `Incremental uplift ÷ Total events (treatment)` |
| **Conversion Rate** | Estimated % of users completing the selected event; approximated because group size fluctuates and events are non-unique. Can exceed 100% if users trigger events multiple times daily. | `Sum of events over period ÷ Sum of daily users in group` |
| **Estimated Group Size** | Estimated users in each group during the selected period | Maximum membership size reached during the report period |
| **Total Number of Events** | Total (non-unique) occurrences of the selected event | Sum of daily event counts over the selected period |
| **Events Per User** | Average events per user in each group | `Total events ÷ Estimated group size` |

---

`★ Insight ─────────────────────────────────────`
- The **Conversion Rate** formula uses a daily sum of group membership (not a snapshot), making it an approximation — important context when interpreting values near 0% or over 100%
- **Incremental Uplift %** answers "what fraction of conversions would not have happened without messaging?" — more actionable than raw conversion rate for attributing campaign ROI
- The pre/post-May 2024 archival change is a subtle gotcha: historical reports crossing that boundary may show skewed group sizes that don't reflect true experimental balance
`─────────────────────────────────────────────────`
