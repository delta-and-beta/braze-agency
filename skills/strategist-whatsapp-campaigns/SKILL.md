---
name: strategist-whatsapp-campaigns
description: >-
  Designs WhatsApp campaign flows, templates, retargeting strategies, and
  delivery optimization.
metadata:
  role: braze-strategist
  topics:
    - whatsapp-whatsapp_campaign
    - whatsapp-whatsapp_campaign-create
    - whatsapp-whatsapp_campaign-template_builder
    - whatsapp-whatsapp_campaign-template_builder-whatsapp_carousel_templates
    - whatsapp-whatsapp_campaign-whatsapp_flows
    - whatsapp-whatsapp_campaign-user_retargeting
    - whatsapp-whatsapp_campaign-product_messages
    - whatsapp-whatsapp_campaign-optimized_delivery
    - whatsapp-whatsapp_campaign-custom_domains
    - whatsapp-whatsapp_campaign-click_tracking
    - whatsapp-whatsapp_best_practices
    - whatsapp-whatsapp_use_cases
    - whatsapp-whatsapp_use_cases-external_system
    - whatsapp-whatsapp_use_cases-ads_that_click
    - whatsapp-message_processing-opt-ins_and_opt-outs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files follow a **progressive disclosure** pattern: the SKILL.md body is a lean ~1,500–2,000 word "index" that tells Claude *what* topics exist and *when* to consult them — the heavy detail lives in `references/*.md`. This keeps context usage efficient: the skill triggers and loads only what's needed.
`─────────────────────────────────────────────────`

# WhatsApp Campaign Strategy

## Purpose

This skill covers the full lifecycle of WhatsApp campaign design in Braze — from initial campaign creation and template authoring through interactive flows, retargeting, product messaging, and delivery optimization. Apply this skill when planning a WhatsApp campaign strategy, troubleshooting delivery or opt-in issues, or advising on how to structure templates and targeting for a specific use case.

**Lens:** Design high-performing WhatsApp campaigns with optimal templates and targeting — maximizing engagement while respecting Meta's platform policies, phone quality ratings, and opt-in requirements.

---

## Scope

This skill synthesizes knowledge across the following topic areas:

| Topic | What it covers |
|---|---|
| **Campaign Overview** | Channel capabilities, prerequisites, architecture of a WhatsApp campaign in Braze |
| **Create WhatsApp Campaign** | Step-by-step campaign setup, Liquid personalization, scheduling, and launch |
| **Template Builder** | Meta-approved message template types, variable mapping, and submission workflow |
| **Carousel Templates** | Multi-card interactive messages (up to 10 cards), image/video cards, button types |
| **WhatsApp Flows** | Multi-page in-chat forms, flow creation, navigation logic, and response handling |
| **User Retargeting** | Filtering by message receipt, read status, button click, and engagement history |
| **Product Messages** | Meta catalog integration, browse-to-cart flows, and order redirect patterns |
| **Optimized Delivery** | Meta's Marketing Messages API (MM API), engagement-based routing, and send-time optimization |
| **Custom Domains** | Link domain configuration for WhatsApp link tracking |
| **Click Tracking** | Tracking button interactions and link clicks within WhatsApp messages |
| **Best Practices** | Phone quality rating management, avoiding blocks and reports, compliance patterns |
| **Use Cases** | Campaign archetypes: transactional, promotional, conversational, acquisition |
| **External System Integration** | Bidirectional webhook + API-triggered flows for chatbot and live agent handoffs |
| **Ads That Click to WhatsApp** | Meta ad acquisition flows that open WhatsApp conversations |
| **Opt-ins and Opt-outs** | Consent collection, subscription group management, and opt-out handling |

---

## When to Apply This Skill

Apply this skill when the query involves:

- **Campaign creation**: Setting up a new WhatsApp campaign, configuring templates, choosing message types
- **Template strategy**: Deciding between utility, marketing, and authentication template categories; structuring variables; getting Meta approval
- **Interactive experiences**: Building carousels, flows (multi-step forms), or product catalog messages
- **Audience targeting**: Retargeting users based on prior WhatsApp engagement; building segments from subscription groups
- **Delivery optimization**: Choosing between standard and optimized (MM API) delivery; maximizing open rates
- **Acquisition**: Designing "Ads That Click to WhatsApp" funnels; onboarding users from ad to conversation
- **Compliance and quality**: Maintaining phone quality rating, structuring opt-in/opt-out flows, avoiding policy violations
- **System integrations**: Connecting Braze WhatsApp to external chatbots, live agents, or AI systems

---

## Core Design Principles

### 1. Template Category Determines Delivery Rules

WhatsApp templates fall into three Meta-defined categories — **utility**, **marketing**, and **authentication**. Category selection affects deliverability, opt-in requirements, and cost. Marketing templates require explicit opt-in; utility templates have more lenient opt-in rules. Always confirm category before building template content.

### 2. Opt-in First

