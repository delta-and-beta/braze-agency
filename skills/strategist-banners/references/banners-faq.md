---
name: banners-faq
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/banners/faq
indexed_at: '2026-04-05'
keywords:
  - banners
  - targeting
  - eligibility
  - personalization
  - analytics
  - impressions
  - rendering
  - SDK
  - caching
  - placement
triggers:
  - how to target banners
  - banner personalization and liquid
  - banner analytics and impressions
  - banner display and caching
  - banner eligibility and re-eligibility
---
# Banners FAQ

## Overview

This topic covers frequently asked questions about Braze Banners — a persistent, non-interruptive in-app content surface.

---

## Source Note

The original documentation for this topic uses a Jekyll template include:

```liquid
{% multi_lang_include banners/faq.md section="user" %}
```

This means the actual FAQ content is stored in a shared partial file (`banners/faq.md`, `section="user"`) and was not expanded in the source provided. The rendered content could not be extracted.

---

## What to Expect in This FAQ

Based on the Braze Banners feature area, a fully rendered version of this topic would typically cover:

- **Eligibility and targeting** — Which users see which banners, re-eligibility rules, and audience filtering
- **Display behavior** — How banners are fetched, cached, and rendered in the app
- **Personalization** — Using Liquid, connected content, or catalog data inside banners
- **Analytics** — Impression tracking, click attribution, and reporting limitations
- **SDK requirements** — Minimum SDK versions and initialization steps
- **Conflict resolution** — Behavior when multiple banners target the same placement

---

## Action Required

To generate a complete topic file, provide the rendered/expanded content from `banners/faq.md` with `section="user"`. This can typically be obtained by:

1. Running the Jekyll site locally and viewing the rendered output
2. Reading the raw partial file at `_includes/banners/faq.md` directly
3. Copying the rendered HTML/markdown from the published docs page
