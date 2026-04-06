---
name: api-objects-aliases-to-identify
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/objects_filters/aliases_to_identify
indexed_at: '2026-04-05'
keywords:
  - aliases
  - identification
  - external_id
  - profile
  - merging
  - batch
  - association
  - user
  - API
triggers:
  - identify users by alias
  - merge alias profiles
  - link aliases to external ID
  - batch user identification
  - associate user aliases
---
## Aliases to Identify

Associates an anonymous user alias with a known external ID, merging the alias profile into the identified user profile.

### Object Structure

```json
{
  "aliases_to_identify": [
    {
      "external_id": "string",   // required — the known user ID
      "user_alias": {
        "alias_name": "string",  // required
        "alias_label": "string"  // required
      }
    }
  ]
}
```

### Key Facts

- **Purpose**: Links an existing alias-only profile to an `external_id`, enabling profile merging
- `external_id` must reference an existing user — if it doesn't exist, a **non-fatal error** is returned (request still processes other items)
- Both `alias_name` and `alias_label` are required to uniquely identify the alias
- Accepts an **array**, so multiple alias-to-user mappings can be resolved in a single request

### Behavior Notes

- A non-fatal error on a missing `external_id` means the batch continues — check server responses to detect partial failures
- The alias profile's data is merged into the identified user profile upon successful association
