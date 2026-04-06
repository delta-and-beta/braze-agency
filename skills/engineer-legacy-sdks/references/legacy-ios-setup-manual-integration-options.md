---
name: legacy-ios-setup-manual-integration-options
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/installation_methods/manual_integration_options
indexed_at: '2026-04-05'
keywords:
  - xcframework
  - bridging
  - frameworks
  - sdwebimage
  - objective-c
  - swift
  - xcode
  - linking
  - ios
  - integration
triggers:
  - manual iOS SDK integration
  - add required frameworks
  - set up bridging header
  - download and add xcframework
  - configure linker flags
---
# Manual Integration Options (iOS SDK)

> Prefer package managers (Swift Package Manager, CocoaPods, Carthage) when possible. Manual integration is a fallback option.

## Step 1: Download the SDK

**Option A: Dynamic XCFramework**
1. Download `Appboy_iOS_SDK.xcframework.zip` from the [release page](https://github.com/appboy/appboy-ios-sdk/releases) and extract.
2. Drag and drop the `.xcframework` into your Xcode project.
3. In the project's **General** tab, set `Appboy_iOS_SDK.xcframework` to **Embed & Sign**.

**Option B: Static XCFramework**
1. Download `Appboy_iOS_SDK.zip` from the [release page](https://github.com/appboy/appboy-ios-sdk/releases).
2. In Xcode project navigator, select the destination project or group.
3. Navigate to **File > Add Files > Project_Name**.
4. Add `AppboyKit` and `AppboyUI` folders as a group.
   - Select **Copy items into destination group's folder** on first integration.
   - Delete `AppboyKit/include` and `AppboyUI/include` directories.
5. (Optional) Core-only SDK: Remove `ABKSDWebImageProxy.m` and `Appboy.bundle` to drop `SDWebImage` dependency and all UI resources (Nib files, images, localization). **Note:** Without UI resources, in-app messages won't display and Content Cards UI will behave unpredictably.

## Step 2: Add Required iOS Libraries

In the project target's **Build Phases > Link Binary With Libraries**, add the following as **required**:
- `SystemConfiguration.framework`
- `QuartzCore.framework`
- `libz.tbd`
- `CoreImage.framework`
- `CoreText.framework`
- `WebKit.framework`

Add as **optional**:
- `CoreTelephony.framework`

In **Build Settings > Linking > Other Linker Flags**, add: `-ObjC`

### SDWebImage (required for Content Cards and in-app messages)

Follow [SDWebImage installation instructions](https://github.com/SDWebImage/SDWebImage/wiki/Installation-Guide#build-sdwebimage-as-xcframework), then drag the resulting `XCFramework` into your project.

### Location Tracking (optional)

1. Add `CoreLocation.framework`.
2. Request location authorization via `CLLocationManager` in your app.

## Step 3: Objective-C Bridging Header (Swift projects only)

Skip if your project is Objective-C only.

1. Create `your-product-module-name-Bridging-Header.h` via **File > New > File > (iOS/OS X) > Source > Header File**.
2. Add to the top of the bridging header:
   ```objc
   #import "AppboyKit.h"
   ```
3. In **Build Settings > Swift Compiler - Code Generation > Objective-C Bridging Header**, set the relative path to your header file.

## Next Step

Complete the integration by following the [completing the integration](https://www.braze.com/docs/developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/completing_integration/) guide.
