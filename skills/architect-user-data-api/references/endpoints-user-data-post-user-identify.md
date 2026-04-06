---
name: endpoints-user-data-post-user-identify
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_user_identify
indexed_at: '2026-04-05'
keywords:
  - identify
  - users
  - merge
  - alias
  - profile
  - email
  - phone
  - external_id
  - prioritization
  - anonymous
triggers:
  - identify unidentified users
  - merge user profiles
  - link alias to external id
  - resolve user conflicts
  - convert anonymous to identified
---
## POST /users/identify

Identifies an unidentified user (alias-only, email-only, or phone-only) by merging their profile with an `external_id`-bearing profile, then removes the anonymous profile.

**Endpoint:** `POST https://rest.iad-01.braze.com/users/identify`

**Permission required:** `users.identify`

**Rate limit:** Standard users/identify limits apply.

---

## Request

```
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "aliases_to_identify": [...],
  "emails_to_identify": [...],
  "phone_numbers_to_identify": [...]
}
```

At least one of the three arrays is required per request. Up to 50 user aliases per request.

| Parameter | Required | Description |
|---|---|---|
| `aliases_to_identify` | Conditionally required | Array of alias-to-identify objects linking `external_id` + `user_alias` |
| `emails_to_identify` | Conditionally required | Array of objects with `external_id`, `email`, and `prioritization` |
| `phone_numbers_to_identify` | Conditionally required | Array of objects with `external_id`, phone, and `prioritization` |

### Prioritization (email/phone only)

When identifying by email or phone, include a `prioritization` array to resolve conflicts if multiple users match. Ordered array — if more than one user matches, merge does not occur.

Allowed values:
- `identified` — prefer user with `external_id`
- `unidentified` — prefer user without `external_id`
- `most_recently_updated`
- `least_recently_updated`

> If an email or phone matches multiple users, the merge is skipped and the endpoint returns `"message": "success"` silently.

---

## Merging Behavior

Fields from the anonymous profile merged into the identified profile (anonymous-exclusive fields only):

- Name, email, gender, DOB, phone, timezone, city, country, language
- Session count (summed), first session (earlier), last session (later)
- Custom attributes, custom events, purchase event data
- Custom/purchase event properties for segmentation (X times in Y days, X≤50, Y≤30)
- In-app purchase total (summed), purchase count (summed), first/last purchase dates
- App summaries (added if not present on target)
- `Last_X_at` fields (if orphaned profile is more recent)
- Campaign/workflow summaries (most recent date wins)
- Message engagement history

---

## Example Request

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/identify' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY' \
  --data-raw '{
    "aliases_to_identify": [
      {
        "external_id": "external_identifier",
        "user_alias": {
          "alias_name": "example_alias",
          "alias_label": "example_label"
        }
      }
    ],
    "emails_to_identify": [
      {
        "external_id": "external_identifier_2",
        "email": "john.smith@braze.com",
        "prioritization": ["unidentified", "most_recently_updated"]
      }
    ]
  }'
```

---

## Key Behaviors

- If no user exists with the given `external_id`, the external ID is added to the alias user's record (user becomes identified).
- A user can only have one alias per label. If the identified user already has an alias with the same label, profiles are **not** combined.
- Alias-only profile is removed after merge.

`★ Insight ─────────────────────────────────────`
The `prioritization` array uses an ordered-match-then-abort pattern: if more than one user matches from a prioritization rule, Braze aborts the merge entirely rather than guessing. This makes the array order matter only for *disambiguation*, not for ranking — it's a conflict resolver, not a preference list.
`─────────────────────────────────────────────────`
