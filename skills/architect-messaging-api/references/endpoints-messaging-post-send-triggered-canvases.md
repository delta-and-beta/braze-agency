---
name: endpoints-messaging-post-send-triggered-canvases
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/send_messages/post_send_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - trigger
  - messaging
  - broadcast
  - recipients
  - audience
  - delivery
  - API
  - context
  - attributes
triggers:
  - send API-triggered canvas messages
  - trigger canvas delivery
  - broadcast canvas to audience
  - canvas trigger send endpoint
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are atomic knowledge units stored under `skills/{name}/references/*.md` — they're designed to be loaded selectively at query time, so stripping boilerplate dramatically reduces token cost at runtime
- The Jekyll template tags (`{% api %}`, `{{site.baseurl}}`) are build-time artifacts that won't render properly when loaded as context — removing them is essential for usability
`─────────────────────────────────────────────────`

## POST /canvas/trigger/send — Send API-Triggered Canvas Messages

**Permission required:** `canvas.trigger.send`

Sends Canvas messages via API-triggered delivery. Message content is stored in Braze dashboard; you control timing and targeting via API. Requires a Canvas ID (generated when building a Canvas in the dashboard).

---

### Request

```
POST https://rest.iad-01.braze.com/canvas/trigger/send
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "canvas_id": "canvas_identifier",
  "context": {"product_name": "shoes", "product_price": 79.99},
  "broadcast": false,
  "audience": { ... },
  "recipients": [
    {
      "external_user_id": "user_identifier",
      "user_alias": { "alias_name": "example_name", "alias_label": "example_label" },
      "email": "user@example.com",
      "prioritization": [],
      "context": { ... },
      "send_to_existing_only": true,
      "attributes": { "first_name": "Alex" }
    }
  ]
}
```

---

### Parameters

| Parameter | Required | Type | Notes |
|-----------|----------|------|-------|
| `canvas_id` | Required | String | Canvas identifier from dashboard |
| `context` | Optional | Object | Canvas entry properties; key-value pairs for all users; max 50 KB |
| `broadcast` | Optional | Boolean | Default `false`. Set `true` to send to entire target segment — cannot include `recipients` when `true` |
| `audience` | Optional | Object | Connected audience filters (custom attributes, subscription status, etc.) |
| `recipients` | Optional | Array | Max 50 objects. If omitted and `broadcast: true`, sends to entire Canvas segment |

**`recipients` object fields:**
- One of `external_user_id`, `user_alias`, or `email` is required (specify only one)
- `prioritization` — required when using `email` as identifier
- `context` — per-user key-value pairs; overrides conflicting keys from root `context`
- `send_to_existing_only` — default `true`; set `false` to create new users (requires `attributes`); cannot be used with `user_alias`
- `attributes` — sets/overwrites user profile attributes before sending

---

### Example Request (curl)

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/canvas/trigger/send' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "canvas_id": "canvas_identifier",
  "context": {"product_name": "shoes", "product_price": 79.99},
  "broadcast": false,
  "audience": {
    "AND": [
      {"custom_attribute": {"custom_attribute_name": "eye_color", "comparison": "equals", "value": "blue"}},
      {"custom_attribute": {"custom_attribute_name": "favorite_foods", "comparison": "includes_value", "value": "pizza"}},
      {"OR": [
        {"custom_attribute": {"custom_attribute_name": "last_purchase_time", "comparison": "less_than_x_days_ago", "value": 2}},
        {"push_subscription_status": {"comparison": "is", "value": "opted_in"}}
      ]},
      {"email_subscription_status": {"comparison": "is_not", "value": "subscribed"}},
      {"last_used_app": {"comparison": "after", "value": "2019-07-22T13:17:55+0000"}}
    ]
  },
  "recipients": [{
    "external_user_id": "user_identifier",
    "send_to_existing_only": true,
    "attributes": {"first_name": "Alex"}
  }]
}'
```

---

### Response

**Success (201):**
```json
{
  "notice": "The Canvas is paused. Resume the Canvas to ensure trigger requests will take effect.",
  "dispatch_id": "example_dispatch_id",
  "message": "success"
}
```

- `dispatch_id` — unique transmission ID; returned in all successful responses
- If Canvas is archived/paused/stopped, the request returns 201 but does **not** send — the `notice` field explains the state
- Fatal errors return error codes per the standard Errors and Responses spec

---

### Key Behaviors

- **`send_to_existing_only: true` (default)** — only sends to users already in Braze
- **`send_to_existing_only: false`** — Braze creates a new user profile if the ID doesn't exist; must include `attributes`
- **`broadcast: true`** — sends to entire Canvas segment; `recipients` array must be omitted
- **`context` override order** — recipient-level `context` overrides root-level `context` on key conflicts
- Archived, paused, or stopped Canvases will not send but return a 201 with a `notice` field
