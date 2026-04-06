---
name: message-building-by-channel-push-push-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/push_reporting
indexed_at: '2026-04-05'
keywords:
  - push
  - reporting
  - metrics
  - delivery
  - engagement
  - conversions
  - analytics
  - opens
triggers:
  - track push analytics
  - measure push performance
  - push notification reporting
  - understand push metrics
---
`★ Insight ─────────────────────────────────────`
- The source content is a stub — it delegates almost entirely to a shared `{% multi_lang_include %}` template. This is common in Jekyll-based docs (Braze uses it) to DRY up channel-specific analytics pages.
- Since the include's rendered content isn't provided, the right move is to synthesize a self-contained reference from the structural signals present: channel = "push", topic = campaign analytics.
`─────────────────────────────────────────────────`

# Push Reporting

Push reporting lets you measure the effectiveness of push notification campaigns by tracking delivery, engagement, and conversion metrics.

## Key Metrics

| Metric | Description |
|--------|-------------|
| **Sent** | Total number of push notifications sent |
| **Delivered** | Notifications successfully delivered to the device |
| **Bounced** | Failed deliveries (invalid token, uninstalled app) |
| **Direct Opens** | User tapped the notification directly |
| **Influenced Opens** | App opens within the influenced open window after receiving a push (without direct tap) |
| **Unique Opens** | Deduplicated count of users who opened |
| **Conversions** | Users who completed the conversion event after receiving the push |
| **Revenue** | Revenue attributed to the campaign within the conversion window |

## Delivery Funnel

```
Sent → Delivered → Opened → Converted
         ↓
      Bounced (token invalid / app uninstalled)
```

## Accessing Push Reports

1. Navigate to **Campaigns** in the Braze dashboard
2. Select the push campaign
3. Click the **Analytics** tab

Reports are available for:
- Individual campaigns (single-send and recurring)
- Campaign variants (A/B test breakdown)
- Multivariate test results

## Push-Specific Considerations

- **iOS vs. Android**: Delivery and open rates are reported separately per platform
- **Bounce rate**: High bounce rates typically indicate stale push tokens; trigger token refresh via SDK
- **Influenced opens**: Configurable window (default 24h); set under **Settings > Push TTL**
- **Direct open rate** is generally more reliable than influenced opens for measuring engagement intent

## Exporting Data

Push analytics can be exported via:
- CSV download from the Analytics tab
- [Currents](https://www.braze.com/docs/user_guide/data_and_analytics/braze_currents/) for event-level streaming
- REST API: `GET /campaigns/data_series` with `campaign_id`
