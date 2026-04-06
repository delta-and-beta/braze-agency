---
name: architect-messaging-api
description: >-
  Sends, schedules, and manages messages across channels including triggered
  campaigns, canvases, transactional messages, and live activities.
metadata:
  role: braze-architect
  topics:
    - endpoints-messaging-send-messages
    - endpoints-messaging-schedule-messages
    - endpoints-messaging-live-activity
    - endpoints-messaging-duplicate-messages
    - endpoints-messaging-post-send-triggered-canvases
    - endpoints-messaging-post-send-triggered-campaigns
    - endpoints-messaging-post-send-transactional
    - endpoints-messaging-post-send-messages
    - endpoints-messaging-post-create-send-ids
    - endpoints-messaging-post-update-scheduled-triggered-canvases
    - endpoints-messaging-post-update-scheduled-triggered-campaigns
    - endpoints-messaging-post-update-scheduled-messages
    - endpoints-messaging-post-schedule-triggered-canvases
    - endpoints-messaging-post-schedule-triggered-campaigns
    - endpoints-messaging-post-schedule-messages
    - api-api-campaigns
    - api-api-campaigns-transactional
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's skill files for plugins follow the reference skill pattern — they're consulted at query time rather than discipline-enforcing, so the structure prioritizes quick lookup tables and clear endpoint groupings over rationalization-resistance techniques.
- The "lens" concept in Nick's pipeline shapes *how* a skill frames identical facts — a `braze-architect` sees the same `/canvas/trigger/send` endpoint differently than an `engineer`: as an architectural decision point (when to use triggered vs scheduled delivery) rather than an implementation detail.
`─────────────────────────────────────────────────`

# Messaging API Endpoints

## Scope

This skill covers Braze's message delivery APIs: how to send, schedule, update, and cancel messages across campaigns and Canvases. It spans immediate triggered sends, future-scheduled sends, transactional email, live activity updates, and send ID management.

**Lens — Message delivery architecture and scheduling orchestration:** Decisions here concern *when* and *how* messages enter the delivery pipeline. The architectural tradeoffs are timing control vs. dashboard-managed content, real-time triggering vs. pre-scheduled batches, and transactional guarantees vs. standard campaign semantics.

---

## Delivery Model Overview

Braze separates message *content* (managed in the dashboard) from message *timing and targeting* (controlled via API). This separation is the foundation of all triggered and scheduled endpoints.

| Delivery Type | Content Location | Timing Control | Best For |
|---|---|---|---|
| API-triggered campaign | Dashboard | API at send time | Marketing with programmatic targeting |
| API-triggered Canvas | Dashboard | API at send time | Multi-step journeys with API entry |
| Transactional email | Dashboard template | API at send time | Receipt/confirmation emails |
| Scheduled send | Dashboard | API sets future time | Batch sends, time-optimized delivery |
| `/messages/send` direct | API payload | API at send time | Fully API-controlled content |

---

## Send Endpoints

### Immediate Sends

**`POST /campaigns/trigger/send`**
Send an API-triggered campaign immediately to specific users. Message content lives in the Braze dashboard; the API controls recipients and contextual data.

- Requires: `campaigns.trigger.send` API key permission
- Rate limit: Default Braze rate limit
- Key fields: `campaign_id`, `recipients[]`, `trigger_properties`
- Supports per-recipient `trigger_properties` for personalization without storing attributes

**`POST /canvas/trigger/send`**
Send a Canvas via API-triggered delivery. Canvas entry point must be configured as API-triggered in the dashboard.

- Requires: `canvas.trigger.send` API key permission
- Key fields: `canvas_id`, `recipients[]`, `canvas_entry_properties`
- Entry properties flow into the first Canvas step

**`POST /messages/send`**
Fully API-controlled send — content, recipients, and timing all specified in the request body. No dashboard campaign required.

- More flexible but bypasses Braze dashboard analytics for campaign-level reporting
- Use for low-volume transactional or programmatic messages where content varies per send

**`POST /transactional/v1/campaigns/{campaign_id}/send`**
Dedicated transactional email endpoint with delivery guarantees. Triggers a specific transactional email campaign.

- Designed for receipts, password resets, order confirmations
- Synchronous delivery confirmation in response
- Bypasses subscription state and frequency capping by design — use only for genuinely transactional content

---

## Schedule Endpoints

### Create Scheduled Sends

**`POST /campaigns/trigger/schedule/create`**
Schedule an API-triggered campaign for future delivery.

- Requires: `campaigns.trigger.schedule.create` permission
- Returns `schedule_id` for later update/delete operations
- Supports `in_local_time` for time-zone-aware delivery

