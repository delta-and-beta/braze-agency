---
name: brazeai-predictive_suite
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_events
indexed_at: '2026-04-05'
keywords:
  - prediction
  - likelihood
  - scoring
  - segmentation
  - audience
  - campaigns
  - models
  - events
triggers:
  - build a prediction
  - target high-likelihood users
  - create prediction segments
  - use likelihood scores for campaigns
  - message predicted users
---
## Predictive Events

Part of the Braze Predictive Suite. Identifies and messages users based on their likelihood to perform a specific event using gradient boosted decision trees trained on historical activity.

### How It Works

1. Build a prediction by defining an event and audience
2. Braze trains a ML model on historical user behavior (users who did vs. didn't perform the event)
3. Each user receives a **likelihood score** from 0–100
4. Users are also bucketed into **low / medium / high** likelihood categories
5. Use scores to build segments or campaigns directly from the Prediction page

### Key Use Cases

- Target high-likelihood users for immediate revenue-boosting campaigns
- Save scored segments for future campaigns or Canvas flows
- Use likelihood score tiers to prioritize messaging order

### Access & Preview Mode

- Available in **preview mode** before purchase
- Preview uses synthetic demo data + one real prediction model at a time
- Preview predictions:
  - Are built on real user data
  - Cannot be used to target users for messaging
  - Do not update regularly after creation
  - Can be edited, rebuilt, archived, or replaced to test prediction quality

### Strategic Note

When deciding who to target first, consider likelihood score tiers rather than targeting all predicted users — high-likelihood users are warmest but medium-likelihood users may offer the best conversion lift per message.
