---
name: message-building-by-channel-line-create-line-click-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/create/line_click_tracking
indexed_at: '2026-04-05'
keywords:
  - tracking
  - LINE
  - URLs
  - personalization
  - retargeting
  - domains
  - shortening
  - clicks
  - analytics
  - messages
triggers:
  - enable click tracking for LINE
  - track user clicks in messages
  - personalize URLs with Liquid
  - set up custom domains
  - retarget by click behavior
---
## LINE Click Tracking

Braze automatically shortens URLs, adds tracking, and records clicks in real time when click tracking is enabled. Unlike LINE's aggregate data, Braze provides granular per-user click data for segmentation and retargeting.

**Supports:** Text, rich, and card-based messages — buttons and image-mapped areas with URL on-click actions.

---

### How It Works

- Managed in the **Settings** tab of the composer
- All `http://` and `https://` URLs are shortened using `https://brz.ai` (or a custom domain per subscription group)
- Max **25 URLs** per message
- URLs with Liquid personalization valid for **2 months**
- On by default for all new messages

---

### Setup by Message Type

**Text messages**
1. Add URL to text field
2. Settings tab → confirm **Click Tracking** is on

**Rich messages**
1. Select template → set **On-click behavior** to **URI** → enter URL in **Open URL** field
2. Settings tab → confirm **Click Tracking** is on

**Card-based messages**
1. Set **On-click behavior** to **URI** for applicable card/button areas
2. Settings tab → confirm **Click Tracking** is on

> **Note:** URLs in **Title** or **Description** fields are not shortened (not clickable in LINE).

---

### Liquid Personalization in URLs

Dynamically construct URLs using any supported Liquid tags:

```
https://example.com/?campaign_utm={{campaign.${api_id}}}&user_attribute={{custom_attribute.${attribute1}}}
```

Shorten custom Liquid variables:

```liquid
{% assign url_var = {{event_properties.${url_slug}}} %}
https://example.com/{{url_var}}
```

API-trigger properties that resolve to valid URLs are also shortened automatically (e.g., `{{api_trigger_properties.${url_value}}}`).

---

### Custom Domains

Use your own domain for shortened URLs to maintain brand consistency. Configure per subscription group — see Custom Domains docs for setup.

---

### Testing

Use the **Test** tab to preview with real personalization and shortened URLs. 

> **Important:** Shortened URLs are not generated for drafts inside an active Canvas. The URL generates when the Canvas draft is activated.

---

### Reporting

**Total Clicks** column in the LINE performance table shows click events per variant + click rate. Data auto-reports to the analytics dashboard.

---

### Retargeting

**Action-based triggers:**
- Interact with Campaign
- Interact with Step

**Segmentation filters:**
- Clicked/Opened Campaign
- Clicked/Opened Campaign or Canvas with Tag
- Clicked/Opened Step

---

### Key Facts (FAQ)

| Question | Answer |
|----------|--------|
| Are test-send URLs real? | Yes, but may differ from live campaign URLs |
| UTM parameters before shortening? | Yes, static and dynamic both supported |
| How long do shortened URLs last? | 2 months from registration |
| SDK required? | No |
| Individual user click tracking? | Yes, via retargeting filters |
| Deep links supported? | No |
| Universal links (Branch/Appsflyer)? | Can be shortened, but Braze can't troubleshoot redirect/attribution issues |
| LINE app previews count as clicks? | No |

`★ Insight ─────────────────────────────────────`
The original doc uses Jekyll templating (`{% image_buster %}`, `{{site.baseurl}}`) for image/link injection — these are stripped in topic files since they're build-time artifacts with no value in a reference context. The table format for FAQ is more scannable than the original Q&A prose and better suits rapid lookup patterns in agent contexts.
`─────────────────────────────────────────────────`
