---
name: engagement-tools-testing-multivariant-testing-faq
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing/faq
indexed_at: '2026-04-05'
keywords:
  - multivariate
  - testing
  - variants
  - confidence
  - statistical
  - conversion
  - control
  - assignment
  - chi-squared
  - significance
triggers:
  - how to set up multivariate tests
  - understanding A/B test results
  - variant assignment in recurring campaigns
  - confidence scores explained
  - control group bias
---
## Multivariate Testing FAQ

### A/B vs Multivariate Testing

**A/B testing** — Tests a single variable (e.g., subject line, send time) across 2+ randomly split groups. Best-performing variant is sent to the remaining audience.

**Multivariate testing** — Tests multiple variables simultaneously (e.g., subject line + image + CTA color) to find the most effective combination. Faster, more comprehensive insights, but requires a larger audience for statistical significance.

### How Results Are Calculated

Braze uses **Pearson's chi-squared tests** to compare all variants against each other. A variant wins if it statistically outperforms all others at **p < 0.05** (95% significance).

**Confidence score** is separate — it's a 0–100% value representing confidence that a variant's conversion rate difference from control exceeds random chance.

### Variant Distribution

Variant distribution may not appear even due to how Braze assigns users — see platform docs for full explanation.

---

### When Does the Initial Test End?

- **Single-send campaigns (Winning Variant):** Test ends at the configured Winning Variant Send Time; winner = highest conversion rate by statistically significant margin.
- **Recurring / action-based / API-triggered campaigns:** Use **Intelligent Selection**, which continuously tracks performance and reallocates traffic toward top-performing variants automatically — no fixed end time.

### User Variant Assignment in Recurring Campaigns

- Users are randomly assigned a variant on first receipt.
- They receive the **same variant** on subsequent sends unless variant percentages change.
- If percentages change, only users in **edited variants** are redistributed; untouched variants retain their users.
- **Control group** users can never receive a message; message recipients can never enter the control group retroactively.

**Experiment Paths (Canvas):** Same rules apply — Canvas paths following an experiment are variants.

**Redistributing users:** Only possible via **Randomized Paths in Experiment Paths**, but this always re-randomizes on Canvas re-entry, which risks contaminating the control group and invalidating results.

---

### Confidence Over Time

Confidence increases over time when all other factors are held constant (no external marketing changes affecting variants mid-test). Larger sample sizes increase statistical power and the ability to detect smaller performance differences.

### Control/Test Group Bias

No systematic bias is introduced by assignment. Braze's method:

1. Link the user's randomly generated user ID with the randomly generated campaign/Canvas ID.
2. Apply **sha256 hashing**, then divide by 100 and keep the remainder (modulus 100).
3. Order users into percentage slices matching the dashboard's variant/control assignments.

### Rate Limiting and Control Groups

Rate limiting is **not supported** with A/B tests that include a control group — rate limits don't apply to control users the same way as variant users, introducing bias. Use **Intelligent Selection** instead, which auto-adjusts variant traffic percentages based on live analytics.
