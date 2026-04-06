---
name: ios-changelog-swift
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/changelog/swift_changelog
indexed_at: '2026-04-05'
keywords:
  - iOS
  - Swift
  - SDK
  - Changelog
  - Migration
  - Breaking
  - Braze
  - Deprecation
  - BrazeKit
  - Version
triggers:
  - What changed in version
  - How to migrate from Objective-C
  - Breaking changes in iOS SDK
  - New features in Swift SDK
  - SDK compatibility requirements
---
# iOS Swift SDK Changelog

## Overview

The Braze iOS Swift SDK changelog documents version history, breaking changes, new features, and deprecations for the `braze-swift-sdk` package.

**Source:** `https://github.com/braze-inc/braze-swift-sdk/blob/main/CHANGELOG.md`

## Objective-C Deprecation

The Objective-C SDK (`Appboy-iOS-SDK`) is deprecated. New iOS integrations should use the Swift SDK (`braze-swift-sdk`). Existing Objective-C projects can interop with the Swift SDK via its Objective-C compatibility layer.

## Changelog Structure

Each release entry follows this format:

```
## X.Y.Z (YYYY-MM-DD)

##### Breaking Changes
- Description of breaking API changes

##### Added
- New features and capabilities

##### Fixed
- Bug fixes

##### Changed
- Behavior changes that are not breaking

##### Removed
- Deprecated APIs removed in this version
```

## Key Reference Points

- **Package manager:** Swift Package Manager (SPM), CocoaPods, Carthage
- **Minimum iOS target:** Check release notes for each version; generally iOS 13+
- **Module name:** `BrazeKit` (core), `BrazeUI` (UI components), `BrazeLocation`, `BrazePushStory`, `BrazeNotificationService`
- **Migration path from Obj-C SDK:** See Braze migration guide; Swift SDK uses `Braze` class instead of `Appboy`

## Finding Specific Changes

When looking up a version:
1. The full changelog is at the GitHub URL above
2. Breaking changes are always listed first under `##### Breaking Changes`
3. Each version header is a GitHub anchor link (e.g., `#xyz-yyyy-mm-dd`)

## Notes for Agents

- The changelog is the authoritative source for "what changed in version X"
- For migration between major versions, cross-reference the breaking changes sections of all intermediate versions
- SPM users: version pinning recommendations are sometimes included in release notes
