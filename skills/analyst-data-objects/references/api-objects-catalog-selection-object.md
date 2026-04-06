---
name: api-objects-catalog-selection-object
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/catalog_selection_object
indexed_at: '2026-04-05'
keywords:
  - catalog
  - selection
  - filters
  - sorting
  - API
  - Shopify
  - source
  - collections
  - limits
  - external_id
triggers:
  - create a catalog selection
  - set up catalog filters
  - configure Shopify catalog
  - define catalog selection criteria
  - filter catalog items
---
# Catalog Selection Object

Used when creating catalog selections via the API to define filtering, sorting, and limiting criteria.

## Structure

```json
{
  "selection": {
    "name": "Sale",
    "description": "Sales Collection",
    "external_id": "12345678",
    "source": "Shopify",
    "filters": [
      {
        "field": "collection",
        "operator": "includes value",
        "value": "Best Seller"
      },
      {
        "field": "collection",
        "operator": "does not include value",
        "value": "Sale"
      }
    ],
    "results_limit": 5,
    "sort_field": "id",
    "sort_order": "asc"
  }
}
```

## Selection Fields

| Key | Required | Type | Description |
|-----|----------|------|-------------|
| `name` | Required | String | Name of the catalog selection. |
| `description` | Optional | String | Description of the selection. |
| `external_id` | Required | String | Unique identifier for the selection. |
| `source` | Required | String | Catalog data source. Use `"Shopify"` for Shopify catalogs; use `"custom"` or an integration name for others. |
| `filters` | Optional | Array | Filter objects to apply. Max 4 via API (dashboard supports up to 10). Omit to include all items. |
| `results_limit` | Optional | Integer | Max results to return. Range: 1–50. |
| `sort_field` | Optional | String | Field to sort by. Must be paired with `sort_order`. |
| `sort_order` | Optional | String | `"asc"` or `"desc"`. Must be paired with `sort_field`. If either is absent, results return in random order. |

## Filter Object Fields

| Key | Required | Type | Description |
|-----|----------|------|-------------|
| `field` | Required | String | Catalog field to filter on. |
| `operator` | Required | String | Comparison operator (e.g., `"includes value"`, `"does not include value"`). |
| `value` | Required | String, number, boolean, or time | Value to compare against. Must match the data type of the catalog field. |

**Limits:** API accepts max 4 filters per request; filters apply in array order.
