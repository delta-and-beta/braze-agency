---
name: legacy-ios-push-push-story
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/push_story
indexed_at: '2026-04-05'
keywords:
  - push-stories
  - notifications
  - ios
  - content-extension
  - app-groups
  - framework
  - capabilities
  - carousel
triggers:
  - how to set up push stories
  - configure notification content extension
  - enable push story carousels
  - add app groups
---
The `learn` skill is for capturing insights, not for this documentation transformation. Proceeding with the pre-processing task directly.

`★ Insight ─────────────────────────────────────`
- Nick topic files are atomic knowledge units nested in `skills/{skill-name}/references/` — they're designed to be loaded selectively at "Default" depth routing without pulling the full skill context
- Stripping Jekyll template syntax (`{% %}`, `{{site.baseurl}}`) is essential here: those placeholders only resolve in the Jekyll build pipeline, not at runtime when an agent reads the file
- Keeping both ObjC and Swift code blocks is worth the extra length — agents answering SDK questions need both variants to be useful without re-fetching source docs
`─────────────────────────────────────────────────`

---

# Push Stories (iOS)

**Requirements:** `UNNotification` framework, iOS 10+, Braze iOS SDK ≥ 3.2.1.

Push Stories display multi-page image carousels in iOS notifications using a `Notification Content Extension`.

---

## Step 1: Enable Push

Complete the standard push notification integration before proceeding.

---

## Step 2: Add Notification Content Extension Target

In Xcode: **File > New > Target... > Notification Content Extension**.

Xcode auto-generates:
- **Swift:** `NotificationViewController.swift`, `MainInterface.storyboard`
- **ObjC:** `NotificationViewController.h`, `NotificationViewController.m`, `MainInterface.storyboard`

---

## Step 3: Enable Capabilities

In the **main app target** Capabilities tab:
1. Enable **Background Modes**
2. Check **Background fetch** and **Remote notifications**

### App Group (required)

Enable **App Groups** on both the main app target and the content extension target.

Create an app group using your bundle ID, e.g.:
- Bundle ID: `com.company.appname`
- App Group: `group.com.company.appname.xyz`

> **Note:** This is Apple's App Groups Entitlement — not your Braze workspace ID.

Omitting the App Group causes push payload fields to fail silently.

---

## Step 4: Add AppboyPushStory Framework

### Swift Package Manager

Add `AppboyPushStory` to the **Notification Content Extension** target (not the main app target) via Xcode's package dependency UI.

### CocoaPods

```ruby
target 'YourContentExtensionTarget' do
  pod 'Appboy-Push-Story'
end
```

Run `pod install` after updating the Podfile.

### Manual

Download `AppboyPushStory.zip` from the GitHub releases page, extract, and add to the `Notification Content Extension`:
- `Resources/ABKPageView.nib`
- `AppboyPushStory.xcframework`

**Important:** Set `AppboyPushStory.xcframework` to **Do Not Embed** in the Embed column.

Add `-ObjC` to **Build Settings > Other Linker Flags** for the content extension target.

---

## Step 5: Update NotificationViewController

### Swift

```swift
import AppboyPushStory

class NotificationViewController: UIViewController, UNNotificationContentExtension {

  @IBOutlet weak var storiesView: ABKStoriesView!
  var dataSource: ABKStoriesViewDataSource?

  func didReceive(_ notification: UNNotification) {
    dataSource = ABKStoriesViewDataSource(
      notification: notification,
      storiesView: storiesView,
      appGroup: "YOUR-APP-GROUP-IDENTIFIER"
    )
  }

  func didReceive(_ response: UNNotificationResponse,
                  completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
    if dataSource != nil {
      let option: UNNotificationContentExtensionResponseOption = dataSource!.didReceive(response)
      completion(option)
    }
  }

  override func viewWillDisappear(_ animated: Bool) {
    dataSource?.viewWillDisappear()
    super.viewWillDisappear(animated)
  }
}
```

### Objective-C

`NotificationViewController.h`:
```objc
#import <AppboyPushStory/AppboyPushStory.h>

@property (nonatomic) IBOutlet ABKStoriesView *storiesView;
@property (nonatomic) ABKStoriesViewDataSource *dataSource;
```

`NotificationViewController.m`:
```objc
@implementation NotificationViewController

- (void)didReceiveNotification:(UNNotification *)notification {
  self.dataSource = [[ABKStoriesViewDataSource alloc]
    initWithNotification:notification
             storiesView:self.storiesView
                appGroup:@"YOUR-APP-GROUP-IDENTIFIER"];
}

- (void)didReceiveNotificationResponse:(UNNotificationResponse *)response
                     completionHandler:(void (^)(UNNotificationContentExtensionResponseOption))completion {
  UNNotificationContentExtensionResponseOption option =
    [self.dataSource didReceiveNotificationResponse:response];
  completion(option);
}

- (void)viewWillDisappear:(BOOL)animated {
  [self.dataSource viewWillDisappear];
  [super viewWillDisappear:animated];
}

@end
```

---

## Step 6: Configure Storyboard

In `MainInterface.storyboard`:
1. Add a `UIView` to the notification view controller
2. Set its class to `ABKStoriesView`
3. Set width and height to auto-resize matching the main view frame
4. Connect the `storiesView` IBOutlet to this view

---

## Step 7: Configure Extension Info.plist

In the content extension's `Info.plist`, under `NSExtension > NSExtensionAttributes`:

| Key | Type | Value |
|-----|------|-------|
| `UNNotificationExtensionCategory` | String | `ab_cat_push_story_v2` |
| `UNNotificationExtensionDefaultContentHidden` | Boolean | `YES` |
| `UNNotificationExtensionInitialContentSizeRatio` | Number | `0.65` |

---

## Step 8: Update Braze Initialization

Add `ABKPushStoryAppGroupKey` to your Braze options at startup:

### Swift

```swift
let appboyOptions: [AnyHashable: Any] = [
  ABKPushStoryAppGroupKey: "YOUR-APP-GROUP-IDENTIFIER"
]
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: appboyOptions)
```

### Objective-C

```objc
NSMutableDictionary *appboyOptions = [NSMutableDictionary dictionary];
appboyOptions[ABKPushStoryAppGroupKey] = @"YOUR-APP-GROUP-IDENTIFIER";
[Appboy startWithApiKey:@"YOUR-API-KEY"
          inApplication:application
      withLaunchOptions:launchOptions
      withAppboyOptions:appboyOptions];
```

`YOUR-APP-GROUP-IDENTIFIER` must match the App Group created in Step 3.

`★ Insight ─────────────────────────────────────`
- The `ABKPushStoryAppGroupKey` in Step 8 bridges the main app and the content extension — both must share the same App Group so the extension can read the push payload data the main app writes to shared storage
- `UNNotificationExtensionInitialContentSizeRatio: 0.65` controls the notification expanded height as a ratio of the screen width — this is a fixed Braze requirement, not a customizable value
`─────────────────────────────────────────────────`
