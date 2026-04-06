---
name: export-kpi-get-kpi-uninstalls-date
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/kpi/get_kpi_uninstalls_date
indexed_at: '2026-04-05'
keywords:
  - uninstalls
  - KPI
  - analytics
  - timeseries
  - metrics
  - data
  - performance
  - app
  - endpoint
triggers:
  - get uninstall data
  - fetch uninstalls by date
  - view uninstall metrics
  - retrieve app uninstalls
  - check uninstall trends
---
## Get KPI Uninstalls by Date

**Endpoint:** `GET /kpi/uninstalls/data_series`

Returns a daily time series of total app uninstalls per date.

**Required permission:** `kpi.uninstalls.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 datetime | Series end date. Defaults to request time. |
| `app_id` | Optional | String | App API identifier. Omit to return results for all apps in workspace. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/kpi/uninstalls/data_series?length=14&ending_at=2018-06-28T23:59:59-5:00&app_id={{app_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2018-06-28",
      "uninstalls": 42
    }
  ]
}
```

- `time` — ISO 8601 date string
- `uninstalls` — count of uninstalls on that date
