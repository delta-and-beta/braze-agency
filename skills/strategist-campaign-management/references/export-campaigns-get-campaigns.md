---
name: export-campaigns-get-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/campaigns/get_send_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - campaigns
  - sends
  - conversions
  - delivery
  - metrics
  - API
  - revenue
  - tracking
  - endpoint
triggers:
  - export send analytics
  - get campaign metrics
  - retrieve conversion data
  - view send performance
  - track campaign conversions
---
## Export Send Analytics (`GET /sends/data_series`)

Retrieves a daily series of stats for a tracked `send_id` for **API campaigns only**. Data retained for 14 days after send. Conversions attributed to most recent `send_id` received per user.

**Permission required:** `sends.data_series`

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Yes | String | Campaign API identifier |
| `send_id` | Yes | String | Send API identifier |
| `length` | Yes | Integer | Days before `ending_at` to include (1–100) |
| `ending_at` | No | ISO-8601 datetime | End of data series (defaults to now) |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/sends/data_series?campaign_id={{campaign_identifier}}&send_id={{send_identifier}}&length=30&ending_at=2014-12-10T23:59:59-05:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Shape

```json
{
  "message": "success",
  "data": [
    {
      "time": "2014-12-10",
      "messages": {
        "ios_push": [
          {
            "variation_name": "Variation A",
            "sent": 100,
            "delivered": 95,
            "undelivered": 5,
            "delivery_failed": 2,
            "direct_opens": 10,
            "total_opens": 15,
            "bounces": 3,
            "body_clicks": 8,
            "revenue": 12.50,
            "unique_recipients": 90,
            "conversions": 5,
            "conversions_by_send_time": 3,
            "conversions1": 2,
            "conversions1_by_send_time": 1,
            "conversions2": 1,
            "conversions2_by_send_time": 0,
            "conversions3": 0,
            "conversions3_by_send_time": 0
          }
        ]
      },
      "conversions": 5,
      "conversions1": 2,
      "conversions2": 1,
      "conversions3": 0,
      "conversions_by_send_time": 3,
      "conversions1_by_send_time": 1,
      "conversions2_by_send_time": 0,
      "conversions3_by_send_time": 0,
      "unique_recipients": 90,
      "revenue": 12.50
    }
  ]
}
```

### Key Notes

- **API campaigns only** — does not work for Canvas or scheduled campaigns
- `conversions` vs `conversions_by_send_time`: the former counts all conversions attributed to the campaign; the latter counts only those attributed to the specific send date
- Up to 4 conversion events tracked (`conversions` through `conversions3`); events 2–4 are optional in the response
- Metrics exist at both the **message channel level** (inside `messages`) and the **campaign level** (top-level fields)
