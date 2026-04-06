---
name: push-notifications-subscription-states
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/subscription_states
indexed_at: '2026-04-05'
keywords:
  - push-subscription
  - subscription-state
  - push-enabled
  - device-token
  - opted-in
  - segmentation
  - push-permissions
  - foreground-push
triggers:
  - how to set push subscription state
  - configure push notification permissions
  - segment users by push preferences
  - check if user is push enabled
  - handle push token expiry
---
# Push Subscription States

Braze tracks two separate permission layers for push messaging: the **push subscription state** (user preference) and the **push enabled status** (device token availability).

## Subscription States

| State | Description |
|-------|-------------|
| `opted_in` | User explicitly opted in to push |
| `subscribed` | Default state; user has not opted in or out |
| `unsubscribed` | User explicitly opted out |

Users in `subscribed` state can receive push if they have a valid push token and have granted OS-level permission.

## Push Enabled vs. Subscription State

These are independent concepts:

- **Push enabled** — the device has a valid push token AND OS-level permission is granted
- **Subscription state** — the user's explicit preference recorded in Braze

A user can be `opted_in` but not push-enabled (e.g., revoked OS permissions). Braze will only deliver push if both conditions allow it.

## Foreground Push Enabled

A user is considered **foreground push enabled** when:
1. They have a push token registered with Braze
2. The OS has granted push permission for the app

Check via the REST API or `Users.subscription.push` filter in segmentation.

## Setting Subscription State

### SDK

```swift
// iOS
Braze.sharedInstance()?.user.setPushNotificationSubscriptionType(.optedIn)
```

```kotlin
// Android
Braze.getInstance(context).currentUser?.setPushNotificationSubscriptionType(NotificationSubscriptionType.OPTED_IN)
```

### REST API

```bash
POST /users/track
{
  "attributes": [{
    "external_id": "user_id",
    "push_subscribe": "opted_in"  // "opted_in" | "subscribed" | "unsubscribed"
  }]
}
```

## Segmentation Filters

| Filter | Behavior |
|--------|----------|
| `Push Enabled` | Has valid token + OS permission |
| `Push Subscription State` | Filter by opted_in / subscribed / unsubscribed |
| `Push Enabled for App` | Push enabled for a specific app |

## Key Behaviors

- **iOS**: OS permission prompt controls push enablement; Braze subscription state is separate
- **Android 13+**: Runtime permission required (like iOS); prior versions auto-grant
- **Web push**: Follows browser permission model; subscription state tracked independently
- **Token expiry**: If a token goes stale, the user becomes push-disabled regardless of subscription state

## Default State Logic

- New users start as `subscribed`
- Braze does **not** automatically change subscription state when OS permissions are revoked — only the push-enabled status changes
- Use `opted_in` only when you have explicit user consent (e.g., a soft prompt acceptance)
