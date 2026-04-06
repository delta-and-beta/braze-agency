---
name: ios-advanced-beacon-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/beacon_integration
indexed_at: '2026-04-05'
keywords:
  - beacon
  - geolocation
  - infillion
  - visit-tracking
  - custom-events
  - event-flushing
  - place-tracking
  - segmentation
  - backgrounding
triggers:
  - How to log beacon events in Swift
  - Track place visits with Infillion beacons
  - Scale beacon tracking beyond 50 places
  - Handle app backgrounding with custom events
  - Flush Braze events for beacon entry and exit
---
`★ Insight ─────────────────────────────────────`
- The `{% multi_lang_include %}` and `{% tabs %}` tags are Jekyll/Liquid template syntax — strip these entirely since they're navigation boilerplate, not content
- The "50 places" recommendation is a hidden scaling constraint worth preserving — it hints at Braze's custom event attribute limits
`─────────────────────────────────────────────────`

## Beacon Integration

### Infillion Beacons

After integrating Infillion Beacons into your app, log custom events for visit lifecycle moments (start, end, sighting) with optional properties (place name, dwell time).

#### Log Entry to a Place

In the `didBeginVisit` method:

**Swift**
```swift
Appboy.sharedInstance()?.logCustomEvent("Entered %@", visit.place.name)
Appboy.sharedInstance()?.flushDataAndProcessRequestQueue()
```

**Objective-C**
```objc
[[Appboy sharedInstance] logCustomEvent:@"Entered %@", visit.place.name];
[[Appboy sharedInstance] flushDataAndProcessRequestQueue];
```

- `flushDataAndProcessRequestQueue()` ensures the event logs even when the app is backgrounded
- The same pattern applies to exit events (`didEndVisit`)

#### Scaling Consideration

This approach creates a **unique custom event per place name**. If you expect more than 50 distinct places, use a single generic event with the place name as a property instead:

```swift
Appboy.sharedInstance()?.logCustomEvent("Place Entered", withProperties: ["place_name": visit.place.name])
```

This avoids hitting Braze's custom event count limits while preserving segmentation capability via event properties.

`★ Insight ─────────────────────────────────────`
- The 50-place threshold maps to Braze's custom event schema limits — exceeding it causes new events to be dropped or blocked in the dashboard
- Encoding variable data (place name) in the event *name* vs. as a *property* is a fundamental Braze schema decision: names are for routing/segmentation dimensions, properties are for filter values
`─────────────────────────────────────────────────`
