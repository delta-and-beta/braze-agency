---
name: export-purchases-get-number-of-purchases
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/purchases/get_number_of_purchases
indexed_at: '2026-04-05'
keywords:
  - purchases
  - quantity
  - metrics
  - export
  - analytics
  - API
  - endpoint
  - reporting
triggers:
  - how to get number of purchases
  - export purchase data
  - query purchase metrics
  - filter purchases by product
---
## Get Number of Purchases

**Endpoint:** `GET /purchases/quantity_series`

Returns the total number of purchases in your app over a time range.

**Required permission:** `purchases.quantity_series`

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `length` | Required | Integer | Max days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 string | End date for export. Defaults to request time. |
| `unit` | Optional | String | Time unit between data points: `day` or `hour`. Defaults to `day`. |
| `app_id` | Optional | String | Filter by app. If omitted, returns results for all apps in the workspace. |
| `product` | Optional | String | Filter by product name. If omitted, returns results for all products. |

### Example Request

```bash
curl --location --request GET 'https://rest.iad-01.braze.com/purchases/quantity_series?length=100' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2024-01-01",
      "purchase_quantity": 42
    }
  ]
}
```

- `time`: ISO 8601 date string for the data point
- `purchase_quantity`: Number of items purchased in that time period
