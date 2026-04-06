---
name: whatsapp-overview-multiple_subscription_groups
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/multiple_subscription_groups
indexed_at: '2026-04-05'
keywords:
  - subscriptions
  - accounts
  - templates
  - messaging
  - quality
  - topology
  - workspace
  - numbers
  - limits
  - registration
triggers:
  - how to add a WhatsApp Business Account
  - how to add a subscription group and phone number
  - how to remove a subscription group
  - how to configure WhatsApp phone numbers
  - managing WhatsApp message templates
---
## Multiple WhatsApp Business Accounts and Subscription Groups

### Key Constraints

- 1 subscription group = 1 unique phone number (no sharing)
- Up to **10 WhatsApp Business Accounts** per workspace
- Up to **20 subscription groups** (and phone numbers) per WhatsApp Business Account
- Business accounts can span different Meta Business Managers

### WhatsApp Business Accounts

Each account operates independently with its own:
- Phone number
- Message templates
- Quality rating

Accounts nested in the same Meta Business Manager share user access permissions and catalogs.

**To add a WhatsApp Business Account:**
1. Go to **Technology Partners > WhatsApp** > **Add WhatsApp Business Account**
2. Complete the embedded signup workflow
3. Phone number must not be registered to any other WhatsApp account

### Subscription Groups and Phone Numbers

Message templates are **shared** across all phone numbers within the same WhatsApp Business Account.

Each phone number appears as a separate WhatsApp chat to users. Phone numbers within the same Business Account are independent and can have different values for:
- Display name
- Status
- Quality rating
- Messaging limit

**To add a subscription group and phone number:**
1. Go to **Technology Partners > WhatsApp** > **Add Subscription Group and Number**
2. In the **Select your WhatsApp Business Account** step, select an existing account and add a new phone number (must not be registered to any other WhatsApp account)

**To remove a subscription group and phone number:**
1. Go to **Audience > Subscriptions** and archive the subscription group
2. Go to Meta Business Manager and delete the phone number

### Workspace Topology

| Relationship | Cardinality |
|---|---|
| Workspace → WhatsApp Business Accounts | 1 to many (max 10) |
| WhatsApp Business Account → Subscription Groups | 1 to many (max 20) |
| Subscription Group → Phone Number | 1 to 1 |
| Workspace → Meta Business Portfolios | many to many |
