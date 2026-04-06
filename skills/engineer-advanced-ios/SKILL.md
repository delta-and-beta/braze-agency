---
name: engineer-advanced-ios
description: >-
  Covers advanced integration scenarios including geofences, localization, deep
  linking, Google Tag Manager, network control, and beacon integration.
metadata:
  role: braze-engineer
  topics:
    - ios-advanced-locations-and-geofences
    - ios-advanced-localization
    - ios-advanced-linking
    - ios-advanced-google-tag-manager
    - ios-advanced-fine-network-traffic-control
    - ios-advanced-beacon-integration
    - ios-advanced-use-cases
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files are consumed by Claude at query time, not statically — so they're written for *retrieval-oriented reading*: dense on triggers, concrete on API names, and organized so Claude can scan the quick-reference section and only read deeper sections when actually implementing. That shapes the heading structure here.
`─────────────────────────────────────────────────`

# Advanced iOS SDK Use Cases

## Overview

This skill covers the advanced and edge-case integration scenarios for the Braze iOS SDK, with a focus on the **legacy Objective-C SDK** (`Appboy`/`ABK` prefix APIs). It synthesizes guidance on features that go beyond standard event tracking: precise location and geofence triggering, beacon monitoring, deep linking, SDK-level localization customization, network traffic policy, and third-party tag management via Google Tag Manager.

**Lens:** Edge-case integrations and platform-specific advanced features — reaching for capabilities that require OS-level entitlements, legacy API awareness, or non-default SDK configuration.

Use this skill when an engineer asks about:
- Anything involving `CLLocationManager`, geofences, or beacon ranging in the context of Braze
- Overriding or customizing SDK-provided UI strings
- Deep link handling routed through or intercepted by the Braze SDK
- GTM (Google Tag Manager) as a data layer feeding Braze
- Throttling or controlling network flush behavior in the SDK
- Any integration question referencing `Appboy`, `ABKLocationManager`, or `ABKBeacon`

---

## Topics Synthesized

| Topic | Key Concepts |
|---|---|
| **Advanced Use Cases Overview** | Entry point — geofence architecture, `Always` auth requirement, SDK limitations |
| **Locations & Geofences** | `ABKLocationManager`, `Info.plist` keys, `requestAlwaysAuthorization`, approximate location caveats |
| **iOS SDK Localization** | `Appboy.strings`, bundle override, supported locales, UI string customization |
| **iOS Deep Linking** | Universal links, URI schemes, `ABKURLDelegate`, custom handling hooks |
| **Google Tag Manager Integration** | GTM data layer → Firebase → Braze bridge, legacy `FIRAnalytics` + `Appboy` wiring |
| **Fine Network Traffic Control** | Manual flush, `ABKRequestProcessingPolicy`, offline queuing behavior |
| **Beacon Integration** | `CLBeaconRegion`, `ABKBeacon`, monitoring vs. ranging, triggering campaigns via proximity |

---

## Scope and Constraints

### Legacy SDK Awareness

All geofence, beacon, and GTM content in this skill targets the **Objective-C legacy SDK** (`Appboy`/`ABK` APIs). The Swift SDK introduced breaking naming changes. When the question references `Appboy`, `ABKLocationManager`, or `FIRAnalytics`, apply legacy patterns. When the question uses `Braze.shared` or Swift-idiomatic syntax, defer to the Swift SDK reference instead.

### Platform Entitlements Required

Several features in this skill require non-default iOS entitlements or `Info.plist` declarations:

- **Geofences / Beacons**: `Always` location authorization (`NSLocationAlwaysAndWhenInUseUsageDescription` + capability)
- **Deep Linking**: Associated Domains entitlement for universal links
- **GTM**: Firebase SDK dependency, `GoogleService-Info.plist`

Approximate location (`NSLocationAlwaysUsageDescription` with accuracy reduction) does **not** satisfy geofence requirements — geofences require precise, always-on location.

---

## Quick Reference

### Geofences and Location

