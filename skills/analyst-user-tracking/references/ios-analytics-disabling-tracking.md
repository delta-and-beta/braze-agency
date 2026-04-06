---
name: ios-analytics-disabling-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/disabling_tracking
indexed_at: '2026-04-05'
keywords:
  - tracking
  - analytics
  - privacy
  - disableSDK
  - wipeData
  - IDFV
  - removal
  - data collection
  - SDK
  - iOS
triggers:
  - disable tracking
  - stop data collection
  - wipe user data
  - remove user
  - clear local data
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units — they live in `skills/{name}/references/` and are designed to be loaded at "default" depth routing (Sonnet, fast lookup). Keeping them self-contained with no cross-references matters because they may be served in isolation without surrounding skill context.
`─────────────────────────────────────────────────`

```markdown
# iOS Disabling Tracking

## Stop Data Collection

Use `disableSDK` to halt all SDK tracking. This cancels all network connections and prevents any data from being sent to Braze servers.

```objc
[Appboy disableSDK];
```

To resume data collection after disabling:

```objc
[Appboy requestEnableSDKOnNextAppRun];
```

## Wipe All Client-Side Data

Use `wipeDataAndDisableForAppRun` to clear all locally stored data on the device and disable the SDK.

```objc
[Appboy wipeDataAndDisableForAppRun];
```

**Important caveat:** Unless the user uninstalls all apps from the same vendor, the server will re-identify the user via their IDFV (device identifier) on the next SDK run. To fully remove a user, combine this with a server-side delete via the [Braze REST API User Delete endpoint](https://www.braze.com/docs/api/endpoints/user_data/post_user_delete/).

## iOS SDK v5.7.0+ Behavior Change

For devices on SDK v5.7.0+, if [IDFV collection is disabled](https://www.braze.com/docs/developer_guide/platform_integration_guides/legacy_sdks/ios/initial_sdk_setup/other_sdk_customizations/#optional-idfv-collection---swift/), calling [`wipeData()`](https://braze-inc.github.io/braze-swift-sdk/documentation/brazekit/braze/wipedata()) will **not** cause server-side re-identification via IDFV. This makes `wipeData` sufficient for full removal without needing an API call.

## Summary

| Goal | Method |
|------|--------|
| Stop tracking | `disableSDK` |
| Resume tracking | `requestEnableSDKOnNextAppRun` |
| Clear local data + disable | `wipeDataAndDisableForAppRun` |
| Full user removal (legacy SDK) | `wipeDataAndDisableForAppRun` + REST API delete |
| Full user removal (SDK 5.7.0+, IDFV disabled) | `wipeData()` |
```

`★ Insight ─────────────────────────────────────`
The original doc had a liquid template tag (`{% multi_lang_include deprecations/objective-c.md %}`) — a Jekyll include for a deprecation notice. These are stripped during processing since topic files are plain markdown served outside Jekyll. The underlying deprecation context (Objective-C SDK is legacy) was preserved implicitly by noting the Swift SDK v5.7.0+ distinction.
`─────────────────────────────────────────────────`
