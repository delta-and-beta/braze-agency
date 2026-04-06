---
name: architect-data-connectors
description: >-
  Configures Braze Currents and event forwarding connectors for real-time data
  streaming to analytics platforms.
metadata:
  role: braze-architect
  topics:
    - cdp-amplitude-amplitude-for-currents
    - cdp-segment-segment-for-currents
    - cdp-tealium-tealium-for-currents
    - cdp-zeotap-zeotap-for-currents
    - cdp-adobe-adobe-for-currents
    - cdp-adobe-event-forwarding-extension
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skill files serve as routing artifacts for AI agents — they should be scannable for relevance, not exhaustive docs. The synthesis layer (skill) abstracts over atomic topic files so Claude can decide "is this skill relevant?" without loading all six topic files.
- The "lens" field shapes HOW the skill frames each topic — a `braze-architect` lens means emphasizing event schema design, connector topology, and latency guarantees rather than step-by-step UI instructions.
`─────────────────────────────────────────────────`

Here's the generated skill body:

---

# Data Connector Integration

## Scope and Purpose

This skill guides architectural decisions for streaming Braze event data to external analytics and customer data platforms (CDPs). It covers both **outbound streaming** (Braze Currents pushing events to downstream platforms) and **inbound event forwarding** (third-party edge networks sending server-side events into Braze).

Use this skill when:
- Designing or configuring a real-time data pipeline that originates from or terminates at Braze
- Choosing between Currents-based export connectors (Amplitude, Adobe AEP, Segment, Tealium, Zeotap) for a given analytics architecture
- Integrating Adobe Experience Platform Edge Network event forwarding into Braze via server-side API
- Debugging event delivery gaps, schema mismatches, or connector configuration issues
- Evaluating connector trade-offs for latency, event coverage, and transformation requirements

## Architectural Lens

This skill applies a **real-time data streaming and event connector architecture** perspective. Rather than treating integrations as simple toggle-on features, it frames each connector in terms of:

- **Data flow topology** — where events originate, how they traverse the network, and where they land
- **Event schema contracts** — which Braze event types each connector supports and how fields map
- **Delivery semantics** — at-least-once guarantees, ordering constraints, and deduplication requirements
- **Connector configuration depth** — credential scoping, endpoint selection, and volume/rate considerations
- **Bidirectional vs. unidirectional** — distinguishing Currents export (one-way) from cohort sync (bidirectional) when platforms support both

## Topics Synthesized

This skill draws from six integration reference topics:

| Topic | Integration Direction | Primary Use Case |
|---|---|---|
| **Adobe Event Forwarding Extension** | Inbound (Adobe Edge → Braze) | Server-side event forwarding via `/users/track` |
| **Adobe for Currents** | Outbound (Braze → Adobe AEP) | Real-time Braze event streaming into AEP source connector |
| **Amplitude for Currents** | Outbound (Braze → Amplitude) | Product analytics on Braze behavioral events |
| **Segment for Currents** | Outbound (Braze → Segment) | CDP event routing and identity stitching |
| **Tealium for Currents** | Outbound (Braze → Tealium) | Tag management and real-time event hub routing |
| **Zeotap for Currents** | Outbound (Braze → Zeotap) | Identity resolution and segment enrichment |

**Important distinction:** Amplitude, Segment, and Tealium may support *separate* cohort/audience sync integrations that operate independently from their Currents connector. This skill concerns the Currents streaming path only.

## Connector Selection Framework

### When to use Currents (outbound export)

Braze Currents is the standard mechanism for streaming behavioral event data to downstream platforms. Choose a Currents connector when:

- You need raw event-level data (message sends, opens, clicks, conversions) in an external platform
- The downstream platform will own analytics, segmentation, or identity resolution
- Low-latency streaming is required (Currents delivers near-real-time)

**Currents requires enablement on your Braze account** — confirm availability before designing against it.

### When to use Adobe Event Forwarding Extension (inbound)

Use the Adobe Edge Network forwarding path when:

- Your organization uses Adobe Experience Platform as the primary data collection layer
- Server-side event forwarding is preferred over client-side SDKs for reliability or privacy reasons
- You need to enrich Braze user profiles with events captured outside the Braze SDK

**Key constraint:** Each forwarded event consumes Braze API data point allotment — factor this into volume planning.

### Connector-Specific Architectural Notes

**Adobe AEP (Currents):** Uses AEP's streaming source connector. Requires a Currents-enabled Braze account and an AEP streaming inlet. Event schema maps to XDM — validate field coverage for your event types.

**Amplitude (Currents):** Separate from Amplitude's cohort sync. Currents delivers raw event streams; cohort sync moves computed audiences. Architect both if bidirectional data flow is required.

**Segment (Currents):** Routes Braze events into Segment's event pipeline. Useful when Segment is the canonical event bus for downstream warehouse or tool routing.

**Tealium (Currents):** Feeds Braze events into Tealium EventStream. Coordinate with Tealium's tag/connector configuration to route events to final destinations.

**Zeotap (Currents):** Primarily useful for identity enrichment feedback loops — Zeotap receives Braze events, resolves identity, and can return enriched segments. Distinguish from a pure analytics export use case.

## Key Architectural Patterns

**Fan-out via Currents:** A single Currents connection per partner — you cannot multiplex one Currents stream to multiple endpoints of the same connector type without additional infrastructure.

**Schema validation before go-live:** Each Currents connector surfaces a subset of available Braze event types. Audit which event categories (messaging, purchase, custom) are supported by your target connector before committing to the integration.

**Server-side vs. client-side event collection:** Adobe Event Forwarding replaces or supplements client-side Braze SDK calls. Avoid double-counting events if both paths are active — implement deduplication on the Braze side using `external_id` and idempotency keys.

**Credential scoping:** Currents connectors require platform-specific credentials (e.g., Adobe IMS org tokens, Amplitude API keys). Scope these to write-only or data-ingestion roles where possible.

## Common Failure Modes

- **Missing event types in downstream platform:** Currents connector does not forward all Braze event categories — verify the supported event list for the specific connector, not Currents in general.
- **Data point overages with Adobe Event Forwarding:** Server-side forwarded events count against Braze data point limits; high-volume forwarding without rate controls causes unexpected billing impact.
- **Cohort sync vs. Currents confusion:** Platforms like Amplitude and Segment support both a Currents integration and a separate audience/cohort sync — these are independent configurations with different data flows and latency characteristics.
- **Currents not enabled:** Currents is an add-on feature. Attempting to configure a Currents connector without account-level enablement will fail silently or surface confusing errors.
