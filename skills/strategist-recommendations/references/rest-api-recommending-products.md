---
name: rest-api-recommending-products
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/recommending_products
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - recommendations
  - connected-content
  - personalization
  - metadata
  - liquid
  - attributes
  - tracking
  - api
triggers:
  - store product recommendations
  - personalize messages with product data
  - retrieve product metadata at send time
  - integrate recommendations with catalogs
---
# Product Recommendations via API

Store recommendation engine output on Braze user profiles, then retrieve product metadata at send time using Catalogs or Connected Content.

## Prerequisites

- **REST API key** with `users.track` permission (and catalog permissions if managing via API)
- **Braze catalog** containing product metadata (name, category, price, image URL)
- **Liquid knowledge** — intermediate familiarity required for templating

## Step 1: Store Recommendations on User Profiles

Use `/users/track` to write recommendation identifiers as custom attributes:

```http
POST YOUR_REST_ENDPOINT/users/track
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "attributes": [
    {
      "external_id": "user123",
      "recommended_product_id": "1001"
    }
  ]
}
```

Use meaningful attribute names (e.g. `recommended_product_id`) for easy Liquid reference. Update regularly as your engine produces new results.

## Step 2: Retrieve Product Metadata

### Option A: Braze Catalogs (preferred)

Look up a specific item by ID:

```liquid
{% catalog_items retail_products 1001 %}

We have a new item we think you'll like:
Category: {{ items[0].category }}
Name: {{ items[0].name }}
Price: ${{ items[0].price }}
```

Look up multiple items:

```liquid
{% catalog_items retail_products 1001 1003 1005 %}

New items added in:
- {{ items[0].category }}
- {{ items[1].category }}
- {{ items[2].category }}
```

Personalize using the stored custom attribute:

```liquid
{% catalog_items retail_products {{custom_attribute.${recommended_product_id}}} %}

Hi {{${first_name}}}, check out our pick for you:
{{ items[0].name }} — ${{ items[0].price }}
```

### Option B: Connected Content

Fetch from an external API at send time:

```liquid
{% connected_content https://api.yourcompany.com/products/{{custom_attribute.${recommended_product_id}}} :save product %}

Hi {{${first_name}}}, we think you'll love:
{{ product.name }} — ${{ product.price }}
```

> **Warning:** Do not fetch large product lists via Connected Content and iterate in Liquid. Large payloads cause send latency, timeouts, and delivery failures at scale. Store only the specific product IDs needed on the user profile and fetch individual item metadata — or use Catalogs, which are optimized for fast lookups.

## Step 3: Verify Integration

1. Write a test recommendation to your own profile via `/users/track`
2. Send a test message referencing the product (Catalogs or Connected Content)
3. Confirm product details render correctly in the delivered message
4. Check campaign/Canvas results page to confirm the send is recorded

## Key Considerations

- **Update frequency**: Refresh custom attributes regularly to keep recommendations accurate
- **API-triggered delivery**: Use API-triggered campaigns to fire messages directly from your backend using dashboard-defined templates
- **Personalization**: Combine product data with other user attributes using Braze personalization features
