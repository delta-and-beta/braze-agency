---
name: content-optimization-testing-notify
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/content_optimization_testing/notify
indexed_at: '2026-04-05'
keywords:
  - notify
  - braze
  - campaigns
  - segments
  - api
  - messaging
  - engagement
  - predictive
  - tracking
  - timing
triggers:
  - how to integrate Notify with Braze
  - set up predictive engagement timing
  - trigger campaigns with AI optimization
  - configure Notify API integration
  - optimize send times dynamically
---
## Notify Integration

Notify is an AI-driven platform that integrates with Braze to deliver personalized messaging across email, SMS, push, and other channels using predictive engagement timing.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| Braze REST API key | Requires `users.export.segment` and `campaigns.trigger.send` permissions. Create at **Settings > API Keys**. |
| CNAME subdomain | Required for Notify's tracking pixel (email engagement tracking). Share subdomain URL with Notify after creation. |
| Historical data export | 12 months of campaign and purchase data to train Notify's predictive model. |

**Data export fields:**
- **Email**: SHA256 hash of lowercase email (no leading/trailing spaces)
- **Segment**: Activity level (`active` or `inactive`)
- **Sub-segment**: Additional activity context (e.g., purchase activity level)

### Integration Steps

1. **Create an API-triggered campaign** in Braze → share the `api_identifier` with Notify
2. **Create a segment** of target users → share the segment ID with Notify
3. Notify exports users from the segment
4. Notify calls `/campaigns/trigger/send` to fire the Braze campaign at the AI-predicted optimal engagement time

### How It Works

Notify's AI determines the best send time per user based on the trained predictive model, then triggers the Braze campaign via API at that moment — replacing static send schedules with dynamic, per-user timing.
