---
name: data-activation-custom_data-purchase_events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/purchase_events
indexed_at: '2026-04-05'
keywords:
  - purchase
  - events
  - LTV
  - tracking
  - segmentation
  - personalization
  - products
  - SDK
  - spending
  - campaigns
  - properties
  - filters
triggers:
  - How to log purchase events
  - Set up purchase tracking
  - Segment by purchase behavior
  - Personalize with purchase data
  - Trigger message on purchase
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's plugin structure serve as atomic knowledge units — they're designed to be loaded selectively at query time (Sonnet depth), so stripping Jekyll template directives (`{% %}`, `{{site.baseurl}}`), liquid include boilerplate, and dead navigation links is essential. The goal is maximum signal density per token.
`─────────────────────────────────────────────────`

## Purchase Events

Purchase events record in-app purchases and establish **Lifetime Value (LTV)** for each user profile. They must be set up by your team and support properties like `quantity` and product type for downstream segmentation.

### Logging Purchases

Log via the `/users/track` endpoint using a purchase object, or through platform SDKs:

- **Android/FireOS**, **iOS (Swift)**, **Web**, **React Native**, **Unity**, **.NET MAUI**, **Roku** — all supported via `logPurchase()`-style SDK methods.

Purchase event properties use the same data types as custom event properties.

### Viewing Purchase Data

After setup, purchase data appears on the user's profile under the **Overview tab** in the user search tool.

---

### Segmentation

Available segmentation filters (under "Purchase behavior"):

| Filter | Description |
|--------|-------------|
| First Made Purchase | When the user first purchased anything |
| First Purchase For App | First purchase within a specific app |
| Last Purchased Product | Most recently purchased product name |
| Money Spent | Total spend amount |
| Purchased Product | Whether a specific product was purchased |
| Total Number of Purchases | Count of all purchases |
| X Money Spent in Y Days | Spend threshold within a time window |
| X Product Purchased in Y Days | Specific product within a time window |
| X Purchase Property in Y Days | Filter by event property within a window |
| X Purchases in Last Y Days | Purchase frequency filter |

> **Tip:** To segment on how many times a *specific* purchase occurred, record it individually as an incrementing custom attribute.

---

### Personalization (Liquid)

Use purchase event properties in Liquid templates for personalized messaging:

```liquid
{% if ${last_purchased_product} == "Running Shoes" %}
  We hope you're enjoying your new running shoes! Based on your recent purchase, you might also like these running shorts and water bottles.
{% elsif ${last_purchased_product} == "Yoga Mat" %}
  We hope you're enjoying your new yoga mat! Based on your recent purchase, you might also like these yoga blocks and straps.
{% else %}
  Thank you for your recent purchase! We hope you're enjoying your new item.
{% endif %}
```

---

### Trigger Messages

To auto-send a message when a purchase occurs:

1. Create an **action-based campaign or Canvas**
2. Set trigger action to **Make Purchase**
3. Optionally filter by product name or purchase amount

Example triggered message using a purchase product attribute:

```liquid
Thank you for your purchase of ${purchase_product_name}! As a token of our appreciation, here's a discount code for your next purchase: SAVE10
```

---

### Analytics & Revenue Metrics

Braze tracks per-product purchase counts and revenue over time, available on the **Revenue Report** page.

| Metric | Definition |
|--------|------------|
| Lifetime Revenue | Total revenue from all purchases across all users |
| Lifetime Value Per User | Lifetime Revenue divided by total users |
| Average Daily Revenue | Average revenue per day over a given period |
| Daily Purchases | Number of purchases recorded per day |

`★ Insight ─────────────────────────────────────`
The Jekyll `{% multi_lang_include analytics/metrics.md %}` directives are stub includes — they'd resolve at build time but are meaningless in a raw topic file. Rather than leaving empty cells, the table above uses plain-English definitions that preserve semantic content for agent retrieval. This is the right call when the original source is a template-heavy SSG.
`─────────────────────────────────────────────────`
