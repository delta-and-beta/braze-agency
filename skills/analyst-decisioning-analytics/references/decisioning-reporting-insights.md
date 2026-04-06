---
name: decisioning-reporting-insights
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/reporting/insights
indexed_at: '2026-04-05'
keywords:
  - decisioning
  - insights
  - preferences
  - shapley
  - shap
  - recommendations
  - actionbank
  - attribution
  - metrics
  - analytics
triggers:
  - understand why options are selected
  - identify seasonal trends in recommendations
  - measure feature impact on decisions
  - analyze recommendation performance
---
## Decisioning Insights Reports

The Insights section of Decisioning Studio provides two reports that explain how recommendation options in your action bank are generated and selected.

---

### Agent Preferences Report

Shows how often each recommendation option was chosen over a time period — useful for identifying seasonal trends and assessing action bank relevance.

| Field | Description |
|-------|-------------|
| Dimension | Attribute used to organize results (channel, campaign, platform) |
| Comparison group | Groups to compare; multiple selections allowed |
| Parameter | Metric applied to the attribute (opens, clicks, conversion rate) |
| Segment | Braze audience segment filter |
| Option | Specific recommendation option from the action bank |
| Description | Short explanation of what the option represents |
| # of times chosen | Total count of how often the option was selected |
| % of time chosen | Percentage of total selections where this option was chosen |

**Use case:** Identify which action bank options are over- or under-represented across time periods to inform updates.

---

### SHAPs Report

Uses **Shapley Additive exPlanations (SHAP)** to quantify how each feature or variable contributes to the recommendation agent's output.

- Each point on the chart = one SHAP value
- Distribution of points = directional impact of a feature
- X-axis: SHAP value (positive = pushes toward selection, negative = pushes away)
- Y-axis: Feature names (e.g., Recency, Frequency, Channel)

**Use case:** Understand which input features most influence recommendations — e.g., whether recency or channel drives selections more strongly.

---

### Key Distinction

| Report | Answers |
|--------|---------|
| Agent Preferences | *What* was selected and how often |
| SHAPs | *Why* options are selected (feature-level attribution) |
