---
name: cdp-tealium-tealium-for-currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/tealium/tealium_for_currents
indexed_at: '2026-04-05'
keywords:
  - tealium
  - currents
  - webhook
  - ingestion
  - events
  - export
  - routing
  - engagement
  - connector
  - integration
triggers:
  - send Currents data to Tealium
  - set up Tealium export
  - configure Tealium webhook
  - route Braze events to Tealium
  - integrate with Tealium
---
```
★ Insight ─────────────────────────────────────
• Topic files in Nick's architecture are "atomic knowledge units" — they
  should answer one specific question completely, without requiring the
  reader to navigate elsewhere.
• Stripping Jekyll template syntax ({{site.baseurl}}, {: .reset-td-br-1})
  is essential for portability; these are build-time directives that
  produce broken text in raw markdown renderers.
• The "5-day drop" warning is operationally critical — it's the kind of
  fact that gets missed in long docs but is exactly what a Currents topic
  file should surface prominently.
─────────────────────────────────────────────────
```

## Tealium for Currents

Send Braze Currents event data to Tealium for routing across your marketing stack.

### Prerequisites

| Requirement | Notes |
|---|---|
| Tealium EventStream or AudienceStream | Active Tealium account required |
| Braze Currents | Must be enabled on your Braze account |
| Tealium ingestion URL | Found in your Tealium dashboard after creating a data source |

### Setup

**1. Create a Braze data source in Tealium**

Follow [Tealium's instructions](https://docs.tealium.com/server-side/data-sources/webhooks/braze-currents/) to create a webhook data source for Braze Currents. Copy the resulting ingestion URL.

**2. Create the Current in Braze**

Navigate to **Currents > + Create Current > Tealium Export**. Provide:
- Integration name
- Contact email
- Tealium ingestion URL

Select the events to track. By default, only events with an `external_user_id` are sent. Enable **Include events from anonymous users** to also forward events without an `external_user_id`.

Click **Launch Current** to activate.

### Critical: Keep the URL current

> If the Tealium URL is incorrect or becomes stale, Braze cannot send events. After **5 days** of failed delivery, events are permanently dropped.

Update the connector URL immediately if your Tealium ingestion endpoint changes.

### Exported data

All standard Currents events are supported, including:
- **Message engagement events** — sends, deliveries, opens, clicks, bounces
- **Customer behavior events** — sessions, purchases, custom events

Payload structure matches the custom HTTP connector format. Reference examples: [currents-examples/sample-data/Custom HTTP](https://github.com/Appboy/currents-examples/tree/master/sample-data/Custom%20HTTP/users/behaviors)

```
★ Insight ─────────────────────────────────────
• The payload structure note (same as custom HTTP connectors) is a high-
  value cross-reference — it means engineers can reuse existing parsing
  code across integrations, which saves significant implementation time.
• Anonymous user events are opt-in rather than opt-out — a deliberate
  privacy-forward default worth surfacing explicitly in the topic file.
─────────────────────────────────────────────────
```
