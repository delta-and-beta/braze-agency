---
name: ios-storage
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/storage
indexed_at: '2026-04-05'
keywords:
  - device
  - storage
  - personalization
  - localization
  - properties
  - tracking
  - configuration
  - iOS
  - IDFA
  - IDFV
triggers:
  - configure device properties
  - enable IDFA tracking
  - set up time zone delivery
  - customize device allowlist
  - collect device information
---
## iOS SDK Storage — Device Properties

The Braze iOS SDK captures device-level properties to enable device, language, and time zone-based message personalization.

### Default Collected Properties

| Property | Notes |
|---|---|
| Device Resolution | |
| Device Carrier | |
| Device Locale | |
| Device Model | |
| Device OS Version | |
| IDFV | Optional as of iOS SDK v5.7.0+ |
| Push Enabled | |
| Device Time Zone | Required for local time zone delivery |
| Push Auth Status | |
| Ad Tracking Enabled | |

**IDFA is not collected automatically.** To pass IDFA to Braze, implement the `ABKIDFADelegate` protocol and obtain explicit user opt-in via Apple's App Tracking Transparency framework first.

### Configuring Which Properties Are Collected

Use `ABKDeviceOptions` enum values with bitwise `OR` to allowlist specific fields. Assign to `ABKDeviceAllowlistKey` in the `appboyOptions` dictionary passed to `startWithApiKey:inApplication:withAppboyOptions:`.

```objc
// Example: allowlist only time zone and locale
appboyOptions[ABKDeviceAllowlistKey] = @(ABKDeviceOptionTimezone | ABKDeviceOptionLocale);
```

All fields are enabled by default. Disabling properties may break dependent features (e.g., disabling time zone prevents local time zone delivery).

### References

- [`ABKDeviceOptions` enum](https://github.com/Appboy/appboy-ios-sdk/blob/4390e9eac8401bccdb81b053fa54eb87b1f6fcaa/Appboy-tvOS-SDK/AppboyTVOSKit.framework/Headers/Appboy.h#L179)
- [`ABKDeviceAllowlistKey`](https://github.com/Appboy/appboy-ios-sdk/blob/fed071000722673754da288cace15c1ff8aca432/AppboyKit/include/Appboy.h#L148)

> **Note:** The Objective-C SDK (`AppboyKit`) is deprecated. New integrations should use the [Braze Swift SDK](https://github.com/braze-inc/braze-swift-sdk) instead.

`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll templating (`{% multi_lang_include %}`, `{% alert note %}`, `{{site.baseurl}}`). These are stripped in the topic file since it's consumed directly by an AI agent, not a Jekyll renderer.
- The deprecation notice was demoted from a prominent include to a brief trailing note — it's still factually present but doesn't dominate a reference file that may be queried for years after migration.
- The table format for collected properties makes the allowlist configuration example much easier to cross-reference than the original prose list.
`─────────────────────────────────────────────────`
