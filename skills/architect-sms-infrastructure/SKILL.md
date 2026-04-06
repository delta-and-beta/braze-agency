---
name: architect-sms-infrastructure
description: >-
  SMS infrastructure including phone number management, short/long codes,
  compliance, geographic permissions, and keyword handling.
metadata:
  role: braze-architect
  topics:
    - sms-sms-setup
    - sms-terms
    - sms-sms-sending
    - mms-short-long-codes
    - keywords-keyword-handling
    - keywords-unknown-phone-numbers
    - sms-mms-rcs-user-phone-numbers
    - sms-mms-rcs-short-and-long-codes
    - sms-mms-rcs-phone-numbers-capture
    - sms-mms-rcs-geographic-permissions
    - sms-mms-rcs-laws-and-regulations
    - sms-mms-rcs-keywords
    - sms-mms-rcs-message-usage
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Plugin skill files act as **routing documents** — their content tells Claude both *when* to invoke them and *what perspective* to apply; the "lens" is what differentiates skills covering the same topics for different roles
- Unlike code docs, skill files should front-load decision criteria so an agent reading only the first screen knows whether to keep reading or switch to a different skill
- Synthesizing 13 topic documents into one coherent skill requires extracting the **cross-cutting concerns** (here: compliance + provisioning + lifecycle) rather than restating each topic independently
`─────────────────────────────────────────────────`

Here's the generated skill file:

---

# SMS/MMS Infrastructure

## Overview

This skill covers the infrastructure layer of Braze SMS and MMS: provisioning sending numbers, navigating carrier and legal requirements, configuring two-way keyword flows, and managing the full lifecycle of phone number assets. It is written from an **architect's lens** — focused on decisions made before a single message is sent, not on campaign authoring or message composition.

Use this skill when:
- Setting up or auditing a Braze SMS/MMS sending environment
- Selecting between short codes, long codes, toll-free numbers, or alphanumeric sender IDs
- Configuring keyword handling (opt-in, opt-out, HELP, and custom keywords)
- Understanding geographic permissions and cross-country sending restrictions
- Ensuring compliance with TCPA, CTIA, GDPR, and other SMS/MMS regulations
- Handling inbound messages from unknown phone numbers
- Diagnosing subscription state issues at the phone number level
- Tracking message usage and capacity against sending limits

**Do not use** this skill for composing message copy, building Canvas/Campaign flows, or A/B testing SMS content — those concerns belong to the engineer or analyst roles.

---

## Topics This Skill Synthesizes

| Topic | Infrastructure Concern |
|-------|------------------------|
| **SMS Setup** | Initial account enablement, workspace configuration, subscription group creation |
| **SMS Terms & Definitions** | Canonical vocabulary: subscription groups, sending numbers, inbound/outbound, opt-in states |
| **SMS Sending Configuration** | Subscription group wiring, message service objects, retry and fallback behavior |
| **Short & Long Codes** | Code type selection, provisioning timelines, carrier approval processes |
| **MMS Short & Long Codes** | MMS-specific capability flags, media handling, account entitlement requirements |
| **Phone Number Capture** | How Braze captures, validates, and stores user phone numbers |
| **User Phone Numbers** | Phone number field precedence, deduplication, profile-level number management |
| **Unknown Phone Numbers Handling** | Inbound message routing for numbers with no matching user profile |
| **Keyword Handling** | Default keywords (STOP/START/HELP), custom keyword triggers, auto-response configuration |
| **Keywords Overview** | Keyword precedence rules, case sensitivity, multi-word keyword behavior |
| **Geographic Permissions** | Country-level allowlists, fraud prevention controls, high-risk country handling |
| **SMS Laws & Regulations** | TCPA, CTIA guidelines, GDPR considerations, carrier filtering rules, quiet hours |
| **Message Usage Tracking** | Segment counting, MMS media size limits, usage dashboards and alerting |

---

## Infrastructure Lens

This skill approaches SMS/MMS through three architectural concerns:

### 1. Provisioning & Number Selection

The choice of sending number type has long-term consequences for deliverability, cost, and compliance:

