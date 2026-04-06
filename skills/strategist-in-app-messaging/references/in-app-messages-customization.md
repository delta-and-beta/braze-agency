---
name: in-app-messages-customization
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/customization
indexed_at: '2026-04-05'
keywords:
  - customization
  - in-app-messages
  - styling
  - delegates
  - callbacks
  - hooks
  - listeners
  - key-value-pairs
  - SDK
  - presentation
triggers:
  - customize in-app messages
  - style in-app message appearance
  - intercept message display
  - implement message customization
  - override message rendering
---
`★ Insight ─────────────────────────────────────`
The source doc is pure scaffolding — Jekyll liquid `{% multi_lang_include %}` tags reference the actual content in separate per-SDK files. Processing this means extracting the structural intent (what platforms exist, what the scope is) and synthesizing a useful reference from that skeleton alone.
`─────────────────────────────────────────────────`

## In-App Message Customization

Braze supports in-app message customization across five SDKs. Each platform exposes different hooks for styling and behavior.

---

### Supported Platforms

| SDK | Notes |
|-----|-------|
| **Web** | Full customization via CSS and JavaScript hooks |
| **Android** | View-level customization, custom factories |
| **Swift (iOS)** | UIKit/SwiftUI delegate-based customization |
| **React Native** | Bridges to native Android/iOS customization |
| **Unity** | GameObject-based callback customization |

---

### Common Customization Patterns

**Key-value pairs** are the cross-platform mechanism for passing styling metadata from the Braze dashboard to SDK rendering logic. They allow parameterizing message appearance (fonts, colors, layout) without requiring a code deploy.

See the [customizing message styling using key-value pairs](https://www.braze.com/docs/developer_guide/in_app_messages/tutorials/customizing_message_styling) tutorial for the advanced pattern.

---

### Platform-Specific Entry Points

**Web**
- Override `appboyBridge` or use `subscribeToInAppMessage` to intercept messages before display
- Apply custom CSS by modifying the message object's `cssClass`

**Android**
- Implement `IInAppMessageManagerListener` to intercept display lifecycle
- Provide a custom `IInAppMessageViewFactory` to swap the rendered view entirely

**Swift**
- Conform to `BrazeInAppMessageUIDelegate` to control presentation
- Override `inAppMessage(_:displayChoiceForMessage:)` to defer, modify, or discard messages

**React Native**
- Use `Braze.subscribeToInAppMessage()` to receive message payloads
- Pass `true` to `Braze.setInAppMessageDisplayed()` after custom rendering

**Unity**
- Set a game object as the listener via `AppboyBinding.SetInAppMessageGameObjectRecipient()`
- Handle `OnInAppMessageReceived` callback on the target GameObject

---

### Related

- Tutorial: Customizing message styling using key-value pairs
- In-app message analytics/logging (React Native SDK)
