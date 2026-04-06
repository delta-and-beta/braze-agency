---
name: cdp-lemnisk
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/lemnisk
indexed_at: '2026-04-05'
keywords:
  - CDP
  - Lemnisk
  - Braze
  - integration
  - users.track
  - segments
  - engagement
  - enrichment
  - API
  - real-time
triggers:
  - set up Lemnisk Braze integration
  - send data from Lemnisk to Braze
  - configure Lemnisk external API
  - trigger user events from Lemnisk segments
  - enrich Braze profiles with Lemnisk data
---
## Lemnisk CDP — Braze Integration

**Lemnisk** is an AI-powered Customer Data Platform (CDP) and marketing automation solution. It acts as a CDP-led intelligence layer that unifies user data in real time and sends behavioral signals + personal attributes to Braze for enriched profile personalization.

> Integration is maintained by Lemnisk.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Lemnisk account | Required |
| External API enabled | Contact your Lemnisk CSM to enable |
| Braze REST API key | Needs `users.track` permission — create in **Settings > API Keys** |
| Braze REST endpoint | Depends on your Braze instance region |

---

## Setup Steps

### 1. Create a Braze External API in Lemnisk

1. In Lemnisk, go to **External API channel** > **Add New External API**
2. Under **Basic Details**: enter name, description, channel, and channel identifier
3. Under **External API details**: configure the `users.track` endpoint
   - Use `{{}}` template syntax to define engagement-level fields that vary per campaign
4. Select **Save** — you'll be redirected to the **Test API** page

### 2. Test the Configuration

1. On the **Test API** page, enter test values in the JSON tree view
2. Select **Test Configuration**
3. Verify in Braze: **Audience > Search Users** — look up an identifier from your config (e.g., email). The test-triggered profile should appear.

### 3. Trigger User Events from Lemnisk Segments

1. Create a new segment in Lemnisk (e.g., "users who submit a lead form")
2. In the segment: **External API > Add Engagement**
3. Under **Engagement Creation**: enter basic details, select the Braze External API config created in Step 1
4. Under **Configure Parameters**: map Lemnisk data to Braze parameters (e.g., `Name`, `Product ID`, `Event Time`)
5. Enter personalization variables for each parameter, then **Save**
6. Activate the Engagement

---

## Key Behaviors

- Data flows from Lemnisk → Braze in **real time** via `users.track` API
- Lemnisk enriches Braze profiles by blending behavioral signals with personal attributes
- Segment triggers control when data is pushed (e.g., on form submission, behavioral events)
- Campaign-level field overrides are supported via `{{}}` syntax in the External API config

`★ Insight ─────────────────────────────────────`
- Lemnisk uses the `users.track` endpoint rather than the Events API directly — this is a common Braze integration pattern where CDPs batch user attributes and events into a single call for profile enrichment
- The `{{}}` template syntax for engagement-level fields is Lemnisk-specific templating, not Braze's Liquid syntax — this distinction matters when debugging payload construction
- The verify-in-dashboard step (Search Users) is a lightweight smoke test that doesn't require any additional tooling, making it useful as an integration health check
`─────────────────────────────────────────────────`
