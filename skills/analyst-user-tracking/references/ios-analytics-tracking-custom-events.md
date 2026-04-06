---
name: ios-analytics-tracking-custom-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/tracking_custom_events
indexed_at: '2026-04-05'
keywords:
  - events
  - tracking
  - logging
  - iOS
  - Swift
  - properties
  - custom
  - analytics
  - segmentation
  - campaign
triggers:
  - how to log custom events iOS
  - track user behavior with properties
  - custom event implementation Swift
  - event naming conventions Braze
  - segmentation with custom events
---
# iOS Custom Event Tracking

> **Note:** Objective-C API (`Appboy.sharedInstance()`) is deprecated. Prefer the Swift SDK.

## Log a Custom Event

**Objective-C:**
```objc
[[Appboy sharedInstance] logCustomEvent:@"YOUR_EVENT_NAME"];
```

**Swift:**
```swift
Appboy.sharedInstance()?.logCustomEvent("YOUR_EVENT_NAME")
```

## Log with Properties

Pass an `NSDictionary` with `NSNumber`, `NSString`, or `NSDate` values (nested JSON supported).

**Objective-C:**
```objc
[[Appboy sharedInstance] logCustomEvent:@"YOUR-EVENT-NAME"
                         withProperties:@{
  @"stringKey": @"value",
  @"boolKey":   @(NO),
  @"intKey":    @42,
  @"dateKey":   [NSDate date],
  @"arrayKey":  @[@"any", @"array"],
  @"nestedKey": @{ @"deep": @[@"nested", @"json"] }
}];
```

**Swift:**
```swift
Appboy.sharedInstance()?.logCustomEvent(
  "YOUR-EVENT-NAME",
  withProperties: [
    "stringKey": "value",
    "boolKey":   false,
    "intKey":    42,
    "dateKey":   Date(),
    "arrayKey":  ["any", "array"],
    "nestedKey": ["deep": ["nested", "json"]]
  ]
)
```

## Reserved Property Keys

These keys cannot be used as custom event property names:
- `time`
- `event_name`

## Notes

- Review [event naming conventions](https://www.braze.com/docs/user_guide/data/custom_data/event_naming_conventions/) before defining event names.
- Custom events power segmentation and campaign targeting in the Braze dashboard.
- Method reference: `Appboy.h` → `logCustomEvent:withProperties:`
