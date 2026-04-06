---
name: catalogs-put-update-catalog-item
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/catalogs/catalog_items/synchronous/put_update_catalog_item
indexed_at: '2026-04-05'
keywords:
  - catalog
  - item
  - replace
  - update
  - endpoint
  - PUT
  - fields
  - permission
  - synchronous
triggers:
  - replace catalog item
  - update catalog item
  - add to catalog
  - modify item in catalog
  - how to update catalog items
---
## Update (Replace) Catalog Item

**Endpoint:** `PUT /catalogs/{catalog_name}/items/{item_id}`

Replaces an item in your catalog. If `item_id` isn't found, creates the item. Synchronous operation.

**Required permission:** `catalogs.replace_item`

---

### Path Parameters

| Parameter | Type | Description |
|---|---|---|
| `catalog_name` | String | Name of the catalog |
| `item_id` | String | ID of the catalog item |

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `items` | Required | Array | Array with a single item object. Fields must exist in the catalog; do not include `id` field. One item per request. |

### Example Request

```bash
curl --location --request PUT 'https://rest.iad-03.braze.com/catalogs/restaurants/items/restaurant1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "items": [
    {
      "Name": "Restaurant",
      "Loyalty_Program": false,
      "Location": {
        "Latitude": 33.6112,
        "Longitude": -117.8711
      },
      "Top_Dishes": ["Hamburger", "Deluxe Cheeseburger"],
      "Open_Time": "2021-09-03T09:03:19.967+00:00"
    }
  ]
}'
```

### Responses

**200 Success:**
```json
{ "message": "success" }
```

**400 Error:**
```json
{
  "errors": [
    {
      "id": "invalid-fields",
      "message": "Some of the fields given do not exist in the catalog",
      "parameters": ["id"],
      "parameter_values": ["restaurant1"]
    }
  ],
  "message": "Invalid Request"
}
```

---

### Troubleshooting

| Error | Fix |
|---|---|
| `catalog-not-found` | Verify catalog name is correct |
| `id-in-body` | Remove `id` field from request body items |
| `ids-too-large` | Item ID max 250 characters |
| `invalid-ids` | Item IDs: letters, numbers, hyphens, underscores only |
| `invalid-fields` | All fields sent must already exist in the catalog |
| `invalid-keys-in-value-object` | Object keys cannot contain `.` or `$` |
| `item-array-invalid` | `items` must be an array of objects |
| `items-too-large` | Each item max 5,000 characters |
| `request-includes-too-many-items` | Only one item per request allowed |
| `too-deep-nesting-in-value-object` | Max 50 levels of nesting in item objects |
| `unable-to-coerce-value` | Item field types cannot be converted |
| `filtered-set-field-too-long` | Field value exceeds character limit for filtered sets |
| `item-already-exists` | Item with this ID already exists (use PATCH to update) |
| `arbitrary-error` | Retry or contact Braze Support |
