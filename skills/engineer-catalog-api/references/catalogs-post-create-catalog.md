---
name: catalogs-post-create-catalog
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/catalogs/catalog_selections/asynchronous/post_create_catalog_selections
indexed_at: '2026-04-05'
keywords:
  - catalog
  - selection
  - filters
  - sorting
  - endpoint
  - Shopify
  - source
  - external_id
  - permissions
  - fields
triggers:
  - create catalog selection
  - filter catalog items
  - sort catalog results
  - set up catalog filters
  - define catalog selection criteria
---
# Create Catalog Selection

**Endpoint:** `POST /catalogs/{catalog_name}/selections`

**Permission required:** `catalogs.create_selection`

**Rate limit:** Asynchronous catalog selections rate limit applies.

---

## Path Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `catalog_name` | Required | Name of the catalog |

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `selection` | Required | Object | Selection criteria object |

### Selection Object Fields

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | Required | String | Name of the catalog selection |
| `description` | Optional | String | Description of the selection |
| `external_id` | Required | String | Unique identifier for the selection |
| `source` | Required | String | `"Shopify"` for Shopify catalogs, `"custom"` for custom catalogs |
| `filters` | Optional | Array | Filter objects (max 4 per API request, 10 via dashboard). If omitted, all items included |
| `results_limit` | Optional | Integer | Max results to return (1–50) |
| `sort_field` | Optional | String | Field to sort by. Must be paired with `sort_order`; omitting both randomizes results |
| `sort_order` | Optional | String | `"asc"` or `"desc"`. Must be paired with `sort_field` |

### Filter Operators by Field Type

| Field Type | Supported Operators |
|------------|---------------------|
| `string` | `equals`, `does not equal` |
| `number` | `equals`, `does not equal`, `greater than`, `less than` |
| `boolean` | `is` |
| `time` | `before`, `after` |
| `array` | `includes value`, `does not include value` |

**Note:** Only one `array`-type field is supported per selection. Filters are applied in array order.

---

## Example Request

```bash
curl --location --request POST 'https://rest.iad-03.braze.com/catalogs/restaurants/selections' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "selection": {
    "name": "favorite-restaurants",
    "description": "Favorite restaurants in NYC",
    "external_id": "favorite-nyc-restaurants",
    "source": "custom",
    "filters": [
      {
        "field": "City",
        "operator": "equals",
        "value": "NYC"
      },
      {
        "field": "Rating",
        "operator": "greater than",
        "value": 7
      }
    ],
    "results_limit": 10,
    "sort_field": "Rating",
    "sort_order": "desc"
  }
}'
```

---

## Responses

| Status | Meaning |
|--------|---------|
| `202` | Success |
| `400` | Invalid request |
| `404` | Not found |

**Success (202):**
```json
{ "message": "success" }
```

**Error (400):**
```json
{
  "errors": [
    {
      "id": "catalog-not-found",
      "message": "Could not find catalog",
      "parameters": ["catalog_name"],
      "parameter_values": ["restaurants"]
    }
  ],
  "message": "Invalid Request"
}
```

---

## Error Reference

| Error | Fix |
|-------|-----|
| `catalog-not-found` | Verify the catalog name |
| `company-size-limit-already-reached` | Catalog storage limit reached |
| `selection-limit-reached` | Catalog selections limit reached |
| `invalid-selection` | Verify selection structure is valid |
| `too-many-filters` | Reduce to 4 or fewer filters |
| `selection-name-already-exists` | Use a unique selection name |
| `selection-has-invalid-filter` | Check filter field/operator/value |
| `selection-invalid-results-limit` | Set `results_limit` between 1–50 |
| `invalid-sorting` | Check sort configuration |
| `invalid-sort-field` | Verify `sort_field` exists on catalog items |
| `invalid-sort-order` | Use `"asc"` or `"desc"` |
| `selection-contains-too-many-arrays` | Only one `array`-type filter field allowed |
