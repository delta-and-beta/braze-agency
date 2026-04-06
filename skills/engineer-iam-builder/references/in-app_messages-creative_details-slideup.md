---
name: in-app_messages-creative_details-slideup
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/creative_details/slideup
indexed_at: '2026-04-05'
keywords:
  - slideup
  - messaging
  - mobile
  - tablet
  - desktop
  - images
  - positioning
  - responsive
  - preview
  - sizing
triggers:
  - create slideup messages
  - slideup image specifications
  - slideup platform behavior
  - slideup content limits
  - preview slideups across devices
---
## Slideup In-App Messages

Slideups appear at the top or bottom of the app screen (configured at creation time). They are non-obtrusive and allow users to continue interacting with the app while displayed.

### Content Limits

- Up to **3 lines of copy** before truncation with ellipses
- Images scale to fit a **50 x 50 px container** — never cropped or clipped

### Image Specs

| Layout | Asset Size | Notes |
|---|---|---|
| Image + Text | 1:1 aspect ratio, 150 x 150 px (high-res), min 50 x 50 px | Various aspect ratios fit into the square container without cropping |

- Max file size: **5 MB** (recommended: 500 KB)
- Accepted formats: **PNG, JPEG, GIF**

### Behavior by Platform

| Platform | Position | Dismiss | Click Action |
|---|---|---|---|
| Mobile | Top or bottom (configurable) | Swipe to dismiss | Tap to open; chevron ">" shown |
| Tablet | Bottom of screen | Swipe to dismiss | Tap to open; chevron ">" shown; no X button |
| Desktop browser | Corner of screen (default: bottom-right) | Click "X" button | N/A |

### Key Notes

- Always preview on multiple device sizes — composer preview may differ from actual device rendering
- On desktop, slideups do **not** span full screen width
- On tablet, slideups do **not** span full screen width

`★ Insight ─────────────────────────────────────`
The table format for platform behavior is more useful than prose here — it makes the differences between mobile/tablet/desktop scannable at a glance. The original used tab-based toggles (a Jekyll UI pattern) which don't translate to plain markdown; flattening into a table preserves the same information density without the interactive dependency.
`─────────────────────────────────────────────────`
