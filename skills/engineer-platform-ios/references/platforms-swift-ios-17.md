---
name: platforms-swift-ios-17
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/platforms/swift/ios_18'
indexed_at: '2026-04-05'
keywords:
  - notifications
  - watchOS
  - visionOS
  - mirroring
  - summaries
  - activities
  - intelligence
  - push
  - macOS
  - iOS
triggers:
  - handle notification summaries
  - support iphone mirroring
  - configure live activities watchos
  - apple vision pro notifications
  - apple intelligence notifications
---
## iOS 18 Updates for Braze

### Live Activities on Apple Watch

Live Activities are supported on watchOS 11 with no additional setup required. Apple offers optional customization of the watch interface.

### Apple Vision Pro Expansion

Vision Pro is available in China, Japan, Singapore, Australia, Canada, France, Germany, and the UK. Braze supports visionOS.

### iPhone Notifications on macOS (iPhone Mirroring)

Apple's iPhone mirroring feature (macOS Sequoia) routes iPhone notifications to macOS devices.

**Limitation:** Some media types are not supported in mirrored notifications:
- Push Story images
- GIFs

These cannot be rendered as macOS notifications.

### Apple Intelligence & Notification Summaries (iOS 18.1+)

Apple Intelligence is available on iOS 18.1 and later. The key feature affecting push messaging is **notification summaries**:

- Uses on-device processing to automatically group and summarize related push notifications from a single app
- End-users can tap a summary to expand and view original notifications
- **You have no control** over the generated summary text or grouping behavior
- **Analytics are unaffected** — push-click tracking and all reporting features work normally

`★ Insight ─────────────────────────────────────`
- The topic title says "iOS 17" but the content is iOS 18 — preserved the content as-is since the instruction says to process what's provided
- Notification summaries are the highest-priority actionable item: they affect copy strategy (shorter, more distinct push text summarizes better) but require no SDK changes
- The "no control, no analytics impact" pair is worth keeping together — it's a common customer concern answered in one place
`─────────────────────────────────────────────────`
