---
name: push-notifications-ios-deep-linking-guide
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/ios_deep_linking_guide
indexed_at: '2026-04-05'
keywords:
  - deep-linking
  - custom-schemes
  - universal-links
  - AASA
  - push-notifications
  - iOS
  - URL-routing
  - delegates
  - Braze
triggers:
  - set up deep linking
  - configure universal links
  - handle custom schemes
  - enable push deep links
  - AASA file setup
---
## iOS Deep Linking: Strategy Guide

### Three Link Types at a Glance

| Link type | Example | Best for | Fallback if app missing |
|---|---|---|---|
| Custom scheme | `myapp://products/123` | Push, IAM, Content Cards | No — link fails |
| Universal link | `https://myapp.com/products/123` | Email, SMS, click-tracked channels | Yes — opens web |
| Open Web URL Inside App | Any `https://` URL | Displaying web content in modal | N/A — renders in WebView |

---

### Custom Scheme Deep Links

**Use when:** Push notifications, in-app messages, Content Cards — channels that don't wrap/modify URLs.

**Don't use when:** Email (ESPs wrap links for click tracking, breaking custom schemes).

**Requirements:**
- `Info.plist`: Register scheme under `CFBundleURLTypes`; add to `LSApplicationQueriesSchemes`
- Implement `application(_:open:options:)` to parse URL and navigate
- No Braze SDK config needed — SDK opens custom schemes by default

---

### Universal Links

**Use when:** Email, SMS, any channel wrapping links in HTTPS; third-party providers (Branch, AppsFlyer); when app-not-installed fallback to web is needed.

**Don't use when:** Only serving push/IAM/Content Cards — custom schemes are simpler.

**Requirements:**
- AASA file at `https://yourdomain.com/.well-known/apple-app-site-association`
- Associated Domains entitlement: `applinks:yourdomain.com` in Xcode
- Implement `application(_:continue:restorationHandler:)` to handle `NSUserActivity`
- Set `configuration.forwardUniversalLinks = true` in Braze SDK config
- Optional: `BrazeDelegate.braze(_:shouldOpenURL:)` for custom routing (Branch, etc.)

> **Email note:** Your ESP (SendGrid, SparkPost, Amazon SES) wraps links under a click-tracking domain. The AASA file must be hosted on that click-tracking domain, not just your primary domain.

---

### Open Web URL Inside App

**Use when:** Displaying a web page (promotion, article) without leaving the app.

**Don't use when:** Navigating to a specific in-app view; page uses auth or CSP headers blocking embedding.

**Requirements:** None. Select "Open Web URL Inside App" in the campaign composer. The Braze SDK handles it via `Braze.WebViewController` automatically.

---

### Do I Need an AASA File?

**Yes** if:
- Email campaigns (ESP wraps links as HTTPS)
- SMS campaigns (links may be shortened to HTTPS)
- Using Branch, AppsFlyer, or any HTTPS-domain linking provider
- Using universal links with `forwardUniversalLinks = true`

**No** if:
- Only using custom scheme links (`myapp://`) from push/IAM/Content Cards
- Only using "Open Web URL Inside App"

---

### Which Delegate Method to Implement

| Method | Handles | When to use |
|---|---|---|
| `application(_:open:options:)` | `myapp://` custom schemes | Any channel using custom schemes |
| `application(_:continue:restorationHandler:)` | `https://` universal links | Email, SMS, or `forwardUniversalLinks = true` |
| `BrazeDelegate.braze(_:shouldOpenURL:)` | All SDK-opened URLs | Custom routing, Branch integration, analytics |

---

### Branch Integration Checklist

1. Integrate Branch SDK per Branch's documentation
2. Add Branch domain to Associated Domains: `applinks:yourapp.app.link`
3. Implement `BrazeDelegate.braze(_:shouldOpenURL:)` to route Branch links to the Branch SDK
4. Set `configuration.forwardUniversalLinks = true` in Braze SDK config
