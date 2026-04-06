---
name: architect-subscription-management
description: >-
  Managing subscription groups, opt-in/opt-out flows, user preferences, and
  consent collection across channels.
metadata:
  role: braze-architect
  topics:
    - keywords-optin-optout
    - keywords-fuzzy-opt-out
    - keywords-double-opt-in
    - sms-mms-rcs-subscription-groups
    - email-preference-center
    - email-managing-user-subscriptions
    - email-setup-consent-and-address-collection
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` skill emphasizes **imperative/infinitive form** (verb-first) over second person, and a **governance lens** like this one is best expressed as decision trees and compliance checkpoints rather than narrative descriptions — Claude navigates compliance by matching channel/regulation/state to the right flow.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Subscription & Consent Management

## Purpose

This skill covers the governance layer of Braze messaging: how user consent is collected, recorded, respected, and maintained across SMS/MMS/RCS and email channels. Apply this skill when designing opt-in flows, configuring subscription groups, implementing preference centers, or auditing compliance posture for messaging programs.

The governance lens means prioritizing correctness and legal defensibility over convenience. Every design decision here carries regulatory weight — TCPA, GDPR, CAN-SPAM, and carrier code-of-conduct all intersect in this domain.

---

## Scope

This skill synthesizes the following topic areas:

| Topic | What It Covers |
|---|---|
| **Opt-In & Opt-Out Keywords** | Exact-match SMS keywords Braze processes automatically (START, STOP, HELP, etc.) |
| **Fuzzy Opt-Out** | NLP-based detection of opt-out intent beyond exact keywords |
| **Double Opt-In** | Two-step confirmation flow for SMS/MMS/RCS before first message delivery |
| **SMS Subscription Groups** | Logical groupings of sending phone numbers; the unit of SMS consent |
| **Consent & Address Collection** | Email permission best practices, list hygiene, and acquisition methods |
| **Email Preference Center** | User-facing interface for managing email subscriptions and frequency |
| **Managing User Subscriptions** | Subscription states, segment-based filtering, and API-driven state changes |

---

## Core Concepts

### Subscription States

Braze tracks three subscription states for both email and SMS:

- **Subscribed** — user has opted in (or has not yet opted out for email)
- **Opted-In** — explicit double opt-in confirmed (strongest consent signal)
- **Unsubscribed** — user has opted out; no marketing messages may be sent

For SMS, consent is tracked **per subscription group**, not globally. A user can be subscribed to an SMS group for transactional alerts and unsubscribed from a promotional group simultaneously.

For email, consent is tracked globally and additionally per subscription group. Always check both dimensions when designing segments.

### SMS Subscription Groups as the Unit of Consent

SMS subscription groups bind together:
- A set of sending entities (long codes, short codes, or alphanumeric sender IDs)
- A pool of opted-in users
- A geographic and carrier context

Never mix transactional and promotional sending numbers within the same group. Regulatory treatment differs, and mixing them risks contaminating a clean transactional sender with promotional opt-out behavior.

---

## Opt-In & Opt-Out Keyword Flows

### Exact-Match Keywords (Automatic)

Braze automatically handles the following single-word inbound keywords:

| Intent | Keywords |
|---|---|
| Opt-in | START, YES, UNSTOP, RESUME |
| Opt-out | STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT |
| Help | HELP, INFO |

Regulations require that all three intent categories receive a response. Configure these response messages in the subscription group settings. Do not suppress them.

### Fuzzy Opt-Out

Enable fuzzy opt-out to catch natural-language variations like "please stop texting me" or "stopppp." When enabled:

1. Braze applies NLP to classify inbound messages as opt-out intent
2. Matched messages trigger the configured opt-out keyword response
3. The user is unsubscribed from the group

Fuzzy opt-out applies only to opt-out detection, not to opt-in. This is intentional — consent must be unambiguous; withdrawal of consent does not need to be.

---

## Double Opt-In Flow

Double opt-in adds a confirmation step before a user enters an SMS subscription group:

1. User submits their phone number (via web form, in-store, etc.)
2. Braze sends a confirmation SMS asking the user to reply with a keyword (e.g., "YES")
3. Upon confirmation, the user's subscription state updates to Opted-In
4. Messaging begins only after step 3

**When to require double opt-in:**
- High-volume programs (short code campaigns)
- Markets with stricter regulations (Canada, UK)
- Scenarios where list acquisition quality is uncertain (co-registration, lead-gen)

**Design considerations:**
- The confirmation message must clearly identify the brand and describe what the user is confirming
- Set an expiration window for the pending confirmation (24–48 hours is common)
- Users in "pending" state must not receive marketing messages
- Track confirmation rates; low rates indicate a list quality problem

---

## Email Consent & Address Collection

### Permission-Based Acquisition

Collect email addresses only through explicit opt-in mechanisms. Avoid:
- Pre-checked consent boxes
- List purchases or rentals
- Scraping or inference

Preferred acquisition patterns:
- Single opt-in with clear disclosure at point of collection
- Double opt-in (confirmation email required before first send)
- Transactional → marketing upsell with explicit consent moment

### List Hygiene

Maintain list quality continuously:
- Suppress hard bounces immediately and permanently
- Suppress soft bounce accumulations after threshold (typically 3+ bounces)
- Sunset inactive subscribers using engagement-based segments
- Honor global unsubscribes from all commercial email regardless of subscription group

---

## Email Preference Center

The Email Preference Center gives users control over:
- Global subscription state (subscribed / unsubscribed)
- Per-group subscription preferences (newsletters, promotions, product updates)
- Communication frequency preferences (if configured)

**Implementation pattern:**
1. Generate a preference center URL using Braze's hosted preference center or a custom implementation
2. Include the link in every commercial email footer (legally required in CAN-SPAM jurisdictions)
3. Route group-level changes through subscription group APIs; route global unsubscribes through the global unsubscribe endpoint
4. Respect preference center changes immediately — do not batch or delay processing

**Custom preference centers** allow full brand control but require:
- Authenticating the user (use tokenized URLs, not session auth)
- Writing subscription state changes back via REST API
- Handling the global unsubscribe case explicitly

---

## Compliance Decision Framework

When reviewing a subscription or consent design, apply this sequence:

1. **Channel** — Is this SMS, email, or push? Each has different legal frameworks.
2. **Geography** — What regulations apply? (TCPA for US SMS, GDPR for EU, CASL for Canada)
3. **Message type** — Is this transactional or commercial/promotional? Transactional has more lenient rules in most jurisdictions, but "transactional" has a narrow legal definition.
4. **Consent signal** — Was consent explicit, implied, or inferred? Explicit is always the safest posture.
5. **Subscription group assignment** — Is the user subscribed to the correct group for this message type?
6. **Suppression check** — Is the user globally unsubscribed, bounced, or marked spam?

Fail any step → do not send. Design the system to fail closed, not open.

---

## Common Patterns

### Migrating Users to a New Subscription Group

When consolidating or splitting subscription groups:
1. Export current opted-in users via API
2. Import them into the new group using the `/subscription/status/set` endpoint
3. Do not assume prior consent transfers automatically — confirm with legal whether re-consent is required
4. Archive (do not delete) the original group for audit trail purposes

### Handling Inbound Keyword Conflicts

If a keyword overlaps between a custom keyword campaign and a standard opt-in/opt-out keyword:
- Standard opt-out keywords (STOP, etc.) always take precedence
- Custom keyword responses are not triggered for regulated keywords
- Design custom keyword sets to avoid these conflicts

### API-Driven Subscription State Updates

Use the Braze REST API to update subscription states when:
- A user opts in through a non-Braze touchpoint (in-store, phone, web form outside Braze)
- A CRM system holds the authoritative consent record and Braze must be kept in sync
- Bulk migrations are needed

Endpoint: `POST /subscription/status/set`

Required fields: `subscription_group_id`, `subscription_state`, and at least one of `external_id`, `email`, or `phone`.

---

## Architecture Guidance

**Segment design for compliance:**
- Always include subscription state filters in segments targeting commercial messages
- Build a "safe to contact" master segment that combines all suppression conditions; reference it as a base filter
- Audit subscription group assignments quarterly against actual sending patterns

**Audit trail requirements:**
- Log the timestamp, source, and mechanism of every consent event
- Store this outside Braze if long-term retention (5+ years) is required
- Braze retains subscription history, but export it regularly to a durable store for compliance evidence

**Testing consent flows:**
- Use Braze's test user feature to walk through opt-in/opt-out sequences end to end before launch
- Verify that fuzzy opt-out detection fires on your anticipated natural-language patterns in staging
- Confirm preference center writes propagate to the correct groups within expected SLA

---

## Topics This Skill Synthesizes

- Opt-In & Opt-Out Keywords — regulatory keyword handling and required responses
- Fuzzy Opt-Out — NLP-based intent detection for non-standard opt-out phrasing
- Double Opt-In — two-step confirmation flow before first SMS delivery
- SMS Subscription Groups — sending entity groupings and consent boundaries
- Consent & Address Collection — email permission best practices and acquisition hygiene
- Email Preference Center — user-facing subscription management interface
- Managing User Subscriptions — subscription states, API updates, and segment targeting

`★ Insight ─────────────────────────────────────`
The **fail-closed compliance decision framework** (channel → geography → message type → consent signal → group assignment → suppression) is a deliberate architectural pattern — it mirrors how legal review actually works and gives Claude a structured sequence to audit any proposed send, rather than a flat list of considerations to apply in arbitrary order. Governance skills benefit from this kind of ordered decision tree because the order itself carries meaning.
`─────────────────────────────────────────────────`
