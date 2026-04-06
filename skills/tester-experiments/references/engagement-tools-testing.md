---
name: engagement-tools-testing
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/random_bucket_numbers
indexed_at: '2026-04-05'
keywords:
  - bucketing
  - segments
  - testing
  - variants
  - canvas
  - control-group
  - experiments
  - audiences
  - analytics
  - re-entry
triggers:
  - how to split audiences using random buckets
  - create A/B tests with random bucket numbers
  - set up canvas variant testing
  - random audience re-entry for campaigns
  - global control group testing
---
## Random Bucket Numbers

Each Braze user profile is automatically assigned a random bucket number between **0–9999** (inclusive) at creation. If a user is deleted and re-created, they receive a new number.

### Use Cases

| Scenario | Tool |
|---|---|
| Long-term testing across multiple campaigns/Canvases | Random bucket numbers |
| Single campaign variant testing | A/B testing |
| Canvas journey-level testing | Canvas variants |
| Canvas step-level testing | Experiment Paths |

Random bucket numbers also power the **Global Control Group** — Braze selects ranges of bucket numbers to form a group that receives no campaigns or Canvases.

### Creating Segments

Add the **"Random Bucket #"** filter when creating a segment, then specify a number or range.

**Example: 4-group split (3 variants + control)**

| Bucket Range | Segment |
|---|---|
| 0–2499 | Control |
| 2500–4999 | Variant 1 |
| 5000–7499 | Variant 2 |
| 7500–9999 | Variant 3 |

Enable [analytics tracking](https://www.braze.com/docs/user_guide/analytics/tracking/segment_analytics_tracking/) on each segment to measure custom event completion per group.

> **Canvas warning:** When using bucket number filters in a Decision Split step, ensure exit criteria, audience filters, and upstream steps don't overlap with your bucket ranges — overlapping filters cause uneven path distribution.

### Random Audience Re-Entry

Allows users to cycle back through bucket-based segments for ongoing A/B testing.

1. Create a segment with the random bucket filter
2. Split audience into buckets (e.g., two buckets = 50% each)
3. Set **Target Audiences** to the desired bucket configuration
4. Define re-entry logic (e.g., re-enter if no app engagement for 15 days)
5. Monitor engagement and conversion rates per bucket
