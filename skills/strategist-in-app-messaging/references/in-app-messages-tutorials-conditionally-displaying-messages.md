---
name: in-app-messages-tutorials-conditionally-displaying-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/tutorials/conditionally_displaying_messages
indexed_at: '2026-04-05'
keywords:
  - messages
  - conditional
  - display
  - intercept
  - suppression
  - listener
  - logic
  - targeting
  - callback
  - routing
triggers:
  - conditionally display in-app messages
  - suppress messages with custom logic
  - intercept and control message display
  - customize when messages appear
  - filter in-app messages
---
# Conditionally Displaying In-App Messages

Control when in-app messages are shown by intercepting them before display and applying custom logic.

## Core Pattern

Instead of using Braze's automatic display, you subscribe to/intercept messages, evaluate your conditions, then explicitly show or discard each message.

---

## Web (JavaScript)

**Prerequisite:** Remove any calls to `automaticallyShowInAppMessages()` — they override custom logic.

```js
import * as braze from "@braze/web-sdk";
// Do NOT call braze.automaticallyShowInAppMessages()

braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-ENDPOINT",
  enableLogging: true, // optional, useful during development
});

braze.subscribeToInAppMessage(function (message) {
  if (
    location.pathname === "/checkout" ||
    document.getElementById("#checkout")
  ) {
    // Suppress message — do not call showInAppMessage
  } else {
    braze.showInAppMessage(message);
  }
});
```

**Key APIs:**
- `subscribeToInAppMessage(callback)` — registers a handler called whenever a message is triggered
- `showInAppMessage(message)` — explicitly renders the message; omitting this call silently discards it

---

## Android (Kotlin)

**Prerequisites:** Enable in-app messages for Android. Register `BrazeActivityLifecycleCallbackListener`.

```kotlin
BrazeInAppMessageManager.getInstance().setCustomInAppMessageManagerListener(object : IInAppMessageManagerListener {
    override fun beforeInAppMessageDisplayed(inAppMessage: IInAppMessage): InAppMessageOperation {
        val shouldShow = inAppMessage.extras["should_display_message"] == "true"

        return if (shouldShow) {
            InAppMessageOperation.DISPLAY_NOW
        } else {
            InAppMessageOperation.DISCARD
        }
    }
})
```

Full `Application.onCreate()` setup:

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        BrazeLogger.logLevel = Log.VERBOSE // optional debug logging

        val brazeConfig = BrazeConfig.Builder()
            .setApiKey("YOUR-API-KEY")
            .setCustomEndpoint("YOUR-ENDPOINT")
            .build()
        Braze.configure(this, brazeConfig)

        registerActivityLifecycleCallbacks(BrazeActivityLifecycleCallbackListener())

        BrazeInAppMessageManager.getInstance().setCustomInAppMessageManagerListener(/* ... */)
    }
}
```

**Key APIs:**
- `IInAppMessageManagerListener.beforeInAppMessageDisplayed()` — intercept point; return value controls display
- `InAppMessageOperation.DISPLAY_NOW` — show using Braze's default UI
- `InAppMessageOperation.DISCARD` — suppress the message
- `inAppMessage.extras` — key-value pairs set in the Braze dashboard (e.g., `"should_display_message": "true"`)

---

## Swift (iOS)

**Prerequisites:** Enable in-app messages for Swift. Use `BrazeInAppMessageUI` as the presenter.

```swift
import BrazeKit
import BrazeUI

class AppDelegate: NSObject, UIApplicationDelegate, BrazeInAppMessageUIDelegate {
    static var braze: Braze?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        let configuration = Braze.Configuration(apiKey: "YOUR_API_KEY", endpoint: "YOUR_ENDPOINT")
        configuration.logger.level = .debug // optional

        let brazeInstance = Braze(configuration: configuration)
        AppDelegate.braze = brazeInstance

        let inAppMessageUI = BrazeInAppMessageUI()
        inAppMessageUI.delegate = self
        brazeInstance.inAppMessagePresenter = inAppMessageUI

        return true
    }

    func inAppMessage(_ ui: BrazeInAppMessageUI,
                      displayChoiceForMessage message: Braze.InAppMessage) -> BrazeInAppMessageUI.DisplayChoice {
        if let flag = message.extras["should_display_message"] as? String, flag == "true" {
            return .now
        } else {
            return .discard
        }
    }
}
```

**Key APIs:**
- `BrazeInAppMessageUIDelegate` — protocol your AppDelegate adopts to intercept messages
- `inAppMessage(_:displayChoiceForMessage:)` — delegate method called before display
- `.now` — show the message immediately
- `.discard` — suppress the message
- `message.extras` — key-value pairs from the Braze dashboard

---

## Common Pattern: KVP-Based Conditional Display

All three platforms support using Braze **key-value pairs (KVPs/extras)** set in the dashboard to drive conditional logic server-side:

| Platform | KVP Access |
|----------|------------|
| Web | `message.extras["key"]` |
| Android | `inAppMessage.extras["key"]` |
| Swift | `message.extras["key"]` |

This lets marketers control display logic without app releases by toggling values like `should_display_message: true/false` directly in the Braze dashboard.
