---
name: engagement-tools-landing-pages-creating-pages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/creating_pages
indexed_at: '2026-04-05'
keywords:
  - landing-pages
  - forms
  - blocks
  - email-capture
  - customization
  - attributes
  - favicon
  - template
  - editor
  - liquid
triggers:
  - create a landing page
  - set up landing page forms
  - design landing pages
  - capture user preferences
  - add form blocks
---
`★ Insight ─────────────────────────────────────`
- Nick's topic files use the `references/` subdirectory pattern — they're atomic knowledge units meant to be surfaced independently, so stripping navigation liquid tags and Jekyll-specific template syntax is essential for portability.
- The two-layer hierarchy (Skills → Topics) means topic files should be dense and factual, not narrative — agents retrieve these at query time, so scanability matters more than prose flow.
`─────────────────────────────────────────────────`

```markdown
# Creating Landing Pages

Landing pages in Braze let you collect user preferences and grow your audience via a drag-and-drop editor.

## Access Requirements
Requires specific permissions configured by your Braze admin (Messaging > Landing Pages).

## Creation Workflow

### Step 1 — New Draft
Navigate to **Messaging > Landing Pages** and select **Create landing page**. Existing pages can be duplicated from this view.

### Step 2 — Page Details

**General details** (internal only, not customer-visible):
- Name and description for workspace search/organization

**Site details** (customer-visible, affects SEO):

| Field | Purpose | Best Practice |
|---|---|---|
| Site title | Browser tab display | Max 60 characters |
| Meta description | Search result snippet | 140–160 characters |
| Favicon | Browser tab icon | 1:1 ratio, PNG/JPEG/ICO |
| Page URL | Landing page URL path | Must be unique per workspace; used by landing page Liquid tags |

### Step 3 — Customize with Drag-and-Drop Editor

Select **Save as draft**, then **Edit landing page**. The editor preloads a default template. All blocks must be placed inside a row.

#### Basic Blocks

| Block | Description |
|---|---|
| Title | Heading/section text |
| Paragraph | Rich-text body content |
| Button | Clickable action (link or form submit) |
| Radio Button | Single-select; logs custom attribute on submit |
| Image | Upload or external URL |
| Link | Standalone or inline hyperlink |
| Spacer | Vertical spacing element |
| Custom Code | Raw HTML/CSS/JavaScript |

#### Form Blocks

Form blocks write submitted data directly to user profiles in Braze. A confirmation page is required when using forms.

| Block | Behavior on Submit |
|---|---|
| Email Capture | Adds email to user profile |
| Phone Capture | Subscribes user to SMS/WhatsApp subscription group |
| Input Field | Writes standard attributes (name) or custom attribute string |
| Dropdown | Sets custom attribute from predefined list |
| Checkbox | Sets attribute to `true` (checked) or `false` (unchecked) |
| Checkbox Group | Adds values to a custom attribute array |

**Important:** Embed the landing page Liquid tag in any associated message so Braze can identify and update existing user profiles on form submission.

#### Page Container Styles
Set global styles (background, colors, borders) from the **Page container** tab. These apply workspace-wide unless overridden at the block level. Configure container styles before block-level styles.

#### Responsive Layout
Enable **Vertically stack on smaller screens** per row column to adapt layout for mobile. Reverse stack order is also configurable for multi-column rows — no custom code required.

#### Required vs. Optional Fields
Form fields can be marked required (must be filled before submit) or optional. Use **Required input field** toggle for consent checkboxes and mandatory data capture.

### Step 4 — Confirmation Page

Required if the landing page includes any form block. Create a second landing page that thanks the user or provides next steps after form submission.
```

`★ Insight ─────────────────────────────────────`
- Jekyll liquid tags (`{{site.baseurl}}`, `{% image_buster %}`, `{% tabs %}`) are stripped out since they're Jekyll-build-time artifacts — they'd appear as literal text in a Nick topic file and break readability.
- The table structure is preserved because Nick's agents scan reference files for structured facts; tables give the retrieval step clear key-value signal without prose noise.
`─────────────────────────────────────────────────`
