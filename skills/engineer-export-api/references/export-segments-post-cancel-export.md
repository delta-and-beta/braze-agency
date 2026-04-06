---
name: export-segments-post-cancel-export
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/segments/post_cancel_export
indexed_at: '2026-04-05'
keywords:
  - export
  - segment
  - cancel
  - endpoint
  - API
  - authentication
  - bulk
  - permission
  - request
triggers:
  - cancel segment export
  - stop segment export
  - halt ongoing exports
  - cancel export job
---
## Cancel Segment Export

**Endpoint:** `POST /export/segment/cancel`

Cancels all ongoing exports for a specified segment ID.

**Required permission:** `segments.list` API key

---

### Request

```
POST https://rest.iad-01.braze.com/export/segment/cancel
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

**Body:**

```json
{
  "segment_id": "segment_identifier"
}
```

| Parameter | Required | Type | Description |
|---|---|---|---|
| `segment_id` | Yes | String | ID of the segment whose exports to cancel |

---

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/export/segment/cancel' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "segment_id": "segment_identifier"
}'
```

---

**Notes:**
- Cancels *all* ongoing exports for the given segment, not a single export job
- Rate limit: default endpoint limits apply
