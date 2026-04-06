---
name: catalogs-catalog-selections
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/catalogs/selections
indexed_at: '2026-04-05'
keywords:
  - selections
  - catalogs
  - filters
  - personalization
  - liquid
  - attributes
  - sorting
  - items
  - recommendations
triggers:
  - Create a selection
  - Filter catalog items
  - Personalize messages with catalogs
  - Use catalog selections
  - Preview catalog results
---
## Catalog Selections Overview

Selections are filtered views of catalog data used to personalize messages. They allow you to define criteria (filters) that items must meet before being shown to users — filtering by brand, size, location, date added, etc.

### Limits

- Up to **30 selections** per catalog
- Up to **10 filters** per selection
- Up to **50 results** returned per selection
- String fields with more than 1,000 characters cannot be used as filter fields

### Creating a Selection

1. Go to **Catalogs**, select your catalog, then the **Selection** tab
2. Click **Create Selection**
3. Enter a name and optional description
4. Set **Filter Field** — the catalog column to filter by
5. Choose an operator (e.g., "equals", "does not equal") and attribute value
6. Configure **Sort type**:
   - Default: no particular order (randomized)
   - To sort by field: disable **Randomize Sort Order**, then set **Sort Field** and **Sort Order** (ascending/descending)
7. Set **Results limit** (max 50)
8. Click **Create Selection**

### Previewing a Selection

Use the **Preview for user** section after creation to test output for a random or specific user. Selections using Liquid personalization require a specific user to be selected before previewing.

### Liquid Support

Liquid (custom attributes, custom events) can be used in filter attributes — this means results may differ per user. **Connected Content Liquid is not supported** in filter settings.

### Using a Selection in a Message

1. In any message composer, open the personalization window (the `+` icon)
2. Set **Personalization Type** → **Catalog Items**
3. Select your **Catalog Name**
4. Set **Item selection method** → **Use a selection**
5. Choose your selection
6. Select which **catalog fields** to include per item
7. Copy the generated Liquid and paste it into your message

### Example Use Case: Meal Delivery Recommendations

**Scenario**: Recommend meals based on a user's most recently viewed food category.

**Setup**:
- Catalog contains: meal name, price, image, category
- Selection filters: `product_type = meal` AND `category = {{most_recently_viewed_category}}`
- Sort: randomized, limit 3 results

**Result**: Each user receives 3 meal recommendations matching their browsing history — a user who viewed "Chicken" gets chicken dishes; a user who viewed "Beef" gets beef dishes — all from the same selection, personalized via Liquid.
