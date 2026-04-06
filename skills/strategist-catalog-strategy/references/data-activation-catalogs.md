---
name: data-activation-catalogs
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/data/activation/catalogs'
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - liquid
  - storage
  - personalization
  - products
  - inventory
  - templating
  - messaging
  - promotions
  - data
triggers:
  - how to create a catalog
  - how to use liquid with catalogs
  - personalizing messages with catalog data
  - importing product data into catalogs
  - triggering campaigns from catalogs
---
## Catalogs Overview

Catalogs store large sets of structured data (products, events, promotions, etc.) that can be referenced in Braze messages via Liquid templating. Catalogs handle storage; Liquid pulls the data into messages.

## Use Cases by Vertical

**Retail / eCommerce**
- Seasonal promotions — import product collections, personalize by trends
- Localized messages — import store addresses/hours, personalize by user location
- Back-in-stock notifications — import inventory data + custom events to trigger campaigns
- Price drop notifications — import pricing data + custom events to trigger Canvases

**Entertainment**
- Subscription plans — promote add-ons based on usage patterns and content preferences
- Upcoming events — import event listings with location/age data, send targeted notifications
- Media preferences — import movie/show data, recommend content based on favorites and watch history

**Travel & Hospitality**
- Destinations — import attractions/restaurants/activities, personalize by trip history
- Accommodations — import hotel amenities/pricing, send promos based on preferences
- Travel deals — import flight/train/car deals, target by recent search history
- Meal preferences — use Selections to match users to food offerings by recently viewed category

## Storage Limits

| Tier | Storage |
|------|---------|
| Free | 100 MB |
| Catalogs Pro | 5 GB, 10 GB, 15 GB, or 50 GB (includes free 100 MB) |

- Item count is unlimited as long as total storage stays within limit
- Storage is based on **catalog item sizes**, not the size of uploaded CSV files

## How Catalogs + Liquid Work Together

Catalogs hold the data; Liquid is the templating language used to reference it in messages. To pull catalog data into a message, use Liquid expressions referencing the catalog by name. See the "Creating a catalog" docs for additional Liquid usage examples.
