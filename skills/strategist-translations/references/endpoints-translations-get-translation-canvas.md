---
name: endpoints-translations-get-translation-canvas
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/canvas/get_translation_canvas
indexed_at: '2026-04-05'
keywords:
  - canvas
  - translations
  - workflow
  - step
  - message
  - variation
  - locale
  - preview
  - draft
  - endpoint
triggers:
  - retrieve translated message
  - get canvas translation preview
  - check message variation locale
  - fetch translation draft version
---
## GET /canvas/translations

Retrieve a preview of a translated message for a Canvas step.

**Permission required:** `canvas.translations.get`

> Early access / beta endpoint.

### Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `workflow_id` | Yes | String | Canvas ID |
| `step_id` | Yes | String | Canvas step ID |
| `message_variation_id` | Yes | String | Message variation ID |
| `locale_id` | No | String | Locale UUID |
| `post_launch_draft_version` | No | Boolean | `true` returns latest draft; `false` (default) returns latest live version |

All translation IDs are UUIDs, obtainable from this endpoint's response.

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-03.braze.com/canvas/translations/?workflow_id={workflow_id}&step_id={step_id}&message_variation_id={message_variation_id}&locale_id={locale_uuid}&post_launch_draft_version=true' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Responses

**200 Success**

```json
{
    "translations": [
        {
            "translation_map": {
                "id_0": "¡Hola!",
                "id_1": "Me llamo Jacky",
                "id_2": "¿Dónde está la biblioteca?"
            },
            "locale": {
                "uuid": "c7c12345-te35-1234-5678-abcdefa99r3f",
                "name": "es-MX",
                "country": "MX",
                "language": "es",
                "locale_key": "es-mx"
            }
        }
    ]
}
```

**400 Error**

```json
{
    "errors": [
        {
            "message": "The provided locale code does not exist."
        }
    ]
}
```

Other status codes: `404` (not found), `429` (rate limited).
