---
name: legacy-ios-push-badges
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/customization/badges
indexed_at: '2026-04-05'
keywords:
  - badges
  - notifications
  - foreground
  - payload
  - icon
  - count
  - iOS
  - UNUserNotificationCenter
  - clearing
triggers:
  - clear push badges
  - set notification badge count
  - control app icon badge
  - clear badges on app activation
  - how to manage notification badges
---
# Push Badges

## Overview

Control the badge count on your app icon via:
- **Braze dashboard** — set badge count when composing a push notification
- **`applicationIconBadgeNumber`** property (deprecated iOS 17+)
- **Remote notification payload**

Braze automatically clears the badge count when a Braze notification is received while the app is foregrounded.

## Clearing Badges on App Activation

If you don't have a badge-clearing strategy, clear the badge in `applicationDidBecomeActive:`:

**Swift (iOS 16.0+)**
```swift
let center = UNUserNotificationCenter.current()
do {
  try await center.setBadgeCount(0)
} catch {
  // Handle errors
}
```

**Swift (prior to iOS 16, deprecated iOS 17+)**
```swift
UIApplication.shared.applicationIconBadgeNumber = 0
```

**Objective-C (iOS 16.0+)**
```objc
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
[center setBadgeCount:0 withCompletionHandler:^(NSError * _Nullable error) {
    if (error != nil) {
        // Handle errors
    }
}];
```

**Objective-C (prior to iOS 16, deprecated iOS 17+)**
```objc
[UIApplication sharedApplication].applicationIconBadgeNumber = 0;
```

## Key Behavior

Setting the badge count to `0` also **clears all notifications from the notification center** — useful for removing push notifications after a user taps them, even if badge numbers weren't set in the original payload.

`★ Insight ─────────────────────────────────────`
- `UNUserNotificationCenter.setBadgeCount(_:)` is the modern API (iOS 16+); the legacy `applicationIconBadgeNumber` property still works but is deprecated as of iOS 17
- Badge count = 0 has a side effect of clearing the notification center tray — this dual behavior is important for UX hygiene
- Braze auto-clears badges on foreground receipt, so manual clearing is only needed for the "app becomes active" path (e.g., user returns to app without tapping a notification)
`─────────────────────────────────────────────────`
