---
name: export-segments-get-segment-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/segments/get_segment_analytics
indexed_at: '2026-04-05'
keywords:
  - segment
  - analytics
  - data_series
  - daily
  - size
  - export
  - endpoint
  - time-series
  - REST
  - API
triggers:
  - get segment analytics
  - retrieve segment data
  - segment size over time
  - export segment analytics
  - segment performance data
---
## Get Segment Analytics

**Endpoint:** `GET /segments/data_series`

Retrieves a daily series of the estimated size of a segment over time.

**Required permission:** `segments.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `segment_id` | Yes | String | Segment API identifier. Find on the API Keys page or via the Export segment list endpoint. |
| `length` | Yes | Integer | Max days before `ending_at` to include. Range: 1–100. |
| `ending_at` | No | ISO-8601 datetime | End date for the series. Defaults to time of request. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/segments/data_series?segment_id={{segment_identifier}}&length=14&ending_at=2018-06-27T23:59:59-5:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "message": "success",
  "data": [
    {
      "time": "2018-06-27",
      "size": 12345
    }
  ]
}
```

- `time` — ISO 8601 date string
- `size` — integer count of segment members on that date

### Notes

- Rate limit: default REST API rate limit applies
- Use the Export segment list endpoint (`GET /segments/list`) to look up `segment_id` values programmatically
