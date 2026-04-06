---
name: ios-content-cards-carousel-view
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/use_cases/carousel_view
indexed_at: '2026-04-05'
keywords:
  - carousel
  - cards
  - ios
  - customization
  - analytics
  - views
  - observer
  - feeds
  - impressions
  - dismissals
triggers:
  - build a carousel view
  - custom content card view
  - log content card analytics
  - filter cards by feed
  - implement dismissal tracking
---
# Content Cards Carousel View (iOS)

A carousel view enables horizontal swipe through featured Content Cards. This requires a **fully customized** Content Card implementation — you cannot use Braze's default views or `ABKContentCardTableViewController`.

## Key Differences from Basic Implementation

- Must build your own views (no Braze view reuse)
- Must manually log all analytics
- Must implement client-side logic controlling card count and selection

## Implementation Steps

### Step 1: Custom View Controller

Create your own view controller (e.g., `UICollectionViewController`) and subscribe for data updates.

- **Do not** extend or subclass `ABKContentCardTableViewController` — it only handles default Content Card types
- Populate your views using data from Braze's model layer directly

### Step 2: Implement Analytics Manually

Impressions, clicks, and dismissals are **not** automatically logged in custom controllers. You must call the analytics methods explicitly:

- Impression logging
- Dismissal event logging  
- Click logging

Reference: `ABKContentCard` card methods for the correct analytics API calls.

### Step 3: Content Card Observer

Create an observer to handle incoming Content Cards and apply display logic:

- Default sort: created date, newest first
- Cards shown: all eligible cards by default — **you** must limit to carousel count

**Display logic options:**
- Select first N cards from the array
- Use key-value pairs (`extras` property) to filter/sort cards for this specific feed

**Key-value pair coordination (critical):** Marketing and dev teams must agree on exact KV pair keys/values (e.g., `feed_type = brand_homepage`). Dashboard input must exactly match app logic.

## Multiple Feeds

If the carousel is a secondary feed (alongside a standard Content Cards feed), use the multiple feeds pattern to route cards into the correct feed via key-value pairs.

## Considerations

| Constraint | Detail |
|---|---|
| No subclassing | Cannot extend `ABKContentCardsController` — integrate data model methods directly |
| No default type | Carousel logic is not built into Braze; your team owns and maintains it |
| Manual card count | Client-side logic required to display a fixed number of cards at a time |

## Reference

- iOS `ABKContentCard` class: properties, methods, and analytics API
- `extras` property on the data model: use for KV-pair-based conditional logic
