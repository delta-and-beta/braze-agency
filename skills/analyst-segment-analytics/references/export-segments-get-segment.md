---
name: export-segments-get-segment
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/segments/get_segment_details
indexed_at: '2026-04-05'
keywords:
  - segment
  - details
  - metadata
  - export
  - endpoint
  - API
  - permissions
  - identifier
  - tags
  - teams
triggers:
  - how to retrieve segment details
  - export segment metadata
  - get segment by ID
  - fetch segment information
  - look up segment properties
---
## Export Segment Details

**Endpoint:** `GET /segments/details`

Retrieves metadata for a specific segment by its ID.

**Required permission:** `segments.details`

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `segment_id` | Required | String | Found on the API Keys page in Braze, or via the Export Segment List endpoint |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/segments/details?segment_id={{segment_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-03-20T14:22:00Z",
  "name": "High-value users",
  "description": "Users who purchased > $100",
  "text_description": "Segment of high-value users",
  "tags": ["vip", "purchasers"],
  "teams": ["Growth", "Retention"]
}
```

### Key Notes

- `segment_id` can be found on the **API Keys** page in your Braze account
- `created_at` and `updated_at` are ISO 8601 formatted strings
- `tags` and `teams` are string arrays
- Subject to default rate limits
