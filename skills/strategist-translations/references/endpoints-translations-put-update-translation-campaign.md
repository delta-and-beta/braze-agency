---
name: endpoints-translations-put-update-translation-campaign
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/campaigns/put_update_translation_campaign
indexed_at: '2026-04-05'
keywords:
  - translations
  - campaigns
  - localization
  - message-variations
  - locale
  - multilingual
  - campaign-messaging
  - internationalization
triggers:
  - update campaign translations
  - change campaign language variants
  - modify message translations by locale
  - translate campaign messages
  - update multilingual campaign content
---
## PUT /campaigns/translations — Update Campaign Translation

Updates one or more translations for a campaign message variation.

**Note:** This endpoint is in early access/beta. To update translations on a launched campaign, save the message as a draft first.

### Prerequisites

- API key with `campaigns.translations.update` permission
- All locale/translation IDs are UUIDs (retrieve from the GET translations endpoint)

### Rate Limit

Applies to translation endpoints rate limit tier.

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `campaign_id` | Yes | String | ID of the campaign |
| `message_variation_id` | Yes | String | ID of the message variation |
| `locale_id` | Yes | String (UUID) | ID of the locale to update |
| `translation_map` | Yes | Object | Key-value pairs of translation IDs to new translated strings |

No path parameters.

### Example Request

```json
{
    "campaign_id": "e24404b3-3626-4de0-bdec-06935f3aa0ab",
    "message_variation_id": "f14404b3-3626-4de0-bdec-06935f3aa0ad",
    "locale_id": "h94404b3-3626-4de0-bdec-06935f3aa0ad",
    "translation_map": {
        "id_3": "Ein Absatz ohne Formatierung"
    }
}
```

### Responses

| Status | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad request (e.g., invalid locale code) |
| `404` | Resource not found |
| `429` | Rate limit exceeded |

**Success (200):**
```json
{ "message": "success" }
```

**Error (400):**
```json
{
    "errors": [
        { "message": "The provided locale code does not exist." }
    ]
}
```

`★ Insight ─────────────────────────────────────`
- The `translation_map` object keys (`"id_3"`) are translation element IDs within the message, not locale identifiers — the locale is separate (`locale_id`). This two-level addressing (variation → locale → element) reflects Braze's layered localization model.
- The "save as draft first" requirement for launched campaigns is a critical workflow constraint worth surfacing in topic files — it's easy to miss and causes friction.
`─────────────────────────────────────────────────`
