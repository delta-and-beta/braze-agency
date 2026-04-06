---
name: predictive-suite-predictive-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_events
indexed_at: '2026-04-05'
keywords:
  - prediction
  - likelihood
  - targeting
  - events
  - campaigns
  - scoring
  - messaging
  - audience
  - analytics
  - segments
triggers:
  - create predictive event campaigns
  - target users by likelihood score
  - interpret prediction quality
  - set up event predictions
  - use predictions in messaging
---
## Predictive Events Overview

Predictive Events (part of the Braze Predictive Suite) identifies users likely to perform a specific event and enables targeted messaging based on that likelihood.

### How It Works

- Braze trains a machine learning model using **gradient boosted decision trees**, learning from historical user activity
- Each user receives a **likelihood score (0–100)**: higher = more likely to perform the event
- Users are grouped into **low, medium, and high likelihood categories**

### Primary Use Cases

- Build **targeted campaigns** directly from the Prediction page for immediate results
- Save a **segment** for use in future campaigns or Canvases
- Use [likelihood-based messaging strategies](https://www.braze.com/docs/user_guide/brazeai/predictive_events/messaging_users/#strategy) to prioritize who to target first

### Access Modes

| Mode | Behavior |
|------|----------|
| **Preview** (pre-purchase) | Demo with synthetic data; one preview prediction at a time using real user data; cannot target users; does not auto-update |
| **Full** (purchased) | Full targeting by likelihood score; regular updates |

### Preview Mode Capabilities

- Edit, rebuild, archive, and recreate preview predictions
- Test expected [prediction quality](https://www.braze.com/docs/user_guide/brazeai/predictive_events/analytics/#prediction_quality) across [different audiences](https://www.braze.com/docs/user_guide/brazeai/predictive_events/creating_an_event_prediction/#audience)
- Familiarize yourself with analytics before purchasing

### Key Limitation (Preview)

Preview predictions do **not** allow user targeting for messaging and do **not** update automatically after creation.
