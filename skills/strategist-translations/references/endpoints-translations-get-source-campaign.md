---
name: endpoints-translations-get-source-campaign
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/campaigns/get_source_campaign
indexed_at: '2026-04-05'
keywords:
  - translations
  - campaigns
  - sources
  - endpoint
  - locale
  - messaging
  - variations
  - API
  - draft
  - multilingual
triggers:
  - retrieve translation sources
  - get campaign translations
  - fetch default source values
  - retrieve message variation translations
  - get translation content
---
## GET Campaign Translation Sources

Retrieve all default translation source values (the `source` content within `{% translation id %} source {% endtranslation %}` tags) for a campaign's translation tags.

**Early Access / Beta feature.**

**Endpoint:** `GET /campaigns/translations/source`

## Prerequisites

API key with `campaigns.translations.get` permission.

## Rate Limit

Applies to translation endpoints (see Braze rate limit docs).

## Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | Campaign ID |
| `message_variation_id` | Required | String | Message variation ID |
| `locale_id` | Optional | String | UUID to filter responses to a single locale |
| `post_launch_draft_version` | Optional | Boolean | `true` returns latest draft; `false` (default) returns latest live/published version |

All translation IDs are UUIDs. They can be found in GET endpoint responses.

## Example Request

```bash
curl --location --request GET \
  'https://rest.iad-03.braze.com/campaigns/translations/source?campaign_id={campaign_id}&message_variation_id={message_variation_id}&locale_id={locale_uuid}&post_launch_draft_version=true' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response Codes

`200` Success | `400` Bad Request | `404` Not Found | `429` Rate Limited

### 200 Success

```json
{
  "translations": {
    "translation_map": {
      "id_0": "Here's a Million Dollars",
      "id_1": "Hello World!"
    }
  },
  "message": "success"
}
```

The `translation_map` keys are translation tag IDs; values are the default source strings.

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

Common cause: the target message variation does not have multi-language/translation support enabled.
