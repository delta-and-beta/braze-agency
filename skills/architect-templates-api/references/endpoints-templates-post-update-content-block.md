---
name: endpoints-templates-post-update-content-block
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/content_blocks_templates/post_update_content_block
indexed_at: '2026-04-05'
keywords:
  - content_block
  - update
  - POST
  - liquid
  - tags
  - state
  - draft
  - active
  - REST
  - API
triggers:
  - update content block
  - modify content block
  - change content block state
  - add tags to content block
  - generate liquid tag
---
## POST /content_blocks/update

Updates an existing Content Block.

**Required permission:** `content_blocks.update`
**Rate limit:** Default Braze rate limit

---

## Request

```
POST https://rest.iad-01.braze.com/content_blocks/update
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

### Body Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `content_block_id` | Required | String | Content Block's API identifier |
| `name` | Optional | String | Max 100 characters; alphanumeric, `-`, `_` only |
| `description` | Optional | String | Max 250 characters |
| `content` | Optional | String | HTML or text content |
| `state` | Optional | String | `active` or `draft`; defaults to `active` |
| `tags` | Optional | Array of strings | Tags must already exist in Braze |

**Note:** Name cannot be updated for active Content Blocks. To change from `active` to `draft`, create a new Content Block instead.

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/content_blocks/update' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_REST_API_KEY' \
--data-raw '{
  "content_block_id": "content_block_id",
  "name": "content_block",
  "description": "This is my Content Block",
  "content": "HTML or text content within block",
  "state": "draft",
  "tags": ["marketing"]
}'
```

---

## Response

```json
{
  "content_block_id": "string — API identifier of the block",
  "liquid_tag": "string — generated Liquid tag from block name",
  "created_at": "string — ISO 8601 timestamp",
  "message": "success"
}
```

---

## Common Errors

| Error | Fix |
|---|---|
| `Content must be smaller than 50kb` | Keep total block content under 50 KB |
| `Content contains malformed liquid` | Validate Liquid syntax before submitting |
| `Content Block name can only contain alphanumeric characters` | Use only `A-Z`, `a-z`, `0-9`, `-`, `_` |
| `Content Block with this name already exists` | Choose a unique name |
| `Content Block name cannot be updated for active Content Blocks` | Cannot rename an active block |
| `Active Content Block can not be updated to Draft` | Create a new Content Block instead |
| `Some tags could not be found` | Tags must be pre-created in Braze before use |
| `Tags must be an array` | Format as `["tag1", "tag2"]` |
| `Content Block cannot be referenced within itself` | Remove self-referencing Liquid tags |
