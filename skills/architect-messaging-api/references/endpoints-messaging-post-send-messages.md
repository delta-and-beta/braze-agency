---
name: endpoints-messaging-post-send-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/send_messages/post_send_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - messaging
  - recipients
  - audience
  - broadcast
  - attributes
  - trigger
  - delivery
  - segment
  - api
triggers:
  - send canvas messages
  - trigger message delivery
  - filter message recipients
  - broadcast to segment
---
## POST /canvas/trigger/send

Send Canvas messages via API-triggered delivery. Allows storing message content in Braze while controlling timing and recipients via API.

**Requires API key with `canvas.trigger.send` permission.**

---

## Request

```
POST https://rest.iad-01.braze.com/canvas/trigger/send
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

### Body Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `canvas_id` | Required | String | Canvas identifier (found in Braze dashboard when building a Canvas) |
| `context` | Optional | Object | Entry properties as key-value pairs applied to all users. Max 50 KB. |
| `broadcast` | Optional | Boolean | Set to `true` to send to the entire Canvas target segment. Defaults to `false`. Cannot be combined with `recipients`. |
| `audience` | Optional | Connected audience object | Filters recipients by custom attributes, subscription status, etc. |
| `recipients` | Optional | Array | Up to 50 objects. If omitted and `broadcast: true`, sends to full target segment. |

### Recipients Object Fields

Each recipient requires exactly one identifier: `external_user_id`, `user_alias`, or `email`.

| Field | Notes |
|-------|-------|
| `user_alias` | User alias object |
| `external_user_id` | External identifier string |
| `email` | Must include `prioritization` array when used |
| `prioritization` | Required when `email` is the identifier |
| `context` | Per-user key-value pairs; override parent `context` on key conflicts |
| `send_to_existing_only` | Defaults to `true`; cannot be used with user aliases |
| `attributes` | Creates/updates user attributes before sending; overwrites existing values |

---

## Example Request

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
    "user_alias": {"alias_name": "example_name", "alias_label": "example_label"},
    "external_user_id": "user_identifier",
    "send_to_existing_only": true,
    "attributes": {"first_name": "Alex"}
  }]
}'
```

---

## Response

Returns HTTP `201` with `dispatch_id` on success.

```json
{
  "notice": "The Canvas is paused. Resume the Canvas to ensure trigger requests will take effect.",
  "dispatch_id": "example_dispatch_id",
  "message": "success"
}
```

**`notice` values by Canvas state:**
- Archived: `"The Canvas is archived. Unarchive the Canvas to ensure trigger requests will take effect."`
- Paused: `"The Canvas is paused. Resume the Canvas to ensure trigger requests will take effect."`

The `dispatch_id` is a unique ID per transmission from Braze.

---

## Key Considerations

- **`send_to_existing_only: true`** (default) — message only goes to existing Braze users.
- **`send_to_existing_only: false`** — requires an `attributes` object; Braze creates a new user with that ID and attributes if none exists.
- **`broadcast: true`** — cannot include a `recipients` list; use carefully to avoid unintended large sends.
- Canvas must be active (not archived/paused/stopped) to send; endpoint returns a `notice` but does not error on inactive Canvas.
