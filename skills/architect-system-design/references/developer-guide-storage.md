---
name: developer-guide-storage
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/storage'
indexed_at: '2026-04-05'
keywords:
  - storage
  - device
  - properties
  - cookies
  - allowlist
  - tracking
  - expiration
  - personalization
  - initialization
  - data
triggers:
  - configure device properties
  - restrict device tracking
  - manage cookie expiration
  - disable cookies
  - clear user data
---
## Storage

### Device Properties Collected by Default

The Braze SDK collects device-level properties for message personalization (device, language, time zone targeting).

**Web:**
`BROWSER`, `BROWSER_VERSION`, `LANGUAGE`, `OS`, `RESOLUTION`, `TIME_ZONE`, `USER_AGENT`

**Android:**
`AD_TRACKING_ENABLED`, `ANDROID_VERSION`, `CARRIER`, `IS_BACKGROUND_RESTRICTED`, `LOCALE`, `MODEL`, `NOTIFICATION_ENABLED`, `RESOLUTION`, `TIMEZONE`

> `AD_TRACKING_ENABLED` and `TIMEZONE` are skipped if null/blank. `GOOGLE_ADVERTISING_ID` must be passed manually via `setGoogleAdvertisingId()`.

**iOS (Swift):**
Device Carrier, Locale, Model, OS Version, Push Authorization Status, Push Display Options, Push Enabled, Resolution, Time Zone

> IDFA is **not** collected automatically. Requires App Tracking Transparency opt-in, then:
> - `set(adTrackingEnabled:)` — set tracking state
> - `set(identifierForAdvertiser:)` — set IDFA

---

### Restricting Device Properties (Allowlist)

All properties are enabled by default. Restrict collection using an allowlist. Some features depend on specific properties (e.g., local time zone delivery), so test before releasing.

**Web:**
```javascript
import * as braze from "@braze/web-sdk";
braze.initialize("API-KEY", {
    baseUrl: "BASE-URL",
    devicePropertyAllowlist: [braze.DeviceProperties.LANGUAGE]
});
```

**Android:**
```java
new BrazeConfig.Builder()
    .setDeviceObjectAllowlistEnabled(true)
    .setDeviceObjectAllowlist(EnumSet.of(DeviceKey.ANDROID_VERSION, DeviceKey.LOCALE));
```

**Swift:**
```swift
configuration.devicePropertyAllowList = [.timeZone, .locale]
```

**Objective-C:**
```objc
configuration.devicePropertyAllowList = @[BRZDeviceProperty.timeZone, BRZDeviceProperty.locale];
```

---

### Cookies (Web Only)

Created on SDK initialization with a **400-day expiration** that auto-renews on new sessions.

| Cookie | Purpose | Size |
|--------|---------|------|
| `ab.storage.userId.[api-key]` | Track current user, associate events | Varies |
| `ab.storage.sessionId.[api-key]` | New vs. existing session detection, analytics | ~200 bytes |
| `ab.storage.deviceId.[api-key]` | Identify anonymous users, differentiate devices | ~200 bytes |
| `ab.optOut` | Store opt-out preference when `disableSDK` called | ~40 bytes |
| `ab._gd` | Determine root cookie domain for subdomain support (temporary) | n/a |

#### Change Cookie Expiry
Requires Web SDK 6.6.0+. Value must be > 0; omitting or setting ≤ 0 falls back to 400 days.

```javascript
braze.initialize("API-KEY", {
  baseUrl: "BASE-URL",
  cookieExpiryInDays: 30
});
```

#### Disable Cookies
Prevents cross-subdomain anonymous user association (new user per subdomain).

```javascript
braze.initialize("API-KEY", {
  baseUrl: "BASE-URL",
  noCookies: true
});
```

#### Clear All Data / Stop Tracking
- `disableSDK()` — stop all Braze tracking
- `wipeData()` — clear all stored browser data

Useful when a user revokes consent or after SDK initialization when you need to halt Braze entirely.
