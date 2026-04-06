---
name: tester-messaging-qa
description: SMS and in-app message testing and validation before deployment.
metadata:
  role: braze-tester
  topics:
    - sms-mms-rcs-testing
    - in-app-messages-testing
    - in-app-messages-prep-guide
    - in-app-messages-know-before-send
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files are consumed by Claude as runtime instructions, not by humans. The imperative form ("Validate X before Y") reads as direct commands rather than suggestions — this subtly but meaningfully improves compliance when the skill is invoked. Also: since several source topics were marked "minimal or unavailable," the skill body must synthesize and extrapolate from what IS known rather than just delegating to references.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# SMS & In-App Testing

## Purpose

Apply this skill when validating SMS/MMS messages and in-app messages before deployment in Braze. This skill synthesizes pre-send checklists, testing workflows, and known failure modes across both channels to reduce the risk of sending broken or non-compliant messages to real users.

The lens is **Validation**: every step is oriented toward catching defects before deployment, not explaining how to build messages from scratch.

---

## Scope

This skill covers validation and testing for:

- **In-App Messages** — display rendering, targeting logic, content correctness, and behavioral edge cases before a campaign goes live
- **SMS/MMS Messages** — character encoding, segment counts, link validation, opt-out compliance, and carrier delivery considerations

It does **not** cover initial campaign setup, audience segmentation strategy, or reporting after send.

---

## Topics Synthesized

| Topic | Contribution |
|---|---|
| **In-App Message Testing** | Testing workflows and known gotchas for in-app message QA |
| **In-App Message Prep Guide** | Pre-build considerations that affect testability (layout choices, trigger types, targeting constraints) |
| **In-App Know Before You Send** | Final pre-deployment checks — what to verify before activating a campaign |
| **SMS/MMS Testing** | Encoding, segment math, link hygiene, and carrier compliance checks |

---

## In-App Message Validation Workflow

### Pre-Build Checks (from Prep Guide)

Before testing begins, verify these decisions were made correctly during build — they are harder to fix late:

- Confirm message type is appropriate for the intended display context (modal, slideup, fullscreen, HTML)
- Verify trigger event is correctly defined and reachable in the user journey
- Confirm targeting conditions are set (re-eligibility, audience filters, time constraints)
- Check that any custom HTML follows Braze's approved HTML tag list — unsupported tags are silently stripped
- Validate that asset URLs (images, fonts) are absolute, not relative, and served over HTTPS

### Rendering and Behavior Tests

Run these before marking a message ready for launch:

1. **Preview on all target device sizes** — check for text truncation, image cropping, button overflow
2. **Test trigger firing** — confirm the trigger event fires under the conditions you expect, not just on first session
3. **Test dismiss behavior** — verify dismiss button, swipe-to-dismiss, and tap-outside behavior match intent
4. **Test deep links and button actions** — each CTA button should navigate to the correct destination; test on both iOS and Android if cross-platform
5. **Test with a Braze test device or test group** — use a dedicated seed list, not a production segment
6. **Verify re-eligibility settings** — if users should see it more than once, test that the re-entry window works correctly
7. **Check that the message does not fire during app backgrounding or orientation change** unless specifically intended

### Know Before You Send Checklist (In-App)

Before activating the campaign:

- [ ] Message has been previewed in the Braze dashboard and on a real device
- [ ] All links and CTAs are functional
- [ ] Liquid personalization variables have fallback defaults to prevent blank fields
- [ ] Campaign is not accidentally set to a broad "all users" segment during testing
- [ ] Start/end dates and time zone are correctly configured
- [ ] Control group percentage (if A/B) is intentional
- [ ] Campaign name follows naming conventions for reporting purposes

---

## SMS/MMS Validation Workflow

### Encoding and Segment Checks

SMS billing and deliverability depend on encoding and segment count. Validate these explicitly:

- **GSM-7 vs. Unicode**: Any character outside the GSM-7 character set (e.g., curly quotes `"`, em dash `—`, emoji) forces the entire message into Unicode, cutting the per-segment character limit from 160 to 70 characters
- **Count segments**: A message over 160 chars (GSM-7) or 70 chars (Unicode) becomes a multipart message. Each segment beyond the first has overhead bytes, reducing effective chars per segment to 153 (GSM-7) or 67 (Unicode)
- **Use Braze's character count preview** — do not rely on a plain text editor count; it will not account for encoding switches or Liquid variable expansion
- **Test Liquid-expanded length** — render the message with representative variable values to confirm segment count does not jump unexpectedly for certain users

### MMS-Specific Checks

- Verify media file size is within carrier limits (typically ≤600 KB, though some carriers vary)
- Confirm image format is supported (JPEG, PNG, GIF are broadly safe; WebP is not universally supported)
- Test animated GIFs — some carriers render only the first frame
- Confirm the media URL is publicly accessible without authentication

### Opt-Out and Compliance Checks

- Verify opt-out keywords (STOP, UNSUBSCRIBE, CANCEL, END, QUIT) are handled correctly and do not route to a human response queue
- Confirm opt-out response message is compliant with local regulations (TCPA in the US, CTIA guidelines, GDPR for EU)
- Validate the sender ID or short code is correct for the target country — long codes, short codes, and toll-free numbers have different throughput and delivery characteristics
- Confirm campaign is targeting only subscribed users — sending to unsubscribed users is a compliance violation, not just a best practice

### Link Validation

- Expand any shortened URLs and verify the destination is correct
- Confirm links render as clickable on both iOS and Android (plain text URLs are auto-linked; formatted markdown is not supported in SMS)
- If using UTM parameters, confirm they survive URL shortening

### Pre-Send Checklist (SMS/MMS)

- [ ] Message previewed with real variable values, not placeholder tokens
- [ ] Segment count verified for both typical and edge-case variable lengths
- [ ] All links tested end-to-end
- [ ] Opt-out path tested with STOP keyword
- [ ] Sender ID confirmed for each target country/region
- [ ] Quiet hours configured if campaign sends across time zones
- [ ] Test send delivered to a real device on the same carrier type (short code, long code, or toll-free) as the production send

---

## Common Failure Modes to Check

| Channel | Failure | How to Catch |
|---|---|---|
| In-App | Liquid variable renders as empty string | Use Preview with a real test user profile |
| In-App | Message never fires | Verify trigger event name exactly matches SDK event name (case-sensitive) |
| In-App | Broken layout on small screens | Preview on 320px-wide device or emulator |
| SMS | Silent encoding upgrade inflates segment count | Check character counter in Braze composer |
| SMS | Emoji breaks GSM-7 encoding | Inspect each character; emoji always forces Unicode |
| SMS | Link destination wrong after URL shortening | Click the shortened link manually before sending |
| SMS/MMS | MMS media not delivered | Confirm file size, format, and public accessibility |

---

## Validation Principles

When in doubt about a test case, apply these principles:

- **Test with real data, not placeholder tokens** — Liquid edge cases only surface with actual user attribute values
- **Test on real devices, not only previews** — Dashboard previews do not simulate all carrier or OS-level rendering behaviors
- **Test the failure path, not just the happy path** — What happens when a variable is missing? When a user taps dismiss immediately? When a link is invalid?
- **Segment count is a cost and a deliverability issue** — Treat it as a blocking check, not a nice-to-have
- **Re-test after any content edit** — Even small copy changes can shift encoding, segment count, or layout
