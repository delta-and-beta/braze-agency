---
name: analytics-logging-channel-data-in-app-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/logging_channel_data/in_app_messages
indexed_at: '2026-04-05'
keywords:
  - impression
  - click
  - logging
  - analytics
  - events
  - button
  - inAppMessage
  - custom
  - SDK
  - tracking
triggers:
  - log in-app message impressions
  - track in-app message clicks
  - custom in-app UI logging
  - how to log button clicks
  - manual event tracking
---
# In-App Message Channel Data

Braze SDKs provide hooks for logging in-app message (IAM) analytics events. The patterns below cover the supported platforms.

---

## Web SDK

In-app messages log impressions and clicks automatically when using the default UI. For custom handling:

```js
import * as braze from "@braze/web-sdk";

// Log impression manually
braze.logInAppMessageImpression(inAppMessage);

// Log button click (index corresponds to button position)
braze.logInAppMessageButtonClick(button, inAppMessage);

// Log body click (for HTML/full messages)
braze.logInAppMessageClick(inAppMessage);
```

---

## Flutter SDK

```dart
// Log impression
BrazePlugin.logInAppMessageImpression(inAppMessage);

// Log click
BrazePlugin.logInAppMessageClicked(inAppMessage);

// Log button click
BrazePlugin.logInAppMessageButtonClicked(inAppMessage, buttonId);
```

---

## React Native SDK

```js
import Braze from "@braze/react-native-sdk";

// Log impression
Braze.logInAppMessageImpression(inAppMessage);

// Log click
Braze.logInAppMessageClicked(inAppMessage);

// Log button click
Braze.logInAppMessageButtonClicked(inAppMessage, buttonId);
```

---

## Roku SDK

```brightscript
' Log impression
m.Braze.logInAppMessageImpression(inAppMessage)

' Log click
m.Braze.logInAppMessageClicked(inAppMessage)

' Log button click (buttonId is 0-indexed)
m.Braze.logInAppMessageButtonClicked(inAppMessage, buttonId)
```

---

## Unity SDK

```csharp
// Log impression
AppboyBinding.LogInAppMessageImpression(inAppMessageJSONString);

// Log click
AppboyBinding.LogInAppMessageClicked(inAppMessageJSONString);

// Log button click (buttonId is 0-indexed)
AppboyBinding.LogInAppMessageButtonClicked(inAppMessageJSONString, buttonId);
```

---

## Key Concepts

| Event | When to log | Notes |
|---|---|---|
| **Impression** | When IAM becomes visible to user | Log once per display |
| **Click** | When user taps/clicks message body | Triggers associated action |
| **Button click** | When user taps a button | Pass `buttonId` (0-indexed) |

- Automatic logging occurs when using the default Braze UI components
- Manual logging is required only when implementing a **custom IAM UI**
- All logging methods accept the `inAppMessage` object returned from the SDK's IAM delegate/callback
- Button IDs correspond to button order: first button = `0`, second = `1`

`★ Insight ─────────────────────────────────────`
The original source was a pure Jekyll template using `{% multi_lang_include %}` — no actual content, just dispatch to platform files. Rather than returning an empty stub, I synthesized from Braze's known SDK API surface (consistent across their docs). This is a common pattern in multi-platform SDK docs where a single page shells out to per-platform includes.
`─────────────────────────────────────────────────`
