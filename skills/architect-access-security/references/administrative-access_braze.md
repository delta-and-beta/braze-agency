---
name: administrative-access_braze
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - lockout
  - authentication
  - dashboard
  - workspace
  - instance
  - suspension
  - credentials
  - SSO
  - 2FA
  - account
triggers:
  - how to reset account lockout
  - why won't dashboard load
  - troubleshoot braze login
  - fix account suspension
  - set up two-factor authentication
---
# Access Braze Overview

## Account Lockout

Identify your lockout type by the error message shown:

### Password Error
- Verify you're on the correct [Braze dashboard instance](https://www.braze.com/docs/user_guide/administrative/access_braze/braze_instances/)
- Reset your password if it may have expired
- If using SSO, confirm setup is complete with your admin
- If your company uses multiple Braze instances, confirm you're using the correct email

### Instance Error (no error message shown)
- Confirm the correct dashboard instance with your account admin or Braze account manager
- Check whether you're using the correct email (relevant for multi-instance companies)

### Account Suspension
Contact your company's Braze administrator, Braze account manager, or Braze Support.

---

## Dashboard Won't Load

**Try a different browser first.** If the issue is browser-specific:

| Action | Steps |
|--------|-------|
| Re-launch | Log out, quit browser, log back in |
| Clear cache | Clear cookies and browser cache, then log in |
| Disable ad-blockers | Ad-blockers can block dashboard load; check console for `ERR_BLOCKED_BY_CLIENT` |
| Check connection | Try a different device or network |
| Confirm cluster | Ensure you're on the correct assigned cluster (e.g., US-03, not US-01) |
| Update browser | Use a supported, up-to-date browser |

**If issue occurs on all browsers:**
- Disable VPN or toggle network connection
- Restart your device

If dashboard still fails after all steps → contact Braze Support.

---

## User Belongs to No Workspace

**Settings > Company Users** → check workspace-level permissions → add missing workspaces under **Workspaces**.

---

## New User Troubleshooting

### Never received welcome email
1. Check spam/junk folder
2. Have admin verify the email address on file
3. Confirm with IT that activation emails aren't being blocked by policy

### Stuck setting up 2FA
1. Admin can reset 2FA for the user account in settings
2. If that fails: admin deletes and re-adds the user account (preserves same details, resets the 2FA setup flow)

Contact Braze Support if issues persist after these steps.
