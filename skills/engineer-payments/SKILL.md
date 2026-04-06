---
name: engineer-payments
description: >-
  Technical integration of payment processors, subscription management
  platforms, and order fulfillment systems.
metadata:
  role: braze-engineer
  topics:
    - ecommerce-ordering-payments-subscription
    - ecommerce-payments
    - ordering-payments-subscription-stripe
    - ordering-payments-subscription-revenuecat
    - ordering-payments-subscription-recurly
    - ordering-payments-subscription-olo
    - ordering-payments-subscription-narvar
    - ecommerce-payments-transcend
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes **Claude Search Optimization (CSO)** — for reference skills like this one, the key is using concrete trigger words (partner names, event types, error patterns) that Claude would naturally search for. The "lens" framing is what makes a plugin skill useful: it's not just "here's what Stripe does" but "here's how Stripe data flows *into Braze*."
`─────────────────────────────────────────────────`

# Payments & Subscription Engineering

## Overview

This skill covers the technical integration of payment processors, subscription platforms, and order fulfillment systems with Braze. Use it when building or debugging data flows that carry payment events, subscription lifecycle changes, or order status updates into Braze for use in campaigns, user profile enrichment, and lifecycle messaging.

The lens here is **inbound data engineering**: how webhook payloads are received, normalized, and forwarded to Braze — not payment processing itself.

## When to Use This Skill

Use this skill when:
- Mapping Stripe webhook events (`customer.subscription.created`, `payment_intent.succeeded`, `invoice.payment_failed`) to Braze custom events or attributes
- Configuring RevenueCat or Recurly to emit subscription lifecycle events into Braze
- Syncing Olo order data or Narvar post-purchase tracking events to Braze user profiles
- Handling Transcend data subject requests that span payment and subscription records
- Designing the event schema for subscription upgrades, downgrades, churn, or payment recovery flows
- Debugging missing or delayed payment/order events in Braze

**Not for:** Stripe API payment processing itself, in-app purchase implementation, or front-end checkout UX.

## Integration Partners

### Stripe — Payment Processing
Stripe emits webhooks for payment intents, invoices, customers, and subscriptions. In the Braze context, the integration centers on forwarding these events to Braze via the `/users/track` endpoint or a middleware service. Key event mappings:

- `payment_intent.succeeded` → Braze custom event (`purchase` or domain-specific)
- `invoice.payment_failed` → trigger dunning/recovery canvas
- `customer.subscription.updated` → update subscription tier attribute on user profile

Stripe's idempotency keys matter here — deduplication is your responsibility before forwarding to Braze.

### RevenueCat — Mobile Subscription Management
RevenueCat is the canonical subscription status source for iOS/Android apps. It provides a webhook integration and a direct Braze integration that syncs subscriber attributes (`rc_active_entitlements`, `rc_billing_issues_detected`, etc.) and fires Braze custom events on lifecycle transitions (trial started, subscription renewed, cancellation).

Key pattern: RevenueCat manages entitlement state; Braze consumes it for segmentation and triggering. Avoid duplicating subscription state in Braze attributes that RevenueCat already manages.

### Recurly — B2B Subscription Billing
Recurly automates subscription lifecycle at scale and offers webhook push notifications for account, subscription, invoice, and payment events. For Braze integration, map Recurly's `new_subscription_notification` and `canceled_subscription_notification` to Braze subscription group state changes or canvas entry events.

Recurly's hosted pages and account management flows can emit events that need to be correlated to Braze's `external_id` — ensure the account code or email is used consistently as the identifier.

### Olo — Restaurant Ordering Platform
Olo enables real-time order data to flow into Braze via webhooks. Use cases include post-order messaging (receipts, upsells, loyalty prompts) and user profile enrichment with order history attributes. Olo order events carry guest identifiers that must be mapped to Braze `external_id` or `alias` — this mapping is a common integration pain point.

Key event: `order.fired` (order placed and confirmed) → trigger Braze transactional message canvas.

### Narvar — Post-Purchase Tracking
Narvar posts shipping and delivery status events that feed Braze order tracking messages. Integration pattern: Narvar webhook → transform payload → Braze `/users/track` with `order_id`, carrier, and estimated delivery as event properties. Use these properties in Liquid to personalize shipment notification messages.

### Transcend — Data Privacy
Transcend handles data subject requests (DSRs) — erasure, portability, restriction — across integrated systems including payment processors. In the Braze context, a Transcend erasure request may require deleting Braze user profiles that hold payment-derived attributes. Coordinate Transcend's orchestration with Braze's user deletion API to ensure compliance completeness.

## Core Engineering Patterns

### Webhook Reliability
All payment webhooks require acknowledgment (HTTP 200) within a tight window (typically 5–30s). Use an async queue (e.g., SQS, Pub/Sub) to decouple receipt from Braze forwarding. Validate signatures before processing.

### Identifier Resolution
Payment systems use their own IDs (`stripe_customer_id`, `recurly_account_code`). Braze needs `external_id`. Maintain a mapping layer — either in your database or as a Braze alias — and resolve before every API call.

### Subscription Lifecycle State Machine
Model subscription state explicitly: `trialing` → `active` → `past_due` → `canceled` → `paused`. Braze attributes should reflect current state; Braze events should record transitions. Avoid deriving state from event history in Canvas logic.

### Idempotency and Deduplication
Payment providers may retry webhooks. Braze's `/users/track` is not fully idempotent for custom events. Implement deduplication at your ingestion layer using event IDs before forwarding.

## Key Data Fields

| Partner | Critical Fields | Braze Mapping |
|---|---|---|
| Stripe | `customer.id`, `subscription.status`, `invoice.amount_due` | external_id alias, subscription_status attribute, custom event property |
| RevenueCat | `app_user_id`, `entitlement_id`, `expiration_at_ms` | external_id, rc_* attributes (managed by RC SDK) |
| Recurly | `account.code`, `subscription.plan.code`, `subscription.state` | external_id, plan_code attribute |
| Olo | `order.id`, `customer.email`, `order.total` | external_id via email, purchase event |
| Narvar | `order_id`, `tracking_number`, `estimated_delivery` | custom event properties on shipment event |

`★ Insight ─────────────────────────────────────`
The identifier resolution table is the most operationally useful part of a reference skill like this — it answers the question engineers actually get stuck on ("what field do I use as the Braze external_id?") without requiring them to read full partner docs. Condensing cross-partner patterns into one table dramatically reduces lookup friction.
`─────────────────────────────────────────────────`
