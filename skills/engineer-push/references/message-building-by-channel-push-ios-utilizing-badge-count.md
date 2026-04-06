---
name: message-building-by-channel-push-ios-utilizing-badge-count
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/ios/utilizing_badge_count
indexed_at: '2026-04-05'
keywords:
  - badge
  - iOS
  - push
  - notification
  - engagement
  - foreground
  - personalization
  - icon
  - unread
  - re-engagement
triggers:
  - how to set badge count on iOS
  - configure badge count in push notifications
  - clear app badge
  - re-engage users with badges
  - silent badge update
---
## iOS Badge Count

The iOS badge count displays the number of unread notifications as a red circle in the upper-right corner of the app icon. Use it to re-engage users who missed a push or have disabled foreground push notifications, and to surface unviewed in-app updates.

### Setting the Badge Count

Configure the badge count when composing a push notification in the Braze dashboard. Supports user attribute personalization for dynamic values.

**Silent badge update** (no notification disturbance): Enable the `Content-Available` flag and leave the message body empty.

> Android: No configuration needed — Android handles app badging for push automatically.

### Clearing the Badge

- Set badge count to `0` or `""` to remove it from the app icon.
- Braze automatically clears the badge when a push notification is received while the app is in the foreground.

### Best Practices

| Practice | Rationale |
|----------|-----------|
| Keep count low (under 10) | Users disengage when counts go past double digits and may stop using the app entirely |
| Limit what the badge represents | Fewer meanings per badge = clearer UX and stronger familiarity with app features |

**Exception:** Email and group messaging apps may tolerate higher badge counts given user expectations in those contexts.
