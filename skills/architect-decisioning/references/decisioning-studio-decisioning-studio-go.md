---
name: decisioning-studio-decisioning-studio-go
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/reporting
indexed_at: '2026-04-05'
keywords:
  - decisioning
  - reports
  - performance
  - agent
  - insights
  - diagnostics
  - timeline
  - recommendations
  - SHAPs
  - control
triggers:
  - how to access reports
  - customize date ranges
  - view performance metrics
  - understand agent decisions
  - monitor data health
---
## BrazeAI Decisioning Studio — Reports & Insights

### Prerequisites

- Active Braze + BrazeAI Decisioning Studio™ contract
- CSM must enable Decisioning Studio on your behalf
- A live Decisioning Studio agent must exist

### Accessing Reports

**Navigation:** `AI Decisioning` > `BrazeAI Decisioning Studio™` > select an agent

Available report types: Performance, Insights, Diagnostics, Timeline.

### Customizing Date Ranges

- Change date range via the calendar dropdown after opening any report
- Set a **default start date** under `Settings` (gear icon)
- **Exclude specific dates** under `Settings` — excluded dates are filtered out across all reports for that agent

### Available Reports

| Report | What It Shows |
|--------|---------------|
| **Performance** | High-level agent metrics comparing treatment vs. control groups; includes Trending and Driver Tree views |
| **Insights** | How recommendation options in the action bank are generated; includes agent preferences and SHAPs reports |
| **Diagnostics** | Outbound/inbound data health: recommendation volume and data feed monitoring |
| **Timeline** | Visual record of key events (agent runs, config changes, guardrail updates) alongside performance metrics |

### Key Concepts

- **Treatment vs. Control**: Performance reports compare AI-driven decisions against a control group to measure lift
- **SHAPs**: Feature attribution values in Insights reports that explain *why* the agent ranked options as it did
- **Excluded dates**: Useful for filtering out anomalous days (e.g., outages, holidays) from all agent reports without changing the date range
