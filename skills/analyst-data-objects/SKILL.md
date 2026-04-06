---
name: analyst-data-objects
description: >-
  Defines the structure of API request/response objects including user
  attributes, events, purchases, messaging payloads, audiences, and scheduling.
metadata:
  role: braze-analyst
  topics:
    - api-objects-user-attributes-object
    - api-objects-user-alias-object
    - api-objects-trigger-properties-object
    - api-objects-schedule-object
    - api-objects-recipient-object
    - api-objects-purchase-object
    - api-objects-messaging
    - api-objects-event-object
    - api-objects-context-object
    - api-objects-connected-audience
    - api-objects-catalog-selection-object
    - api-objects-aliases-to-identify
    - api-objects-messaging-whatsapp
    - api-objects-messaging-webhook
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill emphasizes CSO (Claude Search Optimization) — description and keywords must match how future Claude instances will search, not how humans would describe the skill.
- For reference-type skills like this one (API schemas, object structures), the pattern is: overview → quick reference table → per-object deep dives → common field patterns. This gives Claude fast scan-then-dive access.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# API Data Objects & Filters

## Overview

This skill covers the structure, required fields, validation rules, and relationships of every request/response object used in Braze API calls — from user identification through scheduling, event tracking, and messaging payloads. It is the authoritative reference for analysts and engineers modeling data flowing into and out of Braze.

**Analytical lens:** Treat each object as a schema contract. When designing an integration or debugging a failed API call, start here to verify field types, required vs. optional parameters, size limits, and which identifiers are acceptable at each endpoint.

## When to Use This Skill

Use this skill when:
- Designing the payload structure for a `/users/track`, `/messages/send`, or Canvas trigger call
- Debugging a `400 Bad Request` caused by a malformed object
- Determining which user identifier to use (external ID vs. alias vs. Braze ID vs. email)
- Mapping an analytics schema (warehouse, CDP, or event stream) onto Braze's expected object shapes
- Understanding how event, purchase, and attribute objects differ in their array placement and required fields
- Structuring audience filters for connected audience or catalog selection API calls

## Object Inventory

| Object | Endpoint Context | Key Fields |
|---|---|---|
| **User Attributes** | `/users/track` `attributes[]` | `external_id` or alias, standard + custom attributes |
| **User Alias** | Nested in attributes/recipients | `alias_name`, `alias_label` |
| **Aliases to Identify** | `/users/identify` | `external_id`, `user_alias`, merge behavior |
| **Event Object** | `/users/track` `events[]` | `external_id`, `name`, `time`, `properties` |
| **Purchase Object** | `/users/track` `purchases[]` | `external_id`, `product_id`, `currency`, `price`, `time` |
| **Trigger Properties** | Campaign API-trigger `trigger_properties` | Arbitrary KV pairs, campaign scope only |
| **Context Object** | Canvas trigger `context` | Arbitrary KV map, 50 KB limit, Canvas first-step scope |
| **Recipient Object** | `/messages/send`, schedule endpoints | Exactly one of: `external_user_id`, `user_alias`, `braze_id`, `email` |
| **Schedule Object** | Schedule create/update endpoints | `time` (ISO 8601), optional `in_local_time`, `at_optimal_time` |
| **Connected Audience Filter** | API-triggered sends `audience` | Attribute, event, and segment filter composition |
| **Catalog Selection Object** | Catalog selection API | `name`, `description`, `filters`, `sort_field`, `sort_order`, `limit` |
| **Webhook Messaging Object** | `/messages/send` `messages.webhook` | `url`, `request_method`, `request_headers`, `request_body` |
| **WhatsApp Messaging Object** | `/messages/send` `messages.whatsapp` | Consult source docs — minimal schema available |

## Identity Resolution

Braze supports four user identifiers. **Exactly one is required** per Recipient Object entry:

```
external_user_id  →  your system's primary key (preferred)
user_alias        →  { alias_name, alias_label } for anonymous or third-party IDs
braze_id          →  Braze-assigned internal ID (read from SDK/export)
email             →  email-only sends (no profile creation)
```

`aliases_to_identify` merges an alias profile into an identified profile — use this post-login or post-resolution to consolidate event history.

## Core Object Patterns

### User Attributes Object
Passed in the `attributes` array of `/users/track`. Sets profile fields. Custom attributes are any non-reserved key. Standard attributes (e.g., `first_name`, `email`, `phone`) follow Braze's reserved schema.

### Event Object
Passed in the `events` array of `/users/track`. Each object = one custom event occurrence. The `properties` field accepts a flat or nested JSON object; values must be scalar or arrays of scalars for segmentation support.

### Purchase Object
Passed in the `purchases` array of `/users/track`. The `currency` field must be a valid ISO 4217 code. `price` is a float. Revenue reporting and purchase funnels depend on the accuracy of these fields.

### Trigger Properties vs. Context Object

| | Trigger Properties | Context Object |
|---|---|---|
| Scope | Campaigns (API-triggered) | Canvas (first step only) |
| Namespace | `trigger_properties` | `context` |
| Size limit | — | 50 KB |
| Use | Per-send personalization | Canvas entry data injection |

### Schedule Object
Used in schedule creation endpoints. `time` is a required ISO 8601 datetime. Optional flags `in_local_time` and `at_optimal_time` alter delivery windows — these are mutually exclusive.

### Connected Audience Filter
Composes attribute, event, purchase, and segment conditions into an `audience` object for API-triggered sends. Allows targeting without pre-built segments.

### Catalog Selection Object
Used when calling catalog selection endpoints. The `filters` array supports multi-condition filtering; `sort_field` and `sort_order` control result ordering; `limit` caps returned items.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Sending multiple identifiers in one Recipient entry | Use exactly one: `external_user_id` OR `user_alias` OR `braze_id` OR `email` |
| Using `trigger_properties` for Canvas | Use `context` for Canvas; `trigger_properties` is campaign-only |
| Nesting deep objects in event `properties` | Keep values scalar or arrays of scalars for segmentation compatibility |
| Omitting `currency` in Purchase Object | Required field — ISO 4217 string (e.g., `"USD"`) |
| Setting `in_local_time` and `at_optimal_time` together | Mutually exclusive — pick one |
| Sending `context` beyond 50 KB | Payload will be rejected; trim or move large data to attributes |

`★ Insight ─────────────────────────────────────`
- The Trigger Properties / Context Object split is a common source of analyst confusion — they serve the same conceptual purpose (per-send personalization data) but are scoped to different product surfaces. The skill surfaces this as a comparison table so Claude can immediately answer "which one do I use?" questions.
- Placing `aliases_to_identify` in the Identity Resolution section (rather than in the object inventory alone) gives it narrative context: it's not just a schema, it's a lifecycle operation that merges anonymous history into identified profiles.
`─────────────────────────────────────────────────`
