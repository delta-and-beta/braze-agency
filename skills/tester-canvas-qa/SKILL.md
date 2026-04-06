---
name: tester-canvas-qa
description: >-
  Canvas flow testing including path preview, test sends, and pre/post-launch
  validation.
metadata:
  role: braze-tester
  topics:
    - canvas-testing-sending-test-canvases
    - canvas-testing-preview-user-paths
    - canvas-ideas-pre-post-launch-checklist
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Domain skills in plugin architectures serve a different purpose than process skills — they're reference guides Claude uses to orient itself within a knowledge domain. The "lens" concept here (Validation) is key: rather than just cataloging facts, the skill shapes *how* Claude frames advice (as a tester catching errors before commitment, not as a builder describing features).
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# Canvas Testing & Validation

## Scope and Purpose

This skill covers the complete validation workflow for Braze Canvas flows — from initial test sends through pre-launch readiness checks to post-launch verification. It equips the `braze-tester` role with the knowledge to catch configuration errors, preview user experiences, and confirm Canvas behavior before and after deployment.

**Core lens:** Validation — how to test Canvas flows, preview user paths, and validate before launch.

Use this skill when:
- Sending test messages to internal recipients before a Canvas goes live
- Previewing the exact journey a specific user would take through a Canvas
- Running pre-launch and post-launch checklist reviews
- Verifying that branching logic, timing, and message content behave as designed
- Diagnosing why a Canvas step isn't behaving as expected in a test environment

## Topics This Skill Synthesizes

### Sending Test Canvases

How to send a test version of a Canvas to internal recipients before launch. Covers selecting test users, triggering the Canvas in test mode, and interpreting the results. Use this to verify message content, personalization rendering, timing gaps, and branching behavior before real users enter the flow.

### Preview User Paths

How to use Braze's Canvas path preview feature to simulate the journey a specific user would take — including which branch they'd follow, what messages they'd receive, and when. Path previews act as quality assurance runs and surface issues like missing personalization variables, incorrect branching conditions, or unexpected timing without sending live messages.

### Canvas Pre/Post Launch Checklist

A structured set of checks to perform both before launching a Canvas and after it goes live. The pre-launch checklist focuses on configuration correctness: entry conditions, segment targeting, message content, timing, and conversion event setup. The post-launch checklist confirms the Canvas is running as intended and catches early anomalies in delivery or conversion data.

## Validation Lens

This skill approaches Canvas quality from the perspective of a **tester validating before commitment**. The key questions at each stage are:

- **Before testing:** Is the Canvas configured correctly enough to test?
- **During testing:** Does the Canvas behave as designed for representative users?
- **Before launch:** Have all critical checks been completed and signed off?
- **After launch:** Is early data consistent with expected behavior?

The skill prioritizes catching errors early — in test sends and path previews — rather than discovering them after real users have entered the flow. When in doubt, test first and launch second.

## When to Use This Skill

- A Canvas has been built and is awaiting QA or stakeholder review
- A stakeholder asks "is this Canvas ready to launch?"
- You need to confirm a specific user profile would receive the right messages in the right order
- A pre-launch checklist needs to be run before approval
- Post-launch monitoring reveals unexpected behavior that needs to be traced to a configuration issue

## Key Capabilities

| Capability | What It Validates |
|---|---|
| Test sends | Message content, personalization, delivery timing |
| Path preview | Branch logic, timing, full user journey sequence |
| Pre-launch checklist | Entry rules, segment targeting, conversion events, step setup |
| Post-launch checklist | Delivery rates, conversion tracking, early anomalies |

## Common Mistakes to Avoid

- **Testing with unrepresentative users** — use profiles that match your actual target segment's attributes, so branch conditions trigger correctly
- **Skipping post-launch checks** — the checklist doesn't end at launch; early delivery data often surfaces misconfigured filters or conversion windows
- **Conflating path preview with a full test send** — previews simulate logic but don't confirm actual message delivery or external integrations
- **Launching without checking conversion event alignment** — conversion events configured at the Canvas level must match the goal of each step; misalignment produces misleading analytics

---

`★ Insight ─────────────────────────────────────`
The "Key Capabilities" table and "Common Mistakes" section follow a pattern from the writing-skills guidance: optimize for how Claude will *scan* the skill (tables for quick orientation) vs. *apply* it (prose for nuanced judgment). The mistakes section is especially valuable for a validation skill because it surfaces non-obvious errors a tester might make — not just what to do, but what goes wrong when you don't do it carefully.
`─────────────────────────────────────────────────`
