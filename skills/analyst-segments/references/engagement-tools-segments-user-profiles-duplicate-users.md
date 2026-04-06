---
name: engagement-tools-segments-user-profiles-duplicate-users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/user_profiles/duplicate_users
indexed_at: '2026-04-05'
keywords:
  - duplicate
  - merge
  - profiles
  - bulk
  - identifiers
  - deduplication
  - audience
  - scheduled
  - API
  - rules
triggers:
  - merge duplicate profiles
  - find duplicate users
  - configure merge rules
  - bulk merge duplicates
  - schedule automatic merging
---
## Duplicate Users

Braze provides four methods to find and merge duplicate user profiles. **Merges are irreversible.**

---

### Individual Merging

Merge profiles one at a time from the dashboard.

1. Go to **Audience > User Search**
2. Search by unique identifier (email, phone number)
3. Select **Merge duplicates** on the profile page
4. Choose which profile to **keep** and which to **merge**, then confirm
5. Repeat for remaining duplicates

---

### Bulk Merging

Automatically merges all profiles sharing the same identifier into one.

**Merge target priority:**
1. Most recently updated profile **with** an `external_id`
2. If none have an `external_id`: most recently updated profile without one

**Steps:**
1. Go to **Audience > Manage Audience**
2. *(Optional)* Select **Generate list of duplicates** — Braze emails a CSV preview showing which profiles will be kept/merged
3. Select **Merge all duplicates** to execute

**Merge behavior:** Empty fields on the kept profile are filled with values from the merged profile.

---

### Rules-Based Merging

Control which profile is kept using configurable criteria.

**Configure at:** Audience > Manage Audience > **Edit rules**

| Setting | Options |
|---|---|
| **Identifier** (profile to keep) | Email address, Phone number |
| **Resolve ties by** | Created date, Updated date, Last session |
| **Prioritization** | Newest, Oldest |

**Example rule:** Keep profiles with a phone number; if tied, keep the most recently updated.

After saving rules, use **Generate a list of duplicates** to preview results before executing.

---

### Scheduled Merging

Automates rules-based merging on a daily cadence.

- Enable via the **Schedule** button on the Manage Audience page
- Braze assigns a daily timeslot at approximately **12 am** in the company's workspace timezone
- Workspace admins receive a **24-hour advance notification** before each scheduled merge
- Can be disabled at any time

---

### API Alternative

Use `POST /users/merge` to merge profiles programmatically via the REST API.
