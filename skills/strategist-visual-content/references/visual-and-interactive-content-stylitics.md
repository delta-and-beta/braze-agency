---
name: visual-and-interactive-content-stylitics
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/stylitics
indexed_at: '2026-04-05'
keywords:
  - bundles
  - integration
  - API
  - template
  - personalization
  - triggered
  - SFTP
  - fallback
  - analytics
  - recommendation
triggers:
  - add bundles to triggered email
  - set up Stylitics API
  - configure email bundle fallbacks
  - measure bundle performance
  - integrate bundle data in email template
---
## Stylitics Visual Content

Stylitics is a cloud-based SaaS platform for automating and distributing visual content (product bundles) at scale. The Braze integration enriches triggered email campaigns with personalized bundle content to increase AOV and conversion.

**Maintained by Stylitics.**

---

## Use Cases

Common triggered email programs:
- Abandoned cart / abandoned browse
- Shipping confirmation
- Post-purchase

---

## Integration Overview

Stylitics provides **bundle data only** — they cannot alter email layout or design. Your ESP handles template position and customization.

**Flow:**
1. ESP integrates bundle data into email template
2. ESP updates trigger email code to include Stylitics content
3. ESP tests, previews, and launches the triggered series

---

## Data Exchange Approaches

### 1. API Approach (Recommended)

Make an API call per item to populate bundle data. Stylitics API is ready to use immediately.

> **A/B Testing Note:** If running a Stylitics-run A/B test, append `styliticsCID` and `styliticsoverride` params to PDP URLs for clicked items:
> ```
> &styliticsoverride=001?styliticsCID=email[clientname]
> ```

### 2. Flat File Approach

Stylitics flattens bundle data into CSV, TXT, or XML, delivered daily.

- **Setup time:** 2–3 weeks
- **Delivery:** Stylitics SFTP drop (or provide your SFTP credentials)
- **Timing:** Morning daily drop (specify if you need a specific time)
- **File key:** Agree on item data string (SKU, `item_group_id`, or `item_number`)

### 3. Website Data Extraction

Vendors scrape your site front-end for Stylitics content. No additional Stylitics work required.

---

## Email Template Best Practices

- Display **2–4 bundles** for the most expensive/first full-price item the user bought or browsed
- Call multiple `item_numbers` and show the first few bundle responses
- **Always implement fallbacks** when no bundles are available:
  - Hide the Stylitics bundle section, OR
  - Show bundles for the next item the user viewed
- Display bundle images + product titles + thumbnail images for clear click-through

> **Important:** Stylitics widget JavaScript **cannot** be inserted into emails — emails do not support JavaScript.

---

## Analytics

Stylitics requests an open data share to measure lift. Provide these metrics when possible:
- Emails sent / opened
- Views and engagements
- Click-through rate
- Add to bag events
- Purchases

---

## Setup Checklist

1. Decide which email programs to use
2. Connect Stylitics with your ESP to decide API vs. flat file approach
3. Create mockups with your ESP
4. Align on analytics sharing
5. Agree on launch timeline

Contact your Stylitics account manager to coordinate.
