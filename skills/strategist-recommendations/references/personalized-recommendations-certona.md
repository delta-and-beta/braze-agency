---
name: personalized-recommendations-certona
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalized_recommendations/certona
indexed_at: '2026-04-05'
keywords:
  - recommendations
  - Certona
  - personalization
  - API
  - templates
  - integration
  - product
  - campaigns
  - Connected
triggers:
  - add product recommendations to campaigns
  - set up Certona in Braze
  - implement personalized recommendations
  - configure recommendation templates
  - integrate Certona API
---
## Certona Recommendations

Certona delivers machine-learning-powered product recommendations integrated into Braze campaigns and Canvases via Connected Content.

**Integration maintained by:** Certona (third-party)

---

### Prerequisites

| Requirement | Description |
|---|---|
| Certona account | Required at [manage.certona.com](https://manage.certona.com/) |
| Certona REST API endpoint | Used directly in Braze message templates to pull recommendations by user ID |

---

### Implementation

Insert the Connected Content call in the Braze message composer:

```liquid
{% connected_content {CERTONA_REST_API_KEY} :save recommendations %}
```

Then reference the returned data using dot-notation. Example accessing the first recommended item's name:

```liquid
{{recommendations.CertonaObject.RecommendedItems[0].Items[0].name}}
```

The `RecommendedItems[0].Items[0]` path reflects Certona's response schema — adjust indices to access additional recommendations or fields (e.g., `.name`, `.image`, `.url`).

---

### Workflow

1. Add Connected Content tag with your Certona REST API key
2. Define which fields to surface (text, images, product names)
3. Use the **Test** tab in Braze composer to preview the Connected Content call before sending
4. Verify the correct data is rendering per user context

`★ Insight ─────────────────────────────────────`
- The `:save recommendations` directive in Connected Content stores the API response as a local variable — this is Braze's standard pattern for any JSON API that returns structured data you need to traverse
- Certona's response uses a nested array path (`RecommendedItems[0].Items[0]`) suggesting their API supports multiple recommendation sets — useful for A/B testing different recommendation strategies in a single call
`─────────────────────────────────────────────────`
