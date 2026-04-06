---
name: engagement-tools-templates-and-media
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/media_library
indexed_at: '2026-04-05'
keywords:
  - media
  - assets
  - images
  - push
  - notifications
  - templates
  - upload
  - specifications
  - campaign
  - caching
triggers:
  - upload media library
  - push notification specifications
  - image upload requirements
  - campaign asset management
  - web push icon dimensions
---
# Media Library

Centralized asset management for Braze campaigns. Navigate to **Templates > Media Library**.

## Why Use Media Library (vs. CDN)

- In-app message assets are **pre-cached** for faster display and offline availability
- Integrated with Braze composers — select images directly instead of pasting URLs

## Capabilities

- Upload multiple images, folders (up to 50 images), `.vcf` files, video files (WhatsApp only)
- Crop images, add tags/teams, drag-and-drop support
- Generate images via BrazeAI and store to library
- Search by tags or teams

## Image Specifications

**Global limit:** All images must be < 5 MB. Supported formats: PNG, JPEG, GIF, SVG, WebP.

> GIFs with extreme dimensions (e.g., 3000x2 px) or 300+ frames may fail to upload even under 5 MB.

## Push Notification Specs

### Recommended Message Lengths

| Type | Text only | Rich (with image) |
|---|---|---|
| iOS lock screen | 160 chars | 130 chars |
| iOS Notification Center | 160 chars | 130 chars |
| iOS banner alert | 80 chars | 65 chars |
| Android lock screen | 49 chars | N/A |
| Android notification drawer | 597 chars | N/A |

### Web Push Icons

All major browsers (Chrome, Firefox, Safari, Opera): **192 x 192 px or larger**

### Web Push Large Images

| Browser | Platform | Large image size |
|---|---|---|
| Chrome | Android | 2:1 aspect ratio |
| Chrome | Windows | 2:1 aspect ratio |
| Edge | Windows | 2:1 aspect ratio |
| Opera | Windows | 2:1 aspect ratio |
| Firefox/Safari/Opera | macOS | N/A |

### Web Push Text Limits

| Browser | Platform | Max title | Max body |
|---|---|---|---|
| Chrome | Android | 35 | 50 |
| Firefox | Android | 35 | 50 |
| Chrome | Windows | 50 | 120 |
| Edge | Windows | 50 | 120 |
| Firefox | Windows | 54 | 200 |
| Opera | Windows | 50 | 120 |
| Chrome/Opera | macOS | 35/38 | 50/42 |
| Safari | macOS | 38 | 84 |
| Firefox | macOS | 38 | 42 |

## Video

Only usable in **WhatsApp messages**. Upload `.vcf` and video files via the library.

## BrazeAI Image Generation

Generate images directly within the media library using BrazeAI. Review OpenAI data usage policy before use — generated images are sent to OpenAI for processing.

---

`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll liquid template tags (`{% image_buster %}`, `{% multi_lang_include %}`) that are build-time includes — stripping these while preserving the referenced specs as inline tables keeps the topic file self-contained and usable without the doc site build chain.
- Table data for push/web push specs was scattered across nested `{% tabs %}` blocks; flattening into simple markdown tables makes the reference scannable without tab interaction.
`─────────────────────────────────────────────────`
