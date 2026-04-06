---
name: ios-advanced-linking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/linking
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - scheme
  - universal
  - AppDelegate
  - linking
  - handler
  - URL
  - domain
  - plist
triggers:
  - register custom URL scheme
  - implement deep link handler
  - set up universal links
  - configure app-site association
  - handle openURL in AppDelegate
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline serve as atomic knowledge units — they're the leaves of the content hierarchy. Stripping Jekyll template syntax (`{% %}`, `{{site.baseurl}}`), image refs, and deprecation notices is the core preprocessing step that makes raw docs suitable for embedding and semantic search.
`─────────────────────────────────────────────────`

Here is the preprocessed topic file:

---

# iOS Deep Linking

## Custom URL Scheme Registration

Add to `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>{YOUR.SCHEME}</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>{YOUR.SCHEME}</string>
        </array>
    </dict>
</array>
```

Via Xcode: Add key `URL types` → `Item 0` → set `URL identifier` and `URL Schemes` → `Item 0` to your scheme.

## Custom Scheme Allowlist (iOS 9+)

Apps must declare schemes they're allowed to open in `Info.plist` under `LSApplicationQueriesSchemes`. Without this, deep links to other apps silently fail:

```
<Warning>: -canOpenURL: failed for URL: "yourapp://deeplink" – error: "This app is not allowed to query for scheme yourapp"
```

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>myapp</string>
    <string>facebook</string>
    <string>twitter</string>
</array>
```

Your own app's custom scheme must also be listed here, even for internal deep links.

## URL Handler Implementation

Implement `application:openURL:options:` in `AppDelegate`:

**Swift:**
```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  let path = url.path
  let query = url.query
  // Take action based on path and query
  return true
}
```

**Objective-C:**
```objc
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  NSString *path  = [url path];
  NSString *query = [url query];
  return YES;
}
```

## Universal Links

Requires a registered domain in app capabilities and an uploaded `apple-app-site-association` file. Implement in `AppDelegate`:

**Swift:**
```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
  if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
    let url = userActivity.webpageURL
    // Handle url
  }
  return true
}
```

**Objective-C:**
```objc
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
    NSURL *url = userActivity.webpageURL;
    // Handle url
  }
  return YES;
}
```

> **Note:** Default universal link integration is not compatible with Braze push notifications or in-app messages. Use scheme-based deep links for push and in-app message scenarios.

## App Transport Security (ATS)

iOS 9+ enforces ATS by default on all in-app web connections. Requirements:
- All connections must use HTTPS
- TLS 1.2 with forward secrecy

Connections that fail ATS produce errors like:
```
CFNetwork SSLHandshake failed (-9801)
Error Domain=NSURLErrorDomain Code=-1200 "An SSL error has occurred..."
```

ATS applies to links opened within the app, not those opened in an external browser.

**Recommended approach:** Ensure all URLs linked from Braze campaigns (push, in-app messages) are ATS-compliant HTTPS. Use an SSL testing tool (e.g., ssllabs.com) to audit web server configuration.

`★ Insight ─────────────────────────────────────`
The preprocessed output drops all Liquid template tags, image busters, tab UI wrappers, and external link anchors — while keeping both Swift and Obj-C examples since Braze's SDK supports both. The ATS section is truncated in the source but the key actionable guidance (HTTPS requirement + error signatures) is preserved. This matches how Nick's topic generator keeps "atomic knowledge units" self-contained and embedding-friendly.
`─────────────────────────────────────────────────`
