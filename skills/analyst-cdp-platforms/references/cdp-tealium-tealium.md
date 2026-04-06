---
name: cdp-tealium-tealium
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/tealium/tealium_for_currents
indexed_at: '2026-04-05'
keywords:
  - tealium
  - currents
  - webhook
  - events
  - integration
  - connector
  - ingestion
  - export
  - CDP
  - payload
triggers:
  - connect Braze to Tealium
  - set up Tealium integration
  - export events to Tealium
  - configure Currents for Tealium
  - forward Braze data to Tealium
---
## Tealium Integration via Braze Currents

Connects Braze Currents event data to Tealium's customer data platform for routing across your marketing stack.

## Prerequisites

- **Tealium account** with EventStream or AudienceStream
- **Braze Currents** enabled on your account
- **Tealium ingestion URL** (from your Tealium dashboard)

## Setup

### 1. Create a Braze data source in Tealium

Follow [Tealium's setup guide](https://docs.tealium.com/server-side/data-sources/webhooks/braze-currents/) to create a webhook data source. Tealium will provide an ingestion URL on completion.

### 2. Create a Current in Braze

Navigate to **Currents > + Create Current > Tealium Export**.

Required fields:
- Integration name
- Contact email
- Tealium URL (from step 1)

Select events to track. By default, only events with `external_user_id` are sent. Enable **Include events from anonymous users** to also forward events without an `external_user_id`.

Click **Launch Current**.

## Key Details

- **Exported data**: All Currents events — [message engagement events](https://www.braze.com/docs/user_guide/data/braze_currents/event_glossary/message_engagement_events/) and [customer behavior events](https://www.braze.com/docs/user_guide/data/braze_currents/event_glossary/customer_behavior_events/)
- **Payload format**: Same structure as custom HTTP connectors ([example payloads](https://github.com/Appboy/currents-examples/tree/master/sample-data/Custom%20HTTP/users/behaviors))

## Critical Warning

Keep your Tealium URL current. If the connector URL is incorrect for more than **5 days**, events are permanently dropped — there is no recovery.

`★ Insight ─────────────────────────────────────`
- The 5-day data loss threshold is the most operationally critical fact here — worth surfacing prominently over setup steps that users only follow once
- Anonymous user events require an explicit opt-in (`external_user_id` is the default join key), which is a common source of data gaps when analysts expect full event coverage
- Payload format parity with custom HTTP connectors means teams can reuse existing transformation logic across destinations
`─────────────────────────────────────────────────`
