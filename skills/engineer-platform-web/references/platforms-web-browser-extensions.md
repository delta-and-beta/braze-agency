---
name: platforms-web-browser-extensions
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/web/browser_extensions
indexed_at: '2026-04-05'
keywords:
  - extensions
  - popup
  - manifest
  - background
  - analytics
  - messaging
  - push
  - sdk
  - initialization
  - permissions
triggers:
  - how to initialize Braze in browser extensions
  - set up push notifications in extension popup
  - enable analytics in Chrome extensions
  - configure manifest for Braze SDK
  - integrate Braze in background scripts
---
# Browser Extensions

Integrate the Braze Web SDK inside Google Chrome Extensions and Firefox Add-Ons to collect analytics and display messaging to users.

## Supported Features

| Feature | Notes |
|---------|-------|
| Analytics | Custom events, attributes, user identification for cross-channel messaging |
| In-app messages | Native or custom HTML messaging triggered by user actions |
| Content Cards | Native card feeds for onboarding or promotional content |
| Web Push | Notifications even when the web page isn't open |

**Not supported:** Service workers (on roadmap).

## Extension Areas

| Area | What's Supported |
|------|-----------------|
| **Popup Page** | Analytics, in-app messages, Content Cards |
| **Background Scripts** (Manifest v2 only) | Analytics, in-app messages, Content Cards. Not visible to users — communicate via browser tabs or popup for messaging |
| **Options Pages** | Analytics, in-app messages, Content Cards |

## Permissions & CSP

No additional permissions needed in `manifest.json` when bundling `braze.min.js` locally.

Adjust `content_security_policy` in `manifest.json` to allow remote sources if you:
- Use Google Tag Manager
- Reference the Braze SDK from an external URL
- Have a strict Content Security Policy

## Getting Started

Download the SDK via NPM or directly from the Braze CDN, then copy `braze.min.js` into your extension's directory.

### Popup Page

Reference the local JS file in `popup.html`:

```html
<html>
    <title>popup.html</title>
    <script src="/relative/path/to/braze.min.js"></script>
    <script>
    // Initialize Braze here
    </script>
</html>
```

### Background Script (Manifest v2 only)

Add the Braze library to `background.scripts` in `manifest.json`:

```json
{
    "manifest_version": 2,
    "background": {
        "scripts": [
            "relative/path/to/braze.min.js",
            "background.js"
        ]
    }
}
```

### Options Page

Include Braze the same way as the popup page (reference the local JS file in your options HTML).

## Initialization

Cookies are not supported in browser extensions — disable them with `noCookies: true`:

```javascript
braze.initialize("YOUR-API-KEY-HERE", {
    baseUrl: "YOUR-API-ENDPOINT",
    enableLogging: true,
    noCookies: true
});
```

## Push Notifications

Extension popup dialogs don't support push prompts (no URL bar). To register and request push permission inside a popup, use the **Alternate Push Domain** workaround — a separate domain that handles the push permission flow on behalf of the extension.
