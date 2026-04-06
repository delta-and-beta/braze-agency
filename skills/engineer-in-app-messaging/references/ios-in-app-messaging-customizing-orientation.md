---
name: ios-in-app-messaging-customizing-orientation
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/customizing_orientation
indexed_at: '2026-04-05'
keywords:
  - orientation
  - in-app-messaging
  - iOS
  - landscape
  - portrait
  - delegate
  - ABKInAppMessageUIController
  - configuration
  - iPad
  - display
triggers:
  - how to customize in-app message orientation
  - set global orientation for messages
  - configure per-message orientation
  - control in-app message display based on device orientation
---
# Customizing In-App Message Orientation

> **Note:** This covers the legacy Objective-C iOS SDK (`ABKInAppMessageUIController`).

## Global Orientation (All Messages)

Set `supportedOrientationMask` on `ABKInAppMessageUIController` after `startWithApiKey:inApplication:withLaunchOptions:`:

**Swift**
```swift
if let controller = Appboy.sharedInstance()?.inAppMessageController.inAppMessageUIController as? ABKInAppMessageUIController {
  controller.supportedOrientationMask = .portrait      // or .landscape
}
```

**Objective-C**
```objc
id<ABKInAppMessageUIControlling> inAppMessageUIController = [Appboy sharedInstance].inAppMessageController.inAppMessageUIController;
((ABKInAppMessageUIController *)inAppMessageUIController).supportedOrientationMask = UIInterfaceOrientationMaskPortrait;
// Use UIInterfaceOrientationMaskLandscape for landscape
```

**Constraint:** The device orientation must also match the in-app message's `orientation` property for the message to display.

## Per-Message Orientation

Set orientation in the `beforeInAppMessageDisplayed:` delegate method:

**Swift**
```swift
inAppMessage.orientation = ABKInAppMessageOrientation.portrait
inAppMessage.orientation = ABKInAppMessageOrientation.landscape
```

**Objective-C**
```objc
inAppMessage.orientation = ABKInAppMessageOrientationPortrait;
inAppMessage.orientation = ABKInAppMessageOrientationLandscape;
```

Requires an [in-app message delegate](setting_delegates/) to be set first.

**Constraint:** Message will not display if device orientation doesn't match the `orientation` property.

## Key Behaviors

| Scenario | Behavior |
|----------|----------|
| Device orientation mismatch | Message does not display |
| iPad | Always displays in user's preferred orientation, regardless of actual screen orientation |

## Reference

- [`ABKInAppMessage.h`](https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/include/ABKInAppMessage.h)

---

`★ Insight ─────────────────────────────────────`
- The two-level orientation control (global vs per-message) follows a common SDK pattern: a controller-level default that individual instances can override via a delegate hook — this is the **Template Method** pattern applied to configuration.
- The iPad special case (ignoring actual screen orientation) is a platform-specific quirk worth preserving in the topic file — it's the kind of edge case that causes hours of debugging if not documented.
- The `supportedOrientationMask` uses iOS bitmask values (`UIInterfaceOrientationMask*`) at the controller level, while `ABKInAppMessageOrientation` is Braze's own enum at the message level — two different type systems for the same concept, which is a common friction point when integrating.
`─────────────────────────────────────────────────`
