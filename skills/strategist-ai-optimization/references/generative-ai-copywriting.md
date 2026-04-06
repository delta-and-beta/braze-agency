---
name: generative-ai-copywriting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/copywriting
indexed_at: '2026-04-05'
keywords:
  - copywriting
  - AI
  - GPT
  - tone
  - brand-guidelines
  - marketing-copy
  - content-generation
  - personalization
triggers:
  - Generate marketing copy
  - Write product copy
  - Create campaign message
  - Generate copy with tone
  - Create brand-aligned content
---
# AI Copywriting (BrazeAI)

Generates human-like marketing copy via OpenAI's GPT. Available in most message composers in the Braze dashboard.

## How to Use

**Step 1:** Click **Launch AI Copywriter** (wand icon) in your message composer. In drag-and-drop in-app message editor, select a text block first, then click the icon in the block toolbar.

**Step 2:** Enter a product name or description. Select output length:
- Channel-specific (follows best practices for that channel)
- **Short** — 1 sentence
- **Medium** — 2–3 sentences
- **Long** — 1 paragraph

**Step 3 (optional):** Customize with:

- **Brand guidelines** — Apply guidelines generated with BrazeAI to shape copy style
- **Tone** — Adds a style instruction to the OpenAI prompt; output varies by input, channel, and guidelines

| Tone | Style |
|------|-------|
| Formal | Professional, full sentences, minimal slang |
| Straight-forward | Direct, fewer adjectives, clear CTAs |
| Casual | Relaxed, friendly, simpler words |
| Personal | Empathetic, uses "you", pairs well with Liquid personalization (e.g. `{{${first_name}}}`) |
| Eye-catching | Punchy, high energy, strong hooks and CTAs |
| Sophisticated | Elevated, refined, "premium" positioning |
| Professional | Modern, clear, authoritative but approachable |
| Passive | Soft, suggestive, fewer direct commands |
| Urgent | Emphasizes immediacy, deadlines, scarcity |
| Exciting | Energetic, celebratory, emotion-forward |

- **Reference past campaign data** — Sends randomly selected past mobile push campaigns (without Liquid) to OpenAI for stylistic reference. Push channel only. Can combine with brand guidelines.
- **Auto-translate** — Output copy in a different language

**Step 4:** Click **Generate**. Response is fetched from OpenAI.

## Important Notes

- Braze filters responses for offensive content per OpenAI's content policy
- Past campaign data feature: push campaigns with Liquid syntax are excluded from what's sent to OpenAI
- When both brand guidelines and past campaign data are enabled, both are incorporated into the final output
