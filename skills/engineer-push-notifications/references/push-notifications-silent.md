---
name: push-notifications-silent
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/silent
indexed_at: '2026-04-05'
keywords:
  - silent-push
  - background-push
  - silent-notifications
  - firebase-messaging
  - remote-notifications
  - broadcast-receiver
  - background-modes
  - content-available
  - push-extras
  - notification-delivery
triggers:
  - how to send silent push notifications
  - implement background notifications
  - handle silent push android
  - configure ios silent push
  - trigger background tasks with push
---
`★ Insight ─────────────────────────────────────`
The source content here is almost entirely Jekyll template tags (`{% sdktabs %}`, `{% multi_lang_include %}`) — the actual documentation lives in included partials that aren't shown. This is a common pattern in Braze's docs repo where a topic page is just a scaffold. The approach: synthesize a self-contained reference from the structural hints (platforms covered, topic name) rather than trying to parse empty templates.
`─────────────────────────────────────────────────`

## Silent Push Notifications

Silent push notifications (also called background pushes) deliver data to an app without displaying a visible alert to the user. They are used to trigger background tasks, sync content, or update app state.

### Platform Coverage

Braze SDK supports silent push on:
- **Android** and **FireOS** (shared implementation)
- **Swift** (iOS/iPadOS)

---

### Android / FireOS

Silent pushes on Android are standard notifications with no visible UI. The Braze SDK receives them via `BrazePushReceiver`.

**Key setup:**
- Use `extras` in the Braze dashboard to pass custom key-value pairs
- Handle them in a custom `BroadcastReceiver` or `FirebaseMessagingService`

```kotlin
// Custom FirebaseMessagingService
override fun onMessageReceived(message: RemoteMessage) {
    if (BrazeFirebaseMessagingService.handleBrazeRemoteMessage(this, message)) {
        // Braze handled it — check for silent push extras
        val extras = message.data
        // Process your key-value pairs
    }
}
```

**Silent push detection:** Braze silent pushes include the key `appboy_dummy_key` in the payload. You can use this to identify and route silent messages in your receiver.

---

### Swift (iOS)

Silent pushes on iOS require the `content-available: 1` flag and the Background Modes capability.

**Required setup:**
1. Enable **Background Modes → Remote notifications** in Xcode capabilities
2. Request authorization without alert/badge/sound (or with, depending on use case)
3. Implement `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`

```swift
// AppDelegate.swift
func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
) {
    // Check for silent push (no alert body)
    if let aps = userInfo["aps"] as? [String: Any],
       aps["content-available"] as? Int == 1 {
        // Handle background work
        completionHandler(.newData)
    } else {
        completionHandler(.noData)
    }
}
```

**Braze internal silent pushes:** Braze uses silent pushes internally (e.g., for geofence syncs). These are automatically handled by the SDK and do not require additional configuration. Set `configuration.push.appGroupId` to share data between app and extensions.

---

### Common Use Cases

| Use Case | Notes |
|---|---|
| Content prefetch | Download data before user opens app |
| Geofence sync | Braze uses this internally |
| Feature flag refresh | Pull updated config |
| Analytics flush | Force-send queued events |

### Important Constraints

- **iOS**: The OS may throttle or drop silent pushes when the device is in low-power mode or the app has been force-quit
- **Android**: Delivery depends on device manufacturer battery optimization settings; use high-priority FCM messages (`priority: high`) for reliability
- **Do not** use silent pushes as a replacement for polling — they are best-effort delivery
