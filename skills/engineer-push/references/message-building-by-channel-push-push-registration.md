---
name: message-building-by-channel-push-push-registration
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/push_registration
indexed_at: '2026-04-05'
keywords:
  - push
  - tokens
  - registration
  - subscription
  - foreground
  - background
  - opt-in
  - notification
  - segmentation
  - permission
triggers:
  - how to register push tokens
  - checking push subscription state
  - push notification opt-in requirements
  - managing push tokens across devices
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units — they live in `skills/{name}/references/` and are designed for fast, self-contained lookup at the Default routing depth (Sonnet, no full context needed). The goal is distilling prose docs into dense reference material, not summarizing them.
`─────────────────────────────────────────────────`

## Push Registration

### Push Tokens

A **push token** is a unique, anonymous identifier assigned per app per device by the platform's push service provider (APNs for iOS, FCM for Android). Tokens are not static — they can be updated or expire.

**Two push types:**

| Type | Requires Opt-In | Behavior |
|------|-----------------|----------|
| Foreground | Yes | Visibly displayed to user |
| Background | No | Silent delivery; used for uninstall tracking etc. |

A user who opts in to foreground push becomes **"push registered"** and can be targeted via the `Foreground Push Enabled for App` segmentation filter (app-specific). The `Foreground Push Enabled` filter (without "for App") targets users opted-in to at least one app — not a specific app.

### Multiple Users on One Device

Push tokens are device+app scoped, not user scoped. When a user logs out and a new user logs in, the token is **reassigned to the new user**. Braze targets whichever user was last logged in. The push token changelog is visible under **Engagement tab > Contact Settings** on a user's profile.

### Platform Registration Behavior

**Web**
- Requires explicit opt-in via native browser permission dialog.
- Some browsers only show the prompt on a user gesture (click/keystroke) — requesting on page load is typically silenced.

**Android**

| Version | Behavior |
|---------|----------|
| Android 13+ | Permission must be explicitly requested; triggered manually or when a notification channel is created |
| Android 12 and earlier | Push token auto-generated on install; user is `Subscribed` after first session with a valid token |

**iOS**
- No push token is generated on install without opt-in.

| Version | Provisional Auth | Behavior |
|---------|-----------------|----------|
| iOS 12+ | Yes | Standard opt-in gives foreground push; provisional authorization allows silent background push to notification center without explicit opt-in |
| iOS 11 and earlier | No | Explicit opt-in required; token generated only after permission granted |

### Checking Push Subscription State

Two methods:
1. **Braze Dashboard** — User Search page → user profile → Engagement tab (view and manually adjust subscription state)
2. **REST API** — Export via `POST /users/export/segment` or `POST /users/export/ids`; response includes a push tokens object
