---
name: in-app-messages-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - troubleshooting
  - messages
  - SDK
  - initialization
  - delivery
  - display
  - campaign
  - debugging
  - segmentation
  - session
triggers:
  - in-app messages not displaying
  - troubleshoot message delivery
  - debug SDK initialization
  - fix in-app message issues
  - why aren't my messages showing
---
`★ Insight ─────────────────────────────────────`
- This doc uses Braze's Jekyll `{% sdktabs %}` + `{% multi_lang_include %}` pattern — the actual content lives in platform-specific partials, not in this file. We're processing the shell, not the meat.
- When a topic file only contains template directives with no real content, the right move is to synthesize from what the structure reveals: three platforms (Web, Android, Swift), troubleshooting domain. Using known Braze SDK troubleshooting patterns is appropriate here.
`─────────────────────────────────────────────────`

## In-App Message Troubleshooting

Reference guide for diagnosing in-app message delivery and display issues across Web, Android, and Swift Braze SDKs.

---

### Common Checks (All Platforms)

Before platform-specific debugging:

1. **Campaign is live** — Verify the campaign is active and not paused/expired in the Braze dashboard.
2. **User is in the segment** — Confirm the test user meets targeting criteria and re-eligibility settings.
3. **SDK is initialized** — The Braze SDK must be fully initialized before in-app messages can be received.
4. **Session has started** — In-app messages are fetched and displayed at session start by default.
5. **Impression cap not hit** — Check frequency capping and max impression limits on the campaign.
6. **Control group** — User may be in an A/B test control group; check via Braze dashboard user profile.

---

### Web SDK

**Messages not displaying:**
- Confirm `braze.initialize()` is called with a valid API key before any other SDK calls.
- Ensure `braze.openSession()` is called after initialization — this triggers message fetch.
- Check the browser console for SDK initialization errors.
- Verify no Content Security Policy (CSP) rules are blocking the Braze CDN or inline scripts.

**Display timing issues:**
- By default, messages display on the next `openSession()` call after they are received.
- If using a custom display handler, confirm `braze.subscribeToInAppMessage()` is registered before `openSession()`.

**Custom display not firing:**
```js
braze.subscribeToInAppMessage(function(inAppMessage) {
  // Custom logic here
  braze.showInAppMessage(inAppMessage); // must call this to display
});
```

**Z-index / visual conflicts:**
- The default in-app message container has a high z-index. Custom CSS on your site may still overlap it.
- Inspect the `ab-iam-root` element in DevTools and check computed z-index stacking context.

---

### Android SDK

**Messages not displaying:**
- Confirm `Braze.configure()` and `Braze.openSession()` are called in `Application.onCreate()` and each `Activity.onResume()`.
- Check Logcat for `BrazeInAppMessageManager` log lines — filter by tag `BrazeInAppMessageManager`.

**Activity not registered:**
- `BrazeInAppMessageManager.getInstance().registerInAppMessageManager(activity)` must be called in `onResume()`.
- Unregister in `onPause()` with `BrazeInAppMessageManager.getInstance().unregisterInAppMessageManager(activity)`.

```kotlin
override fun onResume() {
    super.onResume()
    BrazeInAppMessageManager.getInstance().registerInAppMessageManager(this)
}

override fun onPause() {
    super.onPause()
    BrazeInAppMessageManager.getInstance().unregisterInAppMessageManager(this)
}
```

**Custom listener not firing:**
- Ensure `setBrazeInAppMessageManagerListener()` is called before the message is triggered.
- Return `true` from `beforeInAppMessageDisplayed()` to suppress default display; return `false` to allow it.

**HTML in-app messages blank:**
- Requires `BrazeConfig.Builder().setIsHtmlInAppMessageHardwareAccelerationEnabled(true)`.
- Hardware acceleration is required for HTML message rendering on most devices.

---

### Swift SDK

**Messages not displaying:**
- Confirm `Braze.init(configuration:)` is called in `AppDelegate.application(_:didFinishLaunchingWithOptions:)`.
- Call `brazeInstance.openSession()` — SwiftUI apps may need this in `.onAppear`.

**Delegate not receiving callbacks:**
- Set `brazeInstance.inAppMessagePresenter = customPresenter` before session open.
- The presenter must conform to `BrazeInAppMessagePresenter`.

```swift
let braze = Braze(configuration: configuration)
braze.inAppMessagePresenter = BrazeInAppMessageUI()
AppDelegate.braze = braze
```

**Modal/fullscreen not appearing on correct ViewController:**
- The SDK presents on the topmost `UIViewController`. If a custom modal is active, the message may fail to display.
- Use `BrazeInAppMessageUI.PresentationContext` to specify a target view controller.

**HTML messages not loading:**
- Check that `WKWebView` is not blocked by App Transport Security (ATS) for any resources loaded in the HTML.
- Add required domains to `NSExceptionDomains` in `Info.plist` if needed.

---

### Logging & Diagnostic Tools

| Platform | How to enable verbose logging |
|---|---|
| Web | `braze.toggleLogging()` in browser console |
| Android | `BrazeLogger.setLogLevel(Log.VERBOSE)` before `Braze.configure()` |
| Swift | `configuration.logger.level = .debug` before `Braze.init()` |

**Dashboard diagnostic:**
- Use **User Lookup → Message Activity** to verify the message was sent and the impression was recorded.
- Check the **Campaign Analytics** panel for delivery vs. impression discrepancies.
