---
name: sdk-integration-chatgpt-apps
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/chatgpt_apps
indexed_at: '2026-04-05'
keywords:
  - chatgpt
  - braze
  - sdk
  - integration
  - analytics
  - tracking
  - segmentation
  - retargeting
  - conversational
  - attribution
triggers:
  - integrate Braze with ChatGPT
  - track ChatGPT user interactions
  - segment users by ChatGPT behavior
  - deliver Braze content in ChatGPT apps
  - measure ChatGPT conversion attribution
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" stored in `skills/{skill-name}/references/*.md`. They're intentionally stripped of navigation boilerplate so they can be embedded efficiently — both for LLM context windows and vector search in the MCP server.
`─────────────────────────────────────────────────`

## ChatGPT Apps Integration with Braze

Braze can be integrated into ChatGPT apps to maintain first-party data control and enable analytics within AI-powered conversational applications.

### Key Capabilities

- **Behavioral tracking**: Log which questions/features users engage with inside the ChatGPT app
- **Segmentation**: Build Braze segments based on AI interaction patterns (e.g., target users who chat more than 3x/week)
- **Cross-channel retargeting**: Use ChatGPT interaction data to trigger email, SMS, push, and in-app campaigns
- **In-conversation content delivery**: Surface Braze Content Cards and in-app messages directly within the ChatGPT UI via custom conversational UI components
- **Revenue attribution**: Track purchases and conversions originating from ChatGPT interactions

### Data Flow

User interactions in the ChatGPT app flow directly onto **Braze user profiles** — not just the AI platform's analytics — giving you ownership of the customer journey.

### Prerequisites

| Requirement | Notes |
|-------------|-------|
| Braze workspace | Needs a dedicated web app + API key |
| ChatGPT app | Created via the OpenAI platform |

### Integration Entry Point

SDK integration is handled via the shared include: `developer_guide/chatgpt_apps/sdk_integration.md`

This covers the core setup steps for wiring the Braze Web SDK into a ChatGPT app environment.

`★ Insight ─────────────────────────────────────`
The original source uses Jekyll liquid tags (`{% image_buster %}`, `{% multi_lang_include %}`, `{{site.baseurl}}`). These are stripped here because topic files must be self-contained — the MCP semantic search doesn't resolve Jekyll templates at query time.
`─────────────────────────────────────────────────`
