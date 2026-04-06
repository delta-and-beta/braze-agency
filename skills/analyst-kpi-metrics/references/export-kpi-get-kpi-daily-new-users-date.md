---
name: export-kpi-get-kpi-daily-new-users-date
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/kpi/get_kpi_daily_new_users_date
indexed_at: '2026-04-05'
keywords:
  - kpi
  - new_users
  - daily
  - metrics
  - analytics
  - data_series
  - users
  - endpoint
  - workspace
  - app
triggers:
  - Get daily new user counts
  - Retrieve new users by date
  - Fetch new user KPI data
  - Track new user growth
  - Get new user metrics by date range
---
## Get KPI Daily New Users by Date

**Endpoint:** `GET /kpi/new_users/data_series`

Retrieves a daily series of total new user counts for each date.

**Required permission:** `kpi.new_users.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Days before `ending_at` to include. Range: 1–100. |
| `ending_at` | Optional | ISO-8601 datetime | End date of the series. Defaults to request time. |
| `app_id` | Optional | String | App API identifier. Omit to return results for all apps in workspace. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/kpi/new_users/data_series?length=14&ending_at=2018-06-28T23:59:59-5:00&app_id={{app_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2018-06-20",
      "new_users": 1234
    }
  ]
}
```

- `time` — ISO 8601 date string
- `new_users` — count of new users for that day

`★ Insight ─────────────────────────────────────`
- The `length` + `ending_at` pattern is a sliding window design common across all Braze KPI endpoints — the same parameter shape appears in MAU, DAU, and uninstall series endpoints, making this a reusable mental model.
- Omitting `app_id` implicitly aggregates across the workspace, which is useful to document explicitly since it changes the scope of the returned data without an error.
`─────────────────────────────────────────────────`
