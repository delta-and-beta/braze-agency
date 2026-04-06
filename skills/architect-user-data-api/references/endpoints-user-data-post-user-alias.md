---
name: endpoints-user-data-post-user-alias
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_users_alias_update
indexed_at: '2026-04-05'
keywords:
  - alias
  - aliases
  - update
  - user
  - rename
  - batch
  - endpoint
  - mapping
triggers:
  - update user aliases
  - rename user alias
  - bulk alias update
  - change alias name
---
## POST /users/alias/update

Update existing user aliases. Up to **50 user aliases** per request.

**Required permission:** `users.alias.update`

### Request

```
POST https://rest.iad-01.braze.com/users/alias/update
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "alias_updates": [
    {
      "alias_label": "example_alias_label",
      "old_alias_name": "example_old_alias_name",
      "new_alias_name": "example_new_alias_name"
    }
  ]
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `alias_updates` | Yes | Array of update user alias objects | Each object must include `alias_label`, `old_alias_name`, and `new_alias_name` |

### Update user alias object

| Field | Required | Description |
|-------|----------|-------------|
| `alias_label` | Yes | The label identifying the alias type |
| `old_alias_name` | Yes | Current alias name to replace |
| `new_alias_name` | Yes | Replacement alias name |

### Behavior

- If no alias matches `alias_label` + `old_alias_name`, no update occurs (silent no-op).
- If a match is found, `old_alias_name` is replaced with `new_alias_name`.
- Order of updates within `alias_updates` array is **not guaranteed**.

### curl Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/users/alias/update' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_REST_API_KEY' \
--data-raw '{
  "alias_updates": [
    {
      "alias_label": "example_alias_label",
      "old_alias_name": "example_old_alias_name",
      "new_alias_name": "example_new_alias_name"
    }
  ]
}'
```

`★ Insight ─────────────────────────────────────`
- The silent no-op behavior (no match = no error) is a key behavioral fact worth preserving — it affects how callers should detect failures.
- Stripping Jekyll templating tags (`{% apimethod %}`, `{% alert %}`, `{: .reset-td-br-1 ...}`) is the primary cleanup task for Braze docs; they're build-time directives with no runtime meaning.
- Flattening the two separate JSON blocks (request body + object spec) into a single example with inline field table reduces cognitive load for quick-reference use.
`─────────────────────────────────────────────────`
