---
name: legacy-ios-setup-other-sdk-customizations
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/other_sdk_customizations
indexed_at: '2026-04-05'
keywords:
  - iOS
  - logging
  - IDFV
  - IDFA
  - ATT
  - SDK
  - customization
  - debugging
  - configuration
  - attribution
triggers:
  - how to configure log level
  - set up App Tracking Transparency
  - enable IDFA collection
  - configure iOS SDK logging
  - implement IDFA delegate
---
Here's the condensed topic file:

---

# Legacy iOS SDK Customizations

> **Note:** The Objective-C Braze iOS SDK is deprecated. New integrations should use the Swift SDK.

## Log Level

Default log level is `8` (Minimal). Log levels suppress sensitive info in production builds.

| Level | Description |
|-------|-------------|
| 0 | Verbose — all log info to iOS console |
| 1 | Debug and higher |
| 2 | Warning and higher |
| 4 | Error and higher |
| 8 | Minimal (default) |

Use level `0` for debugging integrations only — never in production. Verbose logging sends no extra user data to Braze.

### Set Log Level at Compile Time (`Info.plist`)

```xml
<key>Braze</key>
<dict>
  <key>LogLevel</key>
  <string>0</string>
</dict>
```

> Prior to SDK v4.0.2, use dictionary key `Appboy` instead of `Braze`.

### Set Log Level at Runtime (SDK v4.4.0+)

**Objective-C:**
```objc
NSMutableDictionary *appboyOptions = [NSMutableDictionary dictionary];
appboyOptions[ABKLogLevelKey] = @(0);
[Appboy startWithApiKey:@"YOUR-API-KEY"
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:appboyOptions];
```

**Swift:**
```swift
let appboyOptions: [AnyHashable: Any] = [ABKLogLevelKey: 0]
Appboy.start(withApiKey: "YOUR-API-KEY", in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: appboyOptions)
```

---

## IDFV Collection (Swift SDK)

- Before Swift SDK v5.7.0: IDFV was automatically collected as the device ID.
- Swift SDK v5.7.0+: IDFV collection is optional. When disabled, Braze sets a random UUID as the device ID instead.

---

## IDFA Collection

IDFA collection is **optional and disabled by default**. Only required for install attribution integrations (e.g., Adjust).

### iOS 14.5+ — App Tracking Transparency

Requires user opt-in via `ATTrackingManager`. Add to `Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>To retarget ads and build a global profile to better serve you things you would like.</string>
```

### Implementation

**Step 1: Implement `ABKIDFADelegate`**

**Objective-C:**
```objc
#import "IDFADelegate.h"
#import <AdSupport/ASIdentifierManager.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>

@implementation IDFADelegate

- (NSString *)advertisingIdentifierString {
  return [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
}

- (BOOL)isAdvertisingTrackingEnabledOrATTAuthorized {
  if (@available(iOS 14, *)) {
    return [ATTrackingManager trackingAuthorizationStatus] == ATTrackingManagerAuthorizationStatusAuthorized;
  }
  return [[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled];
}

@end
```

**Swift:**
```swift
import Appboy_iOS_SDK
import AdSupport
import AppTrackingTransparency

class IDFADelegate: NSObject, ABKIDFADelegate {
  func advertisingIdentifierString() -> String {
    return ASIdentifierManager.shared().advertisingIdentifier.uuidString
  }

  func isAdvertisingTrackingEnabledOrATTAuthorized() -> Bool {
    if #available(iOS 14, *) {
      return ATTrackingManager.trackingAuthorizationStatus == .authorized
    }
    return ASIdentifierManager.shared().isAdvertisingTrackingEnabled
  }
}
```

**Step 2: Register the delegate during initialization**

In the `appboyOptions` dictionary, set `ABKIDFADelegateKey` to an instance of your delegate class before calling `startWithApiKey:`.

---

## SDK Size

| Metric | Size |
|--------|------|
| Framework file | ~30 MB |
| `.ipa` addition | 1–2 MB |

Size is measured per Apple's app thinning guidelines. Compare thinned `.ipa` sizes (not universal `.ipa`) before and after SDK integration for accurate measurement.

> When using CocoaPods with `use_frameworks!`, set `Enable Bitcode = NO` in Build Settings for accurate sizing.

`★ Insight ─────────────────────────────────────`
- The IDFV→UUID fallback (v5.7.0+) is a privacy pivot — device identity shifted from hardware-bound to ephemeral, which affects user re-identification across reinstalls
- `ABKLogLevelKey` uses integer `0` at runtime but a string `"0"` in `Info.plist` — a subtle type mismatch that's a common source of misconfiguration
`─────────────────────────────────────────────────`
