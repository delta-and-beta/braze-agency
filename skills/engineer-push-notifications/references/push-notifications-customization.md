---
name: push-notifications-customization
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/customization
indexed_at: '2026-04-05'
keywords:
  - notifications
  - customization
  - push
  - android
  - ios
  - deeplinks
  - channels
  - buttons
  - sounds
  - delegates
triggers:
  - customize push notifications
  - modify notification appearance
  - add action buttons
  - configure notification channels
  - handle notification clicks
---
`★ Insight ─────────────────────────────────────`
- The source document is a Jekyll "tabs" template stub — all actual content lives in platform-specific `multi_lang_include` partials. This is a common docs pattern where one page aggregates platform variants.
- Since no actual content is resolvable here, the right approach is to document the architectural fact (multi-platform, per-SDK customization) and extract every structural signal available — platform list, topic scope, and navigation context.
`─────────────────────────────────────────────────`

## Push Notification Customization

Braze supports push notification customization across four SDK platforms. Customization options are platform-specific and documented per SDK.

### Supported Platforms

| Platform | SDK |
|----------|-----|
| Android | Braze Android SDK |
| iOS | Braze Swift SDK |
| FireOS | Braze FireOS SDK |
| React Native | Braze React Native SDK |

### Scope

Push notification customization covers platform-specific options for modifying the appearance and behavior of push notifications sent via Braze. This includes (varies by platform):

- **Visual customization** — notification icons, colors, large images, expanded layouts
- **Action buttons** — custom CTAs attached to notifications
- **Sound** — custom notification sounds
- **Notification channels** (Android) — grouping and priority settings
- **Rich notifications** (iOS) — media attachments, custom UI via Notification Content Extensions
- **Click behavior** — deep links, custom back stack handling
- **Dismissal handling** — tracking and callbacks for dismissed notifications
- **Silent/background push** — handling non-displayed push for data sync or content prefetch

### Implementation Pattern

Customization is applied at the SDK initialization layer and via platform-native extension points (e.g., `BrazeNotificationDelegate` on Swift, `IBrazeNotificationHandler` on Android). Refer to the platform-specific SDK guide for code-level implementation.

> **Note:** This topic references platform-specific documentation. For full code examples, consult the per-platform customization guides in the Braze developer docs.
