---
name: legacy-ios-setup-ios-sdk-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/ios_sdk_integration
indexed_at: '2026-04-05'
keywords:
  - iOS
  - SDK
  - Braze
  - BrazeManager
  - AppboyUI
  - Singleton
  - Swift
  - CocoaPods
  - SPM
  - AppDelegate
triggers:
  - how to integrate iOS SDK
  - set up Braze manager
  - initialize Braze SDK
  - configure iOS Braze
  - isolate SDK dependencies
---
No other skills apply to this documentation processing task. Here's the condensed topic file:

---

# Legacy iOS SDK Integration (BrazeManager Pattern)

> **Deprecated**: This guide covers the legacy Objective-C-compatible iOS SDK. New projects should use the Swift SDK.

## Overview

This pattern isolates all Braze SDK dependencies into a single `BrazeManager.swift` helper file, resulting in only **one `import AppboyUI`** across your entire codebase. Benefits: easier tracking, debugging, and SDK version upgrades.

**Prerequisites**: SDK already added to Xcode project via SPM or CocoaPods.

---

## 1. Create BrazeManager.swift

Create a new Swift file named `BrazeManager`. Replace `import Foundation` with the appropriate import:
- SPM: `import AppboyUI`
- CocoaPods: `import Appboy_iOS_SDK`

**Key design decisions:**
- Subclass `NSObject` (not a struct) — required to conform to ABK delegates like `ABKInAppMessageUIDelegate`
- Singleton pattern — single unified access point

```swift
class BrazeManager: NSObject {
  // Lazily initialized singleton
  static let shared = BrazeManager()

  // API key from Braze dashboard workspace
  private let apikey = "YOUR-API-KEY"

  // SDK configuration values (populate as needed)
  private var appboyOptions: [String: Any] {
    return [:]
  }
}
```

```objc
@implementation BrazeManager

+ (instancetype)shared {
    static BrazeManager *shared = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        shared = [[BrazeManager alloc] init];
    });
    return shared;
}

- (NSString *)apiKey { return @"YOUR-API-KEY"; }
- (NSDictionary *)appboyOptions { return [NSDictionary dictionary]; }
```

---

## 2. Initialize the SDK

Add `didFinishLaunchingWithOptions` to `BrazeManager.swift` (mirrors the AppDelegate method signature but without return type):

```swift
// In BrazeManager.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) {
  Appboy.start(withApiKey: apikey, in: application, withLaunchOptions: launchOptions, withAppboyOptions: appboyOptions)
}
```

```objc
- (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Appboy startWithApiKey:[self apiKey] inApplication:application withLaunchOptions:launchOptions withAppboyOptions:[self appboyOptions]];
}
```

Then call it from `AppDelegate.swift` — **no `import AppboyUI` needed in AppDelegate**:

```swift
// In AppDelegate.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  BrazeManager.shared.application(application, didFinishLaunchingWithOptions: launchOptions)
  return true
}
```

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [[BrazeManager shared] application:application didFinishLaunchingWithOptions:launchOptions];
  return YES;
}
```

> **Important**: SDK initialization must happen on the main thread.

**Checkpoint**: After compiling and running, verify sessions appear in the Braze dashboard before proceeding.

---

## 3. Push Notifications

### 3a. Upload Push Certificate
In the Braze dashboard → workspace → **Push Notification Settings**: upload your `.p12` push certificate file.

### 3b. Register for Notifications
Push registration code goes in the `didFinishLaunching...` method inside `BrazeManager.swift`.

**Prerequisites**: Push credentials configured in Apple Developer Portal and Xcode project entitlements.

---

## Integration Checklist

| Step | Location | Required |
|------|----------|----------|
| Create `BrazeManager.swift` with singleton | New file | Yes |
| SDK initialization via `BrazeManager` | `BrazeManager.swift` | Yes |
| Delegate call in `AppDelegate` | `AppDelegate.swift` | Yes |
| Push certificate upload | Braze dashboard | If using push |
| Push registration | `BrazeManager.swift` | If using push |
| In-app message setup | `BrazeManager.swift` extension | Optional |
| Content Cards setup | `BrazeManager.swift` extension | Optional |

---

## Import Summary

| File | Import |
|------|--------|
| `BrazeManager.swift` | `import AppboyUI` (SPM) or `import Appboy_iOS_SDK` (CocoaPods) |
| `AppDelegate.swift` | None (Braze-specific) |
| All other files | None (Braze-specific) |
