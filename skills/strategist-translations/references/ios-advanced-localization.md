---
name: ios-advanced-localization
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/localization
indexed_at: '2026-04-05'
keywords:
  - localization
  - iOS
  - SDK
  - language
  - strings
  - translation
  - locale
  - internationalization
  - device
  - detection
triggers:
  - how to localize iOS app
  - setup SDK localization
  - support multiple languages iOS
  - configure automatic language detection
  - iOS UI string translation
---
## iOS SDK Localization

The Braze iOS SDK includes built-in localization support. Default SDK UI strings (such as error messages like "Cannot establish network connection. Please try again later.") automatically render in the device's language when that language is supported.

No configuration is required — if the device language matches a supported language, Braze strings appear in that language automatically.

## Supported Languages

Arabic, Burmese, Catalan, Chinese, Czech, Danish, Dutch, English, Esperanto, Estonian, Ewe, Filipino, Finnish, French, Georgian, German, Greek, Hebrew, Hindi, Hungarian, Indonesian, Irish, Italian, Japanese, Korean, Malay, Norwegian, Nynorsk, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Ukrainian, Vietnamese

## Notes

- This covers **SDK UI strings only** — not user-generated content or custom messages.
- For attributing a language to a user profile, use Braze's user language codes (separate from SDK localization).
- Language detection is automatic based on device locale; no SDK configuration needed.
- Follows Apple's localization conventions and ISO 639-2 language codes.
