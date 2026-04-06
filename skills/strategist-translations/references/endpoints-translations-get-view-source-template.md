---
name: endpoints-translations-get-view-source-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/email_templates/get_view_source_template
indexed_at: '2026-04-05'
keywords:
  - translations
  - template
  - email
  - source
  - localization
  - endpoint
  - query
  - workflow
  - mapping
  - REST
triggers:
  - retrieve source translations
  - get email template translations
  - translate email content
  - extract translatable text
  - email localization workflow
---
## GET /templates/email/translations/source

Retrieves the source translations for an email template.

**Required permission:** `templates.email.info`

**Rate limit:** Translation endpoints rate limit applies.

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `template_id` | Required | String | The email template ID |

### Example Request

```bash
curl --request GET \
  'https://rest.iad-03.braze.com/templates/email/translations/source?template_id={template_id}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

**Success (200)**

```json
{
    "translations": {
        "translation_map": {
            "id_0": "Here's a limited time offer for your membership tier!",
            "id_1": "Welcome to a new fashion-forward season!"
        }
    },
    "message": "success"
}
```

The `translation_map` contains key-value pairs where keys are internal IDs and values are the source text strings extracted from the template.

**Error (400)**

```json
{
    "errors": [
        {
            "message": "The provided locale code does not exist."
        }
    ]
}
```

**Status codes:** `200` (success), `400` (bad request), `404` (not found), `429` (rate limited)

### Notes

- This endpoint is in early access/beta.
- Use in conjunction with the translation workflow for localizing email templates.
- The `translation_map` keys (`id_0`, `id_1`, etc.) correspond to translatable text blocks within the template.
