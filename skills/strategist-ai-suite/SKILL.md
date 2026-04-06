---
name: strategist-ai-suite
description: >-
  Leverages BrazeAI capabilities including predictive analytics, generative AI,
  content optimization, and intelligent decisioning.
metadata:
  role: braze-strategist
  topics:
    - brazeai-predictive_suite
    - brazeai-intelligence_suite
    - brazeai-generative_ai
    - brazeai-content_optimizer
    - brazeai-decisioning_studio
    - brazeai-item_recommendations
    - brazeai-agents
    - brazeai-operator
    - brazeai-mcp_server
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development skill calls for lean SKILL.md bodies (1,500–2,000 words) using imperative/infinitive form — not second person. Details go into `references/` files, not the main body. The frontmatter description is the "trigger" signal Claude uses to decide when to load the skill.
`─────────────────────────────────────────────────`

# BrazeAI & Intelligence

Apply Braze's AI and machine learning capabilities to optimize messaging strategy, drive personalization at scale, and leverage intelligent decisioning across the customer journey. This skill covers the full BrazeAI surface area — from predictive analytics and generative content to autonomous agents and real-time recommendations.

Use this skill when:
- Designing campaigns that use Predictive Events or Predictive Churn
- Configuring the Intelligence Suite (Intelligent Selection, Delivery, Channel)
- Working with BrazeAI Operator for in-platform AI assistance
- Setting up Item Recommendations for personalized content
- Using Generative AI or Content Optimizer to produce or refine copy
- Implementing Decisioning Studio for offer or content ranking
- Integrating BrazeAI Agents into automated workflows

---

## Scope and Purpose

BrazeAI encompasses the predictive, generative, and autonomous capabilities built into the Braze platform. The lens for this skill is **strategic application**: not just how each feature works mechanically, but when to use it, how to sequence it with other Braze tooling, and how to measure its impact on messaging outcomes.

The capabilities divide into three broad categories:

| Category | Features |
|---|---|
| **Predictive** | Predictive Events, Predictive Churn, Item Recommendations |
| **Generative** | Generative AI (copy), Content Optimizer, BrazeAI Operator |
| **Autonomous** | Intelligence Suite (Selection, Delivery, Channel), Decisioning Studio, BrazeAI Agents |

---

## Core Topics

### Predictive Suite

Predictive Events and Predictive Churn use gradient boosted decision trees trained on historical user behavior to score individuals by likelihood. Use these scores to:

- Target high-likelihood converters with conversion-focused messages
- Target high-churn-risk users with retention offers before they lapse
- Suppress low-probability users to reduce send volume and cost

**Key workflow:** Train the model → review quality score → create a segment using the prediction score filter → build a campaign or Canvas targeting that segment.

Predictions require sufficient historical event data (typically 10k+ relevant users) and retrain automatically on a schedule. Review model quality before acting on a new prediction.

### Item Recommendations

Item Recommendations surfaces personalized product or content suggestions per user. View analytics at **Analytics > Item Recommendation** and monitor:

- **Audience metrics** — coverage, impressions, click-through
- **Recommendation quality** — diversity, novelty, relevance signals

Use recommendations inside Connected Content or Liquid variables within message templates to inject the right items per user at send time.

### Intelligence Suite

The Intelligence Suite provides three automated optimization layers:

- **Intelligent Selection** — Allocates send traffic toward best-performing message variants using a multi-armed bandit approach. Use in A/B tests when exploration/exploitation balance matters more than a hard winner declaration.
- **Intelligent Timing** — Sends to each user at their historical peak engagement time. Combine with local timezone delivery for international audiences.
- **Intelligent Channel** — Routes users to their most-responsive channel. Requires multi-channel presence (email + push + in-app) and sufficient engagement history.

Apply Intelligence Suite features incrementally. Intelligent Timing requires more data than Intelligent Channel; don't enable both without checking coverage rates.

### BrazeAI Operator

BrazeAI Operator is the in-platform AI assistant. Access it via the Operator panel in the Braze dashboard.

**Common troubleshooting:**

