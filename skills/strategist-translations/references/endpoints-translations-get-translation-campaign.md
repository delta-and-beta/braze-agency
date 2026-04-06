---
name: endpoints-translations-get-translation-campaign
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/campaigns/get_translation_campaign
indexed_at: '2026-04-05'
keywords:
  - translations
  - campaigns
  - locales
  - messaging
  - variants
  - multilingual
  - internationalization
  - API
  - REST
triggers:
  - retrieve campaign translations
  - get translations for message variants
  - fetch localized content
  - retrieve multi-language translations
  - access campaign message translations
---
## GET /campaigns/translations

Retrieve all translations for each message variant in a campaign.

**Required permission:** `campaigns.translations.get`

**Rate limit:** Translation endpoints rate limit applies.

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | The campaign ID |
| `message_variation_id` | Required | String | The message variation ID |
| `locale_id` | Optional | String | UUID to filter by specific locale |
| `post_launch_draft_version` | Optional | Boolean | `true` returns latest draft version; `false` (default) returns latest live version |

> All translation IDs are UUIDs, retrievable from this endpoint's response.

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-03.braze.com/campaigns/translations?campaign_id={campaign_id}&message_variation_id={message_variation_id}&locale_id={locale_uuid}&post_launch_draft_version=true' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Codes

`200` — Success | `400` — Error | `404` — Not found | `429` — Rate limited

### 200 Success Response

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

### 400 Error Response

```json
{
    "errors": [
        {
            "message": "This message does not support multi-language."
        }
    ]
}
```

**Note:** This endpoint is in early access/beta.
