---
name: item-recommendations-viewing-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/viewing_analytics
indexed_at: '2026-04-05'
keywords:
  - recommendations
  - analytics
  - precision
  - coverage
  - catalog
  - personalized
  - fallback
  - metrics
  - model
  - accuracy
triggers:
  - view recommendation analytics
  - assess model precision and coverage
  - analyze item recommendation performance
  - compare personalized vs most popular items
---
## Item Recommendation Analytics

View analytics for a recommendation to assess model accuracy and item coverage.

**Navigation:** Analytics > Item Recommendation > select recommendation

---

### Audience Metrics

| Metric | Description |
|--------|-------------|
| **Precision** | % of time the model correctly predicted the next item a user purchased. Benchmark range: 6–20%. Updates on model retrain. |
| **Coverage** | % of catalog items recommended to at least one user. Personalized recommendations yield higher coverage than most popular. |
| **Recommendation type** | Split between users receiving personalized/most recent vs. fallback (most popular). Fallback applies when insufficient user data exists. |

---

### Items Metrics

| Metric | Description |
|--------|-------------|
| **Personalized items** / **Most recent items** | Catalog items ranked by recommendation frequency (descending), with user assignment counts. Which column appears depends on configured recommendation type. |
| **Most popular items** | Catalog items ranked by workspace-wide interaction frequency. Used as fallback when personalized/most recent cannot be calculated. |

---

### Overview

Displays the recommendation configuration summary: type, catalog, event type, custom event name, property name, and last updated timestamp.

---

**Key concepts:**
- Precision is catalog-dependent — a 6% precision on a large catalog may outperform 20% on a small one
- Most popular is always the fallback, never the primary, for personalized/most recent recommendation types
- Coverage gap between personalized and most popular reflects long-tail item exposure
