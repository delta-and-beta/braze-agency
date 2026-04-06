---
name: engagement-tools-templates-and-media-content-blocks
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/content_blocks
indexed_at: '2026-04-05'
keywords:
  - blocks
  - templates
  - email
  - HTML
  - Liquid
  - API
  - embedding
  - nesting
  - archiving
  - preview
triggers:
  - create content blocks
  - use content blocks in emails
  - update content blocks
  - embed content in templates
  - archive content blocks
---
## Content Blocks

Reusable, cross-channel content managed from a centralized library. Use for email headers/footers, offer codes, pre-defined assets, and copyable message bodies.

### Creating Content Blocks

Two editor types, each producing a different block type:

| Editor | Block Type |
|--------|-----------|
| Drag-and-drop | Drag-and-drop block |
| HTML | HTML block |

Also creatable/manageable via the [Content Blocks API](https://www.braze.com/docs/api/endpoints/templates/).

**Specifications:**

| Attribute | Spec |
|-----------|------|
| Name | Required, max 100 chars. Cannot be renamed after saving. Must be unique (even vs. archived blocks). |
| Description | Optional, max 250 chars. |
| Content Size | Max 50 KB. |
| Placement | Cannot be used inside an email footer directly (workaround below). |

**Tip — strip whitespace when embedding:**
```liquid
{% capture your_variable %}
{{content_blocks.${your_content_block}}}
{% endcapture %}{{your_variable | strip}}
```

### Using Content Blocks

1. Copy the **Content Block Liquid Tag** from the block's detail page.
2. Paste it into your message, or start typing Liquid and let it auto-populate.

**Key constraints:**
- Do **not** mix editor types (HTML block in DnD email or vice versa) — causes rendering issues.
- Canvas entry properties referenced inside a Content Block won't populate when used in a campaign (Canvas-only).

### Updating and Copying

- Liquid-inserted blocks: editing the block updates it everywhere it's used.
- DnD-imported blocks (via Rows dropdown): edits do **not** propagate automatically.

To update a single message or create a variant:
- Copy the HTML manually into the new message, **or**
- Edit the original block and save → prompted to save as a new Content Block.

Actions available: **Launch Content Block** (save + launch) | **More > Duplicate** (creates a draft copy).

### Previewing

Hover over any block in the library → click the preview icon. Preview shows: creator, tags, dates, description, editor type, inclusion count (with clickable list of using messages), and a rendered preview.

### Nesting

- Supported: one level deep only (Block A inside Block B).
- **Not supported:** three levels deep (Block B inside Block C). Content and Liquid are silently removed — no error shown.

### Email Footers in Content Blocks

Content Blocks cannot be placed *inside* an email footer setting, but you can embed footer content *in* a Content Block:

1. **Settings > Email Preferences > Custom Footer** — create the footer.
2. Add that footer content to a Content Block.
3. Include the Content Block in your email templates.

### Archiving

- Archived blocks are **read-only**. Unarchive before editing.
- Cannot archive a block currently used in any message.

**When to archive vs. update:**

| Situation | Recommendation |
|-----------|---------------|
| Block used in a few emails | Archive old block, update live messages to a newer one. |
| Minor typo or small change | Update in place — do not archive. |
| Block used in too many messages to update individually | Remove all content from the block to prevent stale data propagation. |
| Accidentally archived | Unarchive via the settings dropdown on the block. |

`★ Insight ─────────────────────────────────────`
- The Liquid-vs-DnD update propagation difference is a subtle but critical behavior: teams relying on live updates must use Liquid insertion, not the DnD rows dropdown import path.
- The one-level nesting limit with silent failure (no error, content just disappears) is a common gotcha — worth surfacing prominently in any reference doc.
- The footer workaround pattern (create footer as a Content Block, apply to templates) is a reusable architecture pattern applicable to any repeating structural element, not just footers.
`─────────────────────────────────────────────────`
