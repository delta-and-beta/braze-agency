---
name: endpoints-templates-get-content-blocks-info
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/content_blocks_templates/get_see_email_content_blocks_information
indexed_at: '2026-04-05'
keywords:
  - content_blocks
  - retrieve
  - endpoint
  - info
  - identifier
  - inclusion
  - campaigns
  - canvases
  - tags
  - permission
triggers:
  - retrieve content block information
  - get content block details
  - find where content block is used
  - check content block inclusion data
---
## GET /content_blocks/info

Retrieve information for an existing Content Block.

**Required permission:** `content_blocks.info`
**Rate limit:** Default

## Request

```
GET https://rest.iad-01.braze.com/content_blocks/info
```

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `content_block_id` | Required | String | The Content Block identifier (find via API list call or API Keys page) |
| `include_inclusion_data` | Optional | Boolean | If `true`, returns Message Variation API identifiers for campaigns/Canvases using this block |

### Example

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/content_blocks/info?content_block_id={{content_block_id}}&include_inclusion_data=false' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response

```json
{
  "content_block_id": "string",
  "name": "string",
  "content": "string",
  "description": "string",
  "content_type": "html | text",
  "tags": ["string"],
  "created_at": "ISO 8601 timestamp",
  "last_edited": "ISO 8601 timestamp",
  "inclusion_count": 0,
  "inclusion_data": [],
  "message": "success"
}
```

## Errors

| Error | Resolution |
|---|---|
| `Content Block ID cannot be blank` | Ensure `content_block_id` is present and quoted |
| `Content Block ID is invalid for this workspace` | Block doesn't exist or belongs to a different workspace |
| `Content Block has been deleted—content not available` | Block was deleted |
| `Include Inclusion Data—error` | `include_inclusion_data` must be a bare boolean (`true`/`false`), not a quoted string |
