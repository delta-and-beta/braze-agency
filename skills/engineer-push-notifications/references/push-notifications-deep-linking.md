---
name: push-notifications-deep-linking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/ios_deep_linking_guide
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - universal
  - scheme
  - notification
  - AASA
  - routing
  - delegate
  - email
  - SMS
  - WebView
triggers:
  - set up deep linking
  - configure universal links
  - handle push notifications
  - implement url routing
  - email deep linking
---
No specific skill applies to this content transformation task. Here's the processed topic file:

---

## iOS Push Deep Linking

### Link Type Comparison

| Link type | Example | Best for | If app not installed |
|---|---|---|---|
| Custom scheme | `myapp://products/123` | Push, in-app messages, Content Cards | Fails |
| Universal link | `https://myapp.com/products/123` | Email, SMS, channels with click tracking | Falls back to web |
| Open Web URL Inside App | Any `https://` URL | Displaying web content in modal WebView | N/A |

---

### Custom Scheme Deep Links

Simplest option. Use for push notifications, in-app messages, Content Cards — anywhere links aren't modified by a third party.

**Don't use for email** — ESPs wrap links for click tracking, breaking custom schemes.

**Requirements:**
- `Info.plist`: Register scheme under `CFBundleURLTypes`; add to `LSApplicationQueriesSchemes`
- Implement `application(_:open:options:)` in app delegate to parse URL and navigate
- No Braze SDK config needed — SDK opens custom scheme URLs by default

---

### Universal Links

Standard HTTPS URLs (`https://myapp.com/products/123`) that iOS routes to your app. Require server-side (AASA file) and app-side (Associated Domains) setup.

**Use when:** sending email (ESP wraps links), SMS, using Branch/AppsFlyer, or needing web fallback.

**Requirements:**
- AASA file hosted at `https://yourdomain.com/.well-known/apple-app-site-association`
- Add `applinks:yourdomain.com` in Xcode under **Signing & Capabilities**
- Implement `application(_:continue:restorationHandler:)` to handle `NSUserActivity`
- Set `configuration.forwardUniversalLinks = true` in Braze SDK config
- Optionally implement `BrazeDelegate.braze(_:shouldOpenURL:)` for custom routing (Branch, etc.)

> **Email note:** Your ESP (SendGrid, SparkPost, SES) wraps links in a click-tracking domain. You must host the AASA file on that click-tracking domain, not just your primary domain.

---

### Open Web URL Inside App

Opens a `https://` page in a modal WebView via `Braze.WebViewController`. No URL handling code needed — the SDK handles it automatically. Select **Open Web URL Inside App** in the campaign composer.

**Don't use** when you need to navigate to a specific app screen, or when the page requires auth or CSP headers block embedding.

---

### When You Need an AASA File

Required **only** for universal links. Specifically when:
- Sending deep links in email (ESP wraps links as HTTPS)
- Sending deep links in SMS (links may be shortened to HTTPS)
- Using Branch, AppsFlyer, or another linking provider
- Using universal links from push/in-app with `forwardUniversalLinks = true`

Not needed for custom scheme deep links (`myapp://`) or **Open Web URL Inside App**.

---

### Delegate Method Reference

| Method | Handles | When to implement |
|---|---|---|
| `application(_:open:options:)` | Custom scheme URLs (`myapp://`) | Using custom schemes from any channel |
| `application(_:continue:restorationHandler:)` | Universal links (`https://`) | Using universal links from email/SMS, or with `forwardUniversalLinks = true` |
| `BrazeDelegate.braze(_:shouldOpenURL:)` | All SDK-opened URLs | Custom routing logic (Branch, analytics, conditional handling) |

---

### Branch Integration (Additional Steps)

1. Integrate Branch SDK per Branch's documentation
2. Add Branch domain (e.g., `applinks:yourapp.app.link`) in Xcode **Signing & Capabilities**
3. Implement `BrazeDelegate.braze(_:shouldOpenURL:)` to route Branch links to Branch SDK
4. Set `configuration.forwardUniversalLinks = true` in Braze SDK config

`★ Insight ─────────────────────────────────────`
- The three link types map to different iOS routing mechanisms: URL scheme handler (`openURL`), universal link handler (`continueUserActivity`), and SDK-internal WebView — each bypassing the others entirely
- `BrazeDelegate.braze(_:shouldOpenURL:)` acts as a unified interception point for all SDK-opened URLs, making it the right hook for third-party routers like Branch that need to claim ownership of specific URL patterns before the OS or Braze handles them
- The AASA file's placement on the click-tracking domain (not just primary domain) is a frequent misconfiguration — ESP link wrapping means iOS sees the click-tracker's domain, not yours, so the AASA must live there
`─────────────────────────────────────────────────`
