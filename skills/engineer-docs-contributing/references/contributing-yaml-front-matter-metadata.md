---
name: contributing-yaml-front-matter-metadata
source_url: >-
  https://braze-inc.github.io/braze-docs/_contributing/yaml_front_matter/metadata
indexed_at: '2026-04-05'
keywords:
  - frontmatter
  - yaml
  - metadata
  - jekyll
  - markdown
  - navigation
  - permalink
  - layout
  - channel
  - taxonomy
triggers:
  - configure page metadata
  - add front matter to markdown
  - set up page layout
  - hide from navigation
  - create page alias
---
## YAML Front Matter Metadata

Jekyll front matter is added at the top of any Markdown file between triple-dash delimiters:

```markdown
---
nav_title: Getting started
article_title: Getting started with Braze Docs
description: "If you're new to Braze Docs, start with this step-by-step tutorial."
---
```

---

## Required Keys

| Key | Purpose | Constraints |
|-----|---------|-------------|
| `article_title` | Page title in search results and browser tab | Any string |
| `description` | Page description in search results | String under 150 chars, surrounded by double quotes |
| `nav_title` | Title in left-side navigation bar | String under 30 chars; not required if `hidden: true` |

---

## Optional Keys

### `alias`
Creates an alternate URL path that loads the page directly (no `?redirect` appended). Must be unique across all URLs — use sparingly.

```markdown
alias: "/brazeai/liquid"
```

### `channel`
Sets related messaging channels. Accepts a list of: `content cards`, `email`, `in-app messages`, `news feed`, `push`, `sms`, `webhooks`.

```markdown
channel:
  - email
  - push
```

### `config_only`
Hides page content but keeps it visible in navigation. Used for sections without a landing page. Accepts `true`/`false`.

### `hidden`
Hides the page from left-side navigation. Accepts `true`/`false`.

### `hide_toc`
Hides the in-page table of contents on the right side. Accepts `true`/`false`.

### `layout`
Sets the page layout (defaults to `default` if omitted). Accepted values:
- `api_page`, `dev_guide`, `featured_video`, `featured`, `glossary_page`, `blank_config`, `redirect`

```markdown
page_layout: glossary_page
```

### `noindex`
Hides the page from internal and external search (Braze Docs, Google). Accepts `true`/`false`.

### `page_order`
Controls position in left-side navigation. Accepts any non-negative number (`0`, `5.5`, `35.6`).

### `page_type`
Sets page formatting. Accepted values: `glossary`, `solution`, `reference`, `tutorial`, `landing`, `partner`, `update`.

### `permalink`
Used with `hidden: true` to override the default URL. Value is prepended with `https://www.braze.com/docs`. Requirements:
- Lowercase characters
- Words separated by underscores (`_`)
- Directories separated by forward slashes (`/`)
- No other special characters

```markdown
hidden: true
permalink: /support_contact/docs_team/
```

### `platform`
Sets the page's related Braze SDKs as a list.

```markdown
platform:
  - iOS
  - Web
  - Android
```

### `toc_headers`
Limits which heading levels appear in the table of contents. By default all levels are shown. Accepted values: `h1`, `h2`, `h3`.

```markdown
toc_headers: h2
```
