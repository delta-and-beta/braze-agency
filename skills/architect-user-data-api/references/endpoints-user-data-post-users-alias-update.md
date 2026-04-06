---
name: endpoints-user-data-post-users-alias-update
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_users_alias_update
indexed_at: '2026-04-05'
keywords:
  - aliases
  - update
  - users
  - identity
  - batch
  - rename
  - endpoint
  - REST
triggers:
  - update user aliases
  - rename user alias
  - change alias name
  - batch update aliases
  - how to update existing aliases
---
## POST /users/alias/update

Update existing user aliases. Up to **50 user aliases** per request.

**Permission required:** `users.alias.update`

---

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
| `alias_updates` | Yes | Array of update user alias objects | Array of objects, each with `alias_label`, `old_alias_name`, `new_alias_name` |

### Update User Alias Object

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `alias_label` | Yes | String | The label identifying the alias type |
| `old_alias_name` | Yes | String | Current alias value to be replaced |
| `new_alias_name` | Yes | String | New alias value to replace the old one |

---

### Behavior

- All three fields (`alias_label`, `old_alias_name`, `new_alias_name`) must be present per object
- If no alias matches `alias_label` + `old_alias_name`, **no update occurs** (silent no-op)
- Order of updates within `alias_updates` array is **not guaranteed**

---

### Example — curl

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
