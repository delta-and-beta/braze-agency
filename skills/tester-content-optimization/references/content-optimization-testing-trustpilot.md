---
name: content-optimization-testing-trustpilot
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/content_optimization_testing/trustpilot
indexed_at: '2026-04-05'
keywords:
  - trustpilot
  - reviews
  - invitations
  - personalization
  - oauth
  - connected-content
  - webhook
  - liquid
  - authentication
  - caching
triggers:
  - send review invitations via webhook
  - personalize messages with product reviews
  - integrate trustpilot with braze
  - fetch reviews into campaigns
  - authenticate with trustpilot api
---
`★ Insight ─────────────────────────────────────`
- The Braze Connected Content pattern here is a two-phase OAuth flow: first fetch a token, then use it — caching with `:cache_max_age 3600` is critical to avoid re-authenticating on every send
- The `base64_encode` Liquid filter handles HTTP Basic Auth encoding inline — this is idiomatic Braze and avoids storing encoded credentials
- Product review filtering happens at the API query level (`?stars=5`) rather than in Liquid, which is more efficient than fetching all reviews and filtering client-side
`─────────────────────────────────────────────────`

---

# Trustpilot Integration

Trustpilot is an online review platform. Braze integrates with two Trustpilot APIs:
- **Invitation API** — send email review invitations via webhook
- **Product Reviews API** — pull review data into messages via Connected Content

## Prerequisites

- Trustpilot account with API access
- API key, API secret, and business unit ID from **Integrations > Developers > APIs**

---

## Sending Review Invitations

### 1. Get API Credentials

In Trustpilot: **Integrations > Developers > APIs > Application Name > Create Application**

Copy the **API key** and **secret**.

### 2. Configure Braze Webhook Campaign

- **URL:** `https://invitations-api.trustpilot.com/v1/private/business-units/{businessUnitId}/email-invitations`
- **Method:** POST
- Add customer info as key-value pairs

### 3. Retrieve Access Token via Connected Content

Add this to the webhook request header:

```liquid
{% connected_content 
https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken
:method post
:headers {"Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic {{'API_KEY:API_SECRET' | base64_encode}}" }
:body grant_type=client_credentials
:save token
:retry
:cache_max_age 3600 %}
```

Use `{{token.access_token}}` in the Authorization header of your webhook.

---

## Personalizing Messages with Product Reviews

### Fetch Reviews via Connected Content

```liquid
{% connected_content https://api.trustpilot.com/v1/product-reviews/business-units/{businessUnitId}/reviews?sku={{event_properties.${item_sku}}}&stars=5
   :method get
   :headers {"apikey": "YOUR_API_KEY"}
   :content_type application/json
   :save result %}
```

### Response Shape

```json
{
  "productReviews": [
    {
      "id": "670d5810ba62e6b31de97de9",
      "stars": 5,
      "content": "Such a great toy truck, my kids really enjoy it!",
      "consumer": { "displayName": "Kevin Bob" },
      "language": "en"
    }
  ]
}
```

### Liquid Access Patterns

| Data | Liquid Tag |
|------|-----------|
| Review text | `{{result.productReviews[0].content}}` |
| Reviewer name | `{{result.productReviews[0].consumer.displayName}}` |
| Star rating | `{{result.productReviews[0].stars}}` |

**Filtering:** Pass `?stars=5` in the query string to scope results to 5-star reviews only. Replace `5` with any value 1–5.
