---
name: strategist-feature-flags
description: >-
  Feature flag management, experiment design, and canvas integration for
  controlled rollouts.
metadata:
  role: braze-strategist
  topics:
    - feature-flags-create
    - feature-flags-experiments
    - feature-flags-canvas
    - feature-flags-faq
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick plugin skills (like this one) differ from personal Claude Code skills — they're domain knowledge guides for an agent *persona*, not process-enforcement docs. The "lens" shapes HOW the agent frames knowledge, not just what it knows.
- When source docs are minimal/unavailable (as several topics here are), a well-written skill must compensate by synthesizing principles rather than regurgitating references — making the lens do more work.
- The `braze-strategist` role implies business impact framing: controlled rollouts are about risk mitigation and learning velocity, not just technical flag management.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# Feature Flags & Experimentation

## Skill Overview

This skill equips the `braze-strategist` agent with expertise in **feature flag management, experiment design, and Canvas-integrated experimentation** within the Braze platform.

The guiding lens is a **product strategy perspective**: feature flags are not merely technical on/off switches — they are instruments for managing rollout risk, validating hypotheses, and accelerating data-driven decisions. Every flag is an experiment. Every rollout is a learning opportunity.

Use this skill when:
- Designing controlled rollouts of new messaging features or Canvas journeys
- Setting up or interpreting feature flag experiments in Braze
- Integrating feature flags into Canvas flows for A/B or multivariate testing
- Answering questions about experimentation best practices, flag lifecycle management, or statistical validity
- Advising on when to graduate a flag to full rollout vs. continue testing

---

## Topics Synthesized

This skill draws from four topic areas:

| Topic | Coverage |
|-------|----------|
| **Creating Feature Flags** | Flag creation workflow, property types, targeting rules, environments |
| **Feature Flags in Canvas** | Integrating flags as Canvas steps, cohort targeting, branching by flag state |
| **Feature Flag Experiments** | Experiment setup, variant assignment, impression tracking, results analysis |
| **Feature Flags FAQ** | Common edge cases, troubleshooting, lifecycle questions |

> **Note:** Source documentation for several topics was sparse at assembly time. This skill synthesizes from available content and general Braze experimentation principles. Always verify specific UI steps against current Braze documentation.

---

## The Product Strategy Lens

When applying this skill, reason from **outcomes first, mechanics second**:

**1. Flags exist to reduce rollout risk**
A feature flag decouples deployment from release. The strategist's job is to help teams ship code safely and validate impact before full exposure. Frame flags in terms of: *what risk are we mitigating, and what signal will tell us we're ready to proceed?*

**2. Experiments require a clear success metric before launch**
An experiment without a pre-defined primary metric is not an experiment — it's a fishing expedition. Push for specificity: conversion rate, open rate delta, revenue per user, churn reduction. Avoid "we'll look at everything."

**3. Canvas integration multiplies experimentation surface**
Feature flags inside Canvas enable multi-step journey experiments, not just single-message tests. A flag can gate an entire journey branch, enabling product and lifecycle teams to test fundamentally different user experiences end-to-end.

**4. Flag graduation is a business decision, not a technical one**
When an experiment concludes, the decision to graduate (enable for all) or kill (remove) the flag should be driven by statistical confidence AND business context — seasonality, competing initiatives, customer segment implications.

---

## Creating Feature Flags

Feature flags in Braze are created at the workspace level and can be referenced across campaigns and Canvas.

**Key decisions when creating a flag:**
- **Flag ID**: Immutable after creation. Choose a clear, namespaced identifier (e.g., `checkout_flow_v2`, `onboarding_redesign_beta`).
- **Properties**: Flags can carry typed properties (string, boolean, number, JSON) passed to your app at evaluation time. Define these upfront — they shape what your app code can vary.
- **Rollout percentage**: Start conservative (1–5%) for high-risk changes; wider for low-risk cosmetic experiments.
- **Targeting**: Flags can target by segment, enabling you to restrict exposure to specific user cohorts before broad rollout.

**Lifecycle stages to plan for:**
1. Off (no users) → Canary (internal/QA) → Limited rollout → Broad rollout → Full (100%) → Graduated (flag removed from code)

---

## Feature Flags in Canvas

Canvas integration allows feature flags to act as **journey-level experiment gates** rather than just code-level switches.

**Pattern: Flag-gated Canvas branch**
- Use a Feature Flag step in Canvas to split users based on flag assignment
- Users in the flag's enabled cohort follow one branch; others follow the control
- Enables testing entirely different message sequences, timing, and channel mixes

**Strategic considerations:**
- Ensure your Canvas experiment has sufficient volume before reading results — underpowered experiments produce misleading signals
- Flag state evaluated at Canvas entry is fixed for that user's journey; mid-journey flag changes don't retroactively re-route users
- Use Canvas analytics in conjunction with flag experiment results for a complete picture

---

## Feature Flag Experiments

Braze feature flag experiments assign users to flag variants and track impressions + downstream conversion events.

**Experiment design checklist (product strategy view):**
- [ ] Primary success metric defined before launch
- [ ] Minimum detectable effect estimated (what delta would be meaningful to act on?)
- [ ] Sample size / duration planned (avoid peeking and stopping early)
- [ ] Guard rail metrics identified (what would cause early termination — e.g., crash rate spike)
- [ ] Holdout group considered if testing new behavior against established baseline

**Reading results:**
- Statistical significance does not equal practical significance — a 0.1% lift at p<0.05 may not justify the engineering cost of maintaining the variant
- Segment results by user cohort when an overall result is flat — the aggregate can mask strong positive/negative effects in subgroups

---

## Common Questions & Edge Cases

**Q: Can the same user be in multiple flag experiments?**
Flags are evaluated independently. A user can be enrolled in multiple experiments simultaneously, which can cause interaction effects. Design experiments to be orthogonal when possible.

**Q: What happens to in-flight Canvas users when a flag rollout percentage changes?**
Users already in a Canvas journey retain their flag state at entry. New entrants receive the updated assignment. Monitor both cohorts separately during transitions.

**Q: When should we use a feature flag vs. a standard Canvas A/B test?**
Use feature flags when: the variation lives in app code (not just message content), you need persistent assignment across sessions, or you want to decouple the experiment from a specific send. Use Canvas A/B when: the variation is purely in messaging content/timing and you don't need SDK-level flag evaluation.

**Q: How do we handle flag cleanup after graduation?**
Flag graduation is a code change, not just a Braze config change. Coordinate with engineering to remove the flag evaluation from app code. Leaving dead flags in code creates technical debt and confusion about what's "really" on.

---

## When NOT to Use This Skill

- **High-volume transactional messaging** that needs no experimentation (use standard send best practices instead)
- **Pure content A/B tests** with no app-code variation (Canvas native A/B testing is simpler)
- **Real-time personalization** driven by user attributes (use Connected Content or Liquid logic instead of flags)
