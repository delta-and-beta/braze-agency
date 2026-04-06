---
name: agents-deploying-agents
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/agents/deploying_agents
indexed_at: '2026-04-05'
keywords:
  - agents
  - canvas
  - catalog
  - journeys
  - personalization
  - routing
  - deployment
  - automation
  - lead-scoring
  - workflows
triggers:
  - deploy agents to canvas steps
  - apply agents to catalog fields
  - set up agent-driven journeys
  - automate catalog value generation
  - configure intelligent routing with agents
---
## Deploying Braze Agents

Braze agents can be deployed in two contexts: **Canvas steps** (for real-time journey personalization) and **catalog fields** (for automated value generation on catalog rows).

---

## Agents in Canvas (Agent Step)

Use agents as steps in a Canvas journey to personalize messages or drive decisioning at runtime.

### Common Use Cases

| Use Case | Description |
|---|---|
| Lead scoring | Score leads 1–10; route high-scorers into nurture paths, disqualify low-fit leads |
| Dynamic personalization | Generate subject lines, product recommendations, or copy from user attributes/behaviors |
| Feedback handling | Analyze sentiment from customer comments; generate empathetic follow-ups or escalate for high-value users |
| Intelligent routing | Use boolean/numeric agent outputs to split users into Canvas paths (e.g., "at risk" vs "healthy") |
| Survey interpretation | Parse free-text responses into structured values that drive downstream paths |
| Multi-step reasoning | Combine context fields to recommend next-best action (email, SMS, human outreach) |

---

## Agents in Catalogs

Apply an agent to a catalog field to automatically generate or calculate values for each row—including future rows added after deployment.

### Common Use Cases

| Use Case | Description |
|---|---|
| Product descriptions | Generate marketing copy from structured data (name, category, features) |
| Attribute enrichment | Fill missing fields (color family, style, season) from product name/details |
| Derived fields | Calculate "fit score" or "popularity tag" from existing attributes |
| Tagging | Assign recommendation tags (e.g., "outdoor", "festival-ready", "premium") |
| Localization | Translate catalog text or adjust tone/length for regional channels |
| Review summarization | Produce sentiment scores or short summaries from feedback fields |

### Setup Steps

1. In your catalog, add a new field
2. Select **Apply AI agent**
3. Assign an agent to the field
4. Select which columns to pass as input (leaving none selected passes all columns)
5. Choose whether to **recalculate when catalog rows update** (if not selected, agent runs once per row)
6. Select **Add fields** → review **Cost Estimation** modal (runs ≈ total row count) → **Confirm**

### How Catalog Agents Run

- Agent evaluates each row using selected columns as context
- Runs automatically on all new rows added after deployment
- If **Recalculate on update** is enabled, all values refresh when source fields change
- To remove: unselect **Apply AI agent** — column reverts to non-agentic, retaining last agent-generated values

**Constraints:**
- Input values limited to **25 KB per row**
- **Circular references are not supported** (e.g., Agentic Column A cannot use Agentic Column B as input if B also uses A)

### Response Fields (Structured Output)

If the agent uses structured output fields, you can map a specific field to the catalog column:

```
Agent fields example:
  description           → Text
  confidence_score_out_of_ten → Number

Catalog field "product_description" → maps to agent's "description" output
```

- Manual override: select **Edit Item** and update the cell value
- Revert to agent value: select the refresh symbol in the cell

### Error Handling

- Failed catalog invocations **do not retry**
- API errors (invalid key, rate limit) → field value does not update
- Review agent logs for details on failed runs

---

## Monitoring

**Usage section** — view all Canvases and catalogs where the agent is actively deployed.

**Logs section** — monitor actual agent calls. Filter by:
- Date range
- Outcome (success / failure)
- Calling location

Export current page logs via **Export CSV**.

Select **View** on a specific log entry to inspect: input, output, and user ID.

> Daily invocation limit errors can also be monitored in the **Message Activity Log** (`Administrative > App Settings`).

---

`★ Insight ─────────────────────────────────────`
- The two deployment contexts (Canvas vs. Catalog) serve fundamentally different runtime models: Canvas agents are **request-time** (per user, per journey execution), while catalog agents are **batch-time** (per row, triggered on add/update). This distinction matters for cost estimation and latency expectations.
- The "no circular references" constraint in catalogs reflects a dependency resolution problem — Braze likely topologically sorts agentic columns before evaluation, which breaks on cycles.
- The 25 KB per-row input cap is a practical chunking boundary — designs that pass large text fields (e.g., full review bodies) will need pre-truncation strategies to stay within limits.
`─────────────────────────────────────────────────`
