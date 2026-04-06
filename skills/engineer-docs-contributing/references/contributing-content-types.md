---
name: contributing-content-types
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/content_types'
indexed_at: '2026-04-05'
keywords:
  - documentation
  - tutorials
  - guides
  - content
  - references
  - explanations
  - markdown
  - diátaxis
triggers:
  - content type guidelines
  - documenting use cases
  - writing how-to guides
  - organizing documentation
  - markdown header syntax
---
# Braze Docs: Content Types

Braze Docs follows the [Diátaxis framework](https://diataxis.fr/), organizing pages into four primary content types plus release notes.

## Content Type Overview

| Type | Purpose |
|------|---------|
| How-to guides | Help the user **apply knowledge** |
| Tutorials | Help the user **acquire knowledge** |
| References | Provide **technical knowledge** |
| Explanations | Broaden **contextual knowledge** |
| Release notes | Inform about product updates |

A single page may contain multiple content types, but each type should have a dedicated section.

---

## How-to Guides

Action-based, chronological steps for completing a specific task.

**Two variants:**
- **Generic** — for general task documentation
- **Technology Partner** — only for content in the Technology Partners section

### Guidelines
- Cover only what's needed to take action
- Document only the recommended method (no alternatives)
- Include only reference material vital to the user's goal within the article
- Link out to longer reference material (e.g., Segmentation filters)
- Do not include troubleshooting steps inline

### Header Syntax

Short steps — H2 headers should be action-oriented:
```markdown
## Creating a page

1. Open the relevant directory in `braze-docs`.
2. Create a new Markdown file for your page.
3. (Optional) Generate a preview by running `rake` in your terminal.
```

Long/complex steps — use nested headers, append `(optional)` to optional ones:
```markdown
## Creating a page

### Step 1: Create a new file
...

### Step 2: Add a template
...

### Step 3: Generate a preview (optional)
...
```

---

## Tutorials

Two variants:
- **Use case** (preferred) — practical, real-world scenario using an imaginary brand
- **Generic** — learning-oriented, guided activities for users with little familiarity

### Use Case Guidelines
- Use a hypothetical but realistic scenario with a fictional brand
- Highlight value across industries (eCommerce, finance, gaming, etc.)
- Show common Braze usage patterns (abandoned cart, loyalty programs, etc.)
- Make clear the scenario is fictional — users should not follow steps with real data

**Header syntax:** Prepend title with `Use case:` — e.g., `Use case: Abandoned cart`

### Generic Tutorial Guidelines
- Guide the user step-by-step through an activity or scenario
- Assume little to no prior familiarity with the tools/platforms
- Provide ready-made assets for steps that aren't the tutorial's focus

**Header syntax:** Prepend title with `Tutorial:` — e.g., `Tutorial: Your first contribution`

---

## References

Information-oriented, objective, authoritative, technical content.

### Guidelines
- Create technical descriptions necessary to complete a task
- Organize alphabetically, categorically, or hierarchically
- Keep references in their respective articles unless:
  - They're too long and disrupt the flow of a how-to guide
  - They're referenced by multiple articles

---

## Key Distinctions

| How-to | Tutorial | Reference |
|--------|----------|-----------|
| Task completion | Learning/exploration | Lookup/lookup |
| User already knows what they want | User is building understanding | User needs a specific fact |
| Step-by-step | Activity/scenario | Descriptive/tabular |
