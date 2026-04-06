---
name: message-building-by-channel-line-line-users-subscription-groups
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/line_users/subscription_groups
indexed_at: '2026-04-05'
keywords:
  - subscription
  - channel
  - follow
  - unfollow
  - integration
  - group
  - messaging
  - status
  - state
  - workspace
triggers:
  - manage LINE subscriptions
  - configure subscription groups
  - handle follow events
  - send LINE messages
  - set up LINE integration
---
## LINE Subscription Groups

LINE users have two subscription states: **subscribed** and **unsubscribed**.

| State | Definition |
|-------|------------|
| **Subscribed** | User followed the LINE channel within the LINE app. Auto-subscribed upon follow after integration is complete. |
| **Unsubscribed** | User never followed, or explicitly unfollowed, the LINE channel. Unsubscribed users receive no LINE messages from any sending channel in that subscription group. |

**Limits:** Up to 100 subscription groups per workspace; each group connects to one LINE channel.

**Subscription state ownership:** LINE hosts subscription status. Braze processes follow/unfollow events to keep status current — there is no manual override from the Braze side.
