---
name: administrative-app_settings-multi_language_settings
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/multi_language_settings
indexed_at: '2026-04-05'
keywords:
  - localization
  - locale
  - translation
  - language
  - attributes
  - campaign
  - custom
  - priority
  - messages
  - translations
triggers:
  - how to add a locale
  - configure localization settings
  - set up multi-language support
  - upload translation files
  - resolve locale conflicts
---
## Multi-Language Settings

Localization settings let you configure locales used with translation tags to deliver messages in different languages within a single campaign.

### Adding a Locale

**Path:** Settings > Localization Settings > Add locale

Choose between two locale types:

| Type | How it works |
|------|-------------|
| **Default locale** | Select language and optional country from Braze's built-in user attributes |
| **Custom Attributes** | Select a custom attribute and provide an exact string value to match |

**Steps:**
1. Select **Add locale** → choose Default or Custom Attributes
2. Enter a locale name (no required format/pattern)
3. Select a language for accessibility (used by screen readers)
4. Configure user attributes (default OR custom — not both)
5. Select **Add locale**

### Limits & Constraints

- Maximum **200 locales** total
- Up to **2 attributes per locale** (second is optional)
- Custom attributes support **exact string matching only**
- Cannot mix default and custom attributes within one locale

### Priority & Conflict Resolution

When a user matches multiple locales:
- **Custom attribute locale takes priority** over default user attribute locale
- If no match: user falls to next locale in priority list, or receives default marketing translations

### Locale Invalidation

A locale becomes invalid if its custom attribute is deleted or its type changes. Invalid locales appear as errors on the **Multi-Language Support** page.

### Translation File Storage

- Stored at **campaign level** — each message variant needs its own uploaded translations
- Can also be stored in **Content Blocks** — translations auto-include when the block is added to a message
- When editing a translated CSV, do **not** modify default values
- The locale key in uploaded files must **exactly match** the key in Multi-Language Settings
