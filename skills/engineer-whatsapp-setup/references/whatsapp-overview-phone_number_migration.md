---
name: whatsapp-overview-phone_number_migration
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/phone_number_migration
indexed_at: '2026-04-05'
keywords:
  - migration
  - phonenumber
  - WABA
  - verification
  - account
  - signup
  - business
  - payment
  - WhatsApp
  - embedded
triggers:
  - how to migrate phone number
  - migrate phone number between WABAs
  - turn off two-step verification
  - WhatsApp phone number migration
  - embedded signup workflow
---
## Phone Number Migration

Migrate a WhatsApp phone number between WhatsApp Business Accounts (WABAs) via Meta's Embedded Signup.

### Prerequisites

All conditions must be met before migrating:

- Meta Business Account is **verified**
- Existing WABA is **approved**
- Existing WABA has a **valid payment method** in Payment Settings
- **Two-step verification is turned off** on the phone number
  - If you own the WABA: turn off in WhatsApp Manager
  - If managed by a Solution Provider: ask them to turn it off

### Migration Steps

1. In WhatsApp Manager, select the WABA associated with your number → **Account tools** → **Phone numbers**
2. Select **Turn off two-step verification** and complete the steps
   - If migrating to a different WhatsApp Business Group and Meta's Embedded Signup requires a matching display name, note the existing display name from the **Phone Numbers** page — you'll need to enter it during signup
3. Complete Meta's Embedded Signup workflow

### Reference

Meta's guide: [Migrating phone numbers between WABAs via Embedded Signup](https://developers.facebook.com/docs/whatsapp/business-management-api/guides/migrate-phone-to-different-waba/)
