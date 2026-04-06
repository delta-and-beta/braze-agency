---
name: platforms-web-smart-tvs
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/web/smart_tvs
indexed_at: '2026-04-05'
keywords:
  - smarttv
  - samsung
  - lg
  - analytics
  - messages
  - contentcards
  - initialization
  - rendering
triggers:
  - smart TV integration
  - custom rendering for in-app messages
  - Samsung Tizen setup
  - disable push on TV
  - TV analytics
---
## Smart TV Support (Samsung Tizen / LG webOS)

The Braze Web SDK supports analytics, in-app messages, and Content Cards on Samsung Tizen TVs and LG TVs (webOS).

### SDK Setup

Two required changes when integrating with Smart TVs:

**1. Use the "core" bundle — not the standard bundle**

```
https://js.appboycdn.com/web-sdk/x.y/braze.core.min.js
```

- CDN version preferred (transpiled to ES5)
- If using NPM (`@braze/web-sdk`), use a bundler like webpack to remove unused code and ensure ES5 output

**2. Set required initialization options**

```js
braze.initialize("YOUR-API-KEY", {
  disablePushTokenMaintenance: true,
  manageServiceWorkerExternally: true,
});
```

Both flags must be `true`.

### Analytics

All standard Web SDK analytics methods work on Smart TVs — custom events, custom attributes, session tracking, etc. No TV-specific changes needed.

### In-App Messages and Content Cards

- Both are supported on Smart TVs via the Core SDK
- **Standard UI rendering is not supported** — you must implement custom rendering logic suited to the TV app UX
- The app receives message/card payloads and is responsible for displaying them within the TV interface

### Key Constraints

| Feature | Smart TV Support |
|---|---|
| Analytics | Full support |
| In-app messages | Supported, custom render required |
| Content Cards | Supported, custom render required |
| Standard UI display | Not supported |
| Push notifications | Disabled via `disablePushTokenMaintenance: true` |
