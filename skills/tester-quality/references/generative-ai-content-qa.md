---
name: generative-ai-content-qa
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/content_qa
indexed_at: '2026-04-05'
keywords:
  - QA
  - content
  - grammar
  - tone
  - SMS
  - push
  - offensive
  - proofreading
  - spelling
  - multilingual
triggers:
  - test message content quality
  - check for spelling errors
  - analyze message tone
  - detect offensive language
  - proofread with AI
---
## AI Content QA (BrazeAI)

Pre-send content quality check powered by AI. Available for **SMS, Android push, iOS push, and traditional in-app messages only**.

### Features

| Feature | What it checks |
|---|---|
| Spelling & grammar | Mistakes + correction suggestions |
| Tone analysis | Alignment with intended communication style |
| Offensive language | Potentially inappropriate content |
| Accidental content | Unrendered Liquid, stray markup/code, test strings |
| Multi-language | Supported by GPT but Braze sends no locale context — results may vary |

### How to Use

1. Compose your message (SMS, mobile push, or traditional in-app)
2. Navigate to the **Test** tab
3. Find the **Content QA with AI** section
4. Click **Test Content**

### Limitations & Best Practices

- **Not a replacement for manual proofreading** — use AI suggestions as a guide, apply your own judgment
- **Tone analysis is subjective** — results reflect the model's interpretation; consider your campaign context
- **Offensive language detection may have false positives** — review flagged sections before making changes
- **No locale awareness** — Braze does not pass language/locale to OpenAI; multilingual content quality may be inconsistent
