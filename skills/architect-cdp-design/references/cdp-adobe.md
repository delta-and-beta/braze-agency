---
name: cdp-adobe
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/adobe/event_forwarding_extension
indexed_at: '2026-04-05'
keywords:
  - forwarding
  - events
  - Braze
  - tracking
  - API
  - integration
  - extension
  - attributes
  - purchase
  - configuration
triggers:
  - forward events to Braze
  - set up event forwarding
  - send purchase events
  - configure user identification
  - track behavioral events
---
## Adobe Experience Platform: Braze Track Events Extension

Forwards server-side events from the Adobe Experience Platform Edge Network to Braze using the `/users/track` API.

> **Note:** This extension may increase Braze data point usage.

---

## Use Cases

Captures transactional or behavioral event data from web/mobile via Adobe Tag rules, then automatically forwards relevant events to Braze from the server side — enabling customer analytics and targeting.

---

## Rate Limits

| API | Limit |
|-----|-------|
| `/users/track` | 50,000 requests/minute |

---

## Integration Setup

### Required Configuration

| Item | How to Obtain |
|------|---------------|
| Braze Instance URL | From onboarding manager or Braze dashboard → API Overview page |
| Braze REST API Key | Dashboard → **Settings** → **API Keys** (all permissions) |

### Steps

1. **Create a secret** — Create an event forwarding secret in Adobe Experience Platform set to your Braze API key (keeps credentials secure).

2. **Install the extension** — In an event forwarding property, go to **Extensions** → **Catalog** → install the Braze extension. Input your REST instance URL and API key, then **Save**.

3. **Create a Send Event rule** — Add an event forwarding rule, set action to **Braze → Send Event**.

4. **Create a Send Purchase Event rule** — Add a separate rule with action **Braze → Send Purchase Event**.

---

## Send Event: Field Reference

### User Identification (one required)

| Field | Description |
|-------|-------------|
| External User ID | Long, random UUID/GUID matching your user ID convention |
| Braze User ID | Braze's internal user identifier |
| User Alias | Object with `alias_name` + `alias_label` for alternate identification |

### Event Data

| Field | Required | Format |
|-------|----------|--------|
| Event Name | Yes | String |
| Event Time | Yes | ISO 8601 or `yyyy-MM-dd'T'HH:mm:ss:SSSZ` |
| App Identifier (`app_id`) | No | Associates event to specific app in workspace |
| Event Properties | No | JSON object of custom key-value pairs |

### User Attributes (standard fields)

| Attribute | Format |
|-----------|--------|
| First Name / Last Name | String |
| Phone / Email | String |
| Gender | `"M"`, `"F"`, `"O"`, `"N"`, `"P"` |
| City | String |
| Country | ISO-3166-1 alpha-2 (e.g., `"US"`) |
| Language | ISO-639-1 (e.g., `"en"`) |
| Date of Birth | `"YYYY-MM-DD"` |
| Time Zone | IANA tz name (e.g., `"America/New_York"`) |
| Facebook | `{ id, likes[], num_friends }` |
| Twitter | `{ id, screen_name, followers_count, friends_count, statuses_count }` |

> **Warning:** All configured attributes are sent on every event, regardless of whether values changed — this affects data point consumption.

---

## Key Constraints

- User identification requires at least one of: External User ID, Braze User ID, or User Alias
- Minimum event fields: Event Name + Event Time; include as many custom properties as possible
- User attributes are sent with every event invocation (not delta-only)

`★ Insight ─────────────────────────────────────`
- The "all attributes sent every time" behavior is a critical operational detail — unlike some event systems that only transmit changed fields, this extension sends the full attribute payload on each event, which directly impacts Braze's billable data point model.
- The dual-rule pattern (Send Event + Send Purchase Event) mirrors Braze's own API separation between `/users/track` events and purchases — preserving the semantic distinction at the forwarding layer.
`─────────────────────────────────────────────────`
