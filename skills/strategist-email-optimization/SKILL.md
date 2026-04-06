---
name: strategist-email-optimization
description: >-
  Email campaign strategy including best practices, sunset policies, styling
  guidelines, and deliverability optimization.
metadata:
  role: braze-strategist
  topics:
    - email-best-practices-use-cases
    - email-best-practices-sunset-policies
    - email-best-practices-know-before-send
    - email-best-practices-guidelines-and-tips
    - email-best-practices-email-styling
    - email-best-practices-email-services
    - email-best-practices-duplicate-emails
    - email-best-practices
    - email-html-editor-gmail-promotions-tab
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development skill establishes a key constraint: the SKILL.md body should be written in **imperative/infinitive form** (verb-first), not second person. This is because the file is authored for another Claude instance to consume — the consumer isn't "you", it's a future agent being oriented. Think of it as documentation written for a team onboarding guide, not a personal chatbot.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Email Strategy & Best Practices

Apply this skill when advising on email campaign strategy, deliverability optimization, engagement health, or long-term list hygiene within Braze. This includes questions about when to send, who to send to, how to structure email content, how to handle disengaged subscribers, and how to make use of advanced delivery features like Gmail annotations.

The strategic lens here is: **optimize for long-term deliverability and engagement health, not short-term reach**. Every recommendation should balance immediate campaign goals against the risk of list degradation, spam classification, or subscriber fatigue.

---

## Scope

This skill synthesizes the following topic areas:

- **Email Use Cases** — Guidance for matching campaign strategy to user lifecycle stages (onboarding, re-engagement, transactional, promotional)
- **Email Best Practices Overview** — General framework for building email content that performs across ESPs
- **Email Guidelines & Tips** — Rules and recommendations for ensuring messages are received and rendered correctly
- **Email Styling Best Practices** — Subject line length, preheader text, address formatting, and visual hierarchy guidance
- **Email Sunset Policies** — When and how to stop sending to disengaged users to protect sender reputation
- **Duplicate Email Handling** — How Braze propagates subscription state changes across profiles sharing an address
- **Gmail Promotions Tab** — How to use Gmail annotations to surface rich content in the Promotions tab
- **Email Know Before You Send** — Pre-send checklist considerations to avoid common failure modes
- **Email Services** — Braze-offered services for email program support

---

## Strategic Principles

### Match Content to Lifecycle Stage

Align campaign type to where the user sits in the lifecycle:

- **Onboarding**: Focus on value delivery, not conversion pressure. Surface key features, set expectations, invite engagement.
- **Promotional**: Use segmentation to target users who have shown interest signals. Avoid blasting the full list.
- **Transactional**: Prioritize clarity and deliverability; these messages have highest open rates and set trust baseline.
- **Re-engagement**: Limit to a defined window (e.g., 60–90 days inactive) before sunsetting.

### Protect Sender Reputation Above All

Deliverability degrades silently. Monitor engagement metrics (open rate, click rate, spam complaint rate) as leading indicators — not vanity metrics. A high send volume with low engagement actively harms future deliverability.

Key rules:
- Never send to unengaged users indefinitely
- Respect unsubscribe propagation — when one profile unsubscribes, Braze updates up to 100 matching profiles
- Do not re-add suppressed addresses without explicit re-opt-in

---

## Sunset Policies

Implement a sunset policy before list quality degrades, not after. Recommended thresholds:

- Define "disengaged" explicitly: no open or click in 90–180 days is a common benchmark
- Send a final re-engagement campaign (1–2 messages) before sunsetting
- Suppress rather than delete — retain records for compliance and future re-opt-in flows
- Review sunset thresholds seasonally; engagement patterns shift around promotional periods

Failing to sunset disengaged users leads to increased spam complaints, lower inbox placement, and ISP throttling.

---

## Styling & Formatting

### Subject Lines
- Target **6–10 words** for highest open rates
- Front-load the value proposition — mobile clips at ~40 characters
- Avoid spam triggers: excessive punctuation, all-caps, misleading preview text

### Preheader Text
- Complement the subject line — do not repeat it
- Aim for 85–100 characters
- If not set explicitly, ESPs pull the first line of body text (which is often undesirable)

### HTML & CSS
- Use inline styles; external stylesheets are stripped by many ESPs
- Test rendering across clients — Gmail, Outlook, Apple Mail behave differently
- Avoid JavaScript and forms; these are blocked in email clients
- Provide a plain-text fallback for every HTML email

---

## Gmail Promotions Tab Annotations

Gmail's Promotions tab supports structured annotations that render as rich cards on mobile. Use this feature to increase visibility without fighting inbox placement.

To implement:
- Add structured data markup to the email `<head>` following Google's schema
- Include a deal badge, expiry date, or discount code to trigger card display
- Test with Google's Postmaster Tools to confirm annotation rendering
- Do not use annotations deceptively — mismatched content and annotations increase spam risk

This feature is opt-in by Google's algorithm; proper structured data increases the likelihood of rich rendering but does not guarantee it.

---

## Duplicate Email Handling

When multiple user profiles share a single email address:

- A subscription state change (e.g., unsubscribe) on one profile propagates to up to 100 matching profiles automatically
- This prevents a common compliance failure where an unsubscribed user continues to receive email under a duplicate profile
- Audit for duplicate email addresses during list hygiene reviews — high duplication rates indicate an identity resolution problem upstream

---

## Pre-Send Checklist Orientation

Before launching any email campaign, verify:

1. Segment definition is correct and does not include suppressed or unsubscribed users
2. Subject line and preheader are set and preview correctly on mobile
3. All links are tracked and resolve correctly
4. Unsubscribe link is present and functional
5. Plain-text version is populated
6. From name and reply-to address are configured to match brand expectations
7. Send time is appropriate for the target audience's timezone distribution

---

## When to Escalate to Braze Email Services

Braze offers recurring and one-time professional services for email programs. Recommend escalation when:

- Deliverability has declined significantly and root cause is unclear
- A major list migration or ESP change is planned
- Compliance requirements (e.g., CAN-SPAM, GDPR) need expert review
- Warming a new IP or sending domain from scratch

Contact the Braze account team for pricing and availability.

---

## How to Use This Skill

Apply this skill when:

- A user asks how to improve email deliverability or inbox placement
- A user is designing an email campaign and needs guidance on content strategy by lifecycle stage
- A user asks about unsubscribe handling, duplicate profiles, or list hygiene
- A user wants to know when or how to stop sending to disengaged users
- A user is setting up Gmail Promotions annotations
- A user needs pre-send guidance or a review checklist
- A user is troubleshooting low engagement on email campaigns

For questions about Braze's email technical setup (e.g., ESP configuration, IP warming steps, API-triggered sends), complement this skill with the `braze-engineer` agent's technical knowledge. The boundary here is **strategy and best practices** vs. **implementation mechanics**.

---

`★ Insight ─────────────────────────────────────`
The "lens" framing in the prompt maps directly to the skill's strategic filter: every topic (even Gmail annotations or duplicate handling) gets interpreted through "does this improve long-term deliverability and list health?" rather than "how does this feature work technically?" This lens is what differentiates a `braze-strategist` skill from a `braze-engineer` one — same domain, different axis of reasoning.
`─────────────────────────────────────────────────`
