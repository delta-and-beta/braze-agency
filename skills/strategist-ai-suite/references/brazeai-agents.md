---
name: brazeai-agents
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/brazeai/agents/reference'
indexed_at: '2026-04-05'
keywords:
  - agents
  - models
  - gemini
  - openai
  - anthropic
  - reasoning
  - api
  - instructions
  - thinking
  - catalog
triggers:
  - choose a model
  - write agent instructions
  - configure thinking levels
  - setup api key
  - model selection
---
`★ Insight ─────────────────────────────────────`
- Topic files serve as atomic knowledge units within Nick's two-layer content hierarchy — they live in `skills/{name}/references/*.md` and are the lowest-level content nodes that skills synthesize upward
- Stripping Jekyll templating (`{{site.baseurl}}`, `{% raw %}`, `{% alert %}` blocks) is essential preprocessing — these tags are meaningless outside the Jekyll build pipeline
- The "self-contained" constraint is the critical design principle: topic files must stand alone because they're retrieved individually by the semantic search router, not read in sequence
`─────────────────────────────────────────────────`

---

## BrazeAI Agents — Models & Instructions Reference

### Model Options

Agents support two model sourcing strategies:

**Option 1: Braze-powered Auto model**
- Uses Gemini models; no additional setup required
- Optimized for tasks like catalog search and segment membership
- Contact your CSM if **Braze Auto** doesn't appear in the Model dropdown

**Option 2: Bring Your Own API Key (BYOK)**
- Supported providers: OpenAI, Anthropic, Google Gemini
- Token costs billed directly through your provider, not Braze
- Setup: **Partner Integrations > Technology Partners** → enter API key → Save
- Enable Agent Console notifications (Notification Preferences) to be alerted when a model is deprecated

**Data processing distinction:**
- Braze-provided LLM → provider acts as a Braze Sub-processor (covered under your DPA)
- BYOK → provider is a Third Party Provider (separate contract responsibility)

**IP allowlisting:** Braze uses the same outbound IP ranges for LLM calls as for Connected Content. Restrict your API key to those ranges if your provider supports it.

---

### Thinking Levels

Some providers let you adjust how much reasoning the model performs before answering:

| Level | Use case | Trade-offs |
|-------|----------|------------|
| **Minimal** | Catalog lookup, simple classification | Fastest, lowest cost |
| **Low** | Light reasoning tasks | Slightly slower/costlier than Minimal |
| **Medium** | Multi-step or nuanced tasks | Balanced quality vs. cost |
| **High** | Complex reasoning, edge cases | High token cost, latency, timeout risk |

**Recommended approach:** Start at Minimal → test → increment upward only if accuracy is insufficient. If balancing multi-step reasoning with response time is difficult, split the use case across multiple agents in a Canvas or catalog.

---

### Choosing a Model

- **Cost efficiency:** Start with lower token cost models; only escalate if outputs are inconsistent or inaccurate
- **Speed:** Start with lower thinking levels; only escalate if needed
- **Testing:** Balance reliability and accuracy against token usage and invocation duration
- **Note:** Each use case may have a different optimal model + thinking level combination — test thoroughly

---

### Writing Agent Instructions

Instructions are the agent's system prompt (up to **25 KB**). They define behavior for every run.

**Best practices:**

1. State the goal first
2. Give the agent a role or persona ("You are a...")
3. Set clear constraints — audience, tone, format, length
4. Request structured output ("Return JSON / bullet list / table...")
5. Provide high-quality examples (show, don't tell)
6. Break complex tasks into numbered steps
7. Encourage explicit reasoning ("Think through steps internally, then provide a concise final answer")
8. Iterate with small tweaks — inspect Logs to see actual inputs/outputs
9. Add guardrails and refusal instructions for edge cases
10. Document what works internally for reuse

---

### Using Liquid in Instructions

Liquid variables can be embedded directly in agent instructions for per-user personalization:

```liquid
Tell a one-paragraph short story about this user, integrating their
{{${first_name}}}, {{${last_name}}}, and {{${city}}}. Also integrate
any context you receive about how they are currently thinking, feeling,
or doing. For example, you may receive {{context.${current_emotion}}},
which is the user's current emotion.
```

Review rendered Liquid values in **Agent Console > Logs** under the input/output details for each agent run.

`★ Insight ─────────────────────────────────────`
- The original doc ends mid-sentence ("### Ca") — this is truncated source content. The processed output simply stops cleanly rather than fabricating missing sections, preserving accuracy over completeness
- Liquid variable embedding in agent system prompts is architecturally interesting: it means the prompt itself is a template rendered at send-time, giving agents user-scoped context without the agent needing to fetch it separately
`─────────────────────────────────────────────────`
