---
name: dynamic-content-personalization-engines
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalization_engines/sheetlabs
indexed_at: '2026-04-05'
keywords:
  - sheetlabs
  - braze
  - personalization
  - integration
  - spreadsheet
  - api
  - translations
  - attributes
  - connected-content
  - lookup
triggers:
  - How to integrate Sheetlabs with Braze
  - Set up spreadsheet-backed content personalization
  - Use translations in Braze Connected Content
  - Extend Braze custom attributes with spreadsheets
  - Create Sheetlabs API for Braze templates
---
## Sheetlabs + Braze Integration

**Sheetlabs** turns spreadsheets (Google Sheets or Excel) into documented APIs, bridging marketing team-managed data and Braze templates.

### Key Use Cases

| Use Case | How it helps |
|----------|-------------|
| Marketer access separation | Staff update content in a spreadsheet instead of Braze directly; changes reflect in real-time |
| Translations | Single Braze template can serve multiple languages via spreadsheet lookup |
| Extended custom attributes | Supplement Braze's custom attribute limits with spreadsheet-backed data |

### Setup Steps

**1. Import spreadsheet into Sheetlabs**
- Excel: **Data Tables > Import from CSV/Excel**
- Google Sheets: **Data Tables > Import from Google** (enable sync for auto-refresh)
- Include Braze user ID (or other lookup key) as a column

**2. Create API in Sheetlabs**
- Go to **APIs > Create API**, name it, and configure lookup by a field (e.g., Braze user ID)
- Result: an endpoint like `https://sheetlabs.com/ACME/email1_translations?country=en`

**3. Use in Braze Connected Content**

```liquid
{% connected_content https://sheetlabs.com/ACME/email1_translations?country={{${country}}} :save translations %}

{{translations[0].greeting}} {{${first_name}}},

{{translations[0].message_body}}
```

The `:save translations` tag stores the API response; access fields via `translations[0].field_name`.

### Prerequisites
- Sheetlabs account (sheetlabs.com)
- Braze Connected Content enabled

### Notes
- Integration is maintained by Sheetlabs
- Full docs: [app.sheetlabs.com/docs/producers/braze](https://app.sheetlabs.com/docs/producers/braze/)
