---
name: engagement-tools-testing-random-bucket-numbers
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/random_bucket_numbers
indexed_at: '2026-04-05'
keywords:
  - buckets
  - segments
  - testing
  - variants
  - audiences
  - canvas
  - control
  - splitting
  - re-entry
  - distribution
triggers:
  - how to create random bucket segments
  - split audiences with bucket numbers
  - set up A/B testing with random buckets
  - configure canvas decision splits
  - how to use random buckets for testing
---
## Random Bucket Numbers

A **random bucket number** is a user attribute (0–9999 inclusive) automatically assigned when a user profile is created in Braze. Used to create uniformly distributed segments for long-term testing across campaigns and Canvases.

**Key behavior:**
- Assigned randomly with no weighting
- Deleted and re-created users receive a new number
- Also used internally for Global Control Groups

---

### When to Use

| Use case | Tool |
|---|---|
| Long-term multi-campaign/Canvas testing | Random bucket numbers |
| Single campaign testing | A/B testing |
| Canvas journey-level testing | Canvas Variants |
| Canvas step-level testing | Experiment Paths |

---

### Creating Segments

Add the **"Random Bucket #"** filter when creating a segment, then specify a number or range.

**Example — 4-group split (control + 3 variants):**

| Buckets | Group |
|---|---|
| 0–2499 | Control |
| 2500–4999 | Variant 1 |
| 5000–7499 | Variant 2 |
| 7500–9999 | Variant 3 |

Enable **analytics tracking** on each segment to measure custom event completion per group.

---

### Canvas Usage Warning

When using random bucket segments as filters in a Decision Split step, ensure exit criteria, audience filters, and upstream steps do **not** overlap with your bucket ranges. Overlap causes disproportionate removal before the split, resulting in uneven path distribution.

---

### Random Audience Re-entry

Useful for A/B testing or targeting specific groups repeatedly.

**Steps:**
1. Create your segment with a random bucket filter
2. Define bucket splits (e.g., two buckets = 50% each)
3. Set **Target Audiences** with the random bucket settings
4. Configure re-entry logic (e.g., re-enter if no app engagement for 15 days)
5. Launch and monitor engagement/conversion rates per bucket
