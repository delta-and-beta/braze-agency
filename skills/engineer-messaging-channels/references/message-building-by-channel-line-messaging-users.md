---
name: message-building-by-channel-line-messaging-users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/messaging_users
indexed_at: '2026-04-05'
keywords:
  - LINE
  - triggers
  - campaign
  - canvas
  - messaging
  - inbound
  - action-paths
  - responses
  - templated
  - matching
triggers:
  - set up LINE triggers
  - create LINE campaigns
  - configure action paths
  - handle unrecognized responses
  - send templated LINE messages
---
## LINE Messaging Users

LINE is a two-way communication channel supporting inbound message triggers, templated campaigns, and Canvases.

---

### Action-Based Triggers

Create campaigns or Canvases that fire when a user sends an inbound LINE message containing a **trigger word**.

**Campaign:** Set trigger words in the action-based delivery scheduling step.

**Canvas:** Set trigger words inside [Action Paths](https://www.braze.com/docs/user_guide/engagement_tools/canvas/canvas_components/action_paths).

**Requirements:**
- Trigger words must be **fully capitalized** when building the campaign/Canvas (e.g., `JOIN2023`)
- Braze matches inbound messages case-insensitively — `jOin2023` will still trigger `JOIN2023`
- If **no trigger word** is set, the campaign/Canvas fires for *all* inbound LINE messages, including those already matched — users may receive duplicate messages

---

### Unrecognized Responses

For interactive Canvases, add a catch-all action group to handle messages that match no trigger.

**How to set up:**
1. After defining all custom filter phrase action groups in the action path, add one more action group
2. Select **Send LINE message** but do **not** check **Where the message body**
3. This catches all unrecognized inputs (acts as an `else` clause)

**Recommended message content:** Inform users the channel is not monitored by a human and direct them to a support channel if needed.

---

### Key Behaviors Summary

| Scenario | Result |
|---|---|
| No trigger word set | Fires for all inbound LINE messages |
| Trigger word set, case mismatch | Still matches (case-insensitive) |
| Message matches multiple active campaigns | User receives multiple LINE messages |
| No action group matches user input | Falls through to unrecognized-response group (if configured) |
