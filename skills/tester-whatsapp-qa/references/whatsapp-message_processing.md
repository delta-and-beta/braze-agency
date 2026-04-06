---
name: whatsapp-message_processing
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/message_processing/user_messages
indexed_at: '2026-04-05'
keywords:
  - WhatsApp
  - triggers
  - campaigns
  - Canvas
  - quick-replies
  - list-messages
  - inbound
  - templates
  - interactive
  - messages
triggers:
  - set up quick replies
  - create WhatsApp Canvas
  - handle unrecognized responses
  - configure trigger words
  - build list messages
---
# WhatsApp Message Processing Overview

WhatsApp is a two-way channel. Users can send inbound messages that trigger campaigns and Canvases. Supported interaction types: **quick replies**, **list messages**, and **trigger words**.

---

## Action-Based Triggers

Campaigns and Canvases can start, branch, or change based on inbound WhatsApp messages.

**Key rules:**
- Trigger words must be **fully capitalized** in Braze config, but user input is case-insensitive (`jOin2023` still triggers `JOIN2023`)
- If no trigger word is set, the campaign/Canvas fires for **all** inbound messages — including those already matched by other active flows, causing duplicate messages

---

## Unrecognized Responses

For interactive Canvases, add a catch-all action group:
- Add an action group for **"Send WhatsApp message"** with **no** "Where the message body" filter checked
- This catches any response not matched by other groups (like an `else` clause)
- Follow up with a message directing users to a support channel

---

## Quick Replies

Quick replies are clickable buttons that act as if the user sent the button text as a message. Braze processes them as inbound messages.

### Canvas Setup

**Step 1: Create CTAs in WhatsApp Template Manager**
- Build Quick Reply CTA buttons in the [WhatsApp Message Template Manager](https://business.facebook.com/wa/manage/message-templates/)
- Templates must be submitted and approved by WhatsApp before use (Canvas can be pre-built before approval)

**Step 2: Build the Canvas**
1. Add a Message step with the approved template
2. Add an Action step after it — create **one group per quick reply option**
3. In each group, specify the exact button text (must be **uppercase**)
4. Add an additional group with no matching message body for default/unmatched responses

**Responses:**
- Provide a reply message for each group
- Include a catch-all for out-of-bounds responses:
  > "We're sorry, we didn't recognize your response. For support issues, please message `<support channel>`."

Subsequent Canvas steps can include messages, user profile updates, or Braze-to-Braze webhooks.

---

## List Messages

List messages display a body with clickable options. Constraints:
- Up to **10 sections** per list
- Up to **10 rows** total across all sections
- Each row can have an optional description

### Canvas Setup

**Step 1:** List messages require an **action-based Canvas** (response to a user message).

**Step 2: Add a WhatsApp Message step**
- Select layout: **List Message**
- Configure a **List button** name (what users tap to open the list)
- Fill out **List content**:
  - **Sections** — group rows (e.g., seasonal styles, clothing categories)
  - **Rows** — individual list items
  - **Row descriptions** — optional per-row text
- Reorder sections/rows via drag-and-drop

**Step 3: Add an Action Path after the Message step**
- One group per list row response
- In each group:
  1. Trigger: **Sent inbound WhatsApp subscription group** → select the subscription group
  2. Check **"Where the message body"**
  3. Specify the exact row content to match

Continue building the Canvas from there.

---

## Summary Table

| Feature | Interaction Type | Canvas Requirement | Matching Logic |
|---|---|---|---|
| Trigger words | Any inbound text | Action-based entry | Uppercase config, case-insensitive input |
| Quick replies | Button tap → text reply | Any | Exact uppercase keyword match |
| List messages | Tap → list selection | Action-based only | Exact row text match |

`★ Insight ─────────────────────────────────────`
- The **case normalization asymmetry** (uppercase config, case-insensitive matching) is a common source of bugs — worth surfacing prominently in topic files since engineers may configure triggers and expect exact-match behavior
- The **catch-all group pattern** (action group with no message body filter) is architecturally equivalent to a switch/else block — framing it that way helps engineers reason about it correctly
- List messages being **action-based Canvas only** is a hard constraint worth flagging clearly, since it affects Canvas type selection upfront
`─────────────────────────────────────────────────`
