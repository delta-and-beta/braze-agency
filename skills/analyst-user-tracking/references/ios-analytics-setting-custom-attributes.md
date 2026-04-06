---
name: ios-analytics-setting-custom-attributes
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/setting_custom_attributes
indexed_at: '2026-04-05'
keywords:
  - attributes
  - custom-attributes
  - user-data
  - segmentation
  - ABKUser
  - increment
  - arrays
  - subscriptions
  - filtering
  - dashboard
triggers:
  - setting custom attributes
  - assign user attributes
  - increment custom user attribute
  - configure user subscriptions
  - filter users by attributes
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's plugin structure are atomic knowledge units — they live in `skills/{name}/references/*.md` and are designed to be pulled into agent context at runtime. Stripping Jekyll liquid tags (`{% tabs %}`, `{{site.baseurl}}`), deprecation includes, and nav boilerplate is essential because the LLM consuming this at query time needs clean, parseable content — not templating artifacts.
`─────────────────────────────────────────────────`

# iOS: Setting Custom Attributes

Braze provides methods for assigning attributes to users via the `ABKUser` object, enabling dashboard filtering and segmentation.

## Default User Attributes

Set on `[Appboy sharedInstance].user`:

```swift
// Swift
Appboy.sharedInstance()?.user.firstName = "first_name"
```

```objc
// Objective-C
[Appboy sharedInstance].user.firstName = @"first_name";
```

Available default fields: `firstName`, `lastName`, `email`, `dateOfBirth`, `country`, `language`, `homeCity`, `phone`, `userID`, `gender`

## Custom Attribute Types

### String
```swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("key", andStringValue: "value")
```

### Integer
```swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("key", andIntegerValue: yourIntegerValue)
```

### Double / Float
Braze treats `float` and `double` identically in the database.
```swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("key", andDoubleValue: yourDoubleValue)
```

### Boolean
```swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("key", andBOOLValue: yourBoolValue)
```

### Date
Must be ISO 8601 (`2013-07-16T19:20:30+01:00`) or `yyyy-MM-dd'T'HH:mm:ss:SSSZ` format.
```swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("key", andDateValue: yourDateValue)
```

### Array
Default max: **500 elements** (configurable in dashboard under **Data Settings > Custom Attributes**). Arrays exceeding the max are truncated.

```swift
// Set
Appboy.sharedInstance()?.user.setCustomAttributeArrayWithKey("array_name", array: ["value1", "value2"])
// Add element
Appboy.sharedInstance()?.user.addToCustomAttributeArrayWithKey("array_name", value: "value3")
// Remove element
Appboy.sharedInstance()?.user.removeFromCustomAttributeArrayWithKey("array_name", value: "value2")
```

```objc
// Remove entire array (Objective-C only pattern)
[[Appboy sharedInstance].user setCustomAttributeArrayWithKey:@"array_name" array:nil];
```

## Unsetting a Custom Attribute
```swift
Appboy.sharedInstance()?.user.unsetCustomAttributeWithKey("key")
```

## Incrementing / Decrementing
Accepts any positive or negative integer or long value:
```swift
Appboy.sharedInstance()?.user.incrementCustomUserAttribute("key", by: incrementIntegerValue)
```

## Value Limits
- Max length: **255 characters** — longer values are truncated.

## User Subscriptions

Call `setEmailNotificationSubscriptionType` or `setPushNotificationSubscriptionType` with `ABKNotificationSubscriptionType`:

| Status | Meaning |
|--------|---------|
| `ABKOptedin` | Subscribed + explicitly opted in |
| `ABKSubscribed` | Subscribed, no explicit opt-in |
| `ABKUnsubscribed` | Unsubscribed / opted out |

- iOS push defaults to `ABKOptedin` (requires explicit permission grant).
- Email defaults to `ABKSubscribed` on valid address receipt; set `OptedIn` manually on explicit consent.

## REST API Alternative
Custom attributes can also be set server-side via the [User Data REST API](https://www.braze.com/docs/developer_guide/rest_api/user_data/).

## References
- [`ABKUser.h`](https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/include/Appboy.h)
- [`ABKUser` API docs](http://appboy.github.io/appboy-ios-sdk/docs/interface_a_b_k_user.html)

`★ Insight ─────────────────────────────────────`
The Objective-C tab syntax has been collapsed to inline comments rather than separate blocks — this reduces token overhead at query time while preserving both language variants. Date format constraints and array limits are kept as hard facts because these are exactly the kind of sharp edges that agents need to surface to engineers at the right moment.
`─────────────────────────────────────────────────`
