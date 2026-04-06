---
name: predictive-churn-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_churn/analytics
indexed_at: '2026-04-05'
keywords:
  - churn
  - prediction
  - score
  - risk
  - targeting
  - audience
  - accuracy
  - analytics
  - model
  - correlation
triggers:
  - understand churn risk scores
  - target users by churn prediction
  - interpret prediction accuracy metrics
  - view churn correlation analysis
  - configure churn targeting strategy
---
`★ Insight ─────────────────────────────────────`
- Topic files in this codebase are "atomic knowledge units" stored as `skills/{id}/references/*.md` — they're designed for fast lookup at the Default (Sonnet) depth routing level, so conciseness directly affects query performance
- Removing Jekyll liquid tags (`{% image_buster %}`, `{% multi_lang_include %}`, `{{site.baseurl}}`) is essential since those are runtime template directives that would appear as literal noise in a static reference file
`─────────────────────────────────────────────────`

## Churn Prediction Analytics

The **Prediction Analytics** page is available after a churn prediction finishes training. It helps you decide which users to target based on their Churn Risk Score, using historical model accuracy and your business goals.

---

### Churn Risk Score and Category

Every user in the prediction audience receives a **Churn Risk Score** from 0–100:

| Score Range | Category |
|---|---|
| 0–50 | Low Risk |
| 50–75 | Medium Risk |
| 75–100 | High Risk |

- Scores and categories update on the schedule set during model creation.
- The page chart shows user counts across 20 equally sized score buckets.
- A slider lets you select a score range and preview targeting estimates for that audience slice.

---

### Prediction Quality

A quality metric indicating how well the model discriminates between churning and non-churning users, based on historical data. Higher quality = more reliable targeting decisions.

---

### Estimated Accuracy (Targeting Panel)

When you move the slider to select a score range, two estimates are shown:

**Users expected to churn (true positives)**
- Estimate of actual churners correctly included in the selection.
- Based on prior churn rates in the prediction audience.
- Represents users likely to churn *without* any intervention.

**Users expected not to churn (false positives)**
- Estimate of users who would *not* have churned but are included in the selection.
- These are model errors — users with high scores who won't actually churn.
- The filled portion of the progress bar shows the false-positive fraction at the current slider position.

**Targeting strategy guidance:**
- **Promo-sensitive / high cost per false positive**: minimize non-churners targeted; narrow the slider to high-confidence churners.
- **Tolerant of false positives**: widen the slider to capture more true churners at the cost of over-messaging.

---

### Churn Correlation Table

Displays user attributes and behaviors correlated with churn in the historical audience.

- **Left side**: attributes/behaviors associated with *higher* churn likelihood.
- **Right side**: attributes/behaviors associated with *lower* churn likelihood.
- Each row shows a **ratio**: churn likelihood for users with that attribute ÷ baseline churn likelihood across the full prediction audience. A ratio > 1 means higher-than-average churn risk.

**Update frequency**: Refreshes only when the prediction *retrains*, not on each score update cycle.

> **Note**: Correlation data for preview (untrained) predictions is partially hidden. A purchase is required to reveal full data.

---

### Filters for Segmentation

Once scores are generated, use the Churn Risk Score directly in **segments or campaigns** via filters — no need to use the analytics page for basic targeting. The analytics page is primarily for calibrating *who* and *how many* to target before committing to a campaign audience.

`★ Insight ─────────────────────────────────────`
- The ratio column in the correlation table is a **likelihood ratio** (not a percentage lift) — this distinction matters when teams interpret "2x more likely to churn" vs "20% more likely to churn"
- The two-sided targeting tradeoff described here (true positive capture vs false positive cost) mirrors the classic precision/recall tradeoff in ML — framing it in business cost terms is what makes it actionable for non-technical users
`─────────────────────────────────────────────────`
