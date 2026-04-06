---
name: contributing-yaml-front-matter-page-layouts
source_url: >-
  https://braze-inc.github.io/braze-docs/_contributing/yaml_front_matter/page_layouts
indexed_at: '2026-04-05'
keywords:
  - layout
  - YAML
  - frontmatter
  - markdown
  - redirect
  - glossary
  - api
  - configuration
  - pages
  - guide
triggers:
  - set page layout
  - configure page layouts
  - redirect page
  - apply page format
  - assign layout to page
---
## YAML Front Matter Page Layouts

Assign a layout to any page by setting `page_layout` in its YAML front matter:

```markdown
---
page_layout: PAGE_LAYOUT_VALUE
---
```

---

## Visual Layouts

### `api_page`
Applies the API page format (used for REST endpoint reference pages).

```markdown
---
layout: api_page
---
```

### `dev_guide`
Applies the developer guide format (used for grouped endpoint/SDK guide pages).

```markdown
---
layout: dev_guide
---
```

### `featured`
Applies the featured page format (used for AI/predictive feature landing pages).

```markdown
---
layout: featured
---
```

### `glossary_page`
Applies the glossary page format (used for definition-style reference pages).

```markdown
---
layout: glossary_page
---
```

**Tip:** Certain layout fields (e.g., `guide_top_text`) support inline Markdown via YAML block scalars:

```yaml
guide_top_text: >
    # This is example Markdown formatting
```

---

## Functional Layouts (Non-Visual)

### `blank_config`
Prevents page content from rendering when selected from navigation. Use with `config_only: true` for subsection landing pages with no content.

```markdown
---
layout: blank_config
config_only: true
---
```

### `redirect`
Redirects a page from its current URL to a new URL. The target URL omits `https://www.braze.com`.

```markdown
---
layout: redirect
redirect_to: /docs/some/new/path
---
```

**Warning:** Do not use `layout: redirect` if you are also moving, renaming, or reparenting the file. Use `broken_redirect_list.js` instead.

**Full example:**

```markdown
nav_title: Images
article_title: Managing Images
description: "Learn how to add, modify, and remove images on Braze Docs."
page_order: 1

layout: redirect
redirect_to: /docs/contributing/home
```

---

## Quick Reference

| Layout | Type | Use Case |
|---|---|---|
| `api_page` | Visual | REST API endpoint pages |
| `dev_guide` | Visual | Developer/SDK guide sections |
| `featured` | Visual | AI/featured feature pages |
| `glossary_page` | Visual | Definition/glossary pages |
| `blank_config` | Functional | Empty subsection landing pages |
| `redirect` | Functional | URL redirection (file stays in place) |
