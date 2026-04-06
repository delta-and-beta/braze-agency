---
name: engagement-tools-messaging-fundamentals-delivery-types
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/delivery_types
indexed_at: '2026-04-05'
keywords:
  - Scheduled
  - Action-Based
  - API-Triggered
  - Campaigns
  - Canvases
  - Events
  - Triggers
  - Delivery
triggers:
  - how to schedule a campaign
  - trigger messages on user actions
  - send messages via API
  - set up action-based delivery
  - canvas entry types and windows
---
## Delivery Types

Braze supports three delivery/entry types for campaigns and Canvases:

| Type | Use Case |
|------|----------|
| **Scheduled** | One-off or time-based sends; supports immediate, designated time, or Intelligent Timing |
| **Action-Based** | Event-triggered sends when a user completes a specific action |
| **API-Triggered** | Server-initiated sends; copy and rules managed in dashboard, trigger from your systems |

> Campaigns use the term **delivery type**; Canvases use **entry type** — same concept, different terminology.

---

### Scheduled

**Campaigns:** Send immediately on launch, at a designated time, or via [Intelligent Timing](https://www.braze.com/docs/user_guide/brazeai/intelligence/intelligent_timing/).

**Canvases:** Users enter on a time schedule — immediately on launch or at a designated time. Supports recurring frequencies (once, daily, weekly, monthly) with up to 30 designated entry times.

---

### Action-Based

Triggers on a user completing a specific action. After the trigger, delivery can be: immediately, after a delay, at a specific time, or at a future time.

**Canvas-specific — Entry Window:** Defines which users can enter the Canvas between a start time (and optional end time). Supports local time zone entry.

Example trigger actions for Canvases:
- Opening the app
- Adding an email address
- Entering a location

---

### API-Triggered

Delivery is initiated by your servers via API call. Dashboard controls copy, multivariate tests, and re-eligibility. The API request can include additional data for real-time message templating.

| Context | Endpoint | ID Returned |
|---------|----------|-------------|
| Campaign | `/campaigns/trigger/send` | Campaign ID |
| Canvas | `/canvas/trigger/send` | Canvas ID |
