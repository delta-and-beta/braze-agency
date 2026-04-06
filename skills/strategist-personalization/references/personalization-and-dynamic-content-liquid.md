---
name: personalization-and-dynamic-content-liquid
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/liquid
indexed_at: '2026-04-05'
keywords:
  - liquid
  - templating
  - personalization
  - attributes
  - filters
  - operators
  - conditional
  - formatting
  - objects
  - tags
triggers:
  - how to personalize messages with user data
  - inject attributes into Liquid templates
  - apply conditional logic in messages
  - format output with Liquid filters
  - create dynamic personalized content
---
# Liquid Templating

Liquid is an open-source template language (created by Shopify, written in Ruby) used in Braze to inject user profile data into messages.

> **Note:** Braze supports a subset of Shopify's Liquid — not 100%. Test all Liquid messages before sending.

## Core Concepts

| Concept | Purpose | Example |
|---|---|---|
| **Object** | Insert personalized attributes | `{{${first_name}}}` → user's first name |
| **Tag** | Conditional logic and flow control | `{% if ${language} == 'en' %}` |
| **Filter** | Reformat or transform output | `{{"Big Sale" \| upcase}}` → `BIG SALE` |
| **Operator** | Create conditions/dependencies | `{% custom_attribute.${Total_Revenue} > 0 %}` |

## Liquid 5 Support

Braze supports up to **Liquid 5 from Shopify**, including syntax personalization tags and whitespace control.

New array/math filters available in Liquid 5:
- `at_least` / `at_most` — clamp numeric values
- `compact` — remove nil values from array
- `concat` — merge arrays
- `sort_natural` — case-insensitive sort
- `where` — filter array by property value

## Quick Reference

```liquid
{{${first_name}}}                        # Insert user attribute
{{${city}}}                              # Insert city attribute
{% if ${language} == 'en' %} ... {% endif %}   # Conditional block
{{"hello" | upcase}}                     # Filter usage → HELLO
```

## Editor Features

- **Color labels** — each Liquid element type is color-coded in the Braze editor for quick visual parsing
- **Predictive Liquid** — autocomplete for custom attributes and attribute names while composing messages
