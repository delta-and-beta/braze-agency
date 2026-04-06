---
name: engagement-tools-locations-and-geofences
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/locations_and_geofences
indexed_at: '2026-04-05'
keywords:
  - geofences
  - location
  - tracking
  - segmentation
  - triggering
  - campaigns
  - messaging
  - boundaries
  - permissions
  - GPS
triggers:
  - set up geofences
  - send location-based push notifications
  - trigger campaigns by location
  - segment users by location
  - enable geofence tracking
---
# Locations & Geofences Overview

Braze supports two distinct mechanisms for leveraging user location data:

## Location Tracking (GPS)
Captures a user's most recent location when they open your app. Use cases:
- Segment users based on where they have been
- Passive data collection — no background permissions required

## Geofences
Virtual geographic boundaries that trigger real-time campaign actions when a user enters or exits the defined area. Requires background location tracking enabled by the user.

**Use cases:**
- Upload store locations → send push notifications about in-store promotions when loyal users pass nearby
- Upload a venue location → message users with registration info when they arrive, then send a follow-up after they leave

## Key Distinction

| Feature | Location Tracking | Geofences |
|---|---|---|
| Trigger | App open | Background location event |
| Use | Segmentation (historical) | Real-time campaign triggering |
| Permission needed | Foreground GPS | Background location |

`★ Insight ─────────────────────────────────────`
- The two mechanisms are complementary: location tracking builds behavioral history for segmentation, while geofences enable event-driven messaging without requiring the app to be open.
- Geofences depend on OS-level background location APIs (iOS/Android), making the user permission model a critical adoption factor — worth noting in related skill content about setup and opt-in strategies.
`─────────────────────────────────────────────────`
