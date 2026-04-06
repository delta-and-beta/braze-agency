---
name: legacy-ios-setup-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/overview
indexed_at: '2026-04-05'
keywords:
  - iOS
  - SDK
  - installation
  - CocoaPods
  - analytics
  - integration
  - mobile
  - Carthage
  - SPM
  - messages
triggers:
  - how to install iOS SDK
  - iOS SDK setup
  - CocoaPods integration
  - legacy iOS integration
  - mobile SDK installation
---
## Legacy iOS SDK Setup Overview

> **Deprecated**: This page covers the legacy Objective-C iOS SDK. See current Swift SDK documentation for new integrations.

### What the SDK Provides

Installing the Braze iOS SDK gives you:
- Basic analytics (session handling)
- Basic in-app messages

Additional channels and features require further customization after initial setup.

### Installation Methods

- CocoaPods
- Carthage
- Swift Package Manager
- Manual integration

RubyMotion apps are fully supported.

### Size Impact

The iOS SDK adds to your app bundle:
- **1–2 MB** added to the IPA file
- **30 MB** for the framework
- Additional APP file

### Setup Sequence

1. Install via one of the methods above
2. Complete the integration (session handling, API key config)
3. Enable optional SDK customizations
4. Integrate additional channels and features as needed for your campaigns
