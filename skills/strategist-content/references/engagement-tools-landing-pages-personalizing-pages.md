---
name: engagement-tools-landing-pages-personalizing-pages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/personalizing_pages
indexed_at: '2026-04-05'
keywords:
  - Liquid
  - personalization
  - profiles
  - rendering
  - fallback
  - limits
  - preview
  - anonymous
  - identified
  - variables
triggers:
  - how to personalize landing pages
  - insert Liquid into landing pages
  - preview landing page personalization
  - avoid Liquid size limits
  - fix unpublished pages
---
## Personalizing Landing Pages

Liquid personalization lets you dynamically tailor landing page content using user profile data (e.g., personalized headlines) without managing multiple static pages.

**Tier requirement:** Pro tier only. Connected Content, multi-language support, and promotion codes are **not supported** with Liquid personalization.

### Inserting Liquid

In the drag-and-drop editor, insert Liquid in both the editor canvas and the right-hand panel (page/block settings).

### Preview Modes

| Context | Available preview modes |
|---|---|
| In-editor preview | Random user, existing user, custom user |
| Data table / Landing Page details page | Random user only |

### Size Limits

| Operation | Limit | Consequence |
|---|---|---|
| Saving a landing page | 500 KB | Warning shown; may prevent publishing |
| Rendering with Liquid | 1 MB | Page automatically unpublished by Braze |

**Avoiding unpublishing:** When the 1 MB threshold is hit, Braze sends an email warning before auto-unpublishing. To stay within limits:
- Avoid looping through or referencing large data sets
- Minimize extensive math or conditional logic inside Liquid blocks

### Identified vs. Anonymous Users

**Identified users:** Link from a Braze message and include the landing page Liquid tag — this associates the visitor with their Braze profile for full personalization.

**Anonymous visitors:** Use Liquid for contextual, non-profile content only (e.g., random numbers, time-of-day greetings).

### Fallback Behavior

Users who access an unpublished page see a "page cannot currently be loaded" message. Common causes:
- Complex or broken Liquid causing long render times
- User network issues
- Exceeding the 1 MB size limit

`★ Insight ─────────────────────────────────────`
- The two-tier size limit (500 KB save warning vs. 1 MB auto-unpublish) reflects a common pattern in SaaS platforms: soft limits warn early, hard limits enforce automatically — important to capture both thresholds as they require different responses.
- The identified vs. anonymous distinction is architecturally significant: Braze's Liquid personalization is only as good as the data linkage — anonymous users get degraded personalization, which is a key constraint when designing landing page campaigns.
`─────────────────────────────────────────────────`
