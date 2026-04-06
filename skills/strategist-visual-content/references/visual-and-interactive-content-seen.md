---
name: visual-and-interactive-content-seen
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/seen
indexed_at: '2026-04-05'
keywords:
  - webhook
  - personalization
  - video
  - journey
  - integration
  - transformation
  - campaign
  - attributes
  - payload
  - conditional
triggers:
  - how to integrate Seen with Braze
  - create personalized video campaigns
  - configure Seen journey nodes
  - send video assets back to Braze
---
# Seen — Personalized Video Integration

Seen (seen.io) generates personalized videos at scale. The Braze-Seen integration sends user data from Braze to Seen, generates personalized videos, and returns video assets (player URL, thumbnail) back to Braze custom attributes for use in campaigns/Canvases.

## Use Cases
- Onboarding welcome videos
- Conversion and activation messaging
- Loyalty, upsell, and milestone highlights
- Win-back / churn prevention

## Rate Limit
100 calls per 10 seconds.

## Prerequisites
- Seen Platform subscription with Workspace ID and API token
- Braze Data Transformation webhook URL
- User data in Braze with `braze_id` as the unique identifier

---

## How It Works

1. Braze sends user data to Seen via webhook
2. Seen processes data through a **Journey** (configurable workflow of nodes)
3. Seen returns a response payload with video assets
4. Braze Data Transformation ingests the response and stores assets on the user profile

### Journey Node Types
| Node | Purpose |
|------|---------|
| Trigger | Starts the Journey — use `On Create` for Braze integrations |
| Conditional | Routes users by attribute values (e.g. plan type, region) |
| Project | Applies dynamic video personalization |
| Player | Generates a unique video player URL |
| Webhook | Defines the response payload sent back to Braze |

---

## Integration Steps

### Step 1: Webhook Campaign in Braze

Create a Webhook Campaign:

- **URL**: `https://next.seen.io/v1/workspaces/{WORKSPACE_ID}/data`
- **Method**: POST
- **Body** (Raw Text):

```json
{
  "first_name": "{{${first_name}}}",
  "last_name": "{{${last_name}}}",
  "email": "{{${email_address}}}",
  "id": "{{${braze_id}}}"
}
```

- **Headers**:
  - `Authorization: Bearer {Seen_API_TOKEN}`
  - `Content-Type: application/json`

> Get your API token from Seen Platform → Workspace settings.

---

### Step 2: Configure a Journey in Seen

1. Create a new Journey
2. Add a **Trigger node** with `On Create` trigger
3. Build logic with Conditional, Project, and Player nodes as needed
4. Add a **Webhook node** to return data to Braze

The Webhook node response **must** include:

| Field | Description |
|-------|-------------|
| `id` | Must match the `braze_id` sent from Braze |
| `player_url` | Unique personalized video player URL |
| `email_thumbnail_url` | Generated video thumbnail URL |

---

### Step 3: Data Transformation in Braze

1. Create custom attributes: `player_url`, `email_thumbnail_url`
2. Go to **Data Settings → Data Transformation → Create transformation**
3. Configure: Start from scratch, Destination = POST: Track users
4. Provide the generated webhook URL to Seen (add to the Journey Webhook node)
5. Use this transformation code:

```javascript
let brazecall = {
  "attributes": [
    {
      "braze_id": payload.id,
      "_update_existing_only": true,
      "player_url": payload.player_url,
      "email_thumbnail_url": payload.email_thumbnail_url
    }
  ]
};
return brazecall;
```

6. Send a test payload (via Seen or Postman) to validate
7. **Validate → Save → Activate**

---

## Notes
- For multiple Seen campaigns, repeat the full integration process per campaign
- If additional attributes are needed, include them in the Seen Webhook node response and map them in the Data Transformation code
- The `_update_existing_only: true` flag ensures only existing Braze profiles are updated — no ghost profiles created from Seen data
