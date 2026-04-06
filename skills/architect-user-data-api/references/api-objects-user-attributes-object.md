---
name: api-objects-user-attributes-object
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/user_attributes_object
indexed_at: '2026-04-05'
keywords:
  - attributes
  - user
  - profile
  - identifiers
  - custom
  - array
  - increment
  - endpoint
  - push
  - alias
triggers:
  - how to update user attributes
  - manage user profile fields
  - set custom attributes
  - handle user identifiers
  - update array attributes
---
The `learn` skill doesn't apply here. Processing the documentation directly.

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" nested under `skills/{id}/references/` — they're optimized for fast semantic lookup, so removing boilerplate and preserving only actionable facts is exactly right
- The original doc has template literals like `{{site.baseurl}}` (Jekyll) that should be stripped since they won't resolve in a standalone topic file
`─────────────────────────────────────────────────`

---

## User Attributes Object

An API request with any fields in the attributes object creates or updates an attribute of that name on the specified user profile. Use Braze user profile field names to update reserved fields, or supply your own keys for custom attributes.

### Object Structure

```json
{
  // One identifier required (external_id, user_alias, braze_id, email, or phone)
  "external_id": "(string)",
  "user_alias": "(User alias object)",
  "braze_id": "(string)",
  "email": "(string)",
  "phone": "(string)",

  // Behavior flags
  "_update_existing_only": "(boolean) — Update Only mode; defaults true for user_alias",
  "push_token_import": "(boolean) — see Push Token Import section",

  // Braze profile fields
  "first_name": "Jon",
  "email": "bob@example.com",

  // Custom scalar attribute
  "my_custom_attribute": "value",

  // Increment a numeric attribute
  "my_custom_attribute_2": { "inc": 5 },

  // Set an array directly
  "my_array_custom_attribute": ["Value1", "Value2"],

  // Add to array
  "my_array_custom_attribute": { "add": ["Value3"] },

  // Remove from array
  "my_array_custom_attribute": { "remove": ["Value1"] },

  // Array of objects — set directly
  "my_array_of_objects_attribute": [{ "key": "value" }],

  // Array of objects — add items
  "my_array_of_objects_attribute": { "$add": [{ "key": "value" }] },

  // Array of objects — remove by identifier
  "my_array_of_objects_attribute": {
    "$remove": [{ "$identifier_key": "key", "$identifier_value": "value" }]
  }
}
```

To **delete** a profile attribute, set it to `null`. Note: `external_id` and `user_alias` cannot be removed once added.

---

### Identifier Rules

- **At least one identifier required** per object: `external_id`, `user_alias`, `braze_id`, `email`, or `phone`.
- Use **only one identifier per object** to avoid ambiguity.
- `external_id` and `user_alias` are **mutually exclusive** — including both returns an error.
- `email` takes precedence over `phone` when both are provided.
- To add an alias to a user who already has an `external_id`, use the `/users/alias/new` endpoint instead.

---

### `_update_existing_only`

| Value | Behavior |
|---|---|
| `true` | Only updates existing profiles; no new profiles created |
| `false` | Creates a new profile if `external_id` does not exist (default for `external_id`) |
| omitted for `user_alias` | Defaults to `true`; set to `false` to create an alias-only profile via `/users/track` |

---

### Push Token Import

Only needed if migrating from another system before Braze SDKs are in place. The SDK handles tokens automatically once active.

**For anonymous users (no `external_id` available):**
- Set `push_token_import: true`
- Do **not** include `external_id` or `braze_id`
- Object **must** contain a push token
- Braze creates a temporary anonymous profile per token

**Lifecycle:** When the user opens the Braze-enabled app, their imported token is merged into their real Braze profile and the temporary profile is removed. Anonymous profiles with `push_token_import: true` and no token are deleted on a monthly cleanup.

---

### Custom Attribute Data Types

| Type | Key Behavior |
|---|---|
| **Array** | Unique values only; new elements appended; max 500 elements (configurable in dashboard). Duplicates on import are deduplicated. |
| **Array of objects** | No item limit; max 100 KB total. Supports `$add`, `$remove`, `$update` operations. Update dropped silently if size exceeded. |
| **Boolean** | `true` or `false` |
| **Date** | ISO 8601 format required (e.g., `yyyy-MM-ddTHH:mm:ss:SSSZ`) |

**Array example — deduplication:**
```json
// Input
["hotdog", "hotdog", "hotdog", "pizza"]

// Stored
["hotdog", "pizza"]
```

**Array of objects example — add/remove:**
```json
// Add a hotel stay
"hotel_stays": { "$add": [{ "hotel_name": "Grand", "nights_stayed": 3 }] }

// Remove by identifier
"hotel_stays": {
  "$remove": [{ "$identifier_key": "hotel_name", "$identifier_value": "Grand" }]
}
```
