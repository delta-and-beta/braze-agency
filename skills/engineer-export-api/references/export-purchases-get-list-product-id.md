---
name: export-purchases-get-list-product-id
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/purchases/get_list_product_id
indexed_at: '2026-04-05'
keywords:
  - products
  - purchases
  - endpoint
  - pagination
  - REST
  - API
  - list
  - product
  - permission
  - parameters
triggers:
  - list product IDs
  - get product list
  - retrieve products
  - fetch products
  - product pagination
---
## List Product IDs

**Endpoint:** `GET /purchases/product_list`

Returns a paginated list of product IDs.

**Required permission:** `purchases.product_list`

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `page` | Optional | String | Page of product list to view |

### Example Request

```
GET https://rest.iad-01.braze.com/purchases/product_list?page=1
```

### Response

```json
{
  "products": [
    "product_name"
  ],
  "message": "success"
}
```

`products` is an array of product name strings.
