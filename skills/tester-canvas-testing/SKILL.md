---
name: tester-canvas-testing
description: >-
  Canvas testing workflows, troubleshooting common issues, experiment
  validation, and FAQ resolution.
metadata:
  role: braze-tester
  topics:
    - canvas-testing-canvases
    - canvas-troubleshooting
    - canvas-faqs
    - canvas-components-experiment-step
    - canvas-components-experiment-winning-path
    - canvas-components-experiment-personalized-paths
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill emphasizes TDD for skill creation, but the user is requesting a pre-composed skill body from supplied topic content — this is a GREEN phase task: writing the skill document itself, not the full TDD lifecycle. The instruction to omit YAML frontmatter tells me this content will be embedded inside a larger file by the plugin generator.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Canvas Testing & Troubleshooting

## Overview

This skill covers how to test, validate, and troubleshoot Braze Canvas flows before and after launch. It synthesizes guidance on experiment design, winning path logic, personalized path optimization, pre-launch testing workflows, diagnostic troubleshooting, and common FAQ resolution.

**Use this skill when:**
- Setting up Experiment Steps to A/B test multiple Canvas paths
- Configuring Winning Path or Personalized Path automation for experiment optimization
- Sending test messages to validate Canvas behavior before launch
- Diagnosing why a user did not receive a Canvas step or message
- Answering common Canvas behavior questions (step limits, editing live Canvases, re-entry logic)

**Do not use for:** Campaign-level A/B testing, general segmentation, or non-Canvas messaging troubleshooting.

---

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| **Experiment Paths** | Splitting users across multiple paths + a control group; tracking path performance metrics |
| **Winning Path** | Automatically sending remaining users down the best-performing path after a test window |
| **Personalized Paths** | Individually optimizing which path each user receives based on predicted likelihood to convert |
| **Testing Canvases** | Pre-launch checks: sending test messages, previewing steps, verifying segment membership |
| **Canvas Troubleshooting** | Diagnosing missed steps — custom events, entry conditions, frequency capping, quiet hours |
| **Canvas FAQs** | Step limits, editing live Canvases, re-entry, multi-channel steps, draft behavior |

---

## Lens: How to Test, Validate, and Troubleshoot Canvas Flows

This skill approaches Canvas from a **quality assurance and validation perspective**. The central question is always: *"Did the right user receive the right message at the right time, and if not, why not?"*

Three testing layers map to three phases of work:

```
Before launch  → Send test Canvas to seed users; verify segment, entry rules, step config
During test    → Monitor Experiment Path metrics; check conversion event tracking
After launch   → Troubleshoot missed deliveries; resolve FAQ edge cases
```

---

## Experiment Paths

**What it is:** An Experiment Step splits Canvas traffic across two or more variant paths plus an optional control group. Use it to compare messaging strategies, timing, or channel selection.

**Key behaviors to validate:**
- Confirm the split percentages add up to 100% (including control).
- Verify the **conversion event** is correctly defined — this is what determines the "winning" path.
- Check that the test window (delay before evaluating results) is long enough to reach statistical significance.

**Winning Path** automates the next step: once the test window closes, Braze automatically routes the remaining unsent users down the best-performing variant path. This removes manual intervention but requires the conversion event and window to be correctly set up *before* launch — they cannot be changed mid-test.

**Personalized Paths** go further: instead of one winner for all remaining users, each user is individually routed to the path they are predicted most likely to convert on. Users who don't have enough data fall back to a designated fallback path.

**Common setup mistakes:**
- Forgetting to set a conversion event on an Experiment Step (Winning Path will have nothing to evaluate).
- Setting too short a test window, causing low statistical confidence.
- Not designating a fallback path for Personalized Paths, leaving low-data users unrouted.

---

## Testing Canvases Before Launch

Before sending to a live audience, use Braze's **test send** workflow:

