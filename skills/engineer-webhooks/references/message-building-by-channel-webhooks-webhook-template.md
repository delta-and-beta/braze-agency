---
name: message-building-by-channel-webhooks-webhook-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/webhooks/webhook_template
indexed_at: '2026-04-05'
keywords:
  - webhook
  - template
  - campaign
  - HTTP
  - JSON
  - request
  - headers
  - compose
  - destination
  - configuration
triggers:
  - how to create webhook templates
  - save and reuse webhook configuration
  - test webhook with preview
  - build webhook request body
  - set up webhook headers
---
## Webhook Templates

Webhook templates let you save and reuse webhook configurations across campaigns in the Braze dashboard.

### Creating a Template

Navigate to **Templates > Webhook Templates** in the Braze dashboard.

**Step 1 — Choose starting point:**
- Create a new template from scratch
- Use a predesigned template (e.g., LINE Carousel, LINE Image)
- Edit an existing saved template

**Step 2 — Fill out template details:**
- Unique template name (required)
- Description of intended use (optional)
- Teams and tags for organization (optional)

**Step 3 — Build the template (Compose tab):**
- Webhook URL
- HTTP method
- Request body: **JSON Key/Value Pairs** or **Raw Text**
- Request headers (may be required by destination)

**Step 4 — Test the template:**
Use the **Test** tab to send a test webhook. Preview as:
- Random user
- Existing user
- Custom user

**Step 5 — Save:** Click **Save Template**.

### Key Behaviors

- Edits to an existing template do **not** retroactively affect campaigns created with previous versions of that template.
- Templates can be duplicated and archived to keep the list organized.

### When to Use Templates

Use webhook templates when you need to send the same webhook structure to multiple campaigns — for example, a standardized LINE message format or a recurring third-party API call pattern.
