---
name: export-kpi
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/kpi/get_kpi_uninstalls_date
indexed_at: '2026-04-05'
keywords:
  - uninstalls
  - KPI
  - exports
  - metrics
  - analytics
  - endpoint
  - data
  - series
  - app
  - REST
triggers:
  - export daily app uninstalls
  - get uninstall data series
  - query uninstall metrics
  - track app uninstalls
  - fetch uninstall analytics
---
## KPI Export: Daily App Uninstalls

**Endpoint:** `GET /kpi/uninstalls/data_series`

Returns a daily series of total app uninstalls per date.

**Required permission:** `kpi.uninstalls.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Days to include before `ending_at`. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 datetime | End date for the series. Defaults to request time. |
| `app_id` | Optional | String | Scopes results to a single app. Omit to return all apps in workspace. |

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

- `message` — Export status; `"success"` on completion.
- `data[].time` — ISO 8601 date string.
- `data[].uninstalls` — Uninstall count for that date.

### Notes

- Rate limit: default tier.
- `app_id` is found in the **API Keys** page under App Settings.
