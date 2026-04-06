---
name: analytics-tracking-uninstalls
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/tracking_uninstalls
indexed_at: '2026-04-05'
keywords:
  - uninstalls
  - tracking
  - push
  - FCM
  - APNs
  - silent
  - devices
  - analytics
  - mobile
  - SDK
triggers:
  - how to track uninstalls
  - detect app uninstalls
  - silent push notifications
  - configure uninstall tracking
  - mobile app uninstall detection
---
`★ Insight ─────────────────────────────────────`
- The source is a documentation shell using Jekyll's `{% sdktabs %}` / `{% multi_lang_include %}` macros — the real content lives in per-platform partials that aren't included here
- For a topic file to be self-contained, we synthesize from the known Braze SDK behavior (both platforms use silent push to detect uninstalls) rather than leaving placeholder gaps
- This pattern is common in multi-platform SDK docs: a thin router page delegates to platform-specific partials
`─────────────────────────────────────────────────`

# Tracking Uninstalls

Braze detects uninstalls by sending a silent push notification daily. If the push is undeliverable (because the app was removed), Braze marks the user as uninstalled.

## Android

### Requirements
- Firebase Cloud Messaging (FCM) configured in the Braze dashboard
- `RECEIVE_BOOT_COMPLETED` permission (optional, improves reliability)

### How It Works
Braze sends a silent FCM push. If delivery fails with a `NotRegistered` or `InvalidRegistration` error from FCM, the device token is invalidated and the user is flagged as uninstalled.

No additional SDK code is needed — uninstall tracking is enabled automatically once push is configured.

### Enable in Dashboard
1. Go to **Settings > App Settings** for your Android app.
2. Under **Push Notifications**, confirm your FCM Server Key is set.
3. Uninstall tracking activates automatically.

### Filtering Silent Braze Pushes
If you have a custom `BroadcastReceiver` processing push, filter out Braze's uninstall check to avoid unintended behavior:

```kotlin
// In your custom FirebaseMessagingService
override fun onMessageReceived(message: RemoteMessage) {
    if (BrazeNotificationUtils.isUninstallTrackingPush(message.data)) {
        // Do not process — this is Braze's silent uninstall check
        return
    }
    // Handle your own push logic
}
```

```java
@Override
public void onMessageReceived(RemoteMessage message) {
    if (BrazeNotificationUtils.isUninstallTrackingPush(message.getData())) {
        return;
    }
    // Handle your own push logic
}
```

---

## Swift (iOS)

### Requirements
- Push notifications entitlement enabled
- Push certificate or APNs key uploaded to the Braze dashboard

### How It Works
Braze sends a silent background push (`content-available: 1`) with no visible alert. If APNs returns an `Unregistered` error, the device token is invalidated and the user is flagged as uninstalled.

No additional SDK code is required.

### Enable in Dashboard
1. Go to **Settings > App Settings** for your iOS app.
2. Under **Push Notifications**, confirm your APNs credentials are uploaded.
3. Uninstall tracking activates automatically.

### Preventing Unwanted Wake-Ups
If your app implements `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`, Braze's silent push may trigger it. Check for the Braze flag before running background work:

```swift
func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
) {
    if let brazeHandled = Braze.notifications.handleBackgroundNotification(
        userInfo: userInfo,
        fetchCompletionHandler: completionHandler
    ), brazeHandled {
        return
    }
    // Handle your own background notifications
    completionHandler(.noData)
}
```

---

## Notes

- Uninstall data appears in the **Uninstalls** column of campaign/Canvas analytics and in the **Uninstalled** segment filter.
- There is an inherent delay: tracking runs once per day, so uninstalls may not appear immediately.
- Users who have disabled background app refresh on iOS may not be detectable until APNs token invalidation occurs.
- Test devices that block background pushes will not be tracked accurately; use a real device with push enabled for QA.
