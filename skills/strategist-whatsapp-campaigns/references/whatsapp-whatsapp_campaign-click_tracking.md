---
name: whatsapp-whatsapp_campaign-click_tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/click_tracking
indexed_at: '2026-04-05'
keywords:
  - tracking
  - WhatsApp
  - URLs
  - personalization
  - templates
  - buttons
  - domains
  - Liquid
  - shortening
  - messages
triggers:
  - how to enable click tracking in WhatsApp
  - how to personalize tracking URLs with Liquid
  - how to track CTA button clicks
  - how to set up custom domains for click tracking
  - what click tracking limitations apply
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — each should be self-contained and reference-dense. The goal is to strip Jekyll templating artifacts (`{% %}` tags, image busters, `site.baseurl` refs) while preserving the actionable facts. These files are consumed by vector search at runtime, so density matters more than prose flow.
`─────────────────────────────────────────────────`

## WhatsApp Click Tracking

Click tracking measures link taps in WhatsApp messages, logging click events and reporting them in performance dashboards. Braze shortens URLs and adds tracking automatically.

**Supported in:** Response messages, template messages, CTA buttons, body text links, personalized URLs, custom domains.

**Not supported:** Deep links. Universal links (Branch, AppsFlyer) can be shortened but Braze won't troubleshoot attribution issues.

---

## Setup: Response Messages

1. Create a response message with a CTA button containing a website URL.
2. Enable click tracking via the toggle in the composer.

Braze shortens all `http://` and `https://` URLs to the Braze domain (or subscription group custom domain). Shortened URLs with Liquid personalization are valid for **two months**.

---

## Setup: Template Messages

### Step 1 — Build the Template in WhatsApp Manager

- **CTA buttons:** Select **Dynamic**, set base URL to `brz.ai` or your custom domain.
- **Body text links:** Remove any inserted spaces around links you want tracked.
- Base URL must be `brz.ai` or your custom domain — set this when creating the template.
- Do not change template variables after the template is set up as a Braze campaign.

### Step 2 — Complete in Braze Composer

Braze auto-detects trackable URL domains. Link status appears at the bottom of the template:

| Status | Behavior |
|---|---|
| **Supported** | Base URL matches → click tracking enabled |
| **Partially supported** | Some links submitted as full URLs → those links skip tracking |
| **Unsupported** | No approved base URL → no click tracking |

For any link with a base URL matching `brz.ai` or your custom domain, you must provide the destination URL in the **Click tracking URL** field.

**API limitation:** Click tracking via `brz.ai`/custom domain is **not supported** when sending template messages through the `/messages/send` API endpoint. The API supports `button_variables` for CTA URL population, but Braze does not generate a click-tracking redirect in the API flow. Use the Braze dashboard or a campaign trigger to use click tracking.

---

## Liquid Personalization in URLs

URLs can be dynamically constructed using any supported Liquid tags:

```liquid
https://example.com/?campaign_utm={{campaign.${api_id}}}&user_attribute={{custom_attribute.${attribute1}}}
```

Custom-defined Liquid variables are also supported:

```liquid
{% assign url_var = {{event_properties.${url_slug}}} %}
https://example.com/{{url_var}}
```

Braze also shortens URLs rendered by Liquid, including API-trigger properties:

```
{{api_trigger_properties.${url_value}}}  → shortened and tracked before send
```

---

## Testing

Use the **Test** tab to preview and send to content test groups or individual users. The preview updates with personalization and the shortened URL applied.

**Note:** Shortened URLs are not generated for drafts inside an active Canvas. The actual shortened URL is generated when the Canvas draft is activated.

---

## Reporting

When click tracking is enabled, the WhatsApp performance table adds a **Total Clicks** column showing click count per variant and click rate. Data is automatically reported in the analytics dashboard.

Reference: [WhatsApp message performance](https://www.braze.com/docs/user_guide/message_building_by_channel/whatsapp/whatsapp_campaign_analytics)

---

## Retargeting

Segment users based on link interactions using:

- Filter: `Clicked/Opened Step` → `clicked tracked WhatsApp link`
- Currents event: `users.messages.whatsapp.Click`

---

## FAQ

**Can I identify which individual users clicked a URL?**
Yes. Use WhatsApp retargeting filters or the `users.messages.whatsapp.Click` Currents event.

**Do WhatsApp device link previews count as clicks?**
No. Link previews do not contribute to click rate.
