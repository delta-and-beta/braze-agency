---
name: legacy-ios-push-action-buttons
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/customization/action_buttons
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - buttons
  - categories
  - iOS
  - Swift
  - handlers
  - interactive
  - actions
  - registration
triggers:
  - how to add action buttons to push
  - setting up interactive push notifications
  - registering push categories
  - handling push notification responses
  - custom notification actions
---
# Push Action Buttons (iOS)

The Braze iOS SDK provides default push categories with action buttons. Four built-in sets are available:

| Category | Buttons |
|----------|---------|
| Confirmation | Accept / Decline |
| Agreement | Yes / No |
| Action | Confirm / Cancel |
| Discovery | More |

## Registering Default Push Categories

Call during push registration setup:

**Swift (iOS 10+ — UserNotifications framework)**
```swift
let appboyCategories = ABKPushUtils.getAppboyUNNotificationCategorySet()
UNUserNotificationCenter.current().setNotificationCategories(appboyCategories)
```

**Swift (pre-iOS 10 — UIUserNotificationSettings)**
```swift
let appboyCategories = ABKPushUtils.getAppboyUIUserNotificationCategorySet()
let settings = UIUserNotificationSettings.init(types: .badge, categories: appboyCategories)
UIApplication.shared.registerUserNotificationSettings(settings)
```

> **Note:** Action buttons with background activation mode dismiss the notification without opening the app. Button click analytics flush to the server on next app open.

## Enabling Interactive Push Handling

### With UNNotification Framework (iOS 10+)

Add to `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:`:

```swift
Appboy.sharedInstance()?.userNotificationCenter(center,
                                                didReceive: response,
                                                withCompletionHandler: completionHandler)
```

### Without UNNotification Framework (deprecated path)

Add to `application:handleActionWithIdentifier:forRemoteNotification:completionHandler:`:

```swift
Appboy.sharedInstance()?.getActionWithIdentifier(identifier,
                                                 forRemoteNotification: userInfo,
                                                 completionHandler: completionHandler)
```

> **Important:** `handleActionWithIdentifier` is deprecated by Apple. Migrate to the `UNNotification` framework.

## Custom Notification Categories

Beyond the defaults, you can register custom categories and actions. Steps:

1. Register custom `UNNotificationCategory` objects in your app
2. Assign the category identifier via the Braze dashboard when sending push
3. The dashboard triggers the corresponding action button configuration

Example: registering a `LIKE_CATEGORY` exposes "Like" / "Unlike" action buttons on the notification.

`★ Insight ─────────────────────────────────────`
- The two-path pattern (UNNotifications vs UIUserNotificationSettings) reflects Apple's iOS 10 framework migration — `UNUserNotificationCenter` replaced the older `UIUserNotificationSettings` API, and Braze mirrors both to support legacy deployments.
- Background activation mode buttons are intentionally non-opening — analytics are queued locally and flushed on next app launch, a common pattern for deferring network calls in backgrounded apps.
- Custom category registration is fully local (your app code), while assignment to specific campaigns is done server-side via the dashboard — this separation keeps the SDK flexible without tight coupling to campaign configuration.
`─────────────────────────────────────────────────`
