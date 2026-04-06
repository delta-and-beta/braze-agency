---
name: legacy-ios-push-ignoring-internal-push
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/customization/ignoring_internal_push
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - ios
  - geofencing
  - uninstall
  - background
  - detection
  - tracking
  - braze
  - appboy
triggers:
  - ignoring internal push notifications
  - gating push logic
  - detecting braze internal push
  - handling background push
  - preventing unnecessary network traffic
---
# Ignoring Braze Internal Push Notifications

Braze sends silent push notifications internally for features like **uninstall tracking** and **geofences sync**. If your app takes automatic actions on background push or app launch, gate that logic to avoid:
- Unnecessary network traffic
- Server load spikes (Braze sends internal pushes to all users simultaneously)

## Detection Utility: `ABKPushUtils`

| Method | Returns YES when |
|--------|-----------------|
| `isAppboyInternalRemoteNotification:` | Any Braze internal push |
| `isUninstallTrackingRemoteNotification:` | Uninstall tracking push |
| `isGeofencesSyncRemoteNotification:` | Geofences sync push |

Reference: [`ABKPushUtils.h`](https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/include/ABKPushUtils.h)

## Where to Add Gating

### 1. App Launch (`didFinishLaunchingWithOptions`)

Background pushes can launch suspended apps, triggering launch delegate methods. Check `launchOptions` to gate logic.

**Swift:**
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
  let pushDictionary = launchOptions?[UIApplicationLaunchOptionsKey.remoteNotification] as? NSDictionary as? [AnyHashable : Any] ?? [:]
  let launchedFromAppboyInternalPush = ABKPushUtils.isAppboyInternalRemoteNotification(pushDictionary)
  if (!launchedFromAppboyInternalPush) {
    // Gated logic (e.g., ping server to download content)
  }
}
```

**Objective-C:**
```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSDictionary *pushDictionary = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
  BOOL launchedFromAppboyInternalPush = pushDictionary && [ABKPushUtils isAppboyInternalRemoteNotification:pushDictionary];
  if (!launchedFromAppboyInternalPush) {
    // Gated logic (e.g., ping server to download content)
  }
}
```

### 2. Background Push Receiver (`didReceiveRemoteNotification`)

**Swift:**
```swift
func application(_ application: UIApplication,
                 didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                 fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
  if (!ABKPushUtils.isAppboyInternalRemoteNotification(userInfo)) {
    // Gated logic (e.g., ping server for content)
  }
}
```

**Objective-C:**
```objc
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  if (![ABKPushUtils isAppboyInternalRemoteNotification:userInfo]) {
    // Gated logic (e.g., ping server for content)
  }
}
```

## Key Points

- `application:willFinishLaunchingWithOptions:` and `application:didFinishLaunchingWithOptions:` are both triggered by background pushes — gate both if used
- Most integrations require **no changes** unless you rely on uninstall tracking or geofences
