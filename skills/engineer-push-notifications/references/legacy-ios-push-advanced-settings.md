---
name: legacy-ios-push-advanced-settings
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/customization/advanced_settings
indexed_at: '2026-04-05'
keywords:
  - badge
  - collapse
  - expiry
  - sound
  - extras
  - notification
  - alert
  - payload
  - customization
  - silent
triggers:
  - how to set push notification badges
  - configuring notification sounds
  - sending silent notifications
  - managing notification expiration
  - coalescing duplicate notifications
---
## Push Advanced Settings (iOS)

Access via **Settings** on the compose step when creating a push campaign.

---

### Key-Value Pairs (Extras)

Send custom string key-value pairs (`extras`) alongside push notifications. Define via dashboard or API. Available as key-value pairs in the `notification` dictionary passed to push delegate implementations.

---

### Alert Options

Dropdown of key-value pairs to adjust how the notification appears on-device.

---

### Content-Available Flag

Instructs devices to download new content in the background. Use when sending **silent notifications**.

---

### Mutable-Content Flag

Enables advanced receiver customization on iOS 10+. Automatically set when composing **rich notifications**, regardless of this checkbox.

---

### Badge Count

Set the app icon badge number using:
- A static number entered in the field
- Liquid syntax for conditional logic
- Programmatically via `applicationIconBadgeNumber` property
- Push notification payload

---

### Sounds

Enter a path to a sound file in the app bundle. If the file doesn't exist or `"default"` is entered, the default device alert sound is used.

---

### Collapse ID

Coalesces similar notifications — if multiple notifications share the same collapse ID, only the most recently received is shown. Follows Apple's coalesced notifications spec.

---

### Expiry

Sets an expiration time for the message. Braze retries delivery until this time if the device is offline. Default expiration: **30 days** if unset.

> Note: Push notifications that expire before delivery are **not** counted as failures or bounces.
