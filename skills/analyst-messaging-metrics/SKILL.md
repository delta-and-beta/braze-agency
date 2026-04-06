---
name: analyst-messaging-metrics
description: >-
  Cross-channel messaging metrics including SMS usage, in-app reporting,
  segments, and retargeting analysis.
metadata:
  role: braze-analyst
  topics:
    - in-app-messages-reporting
    - sms-mms-rcs-message-usage
    - sms-mms-rcs-segments
    - sms-mms-rcs-retargeting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes that skill files are optimized for *Claude Search Optimization* — the content should be structured so future Claude instances can quickly determine relevance, then find what they need. Keyword density, scannable headers, and a clear "when to use" section matter more than prose elegance here.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# Messaging Metrics

## Overview

This skill covers measurement and reporting for cross-channel messaging in Braze. Use it when analyzing how messages are being delivered, consumed, and billed — including in-app message performance reporting, SMS segment billing calculations, user retargeting from message interactions, and message credit/usage tracking.

**Lens:** Measurement — how to track messaging volume, segments, and retargeting effectiveness across channels.

## When to Use This Skill

Use when answering questions about:

- How to read in-app message performance reports (impressions, clicks, conversions, revenue)
- How SMS messages are broken into billable segments and what affects segment count
- How to retarget users based on interactions with SMS keywords or subscription changes
- How to audit message credit consumption and understand usage dashboards
- Comparing messaging volume across campaigns or channels

**Not for:** Message composition, send configuration, or A/B testing setup — those belong to delivery-focused skills.

## Topics Synthesized

### In-App Message Reporting
Campaign-level analytics including impressions, direct opens, influenced opens, and body clicks. Covers the **Message Performance** and **Historical Performance** panels, revenue attribution, and how IAM metrics roll up to campaign-level reporting.

Key terms: `impressions`, `direct opens`, `influenced opens`, `body clicks`, `revenue`, `campaign details`, `historical performance`.

### SMS Segments
SMS billing is per **message segment**, not per message. A single send may span multiple segments depending on encoding (GSM-7 vs Unicode), character count thresholds (160 vs 70 chars), and concatenation overhead. RCS messages use a separate per-message billing model.

Key terms: `SMS segment`, `GSM-7`, `Unicode`, `character limit`, `concatenation`, `billing calculator`, `RCS`.

### SMS Retargeting
Braze records inbound SMS interactions (keyword replies, opt-ins, opt-outs) to the user profile. These interactions become filterable attributes for retargeting — e.g., segment users who replied "STOP" or "HELP" within a time window.

Key terms: `retargeting`, `keyword`, `subscription state`, `auto-response`, `incoming SMS`, `user profile filter`, `opt-in`, `opt-out`.

### Message Usage Tracking
Braze tracks allotted vs. consumed message credits across channels. The usage dashboard surfaces credit consumption by channel, workspace, and time period. Use this to audit spend against contract limits or investigate unexpected volume.

Key terms: `message usage`, `credits`, `allotment`, `consumption`, `dashboard`, `channel breakdown`.

## Quick Reference

| Question | Topic |
|---|---|
| Why was this SMS billed as 2 segments? | SMS Segments |
| How do I retarget users who replied to an SMS? | SMS Retargeting |
| Where do I see IAM click rates? | In-App Message Reporting |
| Are we near our monthly message credit limit? | Message Usage Tracking |
| What's the difference between impressions and direct opens? | In-App Message Reporting |
| Does Unicode change how many segments a message uses? | SMS Segments |

## Analyst Guidance

When analyzing messaging metrics:

1. **Segment math first** — if a client reports unexpected SMS costs, calculate expected segments from message length and encoding before looking elsewhere.
2. **IAM influence vs. direct** — influenced opens count users who opened the app within a window after receiving (but not clicking) an IAM. Don't conflate with direct opens when reporting CTR.
3. **Retargeting filter timing** — SMS keyword interactions are stored on the profile in near-real-time but segment membership evaluates at send time. Confirm filter windows match campaign cadence.
4. **Usage dashboard lag** — message credit dashboards may have a reporting delay of up to 24 hours. Advise clients to check trend over time, not point-in-time for active sends.

---

`★ Insight ─────────────────────────────────────`
The **Quick Reference** table pattern is particularly valuable in domain-specific skills like this — it maps the questions a user would actually ask ("why was this billed as 2 segments?") to the topic, which directly parallels how Claude routes queries at runtime. This is more useful than repeating topic names abstractly.
`─────────────────────────────────────────────────`
