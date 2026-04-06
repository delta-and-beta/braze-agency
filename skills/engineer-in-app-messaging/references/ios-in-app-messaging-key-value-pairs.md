---
name: ios-in-app-messaging-key-value-pairs
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/key_value_pairs
indexed_at: '2026-04-05'
keywords:
  - messaging
  - extras
  - iOS
  - Braze
  - campaign
  - metadata
  - customization
  - configuration
triggers:
  - how to add key-value pairs to messages
  - accessing message extras
  - passing custom data with messages
  - configuring message metadata
  - using feature flags in messages
---
## In-App Messaging Key-Value Pairs

`ABKInAppMessage` objects support key-value pairs via the `extras` property. These are configured in the Braze dashboard when creating a campaign and allow you to pass arbitrary data alongside an in-app message for custom handling in your app.

### Overview

- **Property**: `extras` on `ABKInAppMessage`
- **Configured via**: Braze dashboard (campaign creation)
- **Purpose**: Send supplemental data with an in-app message for app-side processing

### Usage Pattern

Access extras from the message object and branch logic based on key presence or value:

```objc
// Objective-C
NSDictionary *extras = inAppMessage.extras;
if (extras[@"your_key"]) {
    // handle custom behavior
}
```

```swift
// Swift
if let extras = inAppMessage.extras, let value = extras["your_key"] {
    // handle custom behavior
}
```

### Notes

- Objective-C APIs are deprecated; Swift is preferred for new development.
- Key-value pairs are freeform — structure and interpretation are entirely app-defined.
- Common uses: deep-link targets, feature flags, A/B test metadata, display configuration overrides.
