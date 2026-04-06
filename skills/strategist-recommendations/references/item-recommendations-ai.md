---
name: item-recommendations-ai
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/viewing_analytics
indexed_at: '2026-04-05'
keywords:
  - precision
  - coverage
  - recommendations
  - analytics
  - catalog
  - personalization
  - metrics
  - fallback
  - items
triggers:
  - how to interpret recommendation metrics
  - analyzing item recommendation performance
  - understanding precision and coverage
  - checking recommendation analytics
  - configuring recommendation types
---
`★ Insight ─────────────────────────────────────`
- Topic files are atomic knowledge units — they should be self-contained and scannable, not narrative. Stripping Jekyll templating (`{% image_buster %}`, `{{site.baseurl}}`, CSS classes) is essential since these are rendered server-side and meaningless in a raw reference context.
- The precision range (6-20%) is a concrete calibration anchor — exactly the kind of non-obvious fact worth preserving verbatim so agents don't hallucinate "good" precision thresholds.
`─────────────────────────────────────────────────`

## AI-Powered Recommendations: Analytics

### Accessing Analytics

**Analytics > Item Recommendation** → select a recommendation from the list.

---

### Audience Metrics

| Metric | Description |
|---|---|
| **Precision** | % of time the model correctly predicted the next item a user purchased. Ranges of 6–20% indicate good performance. Updates on model retrain. |
| **Coverage** | % of catalog items recommended to at least one user. Personalized recommendations yield higher coverage than most-popular fallback. |
| **Recommendation type** | Split between users receiving personalized/most-recent recommendations vs. the most-popular fallback (used when insufficient user data exists). |

---

### Item Metrics

| Metric | Description |
|---|---|
| **Personalized items** / **Most recent items** | Catalog items ranked by how often they were recommended, with user assignment counts. Which column appears depends on the configured recommendation type. |
| **Most Popular items** | Catalog items ranked by workspace-wide interaction frequency. Used as fallback when personalized/most-recent cannot be calculated. |

---

### Overview Panel

Displays the recommendation configuration summary:
- Recommendation type
- Catalog used
- Event type and custom event name
- Property name
- Last updated date

---

### Key Concepts

- **Fallback logic**: Users without enough interaction data receive most-popular items instead of personalized recommendations.
- **Precision is catalog-dependent**: A 6% precision on a large catalog may outperform 20% on a small one — use it as a directional signal, not an absolute quality score.
- **Coverage vs. precision trade-off**: Personalized recommendations spread across more catalog items (higher coverage) but may have lower per-item confidence than most-popular.
