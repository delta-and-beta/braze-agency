---
name: export-purchases-get-revenue-series
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/purchases/get_revenue_series
indexed_at: '2026-04-05'
keywords:
  - revenue
  - timeseries
  - purchases
  - export
  - metrics
  - endpoint
  - filtering
  - analytics
  - spending
triggers:
  - how to get revenue data
  - export revenue over time
  - analyze spending by product
  - get time series metrics
  - revenue data export
---
## Get Revenue Time Series

**Endpoint:** `GET /purchases/revenue_series`

Returns total money spent in your app over a time range.

**Required permission:** `purchases.revenue_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Max days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 string | End date for export. Defaults to request time. |
| `unit` | Optional | String | Time between data points: `day` or `hour`. Defaults to `day`. |
| `app_id` | Optional | String | Filter by app. If omitted, returns all apps in workspace. |
| `product` | Optional | String | Filter by product name. If omitted, returns all products. |

### Example Request

```bash
curl --location --request GET 'https://rest.iad-01.braze.com/purchases/revenue_series?length=100' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2024-01-01",
      "revenue": 1500
    }
  ]
}
```

- `time` — ISO 8601 date string for the period
- `revenue` — integer amount of revenue for that period
