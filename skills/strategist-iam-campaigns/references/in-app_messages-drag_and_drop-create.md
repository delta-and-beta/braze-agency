---
name: in-app_messages-drag_and_drop-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/drag_and_drop/create
indexed_at: '2026-04-05'
keywords:
  - campaign
  - canvas
  - drag-and-drop
  - in-app
  - template
  - editor
  - SDK
  - pages
  - preview
  - modal
triggers:
  - create drag-and-drop in-app messages
  - build personalized in-app messages
  - set up in-app message campaigns
  - connect pages in messages
  - test in-app messages
---
# Create Drag-and-Drop In-App Message

## Overview

Build custom, personalized in-app messages using Braze's drag-and-drop editor in campaigns or Canvas flows. Existing HTML templates must be recreated — they cannot be imported directly.

**Campaign vs Canvas:** Use campaigns for single targeted messages; use Canvas for multi-step user journeys.

## SDK Requirements

| | Minimum | Recommended |
|---|---|---|
| Swift (iOS) | 5.0.0 | 6.5.0 |
| Android | 8.0.0 | 26.0.0 |
| Web | 2.5.0 | 4.8.1 |

Users below minimum versions will not receive drag-and-drop messages.

**Feature-specific minimums:**

| Feature | Swift | Android | Web |
|---|---|---|---|
| Text links (non-dismissing) | 6.2.0 | 26.0.0 | — |
| Request push primer | 6.5.0 | 26.0.0 | 4.8.1 |

> If a user is below the text links minimum, clicking a link closes the message and they cannot return to submit forms.

## Prerequisites

- **Web SDK:** Set `allowUserSuppliedJavascript: true` in initialization options (`enableHtmlInAppMessages` is deprecated).
- **Google Tag Manager:** Enable "Allow HTML In-App Messages" in GTM configuration.

## Creation Steps

### Step 1: Create Message
Create a new in-app message or Canvas step → select **Drag-And-Drop Editor**.

### Step 2: Select Template
Options:
- Blank modal template
- Braze-provided drag-and-drop template
- Saved custom template

Click **Build message** to open the editor. Templates are also accessible from the **Templates** dashboard section.

### Step 3: Add Pages (Optional)

Up to **10 pages** per message. Managed from **Pages** section of the **Build** tab. Useful for onboarding flows or sequential journeys.

**Add page:** Click **+ Add page** → select template → name it meaningfully.

**Duplicate page:** Hover over page → ellipsis menu → **Duplicate**.

**Delete/Rename:** Hover over page → ellipsis menu → **Rename** or **Delete**.

#### Connecting Pages

Pages must be linked or the message cannot launch.

1. Select starting page
2. Select a button or image element
3. Set **On-click behavior** → **Go to page**
4. Select target page
5. Repeat until all pages are linked

> Users can always exit via the close (X) button — it cannot be removed.

### Step 4: Build and Design

Customize using editor blocks and style settings:
- **Editor blocks** — available components and properties
- **Style settings** — look, feel, branding
- **Right-to-left support** — use RTL message guidelines for localization

### Step 5: Test

Use **Preview & Test** tab to:
- Preview across device types
- Send test message to a device

**Preview modes:**
- Specific user
- Random user from database
- Custom user (manually defined attributes)

> Push must be enabled on test devices before sending to Content Test Groups or individual users.

`★ Insight ─────────────────────────────────────`
- The SDK version gating is a hard cutoff, not graceful degradation — users below minimum simply don't receive the message, making version tracking critical for audience sizing.
- The `allowUserSuppliedJavascript` requirement exists because drag-and-drop messages can execute arbitrary JS; it's a security opt-in rather than a default.
- The 10-page limit and mandatory page linking create an implicit state machine — unlinked pages act as dead ends that block launch, which is a useful validation pattern to surface early.
`─────────────────────────────────────────────────`
