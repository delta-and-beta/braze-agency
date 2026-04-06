---
name: api-objects-trigger-properties-object
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/trigger_properties_object
indexed_at: '2026-04-05'
keywords:
  - trigger
  - properties
  - api
  - campaign
  - templating
  - namespace
  - payload
  - delivery
triggers:
  - how to use trigger properties
  - passing data to API campaigns
  - templating trigger properties in messages
  - customize campaign messages with API data
---
## Trigger Properties Object

Pass key-value pairs to customize campaign messages via API-triggered delivery using the `trigger_properties` object.

**Scope:** Campaigns only. For Canvas, use the [Canvas Entry Properties Object](https://www.braze.com/docs/api/objects_filters/canvas_entry_properties_object/) instead.

**Size limit:** 50 KB maximum.

### Usage

Values in `trigger_properties` are accessible in message templates via the `api_trigger_properties` namespace:

```liquid
{{api_trigger_properties.${product_name}}}
```

> Trigger properties can be templated into messages but are **not** stored in the user profile by default.

### Object Schema

```json
{
  "trigger_properties": {
    "product_name": "shoes",
    "product_price": 79.99,
    "details": {
      "color": "red",
      "size": {
        "numerical": 10,
        "country": "US"
      }
    },
    "related_skus": ["123", "456", "789"]
  }
}
```

### Key Facts

| Property | Detail |
|---|---|
| Namespace in templates | `api_trigger_properties` |
| Supports nested objects | Yes |
| Supports arrays | Yes |
| Persisted to user profile | No (by default) |
| Max size | 50 KB |
| Scope | Campaigns only |
