---
name: developer-guide-localization
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/localization'
indexed_at: '2026-04-05'
keywords:
  - localization
  - translation
  - languages
  - SDK
  - messages
  - device-language
  - in-app
  - campaigns
  - internationalization
triggers:
  - how to localize messages
  - translate SDK-generated messages
  - support multiple languages
  - device language settings
  - localize campaign content
---
## Localization

Braze SDK supports multiple languages for in-app SDK messages. When a user's device language matches a supported language, SDK-generated messages (such as connectivity error notices) are automatically translated — no developer action required.

**Scope:** Only SDK-default messages are auto-translated. Custom message content you write is not automatically localized.

**Supported languages:** Defined in `supported_language_codes.md` (included at build time from Braze's shared partials — check the Braze dashboard or SDK docs for the current list).

### Key behaviors

- Translation is triggered by the device/phone language setting, not app locale
- Only SDK-bundled strings (e.g., push permission prompts, in-app error messages) are affected
- Developer-authored content requires manual localization

### Related

- For localizing message content (campaigns, Canvases): use Braze's **Messaging fundamentals > Localization** guide in the User Guide
