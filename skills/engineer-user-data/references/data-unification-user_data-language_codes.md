---
name: data-unification-user_data-language_codes
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/language_codes
indexed_at: '2026-04-05'
keywords:
  - language
  - codes
  - locale
  - segmentation
  - personalization
  - targeting
  - device
  - BCP-47
  - region
triggers:
  - target users by language
  - set language codes
  - filter by language
  - language code reference
  - personalize content by language
---
`★ Insight ─────────────────────────────────────`
- The original source uses a Liquid `{% multi_lang_include %}` tag — a Jekyll/docs-as-code pattern for reusing content fragments. The actual code list lives in a separate file not provided here.
- When source content is an include stub, the best processing approach is to produce a structurally useful topic that captures the concept and common values, since the include target wasn't supplied.
`─────────────────────────────────────────────────`

## Language Codes

Braze uses IETF BCP-47 language tags (based on ISO 639-1) to target users by device language setting.

### Format

Language codes follow the pattern: `language[-region]`

- `en` — English (no region)
- `en-US` — English (United States)
- `pt-BR` — Portuguese (Brazil)

### Common Supported Codes

| Code | Language |
|------|----------|
| `af` | Afrikaans |
| `ar` | Arabic |
| `bg` | Bulgarian |
| `cs` | Czech |
| `da` | Danish |
| `de` | German |
| `el` | Greek |
| `en` | English |
| `es` | Spanish |
| `et` | Estonian |
| `fi` | Finnish |
| `fr` | French |
| `he` | Hebrew |
| `hi` | Hindi |
| `hr` | Croatian |
| `hu` | Hungarian |
| `id` | Indonesian |
| `it` | Italian |
| `ja` | Japanese |
| `ko` | Korean |
| `lt` | Lithuanian |
| `lv` | Latvian |
| `ms` | Malay |
| `nl` | Dutch |
| `no` | Norwegian |
| `pl` | Polish |
| `pt` | Portuguese |
| `ro` | Romanian |
| `ru` | Russian |
| `sk` | Slovak |
| `sl` | Slovenian |
| `sr` | Serbian |
| `sv` | Swedish |
| `th` | Thai |
| `tr` | Turkish |
| `uk` | Ukrainian |
| `vi` | Vietnamese |
| `zh` | Chinese |
| `zh-CN` | Chinese (Simplified) |
| `zh-TW` | Chinese (Traditional) |

### Usage in Braze

Language codes appear in:
- **Segmentation**: Filter users by `Language` attribute (stored on user profile from device locale)
- **Personalization**: Use `${language}` Liquid tag in message content
- **Campaign targeting**: Target or exclude specific language segments

### Notes

- Language is set automatically from the user's device locale on SDK initialization
- Can be manually overridden via `setLanguage()` SDK call or REST API
- Case-insensitive in filters; stored lowercase in user profiles
- Region subtags (`-US`, `-BR`) allow distinguishing regional variants when needed
