---
name: whatsapp-user_phone_numbers
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/user_phone_numbers
indexed_at: '2026-04-05'
keywords:
  - WhatsApp
  - phone-numbers
  - E.164
  - import
  - formatting
  - validation
  - deduplication
  - subscription
triggers:
  - import phone numbers for WhatsApp
  - format phone numbers E.164
  - WhatsApp phone number validation
  - duplicate phone number handling
---
## WhatsApp User Phone Numbers

Phone numbers display in local format in user profiles, but are stored in the format used during import.

### Importing Phone Numbers

Import via [CSV upload]({{site.baseurl}}/user_guide/data_and_analytics/user_data_collection/user_import/#csv) or [API]({{site.baseurl}}/api/endpoints/user_data/#user-track-endpoint).

### Formatting Requirements

**Non-US numbers:** Must use `E.164` format — include `+` and country code.
- Numbers not in E.164 format are treated as US numbers
- Numbers that fail E.164 validation cannot receive WhatsApp messages
- Users with unformattable numbers are automatically exited from Canvas steps that include WhatsApp

**US numbers:** Must be valid 10-digit numbers with a valid area code. The `+1` prefix is optional — Braze maps all valid 10-digit numbers as US numbers.

**Recommendation:** Use `E.164` for all numbers (including US) when sending across multiple regions.

| Country | Local | Country Code | E.164 |
|---------|-------|--------------|-------|
| USA | `4155552671` | 1 | `+14155552671` |
| UK | `02071838750` | 44 | `+442071838750` |
| Brazil | `1155256325` | 55 | `+551155256325` |

**International format:** `+[country code][phone number]` — e.g., `+442071838750`

### WhatsApp Subscription Requirement

To receive WhatsApp messages, a user must:
1. Have a valid phone number
2. Be opted-in to a WhatsApp subscription group

See [WhatsApp subscription groups]({{site.baseurl}}/user_guide/message_building_by_channel/whatsapp/user_subscription/) for details.

### Duplicate Phone Numbers

If multiple users share the same phone number within a campaign segment or Canvas step, Braze deduplicates sends — only **one message** is sent per phone number.

---

`★ Insight ─────────────────────────────────────`
- The E.164 format serves as a universal phone number normalization standard — the `+` prefix plus country code makes numbers globally unambiguous, unlike local formats which are context-dependent
- Braze's "coerce then validate" approach for US numbers (assume 10-digit = US) is a common UX tradeoff: it reduces friction for domestic use cases but creates a subtle footgun when importing international numbers without proper prefixes
- The deduplication behavior at the Canvas step level (not campaign level) is worth noting — it's a common source of confusion when debugging why some users didn't receive messages
`─────────────────────────────────────────────────`
