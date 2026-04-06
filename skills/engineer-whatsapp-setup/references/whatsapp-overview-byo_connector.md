---
name: whatsapp-overview-byo_connector
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/byo_connector
indexed_at: '2026-04-05'
keywords:
  - WhatsApp
  - Infobip
  - WABA
  - Connector
  - API
  - Credentials
  - Subscription
  - Campaign
  - Integration
  - Messaging
triggers:
  - how to set up WhatsApp
  - sending WhatsApp messages
  - retrieving API credentials
  - migrating phone numbers
  - troubleshooting WhatsApp connection
---
## BYO WhatsApp Connector (Braze + Infobip)

Braze's Bring Your Own (BYO) WhatsApp connector integrates with Infobip's WhatsApp Business Manager (WABA). You manage and pay messaging costs directly with Infobip; Braze handles segmentation, personalization, campaign orchestration, inbound message processing, WhatsApp flows, and analytics.

## Requirements

- Active Infobip account
- Braze messaging credits (consumed per WhatsApp message sent)
- WhatsApp Business prerequisites completed
- Phone number acquired through Infobip (recommended)

## Supported Migration Cases

Before setup, confirm your WABA was **not** previously sending through Infobip. Supported starting states:

- WABA and phone number never connected to any partner
- WABA connected directly to Braze (native integration) — migrate phone numbers one at a time via WhatsApp phone number migration
- WABA connected to a different solution provider — same phone number migration process applies

## Setup

### Step 1: Retrieve Infobip API Credentials

1. In Infobip, go to **Developer Tools** > **API Keys** > **Create API Key**
2. Name it descriptively (e.g., `Braze - <Workspace Name> - <WABA Name>`)
3. Set a far-future expiry date; schedule a reminder to rotate before expiry
4. Assign these scopes:
   - `Message:send`
   - `Whatsapp:manage`
   - `Whatsapp:message:send`
   - `Account-management:manage`
   - `Subscriptions:manage`
   - `Metrics:manage`
5. Copy the **API Key** immediately — it's only visible for a limited time after creation
6. Copy the **API base URL** from the API Keys page

### Step 2: Embedded Signup in Braze

1. In Braze: **Partner Integrations** > **Technology Partners** > **WhatsApp**
2. Select the **BYO Connector - Infobip** tab
3. Enter the API key and base URL from Step 1, then select **Connect**
4. Complete the Embedded Signup workflow with these constraints:
   - Cannot reuse a business portfolio already used by another Business Solution Provider
   - Cannot reuse a phone number already used by another Business Solution Provider
   - **Must create a new WABA** — selecting an existing one is not allowed

> **Verification code**: Retrieve it from **Infobip dashboard** > **Analyze** > **Logs** (inbound SMS message)

After setup, the phone number appears as a subscription group under your WhatsApp Business Group, labeled with the Infobip account name and API base URL.

> **Multi-account note**: Each WABA connects to a single Infobip account. When adding additional phone numbers/subscription groups to an already-connected WABA, re-enter the existing Infobip API credentials.

### Step 3: Sending Messages

Follow standard Braze WhatsApp sending:
- Subscribe users to the subscription group
- Create and send WhatsApp campaigns normally

## Troubleshooting

| Error | Resolution |
|---|---|
| Couldn't retrieve WhatsApp Business Account ID | Confirm the WABA isn't connected to a different Braze workspace |
| Couldn't share WABA ID with Infobip | (1) Confirm WABA isn't already connected to Braze or another partner; (2) Check no phone numbers in the WABA are connected to a different Infobip account — find the number in Infobip and select **Cancel number** |

## Unsupported Use Cases

| Use Case | Reason |
|---|---|
| Processing inbound messages in both Braze and Infobip simultaneously | Prevents duplicate/contradictory message threads from both systems triggering logic |
| Sending messages from both Braze and Infobip | For WABAs connected to Braze, all sending must originate from Braze |

`★ Insight ─────────────────────────────────────`
- The BYO connector pattern (Braze orchestrates, Infobip owns the WABA/billing) is architecturally significant: it separates *campaign logic* from *carrier relationship* — a common enterprise pattern for avoiding vendor lock-in on messaging infrastructure.
- The "must create a new WABA" constraint in Step 2 exists because WABAs carry state (phone numbers, quality ratings, template approvals) that can conflict if two BSPs try to share ownership — Meta enforces single-BSP-per-WABA at the API level.
- API key scoping (`Whatsapp:manage` + `Subscriptions:manage` + `Metrics:manage`) reveals the integration depth: Braze needs webhook subscription management and metrics pull, not just send permissions.
`─────────────────────────────────────────────────`
