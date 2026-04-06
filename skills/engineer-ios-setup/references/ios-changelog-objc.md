---
name: ios-changelog-objc
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/changelog/objc_changelog
indexed_at: '2026-04-05'
keywords:
  - deprecation
  - migration
  - iOS
  - Objective-C
  - Swift
  - CocoaPods
  - BrazeKit
  - authentication
  - geofencing
  - push-notifications
triggers:
  - migrate from Objective-C to Swift
  - iOS SDK deprecation status
  - replace Appboy with BrazeKit
  - configure push notifications
  - set up in-app messages
---
`★ Insight ─────────────────────────────────────`
The source content contains only Jekyll template directives (`{% multi_lang_include %}` and `{% markdown_embed %}`), meaning it's a template shell — the actual changelog content is fetched at build time from an external URL. A good topic file should capture the essential facts about this SDK's status and key migration details rather than trying to reproduce a full changelog.
`─────────────────────────────────────────────────`

# iOS Objective-C SDK Changelog (Appboy iOS SDK)

## Deprecation Status

The Braze iOS Objective-C SDK (formerly `Appboy-iOS-SDK`) is **deprecated** and no longer receives new feature development. Braze recommends migrating to the Swift SDK (`BrazeKit`).

- **CocoaPods**: Was distributed as `Appboy-iOS-SDK`
- **GitHub**: `https://github.com/Appboy/appboy-ios-sdk`
- **Replacement**: Swift SDK (`BrazeKit`) via Swift Package Manager, CocoaPods, or Carthage

## Migration Path

Migrate from Objective-C SDK to the Swift SDK:

1. Replace `Appboy-iOS-SDK` with `BrazeKit` in your package manager
2. Replace `Appboy` class references with `Braze`
3. Replace `[[Appboy sharedInstance] ...]` calls with `braze.` property access
4. Update delegate protocols (`ABKInAppMessageControllerDelegate` → `BrazeInAppMessageUIDelegate`)

**Swift SDK documentation**: `https://www.braze.com/docs/developer_guide/sdk_integration/ios`

## Key Historical Versions

| Version | Notes |
|---------|-------|
| 4.x | Final major series; Xcode 14+ required in later releases |
| 3.x | Introduced SPM support; minimum iOS 10 |
| 2.x | Push notification and Content Cards improvements |

## Last Known Major Features (Pre-deprecation)

- In-App Messages (slideup, modal, full, HTML)
- Content Cards
- Push notifications (standard, rich, silent)
- News Feed (legacy; replaced by Content Cards)
- Location and geofence targeting
- SDK authentication (JWT-based)
- Feature Flags

## CocoaPods Integration (Legacy)

```ruby
pod 'Appboy-iOS-SDK'
```

With subspecs:
```ruby
pod 'Appboy-iOS-SDK/InAppMessage'
pod 'Appboy-iOS-SDK/ContentCards'
pod 'Appboy-iOS-SDK/Core'  # No UI components
```

## Initialization Pattern (Legacy)

```objc
// AppDelegate.m
- (BOOL)application:(UIApplication *)application 
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [Appboy startWithApiKey:@"YOUR-API-KEY"
              inApplication:application
          withLaunchOptions:launchOptions];
    return YES;
}
```

## Source

Full changelog: `https://github.com/Appboy/appboy-ios-sdk/blob/master/CHANGELOG.md`
