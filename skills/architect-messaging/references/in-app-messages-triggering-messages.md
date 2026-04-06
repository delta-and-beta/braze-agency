---
name: in-app-messages-triggering-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/triggering_messages
indexed_at: '2026-04-05'
keywords:
  - triggering
  - messages
  - events
  - purchase
  - session
  - extras
  - subscriptions
  - delivery
  - offline
  - SDK
triggers:
  - How to trigger in-app messages
  - Configure message delivery on events
  - Handle purchase events for messaging
  - Set up message subscriptions
  - Manage in-app message display
---
The `learn` skill is for capturing team insights — not applicable here. Proceeding with the content transformation.

`★ Insight ─────────────────────────────────────`
- Nick topic files are the **atomic knowledge units** at the bottom of the content hierarchy — they sit inside `skills/{id}/references/*.md` and should be self-contained fragments a vector search can retrieve independently
- Stripping Jekyll template syntax (`{% tabs %}`, `{% alert %}`, `{{site.baseurl}}`) is critical — these are server-side includes that won't render in a static context
- The condensation goal is **information density**, not brevity — all distinct facts, behaviors, and code patterns should survive; only navigation chrome and repetition should be cut
`─────────────────────────────────────────────────`

---

## Triggering In-App Messages

### Trigger Events

In-app messages are triggered when the SDK logs one of these event types:
- `Session Start`
- `Push Click`
- `Any Purchase`
- `Specific Purchase` (supports property filters)
- `Custom Event` (supports property filters)

**Key constraints:**
- Cannot be triggered via API or API events — only SDK-logged custom events
- At session start, Braze delivers all eligible messages and prefetches assets to minimize display latency
- When multiple messages are eligible for the same trigger, only the **highest-priority** message is delivered

### Message Types

Braze delivers two internal message types (transparent to dashboard users):

| Type | Description | Offline behavior |
|------|-------------|-----------------|
| `inapp` (standard) | Pre-templated with all required data (e.g., custom attributes already resolved) | Displays even when device is offline or in airplane mode |
| `templated_iam` (templated) | Requires an additional network request to resolve data before display | Requires connectivity |

### Key-Value Pairs (Extras)

Campaigns can include key-value pairs as `extras` on the in-app message object.

**Web:**
```javascript
import * as braze from "@braze/web-sdk";

braze.subscribeToInAppMessage(function(inAppMessage) {
  if (inAppMessage instanceof braze.ControlMessage) {
    return braze.showInAppMessage(inAppMessage); // always show control group
  }
  if (inAppMessage instanceof braze.InAppMessage) {
    const extras = inAppMessage.extras;
    if (extras) {
      for (const key in extras) {
        console.log("key: " + key + ", value: " + extras[key]);
      }
    }
  }
  braze.showInAppMessage(inAppMessage);
});
```

**Android (Kotlin):**
```kotlin
extras: Map<String, String>
```

**Swift:**
```swift
let customization = message.extras["custom-display"] as? String
if customization == "colorful-slideup" {
  // custom logic
}
```

### Disabling Automatic Triggers

By default, messages trigger automatically. To override:

**Web** — Remove `braze.automaticallyShowInAppMessages()` from your loading snippet, then use a subscription to apply custom logic:
```javascript
braze.subscribeToInAppMessage(function(inAppMessage) {
  if (inAppMessage.isControl) { // v4.5.0+
    return braze.showInAppMessage(inAppMessage);
  }
  if (should_show_the_message_according_to_your_custom_logic) {
    braze.showInAppMessage(inAppMessage);
  }
  // else do nothing
});
```
> Warning: Calling `braze.showInAppMessage` without removing `braze.automaticallyShowInAppMessages()` will cause messages to display twice.

**Android:**
1. Implement `IInAppMessageManagerListener` as a custom listener
2. Return `InAppMessageOperation.DISCARD` from `beforeInAppMessageDisplayed()`

**Swift:**
1. Implement `BrazeInAppMessageUIDelegate`
2. Return `.discard` from `inAppMessage(_:displayChoiceForMessage:)`

**Flutter:**
1. Ensure automatic integration initializer is active (default in v2.2.0+)
2. Add to `braze.xml`:
```xml
<string name="com_braze_flutter_automatic_integration_iam_operation">DISCARD</string>
```

**Unity (Android):** Deselect **Automatically Display In-App Messages** in the Braze config editor, or set `com_braze_inapp_show_inapp_messages_automatically` to `false` in `braze.xml`.

`★ Insight ─────────────────────────────────────`
- The `inapp` vs `templated_iam` distinction is worth preserving in topic files even though it's invisible to dashboard users — it directly affects offline behavior and is a common source of "why isn't my message showing?" debugging questions
- Control group messages (`ControlMessage` / `isControl`) must always call `showInAppMessage` to correctly log the impression — a subtle but important contract that should survive condensation
`─────────────────────────────────────────────────`
