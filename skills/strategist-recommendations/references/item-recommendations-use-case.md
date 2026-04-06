---
name: item-recommendations-use-case
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/use_case
indexed_at: '2026-04-05'
keywords:
  - recommendations
  - personalization
  - catalogs
  - events
  - messaging
  - templating
  - attributes
  - campaign
  - trigger
triggers:
  - how to create item recommendations
  - how to trigger post-viewing messages
  - how to build recommendation campaigns
  - how to measure recommendation performance
  - how to personalize content discovery
---
## Recommendation Use Cases: Drive Content Discovery After Viewing

AI Item Recommendations can trigger personalized content suggestions immediately after a user completes an action (e.g., finishing a film), replacing static genre-matching with behavior-driven, catalog-backed recommendations.

---

### Setup Overview

**Scenario:** Post-viewing "You might also like" messages for a streaming platform, triggered the moment a user finishes watching content.

---

### Step 1: Create the Recommendation

In **AI Item Recommendations**, create a new recommendation:

| Setting | Value |
|---|---|
| Type | AI Personalized |
| Previously interacted items | Exclude (users won't see already-watched titles) |
| Catalog | Full content library catalog |
| Linked event | `Watched Content` (custom event tracking completed views) |
| Property Name | Content title |

---

### Step 2: Build the In-App Message

1. Create an in-app message campaign using the drag-and-drop editor
2. Set trigger to the `Watched Content` custom event
3. Use the **Add Personalization modal** → select **Item recommendation** as personalization type
4. Insert Liquid variables to pull fields from the recommendation:

```liquid
{% assign items = {{product_recommendation.${Post-viewing suggestions}}} %}
{{ items[0].name }}
{{ items[0].description }}
{{ items[0].thumbnail }}
```

5. Duplicate pages and increment the array index for each additional recommendation slot:
   - Page 1: `items[0]`
   - Page 2: `items[1]`
   - Page 3: `items[2]`

You can also template in a custom attribute (e.g., `Last Watched Movie`) to contextualize the recommendation ("Because you watched...").

---

### Step 3: Measure and Optimize

Key metrics to track: open rates, CTR, follow-up viewing sessions.

Recommended A/B tests:
- **Timing:** Immediate vs. 10 minutes post-watch
- **Layout:** Carousel vs. list
- **CTA copy:** "Watch now" vs. "Add to queue"

---

### Key Pattern

```
User completes watched_content event
  → Recommendation engine scores catalog items against watch history
  → In-app message fires immediately
  → Liquid populates title, description, thumbnail from catalog
  → Multi-page message cycles through items[0], items[1], items[2]
```

This pattern works for any catalog-backed domain: e-commerce (post-purchase), media (post-read), apps (post-session).
