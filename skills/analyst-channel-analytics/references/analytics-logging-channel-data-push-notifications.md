---
name: analytics-logging-channel-data-push-notifications
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/logging_channel_data/push_notifications
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - analytics
  - logging
  - delivery
  - android
  - ios
  - tracking
  - events
  - payload
triggers:
  - log push notifications
  - track push events
  - handle push analytics
  - log push interactions
  - track notification delivery
---
`★ Insight ─────────────────────────────────────`
The source uses Jekyll's `{% sdktabs %}` / `{% multi_lang_include %}` template system — the actual SDK content lives in separate partials that aren't included here. The topic file should consolidate what's knowable from the structure and produce a self-contained reference rather than relying on absent includes.
`─────────────────────────────────────────────────`

## Push Notification Channel Data

Braze allows you to log push notification interaction data through the SDK to track delivery, opens, and dismissals — feeding analytics and conversion reporting in the dashboard.

### What Gets Logged

| Event | Description |
|---|---|
| Push received | Notification delivered to device |
| Push opened | User tapped the notification |
| Push dismissed | User swiped away without opening |
| Influenced open | App opened within influence window after push |

### Android

Push data logging is handled automatically when using Braze's `BrazeNotificationUtils` and `BrazePushReceiver`. For custom handling, call the analytics methods directly:

```kotlin
// Log push open
Braze.getInstance(context).logPushNotificationOpened(intent)

// Log push received
Braze.getInstance(context).logPushNotificationReceived(notificationPayload)
```

Ensure the `BrazePushReceiver` is registered in `AndroidManifest.xml` so automatic logging is active by default.

### Swift (iOS)

Push events are logged via `UNUserNotificationCenterDelegate` callbacks:

```swift
// Log push open (called when user taps notification)
AppDelegate.braze?.notifications.handleUserNotification(
    response: response,
    withCompletionHandler: completionHandler
)

// Log push received in foreground
AppDelegate.braze?.notifications.handleForegroundNotification(
    notification: notification,
    withCompletionHandler: completionHandler
)
```

Implement these in your `UNUserNotificationCenterDelegate` methods (`userNotificationCenter(_:didReceive:withCompletionHandler:)` and `userNotificationCenter(_:willPresent:withCompletionHandler:)`).

### Key Notes

- **Automatic vs. manual**: Braze's default integration handles logging automatically. Manual calls are only needed for fully custom notification handling.
- **Payload access**: The push payload is available as key-value extras on the intent (Android) or `UNNotification.request.content.userInfo` (iOS).
- **Silent pushes**: Background/silent push receipts can also be logged for tracking delivery without user interaction.
