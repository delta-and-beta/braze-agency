---
name: catalogs-delete-catalog
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/catalogs/catalog_selections/asynchronous/delete_catalog_selection
indexed_at: '2026-04-05'
keywords:
  - catalog
  - selection
  - delete
  - API
  - endpoint
  - REST
  - permission
  - removal
triggers:
  - delete catalog selection
  - remove a selection
  - how to delete selections
  - catalog selection deletion
---
## Delete Catalog Selection

**Endpoint:** `DELETE /catalogs/{catalog_name}/selections/{selection_name}`

Deletes a catalog selection.

**Required permission:** `catalogs.delete_selection`
**Rate limit:** Asynchronous catalog selections limit

### Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `catalog_name` | Required | String | Name of the catalog |
| `selection_name` | Required | String | Name of the catalog selection |

### Example Request

```bash
curl --location --request DELETE 'https://rest.iad-03.braze.com/catalogs/restaurants/selections/favorite_list' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Responses

**202 Success:**
```json
{ "message": "success" }
```

**404 Error:**
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

### Troubleshooting

| Error | Fix |
|---|---|
| `catalog-not-found` | Verify the catalog name is correct |
| `invalid-selection` | Verify the selection name is correct |
