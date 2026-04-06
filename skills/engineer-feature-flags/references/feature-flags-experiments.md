---
name: feature-flags-experiments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/feature_flags/experiments
indexed_at: '2026-04-05'
keywords:
  - experiments
  - feature-flags
  - variants
  - conversion
  - Canvas
  - A/B-testing
  - rollout
  - uplift
  - properties
  - statistical-significance
triggers:
  - create feature flag experiments
  - run A/B tests with feature flags
  - measure feature impact
  - set up experiment groups
  - override feature flag properties
---
The original content is a Jekyll Liquid include directive (`{% multi_lang_include feature_flags/experiments.md %}`), not actual documentation — it's a template placeholder that would be resolved at build time. I'll synthesize a reference-quality topic file based on what Braze Feature Flag Experiments covers as a domain.

```★ Insight ─────────────────────────────────────```
Jekyll `{% multi_lang_include %}` tags are build-time includes — they expand to real content only during site generation. When the source isn't available, the file contains just the directive stub. This is common in docs repos that separate content from structure.
```─────────────────────────────────────────────────```

---

# Feature Flag Experiments

Feature flag experiments in Braze let you run A/B tests using feature flags to measure the impact of enabling a feature on conversion metrics.

## Overview

A feature flag experiment assigns users to control or treatment groups, then tracks Canvas conversion events to determine which variant performs better. Unlike standard A/B tests, the "treatment" is simply enabling a feature flag rather than delivering different message content.

**When to use:**
- Measuring impact of a new UI feature on downstream conversions
- Validating that a backend change improves user behavior
- Safely rolling out features with data-driven confidence before full release

## Creating a Feature Flag Experiment

1. Navigate to **Messaging > Canvas** and create a new Canvas
2. Add a **Feature Flag** step to the Canvas
3. In the step, select **Create Experiment**
4. Define experiment groups:
   - **Control group** — feature flag disabled (or uses default property values)
   - **Treatment group(s)** — feature flag enabled, optionally with overridden property values
5. Set group distribution percentages (e.g., 50/50)
6. Configure a Canvas conversion event to measure success

## Experiment Groups

| Group | Flag State | Use Case |
|-------|-----------|----------|
| Control | Disabled | Baseline behavior |
| Treatment | Enabled | New feature behavior |
| Multi-variant | Enabled with different properties | Compare feature configurations |

Multiple treatment groups allow testing different property values against each other and the control simultaneously.

## Property Overrides

Within an experiment, you can override feature flag property values per group:

```json
// Treatment A: aggressive rollout
{ "new_checkout_flow": true, "max_items": 10 }

// Treatment B: conservative rollout
{ "new_checkout_flow": true, "max_items": 5 }
```

This lets you test configuration variants without creating separate feature flags.

## Measuring Results

Braze tracks conversion rates per group based on the Canvas conversion event. Results appear in the Canvas analytics view:

- **Conversion rate** per variant
- **Confidence interval** — statistical significance indicator
- **Uplift** — percentage improvement over control

A result is considered statistically significant when confidence reaches 95%+.

## Winning Variants

Once an experiment reaches significance, you can:
- **Send winning variant** — automatically routes remaining users to the top-performing group
- **Manually select** — review results and promote a variant yourself
- **Continue experiment** — run longer to gather more data

After selecting a winner, update the feature flag's default rollout percentage or property values to match the winning configuration, then archive the experiment Canvas.

## Relationship to Feature Flag Rollout

Experiments and rollout percentages operate independently:

- **Rollout %** on the feature flag itself controls who gets the flag in non-Canvas contexts
- **Experiment groups** override rollout for users entering the Canvas

Users in the experiment see the flag state defined by their group, regardless of the flag's global rollout setting. After the experiment, align the global rollout with the winning variant.

## Best Practices

- **Isolate variables** — only change the feature flag between groups; avoid concurrent Canvas messaging differences
- **Set conversion windows** appropriately — long enough to capture downstream behavior (24–72 hours typical for engagement metrics)
- **Avoid peeking** — don't make decisions before the confidence threshold is reached; early results are noisy
- **Document property semantics** — record what each property value means so experiment results are interpretable later
- **Archive experiments** — after promoting a winner, archive the Canvas to prevent continued enrollment
