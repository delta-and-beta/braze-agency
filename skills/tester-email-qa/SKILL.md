---
name: tester-email-qa
description: >-
  Email quality assurance including send testing, inbox vision preview, and
  troubleshooting.
metadata:
  role: braze-tester
  topics:
    - email-testing
    - email-inbox-vision
    - email-html-editor-troubleshooting
    - email-best-practices-know-before-send
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills framework emphasizes that a skill should be discoverable through symptoms and triggering conditions, not just topic names. For a domain-specific plugin skill like this one (vs. a discipline-enforcing skill), the content should optimize for the "scan overview → read patterns → use reference" flow — making the validation lens prominent so Claude routes to this skill when QA questions arise, not just authoring questions.
`─────────────────────────────────────────────────`

Here is the generated skill markdown:

---

# Email Testing & QA

## Overview

This skill covers the **validation layer** of email campaign development: testing sends, previewing rendering across clients, and diagnosing issues before a message reaches a real inbox. Use it when the question is "does this work?" rather than "how do I build this?"

The lens throughout is **Validation** — confirming behavior, catching failures early, and troubleshooting defects in test and pre-send workflows.

## When to Use This Skill

Use when you need to:

- Send a test email and the rendering looks wrong
- Preview how an email will appear in Gmail, Outlook, iOS Mail, or dark mode
- Work through a pre-send checklist before launching a campaign
- Diagnose HTML rendering issues introduced by Braze's editor
- Understand what Inbox Vision shows and how to interpret results
- Troubleshoot why a test email doesn't match the drag-and-drop preview

**Not applicable for:** email composition, content strategy, template authoring, or deliverability/SPF/DKIM configuration.

## Topics This Skill Synthesizes

| Topic | Coverage |
|-------|----------|
| **HTML Editor Troubleshooting** | Diagnosing incorrect rendering in test emails; editor-introduced markup issues |
| **Email Know Before You Send** | Pre-send validation checklist; what to verify before campaign launch |
| **Email Testing** | How to send test messages; what test sends do and don't validate |
| **Inbox Vision Preview** | Client-by-client rendering previews; dark mode testing; mobile vs. desktop comparison |

## Core Validation Workflow

```
Author → Test Send → Inbox Vision → Fix → Re-test → Launch
```

1. **Send a test email** to yourself or a seed list before activating any campaign.
2. **Check rendering** in your primary target clients (Gmail web, iOS Mail, Outlook are highest priority).
3. **Use Inbox Vision** to preview clients you cannot manually test — especially Outlook desktop variants and dark mode.
4. **Diagnose failures** by inspecting the HTML source Braze sends, not just the editor preview.
5. **Iterate and re-test** — do not launch from a single passing preview alone.

## HTML Rendering Troubleshooting

When a test email renders incorrectly, the issue is almost always one of three things:

**1. Braze editor injected unexpected markup**
The HTML editor can modify your code. Always inspect the raw HTML of the received test email (View Source in your mail client) and diff it against your saved template. Look for added `<style>` blocks, modified attributes, or reordered tags.

**2. Client-specific CSS stripping**
Gmail strips `<style>` blocks in some contexts. Use inline styles for critical layout. Outlook does not support many modern CSS properties — use table-based layouts for Outlook compatibility.

**3. Liquid rendering differences**
The in-editor preview renders Liquid with preview data. Test sends use real profile data or connected test users. A mismatch usually means the Liquid expression evaluates differently with real data — inspect the conditional logic and test with an edge-case profile.

## Inbox Vision

Inbox Vision renders your email across a matrix of clients and devices without sending a real email. Key behaviors to understand:

- **What it tests:** Rendering fidelity, not deliverability. Inbox Vision shows how clients parse and display your HTML.
- **Dark mode:** Toggle dark/light mode in Inbox Vision to catch color inversions, transparent image issues, or unreadable text on dark backgrounds.
- **When to use it:** After your HTML is stable and before your first real test send. Also use it after any structural HTML change.
- **Limitations:** Inbox Vision cannot test Liquid personalization, real link tracking, or open/click pixel firing. It is a visual rendering tool only.

## Pre-Send Checklist (Know Before You Send)

Before launching any email campaign, confirm:

- [ ] Test email sent and reviewed in at least two real clients
- [ ] Inbox Vision run — no critical rendering failures in target clients
- [ ] Dark mode preview checked if audience uses iOS or macOS Mail
- [ ] All Liquid variables have fallback values (`| default: ""`)
- [ ] Links are tested and resolve correctly in the test send
- [ ] Subject line and preview text render correctly in inbox view
- [ ] Unsubscribe link is present and functional
- [ ] Sending profile (From name, From address, Reply-To) is correct
- [ ] Campaign analytics tracking is enabled if required

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Trusting the editor preview alone | Always send a test email — the editor and the delivered HTML differ |
| Testing only in one client | Outlook and Gmail diverge significantly; test both |
| Not testing dark mode | Dark mode can invert images and make light-colored text invisible |
| Assuming Liquid renders the same in test vs. live | Use a test profile that matches real edge cases |
| Fixing HTML in the editor without re-testing | Every editor save can re-inject markup — re-test after every change |
