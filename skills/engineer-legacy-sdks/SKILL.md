---
name: engineer-legacy-sdks
description: 'Maintenance and migration of legacy iOS, tvOS, and macOS SDK implementations.'
metadata:
  role: braze-engineer
  topics:
    - platforms-legacy-sdks
    - legacy-sdks-tvos
    - legacy-sdks-macos
    - legacy-sdks-ios
    - legacy-sdks-macos-initial-sdk-setup
    - legacy-sdks-tvos-initial-sdk-setup
    - legacy-ios-setup-overview
    - legacy-ios-setup-ios-sdk-integration
    - legacy-ios-setup-installation-methods
    - legacy-ios-setup-completing-integration
    - legacy-ios-setup-other-sdk-customizations
    - legacy-ios-setup-swift-package-manager
    - legacy-ios-setup-manual-integration-options
    - legacy-ios-setup-cocoapods
    - legacy-ios-setup-carthage-integration
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `plugin-dev:skill-development` skill reinforces a key Nick architectural pattern: the SKILL.md body acts as a routing/summary layer, while `references/*.md` hold the atomic topic content. The skill tells Claude *what's available*; the topics deliver *what's needed*.
- Writing in imperative form ("Use CocoaPods when...") rather than second-person ("You should use...") is important for AI consumption — it reads as instruction rather than advice
`─────────────────────────────────────────────────`

Here is the generated SKILL.md body:

---

# Legacy SDK Support

## Overview

This skill covers maintenance and migration of Braze's legacy Objective-C SDKs for iOS, tvOS, and macOS (Mac Catalyst). All Objective-C SDKs are deprecated. The primary goal when engaging with legacy SDK work is to assess migration feasibility to the current Swift SDK, or to safely maintain an existing integration when migration is not immediately possible.

**Core lens:** Every legacy SDK question should be answered through a migration-and-compatibility lens — acknowledge what works now, flag the deprecation, and recommend a forward path.

## When to Use This Skill

Apply this skill when:

- A project uses the Braze Objective-C iOS, tvOS, or macOS SDK
- A user asks about CocoaPods, Carthage, or manual installation for the Braze iOS SDK
- A `BrazeManager` pattern or wrapper class is present in the codebase
- Questions involve tvOS or Mac Catalyst (Mac Catalyst = Braze iOS SDK v3.32.0+)
- Log level, deep links, or push notification customization questions reference Objective-C APIs
- A project needs to maintain an older SDK version due to deployment targets or dependency constraints

Do **not** use this skill for current Swift SDK integrations — those are covered by separate Swift SDK skills.

## Platform Coverage and Deprecation Status

| Platform | Legacy SDK | Status | Migration Target |
|----------|-----------|--------|-----------------|
| iOS | Objective-C iOS SDK | Deprecated | Swift iOS SDK |
| tvOS | Objective-C tvOS SDK | Deprecated | Swift tvOS SDK |
| macOS | Mac Catalyst (iOS SDK v3.32.0+) | Deprecated | Swift SDK |

**tvOS note:** The legacy tvOS SDK has a limited feature surface — analytics and Content Cards only. Push notifications, in-app messaging, and News Feed are not supported on tvOS legacy.

## Installation Method Reference

Four installation methods exist for the legacy iOS SDK. Prefer package managers over manual integration.

| Method | Supported Platforms | Notes |
|--------|-------------------|-------|
| Swift Package Manager | iOS only (not tvOS) | Requires Xcode 12+ |
| CocoaPods | iOS, tvOS, macOS | Most common; `Appboy-iOS-SDK` pod |
| Carthage | iOS, tvOS | XCFrameworks supported at v4.4.0+; use `binary` directive |
| Manual | iOS | Last resort; download from GitHub releases |

See `references/installation-methods.md` for step-by-step instructions for each method.

## Integration Architecture: BrazeManager Pattern

The legacy iOS SDK commonly uses a `BrazeManager` singleton wrapper to isolate Braze from the rest of the app. When encountering this pattern:

