---
name: api-objects-purchase-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/purchase_object'
indexed_at: '2026-04-05'
keywords:
  - purchase
  - tracking
  - product_id
  - properties
  - revenue
  - currency
  - quantity
  - segmentation
  - orders
triggers:
  - how to track purchases
  - how to structure purchase objects
  - how to set purchase properties
  - how to calculate revenue
  - how to log orders
---
## Purchase Object

A purchase object represents a single purchase by a user at a specific time. Purchase objects are passed to the `/users/track` endpoint inside a `purchases` array.

### Object Structure

```json
{
  "external_id" : "(optional, string) — required if no user_alias, braze_id, email, or phone",
  "user_alias" : "(optional, User Alias Object)",
  "braze_id" : "(optional, string)",
  "email"     : "(optional, string) — takes precedence over phone if both provided",
  "phone"     : "(optional, string)",
  "app_id"    : "(optional, string)",
  "product_id": "(required, string) — max 255 chars; up to 5,000 unique values",
  "currency"  : "(required, string) — ISO 4217 alphabetic code, e.g. 'USD'",
  "price"     : "(required, float) — in base currency unit",
  "quantity"  : "(optional, integer) — defaults to 1, max 100",
  "time"      : "(required, ISO 8601 datetime string)",
  "properties": "(optional, object) — key/value property bag",
  "_update_existing_only": "(optional, boolean) — Update Only mode; always true with user_alias"
}
```

> Revenue = `price × quantity`. Braze currently treats quantity X as X separate purchases of quantity 1.

### product_id Conventions

- Use human-readable names (product name or category), not SKUs
- Group similar items under one `product_id` to enable segmentation and trigger logic
- For **order-level** logging, use order names like `"Completed Order"` as the `product_id` and embed line items in `properties`

**Order-level example:**
```json
{
  "external_id": "user1",
  "app_id": "11ae5b4b-2445-4440-a04f-bf537764c9ad",
  "product_id": "Completed Order",
  "currency": "USD",
  "price": 219.98,
  "time": "2013-07-16T19:20:30+01:00",
  "properties": {
    "products": [
      { "name": "Monitor", "category": "Gaming", "product_amount": 19.99 },
      { "name": "Gaming Keyboard", "category": "Gaming", "product_amount": 199.99 }
    ]
  }
}
```

### Properties Object

| Data Type | Notes |
|-----------|-------|
| Numbers | Integer or float |
| Booleans | `true` / `false` |
| Datetimes | ISO-8601 string; not supported inside arrays |
| Strings | Max 255 characters |
| Arrays | Cannot contain datetimes |
| Objects | Ingested as strings |

- Property name rules: non-empty string, ≤ 255 chars, no leading `$`
- Max payload for array/object property values: **50 KB**
- Properties support Liquid personalization, message triggering, and segmentation
- Properties are scoped **per product**, not per purchase — use group-level names (e.g. `"single trip"`, not `"transaction_046"`)

### Full Example

```json
POST /users/track
{
  "purchases": [
    {
      "external_id": "user1",
      "app_id": "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id": "backpack",
      "currency": "USD",
      "price": 40.00,
      "time": "2013-07-16T19:20:30+01:00",
      "properties": {
        "color": "red",
        "monogram": "ABC",
        "checkout_duration": 180,
        "size": "Large",
        "brand": "Backpack Locker"
      }
    },
    {
      "external_id": "user1",
      "app_id": "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id": "pencil",
      "currency": "USD",
      "price": 2.00,
      "time": "2013-07-17T19:20:20+01:00",
      "properties": { "number": 2, "sharpened": true }
    },
    {
      "user_alias": { "alias_name": "device123", "alias_label": "my_device_identifier" },
      "app_id": "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id": "pen",
      "currency": "USD",
      "price": 2.50,
      "time": "2013-07-17T19:20:20+01:00",
      "properties": { "color": "blue" }
    }
  ]
}
```

### Key Limits & Behaviors

| Constraint | Value |
|------------|-------|
| Unique `product_id`s | 5,000 max |
| `product_id` length | 255 chars max |
| `quantity` range | 1–100 |
| Property name length | 255 chars max |
| Properties payload (arrays/objects) | 50 KB max |

- New `product_id`s sent via `/users/track` are automatically created under **Data Settings > Products** in the dashboard
- `email` takes precedence over `phone` when both are provided as identifiers

`★ Insight ─────────────────────────────────────`
- The order-level logging pattern (embedding line items in `properties`) is a powerful workaround for the 5,000 `product_id` cap — it keeps the cardinality low while preserving full line-item detail
- The `quantity` field is currently a no-op for revenue math (treated as X separate purchases), so pass accurate `price` for the full quantity if revenue reporting matters
- The `_update_existing_only` flag is implicitly `true` when using `user_alias`, which prevents ghost profile creation from alias-based purchase events
`─────────────────────────────────────────────────`
