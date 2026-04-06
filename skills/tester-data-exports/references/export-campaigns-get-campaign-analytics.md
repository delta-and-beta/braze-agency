---
name: export-campaigns-get-campaign-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/campaigns/get_send_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - campaign
  - send
  - conversions
  - delivery
  - metrics
  - revenue
  - engagement
  - channel
  - variations
triggers:
  - get campaign analytics
  - retrieve send statistics
  - track conversions
  - view campaign performance
  - analyze send data
---
## Get Campaign Analytics (`/sends/data_series`)

Retrieves a daily series of send stats for a tracked `send_id` in API campaigns. Analytics are stored for **14 days** after the send. Conversions attribute to the most recent `send_id` a user received from the campaign.

**API campaigns only.** Required permission: `sends.data_series`.

### Request

```
GET https://rest.iad-01.braze.com/sends/data_series
Authorization: Bearer YOUR-REST-API-KEY
```

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | Campaign API identifier |
| `send_id` | Required | String | Send API identifier |
| `length` | Required | Integer | Days before `ending_at` to include. Range: 1–100 |
| `ending_at` | Optional | ISO-8601 datetime | End of data series. Defaults to request time |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/sends/data_series?campaign_id=CAMPAIGN_ID&send_id=SEND_ID&length=30&ending_at=2014-12-10T23:59:59-05:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response Structure

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
            "direct_opens": 30,
            "total_opens": 45,
            "bounces": 3,
            "body_clicks": 10,
            "revenue": 25.50,
            "unique_recipients": 90,
            "conversions": 8,
            "conversions_by_send_time": 5,
            "conversions1": 3,
            "conversions1_by_send_time": 2,
            "conversions2": 1,
            "conversions2_by_send_time": 0,
            "conversions3": 0,
            "conversions3_by_send_time": 0
          }
        ]
      },
      "unique_recipients": 90,
      "conversions": 8,
      "conversions1": 3,
      "conversions2": 1,
      "conversions3": 0,
      "conversions_by_send_time": 5,
      "conversions1_by_send_time": 2,
      "conversions2_by_send_time": 0,
      "conversions3_by_send_time": 0,
      "revenue": 25.50
    }
  ]
}
```

### Key Notes

- `conversions` vs `conversions_by_send_time`: The former counts all conversions; the latter attributes conversions to the date the campaign was sent.
- Supports up to 4 conversion events (`conversions` through `conversions3`). Events 2–4 are optional in the response.
- `revenue` is in USD (float).
- Channel data (e.g., `ios_push`) is nested under `messages` per time entry and contains per-variation breakdowns.
