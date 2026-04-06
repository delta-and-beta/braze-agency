---
name: predictive-events-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_events/analytics
indexed_at: '2026-04-05'
keywords:
  - prediction
  - likelihood
  - score
  - targeting
  - accuracy
  - correlation
  - audience
  - segment
  - export
  - model
triggers:
  - how to target users by prediction score
  - accessing prediction scores for a user
  - creating a segment with event likelihood
  - understanding prediction accuracy
  - exporting prediction data with scores
---
# Event Prediction Analytics

The **Prediction Analytics** page helps you target users based on their likelihood to perform a predicted event (e.g., purchase). It becomes available once a prediction finishes training.

## Likelihood Score

Every user in the prediction audience receives a score from **0–100**. Higher = more likely to perform the event.

| Category | Score Range |
|----------|-------------|
| Low      | 0–50        |
| Medium   | 50–75       |
| High     | 75–100      |

Scores are updated on the schedule set during prediction creation. The top-of-page chart shows user distribution across 20 equally-sized score buckets.

### Accessing Scores

- **Single user**: Dashboard → user profile → **Engagement > Predictions**
- **Bulk access**: Create a segment using the **Event Likelihood Score** or **Event Likelihood Category** filter, then export — likelihood scores can be included in the export

> **Predictive Events vs. Predictive Churn distinction**: Predictive events consider *all* users in the audience (including those who have never performed the event). Predictive churn only considers users who have *already* performed an event and may stop. Exported churn risk scores reflect the churn model, not the event prediction model.

## Targeting Slider

The score distribution chart has a slider to select a score range. As you adjust it:
- The **left panel** shows how many users from the full audience fall in that range
- The **right panel** shows estimated accuracy for that selection

## Estimated Accuracy

Two estimates are shown for your selected audience:

**Expected to perform (true positives)**: Users predicted to perform the event. Note: Braze expects this many to perform the event *even without messaging* — these are genuinely likely users.

**Not expected to perform (false positives)**: Users with high scores who will likely *not* perform the event — targeting errors. The filled portion of the second progress bar shows the expected false positive count.

Use these estimates to balance:
- Capturing more true positives (slide right) — good for re-engaging existing buyers
- Minimizing false positives (slide left) — good for conserving spend on promotions

## Prediction Quality

Measures overall model accuracy (displayed on the page; based on held-out test data).

## Event Correlation Table

Displays attributes and behaviors correlated with performing the event, split into "more likely" (left) and "less likely" (right) columns.

| Data Type | Examples |
|-----------|----------|
| Attributes | Age, Country, Gender, Language |
| Behaviors | Sessions, purchases, dollars spent, custom events, campaigns/Canvas steps received (last 30 days) |

Each row shows the likelihood ratio for that attribute/behavior relative to the overall prediction audience. **This table only updates when the prediction retrains**, not on score refresh cycles.

> Correlation data is partially hidden for preview predictions; a purchase unlocks full visibility.

## Troubleshooting

**Cannot create a prediction**: Usually caused by insufficient sample size. Braze requires enough users to have performed the target event to train the model. If too few users qualify, the system may be unable to extrapolate, blocking prediction creation. Ensure your prediction audience contains enough users who have performed the event.

`★ Insight ─────────────────────────────────────`
- The original docs use Jekyll Liquid templating (`{{site.baseurl}}`, `{% image_buster %}`, `{% alert %}`) — these are stripped since topic files are consumed as standalone reference markdown, not rendered through the Jekyll pipeline
- The "predictive events vs. churn" alert was preserved as a blockquote rather than dropped — it's genuinely non-obvious domain knowledge that affects how users interpret exported score data
- The estimated accuracy section restructures prose into a decision framework, which is more useful for an agent referencing this at query time than the original narrative explanation
`─────────────────────────────────────────────────`
