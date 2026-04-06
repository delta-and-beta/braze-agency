---
name: engineer-docs-contributing
description: >-
  Contributes to Braze documentation following style guides, YAML front matter
  conventions, and content management workflows.
metadata:
  role: braze-engineer
  topics:
    - contributing-home
    - contributing-your-first-contribution
    - contributing-style-guide
    - contributing-content-types
    - contributing-content-management
    - contributing-yaml-front-matter
    - contributing-yaml-front-matter-metadata
    - contributing-yaml-front-matter-page-layouts
    - contributing-styling-examples
    - contributing-mermaid-support
    - contributing-bdocs
    - contributing-local-environment
    - contributing-git-and-github
    - contributing-generating-a-preview
    - contributing-troubleshooting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files intentionally omit YAML frontmatter in their body content — the pipeline wraps them in plugin structure. The markdown body serves as the "lens" through which Claude reads domain knowledge, so it should be dense with triggering vocabulary (error messages, workflow steps, tool names) that match how engineers actually phrase their questions.
`─────────────────────────────────────────────────`

# Documentation Contributing

## Overview

This skill covers authoring and contributing content to the Braze documentation site (`braze-inc/braze-docs`). Use it when writing, editing, or reviewing Braze docs — from setting up a local environment to structuring YAML front matter to following the Diátaxis content framework.

Braze Docs operates on a **docs-as-code** model: all contributions happen via GitHub, changes are previewed locally with Jekyll, and merges ship on a Tuesday/Thursday cadence.

---

## When to Use This Skill

Use when you need to:

- Contribute a new article, tutorial, or reference page to Braze Docs
- Understand or apply the correct YAML front matter for a page
- Set up or troubleshoot a local Jekyll preview environment
- Follow the Git branching and PR workflow for `braze-inc/braze-docs`
- Choose the right Diátaxis content type for a new page (how-to, reference, conceptual, tutorial)
- Work with the `bdocs` CLI wrapper for link management and redirect generation
- Add Mermaid diagrams to documentation
- Follow style guide conventions for voice, formatting, and code examples

---

## Lens: Documentation Authoring and Contribution Workflows

This skill reads Braze Docs through the lens of a **contributing engineer** — someone who needs to write accurate, well-structured documentation that passes review and ships cleanly. It emphasizes:

- Correct structure over creative latitude
- Convention adherence (front matter, layouts, content types) to avoid CI failures
- Efficient Git workflows targeting the `develop` branch
- Local preview fidelity before opening a PR

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **Contributing Home** | Community contribution rules, merge cadence (Tue/Thu), prerequisites |
| **Your First Contribution** | Docs-as-code workflow, web UI vs local environment paths |
| **Documentation Style Guide** | Voice, tone, formatting conventions |
| **Content Types** | Diátaxis framework — tutorial, how-to, reference, conceptual, release notes |
| **Content Management** | Page lifecycle, content ownership, publishing workflow |
| **YAML Front Matter** | Jekyll front matter syntax, triple-dash delimiters, required vs optional fields |
| **YAML Front Matter Metadata** | `nav_title`, `article_title`, `description`, SEO and navigation fields |
| **YAML Front Matter Page Layouts** | `page_layout` values and their visual rendering behavior |
| **Styling Examples** | Markdown/styling tab pairs; formatting patterns for callouts, tables, code blocks |
| **Mermaid Diagram Support** | Flowcharts, sequence diagrams, state diagrams via Mermaid JS |
| **BDocs System** | `bdocs` shell script — link checks, redirect generation, dependency tasks |
| **Local Environment Setup** | Fork, clone, install dependencies, run Jekyll server |
| **Git and GitHub Workflow** | Branch from `develop`, PR conventions, keeping branch current |
| **Generating a Preview** | `bundle exec jekyll serve`, branch checkout, localhost preview |
| **Contributing Troubleshooting** | Common setup errors, broken links, front matter validation failures |

---

## Key Conventions

### YAML Front Matter (Required on Every Page)

```markdown
---
nav_title: Short Nav Label
article_title: Full Article Title
description: "One-sentence description for SEO and search."
page_order: 2
page_layout: dev_guide
---
```

- All Markdown files require front matter between `---` delimiters
- `nav_title` drives sidebar navigation; keep it short
- `page_layout` controls visual template — choose from `dev_guide`, `featured`, `glossary_page`, etc.

### Content Type Selection (Diátaxis)

| You're writing... | Use content type |
|---|---|
| Step-by-step instructions | How-to |
| Conceptual background | Explanation |
| Lookup/API reference | Reference |
| Guided learning exercise | Tutorial |
| Version changes | Release Notes |

### Git Workflow

```bash
git checkout develop && git pull          # always start fresh
git checkout -b your-branch-name          # branch name: short, hyphenated
# make changes, then:
git add <files> && git commit -m "docs: description"
# open PR targeting develop
```

### Local Preview

```bash
bundle exec jekyll serve
# visit http://localhost:4000
```

### bdocs CLI

```bash
./bdocs check-links     # validate internal links
./bdocs redirects       # generate redirect entries
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| PR targeting `master` instead of `develop` | Always branch from and PR into `develop` |
| Missing `nav_title` in front matter | Required — sidebar will break without it |
| Using wrong `page_layout` value | Check YAML Front Matter Page Layouts topic for valid values |
| Mermaid diagrams not rendering | Wrap in `<div class="mermaid">` block, not fenced code block |
| Link check failures blocking merge | Run `./bdocs check-links` before pushing |
| Contribution outside Tue/Thu window | Merges are batched — PR may sit until next window |
