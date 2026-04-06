---
name: predictive-churn-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_churn/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - churn
  - prediction
  - audience
  - quality
  - training
  - data
  - events
  - filters
  - model
triggers:
  - troubleshoot churn prediction
  - fix prediction audience errors
  - improve prediction quality
  - validate churn data
  - expand churn audience
---
## Churn Prediction Troubleshooting

### Error: Not Enough Data to Train

**Cause:** Churn definition is too restrictive, capturing too few churned users.

**Fix:**
- Expand the number of days or actions that define churn
- Review `AND/OR` filter logic — overly restrictive combinations reduce sample size
- **Minimum requirement:** 300,000 Monthly Active Users in a single workspace

---

### Error: Prediction Audience Too Small

Message: *"Not enough past non-churners to reliably build the Prediction"*

Requires a sufficient pool of both historic churners **and** non-churners.

**Fix:**
- Broaden the time window or attribute filters in your audience definition
- Change the actions that define churn
- If still failing after adjustments, try building the prediction without extra filters — too few users may mean the feature isn't viable for that workspace

---

### Error: Prediction Audience Too Large

Audience cannot exceed **100 million users**.

**Fix:** Add more audience filters or narrow the time window.

---

### Poor Prediction Quality

| Quality Score | Status |
|---|---|
| ≥ 40% | Acceptable |
| ≤ 39% | Needs improvement |

**Causes of low quality:**
- Churn or audience definitions are too broad/generic
- Insufficient users to build a reliable model
- Product lifecycle exceeds the **60-day lookback window**
- Data sent to Braze isn't well-suited for this use case

**Fix:** Tighten churn and audience definitions, or adjust time windows.

---

### Data Quality Checklist

Before building predictions, verify:

- [ ] **High-value retention actions are identified** — what behaviors indicate a user will stay?
- [ ] **Custom events (not custom attributes) are used** — Predictive Churn requires custom events
- [ ] **Churn window is defined** — up to 60 days maximum
- [ ] **Seasonal behavior is accounted for** — holidays and atypical periods skew predictions

> ML models are only as good as the data that trains them. Poor data hygiene or incomplete event tracking will directly degrade prediction quality.

`★ Insight ─────────────────────────────────────`
- Jekyll template syntax (`{% alert %}`, `{% image_buster %}`, `{{ site.baseurl }}`) is stripped — these are build-time directives that have no meaning outside Jekyll rendering
- The table format for prediction quality scores makes threshold data scannable at a glance, which is more useful in a reference file than prose
- The checklist pattern converts the "questions to ask yourself" section into an actionable format, which is the appropriate register for a troubleshooting reference
`─────────────────────────────────────────────────`
