---
name: agents-creating-agents
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/agents/creating_agents
indexed_at: '2026-04-05'
keywords:
  - agents
  - Canvas
  - catalog
  - messaging
  - schema
  - decisioning
  - instructions
  - output
  - Liquid
  - temperature
triggers:
  - create Braze agent
  - set up custom agent
  - write agent instructions
  - define agent output
  - test agent response
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline serve as **atomic knowledge units** — the smallest self-contained pieces of knowledge that agents can reference. The key transformation here is removing Jekyll template artifacts (`{{site.baseurl}}`, `{% alert %}` tags, `{: .reset-td-br-1}` classes) that are only meaningful in the source docs site, not in an LLM context window.
`─────────────────────────────────────────────────`

## Creating Braze Agents

Custom agents in Braze can be deployed for three action categories:
- **Messaging** — Generate subject lines, headlines, in-product copy
- **Decisioning** — Route users in Canvas based on behavior, preferences, or custom attributes
- **Data management** — Calculate values, enrich catalog entries, refresh profile fields

### Prerequisites

- Permission to access **Agent Console** in your workspace
- Permission to create and edit custom AI Agents
- An AI model provider integrated with Braze

### Creation Steps

#### Step 1: Choose Agent Type

Navigate to **Agent Console > Agent Management**, select **Create agent**, then choose either a **Canvas agent** or **catalog agent**.

#### Step 2: Set Up Details

| Field | Notes |
|---|---|
| Name & description | Helps team understand purpose |
| Tags | Optional; for filtering |
| Model | Choose from available AI models |
| Thinking level | Minimal / Low / Medium / High — start with **Minimal** and tune up |
| Daily execution limit | Default 250,000; max 1,000,000 (contact CSM to exceed) |

#### Step 3: Write Instructions

- Include instructions for **unexpected or ambiguous scenarios** to prevent errors
- Example: ask for `"unsure"` as a fallback instead of only `"positive"` / `"negative"`
- Canvas agents support **Liquid** in instructions to reference user attributes (e.g., first/last name, custom attributes) — Liquid variables are automatically passed to the Agent step

**Resources you can attach:**
- **Catalog fields** — gives the agent access to catalog data
- **Segment membership** — personalize based on segments (up to 5)
- **Brand guidelines** — enforces voice and style (e.g., "bold, motivational tone for gym SMS")
- **All Canvas Context** — includes all Canvas context variables for the user, even those not referenced in instructions

**Optional settings:** Adjust **temperature** — higher values produce more creative output.

#### Step 4: Define Output

- Choose **basic schema** or **advanced schema**
- Output definition must match instructions — mismatches cause timeouts or bad outputs
- For advanced schemas: add a `string` field named `explanation` if you want the agent to return its rationale; instruct the agent to populate it in your instructions

#### Step 5: Test Before Publishing

Use the **Preview** pane (side-by-side panel) to simulate responses:
1. Enter example customer data in **Test your agent**
2. Choose a random user, existing user, or custom user context
3. Select **Simulate response**

> Test runs count toward your daily execution limit.

### Common Use Cases

| Use Case | What the Agent Does |
|---|---|
| Customer feedback handling | Analyzes sentiment, generates empathetic follow-ups; escalates for high-value users |
| Content localization | Translates catalog text; adjusts tone/length for regional channels |
| Summarize reviews | Assigns sentiment scores or generates short summaries into a new catalog field |

### Key Behaviors

- Agents can be **paused or updated** at any time from the dashboard
- An agent goes live after creation and is deployable in Canvas steps or catalog workflows
- Output schema and instructions must be **consistent** — an object with two strings in instructions requires an object with two strings in the output definition
