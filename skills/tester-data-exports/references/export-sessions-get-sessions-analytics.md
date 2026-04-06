---
name: export-sessions-get-sessions-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/sessions/get_sessions_analytics
indexed_at: '2026-04-05'
keywords:
  - sessions
  - analytics
  - time-series
  - endpoint
  - export
  - app_id
  - segment
  - data
triggers:
  - get session analytics
  - retrieve session counts
  - export app sessions
  - view sessions by time
  - analyze session data
---
## Get Sessions Analytics — Export App Session by Time

**Endpoint:** `GET /sessions/data_series`

Retrieves a time-series of session counts for your app over a designated period.

**Required permission:** `sessions.data_series`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `length` | Required | Integer | Number of units before `ending_at` to include. Range: 1–100. |
| `unit` | Optional | String | `day` (default) or `hour` |
| `ending_at` | Optional | ISO-8601 datetime | End of data series. Defaults to request time. |
| `app_id` | Optional | String | Limits analytics to a specific app. |
| `segment_id` | Optional | String | Limits results to an analytics-enabled segment. |

---

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/sessions/data_series?length=14&unit=day&ending_at=2018-06-28T23:59:59-5:00&app_id={{app_identifier}}&segment_id={{segment_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2018-06-28",
      "sessions": 1234
    }
  ]
}
```

- `time`: ISO 8601 extended (e.g. `2018-06-28T00:00:00`) when `unit=hour`; ISO 8601 date (e.g. `2018-06-28`) when `unit=day`
- `sessions`: integer session count for that period

---

### Notes

- Default rate limits apply.
- `app_id` is found in the API Keys settings page.
- `segment_id` must reference an analytics-enabled segment.

`★ Insight ─────────────────────────────────────`
- The `ending_at` default-to-now pattern is common in time-series APIs — it lets callers omit the parameter for "up to right now" queries without requiring them to construct a timestamp.
- The dual `unit` modes (`day`/`hour`) at the API level mean consumers can drive granularity from a single endpoint rather than hitting separate endpoints, which simplifies caching and routing logic in the pipeline.
`─────────────────────────────────────────────────`
