---
name: strategist-translations
description: >-
  Manages translations across campaigns, canvases, email templates, and content
  blocks for multi-language messaging.
metadata:
  role: braze-strategist
  topics:
    - endpoints-translations-email-templates
    - endpoints-translations-content-blocks
    - endpoints-translations-canvas
    - endpoints-translations-campaigns
    - endpoints-translations-put-update-template
    - endpoints-translations-get-view-translation-template
    - endpoints-translations-get-view-translation-locale-template
    - endpoints-translations-get-view-source-template
    - endpoints-translations-put-update-translation-campaign
    - endpoints-translations-get-translation-campaign
    - endpoints-translations-get-source-campaign
    - endpoints-translations-put-update-translation-content-block
    - endpoints-translations-get-translation-content-block
    - endpoints-translations-put-update-translation-canvas
    - endpoints-translations-get-translation-canvas
    - ios-advanced-localization
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This is a **reference-type skill** synthesizing 16 topics into a cohesive domain guide — the lens acts as a strategic framing layer, not just a label
- For Braze, all translation endpoints are in **early access/beta**, which matters for strategist guidance: workflows should account for API instability
- The four content types (campaigns, canvases, email templates, content blocks) share a consistent CRUD pattern but have separate permission scopes — grouping by pattern rather than by type aids comprehension
`─────────────────────────────────────────────────`

Here is the skill file body:

---

# Multi-Language & Localization

## Overview

This skill covers Braze's translation management system across all content types. A strategist using this skill thinks in terms of **global reach**: how to systematically scale messaging to multilingual audiences by managing translation state, locale coverage, and content lifecycle consistently across campaigns, canvases, email templates, and content blocks.

> **Beta status:** All translation API endpoints are in early access / beta. Anticipate instability and verify endpoint availability with the Braze team before building production workflows on them.

---

## When to Use This Skill

Use this skill when:

- Planning or executing a multilingual messaging strategy in Braze
- Auditing translation coverage across campaigns, canvases, or templates
- Integrating Braze translation APIs into a localization workflow or TMS
- Debugging locale gaps, source content drift, or translation sync issues
- Configuring iOS SDK localized strings for in-app UI

**Do not use** for general content strategy questions unrelated to language variants or locale management.

---

## Lens: Global Reach Through Systematic Localization

A Braze strategist approaches localization not as a translation task but as a **content governance problem**: ensuring every message variant, in every locale, reflects the correct source at the right time. This means:

- **Tracking source drift** — when source content changes, translations become stale
- **Maintaining locale parity** — all active locales should have translation coverage before launch
- **Orchestrating across content types** — campaigns, canvases, email templates, and content blocks each have their own translation lifecycle
- **Respecting draft state** — canvases that have launched require saving as a draft before translations can be updated via API

---

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| **iOS SDK Localization** | Built-in SDK string overrides for default UI messages (e.g., network error strings); override via Localizable.strings |
| **Campaigns — Overview** | Conceptual model for managing translations within campaign message variants |
| **Campaigns — GET Translations** | Retrieve all translations for each message variant in a campaign (`campaigns.translations.get`) |
| **Campaigns — GET Source** | Retrieve default source values from `{% translation %}` tags in campaign content |
| **Campaigns — PUT Update** | Update one or more translations for a campaign variant (`campaigns.translations.put`) |
| **Canvas — Overview** | Conceptual model for managing translations within Canvas steps |
| **Canvas — GET Translations** | Preview a translated message for a Canvas step (`canvas.translations.get`) |
| **Canvas — PUT Update** | Update multiple translations for a Canvas step; draft required for live canvases |
| **Email Templates — Overview** | Conceptual model for managing translations within email templates |
| **Email Templates — GET Translations** | View all translations and locales for an email template (`templates.translations.get`) |
| **Email Templates — GET Locale** | View a specific locale's translation for an email template |
| **Email Templates — GET Source** | Retrieve source translations for an email template (`templates.email.info`) |
| **Email Templates — PUT Update** | Update translations for an email template (`templates.email.update`) |
| **Content Blocks — Overview** | Conceptual model for managing translations within content blocks |
| **Content Blocks — GET Translations** | Retrieve all translations for a content block, with optional locale filter (`content_blocks.translations.get`) |
| **Content Blocks — PUT Update** | Update multiple translations for a content block (`content_blocks.translations.put`) |

---

## API Pattern Reference

All translation endpoints share a consistent pattern. Use this as a quick reference:

| Content Type | GET All Translations | GET Source | PUT Update |
|---|---|---|---|
| Campaign | `GET /campaigns/translations` | `GET /campaigns/translations` (source flag) | `PUT /campaigns/translations` |
| Canvas | `GET /canvas/translations` | — | `PUT /canvas/translations` |
| Email Template | `GET /templates/email/translations/` | `GET /templates/email/translations/source` | `PUT /templates/email/translations/` |
| Content Block | `GET /content_blocks/translations` | — | `PUT /content_blocks/translations` |

**Permission naming pattern:** `{resource}.translations.get` / `{resource}.translations.put`

**Rate limit:** Translation endpoints share a dedicated rate limit tier — check with Braze for current limits before batch operations.

---

## Common Workflow: Audit → Update → Verify

```
1. GET source — identify authoritative source strings
2. GET translations — compare locale coverage against source
3. Identify gaps (missing locales, stale translations)
4. PUT update — submit updated translations per locale
5. GET translations — verify update was applied correctly
```

For **canvases that are live**: save as draft before step 4, or the PUT will be rejected.

---

## iOS SDK Localization

The iOS SDK ships with default UI strings (e.g., "Cannot establish network connection. Please try again later."). These can be overridden per locale using a standard `Localizable.strings` file. This is separate from the API-based translation system and applies only to SDK-rendered UI surfaces, not to message content.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| PUTting translations to a live Canvas without drafting | API rejects the update | Save Canvas as draft first |
| Using wrong permission scope | 403 errors on translation endpoints | Match `{resource}.translations.get/put` exactly |
| Treating beta endpoints as stable | Breakage without notice | Pin API version, monitor changelog |
| Assuming Content Blocks translations propagate instantly | Stale content in live messages | Verify propagation before campaign launch |
| Skipping source GET before PUT | Overwriting translations with misaligned source | Always fetch source before updating |

---

## Related Concepts

- **`{% translation id %}` tags** — Liquid-style tags that mark translatable content within message bodies; the source GET endpoints extract values from these
- **Locale codes** — Braze uses IETF BCP 47 format (e.g., `en-US`, `fr-FR`); verify locale identifiers match exactly between your TMS and Braze
- **Draft state** — Canvas translation updates require draft mode; this is a Braze-specific constraint with no equivalent in campaign or template workflows

`★ Insight ─────────────────────────────────────`
- The **lens framing** ("global reach through systematic localization") shapes which API details get prominence — source drift and locale parity matter more to a strategist than raw endpoint syntax
- Grouping by **workflow stage** (audit → update → verify) rather than by content type helps Claude apply this skill to real tasks, not just answer API reference questions
- The iOS SDK localization topic sits apart from the rest — it's device-side, not API-side — so isolating it prevents confusion between the two translation systems
`─────────────────────────────────────────────────`
