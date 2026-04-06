---
name: api-objects-filters
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/user_attributes_object
indexed_at: '2026-04-05'
keywords:
  - attributes
  - user
  - identifier
  - custom
  - push-token
  - arrays
  - profile
  - tracking
triggers:
  - update user attributes
  - set custom attributes
  - import push tokens
  - modify array values
  - create user profile
---
# User Attributes Object

An API request with any fields in the attributes object creates or updates an attribute with the given value on the specified user profile.

## Object Structure

```json
{
  // Identifier (one required): external_id, user_alias, braze_id, email, or phone
  "external_id": (optional, string),
  "user_alias": (optional, User alias object),
  "braze_id": (optional, string),
  "email": (optional, string),
  "phone": (optional, string),

  "_update_existing_only": (optional, boolean),  // true = update only, no creation
  "push_token_import": (optional, boolean),

  // Braze profile fields
  "first_name": "Jon",
  "email": "bob@example.com",

  // Custom attributes
  "my_custom_attribute": value,
  "my_custom_attribute_2": {"inc": int_value},         // numeric increment

  // Array operations
  "my_array": ["Value1", "Value2"],                    // set directly
  "my_array": {"add": ["Value3"]},                     // append
  "my_array": {"remove": ["Value1"]},                  // remove

  // Array of objects
  "my_array_of_objects": [{"key": "value"}],           // set directly
  "my_array_of_objects": {"$add": [{"key": "value"}]}, // append
  "my_array_of_objects": {"$remove": [{"$identifier_key": "key", "$identifier_value": "value"}]}
}
```

## Identifier Rules

- Exactly **one** identifier per object is recommended
- `external_id` and `user_alias` are **mutually exclusive** — use `/users/alias/new` to add an alias to an existing user
- `email` takes **precedence over** `phone` when both are present

To remove an attribute: set it to `null`. Note: `external_id` and `user_alias` **cannot** be removed once added.

## `_update_existing_only`

| Value | Behavior |
|-------|----------|
| `true` | Only updates existing profiles; never creates new ones |
| `false` (default) | Creates a new profile if `external_id` doesn't exist |
| omitted on alias-only creation | **Must** set to `false` to create alias-only profiles via `/users/track` |

When using `user_alias`, defaults to `true`.

## Push Token Import

Use `push_token_import: true` for anonymous users migrating from other systems without `external_id`:

- Do **not** include `external_id` or `braze_id`
- Attribute object **must** contain a push token
- Braze creates a temporary anonymous profile per token
- On first app launch, the token is merged into the user's real profile
- Unclaimed anonymous profiles (no push token after monthly check) are deleted

## Custom Attribute Data Types

| Type | Key Notes |
|------|-----------|
| **Array** | Max 500 elements (configurable in dashboard). Duplicate values are not stored. Use `add`/`remove` operators. |
| **Array of objects** | No item limit; max 100 KB total. Use `$add`, `$remove`, `$update`. Updates exceeding 100 KB are dropped silently. |
| **Boolean** | `true` or `false` |
| **Date** | ISO 8601 format (e.g., `yyyy-MM-ddTHH:mm:ss:SSSZ`) |
| **Numeric** | Use `{"inc": N}` to increment an existing number |

`★ Insight ─────────────────────────────────────`
**Identifier precedence design**: Braze's `email > phone` precedence for identifier resolution is a deliberate conflict-resolution rule — worth noting in topics because it's a silent source of attribute misrouting bugs.

**Array semantics quirk**: Arrays deduplicate values silently and cap at 500 (not documented in a warning). The "array of objects" type uses a completely different operator namespace (`$add`/`$remove` with `$` prefix) vs plain arrays (`add`/`remove` without `$`) — easy to mix up.
`─────────────────────────────────────────────────`
