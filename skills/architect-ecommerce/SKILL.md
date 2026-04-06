---
name: architect-ecommerce
description: >-
  Architecture design for e-commerce ecosystems including storefront platforms,
  mobile commerce, and product discovery systems.
metadata:
  role: braze-architect
  topics:
    - ecommerce-tapcart
    - ecommerce-mobile-app-platform
    - ecommerce-mobile-app-platform-poq
    - ecommerce-product-search-recommendations
    - product-search-recommendations-stylitics
    - product-search-recommendations-constructor
    - product-search-recommendations-algolia
    - ecommerce-shopify
    - shopify-shopify-overview
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes that descriptions should describe **when to use** the skill (triggering conditions), not summarize its workflow. For a domain skill like this one, the goal is different — it's a reference guide, not a discipline enforcer, so the structure is more about organizing knowledge for retrieval than bulletproofing against rationalization.
`─────────────────────────────────────────────────`

Here is the generated SKILL.md body:

---

# E-commerce Platform Architecture

## Overview

This skill covers architecture design for modern e-commerce ecosystems as they integrate with Braze. It synthesizes knowledge across the key platform layers that together form a commerce stack: the core storefront, product discovery, mobile commerce, and visual merchandising.

**Lens:** Platform integration patterns, data model design, and cross-system event architecture.

Use this skill when designing how e-commerce platforms connect to Braze — including which events to instrument, how product data flows across systems, and how mobile and web commerce channels align in a unified customer data model.

## When to Use

- Designing Braze integration architecture for a Shopify-based storefront
- Choosing or evaluating product search/discovery partners (Algolia, Constructor)
- Adding mobile commerce capabilities via a native app platform (Tapcart, Poq)
- Mapping product catalog and recommendation data (Stylitics) into Braze event schemas
- Architecting cross-channel commerce journeys that span web, mobile app, and search

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| **Shopify Integration Overview** | Core Shopify platform capabilities, merchant tooling, and standard integration model |
| **Shopify E-commerce Overview** | Third-party tagging patterns (e.g. GTM), data layer structure, and event instrumentation |
| **Algolia Product Search Partner** | API-first search/discovery, relevance configuration, and search event schema |
| **Constructor Product Search Partner** | AI-driven search and recommendation engine, ML-based personalization signals |
| **Stylitics Product Recommendations Partner** | Visual merchandising and outfit-based recommendations, product affinity data |
| **Product Search & Recommendations Overview** | Cross-platform synthesis of discovery patterns and recommendation event models |
| **Tapcart Mobile Commerce Partner** | Shopify-native mobile app platform, push and in-app engagement, mobile event capture |
| **Poq Mobile App Platform Partner** | Enterprise-grade iOS/Android apps, deep Braze integration, commerce event instrumentation |
| **Mobile App Platform Overview** | Cross-platform synthesis of mobile commerce architecture patterns |

## Platform Architecture Lens

### Integration Patterns

Modern commerce stacks are **composable**: Shopify provides the transactional core, while search (Algolia, Constructor), recommendations (Stylitics), and mobile (Tapcart, Poq) are layered on top. Each layer emits its own events.

Key architectural question: **Which platform owns the authoritative event, and how does it reach Braze?**

```
Storefront (Shopify)
    │ product_viewed, cart_updated, purchase
    ▼
Tag Layer (GTM / pixel)
    │ normalizes + forwards events
    ▼
Braze (via SDK or server-to-server)

Search Layer (Algolia / Constructor)
    │ search_performed, click, conversion
    ▼
Braze (separate ingestion path)

Mobile Layer (Tapcart / Poq)
    │ app_open, push_open, product_viewed
    ▼
Braze SDK (direct, native integration)
```

Avoid duplicate event ingestion — establish a single canonical source for each event type per channel.

### Data Model Design

Product data must be consistent across all layers. Establish a shared **product ID namespace** (typically Shopify `product_id` or `variant_id`) used as the join key across:

- Braze catalog items
- Algolia/Constructor index records
- Stylitics outfit components
- Mobile app deep links

Catalog sync frequency and attribute fidelity (price, availability, image URLs) should be designed at the architecture phase, not retrofitted.

### Cross-System Event Architecture

Each partner platform fires its own events. The architect's job is to:

1. **Identify overlap** — `product_viewed` may fire from Shopify storefront AND Tapcart AND search click. Decide which is canonical.
2. **Map to Braze schema** — Normalize partner-specific fields to shared Braze event property names.
3. **Sequence dependencies** — Recommendation click events (Stylitics, Constructor) should carry the originating placement context as an event property so Braze can attribute downstream conversions.

## Quick Reference

| Partner | Primary Braze Integration Point | Key Events |
|---------|--------------------------------|------------|
| Shopify | Server-to-server or GTM pixel | `purchase`, `cart_updated`, `checkout_started` |
| Algolia | Custom connector or Segment | `search_performed`, `result_clicked`, `converted` |
| Constructor | Webhook or direct API | `search`, `click`, `add_to_cart` |
| Stylitics | JavaScript SDK → custom event | `outfit_viewed`, `item_clicked` |
| Tapcart | Native Braze SDK | `app_open`, `push_received`, `product_viewed` |
| Poq | Braze SDK (deep integration) | Full lifecycle mobile events |

## Common Mistakes

- **Duplicate purchase events** from both Shopify webhook and GTM pixel — pick one server-side source of truth for transactional events
- **Inconsistent product IDs** between catalog, search index, and Braze event properties — define the canonical ID at project start
- **Missing mobile session attribution** — mobile app events need `campaign_id` or `canvas_id` carried through deep links to close the attribution loop
- **Search events without conversion context** — Algolia/Constructor click events should carry `query_id` so downstream purchases can be attributed to the search session
