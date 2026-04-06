---
name: whatsapp-whatsapp_campaign-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/create
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - campaign
  - template
  - canvas
  - liquid
  - variables
  - personalization
  - messaging
  - approval
  - dynamic
triggers:
  - create WhatsApp campaign
  - build WhatsApp template
  - compose WhatsApp message
  - configure dynamic content
  - set up WhatsApp connection
---
## Create WhatsApp Campaign

WhatsApp campaigns enable direct, programmatic conversations with customers using Liquid and dynamic content for personalization.

### Prerequisites

Complete these before building:
- Acknowledge WhatsApp policies, limits, and content rules
- Set up WhatsApp connection in Braze
- Build initial templates in Meta Business Manager

### Step 1: Choose Campaign vs. Canvas

| Use Case | Recommended |
|----------|-------------|
| Single, targeted message | Campaign |
| Multi-step user journey | Canvas |

**Note:** WhatsApp templates are language-specific. Create a separate campaign/Canvas step per language, or use Canvas with segmentation.

#### Via Campaign
1. Go to **Campaigns** > **Create Campaign** > **WhatsApp** (or Multichannel)
2. Name the campaign clearly
3. Add Teams and Tags for organization/reporting
4. Add variants as needed (copy from variant to reuse content)

#### Via Canvas
1. Create Canvas, add a WhatsApp step
2. Set step schedule and delay
3. Filter audience (checked after delay at send time)
4. Set advancement behavior

### Step 2: Compose the Message

Two message types:

| Type | When to Use |
|------|-------------|
| **Template Message** | Business-initiated conversations (must use pre-approved Meta template) |
| **Response Message** | Replies to inbound user messages within a 24-hour window |

---

### Template Messages

- Must be pre-approved by WhatsApp (up to 24 hours)
- Gray/disabled fields are locked — edits require resubmission to Meta
- Each template is language-specific; create one campaign/Canvas step per language

#### Variables
- Variables from Meta Business Manager appear as blank spaces in composer
- Replace with Liquid or plain text using `{{text here}}` format
- Always include a Liquid default value — messages with missing variables **will not send**

```
Example: {{first_name | default: "you"}}
```

#### Dynamic Links
- Call-to-action URLs support variables at the end: `https://example.com/{{variable}}`
- Variables replaced via Liquid in Braze
- Links can be shortened and tracked via click tracking

#### Dynamic Images
- Upload images directly to media library (preferred over URLs) for consistency
- Images can be added from media library or by URL reference

---

### Response Messages

- Built in-app in Braze; editable at any time
- Used to reply to inbound user messages (within 24-hour window)
- Use Liquid to match response language to the user's language

---

### Key Constraints

- Any edits to template copy must be resubmitted to WhatsApp for reapproval
- Right-to-left language rendering depends on service provider — test carefully
- Business-initiated conversations **must** use an approved template

`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll liquid tags (`{% tabs %}`, `{% alert %}`) and template references — stripping these while preserving the structural logic is the key transformation here
- The two-tier message type distinction (template vs. response) maps directly to WhatsApp's 24-hour session window policy — a constraint worth keeping prominent since it affects campaign design decisions
- Separating "Prerequisites" as a hard gate (not just suggestions) reflects how Braze docs are structured: missing setup blocks message creation entirely
`─────────────────────────────────────────────────`
