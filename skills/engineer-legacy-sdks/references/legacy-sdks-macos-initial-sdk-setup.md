---
name: legacy-sdks-macos-initial-sdk-setup
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/macOS/initial_sdk_setup
indexed_at: '2026-04-05'
keywords:
  - macOS
  - SDK
  - Swift
  - Catalyst
  - Braze
  - Push
  - InApp
  - ContentCards
  - Integration
  - SPM
triggers:
  - set up macOS SDK
  - integrate Braze on Mac Catalyst
  - enable push notifications on macOS
  - configure Swift Package Manager
  - support content cards on macOS
---
## Legacy macOS SDK Setup (Mac Catalyst)

**Note:** Objective-C is deprecated. Use Swift integrations where possible.

### Requirements

- Braze iOS SDK v3.32.0+
- App must support [Mac Catalyst](https://developer.apple.com/mac-catalyst/)
- Integration via **Swift Package Manager only** — CocoaPods and Carthage are not supported for Mac Catalyst

### Setup

1. Build your app with Mac Catalyst (see Apple's Mac Catalyst documentation)
2. Use Swift Package Manager to import the Braze SDK

### Supported Features on macOS

| Feature | Supported |
|---------|-----------|
| Push notifications | Yes |
| Content Cards | Yes |
| In-app messages | Yes |
| Automatic location collection | Yes |
| Push Stories | No |
| Rich push | No |
| Geofences | No |
