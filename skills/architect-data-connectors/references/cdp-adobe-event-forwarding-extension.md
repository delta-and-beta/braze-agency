---
name: cdp-adobe-event-forwarding-extension
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/adobe/event_forwarding_extension
indexed_at: '2026-04-05'
keywords:
  - event-forwarding
  - braze
  - adobe
  - tracking
  - api
  - extension
  - server-side
  - purchase
  - edge-network
  - integration
triggers:
  - set up event forwarding to braze
  - send events to braze from adobe
  - configure adobe braze extension
  - forward purchase events
  - track user events server-side
---
## Adobe Event Forwarding Extension

Sends data from the Adobe Experience Platform Edge Network to Braze as server-side events via the `/users/track` API.

**Key caveat:** Each forwarded event consumes Braze data points.

---

## Rate Limits

| API | Limit |
|-----|-------|
| `/users/track` | 50,000 requests/minute |

---

## Setup

### Prerequisites

| Item | Where to find it |
|------|-----------------|
| Braze instance URL | Onboarding manager or API overview page |
| Braze REST API key | **Settings > API Keys** (all permissions required) |

### Steps

1. **Create a secret** — In Adobe Event Forwarding, create a new secret with your Braze REST API key value. This keeps the key secure in transit.

2. **Install the extension** — Create or open an event forwarding property, go to **Extensions > Catalog**, find the Braze extension, click **Install**. Enter your REST instance URL and API key secret, then **Save**.

3. **Create a Send Event rule** — Add a new forwarding rule, set conditions as needed. For the action: select **Braze** extension → **Send Event** action type.

4. **Create a Send Purchase Event rule** — Same process as above but select **Send Purchase Event** as the action type.

---

## Send Event — Field Reference

### User Identification (one required)

| Field | Notes |
|-------|-------|
| External User ID | Long, random UUID/GUID |
| Braze User ID | Internal Braze identifier |
| User Alias | Object with `alias_name` + `alias_label`; multiple aliases per user supported, one `alias_name` per `alias_label` |

### Event Data

| Field | Required | Format |
|-------|----------|--------|
| Event Name | Yes | String |
| Event Time | Yes | ISO 8601 or `yyyy-MM-dd'T'HH:mm:ss:SSSZ` |
| App Identifier (`app_id`) | No | Associates event with a specific workspace app |
| Event Properties | No | JSON object of custom key-value pairs |

### User Attributes (optional)

Sent as a JSON object — creates or updates profile attributes on the identified user.

| Attribute | Format |
|-----------|--------|
| `first_name`, `last_name` | String |
| `phone`, `email` | String |
| `gender` | `"M"`, `"F"`, `"O"`, `"N"`, `"P"` |
| `city`, `country` | String; country uses ISO-3166-1 alpha-2 |
| `language` | ISO-639-1 string |
| `dob` | `"YYYY-MM-DD"` |
| `time_zone` | IANA tz name (e.g. `America/New_York`) |
| `facebook` | Hash: `id`, `likes` (string array), `num_friends` (int) |
| `twitter` | Hash: `id`, `screen_name`, `followers_count`, `friends_count`, `statuses_count` |

> **Data point warning:** All configured attributes are sent on every event fire, regardless of whether values changed. Audit your attribute configuration against your data point budget.

---

## Use Case Pattern

```
Website/Mobile events
    → Adobe Tags (client-side)
        → Edge Network (real-time)
            → Braze Event Forwarding Extension (server-side)
                → Braze /users/track API
```

Ideal for multichannel orgs that want server-side event delivery without client-side Braze SDK calls.

`★ Insight ─────────────────────────────────────`
- The server-side forwarding pattern here avoids client-side SDK bloat but trades observability — failures happen silently in the Edge Network layer rather than in browser DevTools.
- User identification requires exactly one of three identifiers (external ID, Braze ID, or alias) — this mirrors Braze's own API contract, so the extension is essentially a thin adapter over `/users/track`.
- The "all attributes sent every time" behavior is a footgun for data point billing — worth calling out prominently in any reference doc since it's a non-obvious default.
`─────────────────────────────────────────────────`
