---
name: export-canvas-get-canvas-analytics-summary
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/canvas/get_canvas_analytics_summary
indexed_at: '2026-04-05'
keywords:
  - canvas
  - analytics
  - summary
  - variants
  - conversions
  - revenue
  - steps
  - metrics
  - data_summary
  - breakdown
triggers:
  - get canvas analytics summary
  - export canvas data summary
  - analyze canvas performance
  - retrieve canvas statistics
  - canvas results breakdown
---
# Get Canvas Analytics Summary

**Endpoint:** `GET /canvas/data_summary`

Returns rollup time series data for a Canvas — a concise statistical summary of Canvas results.

**Required permission:** `canvas.data_summary`

## Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `canvas_id` | Required | String | Canvas API identifier |
| `ending_at` | Required | ISO-8601 datetime | End date for export. Defaults to request time. |
| `starting_at` | Optional* | ISO-8601 datetime | Start date for export. *Either `starting_at` or `length` required. |
| `length` | Optional* | String | Max days before `ending_at` to include. Range: 1–14. *Either `starting_at` or `length` required. |
| `include_variant_breakdown` | Optional | Boolean | Include per-variant stats. Default: `false` |
| `include_step_breakdown` | Optional | Boolean | Include per-step stats. Default: `false` |
| `include_deleted_step_data` | Optional | Boolean | Include stats for deleted steps. Default: `false` |

**Time zone note:** Dashboard analytics aggregate daily in your company's configured time zone. Align timestamps accordingly (e.g., if UTC+2, use 12AM UTC+2).

## Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/canvas/data_summary?canvas_id={{canvas_id}}&ending_at=2018-05-30T23:59:59-05:00&starting_at=2018-05-28T23:59:59-05:00&length=5&include_variant_breakdown=true&include_step_breakdown=true&include_deleted_step_data=true' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response Schema

```json
{
  "data": {
    "name": "string — Canvas name",
    "total_stats": {
      "revenue": "float — USD revenue",
      "conversions": "int",
      "conversions_by_entry_time": "int",
      "entries": "int"
    },
    "variant_stats": {
      "<variant_api_id>": {
        "name": "string",
        "revenue": "float",
        "conversions": "int",
        "entries": "int"
      }
    },
    "step_stats": {
      "<step_api_id>": {
        "name": "string",
        "revenue": "float",
        "conversions": "int",
        "conversions_by_entry_time": "int",
        "messages": {
          "<channel_name>": [
            {
              "sent": "int",
              "opens": "int",
              "influenced_opens": "int — total opens (direct + influenced)",
              "bounces": "int"
            }
          ]
        }
      }
    }
  },
  "message": "string — 'success' on completion"
}
```

**`influenced_opens` naming caveat:** In the API response, `influenced_opens` = total opens (direct + influenced combined). In the Braze dashboard, "influenced opens" means only influenced opens (excluding direct). This is a legacy API naming inconsistency.

`★ Insight ─────────────────────────────────────`
- The `starting_at`/`length` mutual exclusivity pattern is common in Braze analytics endpoints — both define the time window, but from different anchors (absolute vs. relative).
- The `influenced_opens` field naming divergence between API and dashboard is a real footgun for engineers building reporting — worth surfacing prominently in topic files so agents can warn users proactively.
- `variant_stats` and `step_stats` are keyed by UUID strings (API identifiers), not names — queries for "show me step X stats" require a prior lookup of the step's API identifier.
`─────────────────────────────────────────────────`
