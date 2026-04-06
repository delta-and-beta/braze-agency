---
name: legacy-ios-push-silent-push-notifications
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/silent_push_notifications
indexed_at: '2026-04-05'
keywords:
  - silent-push
  - content-available
  - background-work
  - remote-notifications
  - APNs
  - uninstall-tracking
  - geofences
  - payload
  - iOS
  - background-mode
triggers:
  - how to send silent push notifications
  - enable background work with push
  - set content-available flag
  - silent notification limitations
  - uninstall tracking setup
---
# Silent Push Notifications

Silent push notifications contain no alert message or sound — they trigger background work or update your app's interface without notifying the user.

## When to Use

- Sporadic but immediately important content where background fetch delays are unacceptable
- More efficient than background fetch — app only launches when necessary
- Rate-limited by iOS/APNs automatically; safe to send as needed (throttled notifications delay until next keep-alive packet)

## Sending Silent Push Notifications

Set `content-available: 1` in the push payload. Include payload data to avoid extra network requests.

> **Warning:** Do not include both a `title` and `body` when `content-available=1` — this causes undefined behavior. For truly silent notifications, omit both title and body.

The `content-available` flag can be set via:
- Braze dashboard → push composer → **Settings** tab → "content-available" checkbox
- [Apple push object](https://www.braze.com/docs/api/objects_filters/messaging/apple_object/) in the Messaging API

## Triggering Background Work

Silent push can wake an app from **Suspended** or **Not Running** state.

**Setup:**
1. Set `content-available: 1` with no message or sound
2. In Xcode → project settings → **Capabilities** tab → enable **Remote Notifications** background mode

**Limitations:**
- If the user **force-quit** the app, the system will not relaunch it — user must manually open it or reboot the device
- Background mode for remote notifications is required for uninstall tracking

Relevant Apple delegate method: `application:didReceiveRemoteNotification:fetchCompletionHandler:`

## iOS Silent Notification Limitations

iOS may gate silent notifications, which affects these Braze features:

| Feature | Behavior |
|---|---|
| Uninstall Tracking | Silent nightly push sent to detect uninstalls |
| Geofences | Silent sync of geofence data from server to device |

If these features malfunction, iOS's silent notification gating is a likely cause. See Apple's [unreceived notifications](https://developer.apple.com/library/content/technotes/tn2265/_index.html) documentation.

`★ Insight ─────────────────────────────────────`
- The Liquid/Jekyll template tags (`{% multi_lang_include %}`, `{% alert %}`, `{% image_buster %}`) are Braze's doc platform artifacts — stripping them produces cleaner reference content without losing any technical information
- The table's `role="presentation"` and CSS class attributes are HTML rendering hints for the Braze docs site; they carry no semantic meaning in a standalone markdown reference
- Internal cross-reference links (`{{site.baseurl}}/...`) are replaced with descriptive text since they're only resolvable within the Braze docs site context
`─────────────────────────────────────────────────`
