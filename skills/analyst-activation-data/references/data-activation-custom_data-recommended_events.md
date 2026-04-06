---
name: data-activation-custom_data-recommended_events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/recommended_events
indexed_at: '2026-04-05'
keywords:
  - ecommerce
  - events
  - schema
  - validation
  - canvas
  - tracking
  - triggers
  - migration
  - shopify
  - purchase
triggers:
  - how to send ecommerce events
  - set up recommended events
  - migrate from purchase events
  - track product and order actions
  - use pre-built ecommerce templates
---
## Recommended Events

Recommended events map to common eCommerce use cases with pre-defined schemas, enabling pre-built Canvas templates, lifecycle reporting dashboards, and special post-processing actions. Unlike custom events, their names and properties are standardized and cannot be customized.

**Status:** Early access — contact your Braze CSM to participate. Automatically available via the Shopify connector integration.

### How They Work

- Braze applies **special validation** to all recommended events
- Support **action-based triggers** for campaigns and Canvases
- Behave like custom events: exportable via Currents, blocklistable, usable in reporting
- Sent via [Braze SDK](https://www.braze.com/docs/developer_guide/getting_started/sdk_overview) or [`/users/track`](https://www.braze.com/docs/api/endpoints/user_data/post_user_track) endpoint

### eCommerce Recommended Events

| Event | Description |
|-------|-------------|
| `ecommerce.product_viewed` | User views a product |
| `ecommerce.cart_updated` | User adds, removes, or updates cart items |
| `ecommerce.checkout_started` | User begins checkout |
| `ecommerce.order_placed` | Order completed |
| `ecommerce.order_refunded` | Order refunded |
| `ecommerce.order_cancelled` | Order cancelled |

Pre-built Canvas templates available for these events via eCommerce use cases.

### Key Distinctions from Custom Events

| | Recommended Events | Custom Events |
|--|-------------------|---------------|
| Schema | Braze-defined (required + optional properties) | You define |
| Name | Fixed, standardized | Customizable |
| Validation | Special Braze validation | Standard |
| Templates | Pre-built Canvas templates | None |

### Purchase Event Migration

eCommerce recommended events will **replace the legacy purchase event** in a future deprecation. Existing purchase event users will receive advance notice before the official deprecation date. Continue using purchase events until then.

`★ Insight ─────────────────────────────────────`
- The eCommerce events use a **namespaced dot notation** (`ecommerce.product_viewed`) — this is a deliberate schema design choice that groups related events and avoids collision with custom event names.
- Recommended events represent Braze moving toward **opinionated, validated schemas** rather than free-form tracking — a tradeoff of flexibility for consistency and tooling support (pre-built templates, dashboards).
`─────────────────────────────────────────────────`
