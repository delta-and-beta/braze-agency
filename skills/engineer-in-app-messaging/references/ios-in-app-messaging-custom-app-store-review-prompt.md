---
name: ios-in-app-messaging-custom-app-store-review-prompt
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/custom_app_store_review_prompt
indexed_at: '2026-04-05'
keywords:
  - appstore
  - review
  - prompt
  - messaging
  - deeplink
  - campaign
  - impressions
  - StoreKit
  - customization
  - ratelimit
triggers:
  - trigger app store review
  - custom review campaign
  - app store review deep link
  - implement review prompt
  - rate limit review requests
---
# Custom App Store Review Prompt

Trigger a native App Store review prompt via an in-app message campaign using key-value pairs and deep links.

> **Note:** Once implemented, Braze stops auto-tracking impressions — you must log [impressions and clicks]({{site.baseurl}}/developer_guide/platform_integration_guides/ios/in-app_messaging/customization/handing_in_app_display/#logging-impressions-and-clicks) manually.

## Implementation

### 1. Intercept the in-app message

In your [in-app message delegate]({{site.baseurl}}), disable the default display and open the URI directly:

**Swift**
```swift
func before(inAppMessageDisplayed inAppMessage: ABKInAppMessage) -> ABKInAppMessageDisplayChoice {
  if inAppMessage.extras?["Appstore Review"] != nil && inAppMessage.uri != nil {
    UIApplication.shared.open(inAppMessage.uri!, options: [:], completionHandler: nil)
    return ABKInAppMessageDisplayChoice.discardInAppMessage
  } else {
    return ABKInAppMessageDisplayChoice.displayInAppMessageNow
  }
}
```

**Objective-C**
```objc
- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage {
  if (inAppMessage.extras != nil && inAppMessage.extras[@"Appstore Review"] != nil) {
    [[UIApplication sharedApplication] openURL:inAppMessage.uri options:@{} completionHandler:nil];
    return ABKDiscardInAppMessage;
  } else {
    return ABKDisplayInAppMessageNow;
  }
}
```

### 2. Handle the deep link (requires `StoreKit`)

**Swift**
```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
  let urlString = url.absoluteString.removingPercentEncoding
  if (urlString == "{YOUR-APP-SCHEME}:appstore-review") {
    SKStoreReviewController.requestReview()
    return true
  }
  // Other deep link handling...
}
```

**Objective-C**
```objc
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  NSString *urlString = url.absoluteString.stringByRemovingPercentEncoding;
  if ([urlString isEqualToString:@"{YOUR-APP-SCHEME}:appstore-review"]) {
    [SKStoreReviewController requestReview];
    return YES;
  }
  // Other deep link handling...
}
```

### 3. Configure the campaign

| Setting | Value |
|---|---|
| Key-value pair | `"Appstore Review"` : `"true"` |
| On-click behavior | Deep Link Into App |
| Deep link URL | `{YOUR-APP-SCHEME}:appstore-review` |

## Constraints

- **Apple rate limit**: Maximum 3 review prompts per user per year — [rate-limit your campaign]({{site.baseurl}}/user_guide/engagement_tools/campaigns/building_campaigns/rate-limiting/) to 3×/year per user.
- **User opt-out**: Users can disable review prompts system-wide. Do not promise the native prompt will appear or directly ask for a review in your messaging.
