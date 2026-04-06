---
name: platforms-swift-ios-16
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/ios_18'
indexed_at: '2026-04-05'
keywords:
  - iOS
  - watchOS
  - VisionPro
  - visionOS
  - notifications
  - push
  - mirroring
  - intelligence
  - integration
  - braze
triggers:
  - set up live activities on apple watch
  - configure vision pro notifications in braze
  - handle apple intelligence notification summaries
  - support iphone mirroring for macos
  - customize ios 18 push behavior
---
## iOS 18 Updates for Braze

Key changes in iOS 18 affecting Braze integrations.

### Live Activities on Apple Watch (watchOS 11)

- Live Activities are supported on watchOS 11 with no additional setup required
- Optional: customize the watch interface via Apple's APIs

### Apple Vision Pro Expansion

- Vision Pro now available in: China, Japan, Singapore, Australia, Canada, France, Germany, UK
- Braze supports visionOS — existing integrations carry over

### iPhone Notifications on macOS (iPhone Mirroring)

- Users can receive iPhone push notifications mirrored to macOS via Apple's iPhone Mirroring feature
- **Limitation:** Push Story images and GIFs are not supported — they cannot render as macOS notifications

### Apple Intelligence (iOS 18.1+)

- Available on devices running iOS 18.1 and later
- **Notification Summaries:** On-device processing automatically groups and summarizes related push notifications from a single app
  - Users tap to expand and view original notifications
  - You have **no control** over summary text or grouping behavior
  - **No analytics impact:** Push-click tracking and reporting are unaffected
