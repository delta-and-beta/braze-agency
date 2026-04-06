---
name: getting-started-sdk-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/sdk_overview
indexed_at: '2026-04-05'
keywords:
  - SDK
  - data
  - collection
  - user
  - session
  - device
  - push
  - analytics
  - performance
  - sync
triggers:
  - how to collect user data with Braze SDK
  - what data does Braze auto-collect
  - disable Braze SDK data collection
  - Braze SDK performance impact
  - check Braze SDK version
---
`★ Insight ─────────────────────────────────────`
Braze docs use Jekyll templating (`{% image_buster %}`, `{{site.baseurl}}`, `{% tabs %}`) — these are noise for topic files and should be stripped entirely. The platform-specific tab blocks contain the most actionable dev content and deserve explicit callouts rather than being collapsed.
`─────────────────────────────────────────────────`

## Braze SDK Overview

The Braze SDK collects and syncs user data, powers messaging channels, and captures engagement analytics.

### Core Functions

- Collects and syncs user data into a consolidated profile
- Auto-collects session data, device info, and push tokens
- Captures marketing engagement and custom business data
- Powers push notifications, in-app messages, and Content Cards

### Performance Characteristics

- Minimal footprint — no measurable app performance impact
- Adaptive flush rate based on network quality
- Batches API requests automatically for efficiency
- Client-to-Braze payload size is minimal per call

### Default Auto-Collected Data

Collected automatically without extra code:
- First Used App, Last Used App
- Total Session Count
- Device OS and visual properties
- Push tokens

Session start/end events do **not** count toward data point usage. All other auto-tracked data also does not count toward data point usage.

### Data Upload Intervals

| Network Quality | Flush Interval |
|---|---|
| Great | 10 seconds |
| Good | 30 seconds |
| Poor | 60 seconds |

Data is cached locally when offline and uploaded when connection is restored.

### Data Download Behavior

- Braze sends data to the SDK **at session start** based on the user's current segments
- In-app messages are not updated mid-session
- User data is continuously processed as it is sent from the client during the session

### Blocking Data Collection (Not Recommended)

Removing data collection reduces personalization and targeting capabilities. If required:

**Web SDK**
```js
braze.disableSDK();   // Syncs prior data, ignores all future calls
braze.enableSDK();    // Resume collection later
```

**Android SDK**
```kotlin
// Must enable allowlist mode first
BrazeConfig.Builder()
  .setDeviceObjectAllowlistEnabled(true)
  .setDeviceObjectAllowlist(allowlist)  // Empty set = no device data sent
```

**Swift SDK**
```swift
configuration.devicePropertyAllowList = [.field1, .field2]
// Set to [] to disable all device field collection
// Warning: removing fields may disable SDK features
```

### Checking SDK Version

**Settings > App Settings > Live SDK Version** — shows the highest SDK version used by at least 5% of your active users.

> For iOS: if Live SDK Version is ≥ 5.0.0, you are on the modern Swift SDK (not the legacy Objective-C SDK).
