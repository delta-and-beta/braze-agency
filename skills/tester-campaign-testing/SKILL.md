---
name: tester-campaign-testing
description: >-
  Campaign testing including test message sending, triggered action validation,
  analytics verification, and post-launch change management.
metadata:
  role: braze-tester
  topics:
    - campaigns-testing-and-more
    - campaigns-testing-sending-test-messages
    - campaigns-testing-triggered-action-based
    - campaigns-testing-campaign-analytics
    - campaigns-testing-retention-reports
    - campaigns-testing-campaign-funnel-report
    - campaigns-managing-change-after-launch
    - campaigns-faq
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files serve as the "context injection layer" for agents — they're not docs for humans but signal documents for Claude to decide *when* to load domain knowledge and *what angle* to apply it from. The lens framing is key: two skills can cover the same topics but serve different roles by emphasizing different aspects.
`─────────────────────────────────────────────────`

# Campaign Testing & Validation

## Overview

This skill covers the full lifecycle of validating Braze campaign behavior — from pre-launch test message sends through post-launch analytics verification and change management. The lens is **validation**: not how campaigns are built, but how to confirm they work correctly, reach the right users, and produce measurable outcomes.

Use this skill when the task involves:
- Sending test messages before a campaign goes live
- Verifying that action-based or API-triggered campaigns fire correctly
- Reading and interpreting campaign analytics, funnel reports, or retention data
- Making or reviewing post-launch campaign edits
- Answering QA and testing questions about campaign setup

Do **not** use this skill for initial campaign creation, segmentation design, or Canvas configuration — those fall under separate role skills.

---

## Topics Synthesized

This skill draws from the following reference topics:

| Topic | Focus |
|---|---|
| **Sending Test Messages** | How to send test messages to seed groups, preview users, and internal test segments before launch |
| **Campaign Testing Overview** | General testing best practices; creating test user segments for API-triggered and action-based flows |
| **Triggered Action-Based Testing** | Validating that action-based and API-triggered campaigns fire under correct conditions |
| **Campaign Analytics** | Reading campaign-level performance data including sends, deliveries, opens, clicks, and conversions |
| **Campaign Funnel Report** | Interpreting the funnel report to understand drop-off between campaign stages |
| **Retention Reports** | Using retention reports to measure long-term engagement impact after a campaign |
| **Change Campaign After Launch** | Rules and consequences of editing live campaigns — what can change, what stops the campaign, and what cannot be modified |
| **Campaigns FAQ** | Common questions including multichannel campaigns, re-eligibility, and scheduling edge cases |

---

## The Tester's Lens

As `braze-tester`, this skill applies a **validation-first perspective**:

1. **Before launch** — confirm the message renders correctly, targets the right segment, and triggers under expected conditions using test sends and seed groups
2. **At launch** — verify that delivery pipelines are healthy and triggered behaviors activate as configured
3. **Post-launch** — interpret funnel and analytics data to confirm campaign is performing as designed; flag anomalies early
4. **Change management** — evaluate the impact of any post-launch edits, including whether stopping and re-launching is required

This means reading Braze documentation through the question: *"Is this working the way we expect it to?"*

---

## Key Validation Checkpoints

### Pre-Launch
- Send test messages to internal users or a seed group before activating
- For API-triggered campaigns, fire a test API call and confirm receipt
- For action-based campaigns, manually perform the trigger action on a test user and confirm delivery

### Delivery Verification
- Check the campaign's **Message Activity Log** for delivery errors or suppression reasons
- Confirm segment membership for test users using the **User Lookup** tool
- Validate re-eligibility settings to ensure test users can receive the message more than once if needed

### Analytics Interpretation
- Use the **Campaign Analytics** page to monitor sends, deliveries, opens, clicks, and conversions
- Use the **Funnel Report** to identify where users drop off between steps
- Use **Retention Reports** to assess whether the campaign drove lasting engagement beyond the initial send

### Post-Launch Changes
- Stopping a campaign pauses delivery; re-starting resumes it
- Some fields (e.g., segment, delivery schedule type) cannot be changed without stopping and re-creating
- Edits to message content on live campaigns affect future sends only, not in-flight messages

---

## Common Mistakes

- **Testing with production users**: Always use a dedicated internal test segment to avoid polluting real user data or sending unintended messages
- **Forgetting re-eligibility on test segments**: Test users may be suppressed by default re-eligibility rules — set re-eligibility to 0 seconds for testing loops
- **Confusing "stopped" with "completed"**: A stopped campaign can be restarted; check status before assuming a campaign has ended
- **Reading analytics too early**: Wait for the send window to close and allow processing time before interpreting delivery rates
- **Editing live campaigns without impact assessment**: Understand which fields require a full stop/restart before making changes
