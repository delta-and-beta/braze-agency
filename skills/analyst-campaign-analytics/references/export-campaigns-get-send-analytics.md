---
name: export-campaigns-get-send-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/campaigns/get_send_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - sends
  - campaigns
  - statistics
  - conversions
  - delivery
  - metrics
  - revenue
  - recipients
  - endpoint
triggers:
  - get campaign send analytics
  - retrieve send statistics
  - track campaign performance
  - check delivery metrics
  - analyze conversion data
---
## Get Campaign Send Analytics

**Endpoint:** `GET /sends/data_series`

Retrieves a daily series of stats for a tracked `send_id` for API campaigns. Data is retained for 14 days after send. Campaign conversions are attributed to the most recent `send_id` a user received from the campaign.

**Note:** API campaigns only.

### Authentication

API key with `sends.data_series` permission.

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | Campaign API identifier |
| `send_id` | Required | String | Send API identifier |
| `length` | Required | Integer | Max days before `ending_at` to include (1–100) |
| `ending_at` | Optional | ISO-8601 datetime | End date for series; defaults to request time |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/sends/data_series?campaign_id={{campaign_identifier}}&send_id={{send_identifier}}&length=30&ending_at=2014-12-10T23:59:59-05:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Schema

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
            "direct_opens": 20,
            "total_opens": 30,
            "bounces": 3,
            "body_clicks": 10,
            "revenue": 12.50,
            "unique_recipients": 90,
            "conversions": 8,
            "conversions_by_send_time": 5,
            "conversions1": 3,
            "conversions1_by_send_time": 2,
            "conversions2": 1,
            "conversions2_by_send_time": 1,
            "conversions3": 0,
            "conversions3_by_send_time": 0
          }
        ]
      },
      "conversions": 8,
      "conversions1": 3,
      "conversions2": 1,
      "conversions3": 0,
      "conversions_by_send_time": 5,
      "conversions1_by_send_time": 2,
      "conversions2_by_send_time": 1,
      "conversions3_by_send_time": 0,
      "unique_recipients": 90,
      "revenue": 12.50
    }
  ]
}
```

### Key Notes

- `conversions` vs `conversions_by_send_time`: Both appear at message-level and top-level. `_by_send_time` variants attribute conversions to the date the campaign was sent rather than when the conversion occurred.
- `conversions1`–`conversions3` track up to 4 conversion events total (0-indexed starting from the second event).
- `revenue` is in USD (float).
- Rate limit: default Braze rate limits apply.
