---
name: legacy-sdks-tvos-initial-sdk-setup
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/tvos/initial_sdk_setup
indexed_at: '2026-04-05'
keywords:
  - tvOS
  - SDK
  - CocoaPods
  - initialization
  - Objective-C
  - endpoint
  - deprecated
  - installation
  - analytics
  - bitcode
triggers:
  - how to install tvOS SDK
  - set up Braze on tvOS
  - configure tvOS endpoint
  - initialize Appboy in app delegate
---
# Legacy tvOS SDK Setup (Deprecated)

> **Deprecated**: This article covers the legacy Objective-C tvOS SDK setup. New projects should use the current Swift SDK.

The tvOS Braze SDK currently supports **analytics functionality only**. To add a tvOS app in your dashboard, open a support ticket.

---

## Installation via CocoaPods

**Prerequisite**: Ruby 2.0.0 or greater.

```bash
sudo gem install cocoapods
```

### Podfile configuration

```ruby
target 'YourAppTarget' do
  pod 'Appboy-tvOS-SDK'
end
```

Pin to minor version to avoid breaking changes:
```ruby
pod 'Appboy-tvOS-SDK' ~> Major.Minor.Build
```

### Install

```bash
pod install
```

Open the generated `.xcworkspace` file — not the `.xcodeproj`.

---

## App Delegate Initialization

**Objective-C** (`AppDelegate.m`):
```objc
#import <AppboyTVOSKit/AppboyKit.h>

// In application:didFinishLaunchingWithOptions:
[Appboy startWithApiKey:@"YOUR-API-KEY"
         inApplication:application
     withLaunchOptions:launchOptions];
```

**Swift** (`AppDelegate.swift`):
```swift
import AppboyTVOSKit

// In application(_:didFinishLaunchingWithOptions:)
Appboy.start(withApiKey: "YOUR-API-KEY", in: application, withLaunchOptions: launchOptions)
```

> **Critical**: Initialize Braze on the **main thread**. Async initialization causes broken functionality. `sharedInstance` returns nil until `startWithApiKey:` is called.

API key is found under **Manage Settings** in the Braze dashboard.

---

## Custom Endpoint Configuration

Custom endpoints are no longer issued as of December 2019. Pre-existing custom endpoints remain supported.

**Compile-time** (recommended, SDK v3.0.2+): Add to `Info.plist`:
```
Appboy > Endpoint = sdk.iad-01.braze.com  (no https:// prefix)
```

**Runtime** (SDK v3.17.0+): Pass via `appboyOptions`:
```objc
appboyOptions[ABKEndpointKey] = @"sdk.iad-01.braze.com";
```

> Note: `ABKAppboyEndpointDelegate` was removed in SDK v3.17.0. For v3.14.1–v3.16.0, replace `dev.appboy.com` references with `sdk.iad-01.braze.com` in `getApiEndpoint()`.

---

## Startup Customization

Use the extended init method to pass startup options:

**Objective-C**:
```objc
[Appboy startWithApiKey:@"YOUR-API-KEY"
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:appboyOptions];
```

**Swift**:
```swift
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: appboyOptions)
```

`appboyOptions` is an `NSDictionary` of startup keys — see `Appboy.h` for the full list.

---

## Post-Integration Notes

- **Bitcode must be enabled** when compiling tvOS apps with third-party libraries
- Update SDK: `pod update`
- `Appboy.sharedInstance()` returns an optional in Swift — guard against nil before use
