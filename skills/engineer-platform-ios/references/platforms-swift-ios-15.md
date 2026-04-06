---
name: platforms-swift-ios-15
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/ios_18'
indexed_at: '2026-04-05'
keywords:
  - activities
  - watchOS
  - visionOS
  - notifications
  - mirroring
  - intelligence
  - push
  - summary
  - compatibility
triggers:
  - enable live activities on watchOS
  - Apple Vision Pro support
  - iPhone notifications on macOS
  - notification summaries iOS 18
  - push notification limitations
---
## iOS 18 Updates — Braze Compatibility

### Live Activities on Apple Watch
- Live Activities now supported on **watchOS 11** with no additional setup required
- Optional: Apple allows customization of the watch interface

### Apple Vision Pro Availability
- Vision Pro expanded to: China, Japan, Singapore, Australia, Canada, France, Germany, UK
- Braze supports visionOS

### iPhone Notifications on macOS (iPhone Mirroring)
- iOS 18 enables iPhone notifications to appear on macOS via **iPhone Mirroring**
- **Limitations**: Push Story images and GIFs are not supported — these cannot render as macOS notifications

### Apple Intelligence (iOS 18.1+)
- Available on devices running **iOS 18.1 and later**

#### Notification Summaries
- On-device processing automatically groups and generates text summaries for related push notifications from a single app
- End-users can tap to expand and view original notifications
- **No marketer control** over summary content or grouping behavior
- **No analytics impact** — push-click tracking and reporting are unaffected
