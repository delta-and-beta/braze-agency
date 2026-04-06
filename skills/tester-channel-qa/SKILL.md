---
name: tester-channel-qa
description: >-
  Systematic testing procedures for push, content cards, banners, LINE, and
  webhook channels including pre-send validation checklists.
metadata:
  role: braze-tester
  topics:
    - message-building-by-channel-push-testing
    - message-building-by-channel-content-cards-testing
    - message-building-by-channel-banners-testing
    - message-building-by-channel-line-testing
    - message-building-by-channel-webhooks-testing
    - engagement-tools-messaging-fundamentals-know-before-send
    - message-building-by-channel-content-cards-best-practices-know-before-send
    - engagement-tools-testing-race-conditions
    - message-building-by-channel-push-faq
    - message-building-by-channel-banners-faq
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill reveals a key CSO (Claude Search Optimization) principle: descriptions should describe *when to use*, not *what the skill does* — this prevents Claude from following the description as a shortcut instead of reading the full body.
- Skills synthesizing topics with minimal source documentation benefit most from a strong "lens" section — it tells Claude *how* to reason about the domain, not just *what* the domain is.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Cross-Channel QA & Validation

## Overview

This skill covers systematic pre-send validation and cross-channel QA for Braze campaigns. Use this skill when verifying campaign readiness before launch, testing message delivery across push, content cards, banners, LINE, or webhook channels, or investigating delivery failures and race conditions.

**Core principle:** Every channel has channel-specific failure modes. Pre-send validation must be done per-channel, not generically.

## When to Use

Use this skill when you need to:
- Run a pre-send checklist before launching a campaign or Canvas
- Test message delivery or rendering across push, content cards, banners, LINE, or webhook channels
- Diagnose delivery failures or unexpected behavior after send
- Identify race conditions between concurrent Braze actions (audience entry, message send, attribute update)
- Validate webhook configuration and payload structure before live traffic

**Do not use for:** Segmentation logic, Liquid personalization syntax, or campaign analytics — those are covered by separate skills.

## Lens: Pre-Send Validation, Cross-Platform QA, and Delivery Verification

The `braze-tester` perspective centers on three phases:

1. **Pre-send validation** — static checks before any message is dispatched (rate limits, audience size, template rendering, missing required fields)
2. **Cross-platform QA** — channel-specific test procedures verifying rendering and delivery on each target surface
3. **Delivery verification** — confirming messages reached the intended recipients and troubleshooting when they did not

Treat each phase as a gate. Do not advance to the next phase if the current phase has open issues.

---

## Pre-Send Checklist (General)

Run this checklist before any send, regardless of channel:

| Check | Detail |
|-------|--------|
| API rate limits | Review workspace rate limits; batch requests where possible |
| Audience size | Confirm segment is non-empty; check re-eligibility settings |
| Liquid validation | Preview with test user; verify fallback values are set |
| Quiet hours | Confirm quiet hours and timezone handling are configured |
| Conversion events | Verify conversion event and window are appropriate |
| Control group | Confirm A/B split or control group percentage is intended |
| Frequency capping | Check if global frequency cap may suppress the send |
| Time-to-live (TTL) | Especially for push — messages older than TTL are dropped silently |

---

## Channel QA Procedures

### Push Testing

**Key failure modes for push:**
- Token invalidation — push tokens become stale when a user uninstalls and reinstalls, or when a new user logs in on the same device
- **Multiple users on one device:** When a user logs out, they remain reachable by push until another user logs in. At that point the push token is reassigned to the new user. Validate test sends target the correct user identity after device sharing scenarios.
- Silent push vs. visible push — verify notification payload includes the `alert` key if a visible notification is required
- Provisional authorization (iOS) — messages may be delivered quietly to the Notification Center without sound

**Test steps:**
1. Send a test push to a known test device via the Braze dashboard "Send Test" button
2. Confirm receipt on device — check notification tray and app badge count
3. Verify deep link or action button routing if applicable
4. Re-test after app backgrounding and device lock to confirm delivery behavior

---

### Content Cards Testing

**Key failure modes for content cards:**
- Cards are created at send time but only surfaced to the feed when the app fetches them — stale feeds may not show new cards immediately
- Pinned cards can be suppressed by a full feed; verify card count limits
- Dismissal state is persisted locally — a dismissed card will not reappear on the same device even after a refresh

