---
name: ios-advanced-locations-and-geofences
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/locations_and_geofences
indexed_at: '2026-04-05'
keywords:
  - geofences
  - locations
  - authorization
  - iOS
  - background
  - push
  - CLLocationManager
  - dashboard
  - Info.plist
  - SDK
triggers:
  - set up geofences on iOS
  - enable location tracking with geofences
  - request location permissions for geofences
  - configure background push notifications
  - disable automatic geofence requests
---
# Locations and Geofences (iOS Legacy SDK)

> **Note:** This content applies to the legacy Objective-C iOS SDK (pre-Swift SDK). The `Appboy`/`ABK` prefixes and `Info.plist` keys reflect this older API surface.

## Prerequisites

- Background push notifications must be integrated
- iOS 14+: Geofences are unreliable for users who grant **approximate** location only — `Always` (precise) authorization is required
- iOS limits apps to **20 geofences** maximum; dashboard geofences consume slots from this budget

## Setup Steps

### 1. Enable Background Push

Silent/background push must be enabled before geofence syncing will work. Braze uses background push to sync geofence data to devices.

Configure your app to ignore Braze internal geofence sync push notifications to avoid unwanted side effects.

### 2. Enable Geofences in Info.plist

Add to `Info.plist`:

```xml
<key>Braze</key>
<dict>
  <key>EnableGeofences</key>
  <true/>
</dict>
```

> Prior to SDK v4.0.2, use `Appboy` as the dictionary key instead of `Braze`.

**Or enable at app startup:**

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

### 3. Add Location Usage Strings to Info.plist

Both keys are required for iOS 11+:

```xml
<key>NSLocationAlwaysUsageDescription</key>
<string>Your description here</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Your description here</string>
```

### 4. Request Always Authorization

Geofences **only work** with `Always` authorization (not "When In Use"):

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

### 5. Enable Geofences on the Dashboard

Geofences must be explicitly enabled per app in the Braze dashboard:
- **Locations page** — toggle geofence option
- **Settings page** — geofence checkbox

## Disabling Automatic Geofence Requests

Available in SDK v3.21.3+. Use when you want manual control over geofence location reporting.

**Via Info.plist:**

```xml
<key>Braze</key>
<dict>
  <key>DisableAutomaticGeofenceRequests</key>
  <true/>
</dict>
```

**Or at startup:**

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

## Manually Requesting Geofences

Available in SDK v3.21.3+. Rate limit: **one geofence refresh per session**.

The SDK reports the provided coordinates to the backend and receives the most relevant geofences for that location.

```objc
// Objective-C
[[Appboy sharedInstance] requestGeofencesWithLongitude:longitude
                                              latitude:latitude];
```

```swift
// Swift
Appboy.sharedInstance()?.requestGeofences(withLongitude: longitude, latitude: latitude)
```

> Recommended: disable automatic geofence requests when using manual requests.

## Key Constraints Summary

| Constraint | Detail |
|---|---|
| iOS geofence limit | 20 per app (shared with Braze) |
| Authorization required | `Always` (precise location) |
| iOS 14+ caveat | Approximate location breaks geofence reliability |
| Refresh rate limit | 1 geofence refresh per session |
| Background push | Required for geofence sync |