| Issue | Resolution |
|---|---|
| No response | Refresh the page and re-open the Operator panel |
| Off-topic answers | Reframe the question with more specific context |
| Incorrect campaign references | Confirm the workspace scope and re-prompt |

Operator is most effective for quick lookups, draft generation, and explaining dashboard data. It does not execute actions — it informs decisions.

### Generative AI and Content Optimizer

**Generative AI** produces draft copy for subject lines, push notifications, email bodies, and in-app messages using prompts. Use it to accelerate first drafts, not as a final-copy source. Always review and edit generated output for brand voice and compliance.

**Content Optimizer** analyzes existing copy and suggests improvements for clarity, engagement, and readability. Run it on high-volume sends where small lift in open or click rate has meaningful scale impact.

Workflow: draft with Generative AI → refine with Content Optimizer → A/B test against human-written control.

### Decisioning Studio

Decisioning Studio ranks offers, content variants, or actions per user based on configured rules and AI scoring. Use it when:

- Multiple offers compete for the same placement
- Eligibility rules alone are insufficient for prioritization
- Personalized ranking matters more than random or equal distribution

Configure decision tables with eligibility criteria, ranking logic, and fallback options. Connect to Canvas to inject decisioning output into message personalization.

### BrazeAI Agents

BrazeAI Agents are autonomous AI workers that operate within Braze workflows. They can monitor conditions, trigger follow-up actions, and handle multi-step orchestration without manual intervention.

Use agents for:
- Post-conversion follow-up sequences that adapt to user behavior
- Anomaly detection and escalation within campaign flows
- Continuous optimization loops inside long-running Canvases

Agents are distinct from BrazeAI Operator — Operator is conversational and advisory; Agents are programmatic and action-oriented.

### BrazeAI MCP Server

The BrazeAI MCP Server exposes Braze capabilities to external AI toolchains via the Model Context Protocol. Use it to connect Braze data and actions to Claude Code, Claude Desktop, or other MCP-compatible environments.

Refer to `references/brazeai-mcp-server.md` for setup and integration patterns once documentation is available from source.

---

## Strategic Application Patterns

### Layering AI Features

AI features compound when combined intentionally:

1. **Predict → Target → Optimize**: Use Predictive Events to identify high-value users → target with a campaign → apply Intelligent Selection to surface the best variant.
2. **Recommend → Decide → Deliver**: Surface Item Recommendations → rank via Decisioning Studio → deliver via Intelligent Timing.
3. **Generate → Test → Refine**: Draft copy with Generative AI → A/B test → optimize winners with Content Optimizer.

Avoid activating multiple optimization layers on the same send without establishing a baseline. Stacked AI features make it harder to isolate what drove performance change.

### Measurement

Every AI feature requires a holdout or control group to measure incremental lift. Braze's built-in A/B and multivariate tools support this. For Predictive Suite features, compare campaign performance across prediction score buckets — don't assume model quality score alone validates business impact.

---

## Reference Files

For detailed feature configurations, analytics schemas, and advanced patterns, consult:

- **`references/predictive-suite.md`** — Predictive Events and Churn model configuration, scoring, and segmentation
- **`references/intelligence-suite.md`** — Intelligent Selection, Timing, and Channel setup and coverage requirements
- **`references/item-recommendations.md`** — Recommendation analytics metrics and Liquid integration
- **`references/decisioning-studio.md`** — Decision table configuration and Canvas integration
- **`references/generative-ai.md`** — Generative AI and Content Optimizer usage patterns
- **`references/brazeai-agents.md`** — Agent setup, workflow integration, and limitations
- **`references/brazeai-mcp-server.md`** — MCP Server setup and external toolchain integration

`★ Insight ─────────────────────────────────────`
Notice the pattern here: the SKILL.md body stays under ~1,500 words and focuses on *when* and *why* to use each capability — the strategic lens. All detailed reference material (schemas, analytics field definitions, config tables) belongs in `references/` files, loaded only when Claude determines it's needed. This is the progressive disclosure principle: metadata → body → references, each loaded on demand.
`─────────────────────────────────────────────────`
