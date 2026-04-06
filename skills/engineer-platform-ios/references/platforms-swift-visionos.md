---
name: platforms-swift-visionos
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/visionos
indexed_at: '2026-04-05'
keywords:
  - visionOS
  - Swift
  - Analytics
  - Messaging
  - Notifications
  - Features
  - Location
  - Geofences
  - Activities
  - Vision
triggers:
  - visionOS support
  - push notifications Vision Pro
  - feature flags visionOS
  - in-app messaging visionOS
---
## visionOS Support

Available from **Braze Swift SDK 8.0.0+**. Works with Apple Vision Pro's spatial computing platform.

### Fully Supported

- Analytics (sessions, custom events, purchases)
- In-App Messaging (data models + UI)
- Content Cards (data models + UI)
- Push Notifications (user-visible, action buttons, silent)
- Feature Flags
- Location Analytics

### Partially Supported

| Feature | What Works | What Doesn't |
|---|---|---|
| Rich Push Notifications | Images | GIFs/videos (preview only, no playback); audio |
| Push Stories | Scroll + select pages | **Next** button navigation between pages |

### Not Supported

| Feature | Reason |
|---|---|
| Geofences Monitoring | Core Location region monitoring APIs unavailable on visionOS |
| Live Activities | ActivityKit is iOS/iPadOS only |
