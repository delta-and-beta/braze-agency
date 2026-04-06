---
name: engineer-campaign-building
description: >-
  Technical implementation of campaigns including delivery types, triggers,
  scheduling, API-triggered delivery, and rate limiting.
metadata:
  role: braze-engineer
  topics:
    - campaigns-getting-started
    - campaigns-getting-started-campaign-basics
    - campaigns-building-campaigns
    - campaigns-building-creating-campaign
    - campaigns-building-delivery-types
    - campaigns-building-triggered-delivery
    - campaigns-building-scheduled-delivery
    - campaigns-building-campaign-calendar
    - campaigns-building-api-triggered-delivery
    - campaigns-building-campaign-connector
    - campaigns-building-attribute-triggers
    - campaigns-building-rate-limiting
    - campaigns-faq
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files for Claude Code plugins use **progressive disclosure**: SKILL.md stays lean (1,500–2,000 words) and contains just the procedural core, while detailed topic references live in `references/` and are loaded only when needed. This keeps context overhead low for every invocation.
`─────────────────────────────────────────────────`

Here is the markdown body for the skill file:

---

# Campaign Building Engineering

## Scope and Purpose

This skill covers the technical implementation of Braze campaigns — from choosing the right delivery mechanism to configuring rate limits, API triggers, and connector logic. Apply this skill when building, configuring, or debugging any campaign delivery concern in Braze.

**This skill is the authoritative lens for:**
- Selecting and configuring campaign delivery types (scheduled, action-based, API-triggered)
- Setting up triggers — event-based, attribute-based, and campaign-connector-based
- Controlling message frequency with rate limiting and frequency capping
- Integrating server-side systems via API-triggered delivery
- Auditing scheduled campaigns via the content calendar

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| Campaign Basics | Structure, naming, channel selection, fundamental configuration |
| Campaign Delivery Types | Scheduled vs. action-based vs. API-triggered — when each applies |
| Scheduled Delivery | Time-based options: immediate launch, designated time, local time zone, Intelligent Timing |
| Triggered Delivery | Action-based campaigns that fire on user events (purchases, app opens, custom events) |
| API-Triggered Delivery | Server-side campaign dispatch with per-user personalization via trigger properties |
| Attribute Triggers | Firing campaigns when subscription state or custom attribute values change |
| Campaign Connector | Chaining campaigns — triggering one campaign from interactions with another |
| Rate Limiting | Capping messages per minute/hour to protect deliverability and infrastructure |
| Campaign Calendar | Visualizing, auditing, and managing all upcoming scheduled campaigns |
| Campaign Rate Limiting | Frequency capping rules that apply across channels and time windows |
| Campaigns FAQ | Edge cases: multichannel setup, re-eligibility, local time zone handling |
| Getting Started | Initial setup prerequisites and workspace configuration |

---

## Delivery Type Selection

Choose the delivery type based on the triggering model:

| If the campaign fires... | Use |
|---|---|
| On a predetermined date/time | **Scheduled Delivery** |
| When a user performs a specific action | **Action-Based (Triggered) Delivery** |
| When a server-side event occurs | **API-Triggered Delivery** |
| When a user attribute or subscription state changes | **Attribute Triggers** (action-based subtype) |
| When a user interacts with another active campaign | **Campaign Connector** |

Never mix delivery types after launch — switching requires cloning and re-launching.

---

## Scheduled Delivery

Configure time-based delivery with one of four options:

1. **Send immediately** — launches as soon as the campaign is activated.
2. **Designated time** — select a specific date and time; optionally target user local time zones (note: messages may trickle over 24 hours).
3. **Intelligent Timing** — Braze ML picks the optimal send time per user based on engagement history.
4. **Recurring** — supports daily, weekly, monthly cadences; configure an end date to avoid runaway sends.

When using **local time zone delivery**, schedule at least 24 hours in advance. Users without a resolved time zone receive the message at the designated fallback time.

---

## Action-Based (Triggered) Delivery

Action-based campaigns fire when a user performs a qualifying action. Configuration steps:

1. Set the **trigger action** — custom event, purchase, session start, location trigger, or app open.
2. Configure **trigger filters** — narrow eligibility by event properties (e.g., `product_id == "sku_123"`).
3. Set the **delivery window** — optionally restrict delivery to certain hours (quiet hours).
4. Configure **re-eligibility** — by default users can only receive the campaign once; enable re-eligibility with a cooldown window for repeat triggers.
5. Set **conversion events** — attach 1–4 conversion tracking events to measure campaign effectiveness.

**Exception delivery** lets the campaign exit users mid-funnel if they perform a cancellation event (e.g., completed purchase before the cart-abandon message sends).

---

## API-Triggered Delivery

Use API-triggered campaigns when the send decision originates on a server (transactional receipts, alerts, server-detected achievements).

**Setup flow:**
1. Build the campaign in the Braze dashboard — set delivery type to **API-Triggered**.
2. Copy the **campaign ID** from the campaign settings panel.
3. Call the `/campaigns/trigger/send` endpoint with:
   - `campaign_id`
   - `recipients` array (external user IDs or aliases)
   - Optional `trigger_properties` object — values are available in message templates as `api_trigger_properties.${property_name}`

