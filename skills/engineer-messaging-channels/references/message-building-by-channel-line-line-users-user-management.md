---
name: message-building-by-channel-line-line-users-user-management
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/line_users/user_management
indexed_at: '2026-04-05'
keywords:
  - line
  - native_line_id
  - webhook
  - subscription
  - profile
  - csv
  - alias
  - syncer
  - merging
  - engagement
triggers:
  - how to set LINE user ID
  - managing LINE user profiles
  - linking LINE followers to profiles
  - resolving duplicate LINE profiles
  - uploading LINE users via CSV
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline serve as atomic knowledge units nested inside `skills/{id}/references/`. The goal is high signal-to-noise: strip Jekyll templating (`{% ... %}`), relative links, and image references, while keeping the factual core intact for embedding and retrieval.
`─────────────────────────────────────────────────`

## LINE User Management

LINE user IDs are stored on the `native_line_id` user profile attribute. Braze uses this attribute to identify recipients when sending LINE messages, and to look up profiles when LINE sends webhook events (follows, replies, etc.).

**Important:** LINE user IDs are provider-scoped — a user has a different ID for each LINE provider/brand they follow. Users typically don't know their own LINE ID.

---

## Setting `native_line_id`

| Scenario | Profile exists? | Outcome |
|---|---|---|
| User follows a LINE channel | No | Anonymous profile created: `native_line_id` set, `line_id` alias set, user subscribed to channel's subscription group |
| User follows a LINE channel | Yes | All matching profiles subscribed to the channel's subscription group |
| CSV upload with `native_line_id` column | No | Profile created with `native_line_id` and all other CSV attributes |
| CSV upload with `native_line_id` column | Yes | `native_line_id` updated; all CSV attributes applied; note: multiple profiles may share same `native_line_id` |
| `/users/track` with `native_line_id` attribute | No | Profile created with `native_line_id` and all request attributes |
| `/users/track` with `native_line_id` attribute | Yes | `native_line_id` updated; all request attributes applied; note: multiple profiles may share same `native_line_id` |
| Subscription status syncer run | No | Anonymous profile created: `native_line_id` set, `line_id` alias set, subscribed to subscription group. Duplicates possible if user profile is created later — use user merging to resolve |
| Subscription status syncer run | Yes | Matching profile subscribed to the channel's subscription group |

`/users/track` identifies users by `external_id`, `user_alias`, `braze_id`, or `email`.

---

## Finding `native_line_id` in the Dashboard

**Path:** User Profile → **Engagement** tab → **Contact Settings** → **LINE** section → **LINE User ID**

If `native_line_id` is not set, the field does not appear.

---

## Key Behaviors

- **Anonymous profiles** are created on first follow if no profile exists; these require merging to link to identified users later.
- **Duplicate profiles** can occur via CSV upload, `/users/track`, or the subscription syncer if the same LINE ID ends up on multiple profiles — user merging resolves this.
- **Subscription group enrollment** happens automatically on follow events and syncer runs.
