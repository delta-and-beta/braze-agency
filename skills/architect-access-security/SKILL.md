---
name: architect-access-security
description: >-
  Configures SSO providers, manages authentication flows, enforces privacy
  compliance, and controls platform access.
metadata:
  role: braze-architect
  topics:
    - administrative-access_braze
    - administrative-access_braze-single_sign_on
    - administrative-access_braze-single_sign_on-set_up
    - administrative-access_braze-single_sign_on-saml_jit
    - administrative-access_braze-single_sign_on-okta
    - administrative-access_braze-single_sign_on-onelogin
    - administrative-access_braze-single_sign_on-entra
    - administrative-access_braze-accessing_your_account
    - administrative-access_braze-sdk_endpoints
    - administrative-access_braze-braze_dashboard
    - administrative-privacy
    - administrative-privacy-spam_regulations
    - administrative-privacy-managing_consent
    - data-infrastructure-field_level_encryption
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files are synthesized reference guides, not raw topic dumps. The key design principle is that the skill body should answer "when do I use this?" first, then orient Claude toward the right sub-topic based on the query — the references directory handles the deep content.
`─────────────────────────────────────────────────`

# Access Control & Security

## Scope and Purpose

This skill covers how to secure access to the Braze platform — from first login through enterprise SSO federation, to privacy compliance and data protection. Use this skill when the query involves authentication configuration, access troubleshooting, identity provider integration, or data privacy obligations within a Braze implementation.

**Core lens:** Treat every access decision as a policy question — who can authenticate, through what path, with what data protections in place, and under what regulatory constraints. Security in Braze is not a single toggle; it is a layered configuration across dashboard settings, identity providers, endpoint routing, and consent management.

## When to Use This Skill

- A user cannot log in, is locked out, or is redirected to the wrong dashboard instance
- The team is configuring SSO for the first time or migrating identity providers (Okta, OneLogin, Microsoft Entra)
- SAML JIT provisioning needs to be enabled or scoped to specific email domains
- A question arises about which SDK or REST endpoint cluster to use for a given region
- Field-level encryption is being evaluated for protecting PII (email identifiers)
- The team needs to understand subscription consent mechanics or spam regulation exposure
- A privacy audit requires documenting how Braze handles user data

## Topics This Skill Synthesizes

| Topic | What It Covers |
|---|---|
| **Access Braze Overview** | Lockout recovery, dashboard instance identification, error message triage |
| **Accessing Your Account** | Login flow, instance routing, account recovery steps |
| **Braze Dashboard** | Dashboard structure, navigation, and settings surfaces |
| **SDK Endpoints** | Cluster/instance endpoint mapping for SDK, REST, and dashboard URLs |
| **Single Sign-On Overview** | SSO types supported (Google OAuth, SAML), enforcement options, IdP relationships |
| **SSO Setup (SAML)** | ACS URL, Entity ID, RelayState, per-region values (US vs EU) |
| **SAML JIT Provisioning** | Automatic account creation on first SSO login, email domain constraints |
| **Okta SSO** | Okta-specific SAML configuration, attribute mapping, prerequisites |
| **OneLogin SSO** | OneLogin IdP setup, SAML 2.0 integration, MFA handling |
| **Microsoft Entra SSO** | Entra (Azure AD) Reply URL, identifier setup, enterprise configuration |
| **Field-Level Encryption** | Hashed/encrypted identifier storage for email PII, add-on feature scope |
| **Managing Consent** | Subscription group mechanics, opt-in/opt-out flows, legal team handoff boundaries |
| **Privacy Overview** | Regulatory disclaimer context, what Braze provides vs. what legal must own |
| **Spam Regulations** | CAN-SPAM, GDPR, CASL exposure; unsubscribe mechanics; compliance guardrails |

## Configuration Patterns

### Authentication Hierarchy

```
Google SSO (OAuth)          ← lighter, team-managed
SAML SSO (IdP-federated)    ← enterprise, supports JIT provisioning
  └── Okta
  └── OneLogin
  └── Microsoft Entra
Password fallback            ← disable when SSO is enforced
```

SAML JIT provisioning eliminates manual account creation but requires the authenticating user's email domain to match a pre-configured domain allowlist. Domains outside that list will not auto-provision.

### Endpoint Cluster Selection

Every Braze workspace belongs to a named cluster (e.g., `US-01`, `EU-01`). The correct SDK endpoint, REST API base URL, and dashboard login URL all derive from that cluster assignment. Mismatched endpoints cause silent failures — not authentication errors — so verify cluster assignment during integration setup, not after.

### Field-Level Encryption Scope

Identifier field-level encryption is an **opt-in add-on** — it is not enabled by default. It applies specifically to email address identifiers, storing only hashed or encrypted values to limit PII exposure. Queries and segmentation on encrypted fields are subject to capability constraints. Evaluate before enabling; it cannot be trivially reversed across existing profiles.

## Privacy and Compliance Posture

Braze provides tooling for consent and compliance; it does not interpret legal obligations. The boundary is consistent:

- **Braze owns:** Subscription group mechanics, unsubscribe link generation, preference center infrastructure, suppression list enforcement
- **Legal team owns:** Whether a given flow meets GDPR, CAN-SPAM, CASL, or other jurisdictional requirements

When answering compliance questions, surface the available Braze mechanism and explicitly flag that legal interpretation is out of scope for this skill.

## Common Failure Patterns

| Symptom | Likely Cause |
|---|---|
| Redirected to wrong dashboard on login | Using `dashboard.braze.com` instead of cluster-specific URL |
| SSO login fails with SAML error | ACS URL mismatch or wrong Entity ID (`braze_dashboard`) |
| JIT provisioning not creating accounts | User's email domain not in the allowed domain list |
| SDK calls returning 404 or auth errors | Wrong cluster endpoint configured in SDK initialization |
| Encrypted field queries returning no results | Querying plaintext value against encrypted field storage |

## Boundaries

This skill does not cover:

- Braze **user permission roles** (admin, editor, viewer) — see Role Management
- **API key scoping and rotation** — see REST API Authentication
- **Data center residency selection** — determined at contract time, not post-provisioning
