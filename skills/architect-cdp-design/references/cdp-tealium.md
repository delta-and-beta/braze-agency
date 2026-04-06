---
name: cdp-tealium
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/tealium/tealium_for_currents
indexed_at: '2026-04-05'
keywords:
  - tealium
  - CDP
  - currents
  - webhook
  - ingestion
  - routing
  - eventstream
  - integration
  - connector
  - activation
triggers:
  - how to integrate Braze with Tealium
  - set up Tealium data source
  - route Braze Currents events
  - configure Tealium ingestion URL
  - forward events to Tealium
---
## Tealium CDP Overview

Tealium is a customer data platform (CDP) that collects and routes data from multiple sources across your marketing stack. The Braze + Tealium integration routes Braze Currents event data into Tealium for downstream activation.

## Prerequisites

| Requirement | Notes |
|---|---|
| Tealium EventStream or AudienceStream | Active Tealium account required |
| Braze Currents | Must be enabled on your Braze account |
| Tealium Ingestion URL | Retrieved from your Tealium dashboard |

## Setup

**Step 1 — Create a Braze data source in Tealium**

Follow Tealium's instructions to create a webhook data source for Braze Currents. Tealium will generate an ingestion URL.

**Step 2 — Create a Current in Braze**

Navigate to **Currents** > **+ Create Current** > **Tealium Export**, then provide:
- Integration name
- Contact email
- Tealium ingestion URL
- Events to track (all available Currents events are supported)

By default, only identified users (`external_user_id` present) are included. Enable **Include events from anonymous users** to also forward anonymous events.

Select **Launch Current** to activate.

## Critical: URL Validity

Keep the Tealium URL current. If the connector URL becomes invalid:
- Braze cannot send events
- After **5 days** of failure, events are permanently dropped (no replay)

## Exported Data

All Braze Currents events are supported, including:
- Message engagement events (sends, opens, clicks, bounces, etc.)
- Customer behavior events (sessions, purchases, custom events, etc.)

Payload structure matches the custom HTTP connector format. Reference examples: [Appboy/currents-examples](https://github.com/Appboy/currents-examples/tree/master/sample-data/Custom%20HTTP/users/behaviors)

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" — the condensed format strips Jekyll templating artifacts (`{{site.baseurl}}`, `{: .reset-td-br-1}`) that would be noise when loaded as agent context
- The 5-day drop window is the kind of operationally critical fact worth preserving verbatim — it's asymmetric information (easy to miss in docs, painful to learn from incidents)
`─────────────────────────────────────────────────`
