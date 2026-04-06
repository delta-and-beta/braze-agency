---
name: tester-experimentation
description: >-
  Designs and manages experiments using A/B testing platforms for campaign
  optimization and feature validation.
metadata:
  role: braze-tester
  topics:
    - ab-testing-vwo
    - ab-testing-optimizely
    - ab-testing-kameleoon
    - ab-testing-eppo
    - data-and-analytics-ab-testing
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill teaches TDD-for-documentation: write pressure scenarios, observe failures, then write the skill. For a domain reference skill like this one, the focus shifts to **retrieval quality** — does Claude find and correctly apply the right platform's API patterns? Keyword coverage (platform names, error terms, workflow stages) is the CSO mechanism that determines discoverability.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# A/B Testing & Experimentation

## Overview

This skill covers experiment design, execution, and analysis across major A/B testing platforms — **VWO**, **Optimizely**, **Kameleoon**, and **Eppo** — applied through the lens of campaign optimization and feature validation for a marketing/product experimentation workflow.

Core principle: Every test decision flows through four concerns — **experiment design** (what are we testing and why?), **statistical significance** (are results trustworthy?), **variant allocation** (how do we assign users fairly?), and **test-to-production workflow** (when and how do we ship the winner?).

---

## When to Use This Skill

Use when:
- Designing a new A/B test or multivariate experiment for a campaign or feature
- Choosing between platforms (VWO vs Optimizely vs Kameleoon vs Eppo) based on use case
- Evaluating whether test results have reached statistical significance before acting
- Setting up variant allocation, traffic splits, or feature flags
- Deciding when to graduate a winning variant from experiment to full rollout
- Debugging unexpected traffic splits, flaky results, or sample ratio mismatches

Do **not** use when:
- The question is purely about Braze messaging content or delivery (use the messaging skill)
- The experiment is a qualitative user research study with no quantitative split

---

## Platform Reference

### VWO — Conversion Rate Optimization Focus

**Strengths:** Visual editor, heatmaps, revenue impact tracking, WYSIWYG for non-technical users
**Best for:** Landing page and UI experiments, campaign CRO, behavioral analytics integration

Key workflow:
1. Create campaign → define goal (click, conversion, revenue)
2. Set traffic allocation and variant weights
3. Monitor via VWO dashboard for Bayesian or frequentist significance
4. Archive or deploy winner via VWO or push to CMS/CDP

Statistical model: Bayesian by default (SmartStats); frequentist available

---

### Optimizely — Feature Flag and Full-Stack Experimentation

**Strengths:** Full-stack feature flags, server-side experiments, rollout percentage control, SDK integrations
**Best for:** Feature validation gated behind flags, product experiments at the application layer

Key workflow:
1. Create experiment → define feature flag key and variation variables
2. Assign audience via attributes (user ID, plan, geo, custom)
3. Deploy SDK decision call in application code
4. Analyze results in Optimizely Stats Engine (sequential testing)

Statistical model: Sequential testing (always-valid p-values); controls for peeking

---

### Kameleoon — Personalization + Experimentation Unified

**Strengths:** AI-powered personalization alongside A/B tests, unified experimentation + feature management, GDPR tooling
**Best for:** When personalization and experimentation share the same audience segments; privacy-sensitive markets

Key workflow:
1. Create experiment or feature flag in Kameleoon platform
2. Define goal (conversion, custom event) and simulation/live mode
3. Use JavaScript or server-side SDK for assignment
4. Kameleoon's engine reports Frequentist significance with multiple test corrections

Statistical model: Frequentist with Bonferroni correction for multiple variants

---

### Eppo — Warehouse-Native Statistical Testing

**Strengths:** Connects directly to data warehouse (Snowflake, BigQuery, Databricks), CUPED variance reduction, experiment monitoring with guardrail metrics
**Best for:** Data teams running rigorous experiments on warehouse event data; teams needing CUPED, sequential testing, and metric pipelines

Key workflow:
1. Define metrics and assignment source in Eppo (warehouse tables as source of truth)
2. Connect assignment logs from your application
3. Eppo computes experiment results on a schedule against the warehouse
4. Review with CUPED-adjusted estimates and guardrail metric alerts

Statistical model: CUPED-adjusted frequentist; sequential testing with guardrails

---

## Core Concepts by Lens

### Experiment Design

| Decision | Guidance |
|---|---|
| Minimum detectable effect (MDE) | Set before running — determines required sample size |
| Sample size calculation | Use platform calculators or `n = (z_α + z_β)² × 2σ² / δ²` |
| Single vs multivariate | A/B for focused hypothesis; MVT for interaction effects (requires 5–10× traffic) |
| Novelty effect | Run tests ≥ 1–2 full business cycles before concluding |

### Statistical Significance

| Term | Meaning |
|---|---|
| p-value | Probability of observed effect under null hypothesis; threshold typically 0.05 |
| Confidence interval | Range within which true effect falls at stated confidence level |
| Peeking problem | Stopping early on significance inflates false positive rate — use sequential testing (Optimizely, Eppo) to mitigate |
| Sample ratio mismatch (SRM) | Observed traffic split deviates significantly from configured split — indicates instrumentation bug, not real effect |
| CUPED | Variance reduction using pre-experiment covariate; reduces required sample size (Eppo) |

### Variant Allocation

- **Sticky bucketing:** Users assigned once and see same variant on return — required for UX consistency
- **Mutual exclusion:** Experiments that share the same page/feature should use exclusion groups to prevent interaction effects
- **Holdout groups:** Reserve a small % permanently in control to measure long-term cumulative effect
- **Ramp strategy:** Start at 10%, verify SRM and guardrails, then ramp to full allocation

### Test-to-Production Workflow

```
Design → Instrument → QA (both variants) → Launch (small ramp)
  → Monitor SRM + guardrails → Reach significance
  → Stakeholder review → Ship winner as default → Archive experiment
```

Red flags that pause shipping:
- SRM detected
- Guardrail metric degraded (e.g., latency up, error rate up)
- Novelty effect not ruled out (< 1 business cycle)

---

## Quick Reference: Platform Selection

| Need | Platform |
|---|---|
| Visual editor, no-code CRO | VWO |
| Feature flags + server-side | Optimizely |
| Personalization + A/B unified | Kameleoon |
| Warehouse-native, CUPED, data team | Eppo |
| Bayesian reporting preferred | VWO (SmartStats) |
| Sequential / always-valid p-values | Optimizely or Eppo |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Stopping test on first significant result (peeking) | Use sequential testing or fix a pre-registered end date |
| Under-powered test (too little traffic, too short runtime) | Calculate MDE and sample size before launching |
| Ignoring SRM | Always check split ratio in actuals vs config on day 1 |
| Running mutually dependent experiments without exclusion groups | Use exclusion layers in VWO/Optimizely/Kameleoon |
| Treating Bayesian "probability to be best" as a p-value | They are not equivalent — understand the platform's model |
| Shipping before a full business cycle completes | Novelty effects inflate early conversion rates |

---

## Topics Synthesized

This skill draws on:
- **VWO A/B Testing Platform** — SmartStats, visual editor, campaign goals, traffic allocation
- **Optimizely Experimentation Platform** — Feature flags, full-stack SDK, Stats Engine sequential testing
- **Kameleoon Feature Experimentation** — AI personalization, GDPR tooling, Frequentist + Bonferroni
- **Eppo Statistical Testing Platform** — Warehouse-native experiments, CUPED, guardrail metrics, assignment logs
- **A/B Testing Category Overview** — Cross-platform experiment design principles and statistical foundations
