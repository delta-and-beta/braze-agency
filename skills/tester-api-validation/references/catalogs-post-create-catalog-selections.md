---
name: catalogs-post-create-catalog-selections
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/catalogs/catalog_selections/asynchronous/post_create_catalog_selections
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - selections
  - filters
  - sorting
  - endpoint
  - Shopify
  - operators
  - results_limit
  - external_id
  - permissions
triggers:
  - how to create a catalog selection
  - set up filters for catalog results
  - sort catalog items by field
  - create Shopify catalog selection
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — the goal is maximum information density with minimum noise. Jekyll template tags (`{% api %}`, `{: .reset-td-br-*}`), liquid includes, and site variables are all boilerplate that gets stripped while preserving the structured data that agents actually need to answer questions.
`─────────────────────────────────────────────────`

## Create Catalog Selection

**Endpoint:** `POST /catalogs/{catalog_name}/selections`

**Required permission:** `catalogs.create_selection`

**Rate limit:** Asynchronous catalog selections rate limit applies.

---

## Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `catalog_name` | Required | String | Name of the catalog |

---

## Request Body

The request body must contain a `selection` object.

### Selection Object Fields

| Parameter | Required | Type | Description |
|---|---|---|---|
| `name` | Required | String | Name of the catalog selection |
| `description` | Optional | String | Description of the catalog selection |
| `external_id` | Required | String | Unique identifier for the selection |
| `source` | Required | String | `"Shopify"` for Shopify catalogs; `"custom"` for custom catalogs |
| `filters` | Optional | Array | Filter objects (up to 4 per request). If omitted, all catalog items are included |
| `results_limit` | Optional | Integer | Max results to return (1–50) |
| `sort_field` | Optional | String | Field to sort by — must be paired with `sort_order` |
| `sort_order` | Optional | String | `"asc"` or `"desc"` — must be paired with `sort_field` |

> **Note:** `sort_field` and `sort_order` must be used together. Omitting either (or both) returns results in randomized order.

### Filter Operators by Field Type

| Field Type | Supported Operators |
|---|---|
| `string` | `equals`, `does not equal` |
| `number` | `equals`, `does not equal`, `greater than`, `less than` |
| `boolean` | `is` |
| `time` | `before`, `after` |
| `array` | `includes value`, `does not include value` |

> **Note:** Maximum 4 filters per API request (up to 10 in the Braze dashboard). Filters are applied in array order. Only one `array`-type field is supported per selection.

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

**202 Success:**
```json
{ "message": "success" }
```

**400 Error:**
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

## Troubleshooting

| Error | Fix |
|---|---|
| `catalog-not-found` | Verify the catalog name is correct |
| `company-size-limit-already-reached` | Catalog storage size limit reached |
| `selection-limit-reached` | Catalog selections limit reached |
| `invalid-selection` | Verify selection object is valid |
| `too-many-filters` | Reduce to 4 or fewer filters |
| `selection-name-already-exists` | Use a unique selection name for this catalog |
| `selection-has-invalid-filter` | Validate each filter's field, operator, and value |
| `selection-invalid-results-limit` | Set `results_limit` between 1 and 50 |
| `invalid-sorting` | Check that sort configuration is valid |
| `invalid-sort-field` | Verify `sort_field` exists in the catalog |
| `invalid-sort-order` | Use `"asc"` or `"desc"` only |
| `selection-contains-too-many-arrays` | Only one `array`-type filter field is allowed per selection |

`★ Insight ─────────────────────────────────────`
The troubleshooting table is preserved verbatim because it maps error IDs (returned in API responses) directly to remediation steps — this is exactly the kind of lookup an agent needs at runtime, not something derivable from the rest of the doc. Contrast with the rate limit include (`{% multi_lang_include rate_limits.md %}`), which is stripped because it's a pointer to external content, not the content itself.
`─────────────────────────────────────────────────`
