---
name: endpoints-translations-put-update-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/email_templates/put_update_template
indexed_at: '2026-04-05'
keywords:
  - endpoint
  - translations
  - template
  - locale
  - email
  - update
  - api
  - parameters
  - authentication
  - request
triggers:
  - update template translations
  - translate email templates
  - manage template locales
  - email localization
  - translation api endpoint
---
## PUT Update Translation Template

Update translations for an email template.

**Endpoint:** `PUT /templates/email/translations/`

> Early access/beta feature.

### Prerequisites

API key with `templates.translations.update` permission.

### Rate Limits

Applies to translation endpoints (standard Braze rate limits).

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `template_id` | Yes | String | ID of the email template |
| `locale_id` | Yes | String | ID of the locale |
| `translation_map` | Yes | Object | Key-value map of translation IDs to translated strings |

> All translation IDs are UUIDs — retrieve them from the corresponding GET endpoint response.

### Example Request

```json
{
    "template_id": "e24404b3-3626-4de0-bdec-06935f3aa0ab",
    "locale_id": "h94404b3-3626-4de0-bdec-06935f3aa0ad",
    "translation_map": {
        "id_0": "¡Hola!",
        "id_1": "Me llamo Jacky",
        "id_2": "¿Dónde está la biblioteca?"
    }
}
```

### Responses

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `400` | Bad request (parse error in translations) |
| `404` | Template or locale not found |
| `429` | Rate limit exceeded |

**Success (200):**
```json
{ "message": "success" }
```

**Error (400):**
```json
{
    "errors": [
        {
            "id": "1234567-abc-123-012345678",
            "message": "The provided translations yielded errors when parsing. Please contact Braze for more information."
        }
    ]
}
```

### Notes

- No path parameters — all inputs go in the request body.
- Translation IDs (`id_0`, `id_1`, etc.) must match IDs returned by the GET translations endpoint; they cannot be invented.
- Contact Braze support for `400` parse errors, as the cause is not surfaced in the response.
