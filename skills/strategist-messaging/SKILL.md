---
name: strategist-messaging
description: >-
  Campaign and Canvas design fundamentals including delivery types,
  reeligibility, localization, approvals, and accessibility best practices.
metadata:
  role: braze-strategist
  topics:
    - engagement-tools-messaging-fundamentals-delivery-types
    - engagement-tools-messaging-fundamentals-targeting-users
    - engagement-tools-messaging-fundamentals-reeligibility
    - engagement-tools-messaging-fundamentals-localization
    - >-
      engagement-tools-messaging-fundamentals-localization-right-to-left-messages
    - engagement-tools-messaging-fundamentals-know-before-send
    - engagement-tools-messaging-fundamentals-approvals
    - engagement-tools-messaging-fundamentals-accessibility
    - engagement-tools-messaging-fundamentals-about-statuses
    - engagement-tools-messaging-fundamentals-conversion-events
    - engagement-tools-messaging-fundamentals-archiving
    - engagement-tools-messaging-fundamentals-duplicating
    - engagement-tools-messaging-fundamentals-product-blocks
    - engagement-tools-messaging-fundamentals-drag-and-drop-editor-blocks
    - get-started-campaigns-and-canvases
    - message-building-by-channel-push-best-practices
    - message-building-by-channel-content-cards-best-practices
    - message-building-by-channel-content-cards-best-practices-know-before-send
    - email-post-remove-spam
    - email-post-remove-hard-bounces
    - email-post-email-subscription-status
    - email-get-query-unsubscribed-email-addresses
    - email-get-list-hard-bounces
    - sms-post-remove-invalid-numbers
    - endpoints-email
    - endpoints-sms
    - endpoints-preference-center
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The skill body is written for **another Claude instance** to consume — so imperative/infinitive form ("Configure X", "Use Y") outperforms second-person ("You should...") because it reads as instruction rather than advice
- Progressive disclosure matters: this SKILL.md stays lean and points to reference files; Claude loads those topic files on demand rather than dumping everything into context at once
- The "lens" framing (campaign orchestration) is the most important paragraph — it tells Claude *how* to interpret the reference material, not just *what* it contains
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Messaging Strategy & Fundamentals

## Purpose

Apply this skill when planning, configuring, reviewing, or troubleshooting Braze campaigns and Canvases from a **strategist's perspective**. The focus is on orchestration decisions — delivery type selection, audience targeting, reeligibility design, localization strategy, accessibility compliance, and pre-launch readiness — rather than on technical implementation or SDK integration.

Use this skill to answer questions like:
- "Which delivery type should I use for this campaign?"
- "How do I set up reeligibility for a drip sequence?"
- "What do I need to check before launching?"
- "How do I handle right-to-left languages in my messages?"
- "What approval workflow should we use before sending?"

---

## Lens: Campaign Orchestration & User Journey Optimization

Approach all topics through the lens of **campaign orchestration, messaging best practices, and user journey optimization**. This means:

- Prioritize user experience and message relevance over ease of setup
- Evaluate delivery and targeting decisions in the context of the full user journey
- Treat each campaign or Canvas as a node in a larger engagement strategy, not an isolated send
- Apply reeligibility, conversion events, and status management as levers for journey control
- Flag accessibility and localization gaps as launch blockers, not post-launch polish

When answering questions, reason from outcomes first: what should the user experience, and then work backward to the configuration.

---

## Scope

This skill synthesizes knowledge across the following topic areas. Consult the corresponding reference files for authoritative detail.

### Campaign & Canvas Fundamentals
| Topic | Reference File | Key Concepts |
|---|---|---|
| Delivery Types | `references/delivery-types.md` | Scheduled, Action-Based, API-Triggered |
| Campaign & Canvas Statuses | `references/campaign-statuses.md` | Active, Draft, Archived, Stopped |
| Duplicating Campaigns | `references/duplicating-campaigns.md` | Reuse, draft state, naming conventions |
| Archiving Campaigns | `references/archiving-campaigns.md` | Archive vs. stop, data retention |
| Conversion Events | `references/conversion-events.md` | Primary/secondary events, attribution windows |

### Audience & Targeting
| Topic | Reference File | Key Concepts |
|---|---|---|
| Targeting Users | `references/targeting-users.md` | Segments, filters, test users |
| Message Reeligibility | `references/message-reeligibility.md` | Default behavior, campaign vs. Canvas settings |

### Content Authoring
| Topic | Reference File | Key Concepts |
|---|---|---|
| Drag-and-Drop Editor Blocks | `references/drag-and-drop-editor-blocks.md` | Block types, layout, mobile rendering |
| Product Blocks | `references/product-blocks.md` | eCommerce blocks, early access requirements |
| Localization | `references/localization.md` | Locale targeting, translation workflow, Liquid |
| Right-to-Left Messages | `references/right-to-left-messages.md` | RTL rendering, OS-controlled display, preview caveats |
| Message Accessibility | `references/message-accessibility.md` | Alt text, color contrast, screen reader support |

