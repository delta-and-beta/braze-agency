---
name: data-activation-custom_data-custom_events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/custom_events
indexed_at: '2026-04-05'
keywords:
  - custom-events
  - tracking
  - segmentation
  - campaigns
  - analytics
  - properties
  - canvas
  - blocklist
triggers:
  - log custom events
  - trigger campaigns with events
  - segment users by event
  - view event analytics
---
# Custom Events

Custom events are actions taken by, or updates about, your users. When logged, they can trigger campaigns and are best suited for tracking high-value user interactions.

## Use Cases

- Trigger campaigns/Canvases via **action-based delivery**
- Segment users by frequency, recency of event occurrence
- View aggregate analytics via **Custom Events Report**
- Use in funnel and retention reports
- Pass event properties for Canvas personalization
- Define Canvas exit criteria
- Stream data via Currents

## Managing Custom Events

**Dashboard path:** Data Settings > Custom Events

### Actions (per-event menu)

**Blocklist** — blocks up to 100 events in bulk:
- Stops future data collection for that event
- Hides existing data until unblocked
- Removes event from all filters/graphs
- Warns if event is referenced by active filters or triggers (those will be removed and archived)

**Edit description** — requires `Manage Events, Attributes, Purchases` permission.

**Add tags** — filter the events list; requires same permission.

**View usage report** — lists all Canvases, campaigns, and segments using the event (excludes Liquid references). View up to 100 at a time.

**Export** — Export all events as CSV via **Export all** button; download link sent by email.

## Logging Custom Events

Platform-specific SDK setup required:

| Platform | Reference |
|----------|-----------|
| Android / FireOS | `logCustomEvent()` |
| iOS (Swift) | `logCustomEvent()` |
| Web | `logCustomEvent()` |
| React Native | `Analytics.logCustomEvent()` |
| Unity | `logCustomEvent()` |
| .NET MAUI (Xamarin) | Custom event tracking guide |
| Roku | `logCustomEvent()` |

Events can include **properties** and **quantities** — see platform-specific SDK docs.

## Storage

Custom event metadata stored on User Profile (first/last occurrence, total count, X-in-Y-days over 30 days) is retained indefinitely while the profile remains active.

## Segmentation Filters

| Filter | Operator | Input |
|--------|----------|-------|
| Occurred more than X times | MORE THAN | Number |
| Occurred less than X times | LESS THAN | Number |
| Occurred exactly X times | EXACTLY | Number |
| Last occurred after date | AFTER | Date |
| Last occurred before date | BEFORE | Date |
| Last occurred more than X days ago | MORE THAN | Days ago (positive) |
| Last occurred less than X days ago | LESS THAN | Days ago (positive) |
| Occurred more than X times (max 50) in past Y days | MORE THAN | Y = 1,3,7,14,21,30 |
| Occurred less than X times (max 50) in past Y days | LESS THAN | Y = 1,3,7,14,21,30 |
| Occurred exactly X times (max 50) in past Y days | EXACTLY | Y = 1,3,7,14,21,30 |

## Analytics

**Dashboard path:** Analytics > Custom Events Report

- View aggregate occurrence counts over time per event
- Gray lines on time series = last campaign sent (useful for measuring campaign impact)
- **Filters available:** by hour, MAU, segments, KPI formulas
