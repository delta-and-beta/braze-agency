---
name: personalization-engines-sheetlabs
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalization_engines/sheetlabs
indexed_at: '2026-04-05'
keywords:
  - personalization
  - spreadsheets
  - API
  - translations
  - integration
  - attributes
  - Braze
  - lookup
  - sync
  - endpoint
triggers:
  - how to integrate Sheetlabs with Braze
  - set up spreadsheet API for campaigns
  - manage translations with spreadsheets
  - call Sheetlabs from Connected Content
  - extend custom attributes using spreadsheets
---
`★ Insight ─────────────────────────────────────`
- Topic files in this pipeline are "atomic knowledge units" - they should be scannable references, not tutorials. Strip narrative, keep facts and code.
- The Jekyll `{{site.baseurl}}` and `{% raw %}` template tags are noise in a reference doc — unwrap them but preserve the actual Liquid/Connected Content syntax since that's the actionable part.
`─────────────────────────────────────────────────`

## Sheetlabs Personalization Engine

Sheetlabs turns spreadsheets (Google Sheets or Excel) into documented REST APIs. When combined with Braze Connected Content, it bridges marketer-managed spreadsheet data into campaign templates.

**Integration maintained by:** Sheetlabs

### Core Use Cases

| Use Case | How It Works |
|----------|--------------|
| **Marketer access control** | Staff edit a spreadsheet instead of touching Braze templates directly; Sheetlabs syncs changes in real-time |
| **Translations** | Single Braze template pulls translated strings per language from a sheet, avoiding duplicate templates |
| **Extended custom attributes** | Spreadsheet rows act as additional attribute storage beyond Braze's built-in allotment |

### Setup (3 Steps)

**Step 1 — Import spreadsheet into Sheetlabs**
- Excel: **Data Tables → Import from CSV/Excel**
- Google Sheets: **Data Tables → Import from Google** (OAuth login required)
- Enable Google Sheet sync to auto-fetch latest data on change
- Include Braze user ID (or another lookup key) in the spreadsheet

**Step 2 — Create API in Sheetlabs**
- Go to **APIs → Create API**, name it, and configure a lookup field (e.g., Braze user ID or `country`)
- Resulting API endpoint example:
  ```
  https://sheetlabs.com/ACME/email1_translations?country=en
  ```

**Step 3 — Call API via Braze Connected Content**

Translations template example:
```liquid
{% connected_content https://sheetlabs.com/ACME/email1_translations?country={{${country}}} :save translations %}

{{translations[0].greeting}} {{${first_name}}},

{{translations[0].message_body}}
```

### Prerequisites
- Sheetlabs account ([sheetlabs.com](https://sheetlabs.com/))

### Reference
- Braze-specific docs: `https://app.sheetlabs.com/docs/producers/braze/`

`★ Insight ─────────────────────────────────────`
- The table format for use cases compresses what was 3 paragraphs into scannable rows — good pattern for topic files where readers need "what does this solve?" quickly.
- The `:save translations` Connected Content flag and `translations[0].fieldname` array access pattern are the key implementation details worth preserving — these are the parts a developer needs when writing actual templates.
`─────────────────────────────────────────────────`
