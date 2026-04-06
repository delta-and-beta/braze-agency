---
name: tester-whatsapp-qa
description: >-
  Tests WhatsApp message delivery, validates quality ratings, and verifies
  opt-in/opt-out processing.
metadata:
  role: braze-tester
  topics:
    - whatsapp-testing
    - whatsapp-message_processing
    - whatsapp-message_processing-user_messages
    - whatsapp-message_processing-quality_rating
    - whatsapp-message_processing-opt-ins_and_opt-outs
    - whatsapp-message_processing-handling_unknown_numbers
    - whatsapp-faqs
    - whatsapp-whatsapp_best_practices
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill synthesis step takes atomic topic references and weaves them into a role-scoped perspective. The "lens" parameter is the key differentiator — the same raw topics could produce a `braze-engineer` skill focused on configuration vs. a `braze-tester` skill focused on validation. The lens shapes what aspects to emphasize without duplicating content.
`─────────────────────────────────────────────────`

# WhatsApp Quality Assurance

## Overview

This skill covers how to validate WhatsApp message delivery, verify quality compliance, and confirm that user consent flows (opt-in/opt-out) are functioning correctly in Braze. Use this skill when testing a WhatsApp channel integration, diagnosing delivery failures, auditing consent handling, or assessing whether a business phone number is at risk of messaging limit restrictions.

**Role lens:** `braze-tester` — validation-first perspective. Every topic is approached through the question: *how do I confirm this is working correctly and safely?*

---

## When to Use This Skill

- You need to verify that WhatsApp messages are being delivered end-to-end
- You're checking whether a phone number's quality rating is healthy or degraded
- You're auditing opt-in/opt-out flows to confirm consent is being respected
- You're testing how Braze handles inbound messages (quick replies, trigger words, list messages)
- You need to confirm how unknown or unrecognized numbers are handled
- You're preparing a QA checklist before launching a WhatsApp campaign or Canvas

---

## Topics Synthesized

This skill draws from the following reference topics:

| Topic | What it contributes |
|---|---|
| **WhatsApp Quality Rating** | How to read and interpret the rolling 7-day quality score; messaging tier limits and what triggers them |
| **WhatsApp Best Practices** | What user actions (blocks, reports) degrade quality; how quality rating affects delivery capacity |
| **WhatsApp Opt-ins and Opt-outs** | How to validate that consent capture is compliant; expected behavior when users opt out |
| **WhatsApp Message Processing Overview** | Two-way channel mechanics; supported interaction types (quick replies, list messages, trigger words) |
| **WhatsApp User Messages** | How inbound user messages route into Canvases and campaigns; CTA types and their expected behaviors |
| **Handling Unknown Numbers** | What Braze does when a message arrives from an unrecognized number; profile-matching logic |
| **WhatsApp Testing** | Testing approaches specific to the WhatsApp channel |
| **WhatsApp FAQs** | Common setup and account issues; WABA requirements that affect message delivery |

---

## Quality Rating Validation

### What to check

The quality rating is a **rolling 7-day score** derived from customer feedback signals — primarily blocks and reports. It is managed by Meta, not Braze.

**Healthy state indicators:**
- Rating is `Green` (High)
- No recent spike in block or report events
- Messaging tier has not been restricted or downgraded

**At-risk signals to watch for:**
- Rating drops to `Yellow` (Medium) → messaging limits may apply
- Rating drops to `Red` (Low) → immediate risk of tier reduction
- A sustained low rating can result in **permanent messaging limit decreases**

### Validation approach

1. Check the current quality rating in the Meta Business Manager or Braze dashboard WhatsApp settings
2. Monitor block/report events — these are the primary inputs to the rating score
3. Verify that message templates comply with Meta's content policies (non-compliant templates drive reports)
4. Confirm messaging volume is within the current tier's daily limit before launching campaigns

---

## Opt-in / Opt-out Flow Validation

WhatsApp requires explicit user consent. Braze enforces subscription state, but the tester must confirm the full flow:

### Opt-in checklist

- [ ] User consent is collected **before** any WhatsApp message is sent
- [ ] The opt-in mechanism matches an approved method (e.g., web form, IVR, in-app prompt)
- [ ] The subscription state in the Braze user profile reflects `opted_in` after consent is captured
- [ ] A confirmation message is sent to the user if required by the use case

### Opt-out checklist

- [ ] User sends a recognized opt-out keyword (e.g., `STOP`) or uses a quick reply opt-out
- [ ] Braze correctly updates the subscription state to `unsubscribed`
- [ ] No further messages are sent to the user after opt-out is recorded
- [ ] Re-opt-in path is clear and does not bypass consent requirements

---

## Inbound Message & Two-Way Channel Testing

WhatsApp is a two-way channel — inbound user messages must route correctly.

### Test cases to cover

| Interaction type | Expected behavior |
|---|---|
| Quick reply button tap | Routes into the associated Canvas step or campaign action |
| Trigger word sent | Matches keyword rule and enters the correct Canvas/campaign |
| List message selection | Routes to the configured list action handler |
| Free-form text (no match) | Falls to default handler or no-match branch |
| Message from unknown number | Braze attempts profile match; behavior depends on unknown number settings |

### Unknown number handling

When a message arrives from an unrecognized number, verify:
1. Whether Braze is configured to create a new anonymous profile or discard the message
2. Whether the number is eventually matched to an existing profile (and how)
3. That no unintended messages are sent back to unmatched numbers

---

## Delivery Validation Checklist

Use this before signing off on a WhatsApp channel configuration:

- [ ] Phone number quality rating is `Green`
- [ ] Messaging tier limit is sufficient for planned send volume
- [ ] All message templates are approved by Meta
- [ ] Opt-in flow is confirmed end-to-end with a test user
- [ ] Opt-out flow is confirmed — subscription state updates correctly
- [ ] Inbound quick replies and trigger words route to correct Canvas steps
- [ ] Unknown number behavior is configured and tested
- [ ] WABA (WhatsApp Business Account) is verified and connected in Braze

---

## Common Issues

| Symptom | Likely cause | What to check |
|---|---|---|
| Messages not delivering | Quality rating too low / tier restricted | Check Meta Business Manager quality dashboard |
| Opt-out not respected | Subscription state not updating | Verify webhook or keyword handler is processing opt-out correctly |
| Quick reply not routing | Canvas action not configured for that reply value | Check Canvas step connection for the specific reply text |
| Unknown number creates no profile | Setting is configured to discard | Review unknown number handling config in Braze |
| Template rejected by Meta | Content policy violation or missing opt-in reference | Review template content against Meta's guidelines |

`★ Insight ─────────────────────────────────────`
Nick skills for testers follow a "validation-first" structure: overview → what healthy looks like → explicit checklists → failure mode tables. This mirrors how QA engineers think — they need to know both what success looks like AND what symptoms map to which root causes. The table format for "symptom → cause → where to check" is particularly effective for tester roles.
`─────────────────────────────────────────────────`
