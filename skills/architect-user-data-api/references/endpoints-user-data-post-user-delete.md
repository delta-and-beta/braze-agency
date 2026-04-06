---
name: endpoints-user-data-post-user-delete
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_user_delete
indexed_at: '2026-04-05'
keywords:
  - delete
  - users
  - identifiers
  - async
  - prioritization
  - external_ids
  - braze_ids
  - bulk
  - removal
  - troubleshooting
triggers:
  - how to delete users
  - remove user profiles
  - bulk user deletion
  - confirm user deletion
  - delete by email or phone
---
## POST /users/delete

Permanently deletes user profiles. **This action cannot be undone.**

**Endpoint:** `POST https://rest.iad-01.braze.com/users/delete`  
**Permission required:** `users.delete`

### Limits

- Max 50 identifiers per request
- Only one identifier type per request (can't mix `external_ids` and `braze_ids` in the same request)

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "external_ids": ["external_identifier1", "external_identifier2"],
  "braze_ids": ["braze_identifier1", "braze_identifier2"],
  "user_aliases": [
    { "alias_name": "user_alias1", "alias_label": "alias_label1" }
  ],
  "email_addresses": [
    {
      "email": "john.smith@braze.com",
      "prioritization": ["unidentified", "most_recently_updated"]
    }
  ],
  "phone_numbers": ["+15555555555"]
}
```

| Parameter | Required | Type | Description |
|---|---|---|---|
| `external_ids` | Optional | Array of strings | External IDs to delete |
| `user_aliases` | Optional | Array of user alias objects | User aliases to delete |
| `braze_ids` | Optional | Array of strings | Braze user identifiers to delete |
| `email_addresses` | Optional | Array of objects | Emails to delete — requires `prioritization` field |
| `phone_numbers` | Optional | Array of strings | Phone numbers to delete — requires `prioritization` field |

### Email/Phone Prioritization

When deleting by email or phone, a `prioritization` array is **required** to resolve ambiguous matches. If multiple users match and none is resolved by the prioritization, deletion does not occur.

Allowed values (only one of the first two may appear at a time):
- `identified` — prefer users with an `external_id`
- `unidentified` — prefer users without an `external_id`
- `most_recently_updated` — prefer the most recently updated user

### Response

```json
{
  "deleted": 3
}
```

The `deleted` count reflects the number of user IDs **queued** for deletion, not yet confirmed deleted.

### Troubleshooting

**Deletion is async** — success response means queued, not complete. Propagation typically takes under a second but can take up to 5 minutes. Searching the dashboard immediately after may still show the user.

**User still appears after several minutes** — verify identifier accuracy:
- `external_ids`: must match exactly
- `braze_id`: retrieve via `/users/export/ids` endpoint or CSV segment export (column labeled "Appboy ID")
- Alias-only or email-only profiles: segment on **External User ID is blank** + known email/phone, export to CSV to get `braze_id`

**Confirm deletion** by calling `/users/export/ids` with the same identifier. A deleted user returns `"users": []` and the identifier appears in `"invalid_user_ids"`.
