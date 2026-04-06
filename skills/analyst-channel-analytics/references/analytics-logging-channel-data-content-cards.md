---
name: analytics-logging-channel-data-content-cards
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/logging_channel_data/content_cards
indexed_at: '2026-04-05'
keywords:
  - analytics
  - logging
  - impressions
  - clicks
  - dismissals
  - tracking
  - events
  - cards
  - braze
  - platforms
triggers:
  - how to log content card impressions
  - how to track content card clicks
  - how to set up content card analytics
  - content card dismissal logging
  - implement content card tracking
---
# Content Card Channel Data

## Overview

Content Card analytics require manual logging — impressions, clicks, and dismissals are **not tracked automatically**. You must call the appropriate logging methods when these events occur in your UI.

## Core Events to Log

| Event | When to Log |
|-------|-------------|
| Impression | Card becomes visible on screen |
| Click | User taps/clicks the card |
| Dismissal | User swipes away or closes the card |

## Logging Methods by Platform

### Swift (iOS)
```swift
// Impression
AppDelegate.braze?.contentCards.logImpression(card: card)

// Click
AppDelegate.braze?.contentCards.logClick(card: card)

// Dismissal
AppDelegate.braze?.contentCards.logDismissed(card: card)
```

### Android (Kotlin)
```kotlin
// Impression
Braze.getInstance(context).logContentCardImpression(card.contentCardId)

// Click
Braze.getInstance(context).logContentCardClicked(card.contentCardId)

// Dismissal
Braze.getInstance(context).logContentCardDismissed(card.contentCardId)
```

### Web (JavaScript)
```javascript
// Impression
braze.logContentCardImpressions([card]);

// Click
braze.logContentCardClick(card);

// Dismissal
braze.logContentCardDismissal(card);
```

### React Native
```javascript
Braze.logContentCardImpression(card.id);
Braze.logContentCardClicked(card.id);
Braze.logContentCardDismissed(card.id);
```

### Flutter
```dart
braze.logContentCardImpression(card);
braze.logContentCardClicked(card);
braze.logContentCardDismissed(card);
```

## Key Rules

- **Log impressions each time** a card becomes visible, even on revisit
- **Deduplicate clicks** — only log once per user action, not per render
- Dismissals are **permanent**: once dismissed, a card should not re-appear
- All logging calls should happen on the **main/UI thread**

## Custom Event Logging

For cards with custom analytics beyond the standard three events, use the analytics key embedded in the card:

```swift
// iOS — access analytics tracking ID
let analyticsId = card.extras["analytics_id"]
```

```kotlin
// Android
val analyticsId = card.extras["analytics_id"]
```

## Analytics in the Dashboard

Logged events flow into Braze's **Content Cards Report** under:
`Campaigns > [Campaign] > Analytics`

Tracked metrics:
- **Impressions** — total and unique
- **Clicks** — click-through rate (CTR)
- **Dismissals**
- **Direct revenue** (if purchase logging is tied to a card click)
