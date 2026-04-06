---
name: item-recommendations-rules-based
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/creating_recommendations/rules_based
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - recommendations
  - liquid
  - products
  - personalization
  - endpoints
  - attributes
  - connected
  - csv
  - api
triggers:
  - set up product recommendations
  - create rules-based recommendations
  - use catalogs for personalization
  - configure time-based recommendations
  - test item recommendations
---
# Rules-Based Item Recommendations

Rules-based recommendation engines use Liquid combined with Braze **Catalogs** or **Connected Content** to suggest relevant items based on user behavior and attributes. Logic is fixed and must be manually updated — recommendations don't auto-adjust to purchase history (use AI Item Recommendations for that).

## Engine Options Comparison

| Engine | No data points | No-code | No advanced Liquid | Auto-updates feed | Built in Braze UI | No data hosting |
|---|---|---|---|---|---|---|
| **Catalogs CSV** | ✓ | Yes (pre-generated Liquid) | ✓ | Yes (infrequent updates) | ✓ | ✓ |
| **Catalogs API** | ✓ | — | ✓ | Yes (hourly updates) | ✓ | ✓ |
| **Connected Content** | ✓ | — | — | ✓ (real-time) | If generated outside Braze | — |
| **Liquid** | — | — | — | — | ✓ | ✓ |

## Using Catalogs

### Setup Steps

1. Create a catalog with a `product_recommendations` column containing pipe-delimited (`|`) product IDs
2. Pass a product ID to the catalog lookup
3. Retrieve `product_recommendations`, split by delimiter using Liquid's `split` filter
4. Look up those IDs to get full product details

### Example: Time-Based Recipe Recommendations

**Catalog columns:** `id` (days since signup), `type`, `title`, `link`, `image_url`

The Liquid pattern computes days since signup and maps it to a catalog row:

```liquid
{% assign start_date = {{custom_attribute.${start_date}}} | date: "%s" %}
{% assign current_date = "now" | date: "%s" %}
{% assign diff = {{current_date}} | minus: {{start_date}} | divided_by: 86400 %}
{% assign days = {{diff}} | round %}
{% catalog_items Healthy_Recipe_Catalog_SMB {{days}} %}
```

**Title field:**
```liquid
{{ items[0].title }}
```

**Message body (with abort guard):**
```liquid
{% if items[0].title != blank %}
{{ items[0].body }}
{% else %}
{% abort_message('no card for today') %}
{% endif %}
```

**Image field:**
```liquid
{{ items[0].image_url }}
```

**On-click URL:**
```liquid
{{ items[0].link }}
```

### Testing

In the **Test** tab, select **Custom user** → **Preview message as user**, then enter a `start_date` custom attribute value to preview what a user signed up on that date would receive.

## Using Connected Content

Create an endpoint using one of:

- **Spreadsheet conversion** — Convert to JSON API endpoint (e.g., SheetDP), note the generated URL
- **Custom endpoint** — Build and host your own
- **Third-party engine** — Integrate an external recommendation service

Then reference the endpoint URL in your Connected Content Liquid tag to fetch personalized recommendations at send time.
