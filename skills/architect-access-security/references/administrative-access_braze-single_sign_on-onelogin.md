---
name: administrative-access_braze-single_sign_on-onelogin
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/single_sign_on/onelogin
indexed_at: '2026-04-05'
keywords:
  - onelogin
  - saml
  - sso
  - authentication
  - idp
  - integration
  - certificate
  - security
  - provisioning
  - mfa
triggers:
  - how to configure OneLogin SSO
  - set up SAML authentication in Braze
  - enable single sign-on with OneLogin
  - integrate OneLogin as identity provider
  - enforce SSO-only login
---
## OneLogin SSO Integration

OneLogin is a cloud identity platform supporting SAML 2.0 for SSO, user provisioning, and MFA. This guide covers configuring OneLogin as an IdP for Braze.

---

## Prerequisites

| Requirement | Details |
|---|---|
| Braze Domain | Your dashboard hostname (e.g., `dashboard-01.braze.com` for `US-01` instance) |
| RelayState API Key | Create at **Settings > API Keys** with `sso.saml.login` permission |

---

## Configuration

### Step 1: Configure Braze App in OneLogin

1. Log into OneLogin → **Administration**
2. **Apps > Add Apps** → search "Braze" → select the Braze app
3. Save app to your Company
4. Go to **Configuration** → enter **Braze Domain** and **RelayState** API key
5. Under **Parameters**, verify SAML attributes are pre-populated correctly
6. From the **SSO** tab, copy:
   - **Certificate**
   - **SAML 2.0 Endpoint (HTTP)**

### Step 2: Configure OneLogin Within Braze

Requires SAML SSO enabled by account manager first.

Navigate to **Settings > Admin Settings > Security Settings** → toggle SAML SSO **ON**

| Field | Value |
|---|---|
| `SAML Name` | Display name on login button (e.g., "OneLogin") |
| `Target URL` | SAML 2.0 Endpoint (HTTP) from OneLogin |
| `Certificate` | x.509 PEM-encoded certificate from OneLogin |

---

## Notes

- To enforce SSO-only login (block username/password), configure SSO restriction from **Company Settings**
- Braze requires SAML assertions in a specific format — the OneLogin app pre-populates the required attribute mappings
