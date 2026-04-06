---
name: engagement-tools-messaging-fundamentals-drag-and-drop-editor-blocks
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/drag_and_drop_editor_blocks
indexed_at: '2026-04-05'
keywords:
  - blocks
  - editor
  - layout
  - personalization
  - liquid
  - email
  - content
  - responsive
  - messaging
  - canvas
triggers:
  - how to drag blocks
  - how to configure content blocks
  - how to use Liquid personalization
  - set mobile responsive display
  - create email layouts
---
```
★ Insight ─────────────────────────────────────
• This source uses Jekyll's `{% sdktabs %}` / `{% multi_lang_include %}` macros — the actual block content lives in two separate partials, not in this file. Processing what's structurally present is the right call here.
• Topic files in Nick's pipeline are meant to be self-contained atomic units; when source docs depend on includes, the topic should capture the organizational intent and known facts rather than empty scaffolding.
─────────────────────────────────────────────────
```

## Drag-and-Drop Editor Blocks

The Braze Drag-and-Drop Editor exposes a library of content blocks that serve as the building blocks of messages. Blocks are context-specific: the available set differs between **email** campaigns and **in-app message** campaigns.

### Two Editor Contexts

| Context | Use Case |
|---|---|
| **Email** | Full email campaigns and Canvas email steps |
| **In-App Messages** | Modal, full-screen, and slideup IAM formats |

Each context has its own block palette; not all blocks are available in both.

### Common Block Categories

Most Braze DnD editors expose blocks across these categories:

- **Layout** — Row/column containers that control structure and spacing
- **Content** — Text, image, button, divider, spacer blocks
- **Media** — Image, GIF, video embed
- **Dynamic** — Liquid-powered personalization content
- **Social** — Icon rows linking to social profiles
- **HTML** — Raw HTML escape hatch for custom rendering

### Usage Pattern

1. Drag a block from the left-side palette onto the canvas.
2. Click the block to open its properties panel on the right.
3. Configure content, styling, and any Liquid personalization inline.
4. Blocks stack vertically within rows; rows control horizontal layout.

### Key Facts

- Blocks are non-destructively editable — changes do not affect other instances.
- Each block can carry its own mobile-responsive display rules (show/hide on device type).
- The **HTML block** allows arbitrary markup but bypasses the visual editor's safety rails.
- Liquid tags (`{{ }}` and `{% %}`) are supported inside text and button blocks for personalization.
