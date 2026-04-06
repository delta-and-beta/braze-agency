---
name: decisioning-studio-launch-agents
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/launch_agents
indexed_at: '2026-04-05'
keywords:
  - agent
  - launch
  - feedback
  - recommendations
  - orchestration
  - metrics
  - optimization
  - integration
  - monitoring
  - decisioning
triggers:
  - how to launch decisioning agents
  - configure feedback data pipelines
  - monitor agent performance
  - optimize agent recommendations
  - set up data integrations
---
## Launching Decisioning Agents

### Launch Steps

After completing all configuration with your AI Decisioning Services team:

1. Review agent configuration — verify all settings are correct
2. Confirm data connections and orchestration integrations are active
3. Activate the agent with your AI Decisioning Services team

**Once launched, the agent will:**
- Receive audience and customer data
- Generate personalized recommendations per customer
- Orchestrate actions through the configured CEP
- Collect feedback data to continuously learn and improve

### Closing the AI Decisioning Loop

Feedback data is required for the agent to learn and improve. Three types are needed:

| Data Type | Purpose |
|---|---|
| Conversions data | What customers did after receiving a recommendation |
| Engagement data | How customers interacted with delivered content |
| Activations data | What actions were triggered through the CEP |

**Native integrations** (Braze, Salesforce Marketing Cloud): Feedback data may be sent automatically with customer data — no additional configuration required.

**Non-native integrations:** Manual configuration of feedback data pipelines is required. See the data preparation guide for asset requirements.

### Monitoring

Track these areas post-launch with your AI Decisioning Services team:

- **Performance metrics** — Success metric across experiment groups
- **Learning progress** — How recommendations evolve over time
- **Insights** — Which dimensions and options drive results per segment

### Ongoing Optimization

The AI Decisioning Services team handles:

- Performance analysis and optimization opportunities
- Expanding dimensions or options
- Adjusting constraints for business rule changes
- Scaling agents to additional use cases

> **Note:** Allow sufficient time for the agent to gather data and optimize before making significant configuration changes. The agent learns continuously over time.
