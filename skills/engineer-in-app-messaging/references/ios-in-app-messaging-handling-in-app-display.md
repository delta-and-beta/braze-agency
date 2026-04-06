---
name: ios-in-app-messaging-handling-in-app-display
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/handling_in_app_display
indexed_at: '2026-04-05'
keywords:
  - delegate
  - display
  - in-app-message
  - iOS
  - keyboard
  - analytics
  - dark-mode
  - status-bar
  - logging
  - impression
triggers:
  - how to display in-app messages on iOS
  - controlling when messages show
  - logging in-app message events
  - customizing message appearance
  - handling keyboard with messages
---
# Handling In-App Message Display (iOS Objective-C SDK)

> **Note:** This covers the legacy Objective-C SDK (`ABKInAppMessage`). For the Swift SDK, see the current Braze Swift SDK docs.

## Display Control via Delegate

Set `ABKInAppMessageControllerDelegate` to intercept messages before display:

```objc
// ABKInAppMessageControllerDelegate
- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage;

// ABKInAppMessageUIDelegate (use this if only implementing UI delegate)
- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage
                                           withKeyboardIsUp:(BOOL)keyboardIsUp;
```

```swift
// ABKInAppMessageControllerDelegate
func beforeInAppMessageDisplayed(inAppMessage: ABKInAppMessage!) -> ABKInAppMessageDisplayChoice

// ABKInAppMessageUIDelegate
func beforeInAppMessageDisplayed(inAppMessage: ABKInAppMessage!, withKeyboardIsUp keyboardIsUp: Bool) -> ABKInAppMessageDisplayChoice
```

### Return Values (`ABKInAppMessageDisplayChoice`)

| Value | Behavior |
|-------|----------|
| `ABKDisplayInAppMessageNow` / `.displayInAppMessageNow` | Display immediately |
| `ABKDisplayInAppMessageLater` / `.displayInAppMessageLater` | Return to top of stack; display later |
| `ABKDiscardInAppMessage` / `.discardInAppMessage` | Discard permanently; never display |

## Disabling Dark Mode

Set `enableDarkTheme = NO` inside either delegate method:

```objc
- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage {
    inAppMessage.enableDarkTheme = NO;
    return ABKDisplayInAppMessageNow;
}
```

```swift
func before(inAppMessageDisplayed inAppMessage: ABKInAppMessage) -> ABKInAppMessageDisplayChoice {
    inAppMessage.enableDarkTheme = false
    return ABKInAppMessageDisplayChoice.displayInAppMessageNow
}
```

## Hiding the Status Bar

For `Full` and `HTML` message types, force the status bar to hide (SDK v3.21.1+) by passing `appboyOptions` at init:

```objc
appboyOptions[ABKInAppMessageHideStatusBarKey] = @YES;
[Appboy startWithApiKey:@"YOUR-API-KEY" inApplication:app withLaunchOptions:opts withAppboyOptions:appboyOptions];
```

## Manual Analytics Logging

Required when returning `ABKDiscardInAppMessage` and rendering your own UI:

```objc
[inAppMessage logInAppMessageImpression]; // Log view
[inAppMessage logInAppMessageClicked];    // Log tap
```

```swift
inAppMessage.logInAppMessageImpression()
inAppMessage.logInAppMessageClicked()
```

For `Modal` and `Full` messages (subclasses of `ABKInAppMessageImmersive`), also log button clicks:

```objc
[inAppMessage logInAppMessageClickedWithButtonID:buttonID];
```

```swift
inAppMessage.logInAppMessageClickedWithButtonID(buttonId: buttonID)
```

## Common Use Cases

- **Display from top of screen when keyboard is up**: Check `keyboardIsUp` in `ABKInAppMessageUIDelegate` method and adjust display logic accordingly.
- **Campaign not displaying after session start**: Verify `beforeInAppMessageDisplayed:` delegate logic isn't blocking display.
- **Full custom UI**: Return `ABKDiscardInAppMessage`, render your own view, and manually call impression/click logging methods.

## Reference

- Header: `ABKInAppMessage.h`, `ABKInAppMessageControllerDelegate.h`
- Sample: `AppDelegate.m` in `Samples/InAppMessage/BrazeInAppMessageSample/`

---

`★ Insight ─────────────────────────────────────`
- The three-value `ABKInAppMessageDisplayChoice` enum is a clean intercept pattern — it lets you defer (stack), discard (skip analytics), or pass through without requiring subclassing or swizzling.
- When you return `ABKDiscardInAppMessage`, Braze deliberately skips analytics logging — this is intentional design forcing you to own the full contract (impression + click tracking) if you own the display.
- The dual delegate split (`ControllerDelegate` vs `UIDelegate`) reflects an architectural seam: controller-level concerns (routing, timing) vs UI-level concerns (keyboard state, layout). Using `UIDelegate` alone gives you keyboard context that the controller delegate intentionally omits.
`─────────────────────────────────────────────────`
