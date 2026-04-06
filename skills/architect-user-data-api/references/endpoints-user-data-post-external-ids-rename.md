---
name: endpoints-user-data-post-external-ids-rename
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/external_id_migration/post_external_ids_rename
indexed_at: '2026-04-05'
keywords:
  - external_id
  - rename
  - migration
  - deprecate
  - user
  - identifier
  - bulk
  - cleanup
  - primary
triggers:
  - rename external ID
  - migrate external IDs
  - bulk rename users
  - deprecate external ID
  - external ID cleanup
---
## POST /users/external_ids/rename

Renames a user's external ID by setting a new primary `external_id` and deprecating the existing one. Up to 50 rename objects per request.

The user remains identifiable by either ID until the deprecated one is explicitly removed. Use [`/users/external_ids/remove`](https://www.braze.com/docs/api/endpoints/user_data/external_id_migration/post_external_ids_remove/) to clean up deprecated IDs once the old naming schema is retired.

> **Warning:** Do not use `/users/delete` with a deprecated external ID — it deletes the user profile entirely and cannot be undone.

**Required permission:** `users.external_ids.rename`
**Rate limit:** 1,000 requests/minute

---

### Request

```
POST https://rest.iad-01.braze.com/users/external_ids/rename
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "external_id_renames": [
    {
      "current_external_id": "existing_external_id",
      "new_external_id": "new_external_id"
    }
  ]
}
```

**Constraints:**
- `current_external_id` must be the user's **primary** ID (not a deprecated ID)
- `new_external_id` must not already exist as either a primary or deprecated ID
- `current_external_id` and `new_external_id` cannot be identical

---

### Response

```json
{
  "message": "success",
  "external_ids": ["new_external_id"],
  "rename_errors": []
}
```

`rename_errors` entries reference the index of the failed object in the original request array.

`message` returns an error (not `"success"`) when:
- API key is invalid
- `external_id_renames` is empty or exceeds 50 objects
- Rate limit exceeded

---

### Key Notes

- **No MAU impact** — user count is unchanged
- **Historical data preserved** — all past behavior stays linked to the user
- **No data points logged**
- Recommended: run a test migration on staging before executing on production
- No hard limit on deprecated ID retention, but remove them once no longer needed
