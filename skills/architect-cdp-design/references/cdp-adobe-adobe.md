---
name: cdp-adobe-adobe
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/adobe/event_forwarding_extension
indexed_at: '2026-04-05'
keywords:
  - adobe
  - braze
  - forwarding
  - tracking
  - integration
  - api
  - attributes
  - routing
  - events
  - identification
triggers:
  - send events to braze
  - configure event forwarding
  - track user events
  - set up braze integration
  - create forwarding rules
---
## Adobe Experience Platform Event Forwarding — Braze Integration

Sends server-side events from Adobe Experience Platform Edge Network to Braze via the `/users/track` API.

> **Note:** Adobe Event Forwarding may increase Braze data point usage.

---

## Rate Limits

| API | Limit |
|-----|-------|
| `/users/track` | 50,000 requests/minute |

---

## Setup

### Prerequisites

| Item | Where to find |
|------|---------------|
| Braze instance URL | Braze onboarding manager or API overview page |
| Braze REST API key | Braze dashboard → **Settings** → **API Keys** (all permissions) |

### Steps

1. **Create a secret** — In Adobe, create an event forwarding secret with your Braze REST API key as the value.

2. **Install the Braze extension** — Create or open an event forwarding property → **Extensions** → **Catalog** → Install **Braze** → Enter REST instance + API key → **Save**.

3. **Create a Send Event rule** — New event forwarding rule → Action: **Braze** extension → **Send Event**.

4. **Create a Send Purchase Event rule** — Same as above but action type: **Send Purchase Event**.

---

## Send Event — Field Reference

### User Identification (at least one required)

| Field | Notes |
|-------|-------|
| External User ID | Long, random UUID/GUID |
| Braze User ID | Internal Braze identifier |
| User Alias | Object with `alias_name` + `alias_label`; one `alias_name` per `alias_label` |

### Event Data

| Field | Required | Notes |
|-------|----------|-------|
| Event Name | Yes | |
| Event Time | Yes | ISO 8601 or `yyyy-MM-dd'T'HH:mm:ss:SSSZ` |
| App Identifier (`app_id`) | No | Associates event with a specific workspace app |
| Event Properties | No | JSON object of custom properties |

### User Attributes (JSON object, create/update on user profile)

| Attribute | Format |
|-----------|--------|
| First Name, Last Name | String |
| Phone, Email | String |
| Gender | `"M"`, `"F"`, `"O"`, `"N"`, `"P"` |
| City, Country | Country: ISO-3166-1 alpha-2 (e.g., `"US"`) |
| Language | ISO-639-1 (e.g., `"en"`) |
| Date of Birth | `"YYYY-MM-DD"` |
| Time Zone | IANA tz name (e.g., `"America/New_York"`) |
| Facebook | `{ id, likes[], num_friends }` |
| Twitter | `{ id, screen_name, followers_count, friends_count, statuses_count }` |

> **Warning:** All configured attributes are sent on every event firing, even if unchanged — this affects data point usage.

---

## Key Behaviors

- **Server-side only** — events originate from Edge Network, not the browser/device.
- **Real-time routing** — Adobe tag rules send data to Edge Network; the extension forwards to Braze automatically.
- **User identity required** — event must include at least one of: External User ID, Braze User ID, or User Alias.
- **Minimum event payload** — only Event Name + Event Time are strictly required; include custom properties for richer analytics.

`★ Insight ─────────────────────────────────────`
- This integration uses Adobe's **server-side event forwarding** pattern — data flows Client → Edge Network → Braze, bypassing the browser. This means the Braze SDK is never loaded client-side, which has implications for session tracking and in-app messaging.
- The secret-based API key storage (Step 2) is Adobe's standard credential isolation pattern — the key is stored as an encrypted Adobe secret rather than hardcoded in the rule configuration, preventing exposure in exported tag containers.
- All user attributes are sent on every rule firing regardless of change — this is a **stateless push** model with no delta-detection, making it important to scope rules carefully to avoid unnecessary data point consumption.
`─────────────────────────────────────────────────`
