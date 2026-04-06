---
name: engagement-tools-testing-race-conditions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/race_conditions
indexed_at: '2026-04-05'
keywords:
  - async
  - sync
  - concurrency
  - messaging
  - campaigns
  - canvas
  - events
  - attributes
  - timing
  - endpoints
triggers:
  - how to prevent race conditions in Braze
  - handling timing issues with user creation
  - synchronizing API calls and events
  - fixing message delivery failures from race conditions
  - preventing campaign triggers from missing audiences
---
# Race Conditions in Braze

A race condition occurs when an outcome depends on the sequence or timing of multiple events — when events compete to access shared resources and the order is non-deterministic.

In Braze, race conditions arise when multiple actions are triggered simultaneously based on user data or events (e.g., a user signing up triggers both a campaign and attribute update, but neither is guaranteed to arrive first).

---

## Scenario 1: Targeting New Users

**Problem:** When a user is created and immediately targeted for a message/event/attribute, the second action may process before the user profile exists — resulting in the message never being sent or the attribute being logged to a non-existent profile.

**In-app messages:** Must be cached in the SDK (typically at session start) before they can be triggered. If the trigger event is part of onboarding, the user may never see the message.

**Best practices:**
- Add a delay (e.g., 24 hours for promo offers, 1 minute minimum) after user creation before targeting
- Delays can be added via the Braze SDK for custom events that trigger Canvas entry

---

## Scenario 2: Multiple API Endpoints

**Problem:** Braze uses **asynchronous processing** — API calls sent separately are **not guaranteed to be processed in order**. Common race conditions occur when:
- Using separate endpoints to create users and trigger Canvases/campaigns
- Making multiple calls to `/users/track` for attributes, events, or purchases

`/users/track` may take seconds to process, so simultaneous calls to `/users/track` and `/campaign/trigger/send` may send a message before user data is updated.

> **Note:** If attributes and events are sent in the **same** request (via `/users/track` or SDK), Braze processes attributes **before** events or messages.

**Best practices:**

| Approach | Description |
|----------|-------------|
| Stagger requests | Wait for each request to complete before starting the next |
| Bundle data with trigger | Include `user_attributes` and `trigger_properties` in a single [`/campaign/trigger/send`](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_triggered_campaigns) call — attributes are processed before the message fires |
| Use sync endpoint | [`/users/track/sync/`](https://www.braze.com/docs/api/endpoints/user_data/post_user_track_synchronous) processes events/attributes **synchronously**, preventing race conditions (beta) |

> **Key:** `trigger_properties` do **not** update the user profile — they are only available in message context.

---

## Scenario 3: Action-Based Triggers + Audience Filters

**Problem:** When a campaign/Canvas uses the **same event as both the trigger and an audience filter** (e.g., trigger = "made purchase", filter = "has made any purchase"), the user may not yet be in the audience at trigger time — so they never receive the message.

**Best practices:**
- **Add delivery validations** in Canvas Message steps to re-check audience criteria at send time
- **Use exit criteria** to remove users who no longer qualify during a journey
- **Use exit events** in campaigns to abort sends during a delay if conditions change
- **Avoid redundant filters** that mirror the trigger — this is the safest approach
- **Avoid filters that assume the trigger has already been applied** to the user profile

---

## Quick Reference

| Scenario | Root Cause | Fix |
|----------|-----------|-----|
| New user targeting | Profile doesn't exist yet | Add creation delay |
| Multiple API calls | Async processing, no order guarantee | Stagger calls or bundle into one |
| Trigger = audience filter | User not in segment at trigger time | Remove redundant filter or use delivery validation |
