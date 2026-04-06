---
name: api-api-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/api_triggered_delivery
indexed_at: '2026-04-05'
keywords:
  - api-triggered
  - campaigns
  - templating
  - trigger-properties
  - re-eligibility
  - multivariate
  - transactional
  - delivery
  - personalization
  - endpoint
triggers:
  - how to set up API-triggered campaigns
  - how to trigger campaigns via API
  - how to personalize messages with dynamic content
  - how to control campaign re-eligibility
  - how to use trigger properties in messages
---
## API-Triggered Campaigns

API-triggered (server-triggered) campaigns let marketers manage copy, multivariate testing, and re-eligibility rules in the Braze dashboard while triggering delivery from their own servers.

> **Note:** API-triggered campaigns are distinct from [API campaigns](https://www.braze.com/docs/developer_guide/rest_api/api_campaigns/). API campaigns are created entirely via API; API-triggered campaigns are created in the dashboard but fired via API.

### Setup

1. Create a new campaign (single or multichannel, with optional multivariate testing)
2. Configure copy and notifications as normal
3. Select **API-Triggered Delivery** as the delivery method
4. Trigger delivery via the [`POST /campaigns/trigger/send`](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_triggered_campaigns/) endpoint

### Templating Dynamic Content

Include runtime data in the API request body via the `trigger_properties` object. Reference values in message copy using:

```liquid
{{ api_trigger_properties.${some_value_included_with_request} }}
```

**Example use case:** Pass a user's name or item details at trigger time to personalize the message without storing the data in Braze beforehand.

### Re-eligibility

Control how often a user can receive an API-triggered campaign regardless of how many times the trigger fires:

| Use case | Re-eligibility setting |
|---|---|
| Item view notifications (limit frequency) | Once per day max |
| Transactional messages (every occurrence) | Delay set to 0 minutes, no re-eligibility cap |

Re-eligibility settings decouple trigger frequency from send frequency — firing the API trigger 10 times does not guarantee 10 sends if re-eligibility limits are set.
