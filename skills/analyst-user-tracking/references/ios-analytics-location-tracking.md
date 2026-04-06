---
name: ios-analytics-location-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/location_tracking
indexed_at: '2026-04-05'
keywords:
  - location
  - tracking
  - geolocation
  - iOS
  - coordinates
  - altitude
  - permissions
  - GPS
  - session
triggers:
  - enable location tracking on iOS
  - set user location manually
  - configure location tracking in Info.plist
  - how to track user GPS coordinates
  - request location permission in Braze
---
# iOS Location Tracking

## Overview

Braze disables location tracking by default. Location tracking activates after the host app opts in and the user grants permission. When enabled, Braze logs a **single location per user on session start**.

> **iOS 14 note:** For reliable location tracking with approximate location permission, use SDK `>= 3.26.1`.

---

## Enabling Automatic Location Tracking

### Via `Info.plist` (recommended)

Add a `Braze` dictionary to `Info.plist` with a `EnableAutomaticLocationCollection` boolean set to `YES`.

> **Note:** Prior to SDK v4.0.2, use `Appboy` as the dictionary key instead of `Braze`.

### Via App Startup

Pass `ABKEnableAutomaticLocationCollectionKey: YES` in `appboyOptions` during initialization:

**Objective-C:**
```objc
[Appboy startWithApiKey:@"YOUR-API-KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKEnableAutomaticLocationCollectionKey : @(YES) }];
```

**Swift:**
```swift
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: [ABKEnableAutomaticLocationCollectionKey: true])
```

---

## Manually Setting User Location

Use these methods to manually pass the last known location to Braze.

**Without altitude:**

```objc
// Objective-C
[[Appboy sharedInstance].user setLastKnownLocationWithLatitude:latitude
                                                     longitude:longitude
                                            horizontalAccuracy:horizontalAccuracy];
```

```swift
// Swift
Appboy.sharedInstance()?.user.setLastKnownLocationWithLatitude(
    latitude: latitude,
    longitude: longitude,
    horizontalAccuracy: horizontalAccuracy)
```

**With altitude:**

```objc
// Objective-C
[[Appboy sharedInstance].user setLastKnownLocationWithLatitude:latitude
                                                     longitude:longitude
                                            horizontalAccuracy:horizontalAccuracy
                                                      altitude:altitude
                                              verticalAccuracy:verticalAccuracy];
```

```swift
// Swift
Appboy.sharedInstance()?.user.setLastKnownLocationWithLatitude(
    latitude: latitude,
    longitude: longitude,
    horizontalAccuracy: horizontalAccuracy,
    altitude: altitude,
    verticalAccuracy: verticalAccuracy)
```

Reference: `ABKUser.h` in the Braze iOS SDK.

---

`★ Insight ─────────────────────────────────────`
- The original docs use Jekyll `{% tabs %}` liquid tags and `{% multi_lang_include %}` partials — these are stripped in topic files since they're rendering artifacts, not content.
- The two `setLastKnownLocation` overloads (with/without altitude) share the same base signature; keeping both variants in the topic file is important since callers may only have 2D GPS data.
- Braze's dictionary key migration (`Appboy` → `Braze`) between SDK versions is a common source of silent failures — worth preserving as a callout rather than removing as "boilerplate."
`─────────────────────────────────────────────────`
