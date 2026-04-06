---
name: in-app-messages-logging-message-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/logging_message_data
indexed_at: '2026-04-05'
keywords:
  - impression
  - click
  - button
  - analytics
  - logging
  - SDK
  - message
  - custom
triggers:
  - how to log in-app message impressions
  - logging in-app message clicks
  - how to track button interactions
  - custom in-app message display
  - in-app message event tracking
---
# Logging In-App Message Data

Braze SDKs provide analytics hooks to log impressions, clicks, and button interactions for in-app messages (IAMs). Logging must be done manually when using custom display logic.

## Web SDK

```javascript
// Log impression
braze.logInAppMessageImpression(inAppMessage);

// Log click (message body)
braze.logInAppMessageClick(inAppMessage);

// Log button click
braze.logInAppMessageButtonClick(button, inAppMessage);
```

## Flutter SDK

```dart
// Log impression
braze.logInAppMessageImpression(inAppMessage);

// Log click
braze.logInAppMessageClicked(inAppMessage);

// Log button click
braze.logInAppMessageButtonClicked(inAppMessage, buttonId);
```

## React Native SDK

```javascript
// Log impression
Braze.logInAppMessageImpression(inAppMessage.inAppMessageJsonString);

// Log click
Braze.logInAppMessageClicked(inAppMessage.inAppMessageJsonString);

// Log button click
Braze.logInAppMessageButtonClicked(inAppMessage.inAppMessageJsonString, buttonId);
```

## Roku SDK

```brightscript
' Log impression
m.Braze.logInAppMessageImpression(inAppMessage)

' Log click
m.Braze.logInAppMessageClick(inAppMessage)

' Log button click
m.Braze.logInAppMessageButtonClick(inAppMessage, buttonIndex)
```

## Unity SDK

```csharp
// Log impression
AppboyBinding.LogInAppMessageImpression(inAppMessage.JsonString);

// Log click
AppboyBinding.LogInAppMessageClicked(inAppMessage.JsonString);

// Log button click
AppboyBinding.LogInAppMessageButtonClicked(inAppMessage.JsonString, buttonID);
```

## Key Concepts

- **Impression**: Logged when the message becomes visible to the user. Call once per display.
- **Click**: Logged when the user taps/clicks the message body.
- **Button click**: Logged when the user taps a specific button; identified by button index or ID.
- **Custom display**: When overriding default IAM rendering, automatic logging is disabled — you must call these methods explicitly.
- **JSON string pattern** (React Native, Unity): These SDKs pass the raw JSON string rather than an object; use `inAppMessage.inAppMessageJsonString` or `inAppMessage.JsonString`.

`★ Insight ─────────────────────────────────────`
The original source is a Jekyll multi-platform tab template — all actual content lives in per-SDK `{% multi_lang_include %}` partials. When source docs follow this pattern, the topic file must synthesize from SDK knowledge rather than the template shell itself. This is a common pattern in Braze's docs repo where platform-specific code is factored out to avoid duplication across guide pages.
`─────────────────────────────────────────────────`
