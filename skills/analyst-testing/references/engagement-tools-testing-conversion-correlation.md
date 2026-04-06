---
name: engagement-tools-testing-conversion-correlation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/conversion_correlation
indexed_at: '2026-04-05'
keywords:
  - conversion
  - correlation
  - attributes
  - behaviors
  - analytics
  - statistical
  - significance
  - baseline
  - segments
  - quartile
triggers:
  - analyze conversion correlation
  - find attributes driving conversions
  - identify behavior impact on conversions
  - set up conversion analysis
  - understand conversion statistics
---
## Conversion Correlation

Conversion correlation analysis (on the **Campaign Analytics** page) identifies which user attributes and behaviors are statistically associated with increases or decreases in conversion events for a given campaign.

### How It Works

- Braze tests each attribute/behavior against the entire campaign audience as a baseline
- Only statistically significant correlations are shown
- Select the conversion event from the dropdown to run the analysis
- Unavailable correlations (no significance found) disable the dropdown with an explanatory message

### What Gets Analyzed

**Categorical attributes** (user either has the value or doesn't):
- Country, Language, Gender

**Binary behaviors** (did or didn't occur):
- Performing any custom events
- Campaigns and Canvases received in the last 30 days (excluding the current campaign)

**Quartile-bucketed variables** (split into 4 buckets, association measured per quartile):
- Age
- Total dollars spent
- Number of sessions

### Availability

- Analysis becomes available **at least 24 hours** after a campaign starts sending
- Only looks at sends from the **last 30 days**

### Statistical Method

Uses the **Wilson confidence interval** at **95% confidence**:

1. Compute the **base rate** — the conversion rate for the entire campaign audience
2. Compute the conversion rate for each attribute/behavior segment
3. Divide segment rate by base rate to get a **ratio**
   - Ratio > 1 → users with this attribute/behavior are more likely to convert
   - Ratio < 1 → less likely to convert
4. Only ratios far enough from 1 to be significant at 95% confidence are displayed in the table
