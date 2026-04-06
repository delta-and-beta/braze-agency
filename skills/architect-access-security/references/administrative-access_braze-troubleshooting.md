---
name: administrative-access_braze-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - lockout
  - password
  - authentication
  - dashboard
  - workspace
  - permissions
  - suspension
  - activation
  - browser
  - instance
triggers:
  - locked out of account
  - dashboard won't load
  - can't access workspace
  - password reset
  - activation email not received
---
## Access Troubleshooting

### Locked Out of Account

Identify your lockout type by the error message shown:

**Password error**
- Verify you're using the correct Braze dashboard instance (confirm with your admin or account manager)
- Your password may have expired — reset it via the login page
- If using SSO, confirm setup is complete with your admin
- If your company has multiple Braze instances, you may be logging in with the wrong email

**Instance error (no error message, but can't log in)**
- Braze auto-detects the correct instance on familiar machines — on a new machine, manually confirm the correct instance
- Verify you're using the correct email (relevant if your company has multiple Braze instances)

**Account suspension**
- Contact your company's Braze admin, account manager, or Braze Support

---

### Dashboard Won't Load or Behaves Unexpectedly

**Try in another browser first.** If that works, investigate the original browser:

1. Re-launch: log out, quit browser, log back in
2. Clear cookies and browser cache, then retry
3. Disable ad-blockers or security plugins — these can block the dashboard (`ERR_BLOCKED_BY_CLIENT` in console logs indicates this)
4. Test on a different device/network (poor connection quality)
5. Confirm you're accessing the correct cluster (e.g., US-03 vs US-01)
6. Update browser to the latest supported version

**If the issue occurs on all browsers:**

1. Disable VPN if possible, or toggle network connection off/on
2. Restart your device

If still broken after all steps, contact Braze Support.

---

### User Belongs to No Workspace

Go to **Settings > Company Users**, find the user, and verify their workspace-level permissions. Add the required workspaces under **Workspaces**.

---

### New User Troubleshooting

**Never received the welcome/activation email**
- Check spam/junk folder
- Have your admin verify the email address on the account is correct
- Check with IT for email filtering policies blocking activation emails

**Stuck setting up 2FA**
- Admin can reset 2FA for the user in account settings
- If issues persist, admin can delete and re-add the user account with the same details (allows fresh 2FA setup)

If problems continue after these steps, contact Braze Support.
