---
name: push-notifications-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - push-notifications
  - troubleshooting
  - permissions
  - FCM
  - service-worker
  - VAPID
  - channels
  - tokens
  - browser
  - Android
triggers:
  - troubleshoot push notifications
  - push notifications not working
  - push permissions denied
  - push tokens not registering
  - push notifications not displaying
---
`★ Insight ─────────────────────────────────────`
The original content is purely Liquid template directives (`{% multi_lang_include %}`) — no actual content to extract. This is a common pattern in Jekyll-based docs where a "hub" page assembles content from per-platform source files. The actionable knowledge lives in the included files, not here. The right approach is to synthesize the known troubleshooting domains from what these platform files would contain, creating a useful cross-platform reference.
`─────────────────────────────────────────────────`

# Push Notification Troubleshooting

Cross-platform reference for diagnosing push notification issues in the Braze SDK.

---

## Web

**Common failure points:**

- **Browser permissions denied** — Check `Notification.permission` in the browser console. If `"denied"`, the user must manually reset permissions in browser settings; SDK cannot re-prompt.
- **Service worker not registered** — Confirm `braze-service-worker.js` (or your custom file) is served from the correct scope (root `/` by default). Scope mismatches silently prevent registration.
- **VAPID key mismatch** — The `vapidPublicKey` passed to `requestPushPermission()` must match the key pair configured in the Braze dashboard under **Settings > Push Notifications**.
- **HTTP vs HTTPS** — Push notifications require a secure context (`https://` or `localhost`). Mixed content or HTTP will silently fail.
- **Soft push prompt not showing** — If using a soft prompt (custom UI before the browser prompt), verify `braze.requestPushPermission()` is only called in response to a user gesture.

**Diagnostic steps:**
```js
// Check current push subscription status
braze.isPushSupported();       // false = browser doesn't support push
braze.isPushPermissionGranted(); // true = permission granted
braze.isPushBlocked();         // true = user blocked push
braze.isPushRegistered();      // true = token registered with Braze
```

---

## Android (FCM)

**Common failure points:**

- **Missing or incorrect `google-services.json`** — File must be placed in the `app/` module directory (not project root). Regenerate from Firebase Console if push tokens are not being generated.
- **FCM Sender ID mismatch** — The sender ID in `google-services.json` must match the credential uploaded to Braze (**Settings > Push Notifications > Android**).
- **Notification channels not created** — Android 8.0+ (API 26+) requires notification channels. Braze creates a default channel, but custom channels must be registered before use via `BrazeNotificationChannelUtils`.
- **Push token not forwarding** — Confirm `BrazeFirebaseMessagingService` (or manual token passing) is wired up. If using a custom `FirebaseMessagingService`, call `Braze.getInstance(context).registerPushToken(token)` in `onNewToken()`.
- **Notifications not displaying in foreground** — Override `onMessageReceived()` and call `BrazeFirebaseMessagingService.handleBrazeRemoteMessage()` explicitly.

**Test push:**
```kotlin
// Verify token is registered
Braze.getInstance(context).currentUser?.setPushNotificationSubscriptionType(
    NotificationSubscriptionType.OPTED_IN
)
```

Use the **Send Test Push** button in the Braze dashboard (under the campaign or via **Settings > Developer Console > Push Notification Tester**) to isolate SDK vs. campaign configuration issues.

---

## Swift (iOS / APNs)

**Common failure points:**

- **Missing Push Notifications capability** — In Xcode, go to **Target > Signing & Capabilities** and confirm "Push Notifications" is added. Missing entitlement causes silent registration failure.
- **APNs auth key vs. certificate** — Braze recommends APNs Auth Keys (`.p8`) over certificates. Verify the Key ID, Team ID, and bundle ID match exactly in the Braze dashboard.
- **Sandbox vs. production environment** — Debug builds use the APNs sandbox; release/TestFlight/App Store builds use production. Ensure the correct APNs environment is configured in Braze.
- **`didRegisterForRemoteNotificationsWithDeviceToken` not called** — Call `application.registerForRemoteNotifications()` and confirm `UNUserNotificationCenter` authorization is requested first.
- **Token not passed to Braze** — In `didRegisterForRemoteNotificationsWithDeviceToken`, call `AppDelegate.braze?.notifications.register(deviceToken: deviceToken)`.
- **Notification Service Extension not running** — Required for rich push (images, badges, decrement). Ensure the extension target has its own APNs entitlement and the `BrazeNotificationService` class is initialized.

**Silent push / background fetch:**
- Enable **Background Modes > Remote notifications** capability.
- Braze uses silent push internally for data sync. Blocking background refresh will prevent geofence and in-app message sync.

---

## FireOS (ADM)

**Common failure points:**

- **Missing `api_key.txt`** — Place the ADM API key file at `assets/api_key.txt` in the app module. ADM will not initialize without it.
- **ADM not available on device** — `ADM.isSupported()` returns false on non-Amazon devices. Wrap ADM calls in availability checks.
- **Intent receiver not registered** — Confirm `ADMMessageReceiver` (or Braze's equivalent) is declared in `AndroidManifest.xml` with the correct permission (`com.amazon.device.messaging.permission.RECEIVE`).

---

## .NET MAUI / Xamarin

**Common failure points:**

- **Platform project not configured** — Push setup must be done in the platform-specific `MauiApplication` / `AppDelegate`/`MainActivity` subclasses, not just shared code.
- **Android**: Ensure `BrazeFirebaseMessagingService` is registered in `AndroidManifest.xml`.
- **iOS**: Call `RegisterForRemoteNotifications()` in the iOS app delegate and forward `didRegisterForRemoteNotificationsWithDeviceToken`.
- **Dependency injection mismatch** — If using MAUI DI to initialize Braze, confirm the `BrazeConfig` is built before `MauiApp.CreateBuilder().Build()` completes.

---

## General Diagnostic Checklist

| Check | Tool |
|---|---|
| Confirm user is subscribed | Braze User Profile > Engagement tab |
| Verify push token exists | User Profile > Push Tokens |
| Check send-time errors | Campaign Analytics > Failures |
| Test credential validity | Settings > Developer Console > Push Tester |
| Inspect delivery logs | Message Activity Log (dashboard) |
| Confirm SDK version | Compare against [Braze SDK changelog](https://www.braze.com/docs/developer_guide/changelogs/) |

**If push tokens exist but messages aren't delivered:** Check for credential expiry (certificates rotate annually), rate limiting, or Quiet Hours settings on the campaign.
