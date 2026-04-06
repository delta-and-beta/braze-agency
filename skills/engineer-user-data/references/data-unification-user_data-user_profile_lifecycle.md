---
name: data-unification-user_data-user_profile_lifecycle
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/user_profile_lifecycle
indexed_at: '2026-04-05'
keywords:
  - profile
  - braze_id
  - external_id
  - anonymous
  - identified
  - merge
  - changeUser
  - aliases
  - attributes
triggers:
  - how to identify users
  - how to merge user profiles
  - how to assign external id
  - how to handle anonymous users
  - user lifecycle
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick are "atomic knowledge units" — they live inside `skills/{name}/references/` and are designed to be loaded per-query rather than all at once, so conciseness directly impacts routing efficiency
- The `{{site.baseurl}}` and Liquid template tags in Jekyll source docs are noise that should be stripped — they resolve to dead links in the compiled context
`─────────────────────────────────────────────────`

---

## User Profile Lifecycle

All persistent user data is stored in a **user profile**. Profiles are created either via the API or when the SDK first recognizes a user.

### Profile Identifiers

| Identifier | Description |
|------------|-------------|
| `braze_id` | Auto-assigned by Braze; device-specific; immutable; always present |
| `external_id` | Your system's user ID; use to link profiles across devices |
| `email` / `phone` | Standard contact identifiers |
| User aliases | Custom key-value pairs; unlimited per profile |

---

### Anonymous User Profiles

A user without an `external_id` is **anonymous**. Created automatically by the SDK on first recognition — assigned a `braze_id` immediately.

Common sources: website visitors who haven't signed up, app installs without account creation.

---

### Identified User Profiles

Assign an `external_id` when a user becomes recognizable (login, signup) using `changeUser()`:

- **Web:** `braze.changeUser(userId)`
- **iOS (Swift):** `Braze.changeUser(userId:)`
- **Android:** `IBraze.changeUser()`

**Benefits of `external_id`:**
- Same profile recognized across multiple devices/platforms
- Prevents duplicate profiles on reinstall or device change
- Enables API import of user data
- Enables user lookup in the Braze dashboard

**Security warning:** Do not use raw or hashed email addresses as `external_id` — they are guessable and exploitable (a malicious user could spoof another user's identity).

---

### Identifying Anonymous Users: Two Outcomes

**Scenario 1 — New external_id (not in Braze yet):**
The anonymous user *becomes* the identified user. All prior attributes and history are retained.

**Scenario 2 — Known external_id (already exists in Braze):**
Braze performs a merge:
1. The anonymous profile is **orphaned** (ineligible to receive messages)
2. Fields that are `null` on the identified profile are filled from the anonymous profile (for [specific mergeable fields](https://www.braze.com/docs/api/endpoints/user_data/post_users_merge/#merge-behavior))
3. Conflicting values: **identified user's values win**
4. The anonymous profile is removed from the user base

**What is NOT automatically merged:**
- Push tokens and messaging history are carried over
- Custom attributes, events, and purchase history from anonymous profile are only merged when those fields don't already exist on the identified profile

---

### User Aliases

Aliases let you reference users by identifiers beyond `braze_id` / `external_id`. They supplement (not replace) existing IDs.

**Structure:** Each alias is a key-value pair:
- `alias_label` — the key (e.g., `"email"`, `"shopify_id"`)
- `alias_name` — the value (e.g., `"user@example.com"`, `"12345"`)

**Rules:**
- `alias_name` must be unique per label across your user base
- No limit on number of aliases per profile
- Attempting to assign an existing label+name combination to a second profile silently fails

**Updating aliases:** Use the User Data API endpoint or SDK to assign a new `alias_name` for a given label.

**Anonymous user tagging:** Aliases can be set on anonymous profiles (e.g., capturing an email before signup). When the anonymous profile is later identified with an `external_id`, the aliases are retained on the identified profile.

---

### Key Rules Summary

| Rule | Detail |
|------|--------|
| Orphaned users | Cannot receive messages |
| Merge winner | Identified profile values always win on conflict |
| `braze_id` | Immutable; cannot be set or changed |
| Alias uniqueness | Scoped per `alias_label` across the workspace |
| Anonymous → identified | History preserved in both scenarios |

`★ Insight ─────────────────────────────────────`
- The table-heavy format works well here because topic files are scanned by vector search — structured tables with consistent terminology improve semantic retrieval accuracy vs. dense prose
- Stripping the `{% alert %}` / `{% multi_lang_include %}` Liquid tags while preserving their *content* (the warning about email-as-external-id, the merge behavior note) is the key pre-processing judgment call — navigation scaffolding is noise, but the warnings themselves are signal
`─────────────────────────────────────────────────`
