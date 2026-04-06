---
name: export-campaigns-get-campaign-details
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/campaigns/get_campaign_details
indexed_at: '2026-04-05'
keywords:
  - campaign
  - details
  - endpoint
  - messages
  - channels
  - variations
  - email
  - push
  - content_cards
  - in_app_message
triggers:
  - get campaign details
  - retrieve campaign information
  - fetch campaign configuration
  - view campaign messages
---
## Get Campaign Details

**Endpoint:** `GET /campaigns/details`

**Permission required:** `campaigns.details` API key

**Rate limit:** Default Braze rate limit

---

## Request

```
GET https://rest.iad-01.braze.com/campaigns/details?campaign_id={{campaign_identifier}}
Authorization: Bearer YOUR-REST-API-KEY
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `campaign_id` | Required | String | Found on the API Keys page, Campaign Details dashboard page, or via the Export campaigns list endpoint |
| `post_launch_draft_version` | Optional | Boolean | Set `true` to include post-launch draft changes. Default: `false` |
| `include_has_translatable_content` | Optional | Boolean | Set `true` to include `has_translatable_content` per message. Default: `false` |

---

## Response

```json
{
    "message": "success",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-02T00:00:00Z",
    "archived": false,
    "draft": false,
    "enabled": true,
    "has_post_launch_draft": false,
    "name": "Campaign Name",
    "description": "Campaign description",
    "schedule_type": "scheduled",
    "channels": ["email", "ios_push"],
    "first_sent": "2024-01-01T10:00:00Z",
    "last_sent": "2024-01-02T10:00:00Z",
    "tags": ["tag1", "tag2"],
    "teams": ["Team A"],
    "messages": {
        "<message_variation_id>": {
            "channel": "email",
            "name": "Variation 1",
            "has_translatable_content": true,
            ...
        }
    },
    "conversion_behaviors": []
}
```

---

## Message Shapes by Channel

### Content Cards
```json
{
    "channel": "content_cards",
    "name": "Variant name",
    "extras": {}
}
```

### Email
```json
{
    "channel": "email",
    "name": "Variant name",
    "extras": [],
    "subject": "Subject line",
    "body": "<html>...</html>",
    "from": "sender@example.com",
    "reply_to": "reply@example.com",
    "title": "Email name",
    "amp_body": "<amp-html>...</amp-html>",
    "preheader": "Preview text",
    "custom_plain_text": "Plain text version",
    "should_inline_css": true,
    "should_whitespace_header": false,
    "email_headers": []
}
```

### In-App Messages

**Slideup / Modal / Fullscreen:**
```json
{
    "channel": "in_app_message",
    "name": "Variant name",
    "message": "Body text",
    "extras": {}
}
```

**Survey:**
```json
{
    "type": "survey",
    "data": {
        "pages": [{
            "header": { "text": "Survey header" },
            "choices": [{
                "choice_id": "choice_1",
                "text": "Option text",
                "custom_attribute_key": "attr_key",
                "custom_attribute_value": "attr_value",
                "deleted": false
            }]
        }]
    }
}
```

### Push (iOS / Android)
```json
{
    "channel": "ios_push",
    "name": "Variant name",
    "alert": "Notification body",
    "extras": {},
    "title": "Notification title",
    "action": "https://example.com",
    "image_url": "https://example.com/icon.png",
    "large_image_url": null
}
```

### SMS
```json
{
    "channel": "sms",
    "body": "Message body",
    "from": ["+15551234567"],
    "subscription_group_id": "sub_group_api_id"
}
```

### Webhook
```json
{
    "channel": "webhook",
    "url": "https://webhook.example.com/endpoint",
    "body": "{\"key\":\"value\"}",
    "type": "application/json",
    "headers": { "X-Custom-Header": "value" },
    "method": "POST"
}
```

### WhatsApp (Template)
```json
{
    "channel": "whats_app",
    "subscription_group_id": "sub_group_api_id",
    "from": ["+15551234567"]
}
```

---

## Notes

- Use `campaign_id` from the API Keys page, Campaign Details dashboard, or the Export campaigns list endpoint
- For Canvas data, use the Export Canvas details endpoint instead
- `has_translatable_content` is `true` if locales are configured and translation tags exist; `false` if neither; `null` if detection failed
