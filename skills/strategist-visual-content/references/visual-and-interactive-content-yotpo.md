---
name: visual-and-interactive-content-yotpo
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/yotpo
indexed_at: '2026-04-05'
keywords:
  - yotpo
  - reviews
  - ratings
  - ugc
  - loyalty
  - connected-content
  - braze
  - api
  - ecommerce
  - campaigns
triggers:
  - pull customer reviews into emails
  - display product ratings in campaigns
  - integrate loyalty balances in braze
  - fetch user-generated content from yotpo
  - show yotpo data in email campaigns
---
## Yotpo Visual Content Integration with Braze

Yotpo is an eCommerce marketing platform providing reviews, loyalty, SMS marketing, and user-generated content (UGC). The Braze integration uses Connected Content to pull star ratings, reviews, visual UGC, and loyalty balances dynamically into email campaigns.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Yotpo account | Required for all integration features |
| Yotpo Reviews API key | Used in reviews/UGC Connected Content snippets |
| Yotpo Loyalty API key + GUID | Used in loyalty balance snippets |

**Critical**: The Yotpo `product_id` must match the `product_id` pulled dynamically from Braze (typically the eCommerce parent product ID).

**Finding the Yotpo product ID**: Open the product page → right-click Inspect → search for `yotpo-main` → look for `data-product-id` attribute in the Yotpo div.

---

## Connected Content Snippets

### Star Rating and Review Count

Displays average score and total review count for a product.

```liquid
{% connected_content https://api.yotpo.com/products/<YOTPO-API-KEY>/{{event_properties.${product_id}}}/bottomline :save result %}

{% if {{result.response.bottomline.average_score}} != 0 %}
The average rating for this product is:
{{result.response.bottomline.average_score}}/5, based on {{result.response.bottomline.total_reviews}} reviews.
{% else %}
{% endif %}
```

### Most Recent 5-Star Review

Pulls the top published 5-star review for a product (sorted by upvotes, 50 per page).

```liquid
{% connected_content https://api.yotpo.com/v1/widget/<YOTPO-API-KEY>/products/{{event_properties.${product_id}}}/reviews.json?per_page=50&star=5&sort=votes_up :save result %}

{% if {{result.response.reviews[0].score}} == 5 %}
Recent 5 Star Review for this product:
{{result.response.reviews[0].content}}
{% else %}
{% endif %}
```

If no 5-star reviews exist, the endpoint returns NULL and no content is displayed.

### Visual UGC by Product

Retrieves tagged and published Yotpo images for a product (useful as a stock-image replacement or additional gallery).

```liquid
{% connected_content https://api.yotpo.com/v1/widget/<YOTPO-API-KEY>/albums/product/{{event_properties.${product_id}}}?per_page=1 :save result %}

{% if {{result.response.images[0].tagged_products[0].image_url}} != null %}
<img src="{{result.response.images[0].tagged_products[0].image_url}}" border="0" width="200" height="200" alt="" />
{% else %}
Image return NULL
{% endif %}
```

If no published images exist for the product, no content is displayed.

### Customer Loyalty Balance

Retrieves a customer's loyalty point balance and VIP tier progress via the Loyalty API.

```liquid
{% connected_content
https://loyalty.yotpo.com/api/v2/customers?customer_email={{${email_address}}}
:method get
:headers {
    "x-guid": "<YOTPO-LOYALTY-GUID>",
    "x-api-key": "<YOTPO-LOYALTY-API-KEY>"
}
:content_type application/json
:save publication
%}

You have {{publication.points_balance}} points
Only {{publication.vip_tier_upgrade_requirements.points_needed}} more points to become part of our VIP Tier!
```

The `email_address` is pulled dynamically from Braze and must match the customer's email in Yotpo.

---

## Key Variables Reference

| Variable | Source | Used In |
|---|---|---|
| `<YOTPO-API-KEY>` | Yotpo Reviews API key | Star rating, 5-star review, visual UGC |
| `<YOTPO-LOYALTY-GUID>` | Yotpo Loyalty GUID | Loyalty balance |
| `<YOTPO-LOYALTY-API-KEY>` | Yotpo Loyalty API key | Loyalty balance |
| `event_properties.${product_id}` | Braze event properties | All product snippets |
| `${email_address}` | Braze user attribute | Loyalty balance |

---

## Notes

- All snippets use graceful null-checks — if data is unavailable, nothing is rendered (no broken content).
- Additional data fields and layout customization are possible via the Yotpo API, but may require front-end developer assistance.
- Yotpo does not support custom requirements beyond standard integration patterns.
