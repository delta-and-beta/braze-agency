---
name: strategist-iam-campaigns
description: >-
  Designs in-app message campaign strategies using templates, onboarding flows,
  and promotional patterns.
metadata:
  role: braze-strategist
  topics:
    - in-app_messages-drag_and_drop-templates
    - in-app_messages-drag_and_drop-templates-seasonal_promo
    - in-app_messages-drag_and_drop-templates-product_announcement
    - in-app_messages-drag_and_drop-templates-onboarding
    - in-app_messages-drag_and_drop-templates-email_capture
    - in-app_messages-drag_and_drop-templates-email_confirmation_page
    - in-app_messages-drag_and_drop-templates-email_discount
    - in-app_messages-drag_and_drop-templates-email_image
    - in-app_messages-drag_and_drop-templates-email_offer
    - in-app_messages-drag_and_drop-templates-phone_number_capture
    - in-app_messages-drag_and_drop-create
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill file is a **reference skill** (not discipline-enforcing), so the goal is to optimize for *retrieval* — helping a future Claude instance quickly identify the right template and customize it for the goal at hand. The key structure is a decision table mapping campaign goals to templates, which is faster to scan than prose.
`─────────────────────────────────────────────────`

```markdown
# In-App Message Campaigns

## Overview

This skill guides selection and customization of Braze in-app message templates to meet engagement and conversion goals. The drag-and-drop editor provides a library of purpose-built templates — choose the one that matches the campaign intent, then customize content, targeting, and behavior.

**Core principle:** Template selection should be driven by the conversion goal first, then brand requirements. Each template is pre-structured for a specific user action (subscribe, sign up, explore, onboard) — fighting that structure wastes effort.

## When to Use This Skill

Use when:
- Designing a new in-app message campaign in Braze
- Selecting between available drag-and-drop templates
- Customizing a template for a specific engagement or conversion goal
- Building onboarding flows, promotional offers, or subscription capture within an app
- Advising on which template type fits a campaign brief

Do not use for:
- Custom HTML in-app messages (different editor path)
- Push notification or email campaign strategy
- Canvas multi-step flow architecture (though IAM templates can appear within Canvas)

## Template Selection by Goal

| Campaign Goal | Recommended Template | Key Differentiator |
|---|---|---|
| Grow email list (brand-forward) | Email sign-up with background image | Visual brand expression, minimal form friction |
| Grow email list + incentivize | Email sign-up with discount | Discount code drives immediate sign-up motivation |
| Grow email list + special offer | Email sign-up with special offer | Soft offer framing vs. hard discount |
| Confirm subscription / double opt-in | Email sign-up with confirmation page | Two-screen flow with explicit confirmation step |
| Capture phone for SMS/RCS/WhatsApp | SMS, RCS, and WhatsApp sign-up form | Legal compliance copy, channel-specific consent |
| New user onboarding | Onboarding flow | Multi-step, collects attributes/preferences |
| Announce new product | Product announcement | Awareness-first layout, minimal CTA friction |
| Seasonal promotion | Seasonal promotion with background image | High-impact visual, urgency-ready structure |

## Template Anatomy & Customization Lens

Every drag-and-drop template shares a common structure. Customize in this order:

1. **Background** — image or color that sets the brand tone (most impactful for seasonal and email image templates)
2. **Headline** — lead with the user benefit, not the brand action
3. **Body copy** — keep short; templates are designed for 1–2 lines
4. **CTA button** — label should complete the sentence "I want to…" (e.g., "Claim My Discount", not "Submit")
5. **Form fields** — only ask for what you'll use; fewer fields = higher completion
6. **Dismiss behavior** — decide whether to allow passive dismiss; suppress for high-intent moments

## Template-Specific Notes

### Email Capture Templates
Four variants exist on a spectrum of incentive strength:

```
No incentive                                    Strong incentive
    │                                                  │
[Background Image] → [Special Offer] → [Discount] → [Confirmation Page variant]
```

Match incentive strength to the value of the email address in that context. Overusing discounts trains users to wait for offers.

### Onboarding Flow
The only multi-screen template. Use it to:
- Collect user attributes (preferences, use case) that personalize future messaging
- Gate app feature discovery behind profile completion
- Set expectations for notification frequency and content

Sequence tip: put the lowest-friction question first to establish momentum before asking for more sensitive preferences.

### Phone Number Capture (SMS/RCS/WhatsApp)
Regulatory requirements vary by region. This template includes consent language placeholders — **do not remove legal copy**. Verify that consent language matches the target region's requirements (TCPA, GDPR, etc.) before launch.

### Product Announcement
Optimized for awareness, not conversion. Avoid adding form fields — they conflict with the template's single-CTA structure. If conversion is needed, sequence a follow-up campaign rather than complicating this template.

### Seasonal Promotion
High-impact visual template. Works best when:
- The background image communicates the season/offer without relying on text
- A clear expiry date or urgency signal is included in the headline
- The CTA links directly to the promoted product or category

## SDK Requirements

All drag-and-drop in-app message templates require a minimum SDK version. Before deploying:
- Check SDK version requirements in the Braze documentation for the specific template
- Older SDK versions may fall back to a simplified rendering or suppress the message entirely
- Verify against the app's deployed SDK version before scheduling

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using discount template when no discount exists | Use "special offer" or "background image" variant instead |
| Adding form fields to product announcement template | Use a separate email capture campaign; keep announcement single-CTA |
| Not testing dismiss behavior | Always QA passive dismiss on the target device type |
| Omitting consent copy from phone capture template | Legal copy is required; customize wording, do not delete |
| One-size-fits-all incentive (always discount) | Match incentive to acquisition context; overuse devalues the offer |
| Ignoring SDK minimum version | Test against the app's actual SDK version before launch |

## Topics Synthesized

This skill draws on the following reference topics:

- **Create Drag-and-Drop Message** — editor mechanics and campaign/Canvas entry points
- **In-App Message Templates Overview** — template library navigation and availability
- **Seasonal Promo Template** — background image layout for time-limited offers
- **Product Announcement Template** — awareness-first single-CTA structure
- **Phone Number Capture Template** — SMS/RCS/WhatsApp consent form with legal requirements
- **Onboarding Template** — multi-step attribute collection flow
- **Email Offer Template** — email sign-up with soft offer incentive
- **Email Image Template** — brand-forward sign-up with background image
- **Email Discount Template** — hard discount incentive for sign-up conversion
- **Email Confirmation Page Template** — two-screen sign-up with explicit confirmation step
- **Email Capture Template** — base email sign-up form pattern
```

`★ Insight ─────────────────────────────────────`
A few structural choices worth noting:
- The **template selection table** is the core of this skill — it collapses 11 topics into a single scannable decision surface, which is how a strategist actually reasons about template choice.
- The **incentive spectrum diagram** for email capture templates encodes a non-obvious relationship (the four variants form a continuum) that would be easy to miss when reading the topics individually.
- The **SDK requirements section** appears as a standalone block rather than inside each template note — this is a common gotcha that cuts across all templates and deserves consistent visibility.
`─────────────────────────────────────────────────`
