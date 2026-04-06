---
name: in-app-messages-gifs
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/gifs'
indexed_at: '2026-04-05'
keywords:
  - gifs
  - animation
  - images
  - android
  - swift
  - ios
  - loader
  - messages
  - braze
triggers:
  - how to add gif support to in-app messages
  - implement gif handling
  - enable animated images
  - custom image loader setup
  - gif rendering in mobile apps
---
## In-App Message GIFs

Braze supports embedding GIFs in in-app messages. Implementation is platform-specific and requires additional setup beyond the default SDK configuration.

### Platform Support

| Platform | Support |
|----------|---------|
| Android  | Supported via third-party image library integration |
| Swift (iOS) | Supported via third-party image library integration |

### Android

GIF support is not included by default. To enable it, integrate a GIF-capable image library (e.g., Glide or Fresco) and implement Braze's `IBrazeImageLoader` interface.

**Key steps:**
1. Add a GIF-capable image library to your dependencies
2. Implement `IBrazeImageLoader` to handle GIF loading
3. Set your custom image loader via `Braze.getInstance(context).imageLoader = yourLoader`

### Swift (iOS)

GIF support requires providing a custom image loader that handles animated images, as UIKit does not natively render GIFs in all contexts.

**Key steps:**
1. Implement `SDWebImageLoader` or a similar animated image library
2. Conform to `BrazeDelegate` or the image loading protocol
3. Return animated image data when Braze requests image content for in-app messages

### Notes

- GIF support is opt-in — the SDK does not bundle a GIF library to keep binary size lean
- The same image loader integration used for GIFs also applies to other in-app message image types
- Test GIF rendering across target device/OS versions, as animated image support can vary
