---
name: onboarding-faq
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/onboarding_faq'
indexed_at: '2026-04-05'
keywords:
  - braze_id
  - aliases
  - external_id
  - import
  - subscription
  - segments
  - duplicates
  - API
  - anonymous
triggers:
  - How to import users
  - Handling duplicate profiles
  - Creating segments from CSV
  - Tracking anonymous users
  - Managing push subscriptions
---
# Onboarding FAQ

## Anonymous User Data

When the SDK first recognizes a user, Braze creates an anonymous profile with a `braze_id` (Braze-assigned unique identifier).

**Tracking anonymous users:**
- Implement [user aliases](https://www.braze.com/docs/user_guide/data_and_analytics/user_data_collection/user_profile_lifecycle#user-aliases) to tag anonymous users with a custom identifier
- Alias users can be exported or referenced via API

**When an anonymous alias user is later identified:**
- They become a normal identified user profile
- Their alias is retained and remains referenceable

**Merging alias users into identified profiles:**
1. Export alias profile data via `/users/export/ids`
2. Delete unwanted fields from the alias profile
3. Post retained data to the target profile via `/users/track`

---

## Importing Previously Identified Users

### CSV Import
- Navigate to **Audience > Import Users**
- Each row requires `external_id` (the unique identifier your team uses internally)
- Braze will update an existing profile if `external_id` matches, or create a new one if not
- Download templates from the [user import docs](https://www.braze.com/docs/user_guide/data_and_analytics/user_data_collection/user_import/#csv)

### API Import
- Use `/users/track` to import users
- Use `/users/export/ids` to check if a user already exists before importing

**Key `/users/track` nuances:**
- To create alias-only users, set `_update_existing_only: false`
- Updating subscription status by `external_id` also updates all users sharing that email

---

## Push Subscription Statuses

| State | Description |
|---|---|
| **Subscribed** | Default state when a profile is created |
| **Opted-In** | User explicitly accepted an OS-level push prompt (Android 13+ only) |
| **Unsubscribed** | User explicitly opted out via app or brand-provided method |

By default, campaigns target `Subscribed` or `Opted-In` users who are push-enabled. This can be overridden per message.

---

## Handling Duplicate Users

**Steps to resolve duplicates:**

1. Export profiles using `/users/export/ids`
2. Determine which profile to keep (team decision)
3. Merge relevant fields to the kept profile via `/users/track`
4. Delete the duplicate via `/users/delete` — **deletion is permanent and irreversible**

**Important:**
- Import corrected profiles with proper `external_id` **before** deleting
- Engagement data (campaigns, Canvases) on deleted profiles is lost — preserve it as a custom attribute array if needed
- Review your sign-up flow to ensure `changeUser()` is only called when a user becomes identified

---

## Creating a Segment from a CSV Import

1. Go to **Audience > Import Users**
2. Select your CSV file
3. Before clicking **Start Import**, select:
   - *"Import Users in this CSV and also make it possible to retarget this specific batch of users as a group"*
   - *"Automatically generate a segment from the users who are imported from this CSV"*
4. Click **Start Import** — Braze validates headers, data types, and creates the segment automatically
