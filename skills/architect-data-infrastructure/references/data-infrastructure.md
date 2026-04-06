---
name: data-infrastructure
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/infrastructure/field_level_encryption
indexed_at: '2026-04-05'
keywords:
  - encryption
  - hashing
  - identifiers
  - email
  - KMS
  - infrastructure
  - compliance
  - credentials
  - attributes
  - security
triggers:
  - how to encrypt email addresses
  - set up field-level encryption
  - configure AWS KMS
  - hash user identifiers
  - enable data encryption
---
# Identifier Field-Level Encryption

Add-on feature. Contact Braze account manager to enable.

## How It Works

- Email addresses must be **hashed and encrypted before** being sent to Braze
- At send time, Braze calls AWS KMS to retrieve the decrypted address
- Hashed email is inserted into delivery/engagement event metadata for analytics linkage
- Plaintext email addresses are redacted and never stored

## AWS Prerequisites

Requires AWS KMS access for both encryption and hashing operations.

**Required IAM permissions:**
- `kms:Decrypt`
- `kms:GenerateMac`

**Required KMS regions by cluster:**

| Cluster | Region |
|---------|--------|
| US | `us-east-1` |
| EU | `eu-central-1` |
| AU | `ap-southeast-2` |
| ID | `ap-southeast-3` |

**Two KMS keys required:**
1. **Encrypt/decrypt key** — Symmetric, "Encrypt and Decrypt" usage
2. **Hash key** — Symmetric, "Generate and Verify MAC" usage, spec: `HMAC_256`. Note the key ID after creation.

## Setup Steps

### Step 1: Connect AWS KMS
Dashboard: **Data Settings > Field-Level Encryption**

Enter:
- Access key ID
- Secret access key
- HMAC key ID (**cannot be changed after saving**)

### Step 2: Enable Encryption
Select **Email address** as the encrypted field.

**Warning:** Encryption is **permanent and irreversible** per field. Ensure no existing users have plaintext email addresses in the workspace before enabling.

### Step 3: Import/Update Users

Always **downcase** email before hashing.

Use hashed email value for `email` field everywhere. Affected endpoints:
- `POST /users/track`
- `POST /campaigns/trigger/send`
- `POST /canvas/trigger/send`
- `POST /transactional/v1/campaigns/{campaign_id}/send`
- CSV import/update

**User attributes object fields (`/users/track`):**
- `email` — hashed email value
- `email_encrypted` — encrypted email value

**Note:** New users with email require `email_encrypted` or the user won't be created. Same for adding email to existing users without one.

## Limitations (Not Supported)

- SDK email capture
- In-app message email capture forms
- Recipient domain reporting / Email Insights mailbox provider charts
- Email address regex filters
- Audience sync
- Shopify integration
- Mail-to list-unsubscribe (use URL-based HTTP one-click instead)
- Phone or other identifier types

## Key Behaviors

| Context | Email shown |
|---------|-------------|
| Currents events | Hashed |
| Message archiving | Plaintext (sent to customer's cloud storage) |
| Email send (`{{${email_address}}}`) | Plaintext rendered in sent email; encrypted in preview |
| Preference center / unsubscribe pages | `{{${email_address}}}` not supported |
| Test sends | Plaintext supported |

## Encryption vs. Hashing

- **Encryption** (AES-256-GCM via AWS): Two-way, reversible. Same input → different ciphertext each time.
- **Hashing** (HMAC via AWS): One-way, irreversible. Same input → same hash always. Used to link subscription state across users sharing an email address.
