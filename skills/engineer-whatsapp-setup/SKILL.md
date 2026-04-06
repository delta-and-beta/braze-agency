---
name: engineer-whatsapp-setup
description: >-
  Implements WhatsApp Business API integration, phone number provisioning, and
  connector configuration.
metadata:
  role: braze-engineer
  topics:
    - whatsapp-overview
    - whatsapp-overview-embedded_signup
    - whatsapp-overview-phone_number_acquisition
    - whatsapp-overview-phone_number_migration
    - whatsapp-overview-byo_connector
    - whatsapp-overview-transfer_between_workspaces
    - whatsapp-overview-multiple_subscription_groups
    - whatsapp-user_phone_numbers
    - whatsapp-user_subscription
    - whatsapp-meta_resources
    - whatsapp-message_processing-handling_unknown_numbers
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill development guide emphasizes **progressive disclosure** — keep SKILL.md lean (1,500–2,000 words) and reference topics as atomic knowledge units. The user explicitly excluded frontmatter, so this will be body-only, as a `references/` topic file would be.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# WhatsApp Channel Setup

Configure and connect WhatsApp as a messaging channel in Braze. This skill covers the full setup lifecycle: acquiring a phone number, completing Meta's Embedded Signup, configuring connector options (native or BYO), managing subscription groups, handling phone number migrations and workspace transfers, and resolving user identity when Braze encounters unknown numbers.

Use this skill when the task involves any of the following:

- Setting up WhatsApp for the first time in a Braze workspace
- Provisioning or migrating a WhatsApp Business Account (WABA) phone number
- Configuring the BYO (Bring Your Own) connector via Infobip
- Transferring a WhatsApp subscription group between workspaces
- Adding additional WABAs to an existing workspace
- Diagnosing subscription group limits, user opt-in state, or unknown number behavior

---

## Scope

This skill focuses on the **infrastructure and configuration layer** — how channels are provisioned, connected, and managed at the platform level. It does not cover message template creation, campaign logic, or compliance policy (those belong to separate skills).

---

## Key Concepts

### Phone Number Acquisition

Braze does not provision phone numbers. Obtain a number from:

- Your existing business phone provider
- **Twilio** or **Infobip** (Braze integration partners — require a separate agreement)

Numbers must be registered with Meta and associated with a WhatsApp Business Account (WABA) before use in Braze.

### WhatsApp Business Account (WABA) Structure

One subscription group maps to exactly one unique phone number. A single Braze workspace supports up to **10 WABAs**, each with its own subscription group. Plan number-to-workspace allocation early — restructuring later requires a formal migration.

---

## Setup Flows

### First-Time Integration: Embedded Signup

Use Meta's Embedded Signup workflow to connect a WABA to a Braze workspace for the first time, or to add an additional WABA to an existing workspace. Embedded Signup handles Meta Business verification, WABA creation, and phone number registration in a guided flow within the Braze dashboard.

**To complete Embedded Signup:**

1. Navigate to **Partner Integrations > WhatsApp** in the Braze dashboard.
2. Follow the guided Embedded Signup steps. Meta's flow handles WABA creation and number registration.
3. After completion, a subscription group is automatically provisioned for the registered number.

Embedded Signup is also the entry point for phone number **migration** (moving a number from one WABA to another) — see the migration flow below.

### BYO WhatsApp Connector (Infobip)

The BYO connector integrates Braze with Infobip's WhatsApp Business Manager. In this model, messaging costs are managed and paid directly through Infobip, not through Meta's standard billing.

**To configure the BYO connector:**

1. Establish an Infobip account and WABA through Infobip's portal.
2. In Braze, navigate to **Partner Integrations > WhatsApp > BYO Connector**.
3. Provide the Infobip API credentials and WABA ID.
4. Braze will provision a subscription group tied to the Infobip-managed number.

Use the BYO path when the business requires direct Infobip billing, existing Infobip infrastructure, or specific routing capabilities not available in the standard connector.

---

## Phone Number Migration

Migrate a phone number between WABAs when consolidating accounts, switching providers, or reorganizing workspace structure.

**Prerequisites (all must be met before migrating):**

