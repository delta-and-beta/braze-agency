---
name: ios-in-app-messaging-setting-delegates
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/setting_delegates
indexed_at: '2026-04-05'
keywords:
  - delegates
  - in-app
  - iOS
  - protocols
  - lifecycle
  - display
  - initialization
  - payloads
triggers:
  - how to set in-app message delegates
  - configure in-app messaging delegates
  - handle in-app message lifecycle events
  - customize in-app message display
  - implement delegate protocols
---
`★ Insight ─────────────────────────────────────`
- This content covers the **legacy Objective-C Braze iOS SDK** — the `Appboy` prefix signals the pre-Swift SDK era (Braze rebranded from Appboy). The modern Swift SDK uses `BrazeKit` instead.
- Two delegate tiers exist: `ABKInAppMessageUIDelegate` (UI-layer, requires Braze UI lib) vs `ABKInAppMessageControllerDelegate` (core-layer, works without UI lib). This separation reflects a clean dependency inversion pattern.
`─────────────────────────────────────────────────`

## In-App Messaging: Setting Delegates (Legacy iOS SDK)

> **Note:** This applies to the legacy Objective-C/Swift Appboy iOS SDK.

Two delegate protocols control in-app message behavior, chosen based on whether you include the Braze UI library.

---

### ABKInAppMessageUIDelegate (Requires Braze UI Library)

Use when you **include** the Braze UI library. Handles triggered payloads, display lifecycle events, and display timing control.

**Set at runtime:**

```objc
// Objective-C
[[Appboy sharedInstance].inAppMessageController.inAppMessageUIController setInAppMessageUIDelegate:self];
```

```swift
// Swift
Appboy.sharedInstance()?.inAppMessageController.inAppMessageUIController?.setInAppMessageUIDelegate?(self)
```

---

### ABKInAppMessageControllerDelegate (Core — No UI Library Required)

Use when you **exclude** the Braze UI library or need custom display logic. Receives triggered payloads for further processing.

**Set at runtime:**

```objc
// Objective-C
[Appboy sharedInstance].inAppMessageController.delegate = self;
```

```swift
// Swift
Appboy.sharedInstance()?.inAppMessageController.delegate = self
```

**Set at initialization time** via `appboyOptions`:

```objc
// Objective-C
[Appboy startWithApiKey:@"YOUR-API_KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKInAppMessageControllerDelegateKey : self }];
```

```swift
// Swift
Appboy.start(withApiKey: "YOUR-API-KEY",
                 in: application,
                 withLaunchOptions: launchOptions,
                 withAppboyOptions: [ABKInAppMessageControllerDelegateKey : self])
```

---

### Reference

| Resource | Path |
|---|---|
| `ABKInAppMessage.h` | `AppboyKit/include/ABKInAppMessage.h` |
| `ABKInAppMessageControllerDelegate.h` | `AppboyKit/include/ABKInAppMessageControllerDelegate.h` |
| `ABKInAppMessageUIDelegate.h` | `AppboyUI/ABKInAppMessage/ABKInAppMessageUIDelegate.h` |
| Sample implementation | `Samples/InAppMessage/BrazeInAppMessageSample/BrazeInAppMessageSample/ViewController.m` |

`★ Insight ─────────────────────────────────────`
- The init-time delegate pattern (`ABKInAppMessageControllerDelegateKey` in `appboyOptions`) is important because some delegate callbacks fire early in the app lifecycle — setting the delegate post-init can cause you to miss them.
- The table format for reference files is more scannable than inline links for a topic file that will be used as a quick reference by an AI agent.
`─────────────────────────────────────────────────`
