---
name: message-building-by-channel-line-line-users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/messaging_users
indexed_at: '2026-04-05'
keywords:
  - LINE
  - trigger-words
  - campaigns
  - canvases
  - action-paths
  - inbound-messages
  - templated-campaigns
  - unrecognized-responses
  - action-based-delivery
triggers:
  - how to set LINE trigger words
  - handling unrecognized LINE messages
  - LINE campaign and canvas setup
  - LINE action path configuration
  - LINE two-way messaging
---
## Messaging LINE Users

LINE is a two-way channel supporting conversations via templated campaigns and Canvases. Key features: trigger words for inbound messages and handling unrecognized responses.

---

## Action-Based Triggers

Create campaigns/Canvases that start or branch when a user sends an inbound LINE message containing a **trigger word**.

### Campaign
Set trigger words during action-based delivery scheduling.

### Canvas
Set trigger words inside [action paths](https://www.braze.com/docs/user_guide/engagement_tools/canvas/canvas_components/action_paths) within your Canvas.

### Trigger Word Requirements

| Rule | Detail |
|------|--------|
| Capitalization in builder | Every letter must be capitalized when building (e.g., `JOIN2023`) |
| Capitalization from user | Case-insensitive — `jOin2023` still triggers `JOIN2023` |
| No trigger word set | Campaign/Canvas fires for **all** inbound LINE messages |

> **Warning:** If no trigger word is set and messages match multiple active campaigns/Canvases, the user receives multiple LINE messages.

---

## Handling Unrecognized Responses

Interactive Canvases should always include a catch-all for unrecognized input to set user expectations.

### Setup

1. Create action groups for your custom trigger phrases.
2. Add an additional action group to the action path for **Send LINE message**.
3. Do **not** check **Where the message body** — this catches everything else (acts as an `else` clause).
4. Send a message informing the user the channel is not human-monitored and directing them to a support channel if needed.
