---
name: endpoints-messaging-post-send-triggered-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/send_messages/post_send_triggered_campaigns
indexed_at: '2026-04-05'
keywords:
  - campaigns
  - trigger
  - send
  - recipients
  - broadcast
  - email
  - API
  - messaging
  - endpoints
  - delivery
triggers:
  - send triggered campaigns
  - broadcast to audience
  - API message delivery
  - trigger user messages
---
## POST /campaigns/trigger/send

Send immediate, one-off messages to specific users via API-triggered delivery. Message content lives in the Braze dashboard; timing and targeting are controlled via API.

**Requires:** `campaigns.trigger.send` API key permission  
**Rate limit:** Standard send endpoints rate limit

---

### Request

```
POST https://{REST_ENDPOINT}/campaigns/trigger/send
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "campaign_id": "required — string",
  "send_id": "optional — string",
  "trigger_properties": {},
  "broadcast": false,
  "audience": {},
  "recipients": [
    {
      "external_user_id": "string",
      "user_alias": {},
      "email": "string",
      "prioritization": [],
      "trigger_properties": {},
      "send_to_existing_only": true,
      "attributes": {}
    }
  ],
  "attachments": [
    {
      "file_name": "report",
      "url": "https://example.com/report.pdf"
    }
  ]
}
```

---

### Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `campaign_id` | Required | String | Campaign must be configured for API-triggered delivery |
| `send_id` | Optional | String | For tracking sends |
| `trigger_properties` | Optional | Object | Key-value pairs applied to **all** recipients; overridden by per-recipient `trigger_properties` |
| `broadcast` | Optional | Boolean | Default `false`. Set `true` to send to entire campaign target segment. **Cannot be combined with `recipients`**. Cannot be combined with `attachments`. |
| `audience` | Optional | Object | Connected audience object; filters by custom attributes/subscription status |
| `recipients` | Optional | Array | Max 50 objects. If omitted and `broadcast: true`, sends to entire segment |
| `attachments` | Optional | Array | Email only; cannot be used with `broadcast: true` |

**Recipient identifier:** Each recipient must specify exactly one of: `external_user_id`, `user_alias`, or `email`.  
**Email + prioritization:** If using `email` as identifier, `prioritization` array is required.

---

### Recipient Resolution Behavior

**Profile creation:**
- `send_to_existing_only: true` (default) — only sends to existing users
- `send_to_existing_only: false` + `attributes` object — creates user if not found
- `send_to_existing_only: false` is **not supported for user aliases** — alias-only users must already exist

**Email identifier tie-breaking:**
- Braze uses `prioritization` to resolve a single profile when `email` is the identifier
- If `prioritization` returns a tie → Braze **does not send**
- If `prioritization` returns no profiles → Braze **does not send**
- Braze retries resolution up to **40 times** when `prioritization` doesn't return exactly one profile (expected behavior)
- `send_to_existing_only` setting does not affect tie behavior

**Updating subscription groups:** Include `subscription_groups` inside the nested `attributes` object in the recipients array.

---

### Key Constraints

- `broadcast: true` + `recipients` → invalid (mutually exclusive)
- `broadcast: true` + `attachments` → invalid
- `email` identifier → `prioritization` is required
- `send_to_existing_only: false` → `attributes` object must be included
- New alias-only users cannot be created via this endpoint
