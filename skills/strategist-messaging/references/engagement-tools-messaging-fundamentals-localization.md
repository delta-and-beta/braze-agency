---
name: engagement-tools-messaging-fundamentals-localization
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/localization
indexed_at: '2026-04-05'
keywords:
  - localization
  - translation
  - locale
  - Liquid
  - campaign
  - canvas
  - segmentation
  - language
  - region
  - timezone
triggers:
  - how to localize messages
  - translate campaign content
  - multi-language messaging
  - set up localization
  - segment by language
---
`★ Insight ─────────────────────────────────────`
- Jekyll docs use `{{site.baseurl}}` URL interpolation and Liquid-style `{% tabs %}` directives that must be stripped when converting to standalone markdown
- The original content has two orthogonal decision axes: *campaign vs canvas* (orchestration layer) and *one template vs per country* (structure layer) — flattening these into a clear reference requires restructuring, not just trimming
`─────────────────────────────────────────────────`

```markdown
# Localization

Locale data is stored on user profiles via Braze SDK (automatic) or REST API (`/users/track`). Locale includes language + region identifier. Available in segmentation under **Country** and **Language** filters.

## Translation Management Approaches

### Campaign Context

| Approach | Description | Pros | Cons |
|---|---|---|---|
| **One template for all** | Single campaign using Liquid conditionals per locale | Centralized, faster build | Aggregated analytics only, harder to schedule per timezone, complex Liquid testing |
| **One template per country** | Separate campaign per sending locale | Per-country revenue reporting, flexible for divergent content | More build effort, requires strategic tagging |

Tips for multi-template approach:
- Use [tags](https://www.braze.com/docs/user_guide/administrative/app_settings/manage_app_group/tags) for maintenance
- Inherit configs from shared Braze templates and Content Blocks
- Duplicate existing campaigns to accelerate setup

### Canvas Context

| Approach | Description | Pros | Cons |
|---|---|---|---|
| **One journey for all** | Single Canvas with Liquid-based locale branching | Centralized, less build time | Aggregated analytics only, harder per-timezone scheduling |
| **One journey per country** | Separate Canvases per country, or Audience Paths within a single Canvas | Per-country/step reporting, supports complex journeys, extensible to other channels | More build effort, Canvas can become unwieldy |

For the single-Canvas per-country variant, use **Audience Paths** components to segment users into country-specific message threads at scale.

## Sending Translated Messages

### Translation Liquid Tags (Recommended)

```liquid
{% translation salutation %}Hello!{% endtranslation %}
```

Targets users in different languages within a single message. See the [locales guide](https://www.braze.com/docs/user_guide/engagement_tools/messaging_fundamentals/localization/locales) for full walkthrough.

### Custom Liquid (Alternative)

Paste content into the message body and use Liquid conditional logic to display the correct language:

```liquid
{% if ${language} == 'fr' %}
  Bonjour !
{% elsif ${language} == 'es' %}
  ¡Hola!
{% else %}
  Hello!
{% endif %}
```

Suitable when translation tag infrastructure isn't set up, or for simple single-message cases.

## Decision Framework

- **Few locales, simple content** → One template + Liquid tags
- **Many locales, divergent content** → One template/journey per country
- **Need per-country analytics** → Separate campaigns or Canvas journeys (not single-template Liquid approach)
- **Complex multi-step journeys** → Canvas with Audience Paths per country
```
