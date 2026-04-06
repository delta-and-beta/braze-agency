---
name: contributing-content-management
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/content_management'
indexed_at: '2026-04-05'
keywords:
  - jekyll
  - markdown
  - frontmatter
  - collection
  - snippet
  - repository
  - navigation
  - template
  - asset
  - documentation
triggers:
  - add a page to docs
  - structure documentation
  - embed images in documentation
  - reuse content snippets
  - organize documentation files
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live under `skills/{name}/references/*.md` and are designed to be fast-lookup documents. The goal when processing source docs is to strip Jekyll templating artifacts (`{% %}`, `{{site.baseurl}}`, `{% image_buster %}`) and distill what a developer would actually need to act on, without navigation scaffolding.
`─────────────────────────────────────────────────`

## Content Management

Braze Docs uses a **docs-as-code** methodology with Git version control, built on **Jekyll** (static site generator).

### Repository Structure

| Directory    | Purpose |
|--------------|---------|
| `_docs/`     | All written content as Markdown files, organized to mirror the site structure (e.g., `_api/`, `user_guide/`) |
| `_includes/` | Reusable modular content snippets (no standard formatting); used for content reuse across pages |
| `assets/img/`| All images (PNG); structure doesn't need to match `_docs/` but group related images in subdirectories |

Jekyll merges content and design files at build time, outputting to `_site/` as XML/HTML.

### Pages

Each page is a `.md` file with YAML front matter:

```markdown
---
nav_title: My Page
article_title: My Page
description: "Brief description."
page_order: 0
search_tag: TagName
---

# Page Title

> Introductory content here.
```

Key front matter fields: `nav_title`, `article_title`, `description`, `page_order`, `search_tag`.

### Images

Images are stored as PNGs in `assets/img/`. Embed with:

```markdown
![Alt text for screen readers.]({% image_buster /assets/img/DIRECTORY/IMAGE.png %})
```

Alt text is required for accessibility.

### Primary Sections

- Home
- User Guide
- Developer Guide
- Braze API Guide
- Technology Partners
- Braze Help
- Contributing to Braze Docs

Each primary section is built using Jekyll collections. Sections (except Contributing) are accessible from the site header.

### Content Reuse

Modular snippets in `_includes/` can be embedded in any `_docs/` or `_includes/` file, enabling DRY documentation patterns.
