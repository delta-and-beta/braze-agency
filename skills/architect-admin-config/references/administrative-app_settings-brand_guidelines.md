---
name: administrative-app_settings-brand_guidelines
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/brand_guidelines
indexed_at: '2026-04-05'
keywords:
  - brand-guidelines
  - personality
  - voice
  - archetype
  - copywriting
  - exclusions
  - workspace
  - tone
  - differentiation
  - values
triggers:
  - create a brand guideline
  - configure brand personality
  - apply brand guideline to copy
  - test brand guidelines
  - manage brand voice
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — they should be self-contained enough to surface via semantic search without surrounding context. The goal is density: every sentence should carry load. Jekyll templating syntax (`{% %}`, `{{site.baseurl}}`) and image tags are noise that gets stripped.
`─────────────────────────────────────────────────`

## Brand Guidelines

Brand guidelines let you configure AI-generated copy to match your brand's voice, tone, and personality. Managed at **Settings > Brand Guidelines** or inside the AI copywriting assistant.

### Creating a Brand Guideline

1. **Create** — Select **Create new** on the Brand Guidelines page. Optionally check **Use as default brand guideline** (one default per workspace).

2. **Brand Personality** — Describe what makes your brand unique using these characteristics:

| Characteristic | Definition | Example |
|---|---|---|
| Reputation | How you want to be perceived in the market | "Most reliable, customer-focused brand in our industry" |
| Personality traits | Human-like character descriptors | Friendly, approachable, upbeat |
| Values | Core values guiding brand decisions | Sustainability, transparency, community |
| Differentiation | Unique qualities vs. competitors | Personalized service that goes above and beyond |
| Brand voice | Tone and style of communication | Casual yet informative, clear without being formal |
| Brand archetype | Persona archetype (Hero, Creator, Explorer, etc.) | "Explorer" — seeking new challenges |

3. **Exclusions** *(optional)* — List language or styles to avoid (e.g., "sarcasm," "condescending," "negative attitudes").

4. **Test** — Expand **Test your guidelines** to generate example copy and iterate before saving.

5. **Save** — Select **Save brand guideline** to persist to the workspace.

> **Note:** Output language can be changed regardless of input language, but translation quality is not guaranteed. Always test translations before use.

### Managing Guidelines

- **Edit** — Select a guideline on the Brand Guidelines page.
- **Archive** — Makes the guideline inactive and removes it from the AI copywriting assistant dropdown.
- **Unarchive** — Filter for archived guidelines, then unarchive to make it active again.

### Using Guidelines in the AI Copywriting Assistant

When composing a message, open the AI copywriting assistant and select a guideline from the **Apply brand guideline** dropdown. If a default is set, it pre-selects automatically — but can be overridden per message.
