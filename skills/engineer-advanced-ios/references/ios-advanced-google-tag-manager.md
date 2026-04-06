---
name: ios-advanced-google-tag-manager
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/google_tag_manager
indexed_at: '2026-04-05'
keywords:
  - GTM
  - Firebase
  - events
  - attributes
  - iOS
  - actionType
  - analytics
  - identification
triggers:
  - How to integrate Google Tag Manager iOS
  - Log custom events with Firebase
  - Set custom attributes via GTM
  - Identify users in GTM
  - Configure custom tag provider
---
`★ Insight ─────────────────────────────────────`
- This is Objective-C legacy SDK documentation — the content uses `Appboy` (old SDK name) and `FIRAnalytics` (Firebase data layer), which are both deprecated patterns worth flagging in the topic
- The GTM integration works by mapping Firebase Analytics events → GTM Tags → Braze SDK calls, using `actionType` as the dispatch key — a clean pattern worth preserving clearly
`─────────────────────────────────────────────────`

## Google Tag Manager Integration for iOS (Legacy SDK)

> **Note:** This integration uses the legacy Objective-C Braze SDK (`Appboy`). GTM for iOS uses Firebase Analytics as its data layer.

### Prerequisites

- Complete [initial iOS SDK setup](https://www.braze.com/docs/developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/overview/) before configuring GTM
- Install Google Tag Manager via Google's [iOS GTM documentation](https://developers.google.com/tag-manager/ios/v5/)

---

### How It Works

GTM for iOS routes events through Firebase Analytics → Google Tag Manager → a custom `BrazeGTMTagManager` class that dispatches to Braze SDK methods. The `actionType` key-value pair controls which Braze method is called.

| `actionType` value | Braze operation |
|---|---|
| `logEvent` | Log custom event |
| `customAttribute` | Set custom attribute |
| `changeUser` | Identify user |

---

### Logging Custom Events

**GTM Tag setup:**
- Tag type: Function Call
- Class path: your `BrazeGTMTagManager` class path
- Required KV pairs: `actionType` = `logEvent`, `eventName` = `<your event name>`
- Additional KV pairs become custom event properties (passed through as-is)

**Firebase call from app:**
```objc
NSDictionary *parameters = @{@"genre" : @"pop",
                             @"number of times listened" : @42};
[FIRAnalytics logEventWithName:@"played song" parameters:parameters];
```

Event properties like `genre` are passed as "Firebase - Event Parameter" variables in GTM.

---

### Logging Custom Attributes

**Required KV pairs:** `actionType` = `customAttribute`, `customAttributeKey`, `customAttributeValue`

```objc
NSDictionary *parameters = @{@"customAttributeKey" : @"favorite song",
                             @"customAttributeValue" : @"Private Eyes"};
[FIRAnalytics logEventWithName:@"customAttribute" parameters:parameters];
```

---

### Changing Users

**Required KV pairs:** `actionType` = `changeUser`, `externalUserId`

```objc
NSDictionary *parameters = @{@"externalUserId" : userId};
[FIRAnalytics logEventWithName:@"changeUser" parameters:parameters];
```

---

### Custom Tag Provider Implementation

**`BrazeGTMTagManager.h`:**
```objc
@import Firebase;
@import GoogleTagManager;

@interface BrazeGTMTagManager : NSObject <TAGCustomFunction>
@end
```

**`BrazeGTMTagManager.m`:**
```objc
#import <Foundation/Foundation.h>
#import "BrazeGTMTagManager.h"
#import "Appboy-iOS-SDK/AppboyKit.h"

static NSString *const ActionTypeKey = @"actionType";

// Custom Events
static NSString *const LogEventActionType = @"logEvent";
static NSString *const LogEventEventName = @"eventName";

// Custom Attributes
static NSString *const CustomAttributeActionType = @"customAttribute";
static NSString *const CustomAttributeKey = @"customAttributeKey";
static NSString *const CustomAttributeValueKey = @"customAttributeValue";

// Change User
static NSString *const ChangeUserActionType = @"changeUser";
static NSString *const ChangeUserExternalUserId = @"externalUserId";

@implementation BrazeGTMTagManager

- (NSObject *)executeWithParameters:(NSDictionary *)parameters {
  NSMutableDictionary *mutableParameters = [parameters mutableCopy];
  
  NSString *actionType = mutableParameters[ActionTypeKey];
  if (!actionType) {
    NSLog(@"There is no Braze action type key in this call. Doing nothing.");
    return nil;
  }
  
  [mutableParameters removeObjectForKey:ActionTypeKey];
  
  if ([actionType isEqualToString:LogEventActionType]) {
    [self logEvent:mutableParameters];
  } else if ([actionType isEqualToString:CustomAttributeActionType]) {
    [self logCustomAttribute:mutableParameters];
  } else if ([actionType isEqualToString:ChangeUserActionType]) {
    [self changeUser:mutableParameters];
  } else {
    NSLog(@"Invalid action type. Doing nothing.");
  }
  return nil;
}

- (void)logEvent:(NSMutableDictionary *)parameters {
  NSString *eventName = parameters[LogEventEventName];
  [parameters removeObjectForKey:LogEventEventName];
  [[Appboy sharedInstance] logCustomEvent:eventName withProperties:parameters];
}

- (void)logCustomAttribute:(NSMutableDictionary *)parameters {
  NSString *customAttributeKey = parameters[CustomAttributeKey];
  id customAttributeValue = parameters[CustomAttributeValueKey];
  
  if ([customAttributeValue isKindOfClass:[NSString class]]) {
    [[Appboy sharedInstance].user setCustomAttributeWithKey:customAttributeKey
                                            andStringValue:customAttributeValue];
  }
  // extend with NSNumber, NSDate, etc. as needed
}

- (void)changeUser:(NSMutableDictionary *)parameters {
  NSString *userId = parameters[ChangeUserExternalUserId];
  [[Appboy sharedInstance] changeUser:userId];
}

@end
```

---

### Key Notes

- `eventName` and `actionType` keys are **not** forwarded as custom event properties — they are stripped before passing remaining KV pairs to Braze
- The class path entered in GTM console must exactly match your `BrazeGTMTagManager` implementation path
- GTM for iOS uses Firebase as the data layer; all app-side calls go through `FIRAnalytics logEventWithName:parameters:`
