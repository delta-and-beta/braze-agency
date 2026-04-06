---
name: message-building-by-channel-content-cards-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/content_cards/reporting
indexed_at: '2026-04-05'
keywords:
  - impressions
  - clicks
  - dismissals
  - engagement
  - analytics
  - conversion
  - metrics
  - reporting
  - tracking
  - currents
triggers:
  - How to view content card analytics
  - How to track content card engagement
  - How to measure content card performance
  - How to access content card reporting
---
# Content Card Reporting

Braze provides reporting metrics and analytics for Content Cards at both the campaign and Canvas step level.

## Accessing Reporting

- **Campaign-level**: Navigate to **Campaigns**, select a Content Card campaign, then view the **Analytics** tab.
- **Canvas-level**: Open a Canvas, select a Content Card step to view per-step metrics.

## Key Metrics

| Metric | Description |
|--------|-------------|
| **Impressions** | Number of times the Content Card was viewed (card rendered on screen) |
| **Unique Impressions** | Distinct users who viewed the card |
| **Clicks** | Number of times the card body or CTA button was clicked |
| **Unique Clicks** | Distinct users who clicked the card |
| **Click Rate** | Percentage of impressions that resulted in a click |
| **Dismissals** | Number of times users dismissed (swiped away) the card |
| **Unique Dismissals** | Distinct users who dismissed the card |
| **Total Impressions** | Cumulative impressions, including re-views by the same user |

## Engagement Calculations

- **Click Rate** = Unique Clicks / Unique Impressions
- **Dismissal Rate** = Unique Dismissals / Unique Impressions

## Conversion Tracking

Content Card campaigns support primary and secondary conversion events. Conversions are attributed within the conversion deadline window set at campaign creation.

## Data Availability

- Metrics update approximately every 24 hours in the dashboard.
- Real-time data is available via the [Braze REST API](https://www.braze.com/docs/api/endpoints/export/) export endpoints.
- Content Card data can be exported to CSV from the Analytics tab.

## Currents Integration

For event-level streaming data, Braze Currents exports these Content Card events:

- `users.messages.contentcard.Impression`
- `users.messages.contentcard.Click`
- `users.messages.contentcard.Dismiss`
- `users.messages.contentcard.Send` (card creation time)
- `users.messages.contentcard.Abort`

## Notes

- Impressions are only counted when the card is within the visible viewport for a minimum threshold.
- Cards that are fetched but never scrolled into view do **not** count as impressions.
- Control group cards (in A/B tests) track impressions but not clicks or dismissals.
