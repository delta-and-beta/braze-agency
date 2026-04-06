---
name: predictive-suite-predictive-churn
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_churn
indexed_at: '2026-04-05'
keywords:
  - churn
  - prediction
  - ml
  - scoring
  - model
  - audience
  - training
  - risk
  - messaging
  - segmentation
triggers:
  - define churn
  - create churn prediction
  - target at-risk users
  - measure churn risk
  - prevent user churn
---
## Predictive Churn Overview

Predictive Churn is part of the Braze Predictive Suite. You define what "churn" means for your business, and Braze trains a machine learning model (gradient boosted decision trees) using historical user behavior to identify at-risk users.

### How It Works

1. **Define churn** — Set the churn definition relevant to your business
2. **Set prediction audience** — Filter which users to include in the prediction
3. **Model training** — Braze analyzes patterns from users who previously churned vs. those who didn't
4. **Risk scoring** — Each user in the audience receives a **churn risk score from 0–100** (higher = more likely to churn)
5. **Score refresh** — Update frequency is configurable, enabling proactive outreach before churn occurs

### Key Capabilities

- Up to **3 active predictions** simultaneously, allowing tailored models per user segment
- Target high-value segments with individualized churn prevention messaging
- Scores update on a schedule you define

### Access Modes

| Mode | Capabilities |
|------|-------------|
| **Preview (pre-purchase)** | Demo prediction with synthetic data; 1 prediction model from real user data; no messaging targeting; no regular score updates |
| **Full access** | Multiple active predictions; messaging targeting by churn risk; regular score updates |

In preview mode, you can edit, rebuild, archive, and recreate predictions to evaluate prediction quality across different churn definitions before committing to a purchase.
