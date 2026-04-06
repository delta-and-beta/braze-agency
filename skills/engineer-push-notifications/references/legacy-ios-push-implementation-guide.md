---
name: legacy-ios-push-implementation-guide
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/implementation_guide
indexed_at: '2026-04-05'
keywords:
  - notifications
  - extension
  - content
  - interactive
  - personalized
  - category
  - dashboard
  - Braze
  - iOS
  - customization
triggers:
  - customize push notification content
  - create interactive push notifications
  - expand notification with custom view
  - personalize push notifications
  - add notification buttons
---
`★ Insight ─────────────────────────────────────`
Jekyll docs use liquid template tags (`{% %}`) and image busters that are meaningless outside the site build — stripping these aggressively is the right call. The three-level depth structure (concept → dashboard config → code) maps cleanly onto a reference doc format.
`─────────────────────────────────────────────────`

## Push Notification Content App Extensions

Push notifications support deep customization beyond the default UI via **notification content app extensions**, which render a custom view when a notification is expanded.

**Expansion triggers:**
- Long press on the push banner
- Swipe down on the push banner
- Swipe left → tap "View"

**Requirements:**
- iOS 10+
- Push notifications already integrated
- Xcode-generated files per language:
  - **Swift:** `NotificationViewController.swift`, `MainInterface.storyboard`
  - **Obj-C:** `NotificationViewController.h`, `NotificationViewController.m`, `MainInterface.storyboard`

### Custom Category Configuration

1. In the Braze dashboard: toggle on notification buttons and enter a custom category string
2. In your Notification Content Extension Target's `.plist`: set `UNNotificationExtensionCategory` to the same string
3. The values **must match exactly** between dashboard and `.plist`

> Tip: Content extensions aren't visually obvious — include a call-to-action copy prompting users to expand.

---

## Use Case Types

### 1. Interactive Push Notifications

Requires iOS 12+. Enables fully interactive content inside the expanded notification (e.g., match games, spin-to-win wheels, like buttons).

**Dashboard configuration:**
1. Set the specific category in notification button settings
2. In `.plist`, set `UNNotificationExtensionCategory` to match
3. Set `UNNotificationExtensionInteractionEnabled` to `true`

**Other use cases:** in-notification games, discount wheels, save/like actions

---

### 2. Personalized Push Notifications

Displays user-specific data inside the expanded view (e.g., course progress, session counts). Triggered via API trigger or session completion.

**Dashboard configuration:**
1. Register the display category
2. Use key-value pairs with Liquid to bind user attributes:

| Key | Value source |
|-----|-------------|
| `next_session_name` | API trigger property (Liquid) |
| `next_session_complete_date` | API trigger property (Liquid) |
| `completed_session_count` | Custom user attribute (Liquid) |
| `total_session_count` | Custom user attribute (Liquid) |

**Key handler:** `didReceive` is called on the `NotificationViewController` when the extension receives a notification — this is where KV pair data is unpacked and used to populate the custom view.

---

### 3. Information Capture Push Notifications

Allows capturing input (phone numbers, email, etc.) directly within the push notification. *(Implementation details require additional source content.)*

---

## Analytics Logging

When using content extensions, standard Braze analytics (impressions, clicks) need explicit handling. Log events from within the `NotificationViewController` using the Braze SDK — the extension runs in a separate process from the main app.
