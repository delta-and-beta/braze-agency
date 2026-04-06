---
name: banners-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/banners/analytics
indexed_at: '2026-04-05'
keywords:
  - banners
  - analytics
  - campaign
  - impressions
  - clicks
  - metrics
  - performance
  - dashboard
triggers:
  - view banner analytics
  - track banner performance
  - measure banner clicks and impressions
  - analyze campaign metrics
---
`★ Insight ─────────────────────────────────────`
The source content is mostly a liquid template include (`{% multi_lang_include %}`), meaning the actual analytics content lives in a shared partial. What we have is a stub page — the topic file should capture the structural intent and any extractable facts, rather than waiting for expanded content.
`─────────────────────────────────────────────────`

# Banner Analytics

Banner analytics provides performance data for Banner campaigns across three areas: campaign details, message performance, and historical performance.

## Accessing Banner Analytics

Navigate to the campaign detail page for a Banner campaign to view its analytics dashboard.

## Analytics Sections

### Campaign Details
- Campaign name, status, and creation metadata
- Target segment and audience size
- Send schedule and delivery configuration

### Message Performance
Key metrics tracked for Banner messages:

| Metric | Description |
|--------|-------------|
| Impressions | Number of times the banner was displayed to a user |
| Clicks | Number of times users tapped/clicked the banner |
| Click Rate | Clicks divided by impressions |
| Dismissals | Number of times users dismissed the banner |

### Historical Performance
- Time-series charts showing metric trends over the campaign lifetime
- Filterable by date range to compare performance periods

## Banner-Specific Considerations

- Banners are persistent placements (not push or in-app messages), so impression counting reflects ongoing visibility rather than discrete sends
- Analytics refresh on the standard Braze dashboard cadence
- Unlike email or push, banners have no delivery or open events — entry into the placement counts as an impression

## Related

- General campaign analytics apply to banners; banner-specific metrics layer on top of the standard campaign analytics framework
