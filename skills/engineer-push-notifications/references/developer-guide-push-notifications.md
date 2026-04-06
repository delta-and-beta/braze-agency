---
name: developer-guide-push-notifications
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - permissions
  - tokens
  - registration
  - service-worker
  - FCM
  - deep-links
  - debugging
  - configuration
triggers:
  - push notifications not working
  - troubleshoot push delivery
  - push permission issues
  - service worker not registering
  - why is my push failing
---
## Push Notifications Troubleshooting

Reference for diagnosing push notification issues across Braze SDK platforms.

---

### Web

**Common issues:**
- **No prompt shown** — Browser push permission must be requested via `requestPushPermission()`. Cannot auto-prompt; must be user-triggered.
- **Service worker not registering** — Ensure `service-worker.js` is served from the root scope (`/`). A service worker at `/assets/service-worker.js` will only control `/assets/`.
- **Safari differences** — Safari requires `safariWebsitePushID` in initialization config. Check `braze.isPushPermissionGranted()` and `braze.isPushBlocked()`.
- **HTTPS required** — Push only works on HTTPS (or `localhost` for dev).

---

### Android

**Common issues:**
- **FCM not configured** — Verify `google-services.json` is placed in the `app/` module directory, not project root.
- **Push not received** — Check that `BrazeFirebaseMessagingService` is registered in `AndroidManifest.xml` and `braze.xml` contains a valid FCM sender ID.
- **Notification not displayed** — Confirm `automatic_firebase_push_registration_enabled` is set to `true`, or that you're manually registering via `Braze.setRegisteredPushToken()`.
- **Deep links not opening** — Ensure `BrazeDeepLinkActivity` or a custom `UriAction` handler is registered.

---

### Swift (iOS)

**Common issues:**
- **No push prompt** — Must call `requestAuthorization` on `UNUserNotificationCenter`. Braze does not auto-prompt.
- **Token not registering** — Confirm `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` calls `AppDelegate.braze?.notifications.register(deviceToken:)`.
- **Silent push not working** — Background Modes → Remote notifications must be enabled in Xcode capabilities.
- **Rich push not showing** — Notification Service Extension must be added to the target. Check that `BrazeNotificationService` is subclassed and the app group is configured.
- **Provisional push** — Use `.provisional` authorization to send quiet push without a permission prompt.

---

### Fire OS (Amazon)

Follows Android troubleshooting. Additional:
- Use ADM (Amazon Device Messaging) instead of FCM.
- Verify `api_key.txt` is in `assets/` directory.
- Confirm `amazon-device-messaging-*.jar` is in `libs/`.
- Register `ADMMessageHandlerBase` subclass in `AndroidManifest.xml`.

---

### .NET MAUI / Xamarin

**Common issues:**
- **Android** — Confirm `BrazeFirebaseMessagingService` is registered. Use `Braze.getInstance(context).RegisterAppboyPushMessages(token)` for manual token registration.
- **iOS** — Ensure `RegisteredForRemoteNotifications` in `AppDelegate` passes the device token to Braze. Enable push capabilities in entitlements.
- **Shared logic** — Use platform-specific `#if` guards for push registration code.

---

### General Debugging Steps

1. Check device/browser push permissions are granted (not blocked).
2. Verify the push token is appearing in the Braze dashboard under the user profile.
3. Confirm the correct API key / sender ID is configured for the target environment (dev vs. prod).
4. On iOS, development and production APNs certificates are separate — test builds require a dev certificate.
5. Use the Braze **Message Activity Log** in the dashboard to confirm sends and see delivery errors.
6. Check that the device is not in a **do not disturb** or **focus mode** suppressing notifications.
