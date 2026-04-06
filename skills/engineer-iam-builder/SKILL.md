---
name: engineer-iam-builder
description: >-
  Implements in-app messages using drag-and-drop editor, custom HTML, and
  creative detail configurations.
metadata:
  role: braze-engineer
  topics:
    - in-app_messages-drag_and_drop-create
    - in-app_messages-drag_and_drop-editor_blocks
    - in-app_messages-drag_and_drop-style_settings
    - in-app_messages-creative_details-slideup
    - in-app_messages-creative_details-modal
    - in-app_messages-creative_details-fullscreen
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes CSO (Claude Search Optimization) — the skill body needs keyword-rich sections so future agents can find it by symptom, not just by name. Topics like "slideup", "modal", "fullscreen", "drag-and-drop" and "editor blocks" should appear explicitly as searchable terms rather than being abstracted away.
`─────────────────────────────────────────────────`

# In-App Message Builder

## Overview

Use this skill when building, configuring, or troubleshooting in-app messages in Braze — including choosing message types (slideup, modal, fullscreen), setting up the drag-and-drop editor, applying style settings, and configuring interactive elements. Covers both the visual editor workflow and custom HTML paths.

The lens here is **layout and interactivity**: how message types behave on-screen, how editor blocks compose into a finished message, and how style settings control the visual output.

## When to Use

- Implementing a new in-app message campaign or Canvas step
- Choosing between slideup, modal, or fullscreen based on message priority and UX impact
- Building a message with the drag-and-drop editor
- Migrating an HTML template to the drag-and-drop editor
- Configuring style settings (fonts, colors, button behavior, background overlays)
- Troubleshooting layout issues — content clipping, button placement, orientation behavior

**Not covered here:** Triggered delivery logic, audience targeting, A/B testing, or SDK integration. For triggering rules, see the campaign configuration skill.

## Message Type Reference

### Slideup

Non-obtrusive messages that appear at the **top or bottom** of the screen (set at creation time, not changeable after). Users can continue interacting with the app while the slideup is visible.

- Supports: text, one button, image (left-side icon)
- No background overlay — app remains interactive
- Best for: soft nudges, tips, transient status updates
- Dismiss behavior: swipe or tap outside

### Modal

Centered overlay with a semi-transparent background. Blocks app interaction until dismissed.

- Supports: header, body, image (top or icon), up to two buttons
- Background tap can be configured to dismiss or not
- Best for: confirmations, permission requests, feature announcements
- Header and body are separate configurable text blocks

### Fullscreen

Occupies the entire device screen. Highest visual weight and interruption level.

- Fills full device height and width
- Supports: image (top half), header, body, up to two buttons
- Best for: mandatory upgrade prompts, onboarding steps, critical announcements
- No dismiss-on-tap-outside option — user must interact with buttons

## Drag-and-Drop Editor

### Key Constraint

Existing **HTML templates cannot be converted** to drag-and-drop format. Rebuilding is required. Plan for this if migrating legacy messages.

### Editor Structure

The editor is split into two sections:

| Section | Purpose |
|---|---|
| **Build** | Compose the message using editor blocks |
| **Preview & Test** | View rendering across device sizes, send test |

### Editor Blocks

Blocks are the atomic units of a drag-and-drop message. Common block types:

- **Text** — body copy, supports inline formatting
- **Image** — upload or URL reference; controls aspect ratio and fill behavior
- **Button** — configure label, action (deep link, URL, dismiss, log custom event), and style
- **Divider** — visual separator between sections
- **Spacer** — adds vertical padding between blocks
- **HTML** — escape hatch for custom markup within a block

Blocks are added from the block palette and reordered by drag. Each block has independent style settings (padding, alignment, background).

## Style Settings

Style settings apply at two levels:

### Message-Level Styles (applied to the whole message container)

- Background color or image
- Border radius (controls corner rounding)
- Max width (for modal, constrains on tablet/desktop)
- Overlay opacity (modal/fullscreen only)

### Block-Level Styles (applied per block)

- Font family, size, weight, color
- Text alignment
- Padding (top, right, bottom, left)
- Background color per block
- Button shape, fill vs outline style, border color

### Button Configuration

Each button requires:
1. **Label text**
2. **Click action**: Close message / Open URL / Deep link / Log custom event / None
3. **Style**: Primary vs secondary (maps to distinct color slots in style settings)

## Common Mistakes

| Mistake | Fix |
|---|---|
| Setting slideup position after campaign launch | Position is locked at creation — create a new variant to change it |
| Expecting HTML templates to import into drag-and-drop editor | Rebuild manually; no migration path exists |
| Applying style settings at the wrong level | Message-level styles affect the container; block-level styles affect individual blocks — check both when debugging visual output |
| Fullscreen message clipping on small screens | Content below the fold requires scrolling only if scroll is enabled; restructure content or use modal instead |
| Button click action left as "None" | Message won't dismiss on button tap — always set an explicit action |

## Quick Reference

```
Slideup   → low interruption, top/bottom, no overlay, 1 button max
Modal     → medium interruption, centered overlay, 2 buttons max
Fullscreen → high interruption, full screen, 2 buttons max, mandatory interaction

Drag-and-drop: Build tab → add blocks → configure each block → Preview & Test
HTML custom: separate editor, cannot convert to drag-and-drop afterward
```

`★ Insight ─────────────────────────────────────`
The Quick Reference block at the end encodes the decision logic as scannable text rather than a flowchart — appropriate here because the decision between message types is a simple priority ranking, not a branching decision tree. Flowcharts add value when Claude might prematurely terminate a loop or miss a branch; for linear reference, a table or code block scans faster.
`─────────────────────────────────────────────────`
