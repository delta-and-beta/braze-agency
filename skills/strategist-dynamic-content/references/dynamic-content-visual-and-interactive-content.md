---
name: dynamic-content-visual-and-interactive-content
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/yotpo
indexed_at: '2026-04-05'
keywords:
  - yotpo
  - integration
  - reviews
  - ratings
  - loyalty
  - email
  - messaging
  - api
  - dynamic
  - content
triggers:
  - show Yotpo reviews in campaigns
  - pull product ratings dynamically
  - display loyalty points in email
  - integrate user-generated content
  - fetch Yotpo data with connected content
---
`★ Insight ─────────────────────────────────────`
- Topic files serve as atomic knowledge units in the Nick pipeline — they're consumed by skill synthesis (step 6) and routed via keyword matching, so density and self-containment matter more than narrative flow
- Stripping Jekyll Liquid template syntax (`{% image_buster %}`, `{{site.baseurl}}`) is critical since those only render inside Braze's own docs site — raw paths would be dead references in a topic file
- The four Connected Content snippets are the highest-value content here: they're the entire actionable surface of this integration
`─────────────────────────────────────────────────`

# Yotpo Integration — Visual & Interactive Content Overview

Yotpo is an eCommerce marketing platform providing reviews, loyalty, SMS marketing, and UGC (user-generated content). The Braze-Yotpo integration uses Connected Content to dynamically pull Yotpo data (ratings, reviews, images, loyalty points) into Braze emails and messaging campaigns.

## Prerequisites

| Requirement | Notes |
|---|---|
| Yotpo account | Required for all use cases |
| Yotpo Reviews API key | Used in review and UGC snippets. Found in Yotpo dashboard under App Key. |
| Yotpo Loyalty API key + GUID | Used in loyalty balance snippet. Found in Loyalty & Referrals settings. |

**Critical:** The Yotpo `product_id` must exactly match the `product_id` event property in Braze. This is mandatory. To find your Yotpo product ID: open the product page, right-click → Inspect, search for `yotpo-main` in the HTML — the `data-product-id` attribute contains the value.

## Connected Content Snippets

All snippets use `event_properties.${product_id}` pulled dynamically from Braze. Replace `<YOTPO-API-KEY>` with your Yotpo Reviews API key in snippets 1–3.

---

### 1. Star Rating and Review Count

Displays the product's public average score and total review count.

```liquid
{% connected_content https://api.yotpo.com/products/<YOTPO-API-KEY>/{{event_properties.${product_id}}}/bottomline :save result %}

{% if {{result.response.bottomline.average_score}} != 0 %}
The average rating for this product is:
{{result.response.bottomline.average_score}}/5, based on {{result.response.bottomline.total_reviews}} reviews.
{% else %}
{% endif %}
```

**Response fields used:**
- `result.response.bottomline.average_score` — numeric average (0–5)
- `result.response.bottomline.total_reviews` — total review count

---

### 2. Most Recent 5-Star Review

Fetches the top published 5-star review for a product (sorted by upvotes, page size 50).

```liquid
{% connected_content https://api.yotpo.com/v1/widget/<YOTPO-API-KEY>/products/{{event_properties.${product_id}}}/reviews.json?per_page=50&star=5&sort=votes_up :save result %}

{% if {{result.response.reviews[0].score}} == 5 %}
Recent 5 Star Review for this product:
{{result.response.reviews[0].content}}
{% else %}
{% endif %}
```

**Response fields used:**
- `result.response.reviews[0].score` — score of first result
- `result.response.reviews[0].content` — review text

**Note:** If no 5-star reviews exist (endpoint returns NULL), no content is displayed.

---

### 3. Visual UGC Image by Product

Retrieves the first tagged, published Yotpo image for a product — useful as a replacement for stock images or as a gallery addition.

```liquid
{% connected_content https://api.yotpo.com/v1/widget/<YOTPO-API-KEY>/albums/product/{{event_properties.${product_id}}}?per_page=1 :save result %}

{% if {{result.response.images[0].tagged_products[0].image_url}} != null %}
The Visual content of the product:
<img src="{{result.response.images[0].tagged_products[0].image_url}}" border="0" width="200" height="200" alt="" />
{% else %}
Image return NULL
{% endif %}
```

**Response fields used:**
- `result.response.images[0].tagged_products[0].image_url` — direct image URL

**Note:** If no published images exist, no content is displayed.

---

### 4. Customer Loyalty Point Balance

Retrieves a specific customer's loyalty points and VIP tier progress. Uses `email_address` (pulled from Braze user profile) as the lookup key.

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

**Credentials required:**
- `<YOTPO-LOYALTY-GUID>` — from Loyalty & Referrals settings
- `<YOTPO-LOYALTY-API-KEY>` — from Loyalty & Referrals settings

**Response fields used:**
- `publication.points_balance` — customer's current point total
- `publication.vip_tier_upgrade_requirements.points_needed` — points remaining to next VIP tier

## Key Constraints

- `product_id` in Braze must match Yotpo's product ID (typically the eCommerce parent product ID — not variant IDs)
- Loyalty snippet uses the customer's email address as the lookup identifier; the email must match the Yotpo loyalty account
- Yotpo does not support customization beyond the patterns shown above without front-end developer assistance
- Additional data fields and customization are available via Yotpo's API; consult Braze Connected Content docs for advanced API call patterns
