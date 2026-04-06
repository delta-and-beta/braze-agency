---
name: administrative-app_settings-internal_groups_tab
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/internal_groups_tab
indexed_at: '2026-04-05'
keywords:
  - groups
  - testing
  - users
  - events
  - preview
  - campaigns
  - seed
  - personalization
  - subscription
  - analytics
triggers:
  - Create internal groups
  - Add test users
  - Send message previews
  - Setup seed groups
  - Test message delivery
---
## Internal Groups

Internal groups organize test users for SDK/API testing and debugging. Up to 1,000 users per group, unlimited groups.

### Required Permissions

- View/Edit API Keys
- View/Edit Internal Groups
- View Message Activity Log, Event User Log, API identifiers, API Usage Dashboard, API Limits/Alerts
- Edit SDK Debugger, View SDK Debugger

### Creating an Internal Group

**Settings > Internal Groups > Create internal group**

| Group Type | Purpose |
|---|---|
| **User Event Group** | Verify events/logs from test devices |
| **Content Test Group** | Send rendered message previews across push, email, in-app, SMS, Content Cards |
| **Seed Group** | Auto-send copies of each email variant to all members |

### Adding Test Users

| Method | How |
|---|---|
| **Identified user** | Search by external user ID, email, phone, or push token |
| **Anonymous user** | Search by IP address; provide a name (used in Event User Log) |
| **Bulk add** | Paste list of emails or external IDs (dashboard-known users only) |

---

### Content Test Groups

- Available for push, in-app, SMS, email, and Content Cards
- Only groups tagged as Content Test Groups appear in message preview sections
- Liquid/dynamic personalization uses each user's attributes (falls back to default values)
- Can send previewed version (specific user's attributes) or per-user personalized versions
- For email: select IP pool from dropdown if using IP pools
- SMS test messages require valid phone numbers in the database

---

### Seed Groups

**Email channel only.** Sends copies of each email variant to all Seed Group members.

**Setup:** Select in **Target Audiences** step (campaigns) or **Send Settings** step (Canvas).

**Subject line:** `[SEED]` prepended automatically.

**Seed emails do NOT:**
- Increment dashboard send analytics
- Impact email analytics or retargeting
- Update user profile's Campaign Received list
- Apply to frequency capping
- Count against delivery speed rate limits

**Subscription behavior:** Intentionally bypass subscription checks — seeded users receive messages regardless of subscription status.

**API campaigns:** Seed Groups are not available for API campaigns directly; use API-triggered entry instead.

**Multivariate campaigns:** Seed Groups send to each variant once — on first delivery of that variant to any user.

> **Note:** If copying an existing campaign, Seed Groups do not carry over automatically. Manually apply them in **Target Audiences** of the copied campaign.

**Troubleshooting missing seed emails:** Confirm user is listed in the group, check for duplicate subject lines (Gmail threading), check spam folders.
