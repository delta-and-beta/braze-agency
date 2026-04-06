---
name: endpoints-user-data-post-users-merge
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_users_merge
indexed_at: '2026-04-05'
keywords:
  - merge
  - users
  - profiles
  - identifiers
  - async
  - prioritization
  - deduplication
  - attributes
  - sessions
triggers:
  - how to merge user profiles
  - merge duplicate users
  - combine user profiles
  - consolidate user data
  - resolve duplicate identities
---
# POST /users/merge

Merges one user profile into another. Up to 50 merges per request. **Asynchronous.**

**Required permission:** `users.merge`

## Request

```
POST https://rest.iad-01.braze.com/users/merge
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "merge_updates": [
    {
      "identifier_to_merge": { "external_id": "old-user" },
      "identifier_to_keep":  { "external_id": "current-user" }
    }
  ]
}
```

### Identifier types

Each `identifier_to_merge` and `identifier_to_keep` can reference a user by:
- `external_id`
- `user_alias` (`{ "alias_name": "...", "alias_label": "..." }`)
- `email`
- `phone`

### Email / phone prioritization (required when using email or phone)

Include a `prioritization` array to resolve ambiguity when multiple users match:

```json
{
  "email": "user@example.com",
  "prioritization": ["unidentified", "most_recently_updated"]
}
```

Allowed values (only one of `identified`/`unidentified` at a time):
- `identified` — user with an `external_id`
- `unidentified` — user without an `external_id`
- `most_recently_updated`
- `least_recently_updated`

If more than one user matches after prioritization, the merge does **not** occur.

## Merge behavior

Fields are copied from the source profile **only if not already present on the target**. Exceptions (summed/selected) noted below:

| Field | Behavior |
|---|---|
| First/last name, gender, DOB, timezone, city, country, language | Copied if missing on target |
| Email addresses | Copied if missing (unless field-level encrypted) |
| Phone number, device info | Copied if missing |
| Session count | Summed |
| First session date | Earlier of the two |
| Last session date | Later of the two |
| Custom attributes | Target keeps existing; non-overlapping attrs added from source |
| Custom event & purchase data | Merged |
| Event count | Summed |
| Event first occurred | Earlier date |
| Event last occurred | Later date |
| In-app purchase total (cents) | Summed |
| Total purchases | Summed |
| First/last purchase date | Earlier / later respectively |
| Campaign interaction data | Most recent date fields |
| `Last_X_at` fields | Updated if source fields are more recent |
| Session data | Merged only if the app exists on both profiles |

> **Note:** Merge order within a request is **not guaranteed**.
>
> Merge results are **not** reflected in: Messaging History tab, Segment Extensions, Query Builder, or Currents.

## Example requests

### By external_id
```bash
curl --request POST 'https://rest.iad-01.braze.com/users/merge' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_REST_API_KEY' \
--data-raw '{
  "merge_updates": [
    {
      "identifier_to_merge": { "external_id": "old-user1" },
      "identifier_to_keep":  { "external_id": "current-user1" }
    }
  ]
}'
```

### By email with prioritization
```bash
--data-raw '{
  "merge_updates": [
    {
      "identifier_to_merge": {
        "email": "user1@braze.com",
        "prioritization": ["unidentified", "most_recently_updated"]
      },
      "identifier_to_keep": {
        "email": "user2@braze.com",
        "prioritization": ["identified", "most_recently_updated"]
      }
    }
  ]
}'
```

### Merge unidentified into identified (same email)
```bash
--data-raw '{
  "merge_updates": [
    {
      "identifier_to_merge": {
        "email": "john.smith@braze.com",
        "prioritization": ["unidentified", "most_recently_updated"]
      },
      "identifier_to_keep": {
        "email": "john.smith@braze.com",
        "prioritization": ["identified", "most_recently_updated"]
      }
    }
  ]
}'
```

### By user alias
```bash
--data-raw '{
  "merge_updates": [
    {
      "identifier_to_merge": {
        "user_alias": { "alias_name": "old-user@example.com", "alias_label": "email" }
      },
      "identifier_to_keep": {
        "user_alias": { "alias_name": "current-user@example.com", "alias_label": "email" }
      }
    }
  ]
}'
```

## Key caveats

- Omitting `most_recently_updated` from prioritization when multiple matching users exist will cause the merge to **silently skip** — no error, no merge.
- Equivalent to calling `changeUser()` in the Web SDK.
- Rate limits apply; see Braze rate limit docs for `users merge`.
