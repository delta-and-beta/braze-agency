---
name: endpoints-translations-get-view-translation-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/email_templates/get_view_translation_template
indexed_at: '2026-04-05'
keywords:
  - translations
  - locales
  - templates
  - email
  - retrieve
  - endpoint
  - API
  - parameters
  - UUID
  - mappings
triggers:
  - view email template translations
  - get template translations and locales
  - retrieve translation template
  - list email template locales
  - view translation mapping
---
## GET /templates/email/translations/

View all translations and locales for an email template.

> **Early access/beta** feature.

### Prerequisites

API key with `templates.translations.get` permission.

### Rate Limit

Applies to translation endpoints (see Braze rate limits documentation).

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `template_id` | Required | String | The ID for your email template |

Note: All translation IDs are UUIDs, available in the GET endpoint's response.

### Example Request

```bash
curl --location --request GET 'https://rest.iad-03.braze.com/templates/email/translations/' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{"template_id": "6ad1507f-ca10-44c4-95bf-6e4gay901kc5"}'
```

### Response

**Status codes:** `200`, `400`, `404`, `429`

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
    },
    {
      "locale": {
        "uuid": "a1b12345-cd35-1234-5678-abcdefa99r3f",
        "name": "zh-HK",
        "country": "HK",
        "language": "zh",
        "locale_key": "zh-hk"
      },
      "translation_map": {
        "id_0": "你好",
        "id_1": "我的名字是 Jacky",
        "id_2": "圖書館在哪裡?"
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
