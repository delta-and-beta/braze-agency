---
name: rest-api-sending-email-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/sending_email_messages
indexed_at: '2026-04-05'
keywords:
  - email
  - messages
  - api
  - campaign
  - transactional
  - personalization
  - analytics
  - backend
  - integration
  - endpoint
triggers:
  - send email messages via API
  - integrate email with REST API
  - send transactional emails
  - create API campaign
  - track email analytics
---
`★ Insight ─────────────────────────────────────`
- Nick's topic files are **atomic knowledge units** nested inside skill `references/` directories — keeping them self-contained (no cross-references) makes them independently useful at any routing depth
- The pipeline strips Liquid template syntax (`{{site.baseurl}}`) and Jekyll-specific markup during processing, so the topic file should resolve these to plain text or omit them
- API campaigns vs API-triggered campaigns is a key distinction worth preserving: API campaigns define content in the backend payload; API-triggered campaigns define templates in the dashboard
`─────────────────────────────────────────────────`

## Sending Email Messages via REST API

Send transactional emails programmatically from your backend using the `/messages/send` endpoint. Analytics (opens, clicks, bounces) are tracked alongside campaigns in the Braze dashboard.

### Prerequisites

| Requirement | Notes |
|---|---|
| REST API key | Requires `messages.send` permission. **Settings > APIs and Identifiers > API Keys** |
| App ID | Found at **Settings > APIs and Identifiers > App identifiers**. Required in the email messaging object's `app_id` field |
| HTML email content | Prepared in advance in your backend |
| Backend service | Capable of making HTTP POST requests |

### Step 1: Create an API Campaign

1. **Messaging > Campaigns > Create Campaign > API Campaign**
2. Name and describe the campaign (e.g., "Email message notification")
3. **Add Messaging Channel > Email**
4. Record the **Campaign ID** — required in all API requests
5. Optionally record the **Message Variation ID** — include to attribute stats to a specific variation

### Step 2: Send Email via API

**Endpoint:** `POST https://YOUR_REST_ENDPOINT/messages/send`

```
POST https://YOUR_REST_ENDPOINT/messages/send
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

**Request payload:**

```json
{
  "campaign_id": "YOUR_CAMPAIGN_ID",
  "external_user_ids": ["user123"],
  "messages": {
    "email": {
      "app_id": "YOUR_APP_ID",
      "message_variation_id": "YOUR_MESSAGE_VARIATION_ID",
      "subject": "You have a new message!",
      "from": "Notifications <notifications@yourcompany.com>",
      "body": "<html><body><h1>You have a new message!</h1><p>Hi {{first_name}},</p><p>You received a new message in your inbox. Click the link below to read it:</p><a href='https://yourwebsite.com/messages'>View message</a><p>Thank you for using our service!</p></body></html>"
    }
  }
}
```

**Key field rules:**
- `from` must use format: `"Display Name <email@address.com>"`
- `body` accepts valid HTML and supports Liquid personalization (e.g., `{{first_name}}}`)
- Recipients in `external_user_ids` **must already exist** in Braze — API sends do not create new profiles
- To create users before sending, call `/users/track` first

### Step 3: Verify Integration

1. Send a test request using your own user ID as recipient
2. Confirm delivery to your inbox
3. Check campaign results page in the Braze dashboard for recorded send

### Key Considerations

- **User existence**: All `external_user_ids` must be existing Braze profiles. For new user creation + send, use `/users/track` then `/messages/send`, or use API-triggered campaigns instead.
- **Compliance**: Include opt-out options and privacy notices per GDPR and CAN-SPAM requirements.
- **Personalization**: Liquid templating in `body` supports dynamic content and user-specific data.
- **Alternative approach**: Use API-triggered delivery to define email templates in the Braze dashboard while still triggering sends from the backend — useful when marketers manage template content.

`★ Insight ─────────────────────────────────────`
- The processed file removes all Jekyll liquid tags (`{{site.baseurl}}`), table `role` attributes, and `{% alert %}` shortcodes — these are rendering artifacts that add noise without informational value in a topic file context
- The `message_variation_id` is optional but worth preserving in the example since it affects analytics attribution — a subtle but operationally important detail
`─────────────────────────────────────────────────`
