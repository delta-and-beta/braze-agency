---
name: in-app-messages-tutorials-deferring-triggered-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/tutorials/deferring_triggered_messages
indexed_at: '2026-04-05'
keywords:
  - defer
  - intercept
  - messages
  - triggered
  - serialization
  - persistence
  - display
  - queue
  - Android
  - Web
triggers:
  - how to defer in-app messages
  - intercept triggered messages before display
  - save messages for later
  - custom message display logic
  - restore deferred messages
---
# Deferring Triggered In-App Messages

Braze allows you to intercept triggered in-app messages before display, defer them for later, and restore them on demand—useful for showing messages at contextually appropriate moments rather than immediately on trigger.

---

## Web SDK

### Setup

Remove any calls to `automaticallyShowInAppMessages()` — it overrides custom display logic.

### Core API

| Function | Purpose |
|---|---|
| `subscribeToInAppMessage(callback)` | Register handler called when a message triggers |
| `deferInAppMessage(message)` | Serialize and save message for later display |
| `getDeferredInAppMessage()` | Retrieve the previously deferred message |
| `showInAppMessage(message)` | Display a message immediately |

### Implementation

```js
import * as braze from "@braze/web-sdk";
// Do NOT call braze.automaticallyShowInAppMessages()

braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-ENDPOINT",
  enableLogging: true, // optional: helps during development
});

// Intercept triggered messages
braze.subscribeToInAppMessage(function (message) {
  const shouldDefer = true; // replace with your own logic
  if (shouldDefer) {
    braze.deferInAppMessage(message); // serialized and saved across page loads
  } else {
    braze.showInAppMessage(message); // show immediately
  }
});

// Later, in your UI (e.g., button click)
document.getElementById("button").onclick = function () {
  const deferredMessage = braze.getDeferredInAppMessage();
  if (deferredMessage) {
    braze.showInAppMessage(deferredMessage);
  }
};
```

**Key behavior:** `deferInAppMessage` persists the message across page loads via serialization.

---

## Android SDK (Kotlin)

### Prerequisites

- In-app messages must be enabled for Android.

### Core API

| Class/Method | Purpose |
|---|---|
| `BrazeInAppMessageManager.setCustomInAppMessageManagerListener()` | Intercept messages before display |
| `IInAppMessageManagerListener.beforeInAppMessageDisplayed()` | Return display decision |
| `InAppMessageOperation.DISPLAY_NOW` | Show the message immediately |
| `InAppMessageOperation.DISPLAY_LATER` | Re-enqueue for later |
| `BrazeInAppMessageManager.requestDisplayInAppMessage()` | Trigger display of next queued message |

### Implementation

**`MainApplication.kt`** — Application singleton with listener logic:

```kotlin
class MyApplication : Application() {
    companion object {
        private var instance: MyApplication? = null
        fun getInstance(): MyApplication = instance!!
    }

    private var showMessage = false

    override fun onCreate() {
        super.onCreate()
        instance = this

        BrazeLogger.logLevel = Log.VERBOSE // optional: verbose logging

        val brazeConfig = BrazeConfig.Builder()
            .setApiKey("YOUR-API-KEY")
            .setCustomEndpoint("YOUR-ENDPOINT")
            .build()
        Braze.configure(this, brazeConfig)

        registerActivityLifecycleCallbacks(BrazeActivityLifecycleCallbackListener())

        // Intercept messages before display
        BrazeInAppMessageManager.getInstance().setCustomInAppMessageManagerListener(
            object : IInAppMessageManagerListener {
                override fun beforeInAppMessageDisplayed(inAppMessage: IInAppMessage): InAppMessageOperation {
                    return if (showMessage) InAppMessageOperation.DISPLAY_NOW
                    else InAppMessageOperation.DISPLAY_LATER
                }
            }
        )
    }

    // Call this to show the deferred message
    fun showDeferredMessage(show: Boolean) {
        showMessage = show
        BrazeInAppMessageManager.getInstance().requestDisplayInAppMessage()
    }
}
```

**`MainActivity.kt`** — Trigger deferred display from UI:

```kotlin
Button(onClick = {
    MyApplication.getInstance().showDeferredMessage(true)
}) {
    Text("Show Deferred IAM")
}
```

**Key behavior:** `DISPLAY_LATER` re-enqueues the message; `requestDisplayInAppMessage()` dequeues and attempts to show it — the listener's `showMessage` flag then controls whether it actually renders.

---

## Conceptual Flow

```
Message Triggers
      │
      ▼
subscribeToInAppMessage / beforeInAppMessageDisplayed
      │
  shouldDefer?
  ┌───┴────┐
 Yes       No
  │         │
defer     showInAppMessage (immediate)
  │
  ▼
User action → getDeferredInAppMessage / requestDisplayInAppMessage
  │
  ▼
showInAppMessage (deferred)
```
