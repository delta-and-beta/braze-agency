---
name: export-canvas-get-canvas-details
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/canvas/get_canvas_details
indexed_at: '2026-04-05'
keywords:
  - canvas
  - details
  - metadata
  - endpoint
  - variants
  - steps
  - channels
  - workflow
  - structure
  - response
triggers:
  - get canvas details
  - fetch canvas metadata
  - retrieve canvas structure
  - canvas steps and variants
  - query canvas information
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — each file should be self-contained enough that an agent can answer questions from it alone, without needing to cross-reference other files. Stripping Jekyll liquid tags (`{% %}`) and internal `{{site.baseurl}}` links is essential since those are meaningless outside the source docs site.
`─────────────────────────────────────────────────`

## GET /canvas/details

Exports metadata about a Canvas — name, creation time, status, steps, variants, and more.

**Required permission:** `canvas.details`

### Request

```
GET https://rest.iad-01.braze.com/canvas/details
Authorization: Bearer YOUR-REST-API-KEY
```

**Parameters:**

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `canvas_id` | Required | String | Canvas API identifier |
| `post_launch_draft_version` | Optional | Boolean | If `true`, includes post-launch draft changes. Default: `false` |
| `include_has_translatable_content` | Optional | Boolean | If `true`, adds `has_translatable_content` field to each message. Default: `false` |

**Example:**

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/canvas/details?canvas_id={{canvas_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Structure

```json
{
  "created_at": "ISO 8601 date",
  "updated_at": "ISO 8601 date",
  "name": "string",
  "description": "string",
  "archived": false,
  "draft": false,
  "enabled": true,
  "has_post_launch_draft": false,
  "schedule_type": "string",
  "first_entry": "ISO 8601 date",
  "last_entry": "ISO 8601 date",
  "channels": ["email", "push", "sms", "in_app_message"],
  "variants": [
    {
      "name": "string",
      "id": "string",
      "first_step_ids": ["step_id"],
      "first_step_id": "string"
    }
  ],
  "tags": ["string"],
  "teams": ["string"],
  "steps": [
    {
      "name": "string",
      "type": "string",
      "id": "string",
      "next_step_ids": ["string"],
      "next_paths": [
        { "name": "string", "next_step_id": "string" }
      ],
      "channels": ["string"],
      "messages": {
        "<message_variation_id>": {
          "channel": "string",
          "has_translatable_content": true
        }
      }
    }
  ],
  "message": "success"
}
```

**Key notes:**
- Every step has a `next_paths` array of `{name, next_step_id}` objects
- `next_paths.name` values: `"Yes"`/`"No"` for Decision Splits; group name for Audience/Action Paths; path name for Experiment Paths; `null` for other steps
- `next_step_ids` is present on Message steps but empty for other step types
- `has_translatable_content` is `true` if locales are configured with translation tags, `false` if not, `null` if detection failed — only present when `include_has_translatable_content=true`

### Multi-Channel Step Example

```json
{
  "steps": [
    {
      "name": "Welcome Email",
      "type": "email",
      "id": "step_1",
      "next_step_ids": ["step_2"],
      "next_paths": [{ "name": "Next Step", "next_step_id": "step_2" }],
      "channels": ["email"],
      "messages": {
        "message_1": {
          "channel": "email",
          "subject": "Welcome!",
          "body": "<html>...</html>"
        }
      }
    },
    {
      "name": "Follow-Up Push",
      "type": "push",
      "id": "step_2",
      "channels": ["push"],
      "messages": {
        "message_2": { "channel": "push", "title": "...", "body": "..." }
      }
    }
  ]
}
```

`★ Insight ─────────────────────────────────────`
Notice how the condensed topic drops all `{% alert %}` liquid blocks, `{: .reset-td-br-*}` table CSS classes, and `{{site.baseurl}}` links — these are Jekyll-specific and would appear as raw syntax in a plain markdown context. The response schema is trimmed to a single canonical shape rather than repeating both the annotated spec and the full example, which cuts ~60% of tokens while preserving 100% of actionable content.
`─────────────────────────────────────────────────`
