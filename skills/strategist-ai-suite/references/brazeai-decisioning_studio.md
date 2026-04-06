---
name: brazeai-decisioning_studio
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/reporting
indexed_at: '2026-04-05'
keywords:
  - decisioning
  - reports
  - performance
  - insights
  - diagnostics
  - timeline
  - recommendations
  - agent
  - control
triggers:
  - how to access decisioning studio reports
  - viewing agent performance metrics
  - understanding recommendation insights
  - checking data health diagnostics
  - analyzing agent timeline events
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — they live in `skills/{id}/references/*.md` and are designed to be self-contained snippets that agents can retrieve without needing surrounding context. Stripping Jekyll liquid tags (`{% image_buster %}`, `{{site.baseurl}}`) and navigation chrome is essential since these won't render in an AI context window.
`─────────────────────────────────────────────────`

## BrazeAI Decisioning Studio — Reports & Insights

### Prerequisites

- Active contract for Braze **and** BrazeAI Decisioning Studio™
- CSM must enable Decisioning Studio on your account
- At least one live Decisioning Studio agent

### Accessing Reports

Navigate to **AI Decisioning > BrazeAI Decisioning Studio™**, then select an agent to view its reports.

### Changing Report Dates

- Use the calendar dropdown to set a custom start and end date
- Configure a **default start date** via the Settings gear icon
- **Exclude specific dates** (e.g., anomalous days) — excluded dates are filtered from all reports for that agent

### Available Reports

| Report | Description |
|---|---|
| **Performance** | High-level agent metrics comparing treatment vs. control groups; includes Trending and Driver Tree views |
| **Insights** | How recommendation options are generated from the action bank; includes agent preferences and SHAPs reports |
| **Diagnostics** | Outbound/inbound data health — recommendation volume and data feed monitoring |
| **Timeline** | Visual record of key events (agent runs, config changes, guardrail updates) overlaid with performance metrics |

### Key Concepts

- **Treatment vs. Control groups**: Performance reports compare users who received AI-driven recommendations against a control group
- **SHAPs reports** (in Insights): Explain which features drove individual recommendation decisions
- **Excluded dates**: Applied per-agent, affecting all report types for that agent — useful for excluding test periods or data outages

`★ Insight ─────────────────────────────────────`
The four report types map cleanly to four concerns: *did it work* (Performance), *why did it decide that* (Insights), *is the data healthy* (Diagnostics), and *what changed when* (Timeline). This is a useful mental model for agents routing user questions about Decisioning Studio.
`─────────────────────────────────────────────────`
