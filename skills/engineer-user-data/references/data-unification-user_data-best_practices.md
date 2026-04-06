---
name: data-unification-user_data-best_practices
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/best_practices
indexed_at: '2026-04-05'
keywords:
  - profiles
  - alias
  - external_id
  - tracking
  - merging
  - identify
  - duplicates
  - email
  - attributes
triggers:
  - How to collect user data
  - Avoid duplicate profiles
  - Merge user profiles
  - Create alias-only profiles
  - Identify unidentified users
---
## User Data Best Practices

### Overview

When collecting user data, verify if the data already exists before creating new profiles. Profile merging must be handled carefully to avoid overwriting alias-only or anonymous data.

---

### Web Form Data Collection Flow

#### Step 1: Check if user exists

Two methods:
- **Internal database check (recommended):** Reference your external records at submission time
- **`/users/track` endpoint:** Use `email` as identifier — creates a new profile only if the email doesn't exist

#### Step 2: Log or update

| Scenario | Action |
|----------|--------|
| User exists | Log a custom attribute (e.g., `newsletter_subscribed: true`). Do NOT create a new profile. Note: all profiles sharing the same email will be exported. |
| User doesn't exist | Create an alias-only profile via `/users/track` with `update_existing_only: false`. Set email as the `user_alias` — this becomes the reference since no `external_id` exists yet. |

**`/users/track` alias-only creation example:**
```json
{
  "attributes": [{
    "user_alias": { "alias_name": "user@example.com", "alias_label": "email" },
    "email": "user@example.com",
    "_update_existing_only": false
  }]
}
```

---

### Identifying Alias-Only Users

When a user creates an account, merge their alias-only profile with a known profile using `/users/identify`.

**Decision tree:**
1. Check if user exists in your database
2. If external record exists → call `/users/identify/`
3. If `/users/export/id` returns an `external_id` → call `/users/identify/`
4. If endpoint returns nothing → do NOT call `/users/identify/`

---

### Merging Duplicate Profiles

Two methods:
- **Dashboard:** Find duplicates via the same search query → Merge profiles UI
- **API:** `POST /users/merge` to merge one profile into another

> **Warning:** Profile merges are irreversible. For mergeable fields, see the Merge updates behavior docs.

---

### Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /users/track` | Create/update user profiles; create alias-only profiles |
| `POST /users/identify` | Assign `external_id` to alias-only user |
| `POST /users/merge` | Merge duplicate profiles |
| `POST /users/export/id` | Check if user has an `external_id` |

---

### Best Practices Summary

- Always check for existing users before creating profiles
- Use alias-only profiles (keyed by email) for unidentified users
- Set email as `user_alias` so you can reference the user before they have an `external_id`
- Merge alias profiles at account creation using `/users/identify`
- Never call `/users/identify` if the user doesn't exist in Braze
