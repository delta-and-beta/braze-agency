---
name: strategist-recommendations
description: >-
  Creating and deploying personalized item recommendations using rules-based and
  AI-driven approaches.
metadata:
  role: braze-strategist
  topics:
    - item-recommendations-creating-recommendations
    - item-recommendations-using-recommendations
    - item-recommendations-viewing-analytics
    - item-recommendations-use-case
    - item-recommendations-rules-based
    - item-recommendations-ai
    - personalized-recommendations-personalize
    - personalized-recommendations-movable-ink
    - personalized-recommendations-fullstory
    - personalized-recommendations-dynamic-yield
    - personalized-recommendations-certona
    - personalized-recommendations-amplitude
    - personalized-recommendations-amazon-personalize
    - personalized-recommendations-amazon-personalize-workshop
    - personalized-recommendations-amazon-personalize-amazon-personalize
    - personalization-engines-dynamic-yield
    - rest-api-recommending-products
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's pipeline separates frontmatter generation from body generation — requesting "no YAML frontmatter" suggests the assembler handles metadata injection separately from content synthesis
- The "lens" is the strategic filter: the same raw topic data (e.g., Amazon Personalize setup) gets framed differently depending on whether the role is an engineer (implementation) or a strategist (personalization outcomes)
- Topics marked as "minimal or unavailable" (Movable Ink, Dynamic Yield, etc.) still get synthesized into the skill — the skill becomes the source of truth when individual topic files are thin
`─────────────────────────────────────────────────`

