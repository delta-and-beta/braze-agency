---
name: data-activation-catalogs-selections
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/catalogs/selections
indexed_at: '2026-04-05'
keywords:
  - catalog
  - selection
  - filter
  - personalization
  - liquid
  - attributes
  - recommendations
  - items
  - campaign
triggers:
  - create a catalog selection
  - preview selection results
  - personalize messages with catalog items
  - filter items by attributes
  - recommend products to users
---
## Catalog Selections

Selections are named, reusable filter sets applied to a catalog to return a refined subset of items. Use them to personalize messages—each user can receive different catalog items based on defined criteria.

**Limits:** Up to 30 selections per catalog, 10 filters per selection, 50 results per selection.

---

### Creating a Selection

1. **Catalogs** → select your catalog → **Selection** tab → **Create Selection**
2. Name the selection (description optional)
3. Set **Filter Field** — any catalog column (string fields >1,000 chars are excluded)
4. Choose operator (e.g., "equals", "does not equal") and attribute value
5. Repeat for up to 10 filters
6. **Sort type**: disable **Randomize Sort Order** to sort by a specific field (ascending/descending); leave enabled for random order
7. **Results limit**: set 1–50
8. **Create Selection**

> **Liquid support**: Custom attributes and custom events in filter values return per-user results. Connected Content Liquid is **not** supported in filter settings.

---

### Previewing a Selection

Use **Preview for user** after creation to see what a selection returns for a random or specific user. Selections using Liquid personalization require a specific user to be selected before preview works.

---

### Using Selections in Messages

Generate Liquid via the personalization window in any message composer:

1. Click the **Add Personalization** icon (`+` circle)
2. **Personalization Type** → `Catalog Items`
3. Select your **Catalog Name**
4. **Item selection method** → `Use a selection`
5. Choose your **Selection**
6. Select **Information to Display** (the catalog fields to include per item)
7. **Copy** the generated Liquid and paste into your message

---

### Use Case: Meal Delivery Recommendations

**Goal**: Recommend 3 meals matching a user's most recently viewed food category.

**Selection config**:
- Filter 1: `product_type` equals `meal`
- Filter 2: `category` equals `{% raw %}{{most_recently_viewed_category}}{% endraw %}` (Liquid custom attribute)
- Sort: randomized
- Results limit: 3

**Result**: A Content Card campaign using this selection automatically shows 3 relevant meals per user—chicken dishes for users who last viewed "Chicken," beef dishes for users who last viewed "Beef," and so on.
