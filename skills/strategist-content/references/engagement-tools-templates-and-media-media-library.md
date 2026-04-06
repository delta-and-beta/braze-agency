---
name: engagement-tools-templates-and-media-media-library
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/media_library
indexed_at: '2026-04-05'
keywords:
  - assets
  - images
  - upload
  - templates
  - caching
  - channels
  - push
  - video
  - tags
  - cropping
triggers:
  - upload images to media library
  - organize assets with tags
  - prepare images for push notifications
  - generate images with BrazeAI
  - crop images for channels
---
# Media Library

Centralized asset management for Braze campaigns. Navigate to **Templates > Media Library**.

## Key Advantages Over CDN

- Assets in in-app messages are **pre-cached** for faster display and offline availability
- Integrated with Braze composers — select/tag images directly instead of copying URLs

## Capabilities

- Upload multiple images, folders (up to 50 images), `.vcf` files, or WhatsApp video files
- Generate images with BrazeAI and store directly to library
- Crop images to correct ratios for specific message types
- Organize with tags and teams; search by tags/teams in grid view
- Drag-and-drop upload support

## File Requirements

- **Max size:** 5 MB per file
- **Supported formats:** PNG, JPEG, GIF, SVG, WebP
- **GIF limitation:** Very elongated shapes (e.g., 3000×2 px) or 300+ frames may fail to upload even under 5 MB

## Image Specifications by Channel

Refer to channel-specific specs for Content Cards, Email, In-App Messages, and Push. Key push specs:

### Push Message Length Guidelines

| Message Type | Text Only | Rich (with image) |
|---|---|---|
| iOS lock screen | 160 chars | 130 chars |
| iOS Notification Center | 160 chars | 130 chars |
| iOS banner alert | 80 chars | 65 chars |
| Android lock screen | 49 chars | N/A |
| Android notification drawer | 597 chars | N/A |

### Web Push Icon Size

- **All major browsers:** 192×192 px or larger recommended

### Web Push Large Image Aspect Ratio

- Chrome/Edge/Opera on Windows and Chrome on Android: **2:1 aspect ratio**
- Firefox and Safari: N/A (not supported)

### Web Push Text Limits

| Browser | Platform | Max Title | Max Body |
|---|---|---|---|
| Chrome | Android | 35 | 50 |
| Chrome | Windows | 50 | 120 |
| Edge | Windows | 50 | 120 |
| Firefox | Windows | 54 | 200 |
| Safari | macOS | 38 | 84 |
| Firefox | macOS | 38 | 42 |

### Android Large Image Push

- Best results with images **at least 600×300 px**

## Video

Videos uploaded to the media library can **only be used in WhatsApp messages**.

## BrazeAI Image Generation

Generate images directly from the media library using BrazeAI. Review the AI data usage policy before use — generated images are processed via OpenAI.

---

`★ Insight ─────────────────────────────────────`
- The media library's pre-caching behavior is architecturally important for in-app messages specifically — it's not just storage, it's a performance optimization layer that changes how assets are delivered at runtime.
- The GIF upload failure edge case (elongated shapes, 300+ frames) is a non-obvious footgun that could cause silent failures — worth surfacing prominently in reference docs even though the original buries it in an `{% alert %}` tag.
`─────────────────────────────────────────────────`
