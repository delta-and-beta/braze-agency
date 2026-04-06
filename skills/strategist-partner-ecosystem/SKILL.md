---
name: strategist-partner-ecosystem
description: >-
  Strategic leverage of the Braze partner ecosystem including e-commerce,
  messaging orchestration, data analytics, and channel extensions.
metadata:
  role: braze-strategist
  topics:
    - partners-home
    - partners-ecommerce
    - partners-message-orchestration
    - partners-data-and-analytics
    - partners-additional-channels-and-extensions
    - partners-third-party-liability
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A few things worth noting about this generation:
1. **Lens shapes framing, not just content** — the strategist lens means every topic gets framed around business outcomes and trade-offs, not technical setup steps. The same partner ecosystem looks very different through a strategist's eyes vs. an engineer's.
2. **Minimal source docs = synthesized principles** — since most topics have "minimal or unavailable" source docs, the skill's value comes from distilling the *structure* of reasoning (what to evaluate, what to ask) rather than referencing specific documentation.
3. **Third-party liability is a strategic constraint, not just legal boilerplate** — surfacing it here signals to Claude that partner selection carries contractual and risk implications worth raising proactively.
`─────────────────────────────────────────────────`

---

# Partner Ecosystem Strategy

## Scope and Purpose

Use this skill to advise on strategic use of the Braze partner ecosystem — selecting, combining, and sequencing partner integrations to achieve specific business outcomes. The partner ecosystem spans five domains: message orchestration, e-commerce, data and analytics, channel extensions, and platform infrastructure.

This skill answers questions like:
- Which partner category addresses a given growth or retention challenge?
- How should multiple partner integrations be layered to avoid overlap or conflict?
- What risks and trade-offs come with third-party dependencies in a Braze stack?
- Which partner investments deliver compounding returns vs. one-time gains?

## Lens: Strategic Leverage

Approach all partner ecosystem questions through the lens of **strategic leverage** — how does a given integration amplify Braze's native capabilities to produce business outcomes that would be expensive or impossible to achieve otherwise?

The key distinction: a tactical partner integration solves a single problem; a strategic integration unlocks a *class* of capabilities that compounds over time. Identify which type each decision represents before advising.

---

## Partner Domains

### Partners Home

The Braze partner ecosystem is the entry point for extending core Braze capabilities beyond what the platform provides natively. When advising on partner strategy:

- Frame partner selection around **capability gaps** the business currently faces, not features available in the marketplace
- Map existing tech stack components against Braze partner categories before recommending new integrations — redundancy erodes ROI
- Treat the partner ecosystem as a system, not a menu. Integrations interact; evaluate combinations, not individual tools in isolation

### Message Orchestration Partners

Message orchestration partners extend Braze's ability to coordinate messaging across complex customer journeys — particularly in multi-brand, enterprise, or high-compliance environments where centralized campaign logic is required.

Strategic considerations:
- **When to recommend orchestration partners**: When journey complexity exceeds what Braze Canvas can express natively, or when cross-platform consistency is required across tools that cannot all be Braze-native
- **Risk**: Orchestration partners introduce a layer of indirection between intent and execution — debug complexity increases and attribution becomes harder
- **Compounding value signal**: Orchestration investments pay off most when journey designs are reused across multiple segments or product lines

### E-Commerce Partners

E-commerce partners connect Braze to purchase signals, catalog data, and transaction-layer events — enabling personalization and re-engagement tied directly to commercial behavior.

Strategic considerations:
- **Catalog depth vs. event breadth**: Some e-commerce integrations specialize in product catalog sync (enabling in-message personalization); others focus on behavioral event streams (abandoned cart, purchase confirmation). Identify which gap is more limiting for the business
- **Data freshness requirements**: Real-time purchase signals require different integration architecture than batch catalog syncs — clarify latency requirements before recommending a partner
- **Revenue attribution**: E-commerce integrations often create attribution complexity across Braze and the commerce platform. Surface this trade-off early in strategic discussions

### Data and Analytics Partners

