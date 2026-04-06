---
name: data-activation-custom_data-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/recommended_events
indexed_at: '2026-04-05'
keywords:
  - events
  - ecommerce
  - recommended
  - custom
  - schema
  - validation
  - canvas
  - templates
  - tracking
  - purchase
triggers:
  - how to track ecommerce events
  - set up ecommerce canvas template
  - migrate legacy purchase event
  - difference between recommended and custom events
---
## Recommended Events

Braze-defined events with standardized schemas that unlock pre-built Canvas templates, reporting dashboards, and lifecycle tracking. Different from custom events — names and properties are fixed.

### How It Works

- Braze validates all recommended events and applies post-processing actions
- Supports action-based triggers for campaigns and Canvases
- Exportable via Currents, can be blocklisted, usable in reporting
- Ingest via Braze SDK or `POST /users/track`

### eCommerce Recommended Events

| Event | Description |
|-------|-------------|
| `ecommerce.product_viewed` | User viewed a product |
| `ecommerce.cart_updated` | Cart was added to, removed from, or modified |
| `ecommerce.checkout_started` | User began checkout |
| `ecommerce.order_placed` | Order was placed |
| `ecommerce.order_refunded` | Order was refunded |
| `ecommerce.order_cancelled` | Order was cancelled |

Shopify connector users get these events automatically via the integration.

### Key Distinctions from Custom Events

| | Recommended Events | Custom Events |
|--|---|---|
| Name | Fixed by Braze | User-defined |
| Properties | Schema-defined (required + optional) | User-defined |
| Validation | Enforced by Braze | None |
| Canvas templates | Pre-built templates available | Manual setup |

### Migration Note

The legacy purchase event will be deprecated in favor of `ecommerce.order_placed`. Existing purchase event usage continues until an official deprecation date is announced.

### Canvas Templates

Pre-built eCommerce Canvas templates are available for common strategies (abandoned cart, post-purchase, etc.) built around these recommended events.
