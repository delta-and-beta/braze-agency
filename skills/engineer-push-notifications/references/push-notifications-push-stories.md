---
name: push-notifications-push-stories
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/push_stories
indexed_at: '2026-04-05'
keywords:
  - push-stories
  - notifications
  - swift
  - cordova
  - react-native
  - notification-extension
  - app-groups
  - braze
triggers:
  - How to implement push stories
  - Set up notification content extension
  - Configure app groups for push notifications
  - Add multi-page push notifications
  - Enable push notification extensions
---
## Push Stories

Push Stories are multi-page push notifications that display a sequence of images with optional action buttons. Supported on Swift (iOS), Cordova, and React Native.

---

### Swift

#### Prerequisites
- App Groups enabled (shared between app and Notification Content Extension)
- A new **Notification Content Extension** target added to the Xcode project

#### Setup Steps

**1. Add a Notification Content Extension target**
In Xcode: File > New > Target > Notification Content Extension.

**2. Configure App Groups**
Enable App Groups capability on both the main app target and the extension. Use the same group identifier (e.g., `group.com.company.app`).

**3. Update the extension's `Info.plist`**
```xml
<key>NSExtension</key>
<dict>
  <key>NSExtensionPrincipalClass</key>
  <string>$(PRODUCT_MODULE_NAME).NotificationViewController</string>
  <key>NSExtensionAttributes</key>
  <dict>
    <key>UNNotificationExtensionCategory</key>
    <string>ab_cat_push_story_v2</string>
    <key>UNNotificationExtensionDefaultContentHidden</key>
    <true/>
    <key>UNNotificationExtensionInitialContentSizeRatio</key>
    <real>0.65</real>
  </dict>
</dict>
```

**4. Replace the extension's `NotificationViewController`**
```swift
import UIKit
import UserNotifications
import UserNotificationsUI
import BrazeNotificationService

class NotificationViewController: UIViewController, UNNotificationContentExtension {
    let brazeDelegate = BrazePushStoryViewController()

    override func viewDidLoad() {
        super.viewDidLoad()
        brazeDelegate.viewDidLoad(view: self.view)
    }

    func didReceive(_ notification: UNNotification) {
        brazeDelegate.didReceive(notification)
    }

    func didReceive(_ response: UNNotificationResponse,
                    completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        brazeDelegate.didReceive(response, completionHandler: completion)
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        brazeDelegate.viewDidLayoutSubviews(view: self.view)
    }
}
```

**5. Pass the App Group ID to Braze**
```swift
let configuration = Braze.Configuration(apiKey: "YOUR_API_KEY", endpoint: "YOUR_ENDPOINT")
configuration.push.appGroup = "group.com.company.app"
let braze = Braze(configuration: configuration)
```

---

### Cordova

**Install the Braze Cordova plugin** (if not already):
```bash
cordova plugin add @braze/cordova-sdk
```

Push Stories on Cordova require the same native Notification Content Extension setup as Swift. After adding the extension natively:

```javascript
// No additional JS configuration needed beyond standard push setup
// Ensure App Group is configured in native layers
```

Refer to the Swift setup for the Xcode-side steps; the JS layer delegates to the native implementation.

---

### React Native

**Install the Braze React Native SDK** (if not already):
```bash
npm install @braze/react-native-sdk
```

Push Stories on React Native also require native Notification Content Extension setup:

1. Follow the Swift steps above for the iOS native layer.
2. Ensure `appGroup` is passed in the Braze config (iOS):

```swift
// In AppDelegate.swift / BrazeReactBridge initialization
configuration.push.appGroup = "group.com.company.app"
```

No additional React Native JS configuration is required beyond standard push notification setup.

---

### Key Facts
- Category identifier must be exactly `ab_cat_push_story_v2`
- App Group identifier must match across main app and extension
- Minimum 1 and maximum 5 pages per story
- Images are downloaded at notification receipt time; ensure URLs are publicly accessible
- Analytics (impressions, clicks) tracked automatically when the extension is wired correctly
