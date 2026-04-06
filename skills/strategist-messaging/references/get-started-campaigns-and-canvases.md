---
name: get-started-campaigns-and-canvases
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/campaigns_and_canvases
indexed_at: '2026-04-05'
keywords:
  - campaigns
  - canvases
  - journey
  - messages
  - triggers
  - channels
  - A/B testing
  - email
  - push
  - orchestration
triggers:
  - how to create a campaign
  - setting up canvas journeys
  - sending multi-channel messages
  - A/B testing message versions
  - orchestrating customer flows
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick are "atomic knowledge units" — they should be self-contained and scannable, not narrative docs
- Jekyll template tags like `{{site.baseurl}}` and `{% alert %}` blocks are boilerplate noise that should be stripped
- The goal is density: preserve facts, remove prose scaffolding
`─────────────────────────────────────────────────`

## Campaigns and Canvases

**Campaigns** are single-message steps for targeted delivery to a group of users. **Canvases** are multi-step journey orchestration tools for ongoing customer flows.

Use campaigns for simple, one-off messages. Use Canvas when user paths should branch based on behavior.

---

## Campaign Types

| Type | Use Case |
|---|---|
| **Regular** | Single or multi-channel targeted message; built with visual editors |
| **A/B / Multivariate** | Test up to 8 versions (copy, personalization) on a single channel |
| **API Campaign** | Timely messages triggered via API call; message/recipients/schedule set in the API, not the dashboard — for real-time transactional or breaking news |
| **Transactional Email** | Automated, non-promotional emails for agreed-upon transactions; speed-critical, single-user delivery *(select packages only)* |

Regular and A/B campaigns support **scheduled** (future date) or **action-triggered** (response to user behavior) delivery.

After sending, use built-in analytics and conversion events to measure performance.

---

## Canvas (Journey Orchestration)

A Canvas creates a continuous, branching conversation with users rather than sporadic messages. Users enter when they match a trigger condition and move through paths based on their actions or inactions.

**Canvas components:**
- **Messages** — send on any supported channel
- **Delays** — wait steps between actions
- **Experiments** — A/B test within a journey
- **Audience Sync** — integrate with Facebook, Google, TikTok

Canvas is especially effective for re-engaging users who drop off the conversion path.

Setup mirrors campaigns: define audience, entry conditions, send settings, and exit conditions.

---

## Supported Messaging Channels

| Channel | Description |
|---|---|
| **Email** | Personalized emails to user inboxes |
| **Mobile Push** | Notifications to mobile devices |
| **Web Push** | Browser notifications, even when user is off-site |
| **In-App Messages** | Displayed while user is actively in the app |
| **SMS / MMS / RCS** | Text messages to users' phones |
