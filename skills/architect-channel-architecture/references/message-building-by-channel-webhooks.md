---
name: message-building-by-channel-webhooks
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/webhooks/webhook_template
indexed_at: '2026-04-05'
keywords:
  - webhook
  - template
  - campaign
  - HTTP
  - JSON
  - headers
  - payload
  - channel
  - destination
  - body
triggers:
  - how to create a webhook template
  - setting up webhook templates
  - configuring webhook requests
  - testing webhook configurations
  - save and reuse webhook templates
---
## Webhook Templates

Webhook templates let you save and reuse webhook configurations across campaigns in Braze.

### Creating a Template

**Navigate to:** Dashboard → **Templates** → **Webhook Templates**

**Steps:**

1. **Choose starting point** — Create new, use a predesigned template (e.g., LINE Carousel, LINE Image), or edit an existing template.

2. **Fill out details**
   - Unique template name (required)
   - Description (optional) — document intended use
   - Teams and tags (optional) — for filtering/discovery

3. **Build the template**
   - Webhook URL
   - HTTP method
   - Request body: **JSON Key/Value Pairs** or **Raw Text**
   - Request headers (optional, may be required by destination)

4. **Test** — Use the **Test** tab to send a test webhook. Preview as random user, existing user, or custom user.

5. **Save** — Click **Save Template**.

### Key Behaviors

- Edits to a saved template do **not** retroactively update campaigns built from previous versions of that template.
- Templates can be duplicated and archived for organization.

### Predesigned Templates

Braze ships predesigned templates for certain channels, including:
- LINE Carousel
- LINE Image
