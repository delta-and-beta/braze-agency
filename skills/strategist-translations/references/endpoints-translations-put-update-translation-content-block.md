---
name: endpoints-translations-put-update-translation-content-block
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/translations/content_blocks/put_update_translation_content_block
indexed_at: '2026-04-05'
keywords:
  - translations
  - content-blocks
  - locale
  - localization
  - multilingual
  - i18n
  - endpoint
  - update
triggers:
  - update content block translations
  - translate content blocks
  - set translations for locale
  - how to translate content blocks
  - update translation content
---
## PUT /content_blocks/translations — Update Translation Content Block

Updates multiple translations for a Content Block. (Early access / beta endpoint.)

**Permission required:** `content_blocks.translations.update`

**Rate limit:** Translation endpoints rate limit applies.

---

### Request

```
PUT /content_blocks/translations
```

**No path parameters.**

| Parameter | Required | Type | Description |
|---|---|---|---|
| `content_block_id` | Yes | String | ID of the Content Block |
| `locale_id` | Yes | String (UUID) | ID of the locale to update |
| `translation_map` | Yes | Object | Key-value pairs of translation IDs to new translated strings |

> Translation IDs are UUIDs retrievable from the corresponding GET endpoint response.

**Example request body:**

```json
{
    "content_block_id": "e24404b3-3626-4de0-bdec-06935f3aa0ab",
    "locale_id": "h94404b3-3626-4de0-bdec-06935f3aa0ad",
    "translation_map": {
        "id_3": "Ein Absatz ohne Formatierung"
    }
}
```

---

### Responses

| Status | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad request (e.g., invalid locale code) |
| `404` | Resource not found |
| `429` | Rate limit exceeded |

**200 Success:**
```json
{ "message": "success" }
```

**400 Error:**
```json
{
    "errors": [
        { "message": "The provided locale code does not exist." }
    ]
}
```
