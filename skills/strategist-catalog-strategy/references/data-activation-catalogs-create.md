---
name: data-activation-catalogs-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/catalogs/create
indexed_at: '2026-04-05'
keywords:
  - catalog
  - CSV
  - upload
  - import
  - data-types
  - Liquid
  - API
  - CDI
  - template
  - fields
triggers:
  - create a catalog
  - upload CSV data
  - import product data
  - reference catalog items in messages
  - define catalog data types
---
# Creating Catalogs

Catalogs allow you to import non-user data (CSV or API) into Braze and reference it in messages via Liquid, similar to custom attributes or event properties.

**Common use cases:** products, services, food, events, music, packages

## Supported Data Types

| Data Type | CSV Upload | API / CDI |
|-----------|:----------:|:---------:|
| String | ✅ | ✅ |
| Number (int or float) | ✅ | ✅ |
| Boolean | ✅ | ✅ |
| Time (ISO 8601 string) | ✅ | ✅ |
| JSON object | ⛔ | ✅ |
| String array (max 100 elements) | ⛔ | ✅ |

> **Note:** Data types cannot be changed after catalog creation. `NULL` values in CSV are treated as strings.

## Creating a Catalog

Navigate to **Data Settings > Catalogs**, then select **Create New Catalog**.

### Option A: Upload CSV

**CSV Requirements:**

| Requirement | Details |
|-------------|---------|
| First column | Must be named `id`; each row needs a unique value |
| Columns | Max 1,000 fields; column names up to 250 characters |
| File size | Free: 100 MB total across company; Pro: 2 GB per file |
| Field values | Up to 5,000 characters per cell |
| Valid characters | `id` and headers: letters, numbers, hyphens, underscores only |
| Encoding | UTF-8 |
| Formatting | All text in lowercase recommended |

**Steps:**
1. Drag-and-drop or upload the CSV file
2. Select a data type for each column (cannot be changed later)
3. Enter a catalog name (unique, max 250 chars, letters/numbers/hyphens/underscores)
4. Optionally add a description
5. Select **Process Catalog**

### Option B: Create in Browser

**Required user permissions:** View Catalogs, Edit Catalogs, Export Catalogs, Delete Catalogs

Enter a catalog name and optional description using the same naming rules as CSV upload.

## Catalog Naming Rules

- Must be unique across your workspace
- Max 250 characters
- Only letters, numbers, hyphens, and underscores
- Catalog names support templates for dynamic generation (e.g., by language or campaign)
- **Cannot be edited after creation** — delete and re-upload with the same name to rename

## Example CSV Structure

```
id,title,price,image_link
1234,Tales,7.49,https://example.com/img1.jpg
1235,Regeneration,22.49,https://example.com/img2.jpg
```

Column types: `id` → string, `title` → string, `price` → number, `image_link` → string

After creation, reference catalog items in campaigns using Liquid syntax.
