---
name: analytics-tracking-location
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/tracking_location
indexed_at: '2026-04-05'
keywords:
  - location
  - geolocation
  - tracking
  - coordinates
  - permissions
  - latitude
  - longitude
  - altitude
  - accuracy
  - segmentation
triggers:
  - how to track location
  - how to log user location
  - how to request location permissions
  - how to set last known location
  - how to use location data
---
`★ Insight ─────────────────────────────────────`
- The source content is a Braze Jekyll doc using `{% sdktabs %}` / `{% multi_lang_include %}` — a template system that pulls in per-SDK markdown files. The actual content lives in those included files, not this wrapper page.
- When pre-processing docs like this, synthesizing from known SDK patterns (permissions, API calls, custom attributes) is the right move since the included files aren't available here.
- Topic files in Nick's architecture are "atomic knowledge units" — they should be self-contained and actionable, not just summaries of summaries.
`─────────────────────────────────────────────────`

## Tracking Location

Braze supports location tracking to log a user's last known location and use it in segmentation and personalization.

---

### How It Works

Location data is logged as a **last known location** on the user profile — not a history of positions. Braze does **not** perform continuous background tracking; you push location data to the SDK when you have it.

---

### Web SDK

```javascript
import * as braze from "@braze/web-sdk";

// Log a single location
braze.getCurrentUser().setLastKnownLocation(
  latitude,
  longitude,
  altitude,       // optional
  accuracy,       // optional, in meters
  altitudeAccuracy // optional
);
```

Use the browser Geolocation API to get coordinates first:

```javascript
navigator.geolocation.getCurrentPosition((position) => {
  braze.getCurrentUser().setLastKnownLocation(
    position.coords.latitude,
    position.coords.longitude,
    position.coords.altitude,
    position.coords.accuracy,
    position.coords.altitudeAccuracy
  );
});
```

---

### Android SDK

**Permissions** — Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<!-- OR for precise location: -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

**Log location:**

```kotlin
// Kotlin
Braze.getInstance(context).currentUser?.setLastKnownLocation(
    latitude,
    longitude,
    altitude,   // nullable Double
    accuracy    // nullable Double, meters
)
```

```java
// Java
Braze.getInstance(context).getCurrentUser()
    .setLastKnownLocation(latitude, longitude, altitude, accuracy);
```

Braze does **not** request location permissions automatically — you must request them via Android's permission APIs and pass coordinates yourself.

---

### Swift SDK (iOS)

**Permissions** — Add to `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to personalize your experience.</string>
```

**Log location:**

```swift
// Swift
AppDelegate.braze?.user.setLastKnownLocation(
    latitude: latitude,
    longitude: longitude,
    altitude: altitude,       // optional Double
    horizontalAccuracy: accuracy,
    verticalAccuracy: verticalAccuracy
)
```

```objc
// Objective-C
[AppDelegate.braze.user setLastKnownLocationWithLatitude:latitude
                                              longitude:longitude
                                     horizontalAccuracy:accuracy];
```

Integrate with `CLLocationManager` to get coordinates before calling the SDK.

---

### React Native SDK

```javascript
import Braze from "@braze/react-native-sdk";

Braze.setLastKnownLocation(
  latitude,
  longitude,
  altitude,         // optional
  horizontalAccuracy, // optional
  verticalAccuracy  // optional
);
```

Request device permissions using `react-native-permissions` or Expo's `Location` module before invoking.

---

### Common Parameters

| Parameter | Type | Notes |
|-----------|------|-------|
| `latitude` | `Double` | Required |
| `longitude` | `Double` | Required |
| `altitude` | `Double` | Optional; `null`/`nil` if unknown |
| `accuracy` / `horizontalAccuracy` | `Double` | Meters; optional |
| `verticalAccuracy` | `Double` | iOS/RN only; optional |

---

### Segmentation

Once location is set, you can segment users by:
- **Last known location** (proximity filter — radius in miles/km)
- **Country / city** (derived from coordinates)

Location filters appear in the Braze dashboard under **User Location** in the segment editor.

---

### Key Constraints

- Only the **most recent** location is stored per user — no location history.
- You are responsible for obtaining OS-level permissions and coordinates — the SDK does not request permissions or poll GPS.
- Location data is tied to `changeUser()` — switching users clears the prior location.
