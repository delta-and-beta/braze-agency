---
name: endpoints-translations-get-translation-content-block
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/content_blocks/get_translation_content_block
indexed_at: '2026-04-05'
keywords:
  - translations
  - contentblocks
  - locale
  - endpoint
  - REST
  - localization
  - multilingual
  - internationalization
  - languages
triggers:
  - retrieve content block translations
  - get translations by locale
  - fetch multilingual content
  - filter translations by language
---
## GET /content_blocks/translations

Retrieve all translations for a Content Block, optionally filtered by locale.

**Required permission:** `content_blocks.translations.get`
**Rate limit:** Translation endpoints rate limit applies.

> Early access / beta feature.

## Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `content_block_id` | Required | String | ID of the Content Block |
| `locale_id` | Optional | String | Locale UUID to filter results |

Translation IDs are UUIDs, available in the GET response.

## Example Request

```bash
curl --location --request GET \
  'https://rest.iad-03.braze.com/content_blocks/translations?content_block_id={content_block_id}&locale_id={locale_uuid}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response

**Status codes:** `200`, `400`, `404`, `429`

### 200 Success

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
        },
        {
            "translation_map": {
                "id_0": "你好",
                "id_1": "我的名字是 Jacky",
                "id_2": "圖書館在哪裡?"
            },
            "locale": {
                "uuid": "a1b12345-cd35-1234-5678-abcdefa99r3f",
                "name": "zh-HK",
                "country": "HK",
                "language": "zh",
                "locale_key": "zh-hk"
            }
        }
    ]
}
```

### 400 Error

```json
{
    "errors": [
        {
            "message": "This message does not support multi-language."
        }
    ]
}
```

Each translation entry contains a `translation_map` (keyed by string IDs) and a `locale` object with `uuid`, `name`, `country`, `language`, and `locale_key` fields.
