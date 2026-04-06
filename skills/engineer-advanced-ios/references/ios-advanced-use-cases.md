---
name: ios-advanced-use-cases
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/locations_and_geofences
indexed_at: '2026-04-05'
keywords:
  - geofences
  - location
  - iOS
  - authorization
  - background push
  - Info.plist
  - CLLocationManager
  - Appboy
  - legacy SDK
triggers:
  - how to set up geofences on iOS
  - enable geofences in Braze
  - request location authorization
  - disable automatic geofence requests
  - manually request geofences
---
# iOS Locations & Geofences (Legacy SDK)

> **Note:** This covers the legacy Objective-C SDK. Geofences require `Always` location authorization and do **not** work reliably with approximate location (iOS 14+).

## Prerequisites

- Background push notifications must be enabled
- iOS limits apps to **20 geofence slots** — dashboard enablement required

## Setup Steps

### 1. Enable Background Push

Enable [silent remote notifications](background push) before geofence setup.

### 2. Enable Geofences

**Via `Info.plist`:**
```xml
<key>Braze</key>
<dict>
  <key>EnableGeofences</key>
  <true/>
</dict>
```
> Prior to SDK v4.0.2, use `Appboy` instead of `Braze`.

**Via startup options:**
```objc
// Objective-C
[Appboy startWithApiKey:@"YOUR-API_KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKEnableGeofencesKey : @(YES) }];
```
```swift
// Swift
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: [ABKEnableGeofencesKey: true])
```

### 3. Suppress Internal Geofence Push

Ensure your app ignores Braze geofence sync notifications (internal background pushes). See Braze iOS push customization docs for `ignoring_internal_push`.

### 4. Add Location Usage Keys to `Info.plist`

Both keys required for iOS 11+:
```xml
<key>NSLocationAlwaysUsageDescription</key>
<string>Description of why location tracking is needed</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Description of why location tracking is needed</string>
```

### 5. Request `Always` Authorization

```objc
// Objective-C
CLLocationManager *locationManager = [[CLLocationManager alloc] init];
[locationManager requestAlwaysAuthorization];
```
```swift
// Swift
var locationManager = CLLocationManager()
locationManager.requestAlwaysAuthorization()
```

### 6. Enable Geofences in Dashboard

Enable per-app on the **Locations page** or **App Settings page**. Verify your app has not exhausted all 20 geofence slots.

---

## Disabling Automatic Geofence Requests (SDK v3.21.3+)

**Via `Info.plist`:**
```xml
<key>Braze</key>
<dict>
  <key>DisableAutomaticGeofenceRequests</key>
  <true/>
</dict>
```

**Via startup options:**
```objc
// Objective-C
[Appboy startWithApiKey:@"YOUR-API_KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKDisableAutomaticGeofenceRequestsKey : @(YES) }];
```
```swift
// Swift
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: [ABKDisableAutomaticGeofenceRequestsKey: true])
```

When disabled, you must manually request geofences.

---

## Manual Geofence Requests (SDK v3.21.3+)

Rate limit: **one geofence refresh per session**. Recommended to disable automatic requests when using manual mode.

```objc
// Objective-C
[[Appboy sharedInstance] requestGeofencesWithLongitude:longitude latitude:latitude];
```
```swift
// Swift
Appboy.sharedInstance()?.requestGeofences(withLongitude: longitude, latitude: latitude)
```

---

## Key Constraints

| Constraint | Detail |
|---|---|
| iOS geofence limit | 20 slots per app |
| Authorization required | `Always` (not `WhenInUse`) |
| Approximate location | Geofences unreliable on iOS 14+ |
| Refresh rate limit | 1 geofence refresh per session |
| Min SDK for manual requests | v3.21.3 |

`★ Insight ─────────────────────────────────────`
- The `ABKEnableGeofencesKey` / `ABKDisableAutomaticGeofenceRequestsKey` startup options and `Info.plist` keys are **equivalent paths** to the same configuration — the topic preserves both since real codebases often use one or the other based on initialization style.
- The 20-slot iOS limit is a hard OS constraint, not a Braze limit — it explains why the dashboard toggle exists (to prevent Nick-generated plugins from accidentally consuming those slots for unintended apps).
- Manual geofence requests are useful when you want to target a specific lat/lon (e.g., a store location the user just searched) rather than their current GPS position.
`─────────────────────────────────────────────────`
