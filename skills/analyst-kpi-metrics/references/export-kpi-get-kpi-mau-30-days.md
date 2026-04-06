---
name: export-kpi-get-kpi-mau-30-days
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/kpi/get_kpi_mau_30_days
indexed_at: '2026-04-05'
keywords:
  - kpi
  - mau
  - metrics
  - analytics
  - users
  - endpoint
  - data_series
  - dashboard
  - reporting
triggers:
  - get monthly active users
  - retrieve mau metrics
  - monthly active users data
  - user metrics dashboard
  - daily active users series
---
## Get KPI MAU 30 Days

**Endpoint:** `GET /kpi/mau/data_series`

Retrieves a daily series of unique active users over a 30-day rolling window.

**Required permission:** `kpi.mau.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 datetime | End date for the series. Defaults to request time. |
| `app_id` | Optional | String | App API identifier. If omitted, returns data for all apps in workspace. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/kpi/mau/data_series?length=7&ending_at=2018-06-28T23:59:59-05:00&app_id={{app_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
    "message": "success",
    "data": [
        {
            "time": "2018-06-22",
            "mau": 12345
        }
    ]
}
```

- `message`: Export status (`"success"` on completion)
- `data[].time`: Date in ISO 8601 format
- `data[].mau`: Monthly active user count for that day