- Meta Business verification must be complete on the destination WABA.
- The phone number must not be actively sending messages during migration.
- Two-step verification must be disabled on the source number before initiating.

**Migration path:** Initiate via Meta's Embedded Signup flow from within the destination WABA's Braze configuration. The number transfers with its display name and message history intact, but subscription group association must be recreated in the destination workspace.

---

## Workspace Transfer

Move a WABA phone number and its associated subscription group from one Braze workspace to another without engineering involvement.

**Prerequisites:**

- "Manage Subscription Groups" permission in both source and destination workspaces.
- The subscription group in the source workspace must not be actively used in live campaigns.

**Transfer steps:**

1. In the **source workspace**, navigate to the WhatsApp subscription group and initiate a transfer.
2. Select the destination workspace.
3. Confirm the transfer. The subscription group, opt-in list, and phone number registration all move together.

After transfer, update any campaigns, Canvases, or audience filters in the destination workspace that reference the subscription group.

---

## Subscription Group Management

Each WhatsApp subscription group represents one phone number. Key constraints:

| Constraint | Limit |
|---|---|
| Phone numbers per subscription group | 1 (no sharing) |
| WABAs per workspace | Up to 10 |
| Subscription groups per WABA | Matches number count |

To add a subscription group, complete an additional Embedded Signup for each new WABA. Each signup provisions a new group.

---

## User Phone Number Handling

Phone numbers display in **local format** in user profiles but are stored in the **import format** (typically E.164: `+[country code][number]`).

**When importing users via CSV:**

- Use E.164 format (`+12125551234`) for consistent storage and matching.
- Mismatched formats between import and stored profiles can cause duplicate profiles or failed opt-in lookups.

**When handling inbound messages from unknown numbers:**

When WhatsApp receives a message from an unrecognized number, Braze attempts to match it to an existing user profile by phone number. If no match is found:

- **With anonymous user creation enabled:** A new anonymous profile is created and linked to the number.
- **Without anonymous user creation:** The message is received but not associated with a profile. Responding requires a manual user lookup or alias resolution.

Configure the unknown number behavior in **Settings > WhatsApp** based on whether the workspace expects inbound-initiated conversations from new users.

---

## Meta Resources and Permissions

Meta Business verification underpins all WABA operations. Before setup:

- Confirm the business has a verified Meta Business Manager account.
- The person completing Embedded Signup must have Meta Business Admin access.
- Phone numbers must not already be registered on personal WhatsApp accounts (deregistration required first).

For ongoing management, the Meta Business Suite at **business.facebook.com** is the authoritative source for WABA status, quality ratings, and messaging limits.

---

## Reference Files

For detailed topic coverage, consult the references in this skill:

- **`references/whatsapp-embedded-signup.md`** — Step-by-step Embedded Signup walkthrough and edge cases
- **`references/phone-number-acquisition.md`** — Provider options, Twilio/Infobip requirements, number types
- **`references/phone-number-migration.md`** — Full migration prerequisites, steps, and rollback considerations
- **`references/byo-connector.md`** — Infobip BYO connector configuration details
- **`references/workspace-transfer.md`** — Workspace transfer steps and permission requirements
- **`references/multiple-subscription-groups.md`** — Multi-WABA architecture patterns and limits
- **`references/user-subscription.md`** — Opt-in/opt-out state management and subscription group queries
- **`references/user-phone-numbers.md`** — Phone number formats, import patterns, profile matching
- **`references/handling-unknown-numbers.md`** — Unknown number behaviors, anonymous profile creation
- **`references/meta-resources.md`** — Meta Business Manager links, verification steps, quality ratings

---

`★ Insight ─────────────────────────────────────`
- The skill uses a **quick-reference table** for subscription group constraints — structured data is more reliably parsed by an agent than prose lists when values need to be compared or validated.
- The "Scope" section explicitly excludes message templates and campaign logic. Tight scope boundaries prevent skill invocation drift and help Claude route to the correct skill for adjacent tasks.
- Reference file names map 1:1 to the topic slugs provided — this makes the skill easy to assemble programmatically from a Nick pipeline where topics already exist as atomic files.
`─────────────────────────────────────────────────`
