---
name: architect-cdp-design
description: >-
  Architects customer data platform integrations and data flow patterns across
  Braze and third-party platforms.
metadata:
  role: braze-architect
  topics:
    - cdp-segment
    - cdp-mparticle
    - cdp-rudderstack
    - cdp-snowplow
    - cdp-treasure-data
    - cdp-lytics
    - cdp-lexer
    - cdp-redpoint
    - cdp-octolis
    - cdp-lemnisk
    - cdp-merkury
    - cdp-toovio
    - cdp-simonai
    - cdp-adobe
    - cdp-adobe-adobe
    - cdp-adobe-event-forwarding-extension
    - cdp-tealium
    - cdp-zeotap
    - personalization-engines-amazon-personalize
    - personalized-recommendations-amazon-personalize
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files serve as **synthesizing documents** — rather than duplicating topic content, they act as the "table of contents + lens" that tells Claude *how* to reason across atomic reference files. The SKILL.md body should orient the reasoning frame, not repeat topic details.
`─────────────────────────────────────────────────`

# CDP Architecture Design

## Purpose

Design and evaluate customer data platform (CDP) integrations with Braze, focusing on data flow architecture, identity resolution strategies, and integration topology decisions. Apply this skill when architecting how user data moves between CDPs, Braze, and downstream systems — not when implementing a specific integration step-by-step.

## Scope

This skill synthesizes architectural knowledge across the CDP ecosystem that connects to Braze:

**First-party CDPs and enterprise platforms:**
- Segment, mParticle, RudderStack, Snowplow, Tealium
- Adobe Experience Platform (AEP) and Event Forwarding Extension
- Treasure Data, Lytics, Lexer, Redpoint

**AI-enhanced and specialized CDPs:**
- Simon AI, Lemnisk, Toovio, Octolis
- Merkury (identity resolution), Zeotap (enrichment + identity)
- Amazon Personalize (ML-driven recommendations)

## Architectural Lens

Evaluate CDP integrations through the lens of **data flow design** — tracing how user events, attributes, and cohorts travel from source systems through the CDP layer into Braze, and where decisions in that topology affect campaign timing, data freshness, identity consistency, and cost.

Key architectural questions to drive analysis:

- **Directionality**: Is this a source-to-Braze push, a Braze-to-CDP pull, or bidirectional sync? What triggers each direction?
- **Identity seam**: Where does identity resolution occur — at the CDP, at Braze ingestion, or at query time? Which identifier (email, external ID, device ID) anchors the join?
- **Cohort vs. event flow**: Does the integration move cohort snapshots (batch) or streaming event data (real-time)? What is the latency contract?
- **Braze API surface consumed**: Does the CDP write to `/users/track`, use Currents as a source, leverage the REST export API, or use Cloud Data Ingestion (CDI)? Each carries different rate limit and cost profiles.
- **Middleware presence**: Is there a transformation layer (Lambda, Dataflow, dbt) between the CDP and Braze, or is it direct? What owns schema mapping?

## When to Apply This Skill

Apply this skill for:

- Selecting a CDP integration pattern for a new Braze deployment
- Comparing two CDP vendors on their Braze integration topology
- Diagnosing identity fragmentation caused by a CDP ↔ Braze boundary
- Designing cohort sync pipelines (e.g., Treasure Data → Braze cohort import)
- Architecting Adobe AEP Edge Network event forwarding to Braze
- Evaluating whether a CDP's Braze connector uses server-side or client-side event delivery
- Designing data enrichment flows using identity platforms (Merkury, Zeotap) before Braze targeting

Do not apply this skill for campaign logic, Canvas design, message personalization, or Braze-internal configuration unrelated to external data ingestion.

## Architectural Patterns Across the CDP Landscape

### Stream-First vs. Batch-First CDPs

**Stream-first** (Segment, RudderStack, mParticle, Snowplow): Events are forwarded to Braze near-real-time via server-side destinations. The Braze destination typically calls `/users/track`. Evaluate whether the connector batches calls and what retry behavior it exposes.

**Batch/cohort-first** (Treasure Data, Lytics, Lexer, Redpoint): Integration centers on exporting audience segments as user lists into Braze. Check whether the CDP writes directly to Braze cohorts/segments or requires a file-based intermediary.

**Hybrid platforms** (Tealium, Adobe AEP): Support both real-time tag/event routing and batch audience export. Tealium routes Braze Currents data bidirectionally; AEP uses the Event Forwarding Extension for server-side streaming alongside batch audience activation.

### Identity Resolution Topology

CDPs with built-in identity graphs (Merkury, Zeotap, Simon AI) resolve anonymous and known profiles before data reaches Braze. Architectural concern: ensure the resolved identifier matches Braze's `external_id` or `braze_id` — mismatches create duplicate profiles. Merkury's `MerkuryID` and Zeotap's resolved ID must map to a stable Braze alias.

For CDPs without identity resolution (Snowplow, RudderStack basic tier), identity stitching must occur before or during Braze ingestion. Design the merge strategy explicitly.

### AI/ML Enrichment Layer

Amazon Personalize, Simon AI, and Toovio inject ML-scored or recommended content into the data pipeline. Architectural decision point: inject recommendations as Braze custom attributes (persistent, queryable) vs. as event properties on a trigger event (ephemeral, action-bound). Attribute injection suits catalog-style recommendations; event injection suits real-time triggered campaigns.

Toovio's near-real-time trigger model means the CDP drives Braze API calls on its schedule — design around Braze rate limits accordingly.

### Adobe AEP Event Forwarding — Cost Architecture Note

Each event forwarded through the Adobe Event Forwarding Extension to Braze via `/users/track` consumes a Braze data point. Architectural mitigation: filter at the Edge rule level before forwarding, sending only events that Braze campaigns will act on. Do not forward analytics-only events into Braze.

## Reference Files

For platform-specific integration details, consult the topic reference files in `references/`:

| Platform | Reference File |
|----------|---------------|
| Segment | `references/segment-cdp-overview.md` |
| mParticle | `references/mparticle-cdp.md` |
| RudderStack | `references/rudderstack-cdp.md` |
| Snowplow | `references/snowplow-cdp.md` |
| Treasure Data | `references/treasure-data-cdp.md` |
| Lytics | `references/lytics-cdp.md` |
| Lexer | `references/lexer-cdp.md` |
| Redpoint | `references/redpoint-cdp.md` |
| Octolis | `references/octolis-cdp.md` |
| Lemnisk | `references/lemnisk-cdp.md` |
| Merkury | `references/merkury-cdp.md` |
| Toovio | `references/toovio-cdp.md` |
| Simon AI | `references/simon-ai-cdp.md` |
| Adobe AEP Overview | `references/adobe-cdp-overview.md` |
| Adobe Integration | `references/adobe-integration.md` |
| Adobe Event Forwarding | `references/adobe-event-forwarding-extension.md` |
| Tealium | `references/tealium-cdp-overview.md` |
| Zeotap | `references/zeotap-cdp-overview.md` |
| Amazon Personalize | `references/amazon-personalize-engine.md` |
| Amazon Personalize Recs | `references/amazon-personalize-recommendations.md` |

Load the relevant reference file(s) when designing or evaluating a specific platform integration. Load multiple files when comparing platforms or designing a multi-CDP topology.

`★ Insight ─────────────────────────────────────`
The reference table is the key connective tissue here — it lets Claude load only the platforms relevant to the current query rather than ingesting all 20 topic files at once. This is Nick's progressive disclosure pattern in action: the skill orients the reasoning frame, and references carry the detail.
`─────────────────────────────────────────────────`
