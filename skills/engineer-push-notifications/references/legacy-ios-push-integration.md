---
name: legacy-ios-push-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/integration
indexed_at: '2026-04-05'
keywords:
  - push
  - APNs
  - iOS
  - notifications
  - Xcode
  - Objective-C
  - certificates
  - registration
  - legacy
  - UserNotifications
triggers:
  - how to set up iOS push notifications
  - configure APNs tokens
  - register for push notifications iOS
  - legacy iOS push integration
  - Objective-C push notification setup
---
`★ Insight ─────────────────────────────────────`
- Jekyll `{% include %}` and `{% image_buster %}` tags are template directives that don't render in plain markdown — they must be replaced with plain-text descriptions or removed
- The original uses `Appboy` (legacy SDK name) instead of `Braze` — worth preserving as-is since this is explicitly a *legacy* integration topic
- Liquid `{% tabs %}` blocks map naturally to markdown code blocks with language labels
`─────────────────────────────────────────────────`

# Legacy Push Integration (iOS / Objective-C SDK)

> **Deprecated**: This guide covers the legacy Objective-C Braze SDK. For new projects, use the Swift SDK.

---

## Step 1: Upload Your APNs Token

Upload your APNs authentication token or certificate via the Braze dashboard under **Settings > App Settings > Push Notifications**.

---

## Step 2: Enable Push Capabilities in Xcode

In **Project Settings > Capabilities**, toggle **Push Notifications** on.

If using separate development and production push certificates: uncheck **Automatically manage signing** in the **General** tab so you can choose different provisioning profiles per build configuration (Xcode's auto signing only handles development signing).

---

## Step 3: Register for Push Notifications

Call all push integration code in your app's **main thread**, inside `application:didFinishLaunchingWithOptions:`.

### With UserNotifications Framework (iOS 10+ — Recommended)

**Objective-C:**
```objc
if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_9_x_Max) {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;  // Must be set synchronously before app finishes launching
  UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
  if (@available(iOS 12.0, *)) {
    options = options | UNAuthorizationOptionProvisional;  // Remove if not using provisional auth
  }
  [center requestAuthorizationWithOptions:options
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
                          [[Appboy sharedInstance] pushAuthorizationFromUserNotificationCenter:granted];
  }];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
} else {
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:nil];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
}
```

**Swift:**
```swift
if #available(iOS 10, *) {
  let center = UNUserNotificationCenter.current()
  center.delegate = self as? UNUserNotificationCenterDelegate
  var options: UNAuthorizationOptions = [.alert, .sound, .badge]
  if #available(iOS 12.0, *) {
    options = UNAuthorizationOptions(rawValue: options.rawValue | UNAuthorizationOptions.provisional.rawValue)
  }
  center.requestAuthorization(options: options) { (granted, error) in
    Appboy.sharedInstance()?.pushAuthorization(fromUserNotificationCenter: granted)
  }
  UIApplication.shared.registerForRemoteNotifications()
} else {
  let types: UIUserNotificationType = [.alert, .badge, .sound]
  let setting = UIUserNotificationSettings(types: types, categories: nil)
  UIApplication.shared.registerUserNotificationSettings(setting)
  UIApplication.shared.registerForRemoteNotifications()
}
```

> **Critical**: Set `center.delegate = self` synchronously before the app finishes launching (i.e., in `application:didFinishLaunchingWithOptions:`). Doing it later may cause missed push notifications. See [`UNUserNotificationCenterDelegate`](https://developer.apple.com/documentation/usernotifications/unusernotificationcenterdelegate).

> **Re-registration**: Call this code every time the app runs after push permissions are granted — APNs device tokens can change arbitrarily.

### Without UserNotifications Framework (iOS 9 and below)

**Objective-C:**
```objc
UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:nil];
[[UIApplication sharedApplication] registerForRemoteNotifications];
[[UIApplication sharedApplication] registerUserNotificationSettings:settings];
```

**Swift:**
```swift
let types: UIUserNotificationType = UIUserNotificationType.Badge | UIUserNotificationType.Sound | UIUserNotificationType.Alert
let setting = UIUserNotificationSettings(forTypes: types, categories: nil)
UIApplication.shared.registerUserNotificationSettings(setting)
UIApplication.shared.registerForRemoteNotifications()
```

---

## Step 4: Register Push Tokens with Braze

In your `application:didRegisterForRemoteNotificationsWithDeviceToken:` delegate, pass the token to Braze:

**Objective-C:**
```objc
[[Appboy sharedInstance] registerDeviceToken:deviceToken];
```

**Swift:**
```swift
Appboy.sharedInstance()?.registerDeviceToken(deviceToken)
```

> This delegate fires every time `registerForRemoteNotifications` is called. When migrating from another push provider, existing APNs registrations are collected automatically — users do not need to re-opt-in.

---

## Step 5: Enable Push Handling (iOS 10+)

Integrate `UserNotifications` framework for push analytics and link handling. Add the following to your app delegate — all push integration code must run on the **main thread**.

Add the implementation to `application:didReceiveRemoteNotification:fetchCompletionHandler:` (content truncated in source — refer to the full Braze iOS SDK push handling docs for the complete delegate method bodies).

---

## Additional Notes

- **Push action buttons**: Default Braze push categories must be manually added to push registration code. See the push action buttons customization guide.
- **Provisional authorization** (`UNAuthorizationOptionProvisional`, iOS 12+): Sends notifications quietly to the Notification Center without prompting the user upfront. Remove `UNAuthorizationOptionProvisional` from `requestAuthorization` options if not using this feature.

`★ Insight ─────────────────────────────────────`
- The original doc truncates mid-Step 5 — the output preserves this gracefully with a note rather than fabricating content
- `UNAuthorizationOptionProvisional` is a nuanced iOS 12 feature worth calling out explicitly: it enables "trial" push delivery without the permission prompt, which affects opt-in rate metrics in Braze
- The `Appboy` → `Braze` naming shift is a real migration detail: older integrations use `[Appboy sharedInstance]` while the modern Swift SDK uses `BrazeKit`
`─────────────────────────────────────────────────`
