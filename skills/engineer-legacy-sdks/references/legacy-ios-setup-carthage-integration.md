---
name: legacy-ios-setup-carthage-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/installation_methods/carthage_integration
indexed_at: '2026-04-05'
keywords:
  - carthage
  - cartfile
  - xcframework
  - integration
  - migration
  - sdk
  - ios
  - dependencies
  - binary
  - appboy
triggers:
  - how to set up carthage
  - carthage integration steps
  - migrate to xcframework
  - configure cartfile
  - install carthage dependencies
---
# Carthage Integration

> **Deprecated**: This integration uses the legacy Objective-C SDK.

## Cartfile Configuration

### Current (v4.4.0+) — XCFrameworks

```
binary "https://raw.githubusercontent.com/Appboy/appboy-ios-sdk/master/appboy_ios_sdk.json"
github "SDWebImage/SDWebImage"
```

### Legacy v3.24.0–4.3.4

```
binary "https://raw.githubusercontent.com/Appboy/appboy-ios-sdk/master/appboy_ios_sdk_full.json"
```

### Legacy pre-3.24.0

```
github "Appboy/Appboy-iOS-SDK" "<BRAZE_IOS_SDK_VERSION>"
```

Replace `<BRAZE_IOS_SDK_VERSION>` with the version string in `x.y.z` format.

## Core-Only Integration

To install without UI components or dependencies:

```
binary "https://raw.githubusercontent.com/Appboy/appboy-ios-sdk/master/appboy_ios_sdk_core.json"
```

## Migration

If upgrading from pre-4.4.0, follow the [Carthage XCFramework migration guide](https://github.com/Carthage/Carthage#migrating-a-project-from-framework-bundles-to-xcframeworks).

## Key Notes

- XCFramework support was added in v4.4.0
- After adding to `Cartfile`, follow [Carthage quick start](https://github.com/Carthage/Carthage#quick-start) for build/copy steps
- For iOS/tvOS/watchOS-specific Carthage usage, see the [Carthage user guide](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos)
- Complete integration by following the iOS SDK completing-integration steps after Carthage setup
