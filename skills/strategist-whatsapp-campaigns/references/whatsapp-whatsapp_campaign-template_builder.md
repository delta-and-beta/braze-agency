---
name: whatsapp-whatsapp_campaign-template_builder
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/template_builder
indexed_at: '2026-04-05'
keywords:
  - template
  - WhatsApp
  - campaign
  - buttons
  - personalization
  - approval
  - carousel
  - WABA
  - composer
  - messaging
triggers:
  - create WhatsApp template
  - submit template for approval
  - add template buttons
  - configure template personalization
  - use approved template in campaign
---
`★ Insight ─────────────────────────────────────`
- Braze documentation uses Jekyll/Liquid templating (`{% alert %}`, `{% raw %}`, `{{site.baseurl}}`), which must be stripped or normalized for standalone topic files since they resolve at Jekyll build time.
- Template metadata tables and button specifications are the highest-value content here — they're the kind of structured facts that agents reference frequently during campaign builds.
`─────────────────────────────────────────────────`

## WhatsApp Template Builder

Allows creating and submitting WhatsApp message templates directly in Braze without switching to Meta Business Manager. Templates require Meta approval before use in campaigns or Canvases.

**Status:** Early access (contact Braze account manager for access). Only **Marketing** category templates are supported.

**Prerequisite:** Complete WhatsApp setup before creating templates.

---

## Template Settings (Step 1–2)

| Field | Description |
|-------|-------------|
| **Account** | WhatsApp Business Account (WABA). All subscription groups and phone numbers in a WABA share template access. |
| **Language** | A separate template is required per language. |
| **Template name** | Unique; lowercase letters, numbers, and underscores only. |

**Layout options:**
- **Default** — Standard WhatsApp message
- **Carousel** — Horizontally scrollable cards (see carousel template docs)

---

## Template Components

### Header (optional)
- **Text** — Short text header
- **Media** — Image, video, or document (URL only); Braze stores the reference and submits a sample to Meta
- **None**

### Body
Main message content. Supports two personalization approaches:
- **Liquid** — e.g., `{{${first_name}}}`. Braze persists Liquid and surfaces it in the campaign/Canvas composer.
- **Generic variables** — Numbered placeholders, e.g., `{{1}}`. Use when adding personalization later.

Personalization is available only where the **+** button appears — not all fields support it (Meta restriction).

### Footer (optional)
Short text below the message body.

### Buttons (optional, up to 10 total)

| Button Type | Category | Limits |
|-------------|----------|--------|
| Quick reply | Quick reply | Max 10; text up to 25 chars |
| Phone number | Call to Action | Max 1; text up to 25 chars; phone with country code, no `+` (e.g., `14155552671`) |
| Visit website | Call to Action | Max 2; text up to 25 chars; URL up to 2,000 chars |
| Copy offer code | Call to Action | Max 1; button text is fixed as "Copy offer code"; offer code up to 15 chars |

---

## Submission & Approval

- Select **Submit** to send to Meta for review.
- Review typically completes in **~5 minutes**, but can take up to **24 hours**.
- Template status updates on the **WhatsApp Templates** page on refresh.

---

## Using an Approved Template in a Campaign

1. Go to **Campaigns** > **Create Campaign** > **WhatsApp**.
2. Select the approved template in the message composer.
3. Braze auto-populates template content (media, Liquid).
4. Update variable content as needed. **Gray (locked) fields** cannot be edited in Braze — changes to locked content require editing and resubmitting via WhatsApp Business Manager.
5. Use the **Test** tab to preview and confirm before launch.

---

## Key Constraints

- **Editing approved templates:** Changes to locked fields (body copy, Meta-controlled fields) require resubmission through WhatsApp Business Manager, not Braze.
- **Existing templates:** Templates created in Meta Business Manager remain usable in Braze; the Template Builder is additive.
- **Personalization scope:** Only fields marked with the **+** button accept variables — Meta controls which fields are personalizable.

`★ Insight ─────────────────────────────────────`
- The distinction between Liquid (`{{${first_name}}}`) and generic numbered variables (`{{1}}`) reflects a Braze-specific pattern: Liquid is resolved at send time by Braze's engine, while numbered placeholders are Meta's own variable syntax used during template registration.
- Locked fields (shown gray) exist because Meta's template approval is tied to exact content — any change to approved copy would void the approval, hence Meta requires resubmission through Business Manager rather than allowing silent edits in Braze.
`─────────────────────────────────────────────────`
