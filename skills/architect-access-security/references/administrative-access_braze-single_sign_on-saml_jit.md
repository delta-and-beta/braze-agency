---
name: administrative-access_braze-single_sign_on-saml_jit
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/single_sign_on/saml_jit
indexed_at: '2026-04-05'
keywords:
  - SAML
  - SSO
  - JIT
  - provisioning
  - authentication
  - IdP
  - workspace
  - permissions
  - security
triggers:
  - enable automatic user provisioning
  - set up SAML JIT
  - configure SSO provisioning
  - troubleshoot missing SSO button
---
## SAML Just-in-Time (JIT) Provisioning

Automatically creates Braze accounts for new users on their first SSO login — no manual account creation required.

### Constraints

- Only works for email domains that already have at least one confirmed, non-impersonation developer in the company
- **Not** compatible with Google SSO
- Only supported for **IdP-initiated** login workflows
- Requires SAML SSO to already be configured

**Domain matching example:** `jon.smith@decorumsoft.com` can use JITP because `decorumsoft.com` exists. `jon.smith@decorumsoft.eu` cannot, because `decorumsoft.eu` has no existing accounts. Contact Support for exceptions.

### Setup

1. Go to **Settings > Admin Settings > Security Settings**
2. In the **SAML SSO** section, enable **Automatic user provisioning**
3. Select a **default workspace** for new users
4. Select a **default permission set** for new users
5. Click **Save changes**
6. In your SSO provider, add all Braze users to the provider's directory
7. Instruct users to log in via the IdP portal for their first login (the SSO button appears on subsequent logins)

### Disabling JITP

Cannot be self-served — must contact Braze Support to disable.

### Troubleshooting

**SSO button missing with Microsoft Entra ID:** Leave the **Sign-On URL** field blank in Microsoft Entra's Basic SAML Configuration for Braze. A populated Sign-On URL causes only a password option to appear for IdP-initiated login.
