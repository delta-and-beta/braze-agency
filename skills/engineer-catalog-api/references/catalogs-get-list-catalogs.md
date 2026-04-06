---
name: catalogs-get-list-catalogs
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/catalogs/catalog_management/synchronous/get_list_catalogs
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - list
  - endpoint
  - schema
  - fields
  - permissions
  - workspace
  - items
  - synchronous
triggers:
  - list all catalogs
  - get catalogs
  - view catalogs
  - retrieve catalog list
  - show available catalogs
---
## List Catalogs

**Endpoint:** `GET /catalogs`

Returns a list of all catalogs in a workspace.

**Required permission:** `catalogs.get`

**Rate limit:** Synchronous catalog rate limit applies.

**No path or request parameters.**

### Example Request

```bash
curl --location --request GET 'https://rest.iad-03.braze.com/catalogs' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response (200)

Returns an array of catalog objects under `catalogs`.

```json
{
  "catalogs": [
    {
      "description": "My Restaurants",
      "fields": [
        { "name": "id", "type": "string" },
        { "name": "Name", "type": "string" },
        { "name": "City", "type": "string" },
        { "name": "Cuisine", "type": "string" },
        { "name": "Rating", "type": "number" },
        { "name": "Loyalty_Program", "type": "boolean" },
        { "name": "Created_At", "type": "time" }
      ],
      "name": "restaurants",
      "num_items": 10,
      "updated_at": "2022-11-02T20:04:06.879+00:00"
    }
  ],
  "message": "success"
}
```

### Catalog Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Catalog identifier |
| `description` | string | Human-readable label |
| `fields` | array | Schema definition — each entry has `name` and `type` |
| `num_items` | number | Count of items in the catalog |
| `updated_at` | string (ISO 8601) | Last modification timestamp |

### Supported Field Types

`string`, `number`, `boolean`, `time`