```markdown
# Item Recommendation Strategy

## Skill Overview

This skill guides personalization strategy for product and content recommendations within Braze campaigns and Canvases. It synthesizes Braze-native recommendation engines (rules-based and AI-powered), third-party personalization platforms, and API-driven approaches into a coherent decision framework for recommendation system design and deployment.

The lens throughout is **personalization strategy** — evaluating trade-offs between recommendation approaches based on catalog structure, user behavior signals, team capabilities, and business outcomes, not just technical implementation.

---

## When to Use This Skill

Apply this skill when:

- Designing a recommendation strategy for a new campaign or Canvas
- Choosing between rules-based and AI-powered recommendation approaches
- Integrating third-party recommendation engines (Dynamic Yield, Certona, Amazon Personalize, Amplitude, Movable Ink, Personalize.AI, FullStory) with Braze
- Troubleshooting recommendation accuracy, coverage, or analytics gaps
- Building post-action recommendation flows (e.g., content discovery after a user completes a watch/read/purchase)
- Storing and retrieving recommendation engine output via Braze user profiles

---

## Scope of Knowledge

### Braze-Native Recommendation Approaches

**Rules-Based Recommendations**
Construct recommendations using Liquid logic combined with Braze Catalogs or Connected Content. Rules-based engines are deterministic: they match user attributes and behavior (purchase history, viewed content, loyalty tier) to catalog items using explicit filtering logic. Use this approach when editorial control matters, catalog taxonomy is well-defined, or AI training data is insufficient.

**AI-Powered Recommendations**
Braze's native AI Item Recommendations analyze catalog interaction data to surface personalized items without manual rule authoring. Key operational constraints: training takes 10 minutes to 36 hours; a trained model requires an associated catalog; analytics are accessible at Analytics > Item Recommendation. Use this approach when behavioral signal volume justifies model training and when personalization needs to scale beyond what rules can maintain.

### Using Recommendations in Messaging

Recommendations (both rules-based and AI-powered) surface in messages via Liquid personalization. Prerequisites before referencing a recommendation in a message:

- Recommendation engine trained and associated with a catalog
- Recommendation referenced in the message composer using the correct Liquid variable

### Recommendation Analytics

Evaluate model health at Analytics > Item Recommendation. Key metrics to assess:

- **Model accuracy** — how well predictions match actual interactions
- **Item coverage** — what fraction of catalog items appear in recommendations

Low coverage often signals a long-tail catalog problem or insufficient interaction data for tail items. Use analytics to decide whether to supplement AI recommendations with rules-based fallbacks.

### API-Driven Recommendations

Store recommendation engine output directly on Braze user profiles via the API, then retrieve product metadata at send time using Catalogs or Connected Content. This pattern decouples recommendation computation from Braze's native engines — useful when an external ML system owns the recommendation logic but Braze handles delivery.

Prerequisites:
- Recommendation engine output mapped to a Braze user attribute or custom event property
- Catalog or Connected Content endpoint serving item metadata by ID

---

## Third-Party Integration Landscape

When Braze-native recommendations are insufficient, several platforms integrate directly:

| Platform | Integration Pattern | Best For |
|---|---|---|
| **Dynamic Yield** | Experience Blocks embedded in email at open time | Real-time, open-time personalization in email |
| **Certona** | Connected Content calls to Certona recommendation API | ML-powered product recs in campaigns/Canvases |
| **Amazon Personalize** | API output stored on user profiles; retrieved via Catalogs/Connected Content | Custom ML models with AWS infrastructure |
| **Amplitude** | Cohort sync or attribute export to Braze | Behavioral segmentation feeding recommendation targeting |
| **Personalize.AI** | AI-generated customer attributes exported to Braze | Attribute-driven personalization and targeting |
| **Movable Ink** | Dynamic content blocks at render time | Creative-layer personalization in email |
| **FullStory** | Behavioral signals informing targeting | Session-behavior-driven audience construction |

For platforms with thin native documentation (Movable Ink, Dynamic Yield, Amazon Personalize standalone), verify current integration capabilities against vendor documentation before committing to an architecture.

---

## Recommendation Use Cases

### Post-Action Content Discovery

Trigger personalized content suggestions immediately after a user completes a meaningful action (finishing a video, completing a purchase, reading an article). Canvas entry via action-based trigger → recommendation Liquid in first message step. This pattern captures peak engagement intent.

### Cross-Sell and Upsell Flows

Rules-based: filter catalog by category affinity or complementary item tags derived from last purchase.
AI-powered: let the recommendation model surface items based on collaborative filtering signals across users with similar purchase sequences.

### Re-engagement with Relevant Inventory

Surface catalog items the user has not interacted with but that align with established preference signals. Combine AI recommendations with recency filters (exclude items viewed in the last N days) via Liquid to avoid recommendation fatigue.

---

## Strategic Decision Framework

Use this framework to select a recommendation approach:

**Start with data readiness.** Rules-based recommendations require a structured catalog and known user attributes. AI recommendations additionally require interaction event history (views, clicks, purchases) at sufficient volume to train a model.

**Assess editorial requirements.** If the business needs to control which items surface (e.g., promoted inventory, seasonal priorities, compliance constraints), rules-based or hybrid approaches provide that control. Pure AI models optimize for relevance signals, not business rules.

**Evaluate third-party necessity.** Braze-native engines cover most recommendation needs. Bring in third-party platforms when: real-time open-time rendering is required (Dynamic Yield, Movable Ink), advanced ML customization is needed (Amazon Personalize), or cross-channel recommendation consistency is a requirement (Certona, Personalize.AI).

**Plan for fallbacks.** AI models fail gracefully only if fallback logic exists. Always define a fallback recommendation set (rules-based, editorial, or popularity-ranked) for users with insufficient interaction history or when a model is retraining.

---

## Key Constraints and Watch-outs

- AI recommendation model training is asynchronous (10 min – 36 hrs); plan campaign timelines accordingly
- Recommendation engines require an associated catalog — catalog structure decisions affect recommendation quality
- Connected Content calls to third-party engines count against rate limits; cache aggressively for high-volume sends
- Liquid-based rules recommendations are evaluated at send time — ensure referenced catalog fields are populated and current
- Amazon Personalize and similar API-first platforms require explicit attribute-to-profile mapping before Braze can retrieve recommendations at send time

---

## References

For implementation details on specific approaches, consult the topic reference files in `references/`:

- `creating-recommendations.md` — Braze recommendation creation workflow
- `using-recommendations.md` — Liquid integration in message composers
- `recommendation-analytics.md` — Analytics navigation and metric interpretation
- `rules-based-recommendations.md` — Liquid + Catalog filtering patterns
- `ai-powered-recommendations.md` — Native AI engine setup and constraints
- `product-recommendations-via-api.md` — API storage and retrieval pattern
- `recommendation-use-cases.md` — Post-action and discovery flow examples
- `certona-recommendations.md` — Connected Content integration with Certona
- `dynamic-yield-recommendations.md` — Experience Block embedding
- `amazon-personalize-recommendations.md` — AWS Personalize integration
- `personalize-ai-recommendations.md` — Personalize.AI attribute export
- `amplitude-recommendations.md` — Amplitude signal integration
- `movable-ink-recommendations.md` — Movable Ink dynamic content
- `fullstory-recommendations.md` — FullStory behavioral signal usage
```

`★ Insight ─────────────────────────────────────`
- The decision framework section is the most valuable addition beyond raw topic synthesis — it's the strategic connective tissue a `braze-strategist` role needs that individual topic files can't provide on their own
- The integration table collapses 8+ thin topic files into a scannable format, compensating for topics where source docs were minimal — this is the skill's highest-leverage content
- Fallback planning is called out explicitly because it's a common omission in recommendation strategies that causes production incidents — exactly the kind of non-obvious operational knowledge a skill should encode
`─────────────────────────────────────────────────`
