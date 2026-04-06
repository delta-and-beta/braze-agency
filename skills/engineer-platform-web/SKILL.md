---
name: engineer-platform-web
description: >-
  Web SDK implementation covering browsers, smart TVs, extensions, and security
  policies.
metadata:
  role: braze-engineer
  topics:
    - platforms-web
    - platforms-web-smart-tvs
    - platforms-web-content-security-policy
    - platforms-web-browser-extensions
    - platforms-web-accessibility
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Reference skills (like this one) differ from technique or pattern skills — they're knowledge indexes for a domain. The key is structuring content so Claude can quickly determine *which* subtopic to pull from and *why* this skill's lens matters (here: frontend engineering perspective, not backend/marketing).
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Web Platform

## Overview

This skill covers Braze Web SDK integration across non-standard browser environments: Smart TVs (Samsung Tizen, LG webOS), browser extensions (Chrome, Firefox), constrained security contexts (Content Security Policy), and accessible UI implementation. The lens throughout is **frontend engineering** — SDK wiring, browser compatibility, environment-specific constraints, and security policy negotiation.

Use this skill when implementing or debugging Braze on the web platform beyond standard browser contexts, or when navigating CSP, accessibility, or extension architecture requirements.

## When to Use

- Integrating Braze Web SDK on **Smart TVs** (Tizen, webOS)
- Setting up Braze inside a **browser extension** (Chrome Manifest v3, Firefox Add-On)
- Configuring **Content Security Policy** headers or nonces to allow Braze SDK scripts and styles
- Verifying **WCAG / accessibility** compliance for in-app messages and Content Cards
- Diagnosing why SDK features behave differently across browser environments

**Not for:** Mobile SDK (iOS/Android), server-side integrations, or Braze backend/REST API work.

## Topics Synthesized

### Smart TV Support (Samsung Tizen / LG webOS)

Smart TVs expose a browser-like environment but lack standard network APIs. Two mandatory SDK changes from a standard web setup:

1. **Disable service workers** — TV platforms do not support them
2. **Override `device_id`** — TV apps lack persistent cookie storage; generate and persist a stable identifier via platform storage APIs (e.g., `tizen.systeminfo` or webOS `service`)

Supported features: analytics, in-app messages, Content Cards. Push notifications are not supported on TV platforms.

Key pattern:
```js
braze.initialize('API-KEY', {
  baseUrl: 'SDK-ENDPOINT',
  allowUserSuppliedJavascript: true,
  serviceWorkerLocation: null,   // disable SW
  deviceId: getPersistentTvId(), // stable ID from platform storage
});
```

### Content Security Policy (CSP)

Braze injects scripts and styles at runtime. A strict CSP will block them without explicit configuration.

**Nonce approach** (preferred — avoids `unsafe-inline`):
```js
braze.initialize('API-KEY', {
  contentSecurityNonce: 'YOUR-NONCE',
});
```
Pass the same nonce your server attaches to the `<script>` and `<style>` tags. Braze propagates it to any dynamic elements it creates.

**Hash/allowlist fallback:** If nonces aren't viable, allowlist Braze CDN domains in `script-src` and `style-src`. See Braze docs for current CDN hostnames — these change with SDK versions.

CSP violations surface as console errors blocking SDK initialization. Check the browser's CSP report-uri output and match blocked directives against Braze's required domains and inline patterns.

### Browser Extensions

Braze Web SDK works inside Chrome Extensions and Firefox Add-Ons for analytics and messaging.

**Supported features:** Custom events, user attributes, Content Cards, in-app messages.  
**Not supported:** Push notifications (extension service workers have separate push registration flows).

Manifest v3 constraint: background service workers in extensions cannot use `localStorage`. Use `chrome.storage.local` (or `browser.storage.local` in Firefox) as the persistence layer and pass a stable `deviceId` generated from it.

```js
// In extension background or content script:
chrome.storage.local.get(['brazeDeviceId'], (result) => {
  const deviceId = result.brazeDeviceId ?? crypto.randomUUID();
  chrome.storage.local.set({ brazeDeviceId: deviceId });
  braze.initialize('API-KEY', { baseUrl: 'SDK-ENDPOINT', deviceId });
});
```

CSP in extensions is set via `manifest.json` — the same nonce/allowlist patterns apply, but the CSP header source is the manifest rather than server response headers.

### Web Accessibility

Braze targets **WCAG 2.1** compliance and maintains a 100/100 Lighthouse accessibility score for Content Cards and in-app messages, from SDK version 3.x onwards.

Engineering checkpoints:
- **Focus management:** Verify in-app messages trap focus correctly and return focus on dismiss
- **ARIA roles:** SDK-generated markup includes appropriate roles; custom templates must preserve them
- **Color contrast:** Validate custom themes against WCAG AA (4.5:1 for normal text)
- **Keyboard nav:** Content Cards and IAM must be fully operable without a pointer device

When using custom HTML in-app messages, run Lighthouse or axe-core against the rendered output — Braze's defaults pass, but custom templates can regress accessibility.

## Frontend Engineering Lens

This skill approaches Braze Web SDK as a **browser environment problem**, not a marketing configuration problem. The recurring themes are:

| Challenge | Engineering framing |
|-----------|-------------------|
| Smart TV storage | Replace cookies/localStorage with platform-native persistence |
| CSP enforcement | Treat SDK as a third-party script; configure nonces server-side |
| Extension isolation | MV3 service worker constraints require storage API substitution |
| Accessibility | SDK defaults are compliant; custom templates must be audited |

When a Braze feature "doesn't work" on a non-standard platform, the first diagnostic question is: **what browser primitive is missing?** (service workers, persistent storage, network fetch, DOM APIs). The answer maps directly to which SDK initialization option or workaround applies.
