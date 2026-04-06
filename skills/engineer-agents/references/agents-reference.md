---
name: agents-reference
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/brazeai/agents/reference'
indexed_at: '2026-04-05'
keywords:
  - agents
  - models
  - apikey
  - gemini
  - thinking
  - tokens
  - billing
  - integration
  - byok
  - configuration
triggers:
  - how to set up an agent
  - choose an LLM model
  - configure API key
  - thinking levels for agents
  - token cost and billing
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — the deepest layer of the content hierarchy. They live in `skills/{skill-name}/references/` and are designed to be self-contained snippets that agents can retrieve without needing surrounding context. Stripping Jekyll template syntax (`{{site.baseurl}}`, `{% alert %}`, `{% raw %}`) is key to making them portable.
`─────────────────────────────────────────────────`

# Braze Agents Reference

## Models

Agents can use either a Braze-powered model or a bring-your-own API key model.

### Option 1: Braze Auto (Braze-powered)

- Select **Auto** in the Model dropdown — uses Gemini models
- No extra setup required; token costs are handled by Braze
- Optimized for tasks like catalog search and segment membership
- If **Braze Auto** doesn't appear in the dropdown, contact your CSM

### Option 2: Bring Your Own API Key

Connect Braze to OpenAI, Anthropic, or Google Gemini. Token costs bill directly through your provider.

**Setup:**
1. Go to **Partner Integrations** > **Technology Partners** > find your provider
2. Enter your API key
3. Click **Save**
4. Return to your agent and select the model

**Key notes:**
- Routinely test latest models — legacy models may be deprecated
- Sign up for Agent Console notifications in **Notification Preferences** to be alerted when a model becomes unavailable
- Braze uses the same IP ranges as Connected Content for outbound LLM calls; restrict your API key to those ranges for security

**Legal distinction:** Braze-provided LLMs → providers are Braze Sub-processors (covered by DPA). BYOK → your LLM provider is a Third Party Provider under your contract with Braze.

#### Thinking Levels

Some providers let you adjust thinking level, trading response quality for latency and token cost.

| Level | Use When |
|-------|----------|
| **Minimal** | Simple, well-defined tasks (catalog lookup, straightforward classification). Fastest and cheapest. |
| **Low** | Tasks benefiting from slightly more reasoning, no deep analysis needed. |
| **Medium** | Multi-step or nuanced tasks (analyzing multiple inputs to recommend an action). |
| **High** | Complex reasoning, edge cases, step-by-step deliberation required. High token cost; risk of timeout. |

**Recommended approach:** Start at **Minimal**, test, then escalate to Low/Medium only if outputs are inaccurate or inconsistent. Use High sparingly. If balancing multi-step reasoning with response time is a problem, split the use case into multiple cooperating agents in a Canvas or catalog.

#### Choosing a Model

- Prefer lower token cost models first; escalate only if outputs are inconsistent or inaccurate
- Prefer lower thinking levels first; escalate only if needed
- Balance reliability/accuracy against token usage and invocation duration
- Each use case may have a different optimal model + thinking level combination — test thoroughly

---

## Writing Instructions (System Prompt)

Instructions define agent behavior on every run. Maximum size: **25 KB**.

### Best Practices

1. **Start with the goal** — state what the agent should accomplish first
2. **Assign a role** — "You are a..."
3. **Set constraints** — audience, length, tone, format
4. **Request structure** — "Return JSON / bullet list / table..."
5. **Use examples** — show, don't tell; a few high-quality examples improve output
6. **Break complex tasks into steps** — "Step 1... Step 2..."
7. **Encourage reasoning** — "Think through the steps internally, then provide a concise final answer"
8. **Iterate** — small prompt tweaks can produce large quality gains
9. **Add guardrails** — handle edge cases and include refusal instructions
10. **Document what works** — for reuse and scaling across your team

### Using Liquid in Instructions

You can embed Liquid variables directly in agent instructions for user-level personalization. Example:

```
Tell a one-paragraph short story about this user, integrating their {{${first_name}}}, {{${last_name}}}, and {{${city}}}. Also integrate any context you receive about how they are currently thinking, feeling, or doing. For example, you may receive {{context.${current_emotion}}}, which is the user's current emotion. You should work that into the story.
```

Review rendered Liquid values in **Agent Console** > **Logs** under the agent's input/output details.
