---
name: legacy-ios-push-push-primer
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/push_primer
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - ios
  - appdelegate
  - authorization
  - primer
  - deeplink
  - braze
  - campaign
  - usernotification
triggers:
  - how to implement push primer
  - configure push notifications ios
  - set up push permission prompt
  - integrate braze push campaigns
  - handle push notification authorization
---
# Push Primer Integration (iOS)

Push primer campaigns prompt users to enable push notifications for your app. This integration requires three code modifications to your iOS app.

> **Note:** Objective-C support is deprecated. Swift is the recommended path for new integrations.

---

## Step 1: Modify AppDelegate — Conditional Registration

Replace the standard push registration logic in `application(_:didFinishLaunchingWithOptions:)` to skip the authorization prompt if permission has already been determined:

**Swift:**
```swift
if #available(iOS 10, *) {
  let center = UNUserNotificationCenter.current()
  center.getNotificationSettings { settings in
    if settings.authorizationStatus != .notDetermined {
      // Permission already decided — proceed with normal registration
      center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
        Appboy.sharedInstance()?.pushAuthorization(fromUserNotificationCenter: granted)
      }
      center.delegate = self as? UNUserNotificationCenterDelegate
      center.setNotificationCategories(ABKPushUtils.getAppboyUNNotificationCategorySet())
      UIApplication.shared.registerForRemoteNotifications()
    }
  }
} else {
  if UIApplication.shared.currentUserNotificationSettings?.types != nil {
    let settings = UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
    UIApplication.shared.registerUserNotificationSettings(settings)
    UIApplication.shared.registerForRemoteNotifications()
  }
}
```

**Key behavior:** Only registers for notifications if `authorizationStatus != .notDetermined`. When undetermined, the push primer in-app message will show first (Step 3 handles the actual prompt).

---

## Step 2: Add Custom Event Checker

Also in `AppDelegate`, add this check to fire a custom event when authorization status is still undetermined. This event triggers your push primer in-app message campaign in Braze:

**Swift:**
```swift
if #available(iOS 10, *) {
  let center = UNUserNotificationCenter.current()
  center.getNotificationSettings { settings in
    if settings.authorizationStatus == .notDetermined {
      // Fire your custom event here to trigger the push primer IAM
    }
  }
} else {
  if UIApplication.shared.currentUserNotificationSettings?.types == nil {
    // Fire your custom event here
  }
}
```

Configure a Braze in-app message campaign triggered by this custom event. The IAM should deep link back to your app to invoke Step 3.

---

## Step 3: Deep Link Handler — Request Authorization

Inside your deep link handler, request push authorization only when the deep link corresponds to your push primer. This fires the native iOS permission prompt after the user has already expressed interest via the IAM:

**Swift:**
```swift
// Verify this deep link is for the push primer before proceeding
if #available(iOS 10, *) {
  let center = UNUserNotificationCenter.current()
  center.delegate = self as? UNUserNotificationCenterDelegate
  center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
    Appboy.sharedInstance()?.pushAuthorization(fromUserNotificationCenter: granted)
  }
  UIApplication.shared.registerForRemoteNotifications()
} else {
  let settings = UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
  UIApplication.shared.registerUserNotificationSettings(settings)
  UIApplication.shared.registerForRemoteNotifications()
}
```

---

## Flow Summary

```
App launch
  └─ Step 1: authorizationStatus == .notDetermined?
       ├─ YES → Step 2: fire custom event → Braze IAM displays
       │           └─ User taps IAM CTA → deep link fires
       │                 └─ Step 3: iOS native permission prompt shown
       └─ NO  → Normal push registration proceeds
```

For deep link handling setup, see [Link Handling Customization](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/advanced_use_cases/linking/#linking-handling-customization).

---

`★ Insight ─────────────────────────────────────`
- The two-phase approach (IAM → native prompt) improves opt-in rates because users see your custom framing before the OS-level prompt. iOS only allows one chance to show the native prompt per install.
- `ABKPushUtils.getAppboyUNNotificationCategorySet()` registers Braze's default notification action categories (e.g., reply, like) — omitting this limits interactive notification capabilities.
- The `authorizationStatus != .notDetermined` guard in Step 1 is the key architectural choice: it prevents the registration flow from bypassing the primer on subsequent launches after a user has already decided.
`─────────────────────────────────────────────────`
