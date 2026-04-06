---
name: analyst-testing
description: >-
  A/B and multivariate testing design, statistical projection, optimization
  strategies, and global control group management.
metadata:
  role: braze-analyst
  topics:
    - engagement-tools-testing-multivariant-testing
    - engagement-tools-testing-multivariant-testing-create-multivariate-campaign
    - engagement-tools-testing-multivariant-testing-multivariate-analytics
    - engagement-tools-testing-multivariant-testing-ab-test-projection
    - engagement-tools-testing-multivariant-testing-optimizations
    - engagement-tools-testing-multivariant-testing-faq
    - engagement-tools-testing-global-control-group
    - engagement-tools-testing-conversion-correlation
    - engagement-tools-testing-random-bucket-numbers
    - engagement-tools-testing-race-conditions
    - engagement-tools-messaging-fundamentals-conversion-events
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's two-layer hierarchy means this SKILL.md **synthesizes** topic reference files — it's the "glue" that explains how atomic knowledge units relate to each other, not a repeat of their content
- The "lens" is the most important element: it tells Claude *how* to interpret the topics, shifting from "what does Braze do" to "how should a statistically rigorous analyst think about this"
- Skills that reference their own topic files explicitly help Claude decide *which* references to load at runtime rather than loading all of them
`─────────────────────────────────────────────────`

