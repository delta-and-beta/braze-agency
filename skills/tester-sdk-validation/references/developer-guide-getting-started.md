---
name: developer-guide-getting-started
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/sdk_overview
indexed_at: '2026-04-05'
keywords:
  - SDK
  - data-collection
  - user-profiles
  - push-notifications
  - in-app-messages
  - session-data
  - device-properties
  - segmentation
  - offline-caching
  - performance
triggers:
  - how to collect user data
  - how to disable data collection
  - how to check SDK version
  - how to optimize performance
  - how to configure device properties
---
# Braze SDK Overview for Developers

## What the SDK Does

- Collects and syncs user data into consolidated user profiles
- Automatically collects session data, device info, and push tokens
- Captures marketing engagement data and custom business data
- Powers push notifications, in-app messages, and Content Card channels

## Performance Characteristics

- Minimal footprint — no negative impact on app performance
- Flush rate auto-adjusts based on network quality:

| Network Quality | Data Flush Interval |
|---|---|
| Great | 10 seconds |
| Good | 30 seconds |
| Poor | 60 seconds |

- API requests are batched for efficiency
- Data is cached locally when offline, uploaded when connection restores

## Default Data Collection

Automatically tracked (free — does not count toward data point usage, except session start/end):
- First Used App, Last Used App, Total Session Count, Device OS
- Full list: see SDK Data Collection reference

Session behavior: Braze sends targeting data at session start based on current segment membership. In-app messages don't update mid-session, but user data is processed continuously as it arrives.

## Blocking Data Collection

Possible but **not recommended** — removing analytical data reduces personalization and targeting capability. Tradeoffs:

- No location integration → can't personalize by language/location
- No timezone integration → can't send time-zone-aware messages
- No device info → message content may not be optimized for device

### Per-Platform Controls

**Web SDK**
- `braze.disableSDK()` — stops all future calls; syncs data logged before the call
- `braze.enableSDK()` — resumes collection

**Android SDK**
```kotlin
BrazeConfig.Builder()
    .setDeviceObjectAllowlistEnabled(true)
    .setDeviceObjectAllowlist(EnumSet.of(...)) // empty set = no device data sent
```

**Swift SDK**
```swift
configuration.devicePropertyAllowList = [/* subset of Braze.Configuration.DeviceProperty */]
// Empty set [] disables all device field collection
```
> Warning: removing device properties may disable SDK features.

## Checking Your SDK Version

**Settings > App Settings > Live SDK Version** — shows the highest SDK version used by ≥5% of your active users.

- iOS: if Live SDK Version ≥ the Swift SDK baseline, you're on the modern Swift SDK (not legacy Objective-C SDK)
