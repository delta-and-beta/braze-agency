---
name: ios-push-notifications
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/ios/rich_notifications
indexed_at: '2026-04-05'
keywords:
  - ios
  - push
  - notifications
  - rich
  - media
  - images
  - extension
  - character
  - limits
  - gif
triggers:
  - send rich push notifications to ios
  - ios push notification image requirements
  - setup ios rich notification media
  - ios notification character limits
---
## iOS Rich Push Notifications

Rich push notifications support images, GIFs, video, and audio on iOS 10+. Requires a **service extension** added by a developer per the iOS push integration guide.

### Supported File Types

| Method | Formats |
|--------|---------|
| Dashboard direct upload | JPEG, PNG, GIF |
| Templatable URL field | JPEG, PNG, GIF + AIF, M4A, MP3, MP4, WAV |

**Image limits:** Max 1038×1038 px, under 10 MB. Smaller files strongly preferred to avoid network stress and download timeouts.

> Not available in quick push campaigns.

---

### Character Count Guidelines

Recommended: **30–40 characters** per line for both title and message body.

**Notification states and text limits:**

| State | Title | Body | Image |
|-------|-------|------|-------|
| Lock screen / Notification Center | 1 line | 4 lines | Square thumbnail |
| Expanded (long-press) | 1 line | 7 lines | 2:1 aspect ratio recommended |
| Device active (unlocked) | 1 line | 2 lines | — |

**Variables that reduce visible character count:**

- **Timestamp length** — "now" vs "3h ago" vs "Yesterday, 8:37 AM" reduces title space (from ~35 to ~22 chars)
- **Image presence** — body text shortened ~10 chars per line when image is shown
- **iOS 15 interruption level** — Time Sensitive/Critical pushes title to new line, gaining ~4 extra chars (~35 → ~39)
- **Font size settings** — users may increase/decrease global UI font
- **Device width** — small phones vs wide iPads
- **Content type** — wide chars (m, w, emojis) and long words consume more space

---

### Setup Steps

**Step 1 — Create push campaign**
Use the standard push composer for iOS.

**Step 2 — Add media**
Add image/GIF/audio/video in the **Rich Notification Media** field.

- Optional: check **"Only send to devices with Rich Notification support"** to restrict to iOS 10+. If unchecked, users on older iOS see text-only.

**Step 3 — Schedule and send**
Continue scheduling normally. Recipients hard-press the notification to expand and view the full image.

---

### Key Constraints

- Developer must add a **notification service extension** to the app
- Rich notifications **not** available in quick push campaigns
- iOS scales images automatically to fit active/locked views
- 2:1 aspect ratio recommended for expanded view (other ratios supported; image spans full width)

`★ Insight ─────────────────────────────────────`
- The table structure for notification states maps directly to Braze's character count guidance — preserving it as a table (not prose) keeps it scannable as a reference
- Stripping Liquid template tags (`{{site.baseurl}}`, `{% image_buster %}`) removes Braze-internal boilerplate that would be meaningless outside the docs site
- Collapsing the tabbed "Variables in text truncation" section into a flat bullet list reduces nesting without losing any of the factual content
`─────────────────────────────────────────────────`
