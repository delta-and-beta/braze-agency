---
name: endpoints-translations-get-view-translation-locale-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/email_templates/get_view_translation_locale_template
indexed_at: '2026-04-05'
keywords:
  - templates
  - translations
  - email
  - locale
  - localization
  - multilingual
  - internationalization
  - REST
  - API
triggers:
  - view email template translation
  - get template translation by locale
  - retrieve localized template
  - fetch template in different language
---
## GET /templates/translations/email

View a specific translation and locale for an email template.

> **Note:** This endpoint is in early access/beta.

### Prerequisites

API key with `templates.translations.get` permission.

### Rate Limit

Standard translation endpoint rate limits apply.

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `template_id` | Required | String | The email template ID |
| `locale_id` | Optional | String (UUID) | The locale ID |

Translation IDs are UUIDs, retrievable from the GET endpoint response.

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-03.braze.com/templates/translations/email?locale_id={locale_uuid}&template_id={template_id}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Codes

`200` success, `400` bad request, `404` not found, `429` rate limited.

#### 200 Success

```json
{
    "translations": [
        {
            "locale": {
                "uuid": "c7c12345-te35-1234-5678-abcdefa99r3f",
                "name": "es-MX",
                "country": "MX",
                "language": "es",
                "locale_key": "es-mx"
            },
            "translation_map": {
                "id_0": "¡Hola!",
                "id_1": "Me llamo Jacky",
                "id_2": "¿Dónde está la biblioteca?"
            }
        }
    ]
}
```

#### 400 Error

```json
{
    "errors": [
        {
            "message": "The provided locale code does not exist."
        }
    ]
}
```
