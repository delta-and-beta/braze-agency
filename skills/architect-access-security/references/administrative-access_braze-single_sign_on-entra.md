---
name: administrative-access_braze-single_sign_on-entra
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/single_sign_on/entra
indexed_at: '2026-04-05'
keywords:
  - SAML
  - SSO
  - Entra
  - authentication
  - identity
  - certificate
  - integration
  - claims
  - attributes
triggers:
  - How to configure Microsoft Entra SSO
  - Set up SAML authentication with Braze
  - Enable single sign-on
  - Configure user attributes for Entra
  - Integrate Microsoft identity provider
---
## Microsoft Entra SSO

Microsoft's cloud-based identity and access management service integrated with Braze via SAML.

### Requirements

| Parameter | Value |
|---|---|
| ACS URL (Reply URL) | `https://<SUBDOMAIN>.braze.com/auth/saml/callback` |
| Entity ID | `braze_dashboard` |
| RelayState API key | Create API key with `sso.saml.login` permissions under **Settings > API Keys** |

---

### Setup: Microsoft Entra Side

**1. Add Braze from gallery**

In Microsoft Entra admin center: **Identity > Applications > Enterprise Applications > New application**, search for **Braze**, select and add it.

**2. Configure SAML SSO**

1. On the Braze app integration page, select **Single sign-on > SAML**.
2. Edit **Basic SAML Configuration**:
   - **Reply URL**: `https://<SUBDOMAIN>.braze.com/auth/saml/callback`
   - **Relay State**: your generated RelayState API key
   - **Sign-On URL**: leave blank (causes issues if set)

**3. User Attributes** (in User Attributes section):

| Attribute | Value |
|---|---|
| `givenname` | `user.givenname` |
| `surname` | `user.surname` |
| `emailaddress` | `user.mail` |
| `name` | `user.userprincipalname` |
| `email` | `user.userprincipalname` |
| `first_name` | `user.givenname` |
| `last_name` | `user.surname` |
| `Unique User Identifier` | `user.userprincipalname` |

**4. User Claims** (in Manage claim section):

| Claim Name | Value |
|---|---|
| `claims/givenname` | `user.givenname` |
| `claims/surname` | `user.surname` |
| `claims/emailaddress` | `user.userprincipalname` |
| `claims/name` | `user.userprincipalname` |
| `claims/nameidentifier` | `user.userprincipalname` |

> **Critical**: The email field must match what is configured for users in Braze. Typically `user.userprincipalname` — confirm with system administrator if configuration differs.

**5.** Download **Certificate (Base64)** from the SAML Signing Certificate section. Copy the login URL from the **Set up Braze** section.

---

### Setup: Braze Side

Requires account manager to enable SAML SSO first.

Go to **Settings > Admin Settings > Security Settings**, toggle SAML SSO to **ON**, then add:

| Field | Value |
|---|---|
| `SAML Name` | Display name on login button (e.g., "Microsoft Entra") |
| `Target URL` | Login URL from Microsoft Entra |
| `Certificate` | `x.509` PEM-encoded certificate from Microsoft Entra |

To enforce SAML-only login, restrict SSO authentication from **Company Settings**.