```objc
// Request Always authorization (required for geofences)
[CLLocationManager requestAlwaysAuthorization];

// Enable Braze location collection
[[Appboy sharedInstance] startWithApiKey:@"KEY"
                           inApplication:application
                       withLaunchOptions:launchOptions
                       withAppboyOptions:@{
    ABKEnableAutomaticLocationCollectionKey: @YES
}];
```

- Geofences do **not** work with `WhenInUse` authorization
- Maximum ~20 actively monitored regions (iOS OS limit)
- Approximate location (`reducedAccuracy`) silently breaks geofence triggering

### SDK Localization Override

```
// Override a specific string key in your app bundle:
// Add Appboy.strings to your main bundle and override the key
"ABK_FEEDBACK_DISPLAY_NAME_PLACEHOLDER_TEXT" = "Your name";
```

- Braze ships its own `Appboy.strings` in the SDK bundle
- To override: add matching keys in your app's `Localizable.strings` or a custom `Appboy.strings`
- Supported locales are listed in the SDK bundle — unsupported locales fall back to English

### Deep Linking

```objc
// Implement ABKURLDelegate to intercept all URLs
- (BOOL)handleAppboyURL:(NSURL *)url fromChannel:(ABKChannel)channel withExtras:(NSDictionary *)extras {
    // Return YES to indicate you handled it; NO to let Braze handle it
    if ([url.host isEqualToString:@"custom-path"]) {
        // custom routing
        return YES;
    }
    return NO;
}
```

- Set `[Appboy sharedInstance].appboyDelegate` to intercept deep links before Braze acts on them
- Universal links require Associated Domains + `application:continueUserActivity:` passthrough

### Network Traffic Control

```objc
// Manual flush only (no automatic flushing)
[Appboy sharedInstance].requestProcessingPolicy = ABKManualRequestProcessingPolicy;

// Trigger a flush explicitly
[[Appboy sharedInstance] flushDataAndProcessRequestQueue];
```

| Policy | Behavior |
|---|---|
| `ABKAutomaticRequestProcessingPolicy` | Default — flushes automatically |
| `ABKManualRequestProcessingPolicy` | Only flushes when you call `flushDataAndProcessRequestQueue` |

Use manual policy for battery-sensitive apps or when you need to batch data before sending (e.g., end of session).

### Beacon Integration

```objc
// Register a beacon region with Braze
ABKBeacon *beacon = [[ABKBeacon alloc] initWithUUID:proximityUUID major:major minor:minor];
[[Appboy sharedInstance].locationManager logBeaconEntry:beacon];
```

- Braze does not manage `CLBeaconRegion` monitoring itself — you must register regions via `CLLocationManager`
- Call `logBeaconEntry:` / `logBeaconExit:` from your `CLLocationManagerDelegate` callbacks
- Campaigns targeting beacons are configured in the Braze dashboard as location-triggered

### Google Tag Manager Integration

```objc
// GTM fires a dataLayer push → Firebase → custom tag calls Braze
// In your GTM custom tag template (legacy):
[FIRAnalytics logEventWithName:@"braze_event" parameters:@{@"event_name": eventName}];
// ... bridged to Braze via Firebase extension or custom code
```

- GTM does not natively support Braze — the pattern is GTM → Firebase data layer → custom Firebase Function or tag template that calls `[[Appboy sharedInstance] logCustomEvent:...]`
- This is a legacy pattern; newer implementations typically use server-side GTM with Braze's REST API instead of the mobile SDK bridge

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `WhenInUse` auth for geofences | Geofences require `Always` auth — `requestAlwaysAuthorization` |
| Expecting approximate location to trigger geofences | Approximate location silently prevents geofence monitoring |
| Overriding localization by modifying SDK bundle | Override in your app bundle's strings, not inside the SDK framework |
| Implementing `ABKURLDelegate` but not setting the delegate | Must set `[Appboy sharedInstance].appboyDelegate = self` |
| Calling `logBeaconEntry:` without CoreLocation ranging active | You must independently start `CLLocationManager` ranging; Braze only logs, not monitors |
| Manual flush policy with no explicit flush calls | Data accumulates in memory indefinitely — add flush calls at session end or key lifecycle events |
