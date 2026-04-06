---
name: architect-canvas-components
description: >-
  Design and orchestration of Canvas step types including message, delay,
  decision split, audience paths, experiments, and AI agent steps.
metadata:
  role: braze-architect
  topics:
    - canvas-canvas-components
    - canvas-components-message-step
    - canvas-components-delay-step
    - canvas-components-decision-split
    - canvas-components-action-paths
    - canvas-components-audience-paths
    - canvas-components-user-update
    - canvas-components-experiment-step
    - canvas-components-experiment-winning-path
    - canvas-components-experiment-personalized-paths
    - canvas-components-feature-flags
    - canvas-components-context
    - canvas-components-content-optimizer-step
    - canvas-components-agent-step
    - canvas-components-audience-sync
    - canvas-create-a-canvas-rate-limiting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill emphasizes CSO (Claude Search Optimization) — the skill body should use symptom-rich language so Claude can match it to architect-level Canvas questions
- Structuring by "decision type" (branching vs. timing vs. testing vs. AI) mirrors how architects actually reason about Canvas flows, making the skill more useful than a flat component list
- The lens ("how to design and compose") means this skill should answer *why* to combine components, not just *what* each component does
`─────────────────────────────────────────────────`

Here is the generated skill markdown:

---

# Canvas Component Architecture

## Overview

This skill covers the design and orchestration of Canvas step types for the **braze:architect** role. It provides the lens for making principled decisions about how to compose Canvas components — message, delay, decision split, audience paths, experiments, AI agent steps, and more — into flows that serve user journey goals.

Use this skill when:
- Designing a multi-step Canvas flow from scratch and choosing which step types to use
- Evaluating tradeoffs between branching strategies (Decision Split vs. Audience Paths vs. Action Paths)
- Deciding where to introduce experimentation (Experiment Paths, Winning Path, Personalized Paths)
- Incorporating AI-powered steps (Agent step, Content Optimizer) into an existing flow
- Optimizing a Canvas for performance, testability, or rate limiting compliance
- Advising on component sequencing to reduce latency or message fatigue

## Lens: Composing Components for Optimal User Journeys

The architect's lens is not "what does each step do" but **"which component best serves the user at this moment in the journey."** Every Canvas is a state machine. Each component type carries a different tradeoff profile across four axes:

| Axis | Questions to ask |
|------|-----------------|
| **Decisioning** | Should this branch on behavior, attributes, or experiment assignment? |
| **Timing** | Is the delay absolute, relative, or event-triggered? |
| **Personalization** | Is content static, variant-tested, AI-generated, or contextually variable? |
| **Measurement** | What conversion event or path metric will validate this step? |

## Component Reference Map

### Routing and Branching

| Component | Best used when |
|-----------|---------------|
| **Decision Split** | Binary branch on a real-time attribute or event (push-enabled, segment membership, custom attribute) |
| **Audience Paths** | Priority-ranked segmentation into 2+ groups; replaces stacked Decision Splits |
| **Action Paths** | Sorting users by a specific action they take after entering a step (event-triggered routing) |

**Design rule:** Prefer Audience Paths over chained Decision Splits when sorting 3+ user cohorts. Audience Paths evaluate in declared priority order, which makes the routing logic auditable. Use Action Paths when the branch condition is a future event, not a present state.

### Timing and Pacing

| Component | Best used when |
|-----------|---------------|
| **Delay** | Adding a gap between steps; supports specific dates, days-of-week, and custom event timing |

Delays are invisible to users but critical for message cadence. Use them to enforce quiet hours, respect rate limits, or create anticipation windows before a conversion message.

### Messaging

| Component | Best used when |
|-----------|---------------|
| **Message** | Standalone send (push, email, SMS, in-app, content card, webhook) at a single Canvas node |

Message steps are the primary delivery mechanism. Keep each Message step focused on a single channel and a single intent. Do not stack multiple conversion messages in a single Message step.

### Experimentation

| Component | Best used when |
|-----------|---------------|
| **Experiment Paths** | A/B or multivariate test of paths, variants, or timing across the full journey |
| **Winning Path** | Auto-routing all remaining users to the statistically best path after a test window |
| **Personalized Paths** | Per-user ML-based path assignment based on predicted conversion likelihood |
| **Content Optimizer** | Experimenting with content variations (copy, images) within a single Message step |

**Design rule:** Use Experiment Paths for structural journey tests (does adding a delay increase conversion?). Use Content Optimizer for copy-level tests within a confirmed path structure. Enable Winning Path when the experiment has a clear primary metric and you want automated winner promotion.

### Personalization and State

