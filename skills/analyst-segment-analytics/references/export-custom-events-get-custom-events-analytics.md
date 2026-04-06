---
name: export-custom-events-get-custom-events-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/custom_events/get_custom_events_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - events
  - timeseries
  - data
  - filtering
  - granularity
  - endpoint
  - segment
  - reporting
  - occurrence
triggers:
  - get custom event analytics
  - retrieve event occurrence counts
  - analyze events over time
  - query event data by time period
  - filter events by segment
---
## Get Custom Events Analytics

**Endpoint:** `GET /events/data_series`

Retrieves a time-series of custom event occurrence counts over a designated period.

**Required permission:** `events.data_series`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `event` | Required | String | Name of the custom event |
| `length` | Required | Integer | Number of units before `ending_at` to include (1–100) |
| `unit` | Optional | String | `day` (default) or `hour` |
| `ending_at` | Optional | ISO-8601 datetime | End of data series; defaults to request time |
| `app_id` | Optional | String | Limit analytics to a specific app |
| `segment_id` | Optional | String | Limit analytics to an analytics-enabled segment |

---

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/events/data_series?event=event_name&length=24&unit=hour&ending_at=2014-12-10T23:59:59-05:00&app_id={{app_identifier}}&segment_id={{segment_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2014-12-10T23:00:00-05:00",
      "count": 42
    }
  ]
}
```

- `time`: ISO 8601 extended (when `unit=hour`) or ISO 8601 date (when `unit=day`)
- `count`: Number of occurrences of the custom event in that time unit

---

### Notes

- Rate limit: default endpoint rate limit applies
- Fatal error codes follow the standard [fatal errors pattern](https://www.braze.com/docs/api/errors/#fatal-errors)

`★ Insight ─────────────────────────────────────`
- The `length` parameter is a *lookback window*, not an absolute range — it counts back from `ending_at`, making queries reproducible by pinning `ending_at`
- The `unit` parameter controls both granularity and the `time` field's ISO 8601 format in the response — `hour` gives extended datetime, `day` gives date-only
- Filtering by both `app_id` and `segment_id` is additive: you can scope to a specific app AND a specific segment simultaneously
`─────────────────────────────────────────────────`
