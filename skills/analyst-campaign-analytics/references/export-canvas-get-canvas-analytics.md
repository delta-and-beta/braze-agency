---
name: export-canvas-get-canvas-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/canvas/get_canvas_analytics_summary
indexed_at: '2026-04-05'
keywords:
  - canvas
  - analytics
  - conversions
  - revenue
  - variants
  - steps
  - metrics
  - export
  - performance
  - timeseries
triggers:
  - export canvas data
  - get canvas analytics
  - analyze variant performance
  - track conversion metrics
  - retrieve canvas summary
---
# Get Canvas Analytics — `/canvas/data_summary`

**Method:** `GET`  
**Permission required:** `canvas.data_summary`

Exports rollup time series data for a Canvas, providing a concise summary of Canvas results.

## Request

```
GET https://rest.iad-01.braze.com/canvas/data_summary
Authorization: Bearer YOUR-REST-API-KEY
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `canvas_id` | Required | String | Canvas API identifier |
| `ending_at` | Required | ISO-8601 datetime | End date for export. Defaults to request time. |
| `starting_at` | Optional* | ISO-8601 datetime | Start date for export. *Either this or `length` required. |
| `length` | Optional* | String | Max days before `ending_at` to include. Range: 1–14. *Either this or `starting_at` required. |
| `include_variant_breakdown` | Optional | Boolean | Include variant stats. Default: `false`. |
| `include_step_breakdown` | Optional | Boolean | Include step stats. Default: `false`. |
| `include_deleted_step_data` | Optional | Boolean | Include stats for deleted steps. Default: `false`. |

**Time zone note:** Timestamps must align with your company's configured dashboard time zone (e.g., if UTC+2, use 12AM UTC+2).

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/canvas/data_summary?canvas_id={{canvas_id}}&ending_at=2018-05-30T23:59:59-05:00&starting_at=2018-05-28T23:59:59-05:00&length=5&include_variant_breakdown=true&include_step_breakdown=true&include_deleted_step_data=true' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response

```json
{
  "data": {
    "name": "(string) Canvas name",
    "total_stats": {
      "revenue": "(float) USD revenue",
      "conversions": "(int) number of conversions",
      "conversions_by_entry_time": "(int) conversions attributed by entry time",
      "entries": "(int) number of entries"
    },
    "variant_stats": {
      "<variant-api-id>": {
        "name": "(string) variant name",
        "revenue": "(float)",
        "conversions": "(int)",
        "entries": "(int)"
      }
    },
    "step_stats": {
      "<step-api-id>": {
        "name": "(string) step name",
        "revenue": "(float)",
        "conversions": "(int)",
        "conversions_by_entry_time": "(int)",
        "messages": {
          "android_push": [
            {
              "sent": "(int)",
              "opens": "(int)",
              "influenced_opens": "(int) total opens (direct + influenced)",
              "bounces": "(int)"
            }
          ]
        }
      }
    }
  },
  "message": "(string) 'success' on completion"
}
```

### Field Notes

- **`influenced_opens`** in the API response = total opens (direct + influenced combined). This differs from the Braze dashboard, where "influenced opens" excludes direct opens — a legacy API naming inconsistency.
- `variant_stats` and `step_stats` are only present when their respective `include_*` parameters are `true`.
