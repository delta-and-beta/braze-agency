---
name: legacy-ios-push-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - APNs
  - push
  - certificate
  - token
  - registration
  - provisioning
  - expiration
  - device
  - simulator
  - Xcode
triggers:
  - troubleshooting push notifications
  - push registration failing
  - devices not receiving push
  - invalid push token
  - certificate mismatch iOS
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are loaded at Default depth (Sonnet). Stripping Jekyll templating syntax (`{% %}`, `{{site.baseurl}}`) and image directives is critical: the MCP server embeds these as plain text, so unrendered Liquid tags pollute vector search results.
`─────────────────────────────────────────────────`

## Push Troubleshooting (iOS / APNs)

### APNs Workflow Overview

Push delivery follows four steps:

1. **Configure** — Upload SSL push certificate + provisioning profile to Braze dashboard
2. **Register** — Device registers with APNs → APNs returns push token → iOS SDK sends token to Braze asynchronously
3. **Send** — Braze authenticates with APNs using the uploaded certificate and delivers messages; default APNs expiration is **30 days**
4. **Clean** — If APNs reports invalid tokens, Braze removes them from user profiles automatically

**Certificate types:** Development and Distribution. Use Distribution certificates consistently to avoid environment mismatches. Switching certificate environments can accidentally invalidate all user push tokens.

---

### Push Error Logs

Access via **Message Activity Log** in the Braze dashboard. Errors link to relevant docs. Common errors include "Received Unregistered Sending to Push Token."

The **Engagement tab** on a user profile also shows a push changelog: token invalidations, registration errors, tokens moved to new users.

---

### Push Registration Issues

**No registration prompt appears:**
- Push registration code is not running — set breakpoints to verify
- Check push integration steps were completed correctly

**No "Push Registered" users in dashboard:**
- Confirm the app prompts for push permission (typically on first open)
- Verify push capability is enabled in the Xcode project
- Check provisioning profile includes push permissions:
  1. Xcode → **Preferences > Accounts**
  2. Select Apple ID → **View Details**
  3. Click **Refresh** to pull all provisioning profiles
- Confirm provisioning profile environment matches testing environment (dev vs. production)
- Call `registerPushToken` — set a breakpoint to confirm it executes
- Test on a **real device** (not simulator) with network connectivity

> Note: As of Xcode 14, remote push notifications can be tested on iOS simulators.

---

### Devices Not Receiving Push Notifications

**Users no longer "Push Registered" after a send:**

Indicates an invalid push token. Common causes:

| Cause | Fix |
|-------|-----|
| Certificate mismatch (dashboard cert ≠ provisioning profile cert) | Upload the correct certificate; start a new app session before retesting |
| User uninstalled the app | Token is invalidated on next send; Braze removes it automatically |

**Certificate environment mismatch:**
- Development certificate on a production app (or vice versa) will be rejected by APNs
- Universal certificates can target either APNs environment — verify dashboard configuration matches the build
