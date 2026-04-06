---
name: push-notifications-logging-message-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/logging_message_data
indexed_at: '2026-04-05'
keywords:
  - push-notifications
  - logging
  - analytics
  - custom-events
  - native-analytics
  - SDK
  - Currents
  - tracking
  - Firebase
  - handler
triggers:
  - how to log push notification data
  - track push opens and delivery
  - custom push event analytics
  - Firebase push integration
  - preserving native analytics with handlers
---
`★ Insight ─────────────────────────────────────`
- Topic files are "atomic knowledge units" — they should be self-contained references, not tutorials. The goal is fast lookup, not step-by-step guidance.
- Removing Liquid template tags (`{{site.baseurl}}/...`), Jekyll alert blocks, and image references is key — these are build-time artifacts that break readability in an embedding context.
- The table differentiating native analytics vs. custom events is high-signal — it's the conceptual anchor for the whole topic and worth preserving verbatim.
`─────────────────────────────────────────────────`

# Push Message Data Logging

## Analytics Types

| Category | Description | Where it appears |
|---|---|---|
| Native push analytics | Push opens, influenced opens, delivery metrics — tied to Braze campaigns | Push campaign analytics, Currents message engagement events, Report Builder |
| Custom events/attributes | Analytics you define via SDK methods or `/users/track` | User profiles, segmentation, action-based campaigns/Canvases |

**Key distinction:** Logging a custom event (e.g. `push_notification_opened`) is NOT the same as native Braze push open tracking. Custom events don't populate native push open metrics or push attribution.

## What Braze Logs Automatically

With a standard SDK integration, Braze automatically logs push opens and influenced opens — no additional code required. See SDK data collection docs for the full list.

## Preserving Native Analytics with a Custom Push Handler

If you use a custom push handler (multiple providers, extra payload processing, custom display logic), you must still pass payloads to Braze SDK methods so Braze can extract embedded tracking data.

### Android

Call `BrazeFirebaseMessagingService.handleBrazeRemoteMessage(...)` inside `onMessageReceived`. Note: `FirebaseMessagingService` must finish within 9 seconds or Android may terminate it.

```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {
  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);
    if (BrazeFirebaseMessagingService.handleBrazeRemoteMessage(this, remoteMessage)) {
      // Braze processed the payload
    } else {
      // Non-Braze payload — pass to other handlers
    }
  }
}
```

### Swift (Manual Integration)

Forward all three notification callback types to Braze:

**Background notifications:**
```swift
if let braze = AppDelegate.braze, braze.notifications.handleBackgroundNotification(
  userInfo: userInfo,
  fetchCompletionHandler: completionHandler
) { return }
completionHandler(.noData)
```

**User notification responses:**
```swift
if let braze = AppDelegate.braze, braze.notifications.handleUserNotification(
  response: response,
  withCompletionHandler: completionHandler
) { return }
completionHandler()
```

**Foreground notifications:**
```swift
func userNotificationCenter(
  _ center: UNUserNotificationCenter,
  willPresent notification: UNNotification,
  withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
) {
  if let braze = AppDelegate.braze {
    braze.notifications.handleForegroundNotification(notification: notification)
  }
  if #available(iOS 14.0, *) {
    completionHandler([.banner, .list, .sound])
  } else {
    completionHandler([.alert, .sound])
  }
}
```

## Logging Custom Data from Push Payloads

Use when you need to log additional data from push payload key-value pairs (custom events or attributes tied to business logic).

### Option A: `/users/track` Endpoint (Real-time)

Call the `/users/track` endpoint directly from your server or push handler. Include `braze_id` in the push payload key-value pairs to identify the user profile.

Note: `braze_id` only identifies the profile — you still need logic to read payload values and construct the `/users/track` request with the events/attributes to log.

### Option B: SDK Methods After App Launch (Deferred)

Save payload data locally, then log custom events and attributes via SDK methods after the app initializes. Common pattern for notification content extension flows: persist analytics data first, flush on next app launch.

**Caveat:** Analytics aren't sent to Braze until the app launches. There can be a delay between notification dismissal and when the app opens and flushes.

## Logging from a Swift Notification Content Extension

### Step 1: Configure App Groups in Xcode

1. Add the `App Groups` capability to your main app target
2. Enable **App Groups** and click **+** to add a new group
3. Use bundle ID pattern: `group.com.company.appname.xyz`
4. Enable **App Groups** on both the main app target and the content extension target

This shared app group is the bridge for passing persisted analytics between the extension and the main app on next launch.
