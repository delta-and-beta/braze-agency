---
name: architect-message-orchestration
description: >-
  System design for email template tooling, CMS integration, A/B testing
  frameworks, and content delivery pipelines.
metadata:
  role: braze-architect
  topics:
    - message-orchestration-templates
    - message-orchestration-cms-dam
    - message-orchestration-ab-testing
    - message-orchestration-cms-dam-contentful
    - message-orchestration-ab-testing-jacquard
    - templates-taxi-for-email
    - templates-stripo
    - templates-stensul
    - templates-smartersends
    - templates-sageflo
    - templates-knak
    - templates-jasper
    - templates-iam-studio
    - templates-email-love
    - templates-dyspatch
    - templates-denada
    - templates-blayer
    - templates-alpaco
    - templates-mailizio
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A skill file for a role-based plugin serves a different purpose than a skill for the writing-skills workflow — it's reference material (not discipline-enforcing), so the structure should prioritize quick-reference tables and synthesis over flowcharts. The lens concept here is crucial: it scopes HOW Claude applies this knowledge (architectural decision-making) vs just WHAT it knows.
`─────────────────────────────────────────────────`

# Message Orchestration Architecture

## Overview

This skill guides architectural decisions for email template tooling, CMS integration, A/B testing frameworks, and content delivery pipelines within Braze. Apply this skill when designing the end-to-end systems that move content from creation tools into Braze campaigns — covering partner selection, integration patterns, content governance, and experimentation infrastructure.

**Architectural lens:** Evaluate every integration through three filters — template architecture (how content is structured and versioned), content pipeline design (how content flows between systems), and testing framework integration (how experimentation is embedded in the delivery layer).

---

## When to Use This Skill

Use this skill when:

- Selecting or comparing email template partners for a Braze implementation
- Designing the integration between a CMS or DAM and Braze campaigns
- Architecting A/B testing infrastructure across content creation and delivery
- Evaluating build-vs-buy tradeoffs for content tooling in a Braze stack
- Designing governance, brand safety, or compliance controls into the content pipeline
- Defining the handoff contract between content creators and campaign operators

---

## Template Partner Landscape

The ecosystem covers a spectrum from no-code visual builders to AI-assisted creation. Understanding where each partner sits on this spectrum determines integration complexity and governance tradeoffs.

### Visual Drag-and-Drop Builders

Partners that generate responsive HTML without requiring code knowledge, syncing directly to Braze:

| Partner | Primary Strength | Braze Integration Pattern |
|---------|-----------------|--------------------------|
| **Taxi for Email** | Team collaboration, version control | Direct push to Braze templates |
| **Stripo** | Interactive elements, responsive design | HTML export + Braze import |
| **Dyspatch** | Collaborative editing, modular blocks | API-based template sync |
| **Knak** | Enterprise brand governance, no-code | Direct Braze campaign creation |
| **Alpaco** | Reusable brand-safe blocks | API sync to Braze |
| **Mailizio** | Reusable visual components | API-based template delivery |

### Distributed and Governance-First Builders

Partners designed for multi-team or multi-brand environments with strict compliance requirements:

| Partner | Primary Strength | Architectural Use Case |
|---------|-----------------|------------------------|
| **Stensul** | Mobile-responsive, on-brand at scale | Enterprise multi-brand pipelines |
| **Sageflo Radiate** | Local team empowerment with central guardrails | Distributed marketing orgs |
| **SmarterSends** | Personalization + brand/legal compliance | Regulated industry deployments |

### AI-Assisted and Specialized Builders

| Partner | Primary Strength | Architectural Use Case |
|---------|-----------------|------------------------|
| **Jasper** | AI-generated on-brand copy and content | Content velocity at scale |
| **Denada** | Conversational AI for subject matter experts | Non-marketer content creation |
| **IAM Studio** | No-code in-app message personalization | In-app experience design |
| **B.Layer** | Custom in-app messages without coding | Mobile CRM teams |
| **Email Love** | Figma-to-Braze email export | Design-led email workflows |

---

## Content Pipeline Architecture

### Template Lifecycle Pattern

```
Design Tool → Review/Approval → Template Store → Braze Campaign → Analytics Feedback
```

Key architectural decisions at each stage:

1. **Design Tool → Review**: Determines governance model (centralized approval vs distributed autonomy)
2. **Review → Template Store**: Determines version control strategy (versioned snapshots vs live sync)
3. **Template Store → Braze**: Determines integration pattern (API push, webhook, manual export)
4. **Campaign → Analytics**: Determines feedback loop for content performance

