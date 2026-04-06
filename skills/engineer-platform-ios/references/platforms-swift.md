---
name: platforms-swift
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/visionos
indexed_at: '2026-04-05'
keywords:
  - visionOS
  - Notifications
  - Analytics
  - Messaging
  - ContentCards
  - FeatureFlags
  - Location
  - Spatial
  - ActivityKit
triggers:
  - visionOS support
  - push notifications visionOS
  - analytics visionOS
  - content cards visionOS
  - geofences visionOS
---
## visionOS Support (Braze Swift SDK 8.0.0+)

Braze supports [visionOS](https://developer.apple.com/visionos/) starting with Swift SDK 8.0.0, Apple's spatial-computing platform for Apple Vision Pro.

### Fully Supported

- Analytics: sessions, custom events, purchases
- In-App Messaging: data models and UI
- Content Cards: data models and UI
- Push Notifications: user-visible with action buttons, silent notifications
- Feature Flags
- Location Analytics

### Partially Supported

| Feature | What Works | What Doesn't |
|---|---|---|
| Rich Push Notifications | Images | GIFs/videos (preview only, no playback), audio |
| Push Stories | Scrolling and selecting pages | **Next** button navigation between pages |

### Not Supported

- **Geofences Monitoring** — Core Location region monitoring APIs unavailable on visionOS (Apple limitation)
- **Live Activities** — ActivityKit is iOS/iPadOS only
