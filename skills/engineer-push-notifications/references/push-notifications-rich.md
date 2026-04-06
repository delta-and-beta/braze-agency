---
name: push-notifications-rich
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/ios/rich_notifications
indexed_at: '2026-04-05'
keywords:
  - notifications
  - push
  - iOS
  - rich
  - media
  - images
  - extension
  - campaign
  - character-limits
triggers:
  - Send rich push notifications with media
  - Add images and GIFs to push notifications
  - iOS push notification character limits
  - Set up rich notifications for iOS
  - Configure service extension for notifications
---
## Rich Push Notifications (iOS)

Rich notifications support GIFs, images, videos, and audio on iOS 10+. Requires a **service extension** added to the app by a developer.

### Prerequisites

- Developer must add a notification service extension (see iOS push integration docs)
- Supported file types for dashboard upload: **JPEG, PNG, GIF**
- Templatable URL field also accepts: AIF, M4A, MP3, MP4, WAV
- Not available for quick push campaigns
- iOS scales images to fit active/locked views
- Max image size: 1038x1038, under 10 MB (use smallest file size practical)

### Character Count Guidelines

Recommended: **30–40 characters** per line for both title and body.

**Notification states and display limits:**

| State | Title | Body | Image |
|---|---|---|---|
| Lock screen / Notification Center | 1 line | 4 lines | Square thumbnail |
| Expanded (long-press) | 1 line | 7 lines | 2:1 aspect ratio (recommended) |
| Device active | 1 line | 2 lines | — |

**Factors that reduce visible character count:**

- **Timestamps** — longer timestamps (e.g., "Yesterday, 8:37 AM") shorten title by ~13 chars vs. "now"
- **Images** — reduce body by ~10 characters per line
- **Interruption level** — iOS 15 Time Sensitive/Critical push title to a new line, gaining ~4 chars
- **Font size settings**, **device width**, **wide characters** (m, w, emojis) also affect truncation

### Setup Steps

**Step 1: Create a push campaign**
Use the standard push campaign composer for iOS.

**Step 2: Add media**
Add image/GIF/audio/video in the **Rich Notification Media** field.

- Optionally check **"Only send to devices with Rich Notification support"** to restrict to iOS 10+. If unchecked, pre-iOS 10 users receive text-only.

**Step 3: Schedule and launch**
Continue with normal campaign scheduling. Recipients can hard-press the notification to expand and view the full media.

`★ Insight ─────────────────────────────────────`
- The 2:1 aspect ratio recommendation for expanded notifications maps to how iOS fills the notification width and adjusts height — any ratio works, but 2:1 avoids unexpected cropping.
- The ~10 char-per-line reduction when images are present is a non-obvious layout quirk: the thumbnail occupies horizontal space even in collapsed view, compressing the text column.
- The service extension requirement is architecturally significant — rich media is downloaded and attached by the extension *before* the notification is displayed, which is why it requires native app code, not just a dashboard setting.
`─────────────────────────────────────────────────`
