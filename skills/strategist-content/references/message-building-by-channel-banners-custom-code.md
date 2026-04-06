---
name: message-building-by-channel-banners-custom-code
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/banners/custom_code
indexed_at: '2026-04-05'
keywords:
  - banner
  - javascript
  - bridge
  - clicktracking
  - customcode
  - analytics
  - html
  - interactiveelements
triggers:
  - how to track banner clicks
  - add click listeners to banners
  - log custom HTML clicks
  - implement banner analytics
  - track interactive elements
---
## Banner Custom Code & JavaScript Bridge

Banners use the same JavaScript bridge as HTML in-app messages.

### Key Requirement

The Braze SDK **cannot** automatically attach click listeners to elements inside custom HTML in a Banner. You must explicitly call `brazeBridge.logClick()` on any clickable elements to track them in campaign analytics.

### Click Tracking

Call `brazeBridge.logClick()` from within your custom HTML to log clicks:

```html
<button onclick="brazeBridge.logClick()">
  Click me
</button>
```

Apply this to any interactive elements (links, buttons, etc.) you want tracked.

### Where This Applies

- Custom Code editor block in the Banner composer
- Any custom HTML in a Banner design
