---
name: strategist-catalog-strategy
description: >-
  Designs catalog-based personalization using selections, triggers, and product
  blocks for dynamic content.
metadata:
  role: braze-strategist
  topics:
    - data-activation-catalogs
    - data-activation-catalogs-create
    - data-activation-catalogs-use
    - data-activation-catalogs-selections
    - data-activation-catalogs-catalog_triggers
    - data-activation-catalogs-product_blocks
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill body intentionally omits YAML frontmatter here because the generator will wrap it — the markdown body focuses on *what Claude should know* (scope, lens, topics) rather than *when to load* (that's frontmatter's job). Keeping body under ~2,000 words preserves progressive disclosure — details live in the `references/` topic files.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Catalog-Driven Personalization

Design and implement catalog-based personalization strategies in Braze — using structured product data to deliver dynamic, individually relevant messaging at scale through Liquid templating, selections, triggers, and product blocks.

## Scope and Purpose

This skill covers the full lifecycle of catalog-driven personalization: from structuring and importing catalog data, through filtering and referencing items in messages, to triggering sends and rendering product content dynamically. Apply it whenever messaging needs to reflect real-world inventory, promotions, events, or any structured data set that varies per user.

The strategic lens is **scale with relevance**: catalogs decouple the data layer from the messaging layer, so a single campaign template can surface thousands of distinct product experiences without per-user manual configuration. The goal is always to make each message feel like it was written for one person, while authoring it once for millions.

## When to Use This Skill

Apply this skill when:

- Designing personalized product recommendation messages using catalog items
- Building promotional campaigns that reference dynamic pricing, availability, or event data
- Configuring catalog selections to segment which items different user cohorts see
- Setting up catalog triggers so inventory or data changes automatically fire campaigns
- Implementing product blocks for visual, card-style rendering of catalog entries
- Importing, structuring, or updating catalog data via CSV or API

## Topics Synthesized

This skill draws from six reference areas:

| Topic | What It Covers |
|---|---|
| **Catalogs Overview** | Core architecture: catalogs as structured data stores, Liquid as the bridge to messages |
| **Using Catalogs** | Practical use cases by vertical (retail, events, promotions) and Liquid patterns for referencing items |
| **Catalog Selections** | Named, reusable filter sets that return refined item subsets per user context |
| **Creating Catalogs** | CSV and API import mechanics, field types, naming conventions, schema design |
| **Catalog Triggers** | Event-driven campaign firing based on catalog data changes |
| **Product Blocks** | Visual rendering of catalog items as structured content cards |

## Core Concepts

### Catalogs as a Data Layer

Catalogs store non-user data — products, SKUs, promotions, events, locations — as rows of structured attributes. They are imported once (CSV) or kept live (Catalog API) and then referenced at send time via Liquid. This separation means:

- Message templates remain static; content varies from the data
- Catalog updates propagate to all in-flight campaigns instantly
- No custom attribute bloat on user profiles for product data

### Liquid as the Rendering Bridge

Every catalog reference in a message uses Liquid to look up a catalog item by ID or filtered query:

```liquid
{% catalog_items products SKU-001 %}
{{ items[0].name }} — ${{ items[0].price }}
{% endcatalog_items %}
```

Match the catalog item ID to something the user profile carries (last purchased SKU, browsed category, loyalty tier) to achieve personalization.

### Selections: Reusable Filter Logic

Catalog selections are named filter configurations — think saved queries — that return a subset of catalog items. Use selections to:

- Show only in-stock items (`availability == true`)
- Surface category-relevant products (`category == user.category_preference`)
- Limit to items within a price band
- Return a ranked or sorted slice of the catalog

Selections are defined once and referenced by name in Liquid, making campaign templates portable across different filter criteria without rewiring Liquid logic each time.

### Catalog Triggers: Data-Driven Send Timing

Catalog triggers fire a campaign or Canvas step when a catalog item's data changes — for example, when a product price drops, a sale begins, or inventory restocks. This enables:

- Back-in-stock notifications tied to the exact moment availability flips
- Flash sale alerts fired when a promotional flag activates
- Event reminders keyed to a date field in the catalog

