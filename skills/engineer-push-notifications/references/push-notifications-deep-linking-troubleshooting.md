---
name: push-notifications-deep-linking-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/deep_linking_troubleshooting
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - universal
  - scheme
  - AASA
  - entitlements
  - tracking
  - email
  - push
  - iOS
triggers:
  - universal link opens safari
  - deep link opens wrong view
  - email tracking deep link
  - push notification deep linking
  - troubleshoot deeplinks
---
# Deep Linking Troubleshooting (iOS)

## Custom Scheme Link Opens App But Wrong View

1. **Verify scheme registration** — check `CFBundleURLTypes` in `Info.plist`
2. **Set breakpoint** in `application(_:open:options:)` to confirm it fires and inspect `url`
3. **Test independently** (rules out Braze as the cause):
   ```bash
   xcrun simctl openurl booted "myapp://products/123"
   ```
4. **Check URL format** — match campaign URL exactly to what handler expects (casing, path components)

---

## Universal Link Opens Safari Instead of App

### Associated Domains
In Xcode: Target → **Signing & Capabilities** → confirm `applinks:yourdomain.com` is listed.

### AASA File Requirements
Host at `https://yourdomain.com/.well-known/apple-app-site-association` (or root path). Must satisfy:
- Served over HTTPS with valid cert
- `Content-Type: application/json`
- File size < 128 KB
- `appID` = `TEAMID.bundle.id` (e.g. `ABCDE12345.com.example.myapp`)
- `paths` or `components` covers expected URL patterns

**Validate:**
```bash
swcutil dl -d yourdomain.com
```
Or use Apple's search validation tool.

### AppDelegate Handler
```swift
func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
  guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
        let url = userActivity.webpageURL else { return false }
  // Handle the URL
  return true
}
```

### Braze SDK — Enable Universal Link Forwarding
Required when using universal links from Braze push, IAM, or Content Cards:
```swift
let configuration = Braze.Configuration(apiKey: "<BRAZE_API_KEY>", endpoint: "<BRAZE_ENDPOINT>")
configuration.forwardUniversalLinks = true
```
> **Simulator note:** Entitlements aren't available in simulator. Add `.entitlements` to **Copy Bundle Resources** build phase to test there.

### Long-Press Issue
Long-pressing a universal link and selecting "Open" can break the association for that domain (known iOS behavior). Fix: long-press again → **Open in [App Name]**.

---

## Deep Link from Email Doesn't Open App

Email click tracking wraps links in a tracking domain (e.g. `https://click.yourdomain.com/...`). The AASA must be on the **click-tracking domain**, not just the primary domain.

### Fix
1. Find your click-tracking domain in your ESP settings (SendGrid, SparkPost, Amazon SES)
2. Host AASA at `https://your-click-tracking-domain/.well-known/apple-app-site-association`
3. Include the same `appID` and valid path patterns

### Redirect Chain Caveat
Universal links only work if iOS recognizes the **initial** domain (click-tracking domain). If the redirect bypasses the AASA check, link opens in Safari.

**To diagnose:** Long-press the link in a test email to inspect the actual click-tracking URL, then verify that domain has a valid AASA.

---

## Deep Link Works in Push But Not IAM (or Vice Versa)

### BrazeDelegate Consistency
Check `BrazeDelegate.braze(_:shouldOpenURL:)` for conditional logic that filters links by channel. The `context` parameter exposes the source channel — ensure all channels are handled uniformly.

### Verbose Logging
Enable verbose logging and reproduce. Look for:
```
Opening '<URL>':
- channel: <SOURCE_CHANNEL>
- useWebView: <true/false>
- isUniversalLink: <true/false>
```
Compare working vs. non-working channel. Differences in `useWebView` or `isUniversalLink` reveal how the SDK interprets the link differently.

### Custom Display Delegates
If using a custom IAM display delegate or Content Card click handler, verify it passes link events to the Braze SDK correctly.

---

## "Open Web URL Inside App" Shows Blank/Broken Page

| Check | Detail |
|-------|--------|
| Use HTTPS | SDK WebView requires ATS-compliant URLs; HTTP fails silently |
| CSP headers | `X-Frame-Options: DENY` or restrictive `Content-Security-Policy` blocks WebView rendering |
| Custom scheme redirects | WebView can't follow redirects to `myapp://` schemes |
| Test in Safari | If it fails in Safari on device, it will fail in WebView too |

---

## Branch + Braze Integration

### Route Branch Links via BrazeDelegate
```swift
func braze(_ braze: Braze, shouldOpenURL context: Braze.URLContext) -> Bool {
  if let host = context.url.host, host.contains("app.link") {
    Branch.getInstance.handleDeepLink(context.url)
    return false  // ← must return false so Braze doesn't handle it
  }
  return true
}
```
> If `shouldOpenURL` returns `true` for Branch links, Braze handles them directly instead of routing to Branch.

### Branch Domain Formats
- `yourapp.app.link` (default)
- `yourapp-alternate.app.link` (alternate)
- Custom domain (if configured in Branch dashboard)

Ensure the domain check in `BrazeDelegate` matches your actual Branch domain.