| Component | Best used when |
|-----------|---------------|
| **Context** | Creating or updating Canvas-scoped variables that carry state across steps (e.g., discount tier, seasonal flag) |
| **User Update** | Writing attributes, events, or purchases back to a user profile within the Canvas flow |
| **Feature Flags** | Segmenting by flag state or using Canvas to roll out features to specific audience cohorts |

Context steps enable stateful Canvases without requiring custom attribute writes; prefer Context over User Update when the data is only needed within the Canvas. Use User Update when downstream systems or other Canvases need to read the value.

### AI and Intelligent Steps

| Component | Best used when |
|-----------|---------------|
| **Agent step** | Adding AI-powered decisioning, content generation, or dynamic routing based on LLM reasoning |
| **Content Optimizer** | Automated multi-variant content testing with AI-assisted winner selection |

Agent steps are the most powerful and least predictable component type. Place them upstream of message steps to generate content, or at branch points to make decisioning calls. Always pair an Agent step with a fallback path for failure or timeout conditions.

### Audience and Sync

| Component | Best used when |
|-----------|---------------|
| **Audience Paths** | Filtering into priority-ranked cohorts before downstream messaging |
| **Audience Sync** | Exporting users to ad platforms (Meta, Google, TikTok) as they move through a Canvas |

## Composition Patterns

### Pattern: Qualify → Personalize → Deliver

```
Entry → Audience Paths (qualification)
          ├── High-value → Context (set discount) → Message
          ├── Mid-tier   → Delay → Message
          └── Everyone else → Exit
```

Use when: You have distinct cohorts with meaningfully different messages. Audience Paths at the top avoids wasting sends on unqualified users.

### Pattern: Trigger → Wait → Convert

```
Entry (event trigger) → Delay (timing window) → Action Paths
                                                   ├── Converted → Exit
                                                   └── Not converted → Message → Exit
```

Use when: The goal is conversion after a specific user action. Action Paths evaluate whether conversion happened during the wait; the Message step only fires for non-converters.

### Pattern: Experiment → Automate

```
Entry → Experiment Paths (with Winning Path enabled)
          ├── Path A (aggressive cadence)
          ├── Path B (conservative cadence)
          └── Control
```

Use when: You want to test and then stop managing the experiment manually. Winning Path promotes the winner automatically after the stats window closes.

### Pattern: AI-Augmented Delivery

```
Entry → Context (load variables) → Agent step (generate content / make decision)
       → Decision Split (agent output branch)
          ├── High intent → Message (personalized)
          └── Low intent  → Delay → Message (re-engagement)
```

Use when: Message content or routing should vary based on reasoning about user state that can't be expressed as a simple attribute condition.

## Rate Limiting Considerations

Rate limiting in Canvas applies at the Canvas level and can intersect with global rate limits set at the workspace level. When composing high-volume Canvases:

- Add **Delay steps** before high-frequency Message steps to distribute sends
- Use **Audience Paths** to reduce total eligible recipients before reaching a Message step
- Be aware that experiment path splits do not bypass rate limits — each variant path counts toward the total

## Topics Synthesized

This skill draws on the following reference topics:

- **Message Step** — standalone message delivery mechanics and channel options
- **Delay Step** — timing controls, relative/absolute delay modes
- **Decision Split Step** — real-time binary branching on attributes and events
- **Audience Paths Step** — priority-ranked multi-cohort segmentation
- **Action Paths Step** — post-entry event-triggered routing
- **Experiment Step** — A/B and multivariate path testing
- **Experiment Winning Path** — automated winner promotion
- **Experiment Personalized Paths** — ML-based per-user path assignment
- **Content Optimizer Step** — in-step content variant testing
- **Agent Step** — AI-powered decisioning and content generation
- **Context Step** — Canvas-scoped variable management
- **User Update Step** — in-flow profile attribute writes
- **Feature Flags Step** — flag-based audience segmentation in Canvas
- **Audience Sync Step** — ad platform export during journey
- **Canvas Rate Limiting** — send volume controls and their Canvas interaction

## Common Design Mistakes

| Mistake | Correction |
|---------|-----------|
| Chaining 3+ Decision Splits for cohort routing | Replace with a single Audience Paths step |
| Using User Update to store Canvas-only state | Use Context step; reserve User Update for data other systems need |
| Placing Experiment Paths late in a long Canvas | Move experiments upstream — downstream placement reduces sample size and extends test duration |
| No fallback after an Agent step | Always add a Decision Split or fallback path for Agent step failures |
| Rate-limiting ignored in high-volume Canvases | Add Delay steps before Message steps in flows with millions of eligible users |
| Mixing structural and copy-level tests in one Experiment | Use Experiment Paths for structure, Content Optimizer for copy |
