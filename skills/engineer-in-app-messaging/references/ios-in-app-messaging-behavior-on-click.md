---
name: ios-in-app-messaging-behavior-on-click
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/behavior_on_click
indexed_at: '2026-04-05'
keywords:
  - ios
  - in-app-messaging
  - click-handling
  - delegates
  - buttons
  - uri
  - action-types
  - objective-c
  - swift
  - braze
triggers:
  - how to handle in-app message clicks
  - implementing click delegates ios
  - button click action ios sdk
  - suppress default behavior in-app messages
  - set click action ios braze
---
`★ Insight ─────────────────────────────────────`
This is a Braze iOS SDK (Objective-C/Swift) topic — the `ABK` prefix is Braze's legacy naming convention. The content covers a delegate pattern common in iOS SDKs where `BOOL` return values control whether the SDK continues its default behavior after your custom handler runs.
`─────────────────────────────────────────────────`

## In-App Message Behavior on Click (iOS SDK)

### Setting Click Action

The `inAppMessageClickActionType` property on `ABKInAppMessage` is read-only. Use `setInAppMessageClickAction` to change it:

**Objective-C**
```objc
[inAppMessage setInAppMessageClickAction:clickActionType withURI:uri];
```

**Swift**
```swift
inAppMessage.setInAppMessageClickAction(clickActionType: clickActionType, withURI: uri)
```

### Click Action Types

| `ABKInAppMessageClickActionType` | Behavior |
|---|---|
| `ABKInAppMessageRedirectToURI` | Displays given URI and dismisses message. `uri` cannot be nil. |
| `ABKInAppMessageNoneClickAction` | Dismisses message. `uri` parameter is ignored; `uri` property set to nil. |

> **Note:** For messages with buttons, the message `clickAction` is included in the final payload only if click action is added before button text.

### Delegate Methods (`ABKInAppMessageUIDelegate`)

**Body click:**
```objc
// Objective-C
- (BOOL) onInAppMessageClicked:(ABKInAppMessage *)inAppMessage;
```
```swift
// Swift
func onInAppMessageClicked(inAppMessage: ABKInAppMessage!) -> Bool
```

**Button click:**
```objc
// Objective-C
- (BOOL)onInAppMessageButtonClicked:(ABKInAppMessageImmersive *)inAppMessage
                             button:(ABKInAppMessageButton *)button;

- (BOOL)onInAppMessageHTMLButtonClicked:(ABKInAppMessageHTML *)inAppMessage
                             clickedURL:(nullable NSURL *)clickedURL
                               buttonID:(NSString *)buttonID;
```
```swift
// Swift
func onInAppMessageButtonClicked(inAppMessage: ABKInAppMessageImmersive!,
                                 button: ABKInAppMessageButton) -> Bool

func onInAppMessageHTMLButtonClicked(inAppMessage: ABKInAppMessageHTML!,
                                     clickedURL: URL, buttonID: String) -> Bool
```

All delegate methods return `BOOL` — return `YES`/`true` to let Braze continue executing the default click action, `NO`/`false` to suppress it.

### Accessing Button Click Action Type in Delegate

```objc
// Objective-C
if ([inAppMessage isKindOfClass:[ABKInAppMessageImmersive class]]) {
    ABKInAppMessageImmersive *immersiveIAM = (ABKInAppMessageImmersive *)inAppMessage;
    for (ABKInAppMessageButton *button in immersiveIAM.buttons) {
        // button.buttonClickActionType
    }
}
```
```swift
// Swift
if inAppMessage is ABKInAppMessageImmersive {
    let immersiveIAM = inAppMessage as! ABKInAppMessageImmersive
    for button in inAppMessage.buttons as! [ABKInAppMessageButton] {
        // button.buttonClickActionType
    }
}
```

### Key Behavioral Rule

When an in-app message has buttons, **only button click actions execute** — the message body is not clickable, even though `ABKInAppMessage` carries a default click action on the model.

`★ Insight ─────────────────────────────────────`
The `BOOL` return pattern on iOS delegate methods is a standard SDK extensibility pattern — it lets you intercept and optionally suppress the default SDK behavior per-event. This is distinct from Android's listener pattern where you typically override the entire handler. The immersive/HTML split in the button delegates reflects Braze's two rendering paths: native modal (immersive) vs. webview-rendered HTML.
`─────────────────────────────────────────────────`
