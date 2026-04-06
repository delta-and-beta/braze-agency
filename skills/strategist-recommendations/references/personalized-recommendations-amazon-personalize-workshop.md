---
name: personalized-recommendations-amazon-personalize-workshop
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalized_recommendations/amazon_personalize/workshop
indexed_at: '2026-04-05'
keywords:
  - personalize
  - braze
  - recommendations
  - connectedcontent
  - sagemaker
  - amplify
  - cloudformation
  - inference
  - campaigns
  - integration
triggers:
  - deploy retail demo store
  - train personalize models
  - configure braze integration
  - set up connected content
  - send personalized email campaigns
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase are atomic knowledge units stored in `skills/{id}/references/*.md`. They're designed to be self-contained so the MCP semantic search can surface them independently — stripping nav/boilerplate improves embedding quality and retrieval precision.
`─────────────────────────────────────────────────`

## Amazon Personalize + Braze Integration

Integration maintained by Amazon Personalize. Uses AWS Retail Demo Store as the reference architecture for deploying personalized recommendations into Braze email campaigns via Connected Content.

**Source repository:** `https://github.com/aws-samples/retail-demo-store/`

---

## Architecture

Data flows in two parallel streams:

1. **Behavioral events** — Web UI sends user events to Amazon Personalize via AWS Amplify JS library, training recommendation models.
2. **User profiles** — Braze campaign user records are updated from the Global Store User service.

At send time: Braze Connected Content calls a **recommendation service** (deployed in AWS) to fetch Personalize recommendations and inject them into email templates.

**Components:**
- Amazon Personalize — trains and serves recommendation models
- AWS Amplify — sends training events from the frontend
- Recommendation service — REST API wrapping Personalize inference endpoints
- Braze Connected Content — fetches recommendations at campaign send time
- Product catalog — used as additional training data

---

## Requirements

- AWS account with permissions to deploy CloudFormation stacks
- Clone of the Retail Demo Store repository
- Braze account with Connected Content enabled

---

## Deployment Steps

### Step 1: Deploy Retail Demo Store to AWS

Launch the CloudFormation stack from the repository into your chosen AWS region. Accept all default parameter values. Deployment takes **25–30 minutes** and provisions all required services including the recommendation service and a SageMaker notebook instance.

### Step 2: Train Amazon Personalize Models (~2 hours)

1. Open the Amazon SageMaker console in the same region as your deployment.
2. Navigate to **Notebook instances** → find `RetailDemoStore`.
3. Open **Jupyter** or **JupyterLab**.
4. Open notebook: `workshop/1-Personalization/1.1-Personalize.ipynb`
5. Execute each cell sequentially using **Run** from the toolbar.

This notebook trains the ML models and creates the Personalize inference endpoints (campaigns) used for recommendations.

### Step 3: Configure Braze Integration (~1 hour)

Requires Step 2 to be complete (Personalize campaigns must exist).

1. Return to the SageMaker console → `RetailDemoStore` notebook instance.
2. Open notebook: `workshop/4-Messaging/4.2-Braze.ipynb`
3. Execute each cell sequentially.

This notebook walks through setting up Connected Content calls to the recommendation service, wiring Personalize recommendations into Braze email templates.

### Step 4: Clean Up

Delete the CloudFormation stack created in Step 1 to avoid ongoing AWS charges.

---

## Connected Content Pattern

Braze fetches recommendations at send time by calling the recommendation service endpoint:

```liquid
{% connected_content https://<recommendation-service-endpoint>/recommendations?user_id={{${user_id}}} :save recommendations %}
```

The recommendation service wraps Amazon Personalize's `GetRecommendations` API and returns catalog items ranked for the target user.

---

## Key Notes

- The recommendation service must be deployed and accessible from Braze's servers (public endpoint or VPC with appropriate routing).
- In production, replace the Retail Demo Store recommendation service with your own implementation backed by your catalog.
- User identity must be consistent between Braze user records and Personalize user IDs for recommendations to be relevant.
