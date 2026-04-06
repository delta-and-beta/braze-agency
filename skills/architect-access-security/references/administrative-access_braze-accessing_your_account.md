---
name: administrative-access_braze-accessing_your_account
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/accessing_your_account
indexed_at: '2026-04-05'
keywords:
  - login
  - authentication
  - SSO
  - account
  - dashboard
  - workspace
  - access
  - browser
  - password
triggers:
  - How do I log in to Braze?
  - How do I add new users?
  - How do I set up SSO?
  - How do I reset my password?
  - How do I troubleshoot dashboard issues?
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are optimized for fast lookup at the Default routing depth. The goal is to strip doc site scaffolding (Liquid template tags, image macros, internal cross-links) while keeping every fact an AI agent would need to answer a user question accurately.
`─────────────────────────────────────────────────`

## Accessing Your Braze Account

### Initial Account Setup

- **First user**: Receives a welcome email from `@alerts.braze.com` to confirm email and log in on the first day of the contract.
- **Subsequent users**: Must be added by a Braze admin via **Settings > Company Users**. Each new user receives a confirmation email from `@alerts.braze.com`.

### Logging In

Log in at `braze.com` or directly via your instance-specific dashboard URL.

**SSO options available:**
- SAML SSO (with optional just-in-time provisioning)
- Microsoft Entra SSO
- Okta
- OneLogin

> After logging in with SSO, password-based login is disabled for that account.

### Supported Browsers

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 87+            |
| Firefox | 85+            |
| Safari  | 15.4+          |
| Edge    | 87+            |

**Error: `ReferenceError: structuredClone is not defined`** — browser is outdated. Uninstall and reinstall the browser.

### Multiple Dashboard Access

Braze does not allow the same email address on multiple dashboard users **within the same cluster**. The same email can be used across different clusters (e.g., US-01 and US-05).

**Options for same-cluster access:**

1. **Gmail `+` aliases** — `rocky+1@gmail.com` routes to the same inbox but registers as a separate Braze account.
2. **Email forwarding aliases** — Set up `rocky@braze.com` to forward to `rocky.lotito@braze.com`; both are distinct to Braze.
3. **Multi-company developers** — A single user account shared across multiple companies; toggle between company dashboards from the user profile menu.
   - With SSO, requires enabling a **custom SAML Entity ID** (`braze_dashboard_<companyID>`) and the `saml_sso_custom_entity_id` feature flag (contact your CSM/AM).

### Troubleshooting

**Forgot password:** Use the "Forgot your password?" link on the login page to receive a reset email.

**Dashboard performance issues (not loading, slow segments):** Clear browser cache and cookies. Note: clearing cookies will log you out and unsaved work will be lost.

**"Please Refresh Page" / "Unexpected Error":** Usually means the user is not assigned to any workspace.
1. Go to **Settings > Company Users**.
2. Verify the user belongs to at least one workspace.
3. Add them to a workspace and assign permissions.
4. Have the user refresh the dashboard.

**Drag-and-drop editor not loading (VPN/firewall):** Allowlist `*.bz-rndr.com` via your IT administrator.
- *Transient errors* typically self-resolve.
- *Major errors* may be infrastructure issues — check `braze.statuspage.io`.

**Stuck login loop on Braze Learning:** Open a support ticket if the redirect loop persists after standard troubleshooting.
