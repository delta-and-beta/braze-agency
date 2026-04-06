---
name: dynamic-content-content-optimization-testing
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/content_optimization_testing/trustpilot
indexed_at: '2026-04-05'
keywords:
  - trustpilot
  - webhook
  - connected-content
  - oauth
  - personalization
  - reviews
  - api-integration
  - liquid-templating
  - campaign
  - authentication
triggers:
  - how to integrate Trustpilot with Braze
  - send review invitations via webhook
  - personalize messages with product reviews
  - retrieve Trustpilot access token
  - display customer reviews in campaigns
---
# Trustpilot Integration

Trustpilot is an online review platform. This covers two integration patterns with Braze: sending review invitations and personalizing messages with product review data.

## Prerequisites

- Trustpilot account with API access
- API key + secret (from **Integrations > Developers > APIs > Create Application**)

## Sending Review Invitations

### 1. Set up Braze Webhook Campaign

- **URL:** `https://invitations-api.trustpilot.com/v1/private/business-units/{businessUnitId}/email-invitations`
- **Method:** POST
- Trigger action-based (e.g., after order placement), include customer info as key-value pairs

### 2. Retrieve Access Token via Connected Content

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

Uses `client_credentials` grant type. Add `{{token.access_token}}` to the webhook request header.

## Personalizing Messages with Product Reviews

Call Trustpilot's product reviews endpoint via Connected Content:

```liquid
{% connected_content https://api.trustpilot.com/v1/product-reviews/business-units/{businessUnitId}/reviews?sku={{event_properties.${item_sku}}}&stars=5
   :method get
   :headers {"apikey": "YOUR_API_KEY"}
   :content_type application/json :save result %}
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

### Liquid Access

- Review text: `{{result.productReviews[0].content}}`
- Reviewer name: `{{result.productReviews[0].consumer.displayName}}`
- Filter by `stars=5` in the query param to surface only positive reviews
