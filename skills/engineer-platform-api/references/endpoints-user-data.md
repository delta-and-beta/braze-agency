---
name: endpoints-user-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_users_merge
indexed_at: '2026-04-05'
keywords:
  - merge
  - users
  - identifier
  - deduplication
  - external_id
  - email
  - phone
  - asynchronous
  - endpoint
triggers:
  - merge users
  - merge one user into another
  - deduplicate user profiles
  - merge by external ID
  - identify and merge users
---
# User Merge Endpoint (`POST /users/merge`)

Merges one user into another. Up to 50 merges per request. **Asynchronous** — sequence of updates is not guaranteed.

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
      "identifier_to_merge": { "external_id": "old-user1" },
      "identifier_to_keep": { "external_id": "current-user1" }
    }
  ]
}
```

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `merge_updates` | Required | Array of objects | Each object has `identifier_to_merge` and `identifier_to_keep`. Each identifier references a user by `external_id`, `user_alias`, `phone`, or `email`. |

## Identifier Types

Users can be identified by:
- `external_id`
- `user_alias` (object with `alias_name` + `alias_label`)
- `email`
- `phone`

**For `email` or `phone` identifiers**, a `prioritization` array is required:

```json
{
  "email": "user@example.com",
  "prioritization": ["unidentified", "most_recently_updated"]
}
```

Prioritization values: `identified`, `unidentified`, `most_recently_updated`, `least_recently_updated`. Only one of `identified`/`unidentified` may appear at a time. If multiple users match and none can be disambiguated to one, the merge does not occur.

## Merge Behavior

Fields are merged from source → target **only if not already present on target**:

- First/last name, email, gender, DOB, phone, timezone, city, country, language
- Device information
- Session count (sum), first session (earlier date), last session (later date)
- Custom attributes (target keeps existing; new attributes from source are added)
- Custom event + purchase event data
- "X times in Y days" segmentation properties (X≤50, Y≤30)
- Segmentable custom events summary (count sum, earliest first occurred, latest last occurred)
- In-app purchase total (sum), total purchases (sum), first/last purchase dates
- App summaries, `Last_X_at` fields (more recent wins), campaign interaction data, workflow summaries
- Message and message engagement history
- Session data only if app exists on both profiles

> **Snowflake exception:** Merges are **not** reflected in Messaging History tab, Segment Extensions, Query Builder, or Currents.

## Example Requests

### By external ID
```bash
curl -X POST 'https://rest.iad-01.braze.com/users/merge' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_REST_API_KEY' \
  -d '{
    "merge_updates": [
      {
        "identifier_to_merge": { "external_id": "old-user1" },
        "identifier_to_keep": { "external_id": "current-user1" }
      }
    ]
  }'
```

### Merge unidentified user by email into identified user
```bash
curl -X POST 'https://rest.iad-01.braze.com/users/merge' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_REST_API_KEY' \
  -d '{
    "merge_updates": [
      {
        "identifier_to_merge": {
          "email": "john.smith@braze.com",
          "prioritization": ["unidentified", "most_recently_updated"]
        },
        "identifier_to_keep": {
          "external_id": "john"
        }
      }
    ]
  }'
```

### By user alias
```bash
"identifier_to_merge": {
  "user_alias": {
    "alias_name": "old-user@example.com",
    "alias_label": "email"
  }
}
```

## Key Constraints

- Max **50 merges per request**
- Endpoint is **asynchronous** (update order not guaranteed)
- Behavior is equivalent to calling `changeUser()` in the Web SDK
- Email merges will not merge [encrypted email fields](https://www.braze.com/docs/user_guide/data/field_level_encryption/)
