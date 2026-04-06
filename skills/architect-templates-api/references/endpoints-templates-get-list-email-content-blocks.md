---
name: endpoints-templates-get-list-email-content-blocks
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/content_blocks_templates/get_list_email_content_blocks
indexed_at: '2026-04-05'
keywords:
  - content_blocks
  - list
  - pagination
  - filtering
  - dates
  - retrieval
  - endpoint
  - query
  - parameters
  - liquid
triggers:
  - list content blocks
  - retrieve content blocks
  - filter content blocks by date
  - paginate through content blocks
  - get content blocks with filtering
---
## GET /content_blocks/list

Lists existing Content Blocks with optional date filtering and pagination.

**Required permission:** `content_blocks.list`
**Rate limit:** Default

### Request

```
GET https://rest.iad-01.braze.com/content_blocks/list
Authorization: Bearer YOUR-API-KEY-HERE
```

### Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `modified_after` | Optional | ISO-8601 string | Return only Content Blocks updated at or after this time |
| `modified_before` | Optional | ISO-8601 string | Return only Content Blocks updated at or before this time |
| `limit` | Optional | Positive integer | Max results to return. Default: 100, max: 1000 |
| `offset` | Optional | Positive integer | Number of Content Blocks to skip |

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/content_blocks/list?modified_after=2020-01-01T01:01:01.000000&modified_before=2020-02-01T01:01:01.000000&limit=100&offset=1' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

### Response

```json
{
  "count": "integer",
  "content_blocks": [
    {
      "content_block_id": "string",
      "name": "string",
      "content_type": "html | text",
      "liquid_tag": "string",
      "inclusion_count": "integer",
      "created_at": "ISO 8601 string",
      "last_edited": "ISO 8601 string",
      "tags": ["string"]
    }
  ]
}
```

### Errors

| Error | Fix |
|---|---|
| `Modified after time is invalid` | Use ISO 8601 format: `yyyy-mm-ddThh:mm:ss.ffffff` |
| `Modified before time is invalid` | Use ISO 8601 format: `yyyy-mm-ddThh:mm:ss.ffffff` |
| `Modified after time must be earlier than or the same as modified before time` | Ensure `modified_after` < `modified_before` |
| `Content Block number limit is invalid` | `limit` must be a positive integer > 0 |
| `Content Block number limit must be greater than 0` | Set `limit` > 0 |
| `Content Block number limit exceeds maximum of 1000` | Set `limit` ≤ 1000 |
| `Offset is invalid` / `Offset must be greater than 0` | Set `offset` to a positive integer > 0 |
