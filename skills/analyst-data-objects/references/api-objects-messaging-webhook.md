---
name: api-objects-messaging-webhook
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/messaging/webhook_object
indexed_at: '2026-04-05'
keywords:
  - webhook
  - messaging
  - HTTP
  - headers
  - payload
  - campaign
  - variation
  - Content-Type
triggers:
  - how to create webhook messages
  - how to send webhooks
  - webhook request configuration
  - how to configure webhook headers
  - webhook messaging setup
---
## Webhook Messaging Object

Used to create or modify webhook messages via Braze messaging endpoints.

### Schema

```json
{
  "url": (required, string),
  "request_method": (required, string) one of "POST", "PUT", "DELETE", or "GET",
  "request_headers": (optional, Hash) key-value pairs to use as request headers,
  "body": (optional, string) if you want to include a JSON object, make sure to escape quotes and backslashes,
  "message_variation_id": (optional, string) used when providing a campaign_id to specify which message variation this message should be tracked under
}
```

### Fields

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `url` | Yes | string | Webhook destination URL |
| `request_method` | Yes | string | `POST`, `PUT`, `DELETE`, or `GET` |
| `request_headers` | No | Hash | Key-value pairs sent as HTTP headers |
| `body` | No | string | Request body; escape quotes and backslashes in JSON strings |
| `message_variation_id` | No | string | Links to a campaign message variation when `campaign_id` is provided |

### Best Practice

Always set `Content-Type` explicitly in `request_headers`. If omitted, Braze infers it from the request body — this inference may produce inconsistent results as sender/server behavior can change over time.

```json
"request_headers": {
  "Content-Type": "application/json"
}
```

`★ Insight ─────────────────────────────────────`
- The `message_variation_id` field illustrates a common Braze pattern: all messaging objects support A/B test attribution by linking to campaign variations, keeping analytics tied to the message rather than computed at query time.
- Explicit `Content-Type` being a "best practice" rather than enforced reflects a real tradeoff in HTTP: servers infer type from body shape, but that heuristic breaks for ambiguous payloads (e.g., a JSON body without the header may be treated as `text/plain`).
`─────────────────────────────────────────────────`