1. Navigate to the Canvas and click **Preview & Test**.
2. Use **Send Test** to deliver to a test user or seed list — confirm the message renders correctly in each channel.
3. Check **User Preview** to simulate how a specific user ID would move through the Canvas (segment qualification, variant assignment, personalization).
4. Review entry conditions: confirm the trigger event or scheduled time is correct and the target segment is populated.
5. Verify **frequency capping** and **quiet hours** settings won't suppress the test send (test sends may bypass these — confirm behavior matches production intent).

**Checklist before launch:**
- [ ] Entry trigger or schedule confirmed
- [ ] Target segment non-empty and correctly defined
- [ ] All steps previewed for correct personalization/liquid rendering
- [ ] Conversion events set (especially if using Experiment Paths)
- [ ] Re-entry rules reviewed if users may qualify multiple times

---

## Troubleshooting: Why a User Did Not Receive a Step

Work through this decision tree when a user was expected to receive a Canvas message but did not:

1. **Did the user enter the Canvas?**
   - Check Canvas analytics for entry count.
   - Confirm the user matches the entry segment at the time of the trigger.
   - Verify the custom event (if trigger-based) is being passed to Braze with the correct event name and properties.

2. **Did the user exit before reaching the step?**
   - Check for **exception events** that remove users mid-flow.
   - Check **exit criteria** (segment-based exits).

3. **Was the step itself suppressed?**
   - **Frequency capping**: User hit their message limit for the period.
   - **Quiet hours**: Send time fell in a suppression window; check if the step was skipped or delayed.
   - **Global control group**: User was excluded by a global holdout.

4. **Was the channel-specific send blocked?**
   - Email: Check subscription state and opt-out status.
   - Push: Confirm push token exists and notifications are enabled.
   - SMS: Confirm subscription group membership.

5. **Did the Experiment Step route them to a non-message path?**
   - Users in a control group or a path without a message step will not receive a message — this is expected behavior.

---

## Canvas FAQs

**How many steps can a Canvas have?**
There is no hard cap on steps, but very large Canvases can affect editor performance. Architect complex flows as multiple linked Canvases when possible.

**Can I edit a Canvas while it's live?**
Yes, with limitations. You can add new steps, edit message content, and adjust delays on future-scheduled steps. You cannot change entry conditions, re-order steps users are actively waiting in, or modify Experiment Path splits mid-test.

**Can users re-enter a Canvas?**
Only if **re-entry** is enabled in Canvas settings. You can configure re-entry after a delay or allow immediate re-entry. Users who are currently active in the Canvas are not re-entered by default.

**What happens if I archive a Canvas mid-flight?**
Active users in the Canvas will not receive remaining steps. Archiving stops all future sends immediately.

**Can a single Canvas step send across multiple channels?**
Yes — a **Message Step** can include variants for multiple channels (email, push, SMS, in-app). Each channel variant can be independently configured or left empty to skip that channel for users.

---

## Common Mistakes Quick Reference

| Mistake | Fix |
|---------|-----|
| Experiment conversion event not set | Set before launch; cannot change mid-test |
| Test window too short | Allow enough time for statistical significance (typically 3–7 days) |
| Personalized Paths missing fallback | Always designate a fallback path |
| User not entering Canvas | Verify trigger event name exactly matches what's being sent |
| Message suppressed silently | Check frequency cap, quiet hours, global control group, and channel subscription state |
| Editing live Canvas breaks active users | Only edit steps users haven't reached yet; never reorder active steps |

---

`★ Insight ─────────────────────────────────────`
This skill file uses a decision-tree structure for troubleshooting (rather than flat bullet lists) because Canvas delivery failures have a deterministic causal chain — entry → exit → suppression → channel block. A tree mirrors the actual diagnostic process, which makes it more actionable than a list of possible causes. The FAQ section deliberately uses the exact question phrasing testers would ask, optimizing for keyword match when Claude routes queries to this skill.
`─────────────────────────────────────────────────`
