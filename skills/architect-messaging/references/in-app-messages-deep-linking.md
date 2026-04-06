---
name: in-app-messages-deep-linking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/deep_linking
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - in-app-messages
  - routing
  - android
  - swift
  - delegates
  - uri
  - navigation
  - webview
triggers:
  - how to set up deep linking in in-app messages
  - custom deep link handler configuration
  - implementing deep links on android and ios
  - configuring uri routing for messages
---
`★ Insight ─────────────────────────────────────`
The source content is almost entirely template/include directives (`{% sdktabs %}`, `{% multi_lang_include %}`). This is a Jekyll-based docs site where the real content lives in separate partial files. Processing this means synthesizing the structural intent rather than extracting literal content — the topic shape (Android + Swift deep linking) is still meaningful signal.
`─────────────────────────────────────────────────`

# In-App Message Deep Linking

Braze supports deep linking from in-app messages on both Android and iOS (Swift). Deep links allow an in-app message to navigate users to a specific screen, URL, or action within your app.

## How It Works

When a user taps an in-app message (or a button within one), the Braze SDK can intercept the action and route it as a deep link. The SDK delegates handling to your app's existing deep link infrastructure.

## Android

Deep links in Android in-app messages are handled via the `IBrazeDeeplinkHandler` interface. The default implementation uses `BrazeDeeplinkHandler`, which calls `startActivity` with the deep link URI.

**Custom handler registration:**
```kotlin
BrazeDeeplinkHandler.getInstance().setBrazeDeeplinkHandler(object : IBrazeDeeplinkHandler {
    override fun gotoNewsFeed(context: Context, extras: Bundle) { ... }
    override fun gotoUri(context: Context, uriAction: UriAction) {
        // custom routing logic
        val uri = uriAction.uri
        // e.g., pass to your NavController or Intent
    }
})
```

**Key behaviors:**
- Deep links starting with `http://` or `https://` open in a WebView or browser depending on configuration
- Custom URI schemes (e.g., `myapp://`) are routed to your `gotoUri` override
- Set `brazeConfig.setCustomHandlerToUri(true)` to suppress default browser handling

## Swift (iOS)

Deep links in iOS in-app messages are handled via the `BrazeDelegate` protocol or the `ABKURLDelegate`.

**Custom delegate:**
```swift
BrazeUI.default.urlDelegate = self

// ABKURLDelegate
func braze(_ braze: Braze, shouldOpenURL context: Braze.URLContext) -> Bool {
    let url = context.url
    // return true to handle custom, false to let SDK handle
    return false
}
```

**Key behaviors:**
- Universal links and custom schemes are both supported
- Return `true` from the delegate to handle the URL yourself; return `false` to let the SDK's default behavior apply
- Deep links are processed after the in-app message dismiss animation completes by default

## Configuration Notes

| Setting | Android | iOS |
|--------|---------|-----|
| Custom URI handler | `IBrazeDeeplinkHandler` | `ABKURLDelegate` |
| Open in WebView | `BrazeConfig.setCustomHandlerToUri` | `prefersModalPresentation` |
| External browser | Default for `http/https` | Default for `http/https` |

## Dashboard Setup

In the Braze dashboard, assign a deep link to an in-app message button:
1. Create or edit an in-app message
2. Select a button → set **On Click Behavior** to **Deep Link Into App**
3. Enter the URI (e.g., `myapp://profile/settings`)
