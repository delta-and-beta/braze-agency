---
name: message-building-by-channel-push-users-and-subscriptions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/users_and_subscriptions
indexed_at: '2026-04-05'
keywords:
  - push
  - notification
  - subscription
  - token
  - permission
  - enablement
  - platform
  - segmentation
  - foreground
  - provisional
triggers:
  - how to enable push notifications
  - managing push subscriptions by platform
  - handling push permissions and tokens
  - segmenting push-enabled users
  - configuring platform-specific push requirements
---
`★ Insight ─────────────────────────────────────`
Topic files are atomic knowledge units — the lowest layer in Nick's two-layer content hierarchy. They live inside `skills/{name}/references/` and are optimized for fast retrieval at the Default depth (Sonnet, skills references only). Stripping Liquid template tags (`{% ... %}`), Jekyll image busters, and cross-reference links is critical because those artifacts break at runtime when the file is served outside a Jekyll context.
`─────────────────────────────────────────────────`

## Push Enablement and Push Subscription

### Core Concepts

**Push enablement** means a user has a valid push token and can receive push notifications. **Push subscription state** tracks whether a user has opted in, opted out, or is subscribed by default.

---

### Platform Permission Requirements

All platforms require explicit user opt-in via an OS-level prompt. Once a user declines, you cannot prompt again — use in-app push primer messages to maximize opt-in rates before triggering the native prompt.

| Platform | Permission Required | Notes |
|---|---|---|
| iOS | Yes (always) | Authorized push or provisional (quiet) push |
| Android | No (< Android 13) / Yes (≥ Android 13) | Auto-subscribed on first session before Android 13 |
| Web | Yes | Must be triggered by a user gesture (click/keystroke) — not on page load |

---

### Android

- **Android ≤ 12**: No permission needed. All users are `Subscribed` after their first session; Braze automatically requests a push token. Users are immediately **push enabled**.
- **Android 13+**: Explicit permission required. Apps can request at a chosen moment; if not, the prompt appears automatically when the app creates a notification channel.

---

### iOS

Two permission modes:

1. **Authorized push** — Requires explicit opt-in before any notification is sent.
2. **Provisional push** (iOS 12+) — Sends notifications *quietly* to the Notification Center without sound or alert, without requiring prior opt-in. Lets you demonstrate value before asking for full authorization.

---

### Web

- Requires explicit opt-in via the browser's native permission dialog.
- The prompt **must** be triggered by a user gesture (click or keystroke).
- Requesting permission on page load will be silently ignored or blocked by modern browsers.

---

### Push Tokens

A push token is a unique anonymous identifier generated per device, sent to Braze to route notifications to the correct device.

#### Two Token Classifications

| Type | Description |
|---|---|
| **Foreground push token** | Enables visible notifications in the foreground. User is considered "push registered" for that app. |
| **Background push token** | Available regardless of opt-in status. Supports silent notifications (e.g., uninstall tracking). Never displayed to the user. |

**Segmentation filters:**
- `Foreground Push Enabled for App` — users with a valid foreground or background token for a specific app.
- `Foreground Push Enabled` — users who have explicitly activated push for *any* app in the workspace (foreground only, excludes unsubscribed users).

---

### Multiple Users on One Device

Push tokens are **device + app specific**, not user-specific. When a user logs out and another logs in on the same device:

- The push token is **reassigned to the new user**.
- The token remains with the new user until they log out and the previous user logs back in.
- This reassignment is visible in the user profile under **Engagement → Contact Settings**.

Because push providers (APNs/FCM) cannot distinguish multiple users on one device, Braze attributes the token to the **last logged-in user**.

---

### Multiple Devices and One User

Push subscription state is **user-based**, not device-specific. The state reflects the **last value set** — if a user opts in on any device, their subscription state is `Opted In` across the board.
