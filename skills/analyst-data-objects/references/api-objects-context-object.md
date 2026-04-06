---
name: api-objects-context-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/context_object'
indexed_at: '2026-04-05'
keywords:
  - context
  - canvas
  - API
  - variables
  - templates
  - customization
  - scheduling
  - triggering
  - Liquid
  - payload
triggers:
  - how to customize canvas messages
  - pass context to canvas API
  - use context variables in templates
  - customize message templates with data
  - send context data via API request
---
## Canvas Context Object

A key-value map for customizing messages in the first steps of a Canvas, passed via the `context` namespace in API requests for triggering or scheduling.

**Size limit:** 50 KB maximum.

### Structure

```json
"context": {
  "product_name": "shoes",
  "product_price": 79.99
}
```

### Usage

Reference context values in message templates using Liquid syntax:

```
{{context.${product_name}}}
```

**Example:** Passing `"context": {"product_name": "shoes", "product_price": 79.99}` in the API request makes `{{context.${product_name}}}` render as `shoes` in the message template.
