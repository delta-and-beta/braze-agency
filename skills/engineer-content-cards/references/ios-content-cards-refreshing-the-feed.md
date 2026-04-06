---
name: ios-content-cards-refreshing-the-feed
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/refreshing_the_feed
indexed_at: '2026-04-05'
keywords:
  - refresh
  - content-cards
  - iOS
  - Appboy
  - SDK
  - feed
  - singleton
  - API
  - initialization
triggers:
  - refresh content cards
  - manually trigger refresh
  - request content cards refresh
  - how to update content cards feed
  - refreshing the feed
---
## Refreshing Content Cards

Manually trigger a Content Cards refresh by calling the refresh method on the `Appboy` shared instance.

**Objective-C:**
```objc
[[Appboy sharedInstance] requestContentCardsRefresh];
```

**Swift:**
```swift
Appboy.sharedInstance()?.requestContentCardsRefresh()
```

The method is defined in `Appboy.h` via `requestContentCardsRefresh:` on the `Appboy` interface.

> **Note:** This API uses the legacy `Appboy` interface (Objective-C SDK). The Swift optional chaining (`?.`) accounts for the singleton potentially being nil before SDK initialization.
