---
name: data-unification-data_transformation-creating_a_transformation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/data_transformation/creating_a_transformation
indexed_at: '2026-04-05'
keywords:
  - webhook
  - transformation
  - payload
  - integration
  - attributes
  - events
  - purchases
  - external_id
  - authentication
  - API
triggers:
  - how to create a transformation
  - send test webhook
  - track users with transformations
  - build webhook integrations
  - configure data transformation
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units stored in `skills/{id}/references/*.md`. The goal is to strip Jekyll templating artifacts (`{% %}`, `{{site.baseurl}}`, image busters) and compress into a dense, self-contained reference — the downstream pipeline uses these as embedding candidates, so signal density matters more than prose flow.
`─────────────────────────────────────────────────`

## Creating a Transformation (Braze Data Transformation)

Braze Data Transformation lets you build webhook integrations that automate data flow from external platforms into Braze.

### Prerequisites

- Two-factor authentication (2FA) or SSO enabled on your account
- Account admin, workspace admin, or "Manage Transformations" user permission

### Steps

**1. Identify Source Platform**
- Confirm the external platform supports webhooks (may be labeled "API notifications" or "web service requests")
- Configure the webhook in the source platform to point to your transformation URL

**2. Create a Transformation**
- Navigate to Braze dashboard → Data Transformation
- Create a new transformation to receive a unique webhook URL

**3. Send a Test Webhook (recommended)**
1. Copy the transformation URL from the dashboard
2. Use the source platform's "Send Test" capability to POST a sample payload to that URL
3. Configuration options when prompted: select **POST**, **No authentication**, **No secrets**
4. Refresh the dashboard — a successful receipt shows the payload under **Most recent webhook**

> **Note:** Platforms requiring special verification or authentication for webhooks may not be supported yet.

**4. Write Transformation Code**

All incoming webhook data is accessible via the special variable `payload`. Use dot notation (`payload.x.y.z`) to access fields.

**Track Users (POST /users/track) — default template:**

```javascript
let brazecall = {
  "attributes": [
    {
      "external_id": payload.user_id,
      "_update_existing_only": true,
      "attribute_1": payload.attribute_1
    }
  ],
  "events": [
    {
      "external_id": payload.user_id,
      "_update_existing_only": true,
      "name": payload.event_1,
      "time": new Date(),
      "properties": {
        "property_1": payload.event_1.property_1
      }
    }
  ],
  "purchases": [
    {
      "external_id": payload.user_id,
      "_update_existing_only": true,
      "product_id": payload.product_id,
      "currency": payload.currency,
      "price": payload.price,
      "quantity": payload.quantity,
      "time": payload.timestamp,
      "properties": {
        "property_1": payload.purchase_1.property_1
      }
    }
  ]
};

return brazecall;
```

**Key coding rules:**
- Each attribute/event/purchase object requires a user identifier: `external_id`, `user_alias`, `braze_id`, `email`, or `phone`
- `_update_existing_only: true` — only updates existing profiles; set to `false` to create new users
- Delete unused sections (attributes, events, purchases) from the template
- Click **Validate** to preview output and confirm the `/users/track` request is valid

**Update Catalog Items (PUT /catalogs/{catalog_name}/items):**
- Use the `catalog_name` special variable to specify which catalog to update (replaces the URL path segment)

**AI Copilot:** Select **Generate transformation code** to have ChatGPT assist. Requires a webhook to have been received first. Alternatively, use **Insert code → Insert template** to access the template library.

**5. Activate**
- Activate the transformation in the dashboard
- Have the source platform begin sending webhooks — transformation code runs per incoming webhook and user profiles update automatically
