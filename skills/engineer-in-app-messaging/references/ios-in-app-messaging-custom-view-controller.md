---
name: ios-in-app-messaging-custom-view-controller
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/custom_view_controller
indexed_at: '2026-04-05'
keywords:
  - viewController
  - inAppMessage
  - delegate
  - subclass
  - customization
  - animation
  - analytics
  - iOS
  - messaging
  - Braze
triggers:
  - display custom in-app messages
  - customize message view controller
  - implement in-app message delegate
  - create custom message display
  - subclass in-app message view
---
## Custom In-App Message View Controller

Display in-app messages in a custom view controller by passing it to Braze. Braze handles animation and analytics automatically.

### Requirements

- View controller must be a subclass or instance of `ABKInAppMessageViewController`
- The view must be an instance of `ABKInAppMessageView` or its subclass

### UI Delegate Method

Implement this delegate method to pass a custom view controller to Braze:

**Objective-C:**
```objc
- (ABKInAppMessageViewController *)inAppMessageViewControllerWithInAppMessage:(ABKInAppMessage *)inAppMessage;
```

**Swift:**
```swift
func inAppMessageViewControllerWithInAppMessage(inAppMessage: ABKInAppMessage!) -> ABKInAppMessageViewController!
```

This method is called every time an in-app message is offered to `ABKInAppMessageViewController`.

### Customization

Use subclasses or categories on the built-in view controllers to customize display or behavior.

### Reference Files

- **Header:** `ABKInAppMessage.h` — method declarations
- **Sample:** `ViewController.m` and `CustomInAppMessageViewController.m` in the in-app message sample app