**`POST /canvas/trigger/schedule/create`**
Schedule a Canvas entry for future delivery.

- Returns `schedule_id`
- Supports `in_local_time` and `at_optimal_time` delivery options

**`POST /messages/schedule/create`**
Schedule a fully API-controlled message (no dashboard campaign) for future delivery.

### Update Scheduled Sends

**`POST /campaigns/trigger/schedule/update`**
Update the schedule of an existing API-triggered campaign that was previously scheduled.

- Requires: `campaigns.trigger.schedule.update` permission
- Must reference the `schedule_id` from the create response

**`POST /canvas/trigger/schedule/update`**
Update the schedule for a previously scheduled Canvas entry.

- Requires: `canvas.trigger.schedule.update` permission

**`POST /messages/schedule/update`**
Update a scheduled `messages/send` request.

### Delete Scheduled Sends

- `POST /campaigns/trigger/schedule/delete` — cancel a scheduled campaign send
- `POST /canvas/trigger/schedule/delete` — cancel a scheduled Canvas entry
- `POST /messages/schedule/delete` — cancel a scheduled direct message send

---

## Send ID Management

**`POST /sends/id/create`**
Creates a reusable send ID for tracking message performance across multiple sends without creating a new campaign per send.

- Scoped to a specific campaign
- Enables per-send analytics (open rate, clicks) without campaign proliferation
- Rate limited: 100 send IDs per campaign

**Architectural use:** When sending personalized variants of a campaign at high volume, use send IDs to segment analytics without the overhead of individual campaigns.

---

## Live Activity Endpoints

Live Activities (iOS 16.1+) require a separate update mechanism after the initial push.

- **`POST /messages/live_activity/update`** — push a content update to an active Live Activity
- **`POST /messages/live_activity/start`** — start a Live Activity for a user (available via push-to-start)

Key constraint: Live Activity tokens expire; updates must occur while the activity is active on device.

---

## API Campaign Types

### Standard API-Triggered Campaigns
Dashboard manages creative, A/B test variants, re-eligibility, and frequency capping. API controls delivery timing and recipient list. Recommended default for marketing sends.

### Transactional API Campaigns
Specialized campaign type with bypassed frequency capping and subscription state. Appropriate only for messages users expect regardless of marketing preferences. Requires `transactional` campaign type enabled in dashboard.

---

## Duplicate Message Prevention

Braze does not deduplicate sends by default. To prevent duplicate delivery:

- Use idempotency keys where supported
- Track `schedule_id` values to avoid re-creating existing schedules
- For `/messages/send`, caller is responsible for deduplication logic
- Triggered campaign sends using the same `campaign_id` + `recipients` are **not** automatically deduplicated — each API call creates a new send

---

## Architectural Decision Guide

**When to use triggered vs. scheduled delivery:**
- Use triggered (`/trigger/send`) when the send event is reactive (user action, external event, webhook)
- Use scheduled (`/trigger/schedule/create`) when the send is predictive (appointment reminder, batch digest)

**When to use `/messages/send` vs. API-triggered campaigns:**
- Prefer API-triggered campaigns when content benefits from dashboard editing, A/B testing, or analytics aggregation
- Use `/messages/send` only when content must be fully dynamic per-send and dashboard management adds no value

**Rate limits apply per workspace** — high-volume triggered sends should account for the default rate limits and use send IDs or campaign-level batching where appropriate.

---

## Topics Synthesized

- Send Messages Overview
- Schedule Messages Overview
- Live Activity Endpoints
- Duplicate Messages
- POST Send Triggered Campaigns (`/campaigns/trigger/send`)
- POST Send Triggered Canvases (`/canvas/trigger/send`)
- POST Send Transactional Message
- POST Send Messages (`/messages/send`)
- POST Create Send IDs (`/sends/id/create`)
- POST Schedule Triggered Campaigns
- POST Schedule Triggered Canvases
- POST Schedule Messages
- POST Update Scheduled Triggered Campaigns
- POST Update Scheduled Triggered Canvases
- POST Update Scheduled Messages
- API Campaigns
- Transactional API Campaigns

`★ Insight ─────────────────────────────────────`
- The skill groups endpoints by *intent* (send vs. schedule vs. manage) rather than by URL path — this matches how a braze-architect thinks about delivery architecture, where the question "when should this message arrive?" drives endpoint selection, not alphabetical API listing.
- The "Duplicate Message Prevention" section exists because Braze's default no-dedup behavior is a common architectural footgun — surfacing it here prevents it from appearing only in incident post-mortems.
`─────────────────────────────────────────────────`
