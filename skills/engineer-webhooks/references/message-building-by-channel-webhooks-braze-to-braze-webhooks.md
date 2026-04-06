---
name: message-building-by-channel-webhooks-braze-to-braze-webhooks
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/webhooks/braze_to_braze_webhooks
indexed_at: '2026-04-05'
keywords:
  - webhook
  - canvas
  - api-triggered
  - orchestration
  - authorization
  - rest-api
  - campaign
  - messaging
  - rate-limits
  - user-profile
triggers:
  - How to trigger a Canvas from another Canvas
  - Setting up Braze-to-Braze webhooks
  - When to use webhooks for orchestration
  - Configuring webhook headers and authentication
  - Canvas webhook request body example
---
## Braze-to-Braze Webhooks

Call the Braze REST API from within Braze using a webhook in a Campaign or Canvas. Primary use case: orchestration tasks like triggering an API-triggered Canvas from another Canvas.

### When to Use (and When Not To)

**Use Braze-to-Braze webhooks for:**
- Triggering an API-triggered Canvas from another Canvas
- Calling Messaging endpoints for orchestration (one workflow invoking an API with no dedicated Canvas component)

**Do NOT use for user profile updates.** Use [User Update](https://www.braze.com/docs/user_guide/engagement_tools/canvas/canvas_components/user_update/) instead when modifying custom attributes, recording custom events, or recording purchases from Canvas. User Update batches changes together, is faster, and costs fewer data points.

### Prerequisites

An API key with permissions for the target endpoint. Example: triggering an API-triggered Canvas requires `canvas.trigger.send` permission.

### Setup Steps

1. Create a webhook (campaign or Canvas component)
2. Select **Blank Template**
3. **Compose** tab: set Webhook URL and Request Body
4. **Settings** tab: set HTTP Method and Request Headers
5. Configure delivery settings and build out the rest of the campaign/Canvas

### Example: Trigger a Second Canvas from a Canvas

**Second Canvas setup:**
1. Set Entry Schedule to **API-Triggered**
2. Note the **Canvas ID** — needed in the webhook body

**Webhook configuration:**

| Field | Value |
|---|---|
| Webhook URL | `https://rest.iad-XX.braze.com/canvas/trigger/send` (use your instance endpoint) |
| HTTP Method | `POST` |
| `Authorization` header | `Bearer YOUR_API_KEY` |
| `Content-Type` header | `application/json` |

**Request body:**
```json
{
  "canvas_id": "your_canvas_id",
  "recipients": [
    {
      "external_user_id": "{{${user_id}}}"
    }
  ]
}
```

### Key Considerations

- **Rate limits:** Braze-to-Braze webhooks are subject to API endpoint rate limits
- **Data points:** User profile updates via webhook consume data points; triggering messages via messaging endpoints does not
- **Anonymous users:** Use `braze_id` instead of `external_id` in the request body to target anonymous user profiles
- **Reuse:** Save as a Webhook Template for reuse across campaigns/Canvases
- **API key creation:** Dashboard → **Settings** → **API Keys**
