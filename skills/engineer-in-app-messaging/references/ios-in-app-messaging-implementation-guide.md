---
name: ios-in-app-messaging-implementation-guide
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/implementation_guide
indexed_at: '2026-04-05'
keywords:
  - ios
  - in-app-messaging
  - ABKInAppMessage
  - UIDelegate
  - customization
  - slideup
  - modal
  - swift
  - objective-c
  - braze
triggers:
  - how to customize in-app messages on iOS
  - how to subclass ABKInAppMessage
  - how to implement custom in-app message UI
  - custom slideup implementation
  - ABKInAppMessageUIDelegate implementation
---
`★ Insight ─────────────────────────────────────`
- The source uses Jekyll Liquid templating (`{% %}`, `{{ }}`), multi-lang includes, and `{% image_buster %}` image tags — all non-portable artifacts that need stripping.
- The `{% tabs %}` / `{% tab %}` blocks are presentation-layer wrappers; collapsing them into clearly labeled Swift/Objective-C sections preserves the substance without the renderer dependency.
- `{% details %}` blocks contain version-gated legacy content — worth keeping but clearly marked as deprecated.
`─────────────────────────────────────────────────`

Here is the processed topic file:

---

# iOS In-App Messaging: Custom Implementation (Legacy SDK)

> Advanced guide for custom in-app message implementations on iOS. Covers ABKInAppMessage subclassing and three custom use cases. Reference demo app: [braze-growth-shares-ios-demo-app](https://github.com/braze-inc/braze-growth-shares-ios-demo-app). HTML templates: [in-app-message-templates](https://github.com/braze-inc/in-app-message-templates).

---

## ABKInAppMessage Subclasses

To customize in-app message presentation, implement `ABKInAppMessageUIDelegate` and return custom view controllers per message type. **If you customize one subclass, you must handle all subclasses.**

**Swift**
```swift
extension AppboyManager: ABKInAppMessageUIDelegate {
  func inAppMessageViewControllerWith(_ inAppMessage: ABKInAppMessage) -> ABKInAppMessageViewController {
    switch inAppMessage {
    case is ABKInAppMessageSlideup:
      return slideupViewController(inAppMessage: inAppMessage)
    case is ABKInAppMessageModal:
      return modalViewController(inAppMessage: inAppMessage)
    case is ABKInAppMessageFull:
      return fullViewController(inAppMessage: inAppMessage)
    case is ABKInAppMessageHTML:
      return ABKInAppMessageHTMLViewController(inAppMessage: inAppMessage)
    default:
      return ABKInAppMessageViewController(inAppMessage: inAppMessage)
    }
  }
}
```

**Objective-C**
```objc
- (ABKInAppMessageViewController *)inAppMessageViewControllerWithInAppMessage:(ABKInAppMessage *)inAppMessage {
  if ([inAppMessage isKindOfClass:[ABKInAppMessageSlideup class]]) {
    return [self slideupViewControllerWithInAppMessage:inAppMessage];
  } else if ([inAppMessage isKindOfClass:[ABKInAppMessageModal class]]) {
    return [self modalViewControllerWithInAppMessage:inAppMessage];
  } else if ([inAppMessage isKindOfClass:[ABKInAppMessageFull class]]) {
    return [self fullViewControllerWithInAppMessage:inAppMessage];
  } else if ([inAppMessage isKindOfClass:[ABKInAppMessageHTML class]]) {
    return [[ABKInAppMessageHTMLViewController alloc] initWithInAppMessage:inAppMessage];
  } else {
    return [[ABKInAppMessageViewController alloc] initWithInAppMessage:inAppMessage];
  }
}
```

---

## Custom Slide-Up In-App Message

Reference implementation: [`SlideFromBottomViewController.swift`](https://github.com/braze-inc/braze-growth-shares-ios-demo-app/blob/master/Braze-Demo/ViewController/In-App-Messages/SlideFromBottomViewController.swift)

Override the `offset` variable in a subclass of `ABKInAppMessageSlideupViewController` to control vertical placement.

**Swift — Override `offset`**
```swift
func setSlideConstraint() {
  offset = 0
}

override var offset: CGFloat {
  get { return super.offset }
  set { super.offset = newValue + adjustedOffset }
}

override func beforeMoveInAppMessageViewOnScreen() {
  super.beforeMoveInAppMessageViewOnScreen()
  setOffset()
}
```

**Objective-C — Override `offset`**
```objc
- (void)setOffset {
  self.offset = 0;
}

- (CGFloat)offset {
  return [super offset];
}

- (void)setOffset:(CGFloat)offset {
  [super setOffset:offset + [self adjustedOffset]];
}

- (void)beforeMoveInAppMessageViewOnScreen {
  [super beforeMoveInAppMessageViewOnScreen];
  [self setOffset];
}
```

> **SDK ≤ 3.34.0 (deprecated):** Use `slideConstraint` instead of `offset`.
>
> Swift:
> ```swift
> func setSlideConstraint() {
>   slideConstraint?.constant = bottomSpacing
> }
> private var bottomSpacing: CGFloat {
>   return AppboyManager.shared.activeApplicationViewController
>     .topMostViewController().view.safeAreaInsets.bottom
> }
> override func beforeMoveInAppMessageViewOnScreen() {
>   setSlideConstraint()
> }
> ```
>
> Objective-C:
> ```objc
> - (void)self.setSlideConstraint:(NSLayoutConstraint *)slideConstraint {
>   slideConstraint.constant = bottomSpacing;
> }
> - (CGFloat)bottomSpacing {
>   return [AppboyManager shared].activeApplicationViewController
>     .topMostViewController.view.safeAreaInsets.bottom;
> }
> - (void)beforeMoveInAppMessageViewOnScreen {
>   [self setSlideConstraint:self.slideConstraint];
> }
> ```

`★ Insight ─────────────────────────────────────`
- The `offset` vs `slideConstraint` split reflects an SDK refactor at v3.34.0 — the newer API exposes a cleaner `offset` override point rather than direct AutoLayout constraint manipulation, which is more robust across device sizes and orientations.
- `beforeMoveInAppMessageViewOnScreen()` is the correct lifecycle hook for applying position overrides — calling it before animation begins avoids visual jumps.
`─────────────────────────────────────────────────`