**Key constraints:**
- API-triggered campaigns still obey the audience segment set in the dashboard. Users not in the target segment are silently skipped.
- Use `broadcast: true` cautiously — it sends to the full target segment without per-user recipient specification.
- `trigger_properties` are ephemeral per-send; they are not persisted as user attributes.

For persistent per-user data, write attributes to the user profile before triggering; for send-specific dynamic content, use `trigger_properties`.

---

## Attribute Triggers

Configure attribute triggers inside an action-based campaign by selecting **Change Custom Attribute Value** or **Change Subscription State** as the trigger action.

Supported attribute types for triggers:
- Boolean custom attributes (changed to true/false)
- String custom attributes (changed to a specific value)
- Subscription group state (subscribed/unsubscribed)

**Important limitation:** Attribute triggers fire only on changes made via the SDK or REST API — not on changes made inside the Braze dashboard. Validate the update source before debugging missing trigger fires.

---

## Campaign Connector

Campaign Connector lets a completed user interaction with Campaign A trigger enrollment in Campaign B.

To configure:
1. In Campaign B, set delivery type to **Action-Based**.
2. Select trigger: **Interact With Campaign** → choose Campaign A.
3. Select the interaction type: received, opened, clicked, converted.

Use connectors to build multi-step manual sequences when Canvas is unavailable or overkill. For complex branching journeys, prefer Canvas — Campaign Connector has no branching logic.

---

## Rate Limiting

Apply rate limiting to protect sending infrastructure and inbox reputation. Configure at the campaign level under **Delivery Settings → Rate Limiting**.

**Message rate cap** — limits messages per minute or hour:
- Useful for large lists where ISP throttling is a concern.
- Campaign delivery spreads across time to stay under the cap.
- Set conservatively: a 1M-user list at 10k/hour takes 100 hours.

**Frequency capping** — limits how many messages a user receives across campaigns within a time window:
- Configured globally under **Settings → Global Message Settings**.
- Applies across all campaigns and Canvases unless the campaign is marked as high-priority (which bypasses the cap).
- Frequency caps apply per channel independently — an email cap does not count against push.

**Rate limiting + frequency capping together**: Rate limiting controls throughput speed; frequency capping controls per-user message exposure. Configure both for high-volume transactional programs.

---

## Campaign Calendar

Access the Content Calendar at **Campaigns → Content Calendar** to audit upcoming scheduled campaigns.

Use the calendar to:
- Identify overlapping send windows that may cause frequency cap collisions.
- Audit recurring campaigns that should have been stopped.
- Review campaign distribution across time before launching new campaigns.

The calendar shows scheduled delivery campaigns only — action-based and API-triggered campaigns do not appear because their send times are indeterminate.

---

## Creating a Campaign — Checklist

To create a campaign correctly, complete each configuration area before activation:

- [ ] **Channel** — Email, push, SMS, in-app message, content card, or webhook.
- [ ] **Audience** — Segment filter + optional entry controls (re-eligibility, global frequency cap override).
- [ ] **Delivery type** — Scheduled, action-based, or API-triggered.
- [ ] **Message content** — Linked to a template or composed inline.
- [ ] **Conversion events** — At least one primary conversion event attached.
- [ ] **Campaign name** — Use a consistent naming convention for calendar and analytics clarity.
- [ ] **Send test** — Send a test message to a seed address or test device before activation.
- [ ] **Launch review** — Verify estimated audience size in the **Review** step before clicking **Launch Campaign**.

---

## Multichannel Campaigns

To include multiple channels in a single campaign, add message variants at the **Message** step. Each channel has independent content but shares the same audience, delivery settings, and conversion tracking.

**Constraint:** All channels in a multichannel campaign share the same delivery type. To use different delivery types per channel (e.g., push on trigger + email on schedule), use separate campaigns or a Canvas.

---

## Reference Files

For full topic detail, consult the references in this skill's `references/` directory:

- **`references/rate-limiting.md`** — Complete rate limiting and frequency capping configuration options
- **`references/triggered-delivery.md`** — Full action-based delivery configuration, exception events, and re-eligibility patterns
- **`references/api-triggered-delivery.md`** — Complete API-triggered endpoint specs and trigger_properties patterns
- **`references/attribute-triggers.md`** — Supported attribute types and known constraints
- **`references/campaign-connector.md`** — Campaign Connector setup and limitations
- **`references/scheduled-delivery.md`** — All scheduling modes including Intelligent Timing
- **`references/campaign-calendar.md`** — Calendar navigation and audit workflow
- **`references/campaigns-faq.md`** — Edge cases, re-eligibility rules, multichannel constraints

---

`★ Insight ─────────────────────────────────────`
The skill body deliberately **stops short of raw API docs** — endpoint signatures and property schemas belong in `references/api-triggered-delivery.md`, not in SKILL.md. This way the skill loads ~1,800 words of procedural guidance every time it's triggered, while endpoint-level details only load when explicitly needed. The checklist and selection table near the top front-load the most reused decision logic so Claude hits those patterns first on any campaign task.
`─────────────────────────────────────────────────`
