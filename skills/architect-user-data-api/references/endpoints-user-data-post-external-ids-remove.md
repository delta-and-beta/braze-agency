---
name: endpoints-user-data-post-external-ids-remove
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/external_id_migration/post_external_ids_remove
indexed_at: '2026-04-05'
keywords:
  - external_ids
  - users
  - deprecated
  - removal
  - delete
  - authentication
  - endpoint
  - cleanup
triggers:
  - remove external IDs
  - delete deprecated external IDs
  - clean up external identifiers
  - remove user identifiers
---
## POST /users/external_ids/remove

Removes deprecated external IDs from users. Irreversible — permanently removes the deprecated ID.

**Limit:** 50 external IDs per request.

**Warning:** Removing a deprecated ID still associated with users in your system can permanently prevent finding those users' data. Only deprecated IDs can be removed; attempting to remove a primary external ID returns an error.

### Prerequisites

API key with `users.external_ids.remove` permission.

**Rate limit:** 1,000 requests/minute.

### Request

```
POST https://rest.iad-01.braze.com/users/external_ids/remove
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "external_ids": ["deprecated_id_1", "deprecated_id_2"]
}
```

| Parameter | Required | Type | Description |
|---|---|---|---|
| `external_ids` | Required | Array of strings | Deprecated external IDs to remove. |

### Example

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/external_ids/remove' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "external_ids": [
      "existing_deprecated_external_id_string"
    ]
  }'
```

### Response

```json
{
  "message": "success",
  "removed_ids": ["id1", "id2"],
  "removal_errors": [[...]]
}
```

- `message`: `"success"` for valid requests; error string for invalid API key, empty array, >50 items, or rate limit exceeded.
- `removed_ids`: Successfully removed IDs.
- `removal_errors`: Arrays referencing the original request index for each failure.
