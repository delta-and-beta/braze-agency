---
name: locations-and-geofences-creating-geofences
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/locations_and_geofences/creating_geofences
indexed_at: '2026-04-05'
keywords:
  - geofence
  - location
  - coordinates
  - radius
  - permissions
  - segmentation
  - background
  - deeplink
  - iOS
  - Android
triggers:
  - creating geofences
  - setting up location permissions
  - configuring geofence campaigns
  - enabling location tracking
---
# Creating Geofences

A geofence is a virtual geographic area defined by latitude/longitude coordinates and a radius (in meters), forming a circle around a position. They trigger campaigns in real-time on entry/exit, or schedule follow-up campaigns hours or days later.

## Core Concepts

**Geofence Sets** — Groups of geofences used for segmentation. Each set holds up to 10,000 geofences; you can create unlimited sets.

| Term | Description |
|------|-------------|
| Latitude/Longitude | Geographic center of the geofence |
| Radius | Distance in meters from center. Minimum recommended: 100–150m |
| Cooldown | Pre-defined period after a transition during which the same user can't trigger the same geofence again. Prevents unnecessary network requests. |

## Device Limits

| Platform | OS Limit | Braze Limit |
|----------|----------|-------------|
| Android | 100 geofences locally | 20 per app |
| iOS | 20 geofences per app | 20 (if space available) |

If a user is eligible for more than 20, Braze downloads the nearest ones at session start.

## Prerequisites

- Background push notifications supported in your integration
- Braze geofences/location collection enabled
  - Android: set `com_braze_enable_location_collection=true` in `braze.xml` (disabled by default)
- User must grant **"Always Allow"** location access

## Location Permissions

### iOS

| Permission | Geofencing Support |
|------------|-------------------|
| Allow Once | No — no background tracking |
| Allow While Using App | Yes — iOS enables background geofence monitoring |
| Always Allow | Yes — most reliable |
| Don't Allow | No |

### Android

| Permission | Geofencing Support |
|------------|-------------------|
| While Using App | No — background access required |
| Always Allow | Yes — required; Android 10+ needs separate prompt after foreground grant |
| Don't Allow | No — Android 13+ blocks further prompts after two denials |

### Precise vs. Approximate Location (iOS 14+ / Android 12+)

| Setting | Accuracy | Geofencing |
|---------|----------|------------|
| Precise (on) | 5–50m via GPS/Wi-Fi/cellular | Works as expected. Recommended. |
| Approximate (off) | ~3 km² area | Unreliable — can't determine inside/outside boundary |

Always instruct users to enable precise location in your permission primer messaging.

## Location Permission Primer

A primer is an in-app message shown before the native OS prompt to increase opt-in rates. The native iOS prompt can only be shown **once**; Android has a limited retry window.

### Setup Steps

1. **Coordinate with dev team** — Braze IAMs can't natively invoke the OS permission prompt. Work with engineering to set up:
   - A deep link that triggers the native location permission prompt
   - A deep link to the device's OS location settings (for re-prompting previously-denied users)

2. **Build the IAM** — In Braze: **Messaging → Campaigns → Create Campaign → In-App Message**
   - Use **Modal** or **Full** layout for maximum space to explain the value of location access
   - All IAM types support this (including drag-and-drop editor)

`★ Insight ─────────────────────────────────────`
- **Why 100–150m minimum radius**: GPS accuracy on mobile devices degrades in urban canyons and indoors. A radius smaller than ~100m will produce unreliable entry/exit events because the location error margin can exceed the geofence itself.
- **The 20-geofence OS limit** on iOS is a hard constraint from Apple — Braze's proximity-based download strategy (nearest geofences at session start) is a direct workaround for this ceiling.
- **Cooldown exists to protect infrastructure**, not just UX: without it, a user pacing near a geofence boundary could generate thousands of network requests per hour.
`─────────────────────────────────────────────────`
