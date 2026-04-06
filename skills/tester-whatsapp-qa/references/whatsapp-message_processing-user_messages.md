---
name: whatsapp-message_processing-user_messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/message_processing/user_messages
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - quickreplies
  - listmessages
  - triggers
  - canvas
  - actionsteps
  - buttons
  - templates
triggers:
  - set up WhatsApp quick replies
  - create WhatsApp list messages
  - configure WhatsApp trigger words
  - build WhatsApp Canvas with actions
  - handle unrecognized WhatsApp responses
---
## WhatsApp User Messages

WhatsApp supports two-way communication. Users can engage via quick replies, list messages, and trigger words. These call-to-action (CTA) types route into Canvas/campaign action steps.

---

## Action-Based Triggers

Campaigns and Canvases can be triggered by inbound WhatsApp messages (trigger words).

**Key rules:**
- Trigger words must be **configured in all caps** in Braze, but users can send them in any case — `jOin2023` still fires a trigger configured as `JOIN2023`
- If **no trigger word** is set, the campaign/Canvas fires on **every** inbound WhatsApp message — including users already matched by other active campaigns (they'll receive two messages)

---

## Handling Unrecognized Responses

For interactive Canvases, always add a catch-all action group:

1. In the action step, create all named action groups for your expected phrases
2. Add one final group: **"Send WhatsApp message"** — leave **"Where the message body"** unchecked
3. This catches all unmatched replies (like an `else` clause)

Recommended follow-up: inform the user the channel is unmonitored and redirect to a support channel.

---

## Quick Replies

Quick replies render as tappable buttons but are processed as inbound text messages. Braze matches the button text against action step filters.

### Canvas Setup

**Step 1 — Create CTA buttons:**
- Build Quick Reply buttons in the [WhatsApp Message Template Manager](https://business.facebook.com/wa/manage/message-templates/)
- Button type: **Custom**, provide button text
- Template must be submitted and approved by WhatsApp before use (Canvas can be built in advance)

**Step 2 — Build the Canvas:**
1. Add a **Message step** using the approved template
2. Add an **Action step** after it — one action group per quick reply option
3. In each group, specify the **exact button text** (must be **UPPERCASE** in the filter)
4. Add an extra group with **no message body** filter to catch free-text replies

**Responses:**
- Add a reply message for each action group
- Include a catch-all response: e.g., *"We didn't recognize your response. For support, message [channel]."*
- Subsequent steps can include messages, user profile updates, or Braze-to-Braze webhooks

---

## List Messages

List messages display a tappable button that reveals a structured list. Limits: up to **10 sections**, up to **10 rows total** across all sections.

### Canvas Setup

**Step 1 — Requirements:**
- List messages only work in **action-based Canvases** (they must respond to a user message)

**Step 2 — Configure the Message step:**
1. Add a **WhatsApp Message step**, select layout: **List Message**
2. Set a **List button** label (what users tap to open the list)
3. Build **List content**:
   - **Section:** Group rows (e.g., seasonal styles, clothing categories)
   - **Row:** Individual selectable items (up to 10 across all sections)
   - **Row description** (optional): Supporting text per row
4. Reorder sections/rows by drag-and-drop

**Step 3 — Add an Action Path after the Message step:**

For each list row, create an action group:
1. Trigger: **Sent inbound WhatsApp subscription group** → select the subscription group
2. Check **"Where the message body"**
3. Specify the exact row/item text to match

Continue building the Canvas from each action path branch.

---

## Summary: CTA Type Comparison

| Feature | Quick Replies | List Messages |
|---|---|---|
| Max options | Limited by template | 10 rows across 10 sections |
| Requires template approval | Yes | No (response message) |
| Canvas type required | Any | Action-based only |
| User input processed as | Inbound text | Inbound text |
| Catch-all support | Yes (no body filter) | Yes (no body filter) |

`★ Insight ─────────────────────────────────────`
- The topic file strips Jekyll-specific templating (`{% tabs %}`, `{% image_buster %}`, `{% alert %}`) since those render as noise in a plain markdown reference context — only the semantic content survives.
- The summary comparison table is synthesized (not in the original) — it's generated from implicit facts scattered across two sections, which is a valid enrichment for a reference file since it helps readers choose the right CTA type without re-reading both sections.
- The "unrecognized responses" section was buried mid-document in the original but surfaces early here — its catch-all pattern applies to **both** quick replies and list messages, so positioning it before either section prevents duplication.
`─────────────────────────────────────────────────`
