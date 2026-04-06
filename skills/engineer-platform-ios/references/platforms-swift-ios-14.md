---
name: platforms-swift-ios-14
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/ios_18'
indexed_at: '2026-04-05'
keywords:
  - watchOS
  - visionOS
  - notifications
  - mirroring
  - intelligence
  - activities
  - push
  - summaries
  - compatibility
  - iphone
triggers:
  - Apple Watch notifications
  - Vision Pro support
  - iPhone mirroring setup
  - push notification summaries
  - iOS 18 compatibility
---
## iOS 18: Braze Compatibility Notes

### Live Activities on Apple Watch
- Live Activities are supported on watchOS 11 with no additional setup required
- Apple provides optional customization of the watch interface

### Apple Vision Pro
- Vision Pro availability expanded to: China, Japan, Singapore, Australia, Canada, France, Germany, and the UK
- Braze supports visionOS

### iPhone Notifications on macOS (iPhone Mirroring)
- iOS 18 introduces iPhone mirroring, allowing iPhone notifications to appear on macOS devices
- **Limitation:** Push Story images and GIFs are not supported — these media types cannot render as macOS notifications

### Apple Intelligence (iOS 18.1+)
- Available on devices running iOS 18.1 and later
- **Notification Summaries:** On-device processing automatically groups and generates text summaries for related push notifications from a single app
  - End-users can tap to expand a summary and view original notifications
  - Marketers have **no control** over summary text or grouping behavior
  - **No impact** on analytics or reporting (push-click tracking is unaffected)
