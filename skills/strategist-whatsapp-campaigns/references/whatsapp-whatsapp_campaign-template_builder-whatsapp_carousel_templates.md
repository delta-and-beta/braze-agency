---
name: whatsapp-whatsapp_campaign-template_builder-whatsapp_carousel_templates
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/template_builder/whatsapp_carousel_templates
indexed_at: '2026-04-05'
keywords:
  - carousel
  - templates
  - whatsapp
  - waba
  - marketing
  - media
  - buttons
  - liquid
  - variables
  - approval
triggers:
  - create carousel template
  - submit carousel to meta
  - customize carousel content
  - whatsapp carousel message
  - set up carousel cards
---
## WhatsApp Carousel Templates

Interactive multi-card messages users can swipe through. Up to 10 cards per carousel, each with images or videos and customizable buttons. All carousel messages are categorized as **Marketing**.

> Early access feature — contact your CSM to participate.

---

## Template Creation

### Settings

| Field | Notes |
|---|---|
| WhatsApp Business Account (WABA) | Templates scoped to WABA; shared across all subscription groups and phone numbers within it |
| Language | Single language per template |
| Name | No spaces — use underscores (e.g., `carousel_example`) |
| Category | Always **Marketing** (auto-set) |

### Body Content

Required text appearing above the carousel cards. Supports Liquid variables (e.g., `{{first_name}}`). Variables cannot be placed at the very start or end of body text.

**Note:** `{% %}` Liquid tags are not supported in the template builder.

### Carousel Settings (apply to all cards, immutable after submission)

- **Media type:** Image or Video (uniform across all cards)
- **Button type:** Quick Reply, Phone Number, or Visit Website — up to 2 buttons per card

### Cards

- Minimum 2 cards, maximum 10
- **Card count cannot be changed after submitting to Meta**
- Each card: media upload, card text/description, button text and actions
- Liquid variables can be added anywhere a `+` button appears (card text, button text, URLs)

### Submission

- Submit to Meta for review; typical approval: a few minutes, up to 24 hours
- Status: **Draft** → **Approved**
- Test sending unavailable until approved

---

## Using Approved Templates in Campaigns/Canvases

1. Create a WhatsApp message, selecting the subscription group matching the template's WABA
2. Search by template name, verify status is **Approved**, select to load
3. Customize dynamic content:

**Locked:** Static text, card count, media type, button configuration

**Editable:** Any field with a variable — including switching Liquid (e.g., `{{first_name}}` → `{{last_name}}`), image URLs with Liquid, or replacing images from the Braze media library

> Meta only requires variable slots to be filled — the specific Liquid used is flexible.

---

## Key Constraints

- Templates not shared across WABAs (but shared within a WABA)
- Card count fixed at submission — plan card number before submitting
- `{% %}` Liquid tags unsupported in template builder; use `{{variable}}` syntax only
- Variables cannot appear at the very beginning or end of body content

`★ Insight ─────────────────────────────────────`
- The immutability of card count after Meta submission is architecturally significant — Braze locks this at the API boundary because Meta's approval is tied to the exact template structure, not just content
- The WABA scoping model (templates shared within a WABA but not across) reflects WhatsApp's business account isolation model — each WABA is a separate business identity in Meta's system
- The Liquid variable flexibility at send-time (Meta only validates the slot exists, not the value) is a key integration pattern: the template is the structural contract, campaigns provide the runtime data
`─────────────────────────────────────────────────`
