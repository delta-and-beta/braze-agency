---
name: export-kpi-get-kpi-dau-date
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/kpi/get_kpi_dau_date
indexed_at: '2026-04-05'
keywords:
  - KPI
  - DAU
  - metrics
  - users
  - timeseries
  - analytics
  - endpoint
  - workspace
  - export
  - activity
triggers:
  - get daily active users
  - retrieve DAU data series
  - export user metrics by date
  - query active user count
  - fetch KPI data
---
## Get KPI DAU by Date

Retrieves a daily series of total unique active users per date.

**Endpoint:** `GET /kpi/dau/data_series`
**Permission required:** `kpi.dau.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Number of days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 string | End date for the series. Defaults to time of request. |
| `app_id` | Optional | String | App API identifier. Omit to return results for all apps in workspace. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/kpi/dau/data_series?length=10&ending_at=2018-06-28T23:59:59-5:00&app_id={{app_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2018-06-22",
      "dau": 8352
    }
  ]
}
```

`data` is an array of objects, each with:
- `time` — ISO 8601 date string
- `dau` — daily active user count (integer)

### Notes

- Rate limit: default endpoint rate limit applies
- `app_id` is found on the **API Keys** settings page
- For export issues, consult the Braze Export Troubleshooting guide

`★ Insight ─────────────────────────────────────`
- The original uses Jekyll Liquid templating (`{% api %}`, `{% apimethod %}`, `{{site.baseurl}}`) — stripping these is essential since topic files are consumed as raw markdown by agents, not rendered by Jekyll.
- The `app_id` omission behavior (returns all-workspace data) is a critical operational detail that's easy to miss — it's preserved explicitly here since it affects result scope.
`─────────────────────────────────────────────────`
