---
name: analytics-logging-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/logging_events
indexed_at: '2026-04-05'
keywords:
  - events
  - logging
  - custom
  - properties
  - behavior
  - tracking
  - campaigns
  - segmentation
  - braze
  - SDKs
triggers:
  - how to log custom events
  - track user behavior with events
  - add properties to custom events
  - trigger campaigns using events
  - logging events in braze
---
# Logging Custom Events

Log custom events to track user behavior and trigger campaigns, Canvas steps, and segmentation in Braze.

## Basic Event Logging

| Platform | Method |
|---|---|
| Web | `braze.logCustomEvent("EVENT_NAME")` |
| Android (Java) | `Braze.getInstance(context).logCustomEvent(YOUR_EVENT_NAME)` |
| Android (Kotlin) | `Braze.getInstance(context).logCustomEvent(YOUR_EVENT_NAME)` |
| Swift | `AppDelegate.braze?.logCustomEvent(name: "EVENT_NAME")` |
| Objective-C | `[AppDelegate.braze logCustomEvent:@"EVENT_NAME"]` |
| Flutter | `braze.logCustomEvent('EVENT_NAME')` |
| Cordova | `BrazePlugin.logCustomEvent("EVENT_NAME")` |
| React Native | `Braze.logCustomEvent("EVENT_NAME")` |
| Roku | `m.Braze.logEvent("EVENT_NAME")` |
| Unity | `AppboyBinding.LogCustomEvent("EVENT_NAME")` |

> For wrapper SDKs not listed, use the relevant native Android or Swift method.

## Naming Constraints

- Max 255 characters for event name
- Do **not** start with `$`
- Use alphanumeric characters and punctuation

## Adding Properties

Pass a properties object as the second argument. Properties are key-value pairs.

**Supported value types:** `string` (≤255 chars), `numeric`, `boolean`, `Date`, arrays, nested JSON objects  
**Key constraints:** ≤255 characters, do not start with `$`

### Web
```javascript
braze.logCustomEvent("YOUR-EVENT-NAME", {
  you: "can",
  pass: false,
  orNumbers: 42,
  orDates: new Date(),
  or: ["any", "array", "here"],
  andEven: { deeply: ["nested", "json"] }
});
```

### Android (Kotlin)
```kotlin
Braze.logCustomEvent("YOUR-EVENT-NAME",
    BrazeProperties(JSONObject()
        .put("you", "can")
        .put("pass", false)
        .put("orNumbers", 42)
        .put("orDates", Date())
        .put("or", JSONArray().put("any").put("array").put("here"))
        .put("andEven", JSONObject().put("deeply", JSONArray().put("nested").put("json")))
    )
)
```

### Swift
```swift
AppDelegate.braze?.logCustomEvent(
  name: "YOUR-EVENT-NAME",
  properties: [
    "you": "can",
    "pass": false,
    "orNumbers": 42,
    "orDates": Date(),
    "or": ["any", "array", "here"],
    "andEven": ["deeply": ["nested", "json"]]
  ]
)
```

### Flutter
```dart
braze.logCustomEvent('event_name', properties: {
    'key1': 'value1',
    'key2': ['value2', 'value3'],
    'key3': false,
});
```

### Cordova
```javascript
BrazePlugin.logCustomEvent("YOUR-EVENT-NAME", {
  "key": "value",
  "amount": 42,
});
```

## Special Cases

**Google Tag Manager (Web):** Use the **Custom Event** tag type → set Event Name → use **Add Row** to add properties.

**Infillion Beacons (Android):** Use `visit.getPlace()` for location-specific events. Call `requestImmediateDataFlush()` to ensure events log when the app is in the background:
```kotlin
Braze.getInstance(context).logCustomEvent("Entered " + visit.getPlace())
Braze.getInstance(context).requestImmediateDataFlush()
```
