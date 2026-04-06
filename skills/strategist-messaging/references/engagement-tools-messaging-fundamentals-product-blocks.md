---
name: engagement-tools-messaging-fundamentals-product-blocks
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/product_blocks
indexed_at: '2026-04-05'
keywords:
  - eCommerce
  - dynamic
  - static
  - catalogs
  - canvas
  - personalization
  - variant
  - abandoned
  - confirmation
  - product
triggers:
  - how to set up product blocks
  - create abandoned cart flows
  - order confirmation emails
  - configure product catalogs
  - drag-and-drop products in email
---
# Drag-and-Drop Product Blocks

> Available for email (early access). Contact your Braze account manager to participate.

## Requirements

| Requirement | Details |
|---|---|
| eCommerce recommended events | Required for dynamic product blocks. Provides standardized schemas for behavioral events (pre/post order). Replaces legacy Braze purchase event. |
| eCommerce Canvas templates | Required if implementing abandoned browse/cart, order confirmation flows. Must use or follow provided Canvas templates. |
| Braze catalog | Must include fields: `product_title`, `product_url`, `variant_image_url` |
| Catalog selection | Required for static product blocks to specify which products to include. |

## Block Types

| Type | How it works | Use cases | Availability |
|---|---|---|---|
| **Dynamic** | Personalizes based on customer interactions via eCommerce events + catalogs | Abandoned browse, abandoned cart, abandoned checkout, order confirmations | Canvas only |
| **Static** | Uses data stored in a Braze catalog; requires a catalog selection | New product launches, category-specific offerings | Email + Canvas |

## Content Configuration

### Product Fields by Block Type

**Dynamic block** — fields pulled from two sources:

| Field | Source |
|---|---|
| Variant image | Catalogs |
| Product title | Catalogs |
| Button (product URL) | Catalogs |
| Price | eCommerce event property |
| Quantity | eCommerce event property |

**Static block** — all fields from catalogs:

| Field | Source |
|---|---|
| Variant image | Catalogs |
| Product title | Catalogs |
| Button (product URL) | Catalogs |
| Price | Catalogs |

### Layout Options

| Option | Description |
|---|---|
| Product orientation | How image and fields are oriented within the block |
| Alignment | Text fields and button alignment |
| Max products per row | Up to 3 per row; 12 total (static) or 24 total (dynamic) |
| Product spacing | Spacing between products |

### Global Email Style Settings

Global paragraph and button styles automatically apply to product block text and button elements — no additional configuration needed.

## Catalog Setup

**Required catalog fields:**

| Field | Description |
|---|---|
| `product_title` | Display name of the product |
| `product_url` | URL for viewing/purchasing the product |
| `variant_image_url` | URL for the variant image |

**Notes:**
- Shopify integration users with product syncing enabled: no additional steps needed.
- Without product variant data: duplicate top-level product info in both product and product variant fields in event payloads and catalogs.
- Non-Shopify users: contact your account manager to enable field mapping (connects any catalog to `product_title`, `product_url`, `variant_image_url`).

**Field mapping:** In your catalog's **Settings** tab, use the **Product blocks** toggle to map catalog fields to `product_title`, `product_url`, and `variant_image_url`. Shopify catalog fields are mapped by default and cannot be changed.

## Setup Checklist

1. Create a Braze catalog with `product_title`, `product_url`, `variant_image_url` fields
2. For static blocks: create a catalog selection defining which products to include
3. For dynamic blocks: ensure eCommerce recommended events are configured
4. In catalog Settings, enable the Product blocks toggle and map fields
5. In the drag-and-drop email editor, add the product block and configure Product Fields + Layout Options
