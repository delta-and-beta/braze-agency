---
name: tester-messaging-validation
description: 'In-app message testing, banner validation, and cross-channel troubleshooting.'
metadata:
  role: braze-tester
  topics:
    - in-app-messages-sending-test-messages
    - in-app-messages-troubleshooting
    - banners-testing
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick plugin skills are **domain knowledge references** synthesized from topics — structurally different from personal superpowers skills (which enforce process discipline). The `writing-skills` TDD cycle applies to process skills; here we're synthesizing Braze-specific knowledge.
- The "lens" field acts like a persona filter: it tells Claude *which angle* to approach answers from, preventing a tester skill from giving architect-style responses.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# Message Testing & Troubleshooting

## Skill Scope

This skill covers end-to-end validation of Braze message delivery — from test send configuration through in-app rendering verification to cross-channel failure diagnosis. Use this skill when validating that messages render correctly, reach the intended test audience, or when diagnosing why a message failed to appear, display incorrectly, or behave unexpectedly across platforms.

## Lens: End-to-End Validation Perspective

This skill approaches every question from the perspective of a **tester validating delivery accuracy and rendering fidelity** — not from a developer integration or campaign strategy lens. Answers prioritize:

- Confirming a message *actually delivered* before debugging content
- Identifying the layer at which failure occurred (SDK, network, trigger logic, rendering engine)
- Reproducing issues with minimum viable test setups
- Distinguishing rendering bugs from configuration errors from SDK version gaps

When multiple explanations are possible, favor the one that can be verified through observable behavior (logs, test sends, device inspection) over theoretical analysis.

## Topics Synthesized

### In-App Message Troubleshooting

Covers platform-specific rendering and delivery debugging for in-app messages. Key source material uses Braze's `{% sdktabs %}` + `{% multi_lang_include %}` pattern, meaning behavior is documented per platform (iOS, Android, Web) in separate partials. When troubleshooting in-app messages:

- Always clarify the **platform** first — iOS, Android, and Web have distinct SDK rendering stacks and known divergences
- Check SDK initialization order: in-app messages require the SDK to be initialized before the session that triggers delivery
- Confirm the trigger event fires *after* the campaign is live and the device has synced — stale local caches are a common false negative
- Distinguish between **not triggered**, **triggered but not displayed**, and **displayed but rendering incorrectly** — each points to a different layer

### Sending Test Messages

Covers the mechanics of Braze's test send workflow for validating messages before launch. Key patterns:

- Test sends target individual users by external ID or email, bypassing segment and eligibility filters — use this to isolate delivery from targeting issues
- Test sends do not count toward campaign analytics or frequency capping
- For in-app messages, the test user must have an active session at send time; push test sends arrive regardless of session state
- Use the **Preview** panel for visual rendering checks before test send; use actual device test sends to verify trigger logic, action button behavior, and deep link routing
- Content Card and Banner test sends require the feed to refresh on device after the send is issued

### Banner Testing

Covers validation of Braze Banner Cards — an in-app surface type displayed in designated app locations rather than triggered by events. Source documentation for this topic is minimal; apply general in-app message testing principles with these banner-specific considerations:

- Banners render in **placement slots** defined in the SDK integration; confirm the placement ID matches between the campaign configuration and the SDK call site
- Unlike triggered in-app messages, banners are fetched on demand when the placement is rendered — test by navigating to the relevant screen after the campaign is live
- If a banner does not appear, verify: campaign is active, user qualifies for the segment, placement ID is correct, and the SDK `requestBannersRefresh()` call (or equivalent) is being made

## When to Use This Skill

Use this skill for questions about:

- Why an in-app message, banner, or push notification did not appear during testing
- How to send a test message to a specific device or user
- Platform-specific rendering differences for in-app messages
- Distinguishing between targeting/eligibility failures and delivery/rendering failures
- Validating message behavior before campaign launch
- Cross-channel inconsistencies (message works on iOS but not Android, or works in preview but not on device)

Do not use this skill for campaign *design* decisions, audience segmentation strategy, or Liquid templating logic — those fall under separate skills.

---

`★ Insight ─────────────────────────────────────`
- The "When to Use" + "Do not use" pattern is critical for generated plugin skills — it prevents Claude from over-applying a specialist skill to questions that belong to adjacent skills (segmentation, templating, etc.) in the same plugin.
- Noting source documentation gaps (Banner Testing had minimal source) directly in the skill body is honest signal to Claude: treat this section as best-effort synthesis, not authoritative reference.
`─────────────────────────────────────────────────`
