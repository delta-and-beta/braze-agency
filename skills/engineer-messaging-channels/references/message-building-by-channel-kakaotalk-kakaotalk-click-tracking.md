---
name: message-building-by-channel-kakaotalk-kakaotalk-click-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/kakaotalk/kakaotalk_click_tracking
indexed_at: '2026-04-05'
keywords:
  - tracking
  - urls
  - shortening
  - personalization
  - liquid
  - segmentation
  - retargeting
  - kakaotalk
  - campaign
  - links
triggers:
  - how to enable click tracking
  - how to add Liquid personalization to URLs
  - how to retarget users based on clicks
  - how to set up custom domains
  - how to test click tracking
---
## KakaoTalk Click Tracking

Braze automatically shortens URLs, adds tracking mechanisms, and records clicks in real time when click tracking is enabled. Supports text, image, and list item messages — including button links and image on-click actions. Enables segmentation and retargeting based on click behavior.

**URL shortening:** Uses `https://brz.ai` (default) or a custom domain configured for the subscription group. Any `http://` or `https://` URL is shortened. Max 25 URLs per message. URLs with Liquid personalization are valid for 2 months.

---

### Setup by Message Type

**Text messages**
1. Compose a Text message, add URL to text field or button.
2. In **Link options**, confirm **Click Tracking** is checked (on by default for new messages).

**Image messages**
1. Set on-click behavior to open a URL.
2. Enter URL in the URL field.
3. Confirm **Click Tracking** is checked in **Link options**.

**List item messages**
1. Add URL to the **Website URL** field for any list item.
2. Confirm **Click Tracking** is checked in **Link options**.

---

### Custom Domains

Use your own domain to personalize shortened URLs for consistent branding. Configured at the subscription group level. See Braze custom domains documentation for setup.

---

### Liquid Personalization in URLs

Dynamically construct URLs using any supported Liquid personalization tags:

```liquid
https://example.com/?campaign_utm={{campaign.${api_id}}}&user_attribute={{custom_attribute.${attribute1}}}
```

Shorten custom-defined Liquid variables:

```liquid
{% assign url_var = {{event_properties.${url_slug}}} %}
https://example.com/{{url_var}}
```

Braze shortens URLs rendered by Liquid, including API-trigger properties (e.g., `{{api_trigger_properties.${url_value}}}`).

---

### Testing

Preview and test via the **Test** tab before launching. The preview reflects personalization and shortened URLs.

> **Note:** Shortened URLs are not generated for drafts within an active Canvas — they generate only when the Canvas draft is activated.

---

### Reporting

The KakaoTalk performance table includes **Total Clicks** (count per variant + click rate). Click data is automatically reported in the analytics dashboard.

---

### Retargeting Users Who Clicked

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
|---|---|
| Are test send URLs real? | Yes, but may differ from links sent in a live campaign. |
| Can UTM parameters be added before shortening? | Yes, both static and dynamic. |
| How long are personalized URLs valid? | 2 months from URL registration. |
| Does the Braze SDK need to be installed? | No — click tracking works without SDK integration. |
| Can you identify individual users who clicked? | Yes — use KakaoTalk retargeting filters. |
| Does click tracking work with deep links? | No — deep links bypass URL shortening/tracking. Universal links (Branch, Appsflyer) can be shortened, but Braze cannot troubleshoot attribution issues. |
