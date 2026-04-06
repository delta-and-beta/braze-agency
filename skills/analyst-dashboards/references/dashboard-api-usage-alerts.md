---
name: dashboard-api-usage-alerts
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/api_usage_alerts
indexed_at: '2026-04-05'
keywords:
  - API
  - alerts
  - webhooks
  - thresholds
  - monitoring
  - endpoints
  - notifications
  - requests
  - responses
  - tracking
triggers:
  - how to create an API usage alert
  - monitor API request volumes
  - set up webhook notifications for alerts
  - configure alert thresholds
  - detect API errors and rate limits
---
## API Usage Alerts

Monitor REST API and SDK request volumes to detect unexpected traffic before it impacts campaigns.

**Monitored categories:**
- **REST API Endpoints** — all REST calls (sending messages, creating campaigns, exporting users)
- **SDK API Requests** — client SDK requests (in-app messages, user data sync) — *requires Monthly Active Users CY 24-25 purchase*

### Creating an Alert

1. **Settings** > **APIs and Identifiers** > **API Usage Alerts** > create new alert
2. Enter a name; select REST API endpoints and API keys to monitor
3. Choose response codes and define [threshold criteria](#thresholds)
4. Toggle **Alert enabled**

### Alert Thresholds

| Field | Options |
|-------|---------|
| **Threshold condition** | Increased/Decreased by (absolute); Increased/Decreased by percentage; Greater than or equal to; Less than or equal to |
| **Threshold volume** | Numeric value used with the condition |
| **Within** | Time window for evaluation (e.g., 1 hour, 1 day) |

### Notifications

Supports **email** and/or **webhook** delivery. Webhooks can route to external platforms (e.g., Slack).

**Sample webhook payload:**
```json
{
  "data": {
    "alert_name": "My First API Usage Alert",
    "alert_type": "API Usage Alert",
    "alert_criteria": {
      "response_codes": ["201", "202", "203"],
      "threshold_condition": "Increased by %",
      "threshold_volume": 50,
      "within": "1 day"
    },
    "timeframe_start": "2025-03-20T15:35:00Z",
    "timeframe_end": "2025-03-20T16:35:00Z",
    "volume": 1500,
    "previous_timeframe_start": "2025-03-20T14:35:00Z",
    "previous_timeframe_end": "2025-03-20T15:35:00Z",
    "previous_volume": 1000
  },
  "text": "Your My First API Usage Alert alert has triggered. ..."
}
```

### Example Configurations

**API Health Monitoring** — alert when error rates spike:

| Endpoint | API Key | Response Code | Condition | Volume | Window |
|----------|---------|---------------|-----------|--------|--------|
| All | All | `4XX` + `5XX` | Increased by 10% | 10 | 1 hour |

**Rate Limit Detection** — alert when `/users/track` hits rate limit:

| Endpoint | API Key | Response Code | Condition | Volume | Window |
|----------|---------|---------------|-----------|--------|--------|
| `/users/track` | All | `429` | ≥ | 100 | 1 hour |

**API-Triggered Campaign Errors** — alert on any error for send endpoints:

| Endpoint | API Key | Response Code | Condition | Volume | Window |
|----------|---------|---------------|-----------|--------|--------|
| `/campaigns/trigger/send`, `/canvas/trigger/send`, `/messages/send` | All | `4XX` + `5XX` | ≥ | 1 | 1 hour |

**Partner Integration Silence** — alert when a partner stops sending data:

| Endpoint | API Key | Response Code | Condition | Volume | Window |
|----------|---------|---------------|-----------|--------|--------|
| All | Partner integration key | All | ≤ | 0 | 1 day |

### Limits & Behavior

- Each alert fires **at most once every 8 hours** (prevents notification flooding)
- Maximum **10 alerts per workspace**
- If alerts fire too frequently, tighten the threshold criteria
