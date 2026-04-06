---
name: ios-content-cards
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/refreshing_the_feed
indexed_at: '2026-04-05'
keywords:
  - ios
  - content-cards
  - refresh
  - appboy
  - swift
  - objectivec
  - feed
  - sdk
  - legacy
  - deprecated
triggers:
  - refresh content cards
  - manual content cards refresh
  - how to refresh content cards feed
  - trigger content cards update
  - request content cards refresh
---
# Refresh Content Cards Feed (iOS Legacy SDK)

> **Note:** This API uses the deprecated Objective-C SDK (`Appboy`). Prefer the Swift SDK for new projects.

## Manual Refresh

Trigger a manual refresh of the user's Content Cards from anywhere in your app:

**Objective-C**
```objc
[[Appboy sharedInstance] requestContentCardsRefresh];
```

**Swift**
```swift
Appboy.sharedInstance()?.requestContentCardsRefresh()
```

## Key Details

- Method: `requestContentCardsRefresh:` on the `Appboy` interface
- Reference: `Appboy.h` header file in the `AppboyKit/include/` directory of the iOS SDK repo
