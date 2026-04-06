---
name: brazeai-item_recommendations
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/viewing_analytics
indexed_at: '2026-04-05'
keywords:
  - recommendations
  - analytics
  - precision
  - coverage
  - personalization
  - catalog
  - fallback
  - metrics
  - model
triggers:
  - view item recommendation analytics
  - analyze recommendation performance
  - understand precision and coverage
  - configure recommendation type
  - interpret recommendation metrics
---
## Item Recommendation Analytics

View analytics for a recommendation at **Analytics** > **Item Recommendation**, then select a recommendation from the list.

### Audience Metrics

| Metric | Description |
|--------|-------------|
| **Precision** | % of time the model correctly predicted the next item a user purchased. Range of 6–20% is considered good performance. Updates on model retrain. |
| **Coverage** | % of catalog items recommended to at least one user. Personalized recommendations yield higher coverage than most-popular fallback. |
| **Recommendation type** | Split between users receiving personalized/most-recent vs. most-popular fallback (used when insufficient data exists for a user). |

### Items Metrics

| Metric | Description |
|--------|-------------|
| **Personalized items** / **Most recent items** | Catalog items in descending order of recommendation frequency, with user assignment counts. Which column appears depends on the configured recommendation type. |
| **Most popular items** | Catalog items ordered by interaction frequency across the entire workspace. Serves as fallback when personalized/most-recent cannot be calculated. |

### Overview

Displays the recommendation configuration summary: type, catalog, event type, custom event name, property name, and last updated date.

### Key Concepts

- **Fallback logic**: Users without enough data receive most-popular items instead of personalized or most-recent recommendations.
- **Precision interpretation**: Heavily dependent on catalog size and mix — use as a directional signal, not an absolute quality benchmark.
- **Model retraining**: Precision metric only updates when the model retrains.
