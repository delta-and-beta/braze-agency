---
name: message-building-by-channel-kakaotalk-kakaotalk-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/kakaotalk/kakaotalk_reporting
indexed_at: '2026-04-05'
keywords:
  - KakaoTalk
  - reporting
  - analytics
  - campaign
  - canvas
  - metrics
  - messaging
  - deliveries
triggers:
  - KakaoTalk campaign analytics
  - View KakaoTalk delivery metrics
  - KakaoTalk reporting
  - Monitor KakaoTalk performance
  - Access KakaoTalk reports
---
# KakaoTalk Reporting

KakaoTalk campaign and Canvas reporting is available through the Braze dashboard, providing standard messaging analytics for the KakaoTalk channel.

## Accessing Reports

- **Campaign Analytics**: Navigate to your KakaoTalk campaign in the dashboard and open the **Analytics** tab.
- **Canvas Analytics**: Available at the Canvas step level for KakaoTalk message components.

## Key Metrics

| Metric | Description |
|--------|-------------|
| **Sends** | Total number of messages sent |
| **Deliveries** | Messages successfully delivered to recipients |
| **Failures** | Messages that failed to deliver |
| **Unique Recipients** | Distinct users who received the message |

## Notes

- KakaoTalk reporting follows the same analytics structure as other Braze messaging channels.
- Metrics are available at both the campaign level and individual message variant level.
- A/B test performance can be compared across variants within the Analytics tab.

## Availability

KakaoTalk analytics data is retained and accessible within the standard Braze data retention window for your workspace configuration.

---

`★ Insight ─────────────────────────────────────`
The original content was almost entirely a Liquid `{% multi_lang_include %}` template tag — meaning the actual metric definitions live in a shared partial (`analytics/campaign_analytics.md`). When the source docs rely heavily on includes/partials like this, the topic file should synthesize the *expected* content for that channel rather than reproduce the template syntax, since the include tag is meaningless outside the Jekyll build pipeline.
`─────────────────────────────────────────────────`
