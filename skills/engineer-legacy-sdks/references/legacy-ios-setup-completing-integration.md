---
name: legacy-ios-setup-completing-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/completing_integration
indexed_at: '2026-04-05'
keywords:
  - iOS
  - Braze
  - Appboy
  - AppDelegate
  - SDK
  - CocoaPods
  - initialization
  - endpoint
  - Carthage
  - Swift
triggers:
  - complete iOS integration
  - initialize AppDelegate
  - configure custom endpoint
  - set up Braze SDK
  - legacy iOS setup
---
`★ Insight ─────────────────────────────────────`
This is Jekyll-templated docs with `{% tabs %}` liquid tags, `{% alert %}` blocks, and `{{site.baseurl}}` URL references — all build-time artifacts that need to be stripped. The goal is to distill the imperative steps and code examples while discarding the templating scaffolding.
`─────────────────────────────────────────────────`

---

## Completing Legacy iOS Integration (Objective-C SDK)

> **Deprecated**: This covers the legacy Objective-C Braze iOS SDK (`Appboy`). New projects should use the Swift SDK.

### Prerequisites

SDK must already be installed via Carthage, CocoaPods, Swift Package Manager, or manual integration.

---

### Step 1: Update AppDelegate

**Import** — choose based on integration method:

| Integration Method | Import |
|---|---|
| CocoaPods, Carthage, dynamic manual | `#import "Appboy-iOS-SDK/AppboyKit.h"` (ObjC) / `import Appboy_iOS_SDK` (Swift) |
| Swift Package Manager, static manual | `#import "AppboyKit.h"` (ObjC) / `import AppboyKit` (Swift) |

**Initialize** in `application:didFinishLaunchingWithOptions:`:

```objc
// Objective-C
[Appboy startWithApiKey:@"YOUR-APP-IDENTIFIER-API-KEY"
          inApplication:application
      withLaunchOptions:launchOptions];
```

```swift
// Swift
Appboy.start(withApiKey: "YOUR-APP-IDENTIFIER-API-KEY",
             in: application,
             withLaunchOptions: launchOptions)
```

**Critical notes:**
- `Appboy.sharedInstance()` is `nil` until `startWithApiKey:` is called — do not access it before initialization.
- Must be called on the **main thread**. Async initialization causes broken functionality.
- Find `YOUR-APP-IDENTIFIER-API-KEY` in the Braze dashboard under **Manage Settings**.

---

### Step 2: Configure Data Cluster (Custom Endpoints Only)

Custom endpoints were discontinued after December 2019. Only applies if you have a pre-existing custom endpoint.

**Option A — Compile-time via Info.plist (recommended):**

Add to `Info.plist`:
```xml
<key>Braze</key>
<dict>
    <key>Endpoint</key>
    <string>sdk.iad-01.braze.com</string>  <!-- authority only, no https:// -->
</dict>
```
> Before SDK v4.0.2, use dictionary key `Appboy` instead of `Braze`.  
> Available from SDK v3.0.2+.

**Option B — Runtime via `appboyOptions`:**

Pass `ABKEndpointKey` in the options dictionary (SDK v3.17.0+):
```objc
appboyOptions[ABKEndpointKey] = @"sdk.iad-01.braze.com";
```

---

### Optional: Startup Customization

Use the extended initializer to pass configuration options:

```objc
// Objective-C
[Appboy startWithApiKey:@"YOUR-APP-IDENTIFIER-API-KEY"
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:appboyOptions];
```

```swift
// Swift
Appboy.start(withApiKey: "YOUR-APP-IDENTIFIER-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: appboyOptions)
```

`appboyOptions` is an `NSDictionary` of startup keys. Full key list: [`Appboy.h`](https://github.com/braze-inc/braze-ios-sdk/blob/master/AppboyKit/include/Appboy.h).

This replaces the basic `startWithApiKey:inApplication:withLaunchOptions:` call.

---

### Integration Complete

After these steps, Braze collects data from your app. Next steps:
- Custom event tracking
- Push notification integration
- Full Braze feature suite

### Swift Nullability Note

`Appboy.sharedInstance()` returns an optional. It is `nil` before `startWithApiKey:` is called. Delayed initialization is technically supported but non-standard — calling `startWithApiKey:` in `didFinishLaunchingWithOptions:` before any `sharedInstance` access is the standard pattern.

`★ Insight ─────────────────────────────────────`
The original content used Jekyll's `{% tabs %}` liquid blocks to present ObjC/Swift code side-by-side. When converting to topic files, collapsing these into sequential labeled code blocks (ObjC comment, then Swift comment) preserves the information without requiring any templating engine. The table for import variants is also more scannable than tab-switched prose for a reference file.
`─────────────────────────────────────────────────`
