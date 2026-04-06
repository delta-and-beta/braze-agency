---
name: data-infrastructure-field_level_encryption
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/infrastructure/field_level_encryption
indexed_at: '2026-04-05'
keywords:
  - encryption
  - hashing
  - KMS
  - identifier
  - email
  - decryption
  - HMAC
  - credentials
  - plaintext
  - attributes
triggers:
  - set up field-level encryption
  - enable email encryption in Braze
  - configure AWS KMS for encryption
  - hash email addresses before import
  - implement identifier encryption
---
# Field-Level Encryption (Identifier)

Braze's identifier field-level encryption protects email addresses by storing only hashed/encrypted values. It's an **add-on feature** requiring contact with your Braze account manager.

## How It Works

- Email addresses are **hashed and encrypted before** being sent to Braze
- At send time, Braze calls AWS KMS to decrypt the email for delivery
- The **hashed** email is stored in delivery/engagement event metadata for analytics
- Braze never stores plaintext email addresses; any plaintext sent is redacted

## AWS KMS Prerequisites

Requires AWS KMS access in the correct region for your Braze cluster:

| Braze Cluster | AWS Region |
|---|---|
| US | `us-east-1` |
| EU | `eu-central-1` |
| AU | `ap-southeast-2` |
| ID | `ap-southeast-3` |

**Setup steps:**

1. Create an IAM user with permissions: `kms:Decrypt` and `kms:GenerateMac`
2. Note the access key ID and secret access key
3. Create **two KMS keys** (IAM user must be in key usage permissions):
   - **Encrypt/decrypt key**: Symmetric type, "Encrypt and Decrypt" usage
   - **Hash key**: Symmetric type, "Generate and Verify MAC" usage, spec: `HMAC_256` — note this key ID, it cannot be changed after saving

## Configuration Steps

### Step 1: Connect AWS KMS (Dashboard > Data Settings > Field-Level Encryption)

- Access key ID
- Secret access key
- HMAC key ID (**permanent** — cannot be updated after saving)

### Step 2: Select Encrypted Fields

Select **Email address**. Encryption is **irreversible** — once enabled, the field cannot revert to plaintext.

Before enabling: ensure no users have existing email addresses in the workspace to avoid mixing plaintext and encrypted storage.

### Step 3: Import/Update Users

Always **downcase** the email address **before hashing**.

Use the hashed email value wherever `email` appears in these endpoints:
- `/users/track`
- `/campaigns/trigger/send`
- `/canvas/trigger/send`
- `/transactional/v1/campaigns/{campaign_id}/send`
- CSV user imports

**User attributes object fields:**

| Field | Value |
|---|---|
| `email` | Hashed email value |
| `email_encrypted` | Encrypted email value |

> When creating a new user with email, `email_encrypted` is **required** — without it, the user will not be created. Same applies when adding email to an existing user without one.

## Limitations

Not supported with field-level encryption:
- SDK-based email capture
- In-app message email capture forms
- Recipient domain reporting (Email Insights mailbox provider charts)
- Email address filter by regex
- Audience sync
- Shopify integration
- Mail-to list-unsubscribe (use URL-based HTTP one-click unsubscribe instead)
- Phone or other identifier types (email only)
- `{{${email_address}}}` Liquid in preference center and unsubscribe pages

## Key Behavioral Notes

| Context | Email Value Shown |
|---|---|
| Currents events | Hashed email |
| Message archiving | Plaintext (sent to customer's cloud storage) |
| Email preview | Encrypted version |
| Actual email send | Plaintext (decrypted via KMS at send time) |
| Test sends | Plaintext supported |

## Encryption vs. Hashing

- **Encryption** (AES-256-GCM): Two-way, reversible. Same plaintext yields **different** ciphertext each time — used for delivery
- **Hashing** (HMAC_256): One-way, irreversible. Same plaintext always yields **same** hash — used for analytics linkage and subscription state across shared email addresses
