---
name: personalization-and-dynamic-content
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content
indexed_at: '2026-04-05'
keywords:
  - personalization
  - dynamic-content
  - liquid
  - templating
  - variables
  - attributes
  - iteration
  - rendering
  - null-safety
triggers:
  - how to personalize content based on user attributes
  - render dynamic content with liquid templates
  - handle null values in template output
  - loop through collections in liquid
  - personalize user-facing content
---
`★ Insight ─────────────────────────────────────`
The provided source is nearly empty — just three link-definition footnotes (Liquid variable tags, iteration tags, and a null-value anchor). This is common when documentation pipelines capture page fragments or index stubs rather than full content pages. The right move is to extract whatever semantic signal exists and produce a minimal but honest topic file.
`─────────────────────────────────────────────────`

## Personalization and Dynamic Content Index

This topic covers dynamic content rendering patterns using Liquid templating, particularly for personalizing output based on user or record attributes.

### Core Concepts

- **Variable tags** — assign and output dynamic values (e.g., `{{ user.first_name }}`)
- **Iteration tags** — loop over collections to render repeated content blocks
- **Null attribute handling** — guard against missing or unset attribute values before rendering

### Key Consideration: Null Attribute Values

Always account for attributes that may be null or undefined before using them in personalization logic. Rendering an unguarded null attribute can produce empty strings, broken layouts, or template errors.

**Pattern — conditional guard before output:**
```liquid
{% if user.first_name != blank %}
  Hello, {{ user.first_name }}!
{% else %}
  Hello there!
{% endif %}
```

### Related References

| Topic | Source |
|---|---|
| Liquid variable tags | Shopify Liquid docs — variable-tags |
| Liquid iteration tags | Shopify Liquid docs — iteration-tags |

---

*Note: This index entry had minimal source content. Expand with specific personalization attributes, content card schemas, or dynamic field examples relevant to the broader documentation set.*
