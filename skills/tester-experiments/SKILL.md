---
name: tester-experiments
description: >-
  Designing and running experiments including feature flag experiments and
  engagement testing workflows.
metadata:
  role: braze-tester
  topics:
    - engagement-tools-testing
    - feature-flags-experiments
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development guide enforces **progressive disclosure**: SKILL.md should be lean (~1,500–2,000 words) with detailed content in `references/`. Since the user asked for just the markdown body (no frontmatter, no file structure), I'll write the full SKILL.md body targeting that range — using imperative form throughout, as required.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Experimentation & A/B Testing

## Purpose

This skill covers the design, execution, and analysis of experiments within Braze — including feature flag experiments and engagement testing workflows. Apply this skill when determining whether a new messaging strategy, content variant, or feature release produces a statistically meaningful improvement in user behavior.

The guiding lens is **statistical rigor and experiment design**: every experiment should be set up to produce trustworthy, actionable conclusions. Avoid running tests that cannot answer the question they purport to ask.

---

## When to Apply This Skill

Use this skill when:

- Designing a controlled experiment to compare message variants, channels, or content
- Configuring a feature flag experiment to gate a new capability to a subset of users
- Interpreting experiment results and deciding whether to ship, iterate, or abandon
- Selecting user segments or assigning users to control and treatment cohorts
- Evaluating statistical significance and practical significance of an outcome

---

## Core Concepts

### Random Bucket Numbers

Every Braze user profile is assigned a **random bucket number between 0 and 9999** (inclusive) at the time the profile is created. Key properties:

- If a user is deleted and re-created, they receive a **new, different** bucket number.
- Bucket numbers are permanently attached to the profile for its lifetime.
- Distribution is uniform — each bucket value is equally probable across the user base.

Bucket numbers are the foundation of engagement testing in Braze. They enable deterministic, reproducible cohort assignment without requiring a separate random number draw at experiment time.

**To assign users to experiment arms using bucket numbers:**

1. Define the total bucket range (0–9999 = 100% of users).
2. Divide the range into contiguous slices — one per experiment arm.
   - Example: Control = 0–4999 (50%), Treatment = 5000–9999 (50%)
   - Example: Control = 0–1999, Variant A = 2000–3999, Variant B = 4000–5999 (20% each)
3. Use a Braze segment filter on the `random_bucket_number` attribute to select each slice.
4. Apply those segments as entry criteria or audience filters in the campaign or Canvas.

**Critical design consideration:** Bucket-based assignment is static — users do not re-randomize between campaigns. A user in the control bucket for one experiment is in the control bucket for all bucket-based experiments simultaneously. Design experiment arms carefully to avoid **cross-experiment contamination** when running multiple tests at once.

---

### Feature Flag Experiments

Feature flags in Braze allow gradual or selective rollout of product changes. Feature flag **experiments** extend this by attaching a formal A/B testing framework to the rollout decision.

**To design a feature flag experiment:**

1. Define the feature flag and its variants (typically: flag on vs. flag off, but can be multi-variant).
2. Identify the **primary metric** — the single measurable outcome that determines success or failure.
3. Set the **rollout percentage** — what proportion of eligible users sees the flag-on variant.
4. Specify the experiment duration before any result is read (pre-registration prevents p-hacking).
5. Ensure the control group receives the flag-off experience with no other differences.

**Common mistakes to avoid:**

- Peeking at results before the planned end date and stopping early when significance is reached — this inflates Type I error rates.
- Changing the rollout percentage mid-experiment without resetting the analysis window.
- Using engagement metrics as secondary proxies when the primary metric is undefined — this creates ambiguity in the shipping decision.

---

## Statistical Rigor in Experiment Design

### Sample Size and Power

Before launching, calculate the **minimum detectable effect (MDE)** and required sample size:

- Determine the baseline metric value (e.g., open rate = 22%).
- Choose a practically significant lift threshold (e.g., +2 percentage points = 9% relative improvement).
- Set significance level α (typically 0.05) and power 1−β (typically 0.80).
- Use a sample size calculator to confirm the experiment can reach sufficient power within the planned duration.

Do not start an experiment if the user base or experiment window cannot support the required sample size — underpowered experiments produce inconclusive results that still incur the cost of user exposure.

