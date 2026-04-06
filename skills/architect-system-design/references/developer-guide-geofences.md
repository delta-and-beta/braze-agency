---
name: developer-guide-geofences
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/geofences'
indexed_at: '2026-04-05'
keywords:
  - geofence
  - location
  - boundary
  - entry
  - exit
  - latitude
  - longitude
  - trigger
  - radius
  - campaign
triggers:
  - how to set up geofences
  - triggering on location entry and exit
  - configuring geofence boundaries
  - location-based engagement with geofences
---
`★ Insight ─────────────────────────────────────`
The source uses Braze's Jekyll-based doc system with `{% sdktabs %}` and `{% multi_lang_include %}` directives — these are SSG template tags, not actual content. The actual SDK-specific implementation details live in separate partial files that aren't included here. The best approach is to distill the universal concept and signal the platform-specific nature clearly.
`─────────────────────────────────────────────────`

## Geofences

A **geofence** is a virtual geographic boundary defined by:
- A **latitude** and **longitude** (center point)
- A **radius** (distance from center, forming a circle)

Geofences trigger SDK events when a device enters or exits the defined area, enabling location-aware messaging and engagement.

### Platform Support

The Braze SDK supports geofences across the following platforms:

| Platform | SDK |
|---|---|
| Android | Braze Android SDK |
| iOS | Braze Swift SDK |
| Cross-platform | .NET MAUI (Xamarin) |
| Cross-platform | React Native |

### How Geofences Work

1. Geofence definitions (lat/lon + radius) are configured in the Braze dashboard under **Locations & Geofences**
2. The SDK downloads relevant geofence sets for the user's current region
3. The OS monitors geofence boundaries and notifies the SDK on entry/exit events
4. The SDK fires the appropriate Braze campaign or Canvas trigger

### Key Concepts

- **Entry event**: Triggered when a device crosses into the geofence boundary
- **Exit event**: Triggered when a device crosses out of the geofence boundary
- **Dwell time**: Some configurations require the user to remain inside for a minimum duration before triggering

### Setup Requirements

Each platform requires:
1. Location permissions granted by the user (precise location for Android, "Always" permission for iOS)
2. Geofence capability enabled in the Braze SDK initialization
3. Geofences defined in the Braze dashboard

> **Note:** Platform-specific implementation details (permission requests, SDK configuration flags, delegate/callback setup) vary per SDK. Refer to the Android, Swift, Xamarin, or React Native SDK guides for exact code.
