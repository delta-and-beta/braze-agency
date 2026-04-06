---
name: architect-decisioning
description: >-
  Designing and orchestrating decisioning studio agents, audiences, and launch
  workflows.
metadata:
  role: braze-architect
  topics:
    - decisioning-studio-get-started
    - decisioning-studio-design-agents
    - decisioning-studio-orchestration-setup
    - decisioning-studio-launch-agents
    - decisioning-studio-audience
    - decisioning-studio-faq
    - decisioning-studio-decisioning-studio-go
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes **CSO (Claude Search Optimization)** — structuring content so future Claude instances can *discover* and *load* the skill for the right task. For a role-scoped skill like `braze-architect`, the "when to use" framing matters: Claude already knows its role, so the skill should signal *which architectural tasks* it covers vs. what to delegate to simpler lookup.
`─────────────────────────────────────────────────`

# Decisioning Studio Architecture

## Overview

This skill guides architects designing, configuring, and orchestrating **BrazeAI Decisioning Studio™** systems. The lens is **system architecture and orchestration design for AI-driven decisioning** — covering the structural decisions that connect audiences, agents, and customer engagement platforms (CEPs) into a coherent, launch-ready system.

Use this skill when:
- Designing a new Decisioning Studio deployment or evaluating its fit for a use case
- Architecting the integration between Decisioning Studio and a CEP (Braze, SFMC, or other)
- Configuring decisioning agents: success metrics, dimensions, options, and treatment groups
- Structuring audience pipelines from CEP → Decisioning Studio → treatment assignment
- Planning and sequencing the agent launch workflow with the AI Decisioning Services team
- Reading or interpreting Decisioning Studio reports and insights post-launch
- Answering architectural questions about how decisioning agents automate optimization decisions

**Do not use this skill for:** General Braze campaign architecture not involving Decisioning Studio, or content channel implementation details (handled by engineer/consultant roles).

---

## Topics Synthesized

| Topic | Architectural Focus |
|-------|---------------------|
| **Getting Started** | Core concepts, design decision entry points |
| **Designing Decisioning Agents** | Agent configuration: metrics, dimensions, options |
| **Orchestration Setup** | CEP ↔ Decisioning Studio integration architecture |
| **Audience Configuration** | Audience pipeline: CEP definition → treatment group segmentation |
| **Launching Decisioning Agents** | Launch workflow sequencing and pre-flight review |
| **Reports & Insights** | Post-launch observability and prerequisites |
| **FAQ** | Core concept clarifications for architects and stakeholders |

---

## Core Architecture Model

Decisioning Studio sits **between** your audience and your CEP as an optimization layer:

```
CEP (Braze/SFMC) ──► Audience Definition
                              │
                              ▼
                    Decisioning Studio
                    ┌──────────────────┐
                    │  Decisioning     │
                    │  Agent           │
                    │  - Success Metric│
                    │  - Dimensions    │
                    │  - Options       │
                    └────────┬─────────┘
                             │ assigns treatment groups
                             ▼
                    CEP executes delivery
                    (what/when → how)
```

**Key architectural boundary:** Decisioning Studio owns *what* to send and *when*. The CEP owns *how* to deliver it. This separation is the primary integration design constraint.

---

## Decisioning Agent Design

A **decisioning agent** is a scoped BrazeAI configuration defined by three architectural elements:

| Element | Description | Design Consideration |
|---------|-------------|----------------------|
| **Success Metric** | The business goal being optimized (e.g., conversion rate, engagement) | Must be measurable in CEP reporting; drives all downstream optimization |
| **Dimensions** | Customer attributes or context signals the agent uses to personalize | Affects data availability requirements from CEP |
| **Options** | The set of experiences/variants the agent selects among | Maps to deliverables in the CEP; must exist before launch |

Multiple agents can target the same customer base with different goals. Design for metric independence to avoid optimization conflicts.

---

## Orchestration Architecture

Orchestration is the integration layer between Decisioning Studio and the CEP. Configuration requirements:

- **Supported CEPs:** Braze, Salesforce Marketing Cloud (SFMC), and others
- **Data flow:** CEP pushes audience membership → Decisioning Studio segments into treatment groups → CEP receives treatment assignments and executes
- **Provisioning:** Orchestration setup requires the **AI Decisioning Services team** — this is not self-serve

Architect for **bidirectional data contracts**: the CEP must be able to both send audience definitions *and* receive treatment assignments in a format Decisioning Studio expects.

---

## Audience Pipeline

Audiences are defined in the CEP, then handed off to Decisioning Studio for treatment assignment:

1. **Define audience in CEP** (Braze segments, SFMC lists, etc.)
2. **Send audience to Decisioning Studio** — Decisioning Studio receives the population
3. **Treatment group division** — Decisioning Studio splits customers into groups (control + treatment variants)
4. **Assignment returns to CEP** — CEP uses assignments to drive delivery

**Architectural implication:** Audience size and refresh cadence in the CEP directly affects Decisioning Studio's optimization cycle. Design audiences to align with the agent's optimization window.

---

## Launch Workflow

Launch is gated and sequenced — not self-serve. Steps after completing configuration with the AI Decisioning Services team:

1. **Review agent configuration** — verify success metric, dimensions, options, orchestration settings
2. **Confirm all settings are correct** — changes after launch may reset learning
3. **Coordinate with AI Decisioning Services team** — launch is executed with team involvement

**Pre-launch checklist (architectural):**
- CEP audience is defined and sending correctly
- All option variants exist and are deliverable in CEP
- Orchestration integration is tested end-to-end
- Success metric is trackable in reporting

---

## Observability & Reports

Post-launch reporting requires:
- Active **Braze + BrazeAI Decisioning Studio™** contract
- CSM enablement of Decisioning Studio on your account
- A **live Decisioning Studio agent** (reports are tied to active agents)

Reports surface optimization progress against the success metric and treatment group performance. Design your success metric to be reportable from day one — retroactive metric changes are architecturally costly.

---

## Common Architectural Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Treating Decisioning Studio as a campaign builder | Misaligned expectations; CEP integration fails | Keep the what/when vs. how boundary clear |
| Defining options in Decisioning Studio before variants exist in CEP | Launch blocked | Build CEP variants first, then configure agent options |
| Audience too small or refreshed too infrequently | Agent has insufficient data to optimize | Align audience size/cadence with optimization window |
| Changing agent configuration after launch | Resets learning period | Finalize configuration in pre-launch review |
| Skipping AI Decisioning Services team in orchestration setup | Integration won't function | Treat team involvement as a required dependency, not advisory |

---

## Quick Reference

- **Decisioning agent** = BrazeAI config targeting one business goal via metric + dimensions + options
- **CEP** = Customer Engagement Platform (Braze, SFMC, etc.) — handles delivery, not decisioning
- **Treatment groups** = Decisioning Studio's audience segmentation output, returned to CEP
- **Orchestration** = The integration layer; requires AI Decisioning Services team
- **Launch** = Gated workflow; configuration changes after launch reset optimization learning

`★ Insight ─────────────────────────────────────`
The two-layer hierarchy in this codebase (roles → skills → topic references) maps cleanly to how this skill is structured: the **role** (`braze-architect`) sets the lens, the **skill** synthesizes multiple topic files into actionable patterns, and the **topic references** hold the atomic details. This skill is the synthesis layer — it doesn't reproduce every detail from the 7 topic files, but connects them into an architectural mental model an architect agent can reason from.
`─────────────────────────────────────────────────`
