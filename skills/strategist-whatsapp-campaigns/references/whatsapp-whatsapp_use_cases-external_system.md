---
name: whatsapp-whatsapp_use_cases-external_system
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_use_cases/external_system
indexed_at: '2026-04-05'
keywords:
  - webhook
  - campaign
  - API
  - WhatsApp
  - integration
  - trigger
  - inbound
  - outbound
  - REST
triggers:
  - integrate WhatsApp with external system
  - set up WhatsApp webhook campaign
  - send WhatsApp reply via API
  - connect chatbot to WhatsApp channel
  - build bidirectional WhatsApp integration
---
## WhatsApp External System Integration

Integrates Braze's WhatsApp channel with an external AI or communication system (e.g., chatbot, live agent platform) using a bidirectional webhook + API-triggered campaign architecture.

**Inbound flow:** User message → Braze → Webhook → External system
**Outbound flow:** External system → Braze REST API → User via WhatsApp

---

## Prerequisites

| Requirement | Detail |
|---|---|
| External system | Third-party AI/communication platform with API access |
| Braze WhatsApp integration | Active WhatsApp number managed by Braze |
| REST API Key | Needs `campaigns.trigger.send` permission (Settings > API Keys) |

---

## Step 1: Inbound Webhook Campaign

Forwards incoming WhatsApp messages to the external system.

1. Create a **Webhook campaign** in Braze
2. Set **Webhook URL** to the external system's API endpoint
3. Request body (Raw text, Liquid):

```liquid
{
  "user_id": "{{${user_id}}}",
  "phone_number": "{{${phone_number}}}",
  "message": "{{whats_app.${inbound_message_body}}}"
}
```

4. In **Schedule Delivery**: set **Action-Based** delivery, trigger = **Send a WhatsApp inbound message**
5. Launch — every inbound message now triggers a webhook POST to the external system

---

## Step 2: Outbound API-Triggered Campaign

Allows the external system to send replies back through Braze.

1. Create a **WhatsApp campaign** in Braze
2. Select **Response Message** layout (inbound message opens the 24-hour WhatsApp window)
3. Message body uses API trigger property:

```liquid
{{api_trigger_properties.${external_system_msg_body}}}
```

4. In **Schedule Delivery**: select **Action-Based**
5. Save and **record the `campaign_id`** — needed for Step 3

---

## Step 3: External System Calls Braze

After processing the inbound message, the external system POSTs to Braze:

```bash
curl -X POST \
  -H 'Content-Type:application/json' \
  -H 'Authorization: Bearer <REST_API_KEY>' \
  -d '{
    "campaign_id": "<campaign_id_from_step_2>",
    "recipients": [
      {
        "external_user_id": "<external_id>",
        "trigger_properties": {
          "external_system_msg_body": "<response_text>"
        }
      }
    ]
  }' \
  https://<braze_endpoint>/campaigns/trigger/send
```

---

## Extension Points

- **Keyword routing** — trigger different webhook campaigns based on message keywords
- **Multi-step flows** — chain API-triggered campaigns for complex conversations
- **Profile enrichment** — store conversation data as Braze custom attributes for segmentation

`★ Insight ─────────────────────────────────────`
- The two-campaign pattern (webhook for inbound, API-triggered for outbound) is a common Braze idiom for building conversational flows — it decouples the channel layer (Braze) from the intelligence layer (external system) cleanly
- The `api_trigger_properties` object acts as a dynamic payload slot — the external system can inject arbitrary content at send-time without needing to modify the campaign template
- Recording the `campaign_id` in Step 2 is critical operational knowledge; Braze doesn't expose a "find campaign by name" API, so teams typically store this ID in environment config on the external system side
`─────────────────────────────────────────────────`
