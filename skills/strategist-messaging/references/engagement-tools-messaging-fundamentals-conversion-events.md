---
name: engagement-tools-messaging-fundamentals-conversion-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/conversion_events
indexed_at: '2026-04-05'
keywords:
  - conversion
  - event
  - campaign
  - tracking
  - purchase
  - channel
  - deadline
  - metrics
  - recipient
  - variation
triggers:
  - how to set up conversion events
  - track campaign performance
  - measure conversion success
  - understand conversion deadlines
  - configure multi-channel conversions
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are **atomic knowledge units** — they live in `skills/{skill-name}/references/` and are designed to be fast-lookup documents for the Default routing depth (Sonnet). Keeping them self-contained is key because at runtime they may be loaded without surrounding context.
`─────────────────────────────────────────────────`

## Conversion Events

A **conversion event** tracks whether a message recipient performs a high-value action within a set time window. Used as success metrics for campaigns and Canvases.

---

### Conversion Tracking Rules

| Scenario | Behavior |
|---|---|
| Single-channel campaign | Per-user, not per-device. One conversion per user per event, even across multiple devices. |
| Multichannel campaign | Per-channel. User can convert once per channel, so total conversion rate can exceed 100%. |
| Multiple campaigns | If a user converts within deadlines of two separate campaigns/Canvases, both count the conversion. |
| No open/click required | User counts as converted if they perform the action in the window, even without opening the message. |
| Canvas timing | Conversion deadline starts at Canvas entry, not at individual message timing. Conversions count even during delay steps. |

---

### Primary Conversion Event

The first event added during campaign/Canvas creation. Drives:
- Winning variation in multivariate/A/B tests
- Revenue calculation window
- Intelligent Selection message distribution adjustments

**Rate calculation:** `primary conversions / unique recipients`. A user becomes a recipient when the message is sent (push/email) or viewed (in-app messages, Content Cards).

> **Note:** `Liquid abort` tags abort messages only for variant users, not control groups — this skews conversion percentages. Use segmentation at campaign/Canvas entry instead.

---

### Conversion Event Types

| Type | Triggers When |
|---|---|
| **Starts Session** | User opens any specified app (default: all apps in workspace) |
| **Makes Purchase** | User records a Purchase event (any purchase, or specify product) |
| **Places Order** | User triggers the Order Placed eCommerce event (early access) |
| **Performs Custom Event** | User performs a specified custom event (must specify) |
| **Upgrade App** | User upgrades app version on specified app; numerical comparison attempted |
| **Opens Email** | User opens the email (email campaigns only) |
| **Clicks Email** | User clicks a link in the email (email campaigns only) |

**Limitation:** Nested properties are not supported. You cannot filter on `products[].product_code` — only top-level event properties.

---

### Setup

1. Create campaign for desired channel
2. Add up to **4 conversion events** — secondary/tertiary events enrich reporting significantly
3. Set **conversion deadline**: up to 30 days
4. View results on the campaign **Details** page

---

### Key Limits

- Max conversion events per campaign/Canvas: **4**
- Max conversion deadline window: **30 days**
- Multichannel conversion rates can exceed **100%** (by design)
