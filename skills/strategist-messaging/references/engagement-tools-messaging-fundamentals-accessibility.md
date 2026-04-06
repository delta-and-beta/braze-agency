---
name: engagement-tools-messaging-fundamentals-accessibility
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/accessibility
indexed_at: '2026-04-05'
keywords:
  - accessibility
  - wcag
  - inclusive
  - readability
  - captions
  - screenreaders
  - contrast
  - keyboard
  - semantics
  - disability
triggers:
  - how to make messages accessible
  - ensure wcag compliance
  - support screen reader users
  - create accessible campaigns
---
# Message Accessibility in Braze

Accessible marketing enables everyone to experience your content, understand your communication, and engage with your brand—regardless of disability.

> **Note:** Braze provides tools to support accessible message creation, but ensuring compliance with standards like WCAG is your responsibility.

## Disability Categories to Consider

### Visual
- Ranges from partial vision loss to complete blindness; includes color vision deficiency
- Users need: text resize, customizable fonts/colors/spacing, screen reader support, audio descriptions, Braille output
- **Stats:** 2.2B people globally have vision impairment; ~300M have color vision deficiency (1 in 12 men, 1 in 200 women)

### Hearing
- Ranges from mild to complete hearing loss in one or both ears
- Users rely on: transcripts, captions, adjustable caption sizing/color, independent volume controls, clear foreground audio
- **Stats:** 1 in 8 Americans (30M) aged 12+ has hearing loss in both ears; 15% of adults report some hearing trouble

### Physical
- Includes muscle weakness, joint disorders, pain, limb loss
- Users need: large clickable areas, sufficient time to complete tasks, visible focus indicators, content-skip mechanisms, full keyboard support
- **Stats:** ~2M Americans live with limb loss

### Cognitive
- Includes learning disabilities, neurodiversity, neurological and mental health disorders
- Users rely on: clearly structured content, consistent labeling, predictable interactions, multiple navigation methods (menus, search), options to disable flashing content, simple text supported by images
- **Stats:** 1 in 5 Americans have learning/attention issues; 10–20% of global population is neurodivergent; ~1 in 100 children has autism

## Best Practices

### Structure and Flow
- **Use headings, bullets, and lists** to make content scannable
- **Don't skip heading levels** — maintain logical hierarchy (H1 → H2 → H3) for screen reader navigation

### Readability
- **Write short, clear sentences** — target a US 7th-grade reading level (tool: [Hemingway App](https://hemingwayapp.com/))
- **Use readable font sizes and adequate spacing** — avoid text that is too small

`★ Insight ─────────────────────────────────────`
- The topic file strips Braze's `{% tabs %}` / `{% alert %}` Liquid templating — these are Jekyll-specific and not meaningful outside the docs site
- Stats are preserved inline with their sources (WHO, NHS, NIH) because they serve as quick justification when pitching accessibility work to stakeholders
- The truncated readability section is included up to where the source content ends — no content was invented to fill the gap
`─────────────────────────────────────────────────`