### Control Group Integrity

Maintain control group integrity throughout the experiment:

- Do not send control users through any other campaign or Canvas that touches the same message type during the experiment window.
- Do not apply promotional or re-engagement messages to either arm mid-flight unless they apply equally to both.
- Exclude users who become ineligible (e.g., opted out) from analysis rather than reassigning them.

### Metric Selection

Select metrics before running the experiment:

| Metric Type | Example | Guidance |
|---|---|---|
| Primary | Click-through rate | One metric only; drives ship/no-ship decision |
| Guardrail | Unsubscribe rate | Must not worsen; experiment fails if violated |
| Secondary | Conversion rate | Directional signal; not decision-making |

Avoid optimizing on secondary metrics if the primary metric is null — this is post-hoc metric switching and invalidates the experiment.

### Interpreting Results

When reading experiment results:

- A p-value < 0.05 means the result is **statistically significant**, not practically important.
- Report **effect size with confidence intervals**, not just significance — "Treatment improved CTR by 1.8pp (95% CI: +0.4pp to +3.2pp)" is more useful than "p = 0.03."
- A non-significant result is not proof of no effect — it means the experiment lacked sufficient evidence. Check whether the experiment was adequately powered before concluding equivalence.
- If multiple variants are tested simultaneously, apply a correction for multiple comparisons (e.g., Bonferroni correction: divide α by the number of comparisons).

---

## Engagement Testing Workflows

### Running a Bucket-Based A/B Test

1. Identify the user population to test (e.g., all active users in a specific locale).
2. Determine the bucket range split (50/50 for maximum power, or smaller treatment slices for low-risk rollouts).
3. Create Braze segments using the `random_bucket_number` filter.
4. Build the campaign or Canvas with the segment applied to each arm.
5. Lock the experiment duration — set an explicit end date before launching.
6. At end date, export results and compare primary metrics across arms.
7. Make a documented ship/no-ship/iterate decision and record it.

### Running a Feature Flag Experiment

1. Create the feature flag in the Braze dashboard and define variants.
2. Attach an experiment configuration: set rollout percentage, primary metric, and duration.
3. Confirm the SDK integration is correctly gating the feature behind the flag.
4. Launch the experiment and monitor only guardrail metrics during the run (avoid peeking at primary metrics).
5. At end date, read results once and make the ship decision.
6. If shipping: increase rollout to 100% and retire the flag from the codebase.
7. If not shipping: roll back to 0% and document findings for future iteration.

---

## Topics Synthesized by This Skill

This skill draws from two knowledge domains:

**Feature Flag Experiments** — covers the mechanics of gating product features behind flags, attaching experiment frameworks to rollout decisions, and managing flag lifecycle from experiment to full release.

**Engagement Testing (Random Bucket Numbers)** — covers Braze's built-in cohort assignment mechanism, how to construct experiment arms using bucket ranges, and the constraints that static bucket assignment places on concurrent experiment design.

---

## Checklist Before Launching Any Experiment

- [ ] Primary metric defined and agreed upon before launch
- [ ] Sample size calculation completed; experiment is adequately powered
- [ ] Experiment duration fixed; team committed to no early stopping
- [ ] Control and treatment arms isolated (no cross-contamination from other campaigns)
- [ ] Guardrail metrics identified
- [ ] Bucket range or rollout percentage documented
- [ ] Results analysis plan written (who reads results, when, using which statistical test)

---

*Apply statistical rigor at every step — the value of an experiment lies in the trustworthiness of its conclusion, not the speed of its execution.*

---

`★ Insight ─────────────────────────────────────`
- **Static bucket numbers create implicit experiment coupling**: because bucket assignments persist across campaigns, concurrent experiments using the same bucket ranges can contaminate each other. Explicitly designing non-overlapping ranges or using mutually exclusive entry segments is essential — something easy to miss if you treat bucket testing as independent draws.
- **The "one primary metric" rule prevents post-hoc rationalization**: requiring the primary metric to be declared before launch forces teams to decide what success means before they see results, which is the main defense against the "we found significance somewhere" failure mode.
`─────────────────────────────────────────────────`