**Test steps:**
1. Trigger a content card send to a test user
2. Force a feed refresh in the app or SDK
3. Confirm the card renders in the correct position (pinned vs. unpinned)
4. Verify the card dismisses correctly and does not reappear after refresh

**Know before you send:**
- Cards do not support quiet hours — they are surfaced immediately upon feed refresh regardless of time
- Confirm the card's expiration date is set if the campaign is time-sensitive

---

### Banner Testing

**Key failure modes for banners:**
- Banners are placement-specific — a banner configured for one placement ID will not appear in a different placement
- Banners do not stack; only one banner is active per placement at a time

**Test steps:**
1. Confirm the correct placement ID is configured in both the campaign and the app integration
2. Send a test banner to a test user
3. Verify the banner renders at the correct placement within the app
4. Confirm the banner dismisses or expires as configured

---

### LINE Testing

**Channel-specific considerations:**
- LINE messages require an active LINE channel subscription in Braze
- Test users must have a valid LINE user ID associated with their Braze profile
- LINE has strict content policies — validate message content conforms to LINE's template message specifications before send

**Test steps:**
1. Confirm the test user's LINE user ID is set in their Braze profile
2. Send a test LINE message via the dashboard test send
3. Verify receipt in the LINE app on the test device
4. Confirm any rich message elements (images, buttons) render correctly

---

### Webhook Testing

**Key failure modes for webhooks:**
- Endpoint is unreachable or returns a non-2xx response — Braze will retry but failures are silent by default without error monitoring
- Payload shape mismatch — field names or types differ from what the receiving system expects
- Authentication failure — check API key, HMAC signature, or OAuth token expiry

**Test steps:**
1. Use a request inspection tool (e.g., webhook.site) to capture a test payload before pointing at the live endpoint
2. Confirm all required fields are present and correctly typed in the captured payload
3. Validate authentication headers are included
4. Point at the live endpoint and confirm the receiving system processes the payload correctly
5. Check the Braze Message Activity log for delivery status and HTTP response codes

---

## Race Conditions

A **race condition** in Braze occurs when an outcome depends on the sequence or timing of multiple concurrent events — for example, a user entering a Canvas at the same moment their attributes are updated, or two campaigns competing to send to the same user simultaneously.

**Common race condition patterns:**

| Scenario | Risk |
|----------|------|
| Attribute update + audience evaluation at the same time | User may be evaluated before or after the update depending on processing order |
| Concurrent Canvas steps that modify the same attribute | Last write wins; intermediate values may be lost |
| Webhook response triggers a second campaign | Second campaign may fire before first campaign's send is confirmed |
| Re-entry into a Canvas with in-progress steps | User may have multiple active paths through the same Canvas |

**Mitigation strategies:**
- Add deliberate delays (Canvas delay steps) between attribute writes and subsequent audience evaluations
- Use event-triggered entry rather than scheduled entry where sequencing matters
- Test with simulated concurrent users in staging before production sends
- Monitor the Braze Event Stream or webhook activity log to observe actual event ordering

---

## Topics Synthesized

This skill draws from:
- **Webhook Testing** — endpoint validation and payload inspection
- **Push Testing** — device-level delivery verification
- **Push FAQ** — multi-user device behavior and token reassignment
- **LINE Testing** — LINE-specific channel prerequisites and test flow
- **Content Cards Testing** — feed refresh behavior and dismissal state
- **Content Cards Know Before Send** — pre-send considerations specific to card feeds
- **Banner Testing** — placement ID validation and banner rendering
- **Banner FAQ** — banner lifecycle and stacking behavior
- **Know Before You Send** — general pre-launch checklist (rate limits, audience, Liquid)
- **Testing Race Conditions** — timing-dependent failure modes and mitigations

---

## Quick Reference: Channel Failure Modes

| Channel | Most Common Failure | First Check |
|---------|---------------------|-------------|
| Push | Stale/reassigned token | Test device token freshness; check re-eligibility |
| Content Cards | Card not appearing | Force feed refresh; check card expiry |
| Banner | Wrong placement | Verify placement ID matches app integration |
| LINE | User ID missing | Confirm LINE user ID on Braze profile |
| Webhook | Non-2xx response | Inspect payload with request catcher first |
| Any channel | Race condition | Add delay steps; check event ordering in logs |