Catalog triggers close the loop between data operations and messaging, removing manual scheduling for time-sensitive inventory events.

### Product Blocks: Visual Item Rendering

Product blocks render catalog items as structured visual units — typically image, title, price, and CTA — within email or in-app message templates. Use product blocks when:

- The channel supports card-style layouts (email HTML, in-app rich content)
- Multiple catalog items need consistent visual treatment in a single message
- Design consistency across product recommendations is required

## Design Principles for This Lens

**One template, many outcomes.** Design catalog-driven messages so the template is channel-agnostic and the personalization lives entirely in the catalog data and selection logic. Avoid hard-coding product references into message copy.

**Match catalog IDs to user attributes.** Personalization quality depends on the bridge between user profile data and catalog item IDs. When designing catalog schemas, ensure there is a clean join key — last viewed SKU, preferred category, enrolled plan — that Liquid can reference.

**Keep selection logic in selections, not Liquid.** Complex filter conditions belong in a named selection, not inline in message Liquid. This keeps templates readable and allows filter logic to be updated without touching campaign copy.

**Use catalog triggers for real-time relevance.** Scheduled batch sends approximate timing; catalog triggers achieve it precisely. Prefer triggers over time-based sends whenever the right moment to message is defined by a data state change.

**Design catalog schemas for messaging, not just storage.** Catalogs imported for operational purposes (inventory management, CRM sync) often have schemas optimized for those systems, not for Liquid templating. When creating Braze-specific catalogs, structure field names and types to map directly to message tokens — prefer `display_price` over `unit_cost_internal`, for example.

## Common Patterns

**Personalized product recommendation in email**
1. Catalog stores product inventory with fields: `id`, `name`, `image_url`, `price`, `category`, `in_stock`
2. Selection filters to `in_stock == true` and `category == {{user.most_browsed_category}}`
3. Liquid renders top 3 results as product blocks in the email body

**Back-in-stock trigger flow**
1. Catalog `in_stock` field updates from `false` → `true` via Catalog API
2. Catalog trigger fires a Canvas for users who wishlisted the item
3. Canvas step sends push with item name and deep link from catalog `product_url` field

**Promotional flash sale**
1. Catalog carries a `sale_active` boolean and `sale_price` field
2. Marketing flips `sale_active` to `true` via CSV re-import or API PATCH
3. Catalog trigger fires campaign; Liquid surfaces `sale_price` in subject line and body

## Schema Design Checklist

When creating or auditing a catalog for personalization use:

- Field names are lowercase, snake_case, messaging-friendly
- There is a clear join key matching a user profile attribute
- Boolean flags (`in_stock`, `featured`, `on_sale`) exist for filter-friendly selections
- Display fields (`display_name`, `display_price`) are formatted for direct Liquid output
- Image URLs are absolute, CDN-hosted, and channel-appropriate resolution
- Date fields use ISO 8601 for reliable catalog trigger evaluation

## Additional Resources

Consult the reference topic files for detail on each area:

- **`references/catalogs-overview.md`** — Architecture, storage model, Liquid integration mechanics
- **`references/using-catalogs.md`** — Use cases by vertical, Liquid syntax patterns, common errors
- **`references/catalog-selections.md`** — Selection configuration, filter operators, referencing in campaigns
- **`references/creating-catalogs.md`** — CSV format requirements, API import, field type rules
- **`references/catalog-triggers.md`** — Trigger setup, supported events, Canvas integration
- **`references/product-blocks.md`** — Block anatomy, channel support, rendering constraints

`★ Insight ─────────────────────────────────────`
Notice how the "Design Principles" section encodes *strategic judgment* — not just mechanics. This is where a skill adds value over raw documentation: it gives Claude a decision framework for *when* and *why* to apply each pattern, not just *how*.

The "Common Patterns" section uses a numbered flow format intentionally — catalog personalization is always a chain (catalog shape → selection logic → Liquid template → trigger/send), and numbered steps mirror that mental model better than prose.
`─────────────────────────────────────────────────`
