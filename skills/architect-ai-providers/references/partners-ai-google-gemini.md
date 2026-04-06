---
name: partners-ai-google-gemini
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/ai_model_providers/google_gemini
indexed_at: '2026-04-05'
keywords:
  - gemini
  - vertex-ai
  - agents
  - braze
  - api-key
  - models
  - personalization
  - integration
  - catalog
triggers:
  - connect Gemini API key
  - create AI agents with Gemini
  - generate personalized copy
  - integrate Vertex AI
  - configure Gemini models
---

# Google Gemini

> [Google Gemini](https://deepmind.google/technologies/gemini/) is Google's family of AI models that combines advanced reasoning across text, code, and images to help brands deliver smarter, more personalized experiences.

{% multi_lang_include alerts/important_alerts.md alert='Braze Agents' %}

_This integration is maintained by Google._

## About the integration

The Braze and Google Gemini integration lets you connect your Google Gemini API key or Vertex AI key to Braze so you can use Gemini models when building custom AI agents. With this integration, your agents can generate personalized copy, make real-time decisions, or update catalog fields using Google's Gemini models.

## Prerequisites

| Requirements | Description |
|---|---|
| Google Cloud account with Gemini API key or Vertex AI key | A Google Cloud account with a Gemini API key or Vertex AI key. For help, contact your admin or [Google Cloud support](https://cloud.google.com/support). |
| Braze instance | You can find your Braze instance on the [API overview page]({{site.baseurl}}/api/basics/#endpoints) or from your Braze onboarding manager. |
{: .reset-td-br-1 .reset-td-br-2 role="presentation" }

## Integration

To connect your Google Gemini API key to Braze:

1. Go to **Partner Integrations** > **Technology Partners** in the Braze dashboard and find Google Gemini.
2. For the **API Type**, select **Gemini API** or **Vertex AI**.
3. Enter your API key from Google. For Vertex AI, enter the project ID.
4. Select **Save**.

After saving, you can select Gemini models when [creating a custom agent]({{site.baseurl}}/user_guide/brazeai/agents/creating_agents/) in the Agent Console.

Contact [Google Cloud support](https://cloud.google.com/support) with any issues or questions regarding your integration.
