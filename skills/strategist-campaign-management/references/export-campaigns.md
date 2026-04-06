---
name: export-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/campaigns/get_send_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - conversions
  - revenue
  - delivery
  - engagement
  - sends
  - campaign
  - stats
  - data
  - series
triggers:
  - retrieve send analytics
  - export campaign send data
  - track conversion events
  - measure campaign performance
  - get delivery metrics
---
## Export Send Analytics — `/sends/data_series`

**Method:** `GET`

Retrieve a daily series of stats for a tracked `send_id` for API campaigns. Data is retained for 14 days after send. Conversions are attributed to the most recent `send_id` a user received from the campaign.

**Scope:** API campaigns only.

**Required permission:** `sends.data_series`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Yes | String | Campaign API identifier |
| `send_id` | Yes | String | Send API identifier |
| `length` | Yes | Integer | Days before `ending_at` to include (1–100) |
| `ending_at` | No | ISO-8601 datetime | Series end date. Defaults to request time. |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/sends/data_series?campaign_id={{campaign_identifier}}&send_id={{send_identifier}}&length=30&ending_at=2014-12-10T23:59:59-05:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

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
      "unique_recipients": 90,
      "revenue": 12.50,
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
}
```

**Key response fields:**

| Field | Type | Notes |
|-------|------|-------|
| `time` | ISO-8601 date | Day the stats represent |
| `sent` | int | Total sends |
| `delivered` / `undelivered` / `delivery_failed` | int | Delivery breakdown |
| `direct_opens` / `total_opens` | int | Open counts |
| `bounces` / `body_clicks` | int | Engagement signals |
| `revenue` | float | USD revenue |
| `unique_recipients` | int | Campaign-level unique count |
| `conversions` – `conversions3` | int | Up to 4 conversion events |
| `conversions_by_send_time` variants | int | Conversions attributed to send date |
