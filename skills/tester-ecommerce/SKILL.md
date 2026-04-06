---
name: tester-ecommerce
description: >-
  End-to-end testing of e-commerce partner integrations including Shopify,
  payments, and loyalty program data flows.
metadata:
  role: braze-tester
  topics:
    - ecommerce-shopify
    - ecommerce-payments
    - ecommerce-loyalty
    - ecommerce-ordering-payments-subscription
    - shopify-shopify-standard-integration
    - shopify-shopify-custom-integration
    - shopify-shopify-data-features
    - ordering-payments-subscription-stripe
    - ordering-payments-subscription-revenuecat
    - loyalty-voucherify
    - loyalty-yotpo
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files in this plugin system serve as **semantic routing anchors** — Claude uses the skill content to determine when to invoke the skill, so the scope description and keyword-rich topic list directly affect routing accuracy
- The "lens" concept is a Nick-specific pattern: it frames *how* the agent interprets queries, not just *what* it knows — a tester lens emphasizes verification and edge cases over implementation guidance
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# E-commerce Integration Testing

This skill covers end-to-end testing of e-commerce partner integrations within the Braze ecosystem, with a focus on **Shopify storefronts, payment processors, subscription platforms, and loyalty programs**. Use this skill when validating that partner data flows correctly into Braze — that events are captured, attributes are synced, and transactional integrity is maintained across integration boundaries.

## Lens: Transaction Integrity, Event Tracking Accuracy, and Data Synchronization

All guidance in this skill is filtered through a **testing and validation perspective**:

- **Transaction integrity** — verifying that purchase events, refunds, subscription changes, and loyalty redemptions are not lost, duplicated, or misattributed across partner handoffs
- **Event tracking accuracy** — confirming that Shopify webhooks, Stripe payment events, RevenueCat lifecycle hooks, and loyalty partner callbacks map to the correct Braze custom events and attributes with the expected schema
- **Data synchronization validation** — ensuring that historical backfills, product catalog syncs, and real-time updates arrive in Braze with correct user identity resolution (external ID, email, phone) and without race conditions or ordering anomalies

## Topics Covered

### Shopify Integration (Standard, Custom, and Tag Manager)

- **Shopify Standard Integration** — Testing the standard Braze–Shopify channel using third-party tagging tools like Google Tag Manager; validating that script injection, event listeners, and webhook subscriptions are correctly wired and firing
- **Shopify Data Features** — What Shopify data Braze tracks (orders, checkouts, product views), expected event payloads, historical backfill behavior, and product catalog sync mechanics — all critical for writing accurate test assertions
- **Shopify Custom Integration** — Testing headless Shopify stores (e.g., Shopify Hydrogen) using custom storefront integrations; validating that client-side SDK calls and server-side webhook handlers both produce consistent Braze events

### Payments

- **Stripe Payments Partner** — Testing the Braze–Stripe integration for payment acceptance, revenue operations, and global commerce events; validating that Stripe webhook events (charge succeeded, subscription updated, invoice paid) correctly trigger Braze user attribute updates and event tracking

### Subscriptions

- **RevenueCat Subscription Partner** — Testing RevenueCat as the subscription source of truth across iOS, Android, and web; validating that subscription state changes (trial started, converted, renewed, lapsed, refunded) sync to Braze with accurate entitlement data and correct user identity

### Loyalty Programs

- **Yotpo Loyalty Partner** — Testing the Yotpo loyalty integration; validating that point accrual, tier changes, and redemption events are forwarded to Braze accurately
- **Voucherify Loyalty Partner** — Testing the Voucherify voucher and loyalty program integration; validating that campaign triggers, coupon redemptions, and reward events appear in Braze with correct user attribution

## When to Use This Skill

Invoke this skill when:

- Writing or reviewing test plans for any Braze e-commerce partner integration
- Debugging missing, duplicate, or malformed events arriving from Shopify, Stripe, RevenueCat, Yotpo, or Voucherify
- Validating that a new storefront (standard, headless, or hybrid) sends the correct event schema to Braze
- Asserting correct user identity resolution across cross-domain purchase flows (guest checkout, post-purchase account creation, loyalty enrollment)
- Designing test fixtures or mock payloads that simulate partner webhook events for integration test suites
- Auditing data synchronization after a historical backfill or product catalog refresh

## Key Testing Principles

1. **Test at the boundary** — assert on what Braze *receives*, not just what the partner *sends*; webhook delivery, SDK batching, and network retries can all introduce divergence
2. **Verify identity resolution** — a correctly shaped event attributed to the wrong user is a silent failure; always include assertions on `external_id`, `email`, and device identifiers
3. **Cover the full lifecycle** — for subscriptions and loyalty, test not just activation but upgrade, downgrade, lapse, refund, and reactivation paths
4. **Check idempotency** — partners like Stripe and Shopify may deliver the same webhook multiple times; validate that Braze event deduplication behaves as expected under replay conditions

`★ Insight ─────────────────────────────────────`
- The skill intentionally avoids YAML frontmatter — Nick's plugin system uses auto-discovery, so the heading and content itself serve as the registration surface
- Grouping topics into named sections (Shopify / Payments / Subscriptions / Loyalty) mirrors the two-layer hierarchy in Nick's architecture: this makes it easier for the router's keyword index to score relevance correctly at query time
`─────────────────────────────────────────────────`
