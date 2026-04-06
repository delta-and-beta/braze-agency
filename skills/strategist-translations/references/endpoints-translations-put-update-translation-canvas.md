---
name: endpoints-translations-put-update-translation-canvas
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/canvas/put_update_translation_canvas
indexed_at: '2026-04-05'
keywords:
  - canvas
  - translations
  - locale
  - workflow
  - variations
  - endpoint
  - authentication
  - draft
  - beta
  - message
triggers:
  - update canvas translations
  - translate canvas steps
  - set translation mappings
  - how to translate canvas messages
  - update message variation translations
---
## PUT /canvas/translations

Update multiple translations for a Canvas step. Requires saving as a draft first if the Canvas has already been launched.

**Status:** Early access / beta

## Authentication

API key with `canvas.translations.update` permission.

## Rate Limiting

Applies standard translation endpoint rate limits.

## Request

**Method:** `PUT`  
**Endpoint:** `/canvas/translations`

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `workflow_id` | Yes | String | Canvas ID |
| `step_id` | Yes | String | Canvas step ID |
| `message_variation_id` | Yes | String | Message variation ID |
| `locale_id` | Yes | String | Locale UUID |
| `translation_map` | Yes | Object | New translations keyed by translation ID |

All IDs are UUIDs. Translation IDs can be retrieved from the GET translations endpoint response.

### Example Request Body

```json
{
    "workflow_id": "a74404b3-3626-4de0-bdec-06935f3aa0ad",
    "step_id": "a74404b3-3626-4de0-bdec-06935f3aa0ac",
    "message_variation_id": "a74404b3-3626-4de0-bdec-06935f3aa0ac",
    "locale_id": "h94404b3-3626-4de0-bdec-06935f3aa0ad",
    "translation_map": {
        "id_3": "Ein Absatz ohne Formatierung"
    }
}
```

## Response

| Status | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad request (invalid locale, malformed body) |
| `404` | Canvas/step/variation not found |
| `429` | Rate limit exceeded |

### Success (200)

```json
{ "message": "success" }
```

### Error (400)

```json
{
    "errors": [
        { "message": "The provided locale code does not exist." }
    ]
}
```

## Notes

- `translation_map` keys are translation IDs (not locale codes) — retrieve them from the GET endpoint
- Canvas must be saved as a draft before updating translations post-launch