### Integration Patterns

**Direct API Sync** (Taxi, Alpaco, Mailizio, Stensul): Template changes push automatically to Braze. Best for high-velocity teams. Requires robust version control in the source tool.

**Export/Import** (Stripo, Email Love): Templates are exported as HTML and imported into Braze manually or via CI. Best when Braze is not the only downstream target.

**Event-Driven Sync** (Dyspatch): Webhooks trigger Braze updates when templates are published. Best for approval-workflow-heavy pipelines.

---

## CMS & DAM Integration

Headless CMS platforms (e.g., **Contentful**) decouple content authoring from delivery, enabling Braze to consume structured content at runtime rather than embedding it in templates.

### Architectural Considerations

| Concern | CMS-Integrated Approach | Template-Only Approach |
|---------|------------------------|------------------------|
| Content reuse | High — content blocks shared across channels | Low — content embedded per template |
| Personalization depth | High — structured fields drive Liquid logic | Medium — personalization in template editor |
| Operational complexity | Higher — two systems to maintain | Lower — single tool |
| Time-to-send | Longer — content fetch at runtime or pre-compile | Shorter — template ready to deploy |

**When to integrate a CMS:** When the same content body (articles, product descriptions, legal copy) must appear across email, in-app, and other channels — and must stay in sync without manual duplication.

**When to avoid CMS integration:** When content is campaign-specific, short-lived, or requires rapid iteration by non-technical marketers.

---

## A/B Testing Framework Design

### Testing Layers in the Content Pipeline

Effective experimentation requires decisions at multiple pipeline layers:

| Layer | What to Test | Tool |
|-------|-------------|------|
| **Subject line / copy** | Message language, tone, length | Braze native A/B + Jacquard |
| **Template structure** | Layout, CTA placement, image use | Braze Content Test |
| **Send-time optimization** | Delivery timing per user | Braze Intelligent Timing |
| **Content variant generation** | AI-generated copy alternatives | Jacquard |

### Jacquard Integration Pattern

Jacquard specializes in language optimization and AI-generated message variants. Architectural fit: upstream of Braze, generating statistically validated copy variants that are loaded into Braze A/B test cells. This separates language experimentation infrastructure from campaign execution infrastructure.

### Governance for Testing at Scale

- Define a **minimum sample size policy** before any test launches
- Establish **winning criteria** (primary KPI, statistical threshold) at design time, not after results arrive
- Version-control test variants alongside templates to enable reproducibility
- Archive losing variants — they carry signal for future content decisions

---

## Architectural Decision Framework

When evaluating tooling for this layer, apply the three-filter lens:

**Template Architecture Filter**
- Does the tool support modular, reusable content blocks?
- Can templates be versioned and rolled back?
- Does the tool enforce brand/design constraints programmatically?

**Content Pipeline Design Filter**
- What is the integration mechanism into Braze (API, webhook, manual)?
- What latency is introduced between content creation and campaign availability?
- How does the pipeline handle multi-brand or multi-locale variants?

**Testing Framework Integration Filter**
- Can variants be generated and tracked at the tool level, or only in Braze?
- Does the tool support structured metadata that maps to Braze test cells?
- How does experiment data flow back to inform future content decisions?

---

## Common Architecture Mistakes

| Mistake | Consequence | Corrective Pattern |
|---------|-------------|-------------------|
| Treating template tools as point solutions | Content sprawl, no single source of truth | Define a canonical template store early |
| Skipping version control in design tools | Inability to audit or roll back campaigns | Require versioning as a procurement criterion |
| Embedding CMS content in templates statically | Stale content in live campaigns | Use runtime content fetch or pre-compile with TTL |
| Running A/B tests without pre-registered success criteria | HARKing (Hypothesizing After Results Known) | Codify test design in a pre-test brief |
| Over-integrating — syncing all tools bidirectionally | Circular update loops, data integrity issues | Define a single direction of truth for each content type |

`★ Insight ─────────────────────────────────────`
The partner landscape table pattern (with 3 columns: partner, strength, integration pattern) is deliberately skimmable — when Claude is operating as braze-architect, it will scan these tables to answer "which partner fits this client's constraint?" rather than reading prose. Structuring reference material for scan-first consumption is key to role-based skills. The three-filter lens at the end also gives Claude a repeatable evaluation scaffold to apply to unlisted or future partners.
`─────────────────────────────────────────────────`
