---
name: item-recommendations-using-recommendations
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/item_recommendations/using_recommendations
indexed_at: '2026-04-05'
keywords:
  - recommendation
  - catalog
  - liquid
  - personalization
  - array
  - fields
  - image
  - messaging
  - template
triggers:
  - how to add item recommendations
  - using product recommendations
  - personalizing with recommendations
  - displaying recommended items
---
# Using Item Recommendations in Messaging

## Prerequisites

- A trained recommendation engine (takes 10 min – 36 hrs; email sent on completion)
- A catalog associated with the recommendation

---

## Adding Liquid Code

### Option A: Via the Composer UI

1. In any message composer supporting personalization, open **Add Personalization** (circle-plus icon)
2. Set **Personalization Type** → **Item Recommendation**
3. Set **Item Recommendation Name** → your recommendation
4. Set **Number of Predicted Items** (e.g., `3`)
5. Set **Information to Display** → select catalog fields per item
6. Copy the generated Liquid and paste into your message

### Option B: Custom Liquid Code

The `product_recommendation` object is a structured array where each element is a recommended catalog item.

**Assign the recommendation to a variable:**
```liquid
{% assign items = {{product_recommendation.${recommendation_name}}} %}
```

**Reference specific items by index (0-based):**
```liquid
{% assign items = {{product_recommendation.${recommendation_name}}} %}
{{ items[0].name }} for {{ items[0].price }}
{{ items[1].name }} for {{ items[1].price }}
{{ items[2].name }} for {{ items[2].price }}
```

| Concept | Detail |
|---------|--------|
| Array indexing | `items[0]` = first item, `items[1]` = second, etc. |
| Field access | Dot notation: `items[0].name`, `items[0].price` |
| Out-of-bounds | Referencing an index with no item returns an empty field |

---

## Referencing Images (Optional)

If your catalog includes image URL fields, you can use them in messages.

### Drag-and-Drop Email Editor

In **Image properties**, toggle **Image with Liquid**, then set the **Dynamic URL** (single line):

```liquid
{% assign items = {{product_recommendation.${recommendation_name}}} %}{{ items[0].image_url_field }}
```

### HTML

```html
{% assign items = {{product_recommendation.${recommendation_name}}} %}
<img src="{{ items[0].image_url_field }}" alt="{{ items[0].name }}">
```

| Placeholder | Description |
|-------------|-------------|
| `recommendation_name` | Name of the AI recommendation created in Braze |
| `image_url_field` | Catalog field name containing image URLs |

---

## Key Notes

- All recommended items come from the catalog linked to the recommendation at training time
- Field names in Liquid (`.name`, `.price`, `.image_url`) must match the actual column names in your catalog
- Referencing an index beyond what the recommendation returns yields an empty string — guard against this in production templates
