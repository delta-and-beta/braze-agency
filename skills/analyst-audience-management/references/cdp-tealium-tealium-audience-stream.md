---
name: cdp-tealium-tealium-audience-stream
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/tealium/tealium_audience_stream
indexed_at: '2026-04-05'
keywords:
  - AudienceStream
  - segmentation
  - audiences
  - connectors
  - attributes
  - badges
  - enrichments
  - Braze
  - tracking
  - real-time
triggers:
  - how to set up AudienceStream with Braze
  - how to create audiences and segments
  - how to configure visitor attributes and badges
  - how to connect AudienceStream to Braze
  - how to trigger Braze actions from audience events
---
## Tealium AudienceStream + Braze Integration

AudienceStream is Tealium's omnichannel customer segmentation engine. It builds visitor profiles from EventStream data and segments users into audiences, which trigger real-time actions via connectors to Braze.

**Use non-batch connectors** when real-time requests matter and rate limits aren't a concern. Use batch connectors otherwise.

---

## Prerequisites

| Requirement | Details |
|---|---|
| Tealium account | Server-side access required (`my.tealiumiq.com`) |
| Braze REST API key | Permissions: `users.track`, `users.delete`, `subscription.status.set` |
| Braze REST endpoint | Instance-specific endpoint URL |

---

## Setup Steps

### 1. Attributes and Badges

**Visit Attributes** — scoped to a single session (e.g., Visit Duration, Current Browser)

**Visitor Attributes** — persist for the user's lifetime (e.g., Lifetime Order Value, First Name)

Each attribute is configured with **enrichments** — rules controlling when/how values update. Trigger options: New Visitor, New Visit, Any Event, Visit Ended, or custom rule.

**Badges** — special visitor attributes representing behavioral patterns, assigned/removed via enrichment logic.

**Example — Lifetime Order Value attribute:**
1. AudienceStream > Visitor/Visit Attributes > Add Attribute
2. Scope: Visitor, Type: Number
3. Name: "Lifetime Order Value"
4. Add Enrichment: Increment or Decrement Number, source field: `order_total`
5. WHEN: Any Event + create rule matching purchase event
6. Save > Finish

**Example — VIP Badge (Lifetime Order Value > $500):**
1. Add Attribute > Scope: Visitor, Type: Badge
2. Name: "VIP"
3. Add Enrichment: Assign Badge
4. Create Rule: "Lifetime Order Value greater than 500"
5. Save > Finish

### 2. Create an Audience

AudienceStream > Audiences > create audience from common attributes (e.g., visitors with VIP badge). Audience entry/exit triggers connector actions.

Save/Publish the audience when done.

### 3. Create an Event Connector

Server-Side > AudienceStream > Audience Connectors > **+ Add Connector** > search for **Braze**.

Three-step configuration:

**Source** — select the audience and trigger; configure frequency cap as needed.

**Configuration** — name the connector, enter Braze API endpoint and REST API key.

**Action** — maps AudienceStream data to Braze API calls (`users.track`, `users.delete`, subscription updates).
