---
name: data-activation-catalogs-use
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/data/activation/catalogs'
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - liquid
  - personalization
  - metadata
  - inventory
  - promotions
  - templating
  - storage
  - events
  - segmentation
triggers:
  - how to use catalogs
  - personalizing messages with liquid
  - setting up product catalogs
  - creating back-in-stock notifications
  - managing catalog storage limits
---
## Using Catalogs

Catalogs store metadata about offerings (products, discounts, promotions, events) and pair with **Liquid** templating to personalize messages at scale.

---

### Use Cases by Vertical

**Retail / eCommerce**
- Seasonal promotions — import collections, personalize by current trends
- Localized messages — import store addresses/hours, personalize by user location
- Back-in-stock notifications — import inventory data + custom events to trigger campaigns when products restock
- Price drop notifications — import product prices + custom events to trigger Canvas when prices drop

**Entertainment**
- Subscription plans — promote add-ons based on usage patterns and content consumption
- Upcoming events — import event listings with location/age data, send targeted notifications
- Media preferences — recommend content based on favorited titles and most-watched genres

**Travel & Hospitality**
- Destinations — import attractions/restaurants/activities, personalize by previous trips
- Accommodations — import hotel amenities/pricing, send promotions based on user preferences
- Travel deals — import flights/trains/car rentals, target by recent search history
- Meal preferences — use **selections** to send messages based on most recently viewed food category

---

### Catalogs + Liquid

| Layer | Role |
|-------|------|
| Catalog | Stores the data (product info, event listings, etc.) |
| Liquid | Pulls and renders relevant data from the catalog in messages |

Liquid is required to reference catalog data in message templates.

---

### Storage Limits

| Tier | Storage |
|------|---------|
| Free | 100 MB (unlimited items within limit) |
| Catalogs Pro | 5 GB, 10 GB, 15 GB, or 50 GB (includes free 100 MB) |

Storage is calculated by catalog item size — not the size of the uploaded CSV file.

---

`★ Insight ─────────────────────────────────────`
- The two-layer model (Catalog = storage, Liquid = retrieval) mirrors a database + query language split — useful mental model when explaining to engineers
- Storage limits are item-size based, not row-count based — a common gotcha when migrating large CSVs with rich metadata fields
- Back-in-stock and price drop notifications are the highest-value retail triggers because they're intent-matched (user already expressed interest)
`─────────────────────────────────────────────────`
