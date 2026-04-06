---
name: ios-in-app-messaging-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/overview
indexed_at: '2026-04-05'
keywords:
  - messaging
  - in-app
  - slideup
  - modal
  - overlay
  - buttons
  - HTML
  - customization
  - engagement
  - WebView
triggers:
  - how to display in-app messages
  - customize message types
  - implement in-app messaging
  - support HTML content
  - add action buttons
---
# In-App Messaging Overview

In-app messages deliver content to users without interrupting them with push notifications. They appear within the app context, offering higher engagement potential with minimal friction.

## Message Types

Braze provides four default in-app message types:

| Type | Class | Behavior |
|------|-------|----------|
| `Slideup` | `ABKInAppMessageSlideup` | Slides up/down from top or bottom of screen; covers small portion of screen |
| `Modal` | `ABKInAppMessageImmersive` | Centered overlay with translucent panel; supports up to 2 action buttons |
| `Full` | `ABKInAppMessageImmersive` | Full-screen; top half image, bottom half text + up to 2 action buttons |
| `HTML Full` | `ABKInAppMessageHTML` | Fully custom HTML rendered in `WKWebView`; supports images, fonts, JavaScript |

## Class Hierarchy

All in-app message types subclass `ABKInAppMessage`:

```
ABKInAppMessage (base)
├── ABKInAppMessageSlideup
│   └── customizable: chevron, slide-up anchor
├── ABKInAppMessageImmersive
│   └── customizable: header, close button, frame, buttons
└── ABKInAppMessageHTML
    └── supports: manual button click logging
```

**Base class properties:** message, extras, duration, click action, URI, dismiss action, icon orientation, text alignment.

## Key Requirements

- **GIF support** is enabled by default after standard SDK integration.
- **`SDWebImage`** is required to display images in iOS in-app messages and Content Cards using Braze UI.
- **`WKWebView`** renders HTML Full messages — custom HTML in iFrames is not supported on iOS or Android.

## HTML In-App Messages

HTML Full messages support the `brazeBridge` JavaScript interface to call Braze Web SDK methods from within HTML content.

> **Note (iOS SDK ≥ 3.19.0):** The JavaScript methods `alert`, `confirm`, and `prompt` are no-ops inside HTML in-app messages.
