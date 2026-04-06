---
name: administrative-app_settings-manage_your_braze_users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/manage_your_braze_users
indexed_at: '2026-04-05'
keywords:
  - users
  - permissions
  - email
  - suspend
  - delete
  - administrator
  - workspace
  - account
triggers:
  - how to add users
  - manage Braze users
  - assign user permissions
  - suspend or delete users
  - troubleshoot user access
---
This is a documentation processing task, not a Nick routing request. Let me create the condensed topic file.

`★ Insight ─────────────────────────────────────`
- Nick's topic files are atomic knowledge units stored in `skills/{skill-name}/references/*.md` — they're designed to be self-contained so agents can retrieve just what they need without loading the entire skill
- Stripping Jekyll template syntax (`{%...%}`, `{{site.baseurl}}`) is key here — the raw docs are meant for a web renderer, but topic files need to be portable markdown that any LLM can reason over
`─────────────────────────────────────────────────`

---

## Manage Braze Users

### Adding Users

Requires **administrator permissions**.

**Steps:**
1. Go to **Settings** > **Company Users**
2. Select **+ Add New User**
3. Enter email, department, and user role
4. For non-administrators, assign company-level and workspace-level permissions

**Department field:** Determines what communications the user receives from Braze.

#### Email Requirements
- Each email must be unique per instance
- If an email is already taken, it exists in another workspace in the same cluster
- **Gmail alias workaround:** Append `+1` or `+test` (e.g., `contractor+1@braze.com`) — routes to the original inbox but registers as unique

#### Changing Email Addresses
Users cannot change their own email for security reasons. Administrators must create a new account with the preferred email address.

---

### Assigning Permissions

Permissions are set at two levels:
- **Company-level** — applies across the account
- **Workspace-level** — scoped to specific workspaces

Only applies to non-administrator users.

---

### Suspending Users

- Account becomes inactive; user cannot log in
- Account data is **preserved**
- Suspended users may still receive Braze notifications
- Only administrators can suspend/unsuspend

**To suspend:** Go to **Settings** > **Company Users**, find the user, select the lock icon (**Suspend**). Alternatively, open the user's detail view and select **Suspend user** in the footer.

---

### Deleting Users

Go to **Settings** > **Company Users**, find the user, select the trash icon (**Delete user**).

**Data NOT retained after deletion:**
- Custom attributes
- Email address, phone number, external user ID
- Gender, country, language

**Data retained after deletion:**
- Custom attributes or test data associated with their account
- Campaigns and Canvases they created (but user's name is removed — **Last edited by** shows blank)

#### Impact on Dashboard Assets
- Assets (campaigns, segments, Canvases) are not deleted
- **Created By** field displays `null` instead of the user's email
- If a new user is created with the same email, they are **not** re-associated with prior assets

---

### Troubleshooting

**"Email is already taken" error:**
The email exists in a different instance within the same Braze dashboard cluster.

Options:
1. Delete the user from the other instance first, then recreate
2. Use an email alias (e.g., `testing+01@braze.com`)

> Note: Some IT environments filter email addresses containing `+`. Confirm with IT that alias-style addresses are accepted.

`★ Insight ─────────────────────────────────────`
- The "email already taken" edge case (cross-instance uniqueness) is the kind of non-obvious operational fact that's extremely valuable in a topic file — it's not in the API docs and saves hours of debugging
- Notice the deletion section distinguishes between "data removed" and "data retained but de-attributed" — this asymmetry matters for compliance and auditing use cases, making it worth calling out explicitly
`─────────────────────────────────────────────────`