### Governance & Launch Readiness
| Topic | Reference File | Key Concepts |
|---|---|---|
| Know Before You Send | `references/know-before-you-send.md` | Pre-launch checklist (general + channel-specific) |
| Message Approvals | `references/message-approvals.md` | Approval workflow, required sections, permissions |

### Channel-Specific Best Practices
| Topic | Reference File | Key Concepts |
|---|---|---|
| Push Best Practices | `references/push-best-practices.md` | Frequency, opt-in, content guidelines |
| Content Cards Best Practices | `references/content-cards-best-practices.md` | Placement, expiration, feed design |
| Content Cards Know Before Send | `references/content-cards-know-before-send.md` | Pre-send checklist for Content Cards |

### Email & SMS Management (API)
| Topic | Reference File | Key Concepts |
|---|---|---|
| Email Endpoints Overview | `references/email-endpoints-overview.md` | Template management endpoints |
| Change Email Subscription Status | `references/change-email-subscription-status.md` | `POST /email/status` |
| Query Unsubscribed Email Addresses | `references/query-unsubscribed-email-addresses.md` | `GET /email/unsubscribes` |
| List Hard Bounced Emails | `references/list-hard-bounced-emails.md` | `GET /email/hard_bounces` |
| Remove Hard Bounced Emails | `references/remove-hard-bounced-emails.md` | `POST /email/bounce/remove` |
| Remove Email from Spam List | `references/remove-email-from-spam-list.md` | `POST /email/spam/remove` |
| SMS Endpoints Overview | `references/sms-endpoints-overview.md` | SMS management endpoints |
| Remove Invalid SMS Numbers | `references/remove-invalid-sms-numbers.md` | `POST /sms/invalid_phone_numbers/remove` |
| Preference Center Endpoints | `references/preference-center-endpoints-overview.md` | `PUT /preference_center/v1/{id}` |

---

## Key Workflows

### Selecting a Delivery Type

Consult `references/delivery-types.md`. Use this decision heuristic:

- **Scheduled** → time-based sends, newsletters, one-off announcements
- **Action-Based** → behavioral triggers (app event, purchase, API event)
- **API-Triggered** → external system initiates send; Braze handles personalization and delivery

Canvas entry types follow the same pattern. Scheduled and action-based Canvas entries also support audience re-entry — see `references/message-reeligibility.md`.

### Pre-Launch Review

Before approving any campaign or Canvas for send, verify against the checklist in `references/know-before-you-send.md`. Pay particular attention to:

1. Rate limits and batch size for API-triggered sends
2. Conversion event attribution windows relative to send frequency
3. Localization completeness — missing translations default to the fallback locale
4. Accessibility: alt text on images, sufficient color contrast, screen-reader-friendly copy

If the workspace has approvals enabled (`references/message-approvals.md`), confirm all required sections are approved before the launch window.

### Reeligibility Design

Default Braze behavior sends each message once per user. To allow repeat sends, configure reeligibility explicitly. Consult `references/message-reeligibility.md` for:

- Campaign-level reeligibility settings and timing
- Canvas re-entry rules (allow re-entry, re-entry interval)
- How reeligibility interacts with frequency capping and Global Control Groups

### Localization

Consult `references/localization.md` for the full workflow. Key principles:

- Use Liquid (`{{${language}}}`) for inline locale branching when variant count is low
- Use the Braze localization feature (Translations tab) for high-locale-count campaigns
- Always define a fallback locale to prevent blank message delivery
- Test RTL locales separately — dashboard previews do not reliably reflect OS-level RTL rendering (see `references/right-to-left-messages.md`)

### Accessibility Review

Consult `references/message-accessibility.md`. Minimum requirements before launch:

- All images have meaningful alt text (or `alt=""` for decorative images)
- Text-to-background color contrast meets WCAG AA (4.5:1 for body text)
- Email templates avoid layout tables that break screen reader reading order
- Push notifications avoid truncation of critical information in the first 90 characters

---

## When This Skill Does Not Apply

- **SDK integration, event tracking, or data ingestion** → defer to the `braze-engineer` skill set
- **Segment or audience *construction*** (writing filter logic, custom attribute schemas) → defer to data/engineering roles
- **Analytics and reporting** → defer to the analytics skill
- **Liquid templating syntax** → defer to the personalization or content skill

---

## Additional Resources

All topic detail lives in `references/`. Load the relevant reference file when a question requires authoritative specifics on any topic listed in the Scope table above. For pre-launch readiness, always start with `references/know-before-you-send.md` as the canonical checklist.

---

`★ Insight ─────────────────────────────────────`
- The **scope table** doubles as a quick routing index — when Claude sees a question about reeligibility, it knows exactly which reference file to load without scanning everything
- Placing a **"When This Skill Does Not Apply"** section is a key design pattern for multi-agent plugins: it prevents the braze-strategist from overreaching into engineer or analyst territory, keeping agent boundaries clean
- The **key workflows** section encodes the *reasoning patterns* Claude should apply, not just raw facts — this is what makes skill files more than reference dumps
`─────────────────────────────────────────────────`
