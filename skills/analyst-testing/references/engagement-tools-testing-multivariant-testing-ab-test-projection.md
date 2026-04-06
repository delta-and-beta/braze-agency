---
name: engagement-tools-testing-multivariant-testing-ab-test-projection
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing/ab_test_projection
indexed_at: '2026-04-05'
keywords:
  - projection
  - testing
  - variants
  - subjectlines
  - prediction
  - campaign
  - accuracy
  - winner
  - multivariant
triggers:
  - How to run A/B test projection
  - Predict best subject lines
  - A/B test winner prediction
  - Run message variants projection
  - Subject line performance accuracy
---
## A/B Test Projection

Neural network feature that predicts which subject lines will perform best in A/B tests. The model extracts linguistic patterns from historical winning A/B tests on Braze to learn what makes subject lines more effective.

> **Early Access**: Contact your Braze customer success manager or account manager to participate.

## How to Run a Projection

1. In campaign composition, add message variants with subject lines
2. Navigate to **Target Audience** step
3. In the **A/B Testing** panel, select **Run Projection**
4. A modal shows subject lines from existing variants
5. Optionally add up to 10 total subject lines manually
6. Select **Run Projection**

The predicted best subject line is labeled **Projected Winner**.

**Note:** For quick push campaigns, A/B testing projections are supported when multiple platforms are selected.

## Accuracy

~70% accurate when picking between pairs of messages in real A/B tests. Factor this confidence level into decisions.

## Data Usage

- Learns from past A/B tests conducted on Braze
- The actual message copy (yours or any customer's) is never fed to the model
- Only high-level language patterns predicting winners are extracted and used to train the model

`★ Insight ─────────────────────────────────────`
- The original doc embeds Jekyll Liquid template tags (`{% alert %}`, `{{site.baseurl}}`), image asset URLs from GitHub, and navigation cross-links — all stripped here since topic files need to be self-contained and renderer-agnostic.
- The 70% accuracy figure is a high-value fact worth preserving explicitly: it's the kind of number that helps an AI agent calibrate how strongly to recommend this feature.
`─────────────────────────────────────────────────`