WhatsApp opt-in is a hard requirement. Before sending any marketing message, verify the user is subscribed to the relevant Braze subscription group. Use the opt-in and opt-out topic to design consent collection flows that survive edge cases (double opt-in, re-consent after opt-out, import from external CRM).

### 3. Phone Quality Rating Is a Campaign Asset

Meta rates business phone numbers based on user reactions — blocks and spam reports lower the rating. A degraded rating reduces send limits and can permanently limit the channel. Campaign strategy should factor in message frequency, relevance, and easy opt-out access to protect quality rating. Consult the best practices topic before launching high-volume sends.

### 4. Match Message Type to Intent

| Intent | Recommended Type |
|---|---|
| Transactional / status update | Utility template |
| Promotional / announcement | Marketing template |
| Product discovery / purchase | Product message (catalog) |
| Multi-step data collection | WhatsApp Flow |
| Visual storytelling / comparison | Carousel template |
| Re-engaging lapsed users | Retargeting filter + optimized delivery |

### 5. Personalization via Liquid

WhatsApp templates support Liquid in variable fields. Use connected content calls, custom attributes, and event properties to populate dynamic values. Keep fallback values for all variables — Meta rejects messages with empty template variables at send time.

---

## Campaign Creation Checklist

Before launching a WhatsApp campaign, confirm:

- [ ] WhatsApp Business Account connected and phone number approved in Braze
- [ ] Message template submitted to Meta and approved (status: `APPROVED`)
- [ ] Target segment includes only users with active WhatsApp subscription group opt-in
- [ ] Liquid variables have fallback values
- [ ] Opt-out mechanism present (button or keyword instruction)
- [ ] Delivery method selected (standard vs. optimized/MM API)
- [ ] Click tracking configured if measuring CTA performance
- [ ] Phone quality rating checked before large-volume send

---

## Retargeting Strategy

Braze records WhatsApp interactions on user profiles, enabling retargeting filters based on:

- **Message received** (delivery confirmed)
- **Message read** (read receipt enabled)
- **Button clicked** (specific CTA)
- **Sent in campaign/Canvas step** (for suppression or re-engagement)

Use these filters in Canvas entry criteria or segment filters to build re-engagement flows. Common patterns:

- Send a follow-up only to users who received but did not read
- Escalate to a different channel (push, email) for users who never read
- Re-engage users who clicked a product CTA but did not convert

---

## Optimized Delivery Decision

Use Meta's MM API (optimized delivery) when:

- Campaign is marketing category (not utility/auth)
- Engagement-based send-time optimization is desired
- The audience has demonstrated prior engagement with the phone number

Avoid MM API for time-sensitive transactional messages — standard delivery gives more predictable timing control.

---

## External System Integration Pattern

For chatbot or live agent handoff scenarios, the standard architecture is:

1. Braze sends an API-triggered WhatsApp campaign
2. Inbound user reply triggers a Braze webhook to the external system
3. External system processes reply and calls Braze API to send follow-up message or update user profile
4. Handoff to live agent updates a custom attribute to suppress further automated messages

Consult the external system integration topic for the full webhook + API-trigger configuration.

---

## Additional Reference Topics

For detailed implementation guidance, load the corresponding reference file:

- **`references/whatsapp-campaign-overview.md`** — Channel prerequisites, account setup, campaign architecture
- **`references/create-whatsapp-campaign.md`** — Step-by-step campaign creation with Liquid examples
- **`references/whatsapp-template-builder.md`** — Template types, variable syntax, Meta submission
- **`references/whatsapp-carousel-templates.md`** — Carousel structure, card limits, button configuration
- **`references/whatsapp-flows.md`** — Flow builder, multi-page navigation, response capture
- **`references/whatsapp-user-retargeting.md`** — Engagement filters, retargeting segment recipes
- **`references/whatsapp-product-messages.md`** — Catalog integration, cart and order flows
- **`references/whatsapp-optimized-delivery.md`** — MM API setup, engagement routing, timing guidance
- **`references/whatsapp-click-tracking.md`** — CTA tracking, link click measurement
- **`references/whatsapp-best-practices.md`** — Quality rating, frequency caps, compliance patterns
- **`references/whatsapp-use-cases.md`** — Campaign archetypes with example configurations
- **`references/whatsapp-external-system-integration.md`** — Webhook + API-trigger architecture
- **`references/whatsapp-ads-that-click.md`** — Meta ad acquisition to WhatsApp conversation funnels
- **`references/whatsapp-opt-ins-and-opt-outs.md`** — Consent collection, subscription group management

`★ Insight ─────────────────────────────────────`
The **decision table** (Match Message Type to Intent) and the **campaign creation checklist** are the highest-leverage additions in this skill — they translate raw topic knowledge into actionable guidance Claude can follow without needing to load every reference file. Structured decision points like these reduce back-and-forth and surface the right reference file at the right moment.
`─────────────────────────────────────────────────`
