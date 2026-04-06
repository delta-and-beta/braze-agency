---
name: engineer-feature-flags
description: >-
  Creating, configuring, and managing feature flags including canvas integration
  and troubleshooting.
metadata:
  role: braze-engineer
  topics:
    - engagement-tools-feature-flags
    - feature-flags-create
    - feature-flags-canvas
    - feature-flags-faq
    - feature-flags-experiments
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill advocates for **CSO (Claude Search Optimization)**: rich keyword coverage, concrete triggering conditions, and concise overview so Claude finds the skill and uses it correctly.
- Since several topic sources were minimal or placeholder-only, a good skill file should acknowledge scope boundaries and orient Claude toward what IS known vs. what requires checking source docs.
`─────────────────────────────────────────────────`

Here is the generated skill markdown body:

---

# Feature Flag Implementation

## Overview

This skill covers the full lifecycle of Braze Feature Flags: creating and configuring flags, setting up Canvas Feature Flag steps, running experiments with flag variants, and troubleshooting common issues. Use this skill when implementing feature rollouts, A/B testing via flags, or integrating feature flags into Canvas journeys.

**Lens:** Technical implementation and lifecycle management — emphasis on SDK integration, Canvas orchestration, and experiment configuration over marketing strategy.

## When to Use

- Implementing a new feature flag in a mobile or web application
- Connecting a feature flag to a Canvas step or experiment
- Configuring flag properties, rollout percentages, or user targeting
- Troubleshooting a flag that isn't resolving or activating as expected
- Running a Feature Flag Experiment to measure impact
- Auditing SDK version compatibility before enabling flag features

## Topics Synthesized

| Topic | Description |
|-------|-------------|
| **Feature Flags Overview** | Platform support matrix, minimum SDK versions, flag anatomy |
| **Creating Feature Flags** | Dashboard creation flow, flag properties, rollout configuration |
| **Feature Flags in Canvas** | Canvas Feature Flag step setup, targeting within journeys |
| **Feature Flag Experiments** | Experiment configuration, variant assignment, analysis |
| **Feature Flags FAQ** | Common questions on flag behavior, caching, SDK evaluation |

## Platform Support

Feature flags require minimum SDK versions:

| Platform | Minimum Version |
|----------|----------------|
| Swift (iOS) | 5.9.0 |
| Android | 24.2.0 |
| Web | 4.x |

Always verify the target app's SDK version before implementing flag-gated features. Flags will silently no-op on unsupported SDK versions.

## Core Concepts

### Flag Lifecycle

```
Create flag (dashboard) → Configure properties + rollout % → SDK evaluates flag at runtime
       ↓
  Canvas step (optional) → Experiment (optional) → Archive/disable
```

### Flag Evaluation Model

Flags are evaluated client-side by the SDK using the user's profile and targeting rules resolved at session start. Key implications:
- Flag state is **not** real-time: it reflects the user's profile at the time of session refresh
- Changes to rollout percentages or targeting take effect on next SDK refresh
- Use `logFeatureFlagImpression()` to track when a flag is surfaced to a user

## Implementation Notes

### Creating a Flag

Create flags from the Braze dashboard under **Feature Flags**. Each flag requires:
- A unique **flag ID** (used in SDK calls)
- Optional **properties** (typed key-value pairs: string, boolean, number, JSON)
- A **rollout percentage** (0–100%)

Reference the flag ID in SDK calls — keep it stable; renaming requires coordinated SDK + dashboard updates.

### Canvas Integration

The Canvas **Feature Flag step** assigns users to a flag variant as part of a journey. This enables:
- Staged rollouts driven by Canvas entry conditions
- Combining flag exposure with messaging (e.g., email + flag together)
- Controlled exit from Canvas based on flag variant

> **Note:** Source documentation for Canvas Feature Flag steps was limited. Verify current step configuration options in the Braze dashboard or official docs.

### Experiments

Feature Flag Experiments allow A/B testing flag variants to measure downstream impact on conversion or engagement metrics. Configure experiment groups (control vs. variant) and connect to a Braze metric for analysis.

> **Note:** Experiment source documentation was template-only (Liquid includes, not rendered content). Check the Braze Feature Flag Experiments documentation for current configuration steps.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using flag before SDK initialization completes | Await SDK ready state before calling `getFeatureFlag()` |
| Expecting real-time flag updates | Flags refresh on session start; call `refreshFeatureFlags()` to force update |
| Hardcoding flag ID strings in multiple places | Define flag IDs as constants to avoid typo drift |
| Not logging impressions | Call `logFeatureFlagImpression(flagId)` whenever a flag affects UI |
| Deploying flag without verifying SDK version | Check platform SDK version against the support matrix above |

## Scope Boundaries

This skill covers **Braze-managed feature flags** only. It does not cover:
- Third-party feature flag platforms (LaunchDarkly, Statsig, etc.)
- Server-side flag evaluation outside the Braze SDK
- Custom targeting attribute configuration (see the Segmentation skill)

---

`★ Insight ─────────────────────────────────────`
- The skill deliberately surfaces **scope boundaries** — what it does NOT cover — so Claude doesn't over-reach into adjacent domains (segmentation, third-party tools) when routing queries.
- The "Common Mistakes" table follows the writing-skills pattern of pairing mistake + fix, which is more actionable than a narrative warning section.
`─────────────────────────────────────────────────`
