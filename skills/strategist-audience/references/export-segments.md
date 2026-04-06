---
name: export-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/segments/post_cancel_export
indexed_at: '2026-04-05'
keywords:
  - segment
  - export
  - cancel
  - endpoint
  - API
  - REST
  - authorization
  - permission
triggers:
  - how to cancel segment exports
  - cancel ongoing exports
  - stop segment export
  - export segment cancellation
  - cancel segment data export
---
## Cancel Segment Exports

**Endpoint:** `POST /export/segment/cancel`

Cancels all ongoing exports for a specified segment ID.

**Required permission:** `segments.list`

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `segment_id` | Yes | String | The segment whose ongoing exports to cancel. |

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/export/segment/cancel' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "segment_id": "segment_identifier"
}'
```

**Rate limit:** Default Braze rate limit applies.
