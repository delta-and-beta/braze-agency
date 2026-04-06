---
name: engineer-agents
description: 'Creating, deploying, and referencing Braze AI agents.'
metadata:
  role: braze-engineer
  topics:
    - agents-creating-agents
    - agents-deploying-agents
    - agents-reference
  keywords: []
  generator: nick
  version: 1.0.0
---
Using the `superpowers:writing-skills` skill to structure this output properly.

`★ Insight ─────────────────────────────────────`
Plugin skills differ from personal Claude Code skills in one key way: they're loaded into a **domain-specific agent context**, so the "When to Use" framing should address the *role's* use cases, not generic task types. The `braze-engineer` role narrows the audience significantly, making topic synthesis the primary value over broad discovery keywords.
`─────────────────────────────────────────────────`

# Braze Agent Development

## Overview

This skill covers the full lifecycle of Braze AI agents — from initial creation and configuration through Canvas deployment and production monitoring. It synthesizes knowledge across three topic areas into a single coherent lens: **agent lifecycle from creation through production deployment**.

Use this skill when your work involves building, configuring, or shipping Braze agents, whether for journey personalization, catalog enrichment, or real-time decisioning.

## Scope

This skill synthesizes three topic areas:

| Topic | What It Covers |
|-------|----------------|
| **Creating Braze Agents** | Agent configuration, model selection, prompt construction, input bindings, and testing in the Braze dashboard |
| **Deploying Braze Agents** | Canvas step integration for journey personalization; catalog field automation for batch value generation |
| **Braze Agents Reference** | API surface, property schemas, runtime behavior, error handling, and constraint reference |

## When to Use This Skill

Apply this skill when:

- Creating a new Braze agent from scratch (prompt design, variable binding, output mapping)
- Wiring a Braze agent into a Canvas journey as a personalization step
- Configuring an agent to populate catalog fields automatically
- Debugging agent output that is missing, malformed, or inconsistent in production
- Evaluating whether a use case is better served by a Canvas step agent vs. a catalog field agent
- Reviewing agent configuration before launch (model, temperature, token limits, fallback behavior)

Do not apply this skill for general Braze messaging, segmentation, or non-agent Canvas configuration — those fall under separate skills.

## The Agent Lifecycle Lens

This skill reads all three topics through a single perspective: **what happens to an agent from the moment it is created to the moment it is serving production traffic**.

That means prioritizing:

1. **Creation decisions that affect deployability** — prompt structure, input variable scope, output format constraints
2. **Deployment context awareness** — Canvas agents operate in real-time per-user context; catalog agents operate in batch with different latency and consistency guarantees
3. **Production readiness** — fallback values, rate limits, monitoring hooks, and rollback paths are part of the lifecycle, not afterthoughts

When two approaches are equivalent at creation time, prefer the one that is safer to deploy and easier to roll back.

## Quick Reference

```
Canvas step agent     → real-time, per-user, journey-scoped
Catalog field agent   → batch, row-scoped, async generation
```

**Lifecycle stages:**
1. Design prompt + bind inputs
2. Test in sandbox / preview
3. Deploy to Canvas step or catalog field
4. Monitor output quality + latency
5. Iterate or roll back

## Common Mistakes

- **Treating Canvas and catalog agents as interchangeable** — they have different execution models, latency profiles, and failure modes
- **Skipping fallback configuration** — agents can fail silently in production without explicit fallback values defined
- **Binding too many input variables** — increases prompt complexity and token cost; prefer narrowly scoped inputs
- **Testing only in isolation** — Canvas agents behave differently in a live journey where upstream steps affect available context

`★ Insight ─────────────────────────────────────`
The two-context split (Canvas vs. catalog) is the key architectural decision in Braze agent work. Canvas agents are synchronous and user-scoped; catalog agents are asynchronous and row-scoped. Skills that bridge both contexts are rare — most implementation questions fall clearly into one camp. Structuring this skill around the lifecycle rather than the two contexts keeps the guidance unified while still making the deployment divergence explicit at the point where it matters.
`─────────────────────────────────────────────────`
