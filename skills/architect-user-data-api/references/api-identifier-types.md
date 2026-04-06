---
name: api-identifier-types
source_url: 'https://braze-inc.github.io/braze-docs/_api/identifier_types'
indexed_at: '2026-04-05'
keywords:
  - identifier
  - app_id
  - template
  - canvas
  - campaign
  - segment
  - api
  - analytics
  - variant
triggers:
  - find app identifier
  - get canvas ID
  - retrieve campaign identifier
  - set up multiple app variants
  - track campaign analytics
---
# API Identifier Types

All Braze API identifiers provide access to templates, Canvases, campaigns, and segments via the external API. All messages must use [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding.

---

## App Identifier (`app_id`)

Associates activity with a specific app in your workspace. Each platform integration (iOS, Android, web) has its own `app_id`, and you can have multiple apps per platform.

**Where to find it:**
- **Settings > APIs and Identifiers > App Identifiers** — listed under the *Identifier* column
- **Settings > App Settings** — listed next to the *API Key* field

**Use cases:**
- SDK integration
- Pull custom event data for a specific app
- Retrieve uninstall stats, new user stats, DAU stats, session start stats

> **Tip:** If prompted for `app_id` but not working with an app (legacy field), pass any placeholder string.

**Multiple app identifiers (Android):** Separate identifiers for debug/release variants by creating a `braze.xml` per build variant at `src/<build variant name>/res/values/`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="com_braze_api_key">{YOUR_BUILD_VARIANT_API_KEY}</string>
</resources>
```

---

## Template Identifier

A unique random key generated per template. Useful for reusable HTML designs (e.g., newsletter templates) applied across multiple campaigns.

**Where to find it:**
- **Templates** > select a template > bottom of the template page
- **Settings > APIs and Identifiers > Additional API Identifiers** search

**Use cases:**
- Update templates via API
- Retrieve information on a specific template

---

## Canvas Identifier (Canvas ID)

A unique random key per Canvas. If a Canvas has variants, there is an overall Canvas ID plus individual variant Canvas IDs nested under it.

**Where to find it:**
- **Messaging > Canvas** > select a Canvas > **Analyze Variants** > Canvas API identifier shown at the bottom of the window

**Use cases:**
- Track analytics on a specific message
- Retrieve aggregate Canvas performance stats
- Get details on a specific Canvas
- Use with Currents for user-level data
- Use with API-triggered delivery for transactional message statistics

---

## Campaign Identifier (Campaign ID)

A unique random key per campaign. If a campaign has variants, there is an overall campaign ID plus individual variant campaign IDs nested under it.

**Where to find it:**
- **Messaging > Campaigns** > select a campaign > **Campaign API Identifier** at the bottom of the page
- **Settings > APIs and Identifiers > Additional API Identifiers** search

**Use cases:**
- Track analytics on a specific message
- Retrieve aggregate campaign performance stats
- Get details on a specific campaign
- Use with Currents for user-level data
- Use with API-triggered delivery for transactional statistics
- Filter campaigns page with `api_id:YOUR_API_ID`

---

## Segment Identifier (Segment ID)

A unique random key per segment.

**Where to find it:**
- **Audience > Segments** > select a segment > segment identifier at the bottom of the page
- **Settings > APIs and Identifiers > Additional API Identifiers** search

**Use cases:**
- Get details on a specific segment
- Retrieve segment analytics
- Pull custom event occurrence counts for a segment
- Target a segment in API-triggered campaign sends

---

## Quick Reference

| Identifier | Object | Found At |
|---|---|---|
| `app_id` | App | Settings > APIs and Identifiers > App Identifiers |
| Template ID | Template | Templates page (bottom) or Additional API Identifiers |
| Canvas ID | Canvas | Messaging > Canvas > Analyze Variants |
| Campaign ID | Campaign | Messaging > Campaigns (bottom) or Additional API Identifiers |
| Segment ID | Segment | Audience > Segments (bottom) or Additional API Identifiers |

`★ Insight ─────────────────────────────────────`
- The original source uses Liquid template tags (`{{site.baseurl}}`) and Jekyll tab shortcodes (`{% tabs local %}`) — stripping these is essential since topic files are consumed directly by agents without Jekyll rendering
- The "Multiple app identifiers" section with its Android XML example is preserved verbatim because it's concrete, actionable developer content — prose explanations can be condensed, but code samples rarely can
- The Quick Reference table at the end is an addition not in the original; it synthesizes the pattern across all five identifier types into a single scannable lookup, which is higher value for a reference file than repeating "Where to find it" prose five times
`─────────────────────────────────────────────────`