- `BrazeManager.shared` typically owns the `Appboy` instance
- Initialization happens in `application(_:didFinishLaunchingWithOptions:)` via `BrazeManager.shared.application(_:didFinishLaunchingWithOptions:)`
- Push notification forwarding routes through `BrazeManager` rather than directly calling `Appboy`

This pattern makes migration to the Swift SDK easier — the `BrazeManager` wrapper becomes the migration boundary.

See `references/ios-integration.md` for the full BrazeManager integration pattern and completion steps.

## Key Customization Points

When maintaining legacy integrations, these are the most commonly touched configuration areas:

**Log level** — Set before SDK initialization. Default is `ABKLogLevelInfo`. Use `ABKLogLevelDebug` for troubleshooting:
```objc
[Appboy setLogLevel:ABKLogLevelDebug];
```

**Endpoint configuration** — Pass `ABKEndpointKey` in the `appboyOptions` dictionary at startup.

**Push and deep links** — Configured via `AppboyOptions` keys at initialization or via `AppDelegate` forwarding methods.

See `references/ios-customizations.md` for the full list of legacy customization options.

## Migration Assessment Checklist

When a user asks about updating or migrating a legacy integration, evaluate:

1. **Deployment target** — Swift SDK minimum targets may differ from legacy; check compatibility
2. **Installation method** — SPM is the recommended method for the Swift SDK; CocoaPods and Carthage also work
3. **tvOS projects** — Confirm whether current Swift SDK supports required tvOS features
4. **BrazeManager boundary** — If present, this is the seam for a phased migration
5. **Objective-C/Swift interop** — Mixed-language projects need bridging headers; plan accordingly
6. **Feature parity** — tvOS and macOS Mac Catalyst have feature subsets; verify all required features exist in the target SDK

## Mac Catalyst (macOS) Constraints

Mac Catalyst support requires Braze iOS SDK v3.32.0 or later. When working with Mac Catalyst:

- Integration uses the iOS SDK (not a separate macOS SDK)
- Minimum requirements: macOS 10.15+, Xcode 13+
- Some iOS-only APIs behave differently or are unavailable under Catalyst
- Objective-C usage in Catalyst projects is deprecated — use Swift integrations where possible

See `references/macos-setup.md` for Mac Catalyst setup details.

## Legacy tvOS Constraints

The legacy tvOS SDK is the most limited of the three:

- Supported: Analytics (event tracking, attribute setting), Content Cards
- Not supported: Push notifications, in-app messaging, News Feed
- Integration requires CocoaPods or Carthage (no SPM support in legacy tvOS)
- Initialization follows the same `Appboy` pattern as iOS, but with a tvOS-specific pod/framework

See `references/tvos-setup.md` for the complete legacy tvOS setup procedure.

## References

Consult these topic files for detailed implementation guidance:

- **`references/legacy-sdks-overview.md`** — High-level overview and feature matrix
- **`references/ios-setup-overview.md`** — What the legacy iOS SDK provides and prerequisites
- **`references/ios-installation-methods.md`** — Installation method details and tradeoffs
- **`references/ios-integration.md`** — BrazeManager pattern and completing integration
- **`references/ios-customizations.md`** — Log level, push, deep link, and endpoint configuration
- **`references/tvos-setup.md`** — Legacy tvOS SDK initialization and limitations
- **`references/macos-setup.md`** — Mac Catalyst setup (iOS SDK v3.32.0+)
- **`references/swift-package-manager.md`** — SPM installation steps
- **`references/cocoapods.md`** — CocoaPods Podfile configuration
- **`references/carthage.md`** — Carthage Cartfile and XCFramework setup
- **`references/manual-integration.md`** — Manual download and framework linking

---

`★ Insight ─────────────────────────────────────`
- The skill body deliberately avoids inlining the full topic content — it provides a decision layer (when to use, what's available, key tradeoffs) so Claude can load only the specific `references/` topic file needed at query time
- The migration assessment checklist is the highest-value addition beyond what any single topic covers — it synthesizes cross-topic knowledge that lives nowhere else in the reference files
- Using a deprecation-status table up front satisfies the "migration and compatibility lens" requirement: it orients Claude to answer *every* legacy question with an eye toward what comes next
`─────────────────────────────────────────────────`