```markdown
# Experimentation & Optimization

Apply this skill when designing, launching, or analyzing A/B and multivariate tests in Braze — including experiment setup, variant configuration, statistical projection, result interpretation, optimization strategy, and global control group management.

## Scope and Purpose

This skill covers the full lifecycle of experimentation in Braze: from structuring a valid test and selecting appropriate optimization strategies, to interpreting analytics and managing platform-wide holdout groups. It synthesizes Braze's experiment tooling through the lens of **experimental design, statistical rigor, and data-driven optimization** — ensuring tests are valid, results are trustworthy, and decisions are defensible.

Use this skill when the task involves:

- Designing A/B or multivariate tests with correct variant distribution
- Choosing between Winning Variant and Personalized Variant optimizations
- Setting up conversion events and understanding attribution windows
- Interpreting multivariate analytics and conversion correlation data
- Managing global control groups as a platform-level holdout baseline
- Using random bucket numbers for durable, reproducible audience segmentation
- Diagnosing race conditions that threaten experiment integrity
- Projecting A/B test outcomes using Braze's neural network feature

---

## Lens: Experimental Design, Statistical Rigor, and Data-Driven Optimization

Every answer produced through this skill should reflect three analytical commitments:

**1. Experimental Design First**
Before touching Braze settings, define the hypothesis, identify the single variable under test, and determine the minimum detectable effect. An underpowered test or a test with more than one changing variable produces uninterpretable results regardless of how it is configured in the platform.

**2. Statistical Rigor**
Braze reports confidence levels, winning variant thresholds, and conversion rates — but these numbers are only meaningful if the test was designed correctly. Flag threats to validity: inadequate sample sizes, early peeking, attribution window mismatches, and audience overlap with active campaigns or the global control group.

**3. Data-Driven Optimization**
Recommend action based on what the data supports, not what the data could be made to say. Distinguish between a statistically significant result and a practically significant one. When confidence is low, prescribe extending the test rather than acting on noise.

---

## Topics This Skill Synthesizes

Each topic below is available as an atomic reference file. Load the relevant reference when the task requires its specific detail.

### `references/multivariant-testing-overview.md`
Core concepts: what constitutes a valid A/B test vs. a multivariate test, variant limits (up to 8), single-channel and single-device-type constraints, control group sizing, and the distinction between one-time campaigns and Canvas experiments.

### `references/create-multivariate-campaign.md`
Step-by-step setup: creating variants, setting distribution percentages, choosing send time, and configuring the test window. Reference when helping someone configure a new test in the Braze dashboard.

### `references/multivariant-test-optimizations.md`
The two automated optimization modes — **Winning Variant** (sends best-performing variant to remaining audience after test window) and **Personalized Variant** (uses ML to send each user their predicted best variant). Covers eligibility constraints (email, push, webhook, SMS, WhatsApp one-time campaigns only) and the trade-offs between the two approaches.

### `references/ab-test-projection.md`
Neural network feature that scores subject lines before send using patterns from historical Braze A/B test winners. Reference for pre-send copy optimization, particularly for email subject line selection.

### `references/multivariate-analytics.md`
How to read variant performance tables, unique recipients, conversions, revenue, and confidence intervals after launch. Covers how the analytics view changes depending on which optimization was selected.

### `references/conversion-events.md`
How Braze attributes conversions to campaigns: primary and secondary conversion events, attribution windows, and how window length affects measured conversion rate. Critical for understanding whether analytics reflect actual causal impact or attribution noise.

### `references/conversion-correlation.md`
Post-campaign analysis tool on the Campaign Analytics page that surfaces user attributes and behaviors statistically associated with conversion lift or drop. Reference when investigating *why* a variant won or lost beyond the headline metrics.

### `references/random-bucket-numbers.md`
User attribute (0–9999) assigned at profile creation, used to create stable, reproducible audience segments outside of Braze's built-in experiment randomization. Reference for holdout groups, longitudinal studies, or any experiment requiring persistent assignment across multiple campaigns.

### `references/global-control-group.md`
Platform-level holdout that excludes a percentage of users from all messaging. Enables measurement of aggregate messaging impact vs. a true no-treatment baseline. Reference when advising on long-term incrementality measurement or when a test result needs to be contextualized against the control group's behavior.

### `references/testing-race-conditions.md`
Timing-based threats to experiment integrity: duplicate message delivery, attribution conflicts when multiple campaigns fire simultaneously, Canvas re-entry edge cases, and API trigger overlap. Reference when diagnosing unexpected results or designing experiments involving time-sensitive triggers.

---

## Analytical Workflow

When approaching an experimentation task, work through these phases in order:

### Phase 1 — Pre-Test Design
1. Clarify the hypothesis and the single variable under test
2. Estimate required sample size given expected effect size and desired confidence level
3. Identify which conversion event and attribution window accurately measure success
4. Check for audience overlap with active campaigns and the global control group
5. Determine whether random bucket numbers are needed for persistent assignment

### Phase 2 — Test Configuration
1. Select campaign type (one-time vs. recurring) and channel — note optimization features are unavailable for recurring or multi-channel campaigns
2. Configure variant count and distribution; default to equal splits unless there is a strong prior
3. Set the test window long enough to accumulate sufficient sample, accounting for day-of-week effects
4. Choose optimization: no optimization (manual read), Winning Variant, or Personalized Variant — each has different use cases and eligibility constraints

### Phase 3 — During-Test Monitoring
1. Avoid reading results before the test window closes (early peeking inflates false positive rate)
2. Monitor for race conditions if the campaign fires alongside other automations
3. Track actual send volumes against projected sample to detect delivery issues

### Phase 4 — Result Interpretation
1. Check confidence level before acting on a result — Braze requires ≥95% confidence for automatic winner selection
2. Distinguish statistical significance from practical significance (a 0.2% lift may be significant but not worth productionizing)
3. Use conversion correlation to generate hypotheses about *why* the winner performed better
4. Document findings in terms of the original hypothesis, not just the winning variant

---

## Common Failure Modes

**Changing multiple variables in one test** — Produces an uninterpretable result. Identify which variable drove the difference by isolating one change per test.

**Attribution window mismatch** — A 3-day attribution window on a product with a 14-day consideration cycle will undercount conversions. Align the window to the actual user decision timeline.

**Global control group overlap** — Users in the global control group are excluded from campaigns. If a test is run on a segment that partially overlaps with the control group, the effective test population is smaller than expected and results may be skewed.

**Peeking and stopping early** — Reading results mid-test and stopping when significance is first reached produces false positives. Commit to the pre-specified test window.

**Personalized Variant on small audiences** — The ML model requires sufficient historical signal to personalize effectively. For audiences under ~10,000 users, Winning Variant is more reliable.

---

## Additional Resources

### Reference Files

For topic-level detail, load from `references/`:

- **`multivariant-testing-overview.md`** — Core concepts and constraints
- **`create-multivariate-campaign.md`** — Dashboard setup steps
- **`multivariant-test-optimizations.md`** — Winning Variant vs. Personalized Variant
- **`ab-test-projection.md`** — Pre-send neural network scoring
- **`multivariate-analytics.md`** — Reading results after launch
- **`conversion-events.md`** — Attribution and event configuration
- **`conversion-correlation.md`** — Post-campaign attribute analysis
- **`random-bucket-numbers.md`** — Durable audience segmentation
- **`global-control-group.md`** — Platform-level holdout management
- **`testing-race-conditions.md`** — Timing threats to validity
```

`★ Insight ─────────────────────────────────────`
- The **failure modes section** is the highest-signal content in a skill like this — it captures exactly the non-obvious knowledge that an analyst would only learn by making expensive mistakes, making it the most valuable thing Claude can load that isn't in the official docs
- Structuring the workflow as phases (design → config → monitor → interpret) gives Claude a decision tree rather than a flat list — the model can map a user's question to a phase and immediately know which reference files are relevant
- Notice the skill never duplicates the topic file content — it only tells Claude *when* and *why* to load each reference, keeping SKILL.md lean while making the full knowledge graph navigable
`─────────────────────────────────────────────────`
