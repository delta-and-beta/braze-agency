---
name: administrative-access_braze-single_sign_on-okta
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/single_sign_on/okta
indexed_at: '2026-04-05'
keywords:
  - okta
  - sso
  - saml
  - authentication
  - certificate
  - api
  - braze
  - login
  - enterprise
  - relaystate
triggers:
  - how to set up Okta SSO
  - configure SAML authentication in Braze
  - enable single sign-on for users
  - integrate Okta identity management
  - enforce SSO-only login
---
## Okta SSO Integration

Okta is an enterprise identity management service that enables SAML-based SSO for Braze. Configuration requires admin privileges in both Okta and Braze.

### Prerequisites

- Okta SSO enabled by Braze account manager
- Admin privileges in both Okta and Braze
- RelayState API key: create in **Settings > API Keys** with `sso.saml.login` permission

### Step 1: Configure Braze

1. Go to **Settings > Admin Settings > Security Settings**
2. Toggle SAML SSO section to **ON**
3. Fill in the following fields:

| Field | Value |
|---|---|
| `SAML Name` | Button text on login screen (e.g., "Okta") |
| `Target URL` | From Okta: **Applications > [your app] > General tab > App Embed Link > Embed Link** |
| `Certificate` | x.509 PEM certificate from Okta: **SAML Signing Certificates > Actions > Download certificate** |

4. Select **Save Changes**

### Step 2: Configure Okta

1. In Okta, open the Braze SAML app → **Sign On** tab → **Edit**
2. Paste the `sso.saml.login` API key into the **Default Relay State** field
3. Save settings

### Step 3: Verify

Log in to Braze via Okta to confirm the integration works.

### Optional: Enforce SSO-Only Login

To require all users to authenticate via SAML SSO (disabling password login), go to **Company Settings** and restrict single sign-on authentication.
