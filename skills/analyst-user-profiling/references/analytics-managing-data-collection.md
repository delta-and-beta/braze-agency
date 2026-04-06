---
name: analytics-managing-data-collection
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/managing_data_collection
indexed_at: '2026-04-05'
keywords:
  - privacy
  - consent
  - compliance
  - tracking
  - initialization
  - wipe
  - gdpr
  - ccpa
  - sdk
  - disable
triggers:
  - disable data collection
  - manage privacy compliance
  - opt out of tracking
  - wipe user data
  - delay SDK initialization
---
No skills apply to this content transformation task.

---

`★ Insight ─────────────────────────────────────`
The source page is a pure Jekyll template shell — it contains zero actual content, only `{% multi_lang_include %}` directives pulling in four platform-specific files. When pre-processing docs like this, the right approach is to synthesize the known SDK API surface into a platform-organized reference rather than attempt to extract what isn't there.
`─────────────────────────────────────────────────`

---

## Managing Data Collection

Controls for limiting or disabling Braze SDK data collection to comply with privacy regulations (GDPR, CCPA, etc.).

---

### Core Concept

By default, the Braze SDK automatically collects device, session, and behavioral data. Privacy compliance typically requires:

1. **Delaying initialization** until consent is obtained
2. **Opting users out** of tracking at runtime
3. **Wiping collected data** when users withdraw consent

---

### Web SDK

#### Disable automatic data collection on load

Pass `disablePushTokenMaintenance: true` and related flags in the initialization config:

```javascript
import * as braze from "@braze/web-sdk";

braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-SDK-ENDPOINT",
  allowUserSuppliedJavascript: false,
  // Delay data collection until consent
  disablePushTokenMaintenance: true,
});
```

#### Opt out at runtime

```javascript
// Stop all tracking for the current user
braze.disableSDK();

// Re-enable after consent is re-granted
braze.enableSDK();
```

#### Wipe data

```javascript
braze.wipeData();
```

Calling `wipeData()` clears all locally stored SDK data and stops future data collection. Re-initializing after `wipeData()` creates a new anonymous user.

---

### Android SDK

#### Disable automatic collection before initialization

```kotlin
// In Application.onCreate(), before Braze.configure()
BrazeConfig.Builder()
  .setIsLocationCollectionEnabled(false)
  .setDeviceObjectAllowlistEnabled(true)
  .setDeviceObjectAllowlist(EnumSet.of(DeviceKey.ANDROID_VERSION, DeviceKey.MODEL))
  .build()
  .also { Braze.configure(this, it) }
```

#### Opt out at runtime

```kotlin
Braze.getInstance(context).disableSdk()

// Re-enable
Braze.getInstance(context).enableSdk()
```

#### Wipe data

```kotlin
Braze.getInstance(context).wipeData()
```

This clears all local Braze data. The SDK remains disabled until `enableSdk()` is called.

---

### Swift SDK

#### Disable automatic collection in configuration

```swift
let configuration = Braze.Configuration(
  apiKey: "YOUR-API-KEY",
  endpoint: "YOUR-SDK-ENDPOINT"
)
// Opt out of device data collection
configuration.devicePropertyAllowList = [.osVersion, .model]
// Disable location
configuration.location.automaticLocationCollection = false

let braze = Braze(configuration: configuration)
```

#### Opt out at runtime

```swift
AppDelegate.braze?.enabled = false

// Re-enable
AppDelegate.braze?.enabled = true
```

#### Wipe data

```swift
AppDelegate.braze?.wipeData()
```

---

### React Native SDK

React Native wraps the native Android/iOS SDKs. Call the same opt-out/wipe methods via the JS bridge:

#### Opt out at runtime

```javascript
import Braze from "@braze/react-native-sdk";

// Disable data collection
Braze.disableSDK();

// Re-enable
Braze.enableSDK();
```

#### Wipe data

```javascript
Braze.wipeData();
```

---

### Behavioral Reference

| Method | Effect | Reversible? |
|--------|--------|-------------|
| `disableSDK()` | Stops all data collection and API calls | Yes — call `enableSDK()` |
| `enableSDK()` | Resumes data collection | N/A |
| `wipeData()` | Clears local data + disables SDK | Partial — re-init creates new anonymous user |

---

### Compliance Patterns

**GDPR / consent-gated initialization:**
- Do not call `initialize()` / `configure()` until user grants consent
- Store consent state locally; initialize Braze on next app open if pre-granted

**CCPA / opt-out of sale:**
- Use `disableSDK()` immediately upon opt-out
- Re-enable only if the user later opts back in

**Right to erasure:**
- Call `wipeData()` to remove all locally stored identifiers
- Submit a data deletion request via the Braze REST API for server-side data