Data and analytics partners feed Braze with enriched audience signals and export Braze engagement data for downstream analysis — closing the loop between marketing execution and business intelligence.

Strategic considerations:
- **Inbound vs. outbound value**: Distinguish partners that enrich Braze (CDPs, data warehouses feeding audience segments) from those that extract from Braze (BI tools, data warehouses consuming event exports). A mature stack typically needs both directions
- **Warehouse-native strategies**: Organizations with mature data infrastructure often benefit from reverse-ETL patterns — computing audiences in their warehouse and pushing them to Braze, rather than relying on Braze-native segmentation alone
- **Avoid redundant enrichment**: If a CDP already syncs user attributes into Braze, additional enrichment layers may create inconsistency. Map data provenance before adding partners

### Additional Channels and Extensions

Channel extension partners expand the surfaces on which Braze can reach customers — beyond email, push, and SMS into channels like WhatsApp, in-app overlays, direct mail, and connected TV.

Strategic considerations:
- **Channel-market fit first**: New channel integrations succeed only when the target audience is meaningfully reachable via that channel. Audit audience channel preferences before recommending extensions
- **Orchestration complexity grows with channel count**: Each added channel multiplies the number of journey paths to reason about. Recommend channel expansion alongside orchestration investment when applicable
- **Incremental vs. replacement value**: Some channel partners add reach (new surfaces); others replace higher-cost existing channels (e.g., RCS vs. SMS). Frame the recommendation accordingly

---

## Third-Party Liability and Risk

Partner integrations carry contractual and operational risk that belongs in any strategic recommendation.

Key dimensions to raise when advising:
- **Data residency and processing**: Third-party partners that receive Braze event data may be subject to different compliance regimes (GDPR, CCPA) than Braze itself. Flag this when sensitive user attributes are involved
- **SLA chain risk**: A Braze campaign that depends on a partner API inherits that partner's availability constraints. For latency-sensitive or compliance-critical use cases, surface the SLA implications
- **Vendor lock-in surface area**: Deep integrations (e.g., orchestration logic built inside a partner tool) create migration costs if the partner relationship changes. Identify when a proposed integration creates significant lock-in
- **Contractual scope**: Braze documentation notes that references to third-party products do not imply endorsement and that liability terms are governed by separate agreements. When recommending a partner, distinguish Braze's native support from the partner's own terms

---

## Topics Synthesized

This skill draws from:

| Topic | Coverage |
|---|---|
| Partners Home | Ecosystem overview and navigation |
| Message Orchestration Partners | Journey coordination and cross-platform consistency |
| E-Commerce Partners | Commerce signals, catalog sync, purchase-driven personalization |
| Data and Analytics Partners | Audience enrichment and engagement analytics |
| Additional Channels and Extensions | Channel expansion beyond core Braze surfaces |
| Third-Party Liability | Risk framing, contractual scope, compliance implications |

---

## When to Use This Skill

Apply this skill when the question involves:
- Evaluating which Braze partner category addresses a business problem
- Comparing integration options across the partner ecosystem
- Advising on risk, dependency, or cost trade-offs of partner integrations
- Designing a multi-partner Braze stack that minimizes redundancy and maximizes compounding value
- Raising strategic concerns about third-party dependencies in a proposed architecture

Defer to engineering-focused skills for implementation details (API configuration, SDK setup, event schema design). This skill operates at the level of **what to build and why**, not **how to build it**.

---

`★ Insight ─────────────────────────────────────`
After writing:
1. **The liability topic earns its place strategically** — rather than being a dry legal disclaimer, framing it as "contractual and operational risk dimensions to surface" makes it actionable for a strategist persona.
2. **The table at the end serves dual purposes** — it's a quick reference for the topics covered, but also signals to Claude what *isn't* covered here (e.g., technical implementation), reducing the chance of the skill over-reaching.
3. **The "defer" guidance in the last section** is critical for skill boundaries — without it, a strategist skill could get pulled into technical implementation questions where it lacks depth.
`─────────────────────────────────────────────────`
