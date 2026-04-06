---
name: generative-ai-liquid
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/liquid
indexed_at: '2026-04-05'
keywords:
  - liquid
  - personalization
  - sms
  - push
  - email
  - canvas
  - countdown
  - attributes
  - connected-content
  - fallback
triggers:
  - how to generate liquid code
  - how to use ai assistant in message composer
  - how to add countdowns to messages
  - how to improve liquid code
  - how to personalize messages with custom attributes
---
## BrazeAI Liquid Assistant

An AI chat assistant in the message composer that generates and improves Liquid code for message personalization.

### Supported Channels
- SMS messages
- Push notifications
- HTML email messages (not templates — works best on already-built emails)
- Canvases

### Access
Select the **AI assistant icon** in the message composer.

---

### Built-in Prompts

| Prompt | What it does |
|--------|-------------|
| **Use app activity** | Generates Liquid based on when the app was last used; may ask follow-up questions |
| **Add countdown** | Generates a countdown to an event; asks for event date/time |
| **Inspire me** | Appears when message has content; suggests personalization options |
| **Improve my Liquid** | Appears when message has content; refactors for efficiency and readability |

**Workflow:** Choose or type a prompt → **Update composer** → optionally **Regenerate** or **Undo update**

---

### Supported Liquid Knowledge (Beta)

| Type | Coverage |
|------|----------|
| Liquid syntax | `for` loops, `if` statements, math, and others |
| Standard user attributes | Default and built-in profile fields |
| Custom attributes | Booleans, Numbers, Strings, Arrays, Time |
| Connected Content | API calls and response handling |

---

### Prompting Best Practices

**Use natural language** — describe your need conversationally, as you would to a coworker.

**Give context upfront:**
- Company name and industry
- Campaign type (e.g., Black Friday, holiday sales)
- Goal (e.g., increase CTR)
- Specific custom attribute names and their data types

**Be specific:**
- State fallback/abort conditions explicitly
- Describe how to handle missing data
- For Connected Content: provide the API endpoint docs and/or a sample response

**Custom attributes:** Providing the attribute name (e.g., `favourite_color`) and data type helps the assistant generate accurate, targeted Liquid.

**Brand Guidelines:** If configured in Braze, the assistant uses them to match brand voice.

---

### Example Prompts (Ready to Use)

**Personalization patterns:**
- *"Create a message that shows different content based on my customer's loyalty status. If we don't know their loyalty status, send a fallback message."*
- *"Write a dynamic message that includes a user's favorite product and their last purchase date. If there's no last purchase, abort the message."*
- *"Write Liquid to personalize a message based on a customer's country. If we don't have it, suggest they click a link to update their profile."*
- *"Write Liquid to display different messages based on a custom attribute, 'CUSTOM_ATTRIBUTE_NAME' and its value. Six options total; send a placeholder if no value."*

**Countdowns & urgency:**
- *"Write Liquid with a countdown showing time remaining on an offer. If the offer has expired, abort the message."*

**Re-engagement:**
- *"Help me write a message to encourage users to return if they have items remaining in their cart."*

**Welcome / onboarding:**
- *"How can I personalize a welcome message with a user's first name and write different copy based on the user's gender?"*

---

`★ Insight ─────────────────────────────────────`
- The assistant uses **custom attribute metadata** (name + data type) at generation time — passing these upfront in prompts produces more accurate Liquid than iterating after the fact.
- The **abort vs. fallback distinction** is a real Liquid pattern: `{% abort_message %}` stops delivery entirely, while a fallback just substitutes default copy. Prompts should specify which behavior is desired.
- Connected Content prompts benefit from a **sample API response** in the prompt — the assistant can infer field names and types from JSON rather than hallucinating them.
`─────────────────────────────────────────────────`
