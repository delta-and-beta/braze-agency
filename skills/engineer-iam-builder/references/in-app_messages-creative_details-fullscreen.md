---
name: in-app_messages-creative_details-fullscreen
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/creative_details/fullscreen
indexed_at: '2026-04-05'
keywords:
  - fullscreen
  - in-app
  - messages
  - layout
  - image
  - viewport
  - dimensions
  - aspect-ratio
  - portrait
  - landscape
triggers:
  - create fullscreen in-app messages
  - set image dimensions for fullscreen
  - design fullscreen message layouts
  - image safe zone guidelines
  - fullscreen message best practices
---
# Fullscreen In-App Messages

Fullscreen messages occupy the entire device screen. Best used for high-priority moments like mandatory app updates.

## Layout Behavior

- Fills the entire device height; crops horizontally as needed
- **Image + text layout**: image fills the top 50% of the viewport
- **Image only layout**: fills full height; may crop left/right on taller devices
- Fills the status bar on notched devices
- On tablets/desktop browsers: renders as a centered modal

## Image Requirements

- **Accepted formats**: PNG, JPEG, GIF
- **Max file size**: 5 MB (recommended: 500 KB)

## Asset Dimensions

### Portrait

| Layout | Aspect Ratio | High-Res | Minimum | Notes |
|--------|-------------|----------|---------|-------|
| Image + text | 6:5 | 1200 × 1000 px | 600 × 500 px | Image always fills top 50% of viewport |
| Image only | 3:5 | 1200 × 2000 px | 600 × 1000 px | May crop left/right on taller devices |

### Landscape

| Layout | Aspect Ratio | High-Res | Minimum | Notes |
|--------|-------------|----------|---------|-------|
| Image + text | 10:3 | 2000 × 600 px | 1000 × 300 px | Image always fills top 50% of viewport |
| Image only | 5:3 | 2000 × 1200 px | 1000 × 600 px | May crop left/right on taller devices |

## Image Safe Zone

Enable **Show Image Safe Zone** in the Braze preview pane to visualize which parts of your image are safe from cropping across device sizes. Always supplement with a real device test send.

## Design Templates

Braze provides image templates and safe zone overlays: download via **Braze-In-App-Message-Design-Templates.zip** from the Braze platform.

`★ Insight ─────────────────────────────────────`
- Jekyll docs use `{% image_buster %}` and `{% tabs %}` liquid tags — these are stripped in topic files since the output is consumed by LLMs as plain text, not rendered HTML
- Aspect ratio specs are the most critical reference data here; the portrait 6:5 vs landscape 10:3 distinction is easy to mix up in practice and worth keeping in a scannable table
- The "top 50% of viewport" constraint for image+text layouts is a subtle but important design invariant — it determines safe zone placement for any text overlay work
`─────────────────────────────────────────────────`
