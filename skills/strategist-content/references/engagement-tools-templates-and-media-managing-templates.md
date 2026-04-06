---
name: engagement-tools-templates-and-media-managing-templates
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/managing_templates
indexed_at: '2026-04-05'
keywords:
  - templates
  - duplicating
  - archiving
  - campaigns
  - draft
  - published
  - content-blocks
  - unarchive
triggers:
  - how to duplicate templates
  - how to archive templates
  - managing templates
  - duplicate multiple templates
---
## Managing Templates

Templates in Braze can be duplicated or archived from the **Templates** section of the dashboard.

---

### Duplicating Templates

**Single template:** Select the cog icon on the template row → **Duplicate**.

- **Content Block templates:** Creates a draft copy.
- **All other templates:** Creates a published duplicate automatically.

**Multiple templates:** Check the boxes next to template names → **Duplicate**.

- Duplicated templates are named `Copy of ORIGINAL_TEMPLATE_NAME` by default.
- Find them by sorting the **Last Edited** column (newest first).

---

### Archiving Templates

**Single template:** Select the settings icon on the template grid → **Archive**.

**Multiple templates:** Check boxes next to each template → **Archive**.

To view archived templates: set **Show** → **Archived** in the template grid.

**Key behaviors when a template is archived:**

| Scenario | Behavior |
|---|---|
| Active campaigns using the template | Continue unaffected |
| Draft campaigns using the template | Retain content; can still be edited and launched |
| Editing an archived template | Must unarchive first |
| Using an archived template in a new campaign | Must unarchive first |

> **Note:** Archiving is **not available** for link templates.
