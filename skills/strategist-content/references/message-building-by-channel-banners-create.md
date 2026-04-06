---
name: message-building-by-channel-banners-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/banners/create
indexed_at: '2026-04-05'
keywords:
  - banner
  - campaign
  - canvas
  - placement
  - variant
  - messaging
  - priority
  - properties
  - styling
  - channel
triggers:
  - create a banner campaign
  - set up banner placement
  - configure banner on-click behavior
  - add custom properties to banner
  - design message variants
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/` and should be self-contained, dense with facts, and stripped of UI chrome
- The Liquid/Jekyll template tags (`{% tabs %}`, `{% multi_lang_include %}`) in the source are rendering artifacts, not content — they should be flattened into prose or structure
`─────────────────────────────────────────────────`

## Create Banners

Banners can be built as **campaigns** (single, targeted messaging) or as **Canvas steps** (multi-step user journeys).

### Prerequisites

Development team must configure placements in the app/website before a Banner campaign can be launched. Campaigns can be drafted without placements but cannot go live until placements are set up.

---

### Campaign Setup

1. Go to **Messaging** > **Campaigns** > **Create Campaign** > **Banner**
2. Name the campaign, add teams and tags (tags enable Report Builder filtering)
3. Select the placement to associate with the campaign
4. Add variants (each variant can have a different message type and layout); use **Copy from Variant** to clone similar variants
5. Set start date/time — Banners last indefinitely by default; optionally set an **End Time**

### Canvas Setup

1. Create a Canvas, then add a **Message step**
2. Select **Banner** as the messaging channel
3. Select a placement
4. Set **priority** — determines display order when multiple Banners share a placement
5. Set **expiration** — either a duration after the step becomes available, or a specific date/time

---

### Composing the Banner (Step 3)

Start from a blank template, a Braze banner template, or a saved template.

**Styling**: Drag and drop blocks and rows into the canvas. Select **Styles** for background and border properties. Select individual blocks/rows for element-level styling.

**On-click behavior** (optional): Configure navigation (deep link or URL) or log a custom attribute/event on click. Note: element-level on-click behavior (button, image, link) overrides the Banner-level on-click behavior.

**Custom properties** (optional): Attach structured metadata (string, boolean, number, timestamp, image URL, JSON object) accessible via the Braze SDK. Does not affect display. Use cases:
- Pass metadata to third-party analytics
- Trigger conditional logic via `timestamp` or JSON fields
- Control app behavior via properties like `ratio` or `format`

To add: **Settings** > **Properties** > **Add property**

| Field | Description | Example |
|-------|-------------|---------|
| Property type | string, boolean, number, timestamp, image URL, JSON object | `String` |
| Property key | SDK identifier for the property | `color` |
| Value | Must match selected type | `#FF0000` |

---

### Banner Priority

When multiple Banners share a placement, priority determines display order.

- In campaign settings: select **Set exact priority**, drag-and-drop to reorder, then **Apply Sort**
- In Canvas: set priority directly on the Message step
- Recommended: use drag-and-drop sorter when multiple campaigns share the same placement ID

---

### Audience & Conversions (Campaign)

- **Target Audiences**: Choose segments or filters; segment membership is calculated at send time
- **Conversion events**: Track up to a 30-day window for user actions after receiving the campaign
