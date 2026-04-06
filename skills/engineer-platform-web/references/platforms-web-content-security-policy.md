---
name: platforms-web-content-security-policy
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/web/content_security_policy
indexed_at: '2026-04-05'
keywords:
  - csp
  - nonce
  - connect-src
  - script-src
  - img-src
  - unsafe-inline
  - Font Awesome
  - contentSecurityNonce
  - initialization
triggers:
  - set up content security policy
  - configure CSP with nonce
  - CSP script-src requirements
  - Font Awesome CSP directives
  - Braze CSP configuration
---
## Content Security Policy (CSP) — Braze Web SDK

### Nonce Support

Pass your nonce value to the `contentSecurityNonce` initialization option to propagate it to scripts and styles the SDK generates:

```javascript
import * as braze from "@braze/web-sdk";

braze.initialize(apiKey, {
  baseUrl: baseUrl,
  contentSecurityNonce: "YOUR-NONCE-HERE", // matches "nonce-YOUR-NONCE-HERE" in CSP
});
```

---

### Required CSP Directives

#### `connect-src`

| URL | Purpose |
|-----|---------|
| `connect-src https://sdk.iad-01.braze.com` | SDK ↔ Braze API communication. **Must match your `baseUrl`'s SDK endpoint.** |

#### `script-src`

| Directive | When Required |
|-----------|--------------|
| `script-src https://js.appboycdn.com` | CDN-hosted integration only |
| `script-src 'unsafe-eval'` | Using the integration snippet (contains `appboyQueue`). Avoid by using NPM instead. |
| `script-src 'nonce-...'` or `'unsafe-inline'` | Certain in-app messages (e.g., custom HTML) |

#### `img-src`

| Directive | When Required |
|-----------|--------------|
| `img-src appboy-images.com braze-images.com cdn.braze.eu` | Braze CDN-hosted images. Hostnames vary by dashboard cluster. Also add `font-src` if using custom fonts. |

---

### Font Awesome

Braze auto-includes Font Awesome by default. To disable:

```javascript
braze.initialize(apiKey, {
  baseUrl: baseUrl,
  doNotLoadFontAwesome: true,
});
```

If keeping Font Awesome, add these directives:

```
font-src https://use.fontawesome.com
style-src https://use.fontawesome.com
style-src 'nonce-...'  (or 'unsafe-inline')
```

`★ Insight ─────────────────────────────────────`
- The `contentSecurityNonce` option is a bridge pattern: it lets the SDK "sign" its dynamically-injected scripts/styles so they pass CSP nonce validation without requiring `unsafe-inline`.
- The `unsafe-eval` requirement for the snippet integration is a common trade-off — it exists because the legacy snippet uses `eval`-style queue flushing, which is why the NPM path is preferred in strict CSP environments.
- `connect-src` must match `baseUrl` exactly because Braze shards its API endpoints by datacenter cluster (e.g., `iad-01`, `eu-01`); a mismatch silently drops all SDK network calls.
`─────────────────────────────────────────────────`