- **Short codes** (5–6 digits): Highest throughput, requires carrier vetting (4–12 weeks), best for high-volume transactional or marketing sends in the US/CA
- **Long codes / 10DLC** (10-digit): Requires brand and campaign registration with TCR; lower throughput but faster provisioning; standard for most US business messaging post-2023
- **Toll-free numbers**: Middle ground — no carrier vetting, but must be verified; suitable for transactional alerts
- **Alphanumeric sender IDs**: One-way only, no replies; used in markets where 10DLC is unavailable

MMS capability is additive — it must be explicitly purchased and enabled per number, not inherited from SMS access.

### 2. Compliance & Regulatory Architecture

SMS is the most regulated channel in Braze. Key architectural constraints:

- **Opt-in must be explicit and documented** — Braze subscription groups model this; never import a list as opted-in without verifiable consent records
- **STOP/UNSTOP/HELP are reserved** and must be handled by Braze's default keyword processor; custom keywords cannot override these
- **Geographic permissions** act as a hard firewall — if a country is not on the allowlist, sends silently fail; this is intentional fraud prevention, not a bug
- **Carrier filtering** is opaque and content-sensitive; avoid URL shorteners, excessive caps, certain trigger words; Braze does not expose carrier rejection reasons
- **Quiet hours** and **rate limiting** are infrastructure-level guardrails, not campaign settings — configure them at the subscription group level

### 3. Inbound & Lifecycle Management

SMS is bidirectional. Infrastructure must account for the full message lifecycle:

- **Keyword processing order**: Braze evaluates default keywords first, then custom keywords, then routes to Canvas if no match
- **Unknown inbound numbers**: When a message arrives from a number with no Braze user profile, Braze can create an anonymous profile — this behavior must be explicitly configured and monitored
- **Subscription state transitions**: STOP moves a user to `unsubscribed`; START/UNSTOP moves them to `subscribed`; these are carrier-mandated and cannot be suppressed
- **Message usage tracking**: MMS messages count as multiple SMS segments depending on media type and size; monitor usage dashboards to avoid unexpected overages

---

## Key Decision Points

```
Is this a new SMS environment?
  └─ Yes → Start with Short & Long Codes topic to select number type
         → Then SMS Setup for workspace and subscription group config
         → Then SMS Laws & Regulations before any sends

Is inbound messaging required?
  └─ Yes → Configure Keyword Handling (default + custom)
         → Plan Unknown Phone Numbers Handling for new inbound users

Is sending to multiple countries?
  └─ Yes → Review Geographic Permissions allowlist first
         → Each country may require different number types or consent standards

Are MMS media messages needed?
  └─ Yes → Verify MMS entitlement via MMS Short & Long Codes
         → Check media size limits in Message Usage Tracking
```

---

## Common Architectural Mistakes

| Mistake | Consequence | Correct Approach |
|---------|-------------|------------------|
| Using a single subscription group for all SMS programs | Opt-outs from one program suppress all SMS | Create separate subscription groups per program type (marketing vs. transactional) |
| Importing phone numbers without country code prefix | Silent send failures or wrong-number delivery | Always store E.164 format (`+1XXXXXXXXXX`) |
| Treating STOP as suppressible | Carrier penalties, potential legal liability | Never intercept default keywords; let Braze handle them |
| Skipping 10DLC registration and sending on unregistered long codes | Carrier filtering blocks nearly all traffic | Complete TCR brand + campaign registration before any volume send |
| Enabling all countries in geographic permissions | Fraud traffic, unexpected charges | Start with an explicit allowlist; add countries with legal review |
| Assuming MMS is included with SMS purchase | Feature silently unavailable | Verify MMS entitlement in account settings before building MMS flows |

---

## Related Skills

- **SMS Messaging** — for message composition, template design, and campaign configuration (engineer lens)
- **SMS Analytics** — for deliverability metrics, opt-out rates, and performance analysis (analyst lens)
- **Subscription Management** — for user-level opt-in state management across channels

`★ Insight ─────────────────────────────────────`
- The **decision point flowchart** pattern used here is more valuable than exhaustive topic summaries — it tells the invoking agent *which* subtopic to load next based on the actual problem, making the skill an effective router
- Structuring the Common Mistakes table with Mistake → Consequence → Correct Approach is pedagogically stronger than a simple do/don't list because it surfaces *why* the mistake matters, which helps an agent reason about novel situations
- The "Related Skills" section at the bottom creates an explicit graph between skills, which aids multi-skill routing when a query spans infrastructure and content concerns
`─────────────────────────────────────────────────`
