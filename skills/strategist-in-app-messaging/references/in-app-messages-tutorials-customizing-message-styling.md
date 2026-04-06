---
name: in-app-messages-tutorials-customizing-message-styling
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/tutorials/customizing_message_styling
indexed_at: '2026-04-05'
keywords:
  - styling
  - in-app-messages
  - customization
  - key-value-pairs
  - extras
  - custom-views
  - message-rendering
  - subscription
  - conditional-logic
triggers:
  - customize message styling with key-value pairs
  - implement custom in-app message views
  - apply conditional rendering to messages
  - style in-app messages using extras data
  - remove automatic message display
---
# Customizing Message Styling Using Key-Value Pairs

Use `message.extras` (Web) or `inAppMessage.extras` (Android/Swift) to access KVP data defined in the Braze dashboard. All values are returned as strings.

---

## Web SDK

**Key requirement:** Remove any calls to `automaticallyShowInAppMessages()` — they override custom logic.

```js
import * as braze from "@braze/web-sdk";
// Do NOT call braze.automaticallyShowInAppMessages()

braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-ENDPOINT",
  enableLogging: true, // optional, for debugging
});

braze.subscribeToInAppMessage(function (message) {
  const extras = message.extras;
  const customTemplateType = extras["custom-template"] || "";
  const customColor = extras["custom-color"] || "";
  const customMessageId = extras["message-id"] || "";

  if (customTemplateType) {
    // render your custom UI using extras values
  } else {
    braze.showInAppMessage(message); // fallback to Braze built-in UI
  }
});
```

**Steps:**
1. Remove `automaticallyShowInAppMessages()` calls
2. Call `subscribeToInAppMessage(callback)` to receive triggered messages
3. Read `message.extras` — all values are strings
4. Conditionally call `showInAppMessage(message)` or render custom UI

---

## Android SDK

**Key requirement:** Implement `IInAppMessageViewFactory` and register it on `BrazeInAppMessageManager`.

### Application setup (`MainApplication.kt`)

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        BrazeLogger.logLevel = Log.VERBOSE // optional debugging

        val brazeConfig = BrazeConfig.Builder()
            .setApiKey("YOUR-API-KEY")
            .setCustomEndpoint("YOUR-ENDPOINT")
            .build()
        Braze.configure(this, brazeConfig)

        registerActivityLifecycleCallbacks(BrazeActivityLifecycleCallbackListener())

        // Register custom view factory
        BrazeInAppMessageManager.getInstance()
            .setCustomInAppMessageViewFactory(CustomInAppMessageViewFactory())
    }
}
```

### Custom view factory (`CustomInAppMessageViewFactory.kt`)

```kotlin
class CustomInAppMessageViewFactory : IInAppMessageViewFactory {

    override fun createInAppMessageView(
        activity: Activity,
        inAppMessage: IInAppMessage
    ): View {
        // 1. Get Braze's default factory to retain built-in styling
        val defaultFactory = BrazeInAppMessageManager.getInstance()
            .getDefaultInAppMessageViewFactory(inAppMessage)
            ?: throw IllegalStateException("Braze default IAM view factory is missing")

        // 2. Inflate the default view
        val iamView = defaultFactory.createInAppMessageView(activity, inAppMessage)
            ?: throw IllegalStateException("Braze default IAM view is null")

        // 3. Read KVP extras
        val extras = inAppMessage.extras ?: emptyMap()
        val customization = extras["customization"]
        val overrideColor = extras["custom-color"]

        // 4. Apply conditional styling before returning
        if (customization == "slideup-attributes" && overrideColor != null) {
            try {
                iamView.setBackgroundColor(Color.parseColor(overrideColor))
            } catch (_: IllegalArgumentException) {
                // ignore invalid color values
            }
        }

        return iamView
    }
}
```

**Steps:**
1. Register `BrazeActivityLifecycleCallbackListener` for lifecycle management
2. Implement `IInAppMessageViewFactory` — must conform to this interface
3. Delegate to the default factory first to preserve Braze's built-in behavior
4. Read `inAppMessage.extras` — apply styling before returning the view
5. Register the factory via `setCustomInAppMessageViewFactory()`

---

## Pattern Summary

| Platform | Extras Access | Intercept Point |
|----------|--------------|-----------------|
| Web | `message.extras` | `subscribeToInAppMessage()` callback |
| Android | `inAppMessage.extras` | `IInAppMessageViewFactory.createInAppMessageView()` |
| Swift | `inAppMessage.extras` | `BrazeInAppMessageUIDelegate` |

**Common pattern across all platforms:**
- Read extras values as strings from the dashboard-defined KVPs
- Apply conditional logic based on key names (e.g., `"custom-template"`, `"custom-color"`)
- Delegate to Braze defaults when no custom handling is needed
