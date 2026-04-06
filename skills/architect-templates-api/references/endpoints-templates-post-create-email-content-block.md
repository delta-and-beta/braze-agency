---
name: endpoints-templates-post-create-email-content-block
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/content_blocks_templates/post_create_email_content_block
indexed_at: '2026-04-05'
keywords:
  - content-blocks
  - create
  - email
  - templates
  - liquid
  - reusable
  - HTML
  - tags
  - draft
  - blocks
triggers:
  - create a content block
  - add content to email templates
  - set up reusable content blocks
  - create draft content block
  - configure email content blocks
---
## POST /content_blocks/create

Creates a new Content Block for reuse across email templates.

**Required permission:** `content_blocks.create`
**Rate limit:** Default Braze rate limit

### Request

```
POST https://rest.iad-01.braze.com/content_blocks/create
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "name": "content_block",
  "description": "This is my Content Block",
  "content": "HTML content within block",
  "state": "draft",
  "tags": ["marketing"]
}
```

### Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `name` | Required | String | Max 100 chars. Alphanumeric, `-`, `_` only. |
| `content` | Required | String | HTML or plain text. Max 50 KB. |
| `description` | Optional | String | Max 250 chars. |
| `state` | Optional | String | `active` (default) or `draft`. |
| `tags` | Optional | String array | Tags must already exist in Braze. |

### Response

```json
{
  "content_block_id": "string",
  "liquid_tag": "string",
  "created_at": "2024-01-01T00:00:00Z",
  "message": "success"
}
```

The `liquid_tag` is auto-generated from the block name and used to reference the block in templates.

### Common Errors

| Error | Fix |
|---|---|
| `Content must be smaller than 50kb` | Reduce content size. |
| `Content contains malformed liquid` | Validate Liquid syntax before sending. |
| `Content Block name can only contain alphanumeric characters` | Use only `A-Z`, `0-9`, `-`, `_`. No special chars or emojis. |
| `Content Block with this name already exists` | Use a unique name. |
| `Some tags could not be found` | Pre-create all tags in Braze before referencing. |
| `Content Block cannot be referenced within itself` | Remove self-referencing Liquid tags. |
