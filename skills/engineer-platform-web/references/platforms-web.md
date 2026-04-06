---
name: platforms-web
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/web/smart_tvs
indexed_at: '2026-04-05'
keywords:
  - smarttv
  - analytics
  - initialization
  - messaging
  - rendering
  - tizen
  - webos
  - sdk
  - bundler
  - customization
triggers:
  - set up smart tv support
  - configure sdk for tizen or webos
  - implement custom message rendering
  - enable smart tv analytics
---
## Smart TV Support (Samsung Tizen / LG webOS)

The Braze Web SDK supports analytics, in-app messages, and Content Cards on Smart TVs.

### SDK Integration Requirements

Two mandatory changes from standard Web SDK setup:

**1. Use the Core Bundle**
```
https://js.appboycdn.com/web-sdk/x.y/braze.core.min.js
```
- Prefer CDN over NPM — CDN version is transpiled to ES5; NPM version uses native ES modules
- If using NPM, require a bundler (e.g., webpack) that tree-shakes and transpiles to ES5

**2. Set Required Initialization Options**
```js
braze.initialize('YOUR-API-KEY', {
  disablePushTokenMaintenance: true,
  manageServiceWorkerExternally: true,
  // ...other options
});
```
Both flags must be `true` for Smart TV environments.

### Analytics

All standard Web SDK analytics methods work without modification on Smart TVs — custom events, custom attributes, session tracking, etc.

### In-App Messages & Content Cards

- Standard UI rendering is **not supported** on Smart TVs
- Must use the Core SDK (`@braze/web-sdk`) and implement **custom rendering** suited to the TV app's UI/UX
- The app receives message/card data and is responsible for display logic

### Reference Links

- JS SDK API docs: `https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html`
- Sample TV apps: `https://github.com/Appboy/smart-tv-sample-apps`
- Supported devices: Samsung Tizen TVs, LG TVs (webOS)
