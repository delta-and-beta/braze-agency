---
name: content-cards-embedding-gifs
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/embedding_gifs
indexed_at: '2026-04-05'
keywords:
  - gifs
  - content-cards
  - animation
  - android
  - swift
  - web
  - glide
  - fresco
  - platforms
  - sdk
triggers:
  - embed gifs in content cards
  - content card gif support
  - how to add animated gifs
  - gif rendering by platform
  - third-party gif libraries
---
`★ Insight ─────────────────────────────────────`
- Braze docs use Liquid-style template tags (`{% sdktabs %}`, `{% multi_lang_include %}`) that are build-time includes — the actual SDK-specific content lives in separate partial files, so this topic file only captures what's directly visible
- Topic files should be self-contained knowledge units; where content is intentionally missing (the `multi_lang_include` partials), it's better to annotate the gap than silently omit it
`─────────────────────────────────────────────────`

## Content Card GIFs

Embed animated GIFs in Braze Content Cards using the SDK.

### Platform Support

| Platform | GIF Support | Approach |
|----------|-------------|----------|
| Web | Native | Included by default — no extra configuration needed |
| Android | Not native | Implement via third-party library |
| Swift (iOS) | Not native | Implement via third-party library |
| Wrapper SDKs (React Native, Flutter, etc.) | Varies | Use the underlying native Android or Swift method |

### Web SDK

No additional setup required. Animated GIF support is bundled in the standard Web SDK integration.

### Android SDK

Animated GIFs are not natively supported. Use a third-party image loading library (e.g., Glide or Fresco) to render GIFs within Content Card views.

### Swift SDK

Animated GIFs are not natively supported. Implement GIF rendering through a third-party library within your custom Content Card UI.

### Notes

- Wrapper SDKs (e.g., React Native, Cordova) should defer to the native Android or Swift implementation for GIF support.
- For both Android and Swift, third-party tools must be integrated separately — the Braze SDK itself does not animate GIFs.
