---
name: engagement-tools-templates-and-media-image-specs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/image_specs
indexed_at: '2026-04-05'
keywords:
  - images
  - specifications
  - in-app
  - push
  - email
  - optimization
  - payload
  - templates
  - sizing
  - responsive
triggers:
  - how to optimize image sizes
  - image specs for campaigns
  - design in-app message images
  - configure push notification images
  - email image requirements
---
`★ Insight ─────────────────────────────────────`
The source doc uses Jekyll `{% multi_lang_include %}` partials — the actual spec data lives in `image_specs.md`, not here. The skeleton we have defines the *structure* (channels: in-app, push, email, image behavior) but the numeric specs are behind includes. The topic file should capture what IS present and scaffold the rest clearly.
`─────────────────────────────────────────────────`

## Image Specifications

Use the smallest high-quality image possible — smaller assets load faster across all channels.

**Always preview messages on multiple device sizes** before sending to confirm critical image areas display correctly.

---

### General Guidance

- Prioritize file size reduction without sacrificing quality
- Test on a variety of devices before launch
- Braze provides in-app message design templates and safe-zone overlays for multi-device compatibility

---

### In-App Messages

- **Payload size**: Subject to Braze payload limits (see Push Notifications for comparison)
- **Font Awesome**: Braze supports [Font Awesome v4.3.0](https://fontawesome.com/v4.7.0/cheatsheet/) icons for **modal** in-app message types

#### In-App Message Image Types

| Format | Notes |
|--------|-------|
| Slideup | Single image, bottom/top of screen |
| Modal | Supports icon (Font Awesome) or image |
| Full-screen | Full bleed image recommended |

---

### Push Notifications

- Rich push (iOS/Android) supports thumbnail images
- Recommended: use platform-native aspect ratios
- Large image support varies by OS version and device

---

### Email

- Inline and hosted images both supported
- Optimize for rendering across email clients (Outlook, Gmail, Apple Mail)
- Avoid excessively wide images — most email clients cap rendering width

---

### Image Behavior

- Images are lazy-loaded by default
- Oversized images may be cropped or scaled by the device or OS
- Safe zones ensure content visibility regardless of device aspect ratio

---

### Key Recommendations

1. Use the **smallest file size** that meets visual quality requirements
2. Download Braze's [Design Templates](https://www.braze.com) for safe-zone overlays
3. Test across iOS, Android, and web before deploying campaigns
4. For modal in-app messages, Font Awesome icons (v4.3.0) are a lightweight alternative to image assets
