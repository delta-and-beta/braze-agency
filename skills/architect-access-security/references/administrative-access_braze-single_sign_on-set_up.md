---
name: administrative-access_braze-single_sign_on-set_up
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/single_sign_on/set_up
indexed_at: '2026-04-05'
keywords:
  - SAML
  - SSO
  - authentication
  - certificate
  - mapping
  - IdP
  - enforcement
  - RelayState
  - troubleshooting
  - configuration
triggers:
  - how to set up SAML SSO
  - how to configure SAML attribute mapping
  - how to troubleshoot SSO login errors
  - how to enforce single sign-on
  - how to debug SAML trace
---
## SSO Setup (SAML)

### Required Values

| Field | Value |
|---|---|
| ACS URL | `https://<SUBDOMAIN>.braze.com/auth/saml/callback` (EU: `.braze.eu`) |
| Entity ID | `braze_dashboard` |
| RelayState | API key with `sso.saml.login` permission |

### SAML Attribute Mapping

| Attribute | Required | Accepted Names |
|---|---|---|
| `email` | **Yes** | `email`, `mail`, `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email` |
| `first_name` | No | `first_name`, `firstname`, `firstName` |
| `last_name` | No | `last_name`, `lastname`, `lastName` |

Only `email` is required in the SAML Assertion.

---

### Setup Steps

**Step 1 — Configure IdP**
- Register Braze as a Service Provider in your IdP using the ACS URL and Entity ID above
- For Okta: use the pre-built integration from okta.com/integrations/braze (do not configure manually)

**Step 2 — Configure Braze**
- Go to **Settings > Admin Settings > Security Settings**
- Toggle SAML SSO to **ON**
- Enter:
  - **SAML Name** — button label shown on login screen (e.g. "Okta")
  - **Target URL** — SSO URL / SAML 2.0 Endpoint from your IdP
  - **Certificate** — x.509 certificate from your IdP, must be formatted as:

```
-----BEGIN CERTIFICATE-----
<certificate>
-----END CERTIFICATE-----
```

**Step 3 — Test login**
- Save settings, log out, sign back in via your IdP

---

### RelayState API Key Setup

1. **Settings > APIs and Identifiers > API Keys tab**
2. Create API key → enable `sso.saml.login` under SSO permissions
3. Copy the key identifier
4. Paste it into your IdP's RelayState field (may appear as "Relay State" or "Default Relay State")

---

### SSO Enforcement

**Settings > Security Settings:**
- **Enforce Google SSO only login** — blocks password login
- **Enforce custom SAML SSO only login** — blocks password login

Once enforced, users cannot log in with a password even if they previously did.

---

### SAML Trace (Troubleshooting)

**Browser extensions:** [Chrome](https://chromewebstore.google.com/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/)

1. Open SAML tracer (ensure **Pause** is NOT selected)
2. Attempt SSO login — successful trace shows a row with URL `https://dashboard-XX.braze.com/auth/saml/callback` and orange SAML tag
3. **Export** → cookie filter: **None** → Export → sends JSON to Braze Support

---

### Error Reference

| Error Code | Cause | Fix |
|---|---|---|
| `ERROR_CODE_SSO_INVALID_EMAIL` | Email format invalid | Check `saml2:Attribute Name="email"` in trace; Entra ID mapping: `email = user.userprincipalname` |
| `ERROR_CODE_SSO_EMAIL_DOES_NOT_EXIST` | Email not in Braze dashboard | Add user to Braze first |
| `ERROR_CODE_SSO_SESSION_SIGN_IN_EMAIL_MISSING` | Email blank/misconfigured | Fix attribute mapping in IdP |
| `ERROR_CODE_SSO_SESSION_SIGN_IN_EMAIL_MISMATCH` / `ERROR_CODE_SSO_SIGN_IN_EMAIL_MISMATCH` | Email mismatch between IdP and Braze | Emails are case-sensitive; must match exactly |

**Certificate issues:** Validate x.509 at [samltool.com/validate_response.php](https://www.samltool.com/validate_response.php). Expired certificates are treated as invalid.

`★ Insight ─────────────────────────────────────`
- The original doc mixes setup steps, troubleshooting, and reference tables across many sections — the condensed version separates concerns: config values → setup steps → error reference, making it scannable as a cheat sheet
- The error code table collapses what was scattered prose into a lookup structure, which is how engineers actually use this during an incident
- RelayState is easy to miss in the original (buried mid-doc); surfacing it as its own labeled section matches how IdP teams divide responsibility from app teams
`─────────────────────────────────────────────────`
