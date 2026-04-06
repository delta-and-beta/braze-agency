---
name: strategist-campaign-strategy
description: >-
  Campaign strategy including retargeting, lapsed user capture, booking use
  cases, active user engagement, and cross-channel best practices.
metadata:
  role: braze-strategist
  topics:
    - campaigns-ideas-and-strategies
    - campaigns-ideas-best-practices
    - campaigns-ideas-retargeting
    - campaigns-ideas-capturing-lapsing-users
    - campaigns-ideas-active-user-campaigns
    - campaigns-ideas-new-features
    - campaigns-ideas-booking-use-case
    - campaigns-ideas-install-attribution
    - campaigns-ideas-add-to-calendar-links
    - campaigns-ideas-zoom
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files act as progressive disclosure layers — the body here gives Claude a conceptual map so it knows *when* to apply this knowledge, while topic detail lives in `references/` files (not shown). This separation keeps the context window lean: the full skill only loads when a campaign-related query triggers it.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Campaign Strategy & Engagement

## Purpose

This skill covers designing and executing campaign strategies across the user lifecycle — from first install through active engagement, re-engagement of lapsing users, and event-driven use cases like bookings and webinars. Use this skill when advising on how to structure a campaign, choose the right trigger strategy, or select tactics for a specific engagement goal.

The lens here is **lifecycle-aware campaign design**: every recommendation is filtered through the question of where the user sits in their relationship with the product, and what action moves them meaningfully forward.

---

## When to Apply This Skill

Apply this skill when working on questions such as:

- How to re-engage users who haven't opened the app in 30 days
- How to structure a retargeting campaign based on email open or click behavior
- How to promote a new feature or app version to existing users
- How to automate registration flows for webinars or events (e.g., Zoom)
- How to reward and deepen engagement with already-active users
- How to help users save events to their calendar via email
- How to track install attribution and use it to personalize onboarding
- How to design campaigns around a booking or reservation flow
- General campaign best practices and the Four T's of Braze

---

## Topics Synthesized

This skill draws from the following reference areas:

| Topic | Core Focus |
|---|---|
| **Zoom Campaign Integration** | Automating Zoom webinar registration via Braze connected content or webhooks |
| **Retargeting Campaigns** | Re-engaging users based on prior campaign interactions (opens, clicks, non-opens) |
| **New Feature Campaigns** | Communicating app updates and new features to drive adoption |
| **Install Attribution** | Understanding install sources and using that context to personalize early-lifecycle messaging |
| **Capturing Lapsing Users** | Automated recurring re-engagement for users showing signs of churn |
| **Booking Use Case** | Campaign patterns for reservation, appointment, and booking confirmation flows |
| **Campaign Best Practices** | The Four T's of Braze and principles for responsible, effective campaign design |
| **Add to Calendar Links** | Embedding calendar links in email to increase event attendance |
| **Active User Campaigns** | Identifying and rewarding engaged users to deepen loyalty |
| **Campaign Ideas & Strategies Overview** | Cross-cutting patterns that apply across multiple use cases |

---

## Strategic Lens: Lifecycle-Aware Campaign Design

Every campaign decision should begin by locating the user in their lifecycle stage:

**New / Just Installed**
Focus on install attribution context. A user who installed via a referral campaign should receive different onboarding messaging than one who came from organic search. Use attribution data to personalize the first touchpoint.

**Active**
Active users are your most valuable audience and the easiest to alienate with generic messaging. Design campaigns that reward behavior, surface relevant new features, and deepen product usage — not campaigns that re-explain basics. Identify activity thresholds to segment "power users" from "casual users" and tailor accordingly.

**Lapsing**
Lapsing users require careful timing and tone. Set up automated recurring re-engagement that triggers before a user is fully churned — not after. The goal is to surface value the user may have forgotten, not to flood them with promotions. Use behavioral signals (last session, last purchase, last open) to calibrate the urgency of the message.

**Event-Driven**
Booking confirmation, webinar registration, and calendar add flows are high-intent moments. These campaigns should feel like helpful logistics, not marketing. Automate confirmations, reminders, and follow-ups with precision — latency here damages trust.

---

## Campaign Best Practices: The Four T's of Braze

When designing any campaign, apply the Four T's framework to evaluate message quality:

1. **Targeted** — Only message users for whom the message is genuinely relevant.
2. **Timely** — Send at the moment of highest relevance, not convenience.
3. **Transactional** — Respect the distinction between marketing messages and utility messages. Users tolerate transactional messages at higher frequency.
4. **Tracked** — Every campaign should have a clear conversion definition. Track it.

Avoid sending customer data to Braze that you do not intend to use in targeting or personalization. Unused data creates noise, compliance risk, and segment bloat.

---

## Cross-Channel Considerations

Campaign strategy in Braze is channel-agnostic at the design level but channel-specific at the execution level:

- **Email** is the primary channel for add-to-calendar links, webinar registration confirmations, and feature announcement long-form content.
- **Push** is appropriate for time-sensitive lapsing re-engagement and active user rewards, but frequency must be controlled.
- **In-app messages** are the right channel for new feature awareness — the user is already in the product.
- **Webhooks** (e.g., Zoom integration) enable campaign actions that extend beyond Braze into third-party systems.

When designing a campaign, select the channel based on the user's likely context at the time of sending, not based on channel availability.

---

## Retargeting Patterns

Retargeting in Braze is segment-based, not pixel-based. Common patterns:

- **Opened but didn't convert** → Follow up with a different value proposition or a direct CTA
- **Did not open** → Resend with a new subject line to the non-opener segment (use Canvas with a time delay branch)
- **Clicked but abandoned** → Trigger a behavioral retargeting message tied to the specific content clicked
- **Did not receive** (e.g., push not enabled) → Fall back to an alternate channel

Always define the retargeting window explicitly. A 3-day retarget for a flash sale is appropriate; a 3-day retarget for a booking reminder may be too long.

---

## Zoom and Event Integration

Automating Zoom registration through Braze eliminates the manual step of sending users to a Zoom landing page. The pattern is:

1. Capture user intent (webinar sign-up form, email CTA, or segment membership)
2. Trigger a webhook to Zoom's registration API
3. Store the unique join URL as a user attribute or event property
4. Deliver the join URL via confirmation email with an add-to-calendar link

This pattern applies broadly to any third-party event platform that exposes a registration API.

---

## Additional Resources

For detailed reference material on individual topics, consult the `references/` directory for this skill. Each topic listed in the Topics Synthesized table above has a corresponding reference file with implementation specifics, Braze configuration details, and example flows.

---

`★ Insight ─────────────────────────────────────`
The lifecycle stage table and the Four T's section are the highest-signal additions here — they give Claude a *reasoning framework*, not just facts. Skills that teach Claude *how to think* about a domain (not just what to do) produce better responses when users ask open-ended strategy questions rather than specific how-to questions.
`─────────────────────────────────────────────────`
