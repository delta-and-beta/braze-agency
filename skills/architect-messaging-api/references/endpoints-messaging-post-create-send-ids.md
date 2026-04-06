---
name: endpoints-messaging-post-create-send-ids
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/send_messages/post_create_send_ids
indexed_at: '2026-04-05'
keywords:
  - sends
  - campaign
  - messaging
  - tracking
  - identifiers
  - api
  - rest
  - performance
  - programmatic
  - scale
triggers:
  - create send ID
  - programmatic message sending
  - track message performance
  - send without campaign
  - performance tracking across sends
---
## POST /sends/id/create — Create Send IDs

Creates a send ID for programmatic message sending and performance tracking, without requiring campaign creation per send.

**Requires API key permission:** `sends.id.create`

### Request

```
POST https://rest.iad-01.braze.com/sends/id/create
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "campaign_id": "campaign_identifier",
  "send_id": "send_identifier"
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | The campaign to associate this send with |
| `send_id` | Optional | String | Custom send identifier; auto-generated if omitted |

### Example Request

```bash
curl --request POST 'https://rest.iad-01.braze.com/sends/id/create' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "campaign_id": "campaign_identifier",
    "send_id": "send_identifier"
  }'
```

### Response

```json
{
  "message": "success",
  "send_id": "<generated_send_identifier>"
}
```

### Notes

- Use send IDs when programmatically generating and sending content at scale
- The returned `send_id` can be used in subsequent message send calls to track performance across sends without creating individual campaigns
