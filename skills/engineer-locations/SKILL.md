---
name: engineer-locations
description: >-
  Implementing location tracking and geofence configuration for location-based
  engagement.
metadata:
  role: braze-engineer
  topics:
    - engagement-tools-locations-and-geofences
    - locations-and-geofences-location-tracking
    - locations-and-geofences-creating-geofences
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Plugin skill files serve as domain reference guides for Claude, not process enforcement — the structure should optimize for *discoverability and relevance signaling* rather than discipline checklists
- The "lens" in Nick's pipeline acts as a role constraint: it filters topic content through a specific professional perspective (e.g., "technical setup" means SDK calls and config, not marketing strategy)
- Synthesizing multiple topics into one skill means the skill should surface *relationships between topics*, not just list them — the geofence ↔ location tracking distinction is a key one here
`─────────────────────────────────────────────────`

Here is the generated skill markdown:

---

# Location & Geofence Engineering

## Scope

This skill covers the technical setup and integration of Braze's geospatial targeting infrastructure — specifically how to collect user location data from mobile apps and configure geofences that trigger real-time campaign delivery. It is written from the perspective of a **Braze engineer responsible for implementing location-aware features**, not a marketer configuring campaigns.

Use this skill when:
- Enabling GPS-based location tracking in an iOS or Android app integrated with the Braze SDK
- Creating, configuring, or troubleshooting geofences for proximity-triggered messaging
- Segmenting users based on their most recent known location
- Integrating Braze's location APIs with your app's permission and background-execution model
- Debugging why geofence events are not firing or location data is missing from user profiles

Do **not** use this skill for campaign scheduling logic unrelated to location, push notification setup without a geospatial trigger, or server-side event ingestion via the REST API.

---

## Topics Synthesized

This skill draws on three knowledge areas:

### 1. Locations & Geofences Overview
Braze exposes two distinct mechanisms for location-aware engagement:

- **Location Tracking (GPS)** — captures a user's most recent foreground location when the app is opened. Used for segmentation and targeting at campaign creation time.
- **Geofences** — virtual circular zones (defined by latitude, longitude, and a radius in meters) that trigger campaigns in real time when a user enters or exits the boundary.

These are complementary but independent features. Location tracking gives you a static snapshot; geofences give you event-driven triggers.

### 2. Location Tracking
Braze captures location on app foreground open using the device's GPS. Key engineering considerations:

- Requires explicit OS-level location permission (`NSLocationWhenInUseUsageDescription` on iOS, `ACCESS_FINE_LOCATION` on Android)
- The SDK stores the user's last known location and makes it available as a profile attribute for segmentation filters
- Location data is **not** continuously polled — it reflects the most recent app open
- Must be explicitly enabled via SDK initialization flags

### 3. Creating Geofences
Geofences are defined as geographic circles and must be registered with Braze before they can trigger events. Key engineering considerations:

- Each geofence has a **latitude**, **longitude**, and **radius** (meters)
- Entry and exit events are captured separately and can trigger different campaigns
- Geofences require background location permission (`Always` authorization on iOS) and background execution entitlements
- The SDK manages geofence monitoring — you define the zones, Braze handles OS-level registration
- Platform limits apply (iOS: 20 monitored regions per app; Braze manages rotation of active zones)

---

## Engineering Lens

This skill approaches location features as **infrastructure to wire up**, not features to configure in the dashboard. The focus is on:

- **SDK initialization and permission gating** — what code must be written before any location feature works
- **Platform constraints** — OS-level limits on geofence monitoring, permission models, and background execution
- **Data flow** — how location events travel from the device through the SDK to Braze user profiles and campaign triggers
- **Failure modes** — why geofence events don't fire, why location is missing, what to check at the SDK and OS level

When answering questions through this skill, prefer implementation specifics (method names, permission strings, initialization flags, SDK configuration objects) over conceptual explanations.

---

## Quick Reference

| Feature | Trigger | Permission Required | Real-Time? |
|---|---|---|---|
| Location Tracking | App foreground open | `WhenInUse` / `FINE_LOCATION` | No (snapshot) |
| Geofence Entry | User crosses boundary inbound | `Always` / background | Yes |
| Geofence Exit | User crosses boundary outbound | `Always` / background | Yes |

---

## Common Mistakes

- **Using `WhenInUse` permission for geofences** — geofence monitoring requires `Always` authorization on iOS; `WhenInUse` will silently fail to register background events
- **Assuming location tracks continuously** — Braze only updates location on foreground app opens, not passively in the background
- **Exceeding platform geofence limits** — iOS limits apps to 20 simultaneously monitored regions; if you register more, the OS drops excess zones (Braze rotates them, but registration order matters)
- **Skipping SDK location initialization** — location features are opt-in; failing to call the SDK's location enable method means no data is collected even with correct permissions
