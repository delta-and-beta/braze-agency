---
name: engineer-sms-messaging
description: >-
  Creating and configuring SMS, MMS, and RCS messages including content, links,
  and media.
metadata:
  role: braze-engineer
  topics:
    - sms-create
    - sms-faqs
    - mms-create
    - mms-faqs
    - mms-contact-card
    - sms-mms-rcs-sms
    - sms-mms-rcs-mms
    - sms-mms-rcs-rcs
    - sms-mms-rcs-link-shortening
    - sms-mms-rcs-segments
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Reference skills like this one differ from discipline skills: they optimize for **retrieval** (can Claude find the right information quickly?) rather than **compliance** (will Claude follow the rules?). The structure should mirror how an engineer actually thinks through the task — message type selection → composition → encoding concerns → delivery.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# SMS/MMS/RCS Messaging

## Overview

This skill covers the **implementation of SMS, MMS, and RCS messaging in Braze** — including message creation, content configuration, media attachments, link handling, and segment/billing awareness.

**Core principle:** SMS, MMS, and RCS share a campaign creation workflow but differ in media capabilities, carrier routing, and billing models. Choosing the right channel type and configuring it correctly determines deliverability, cost, and user experience.

Use this skill when building or configuring any text-based mobile messaging in Braze.

## When to Use

- Creating or configuring an SMS, MMS, or RCS campaign
- Adding links, media, or contact cards to messages
- Troubleshooting delivery, segment counts, or character limits
- Enabling link shortening with a custom domain
- Building dynamic content with Liquid in message bodies
- Understanding billing differences between SMS, MMS, and RCS

## Message Types at a Glance

| Type | Media Support | Character Limit | Billing Unit |
|------|--------------|-----------------|--------------|
| SMS | Text only | 160 (GSM-7) / 70 (Unicode) | Per segment |
| MMS | Images, GIFs, audio, video, vCard | Up to 1,600 chars | Per message |
| RCS | Rich cards, carousels, suggested replies | Flexible | Per message |

## Creating an SMS or MMS Message

1. Go to **Messaging > Campaigns > Create Campaign > SMS/MMS**
2. Select a **subscription group** — this determines the sending number pool and region
3. Choose **SMS** or **MMS** as the message type
4. Write the message body — Liquid personalization and Connected Content are supported
5. Enable **Link Shortening** if URLs are included
6. Preview with a seed number before launching

**For MMS:** attach media via the **Media** tab in the composer.

## SMS Segments

SMS billing is charged **per segment**, not per message. Segment boundaries depend on encoding:

| Encoding | Single message | Multi-part (per segment) |
|----------|---------------|--------------------------|
| GSM-7 (standard Latin) | 160 chars | 153 chars |
| Unicode (emoji, non-Latin) | 70 chars | 67 chars |

> Adding a single emoji forces Unicode encoding for the entire message body, dropping the per-segment limit from 160 to 70 characters.

Use Braze's **SMS and RCS Billing Calculator** to preview segment count and cost before sending.

## MMS Configuration

MMS extends SMS with rich media:

- **Supported formats:** JPEG, PNG, GIF, MP4, MP3, vCard (VCF)
- **File size:** Keep images under 1 MB for broad carrier compatibility
- **Contact cards (vCard/VCF):** Send importable business or personal contact info including name, phone, email, photo, company, and URL

Configure contact cards in the MMS composer under the **Media** tab.

## RCS Messaging

RCS delivers app-like experiences over messaging infrastructure:

- **Rich cards:** Image + title + description + CTA button
- **Carousels:** Swipeable card collections
- **Suggested replies:** Tap-to-respond quick reply chips
- **Verified sender branding:** Business name and logo shown instead of raw phone number

RCS billing is **per message** (not per segment). Unsupported devices automatically fall back to SMS.

## Link Shortening

Enable link shortening in the SMS/RCS composer to:

- Track click-through rates per link
- Reduce character count (saves segments on SMS)
- Use a **custom domain** for branded shortened URLs

**To configure:**

1. Toggle **Link Shortening** on in the message composer
2. For a custom domain, go to **Settings > Email Preferences > Link Shortening**
3. All URLs in the message body are shortened automatically at send time

Any valid URL can be included in SMS body text. Avoid bare IP addresses, which trigger carrier spam filters.

## Liquid Personalization

SMS, MMS, and RCS all support the full Liquid template engine:

```liquid
Hi {{ ${first_name} | default: 'there' }}, your order {{ custom_attribute.${order_id} }} has shipped!
Track it: https://track.example.com/{{ custom_attribute.${tracking_number} }}
```

Connected Content is supported for real-time data fetching within message bodies.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Adding emoji without checking segment count | Use the billing calculator before sending |
| Oversized MMS media attachment | Compress images to under 1 MB |
| Link shortening not tracking clicks | Confirm toggle is on; custom domains require workspace setup |
| Wrong subscription group selected | Verify the group maps to the correct sending numbers for target region |
| Hidden Unicode characters from copy-paste | Audit message body with a GSM-7 validator |

## Topics Synthesized

This skill draws from:

- **SMS Overview** — channel fundamentals and use cases
- **Create SMS Message** — step-by-step campaign creation workflow
- **MMS Overview & MMS FAQs** — MMS capabilities and common questions
- **Create MMS Message** — MMS-specific composer configuration
- **MMS Contact Cards** — vCard/VCF attachment workflow
- **SMS Segments** — billing calculator and encoding rules
- **RCS Messaging** — rich messaging channel capabilities
- **Link Shortening** — URL compression, click tracking, and custom domain setup
- **SMS FAQs** — edge cases and clarifications

`★ Insight ─────────────────────────────────────`
The **Quick Reference table** for message types is placed near the top intentionally — when Claude loads this skill, it can skip straight to the table to answer "what channel should I use?" before reading composition details. The **Common Mistakes** section captures tribal knowledge that doesn't appear in API docs (e.g., the single-emoji Unicode encoding trap) which is exactly the kind of non-obvious content that justifies having a skill at all.
`───────────────────────────────────────────────��─`
