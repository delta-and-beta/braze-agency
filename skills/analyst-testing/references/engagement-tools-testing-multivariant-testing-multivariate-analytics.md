---
name: engagement-tools-testing-multivariant-testing-multivariate-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing/multivariate_analytics
indexed_at: '2026-04-05'
keywords:
  - multivariate
  - A/B testing
  - analytics
  - variants
  - optimization
  - confidence
  - personalization
  - statistics
  - segmentation
  - conversion
triggers:
  - check variant performance
  - view A/B test results
  - analyze test statistics
  - compare winning variants
  - interpret confidence scores
---
## Multivariate & A/B Test Analytics

### Viewing Results

After campaign launch, check variant performance from **Campaigns** in the dashboard. The analytics view depends on which optimization was selected at setup.

---

### No Optimization

The **Campaign Analytics** page shows variant performance vs. the control group (if included), with metrics like recipients, bounces, clicks, and conversions per variant.

---

### Winning Variant Optimization

Adds an **A/B Test Result** tab with two sub-tabs:

**Initial Test tab**
- Shows metrics for each variant from the initial send (portion of target segment)
- If a variant outperforms all others at **≥95% confidence**, it receives a "Winner" label
- If no variant clears 95% confidence but you chose to send the best performer anyway, it still receives the "Winner" label

**How the winner is selected:**
- Braze uses **Pearson's chi-squared test** (p < 0.05) to determine if one variant statistically outperforms *all others*
- This differs from the confidence score, which compares a variant only to the control (0–100%)
- A variant can beat the control without winning the chi-squared test

**Winning Variant tab**
- Shows results of the second send to remaining users
- Audience % reflects the portion reserved for the Winning Variant group
- To see full campaign performance including both sends, check **Campaign Analytics**

---

### Personalized Variant Optimization

Adds an **A/B Test Result** tab with two sub-tabs:

**Initial Test tab**
- Shows metrics per variant from the initial send
- Looks for associations between **custom events** and variant preferences
- Detected relationships determine which variant each user receives in the final send

**Fallback: Session-Based Analysis**
Used when no meaningful relationship is found between custom events and preferences. Segments users by:

| Characteristic | Description |
|---|---|
| Recency | When they last had a session |
| Frequency | How often they have sessions |
| Tenure | How long they've been a user |

Each characteristic is split into buckets; each bucket contributes a weighted "push" toward a variant, determined via **logistic regression** on initial send responses. A user's Personalized Variant = sum of effects across all three buckets.

**Personalized Variant tab**
- Shows results of the second send (each user receives their highest-engagement-probability variant)
- Displays: projected lift, overall results, and projected results if Winning Variant had been sent instead

---

### Key Concepts

| Term | Definition |
|---|---|
| Confidence (0–100%) | How likely a variant outperforms the control group |
| 95% confidence threshold | Minimum for Braze to label a variant "Winner" |
| Chi-squared test | Statistical test comparing all variants against each other |
| Personalized Variant | Individually tailored variant based on user behavior patterns |
