---
name: architect-ai-providers
description: >-
  Integration architecture for AI model providers including OpenAI, Google
  Gemini, and Anthropic within Braze messaging workflows.
metadata:
  role: braze-architect
  topics:
    - partners-ai-model-providers
    - partners-ai-openai
    - partners-ai-google-gemini
    - partners-ai-anthropic
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` skill emphasizes **progressive disclosure** — SKILL.md should be lean (1,500–2,000 words) with imperative writing, while heavy reference content lives in `references/` files loaded only when needed. Since the user asked for just the markdown body (no frontmatter), I'll generate the body content that would go after frontmatter in a real SKILL.md.
`─────────────────────────────────────────────────`

# AI Model Provider Architecture

## Scope and Purpose

This skill covers the architecture for integrating third-party AI model providers — OpenAI, Google Gemini, and Anthropic — into Braze messaging workflows. Use it when designing systems that leverage large language models (LLMs) for content generation, personalization, and intelligent automation within Braze campaigns, Canvases, and messaging pipelines.

The lens here is **architectural**: not just how individual API calls work, but how to structure reliable, observable, and maintainable AI-powered systems at the intersection of Braze and external AI providers.

## When to Apply This Skill

Apply this skill when:

- Designing a system that calls an LLM to generate or personalize message content before or during Braze send
- Choosing between OpenAI, Gemini, or Anthropic for a Braze use case
- Architecting Connected Content templates that call AI provider APIs at send time
- Building webhook or server-side pipelines that enrich Braze user profiles with AI-generated attributes
- Evaluating latency, cost, and capability trade-offs across AI providers for a specific messaging workload
- Implementing fallback strategies when an AI provider is unavailable during message delivery

---

## Provider Overview

### OpenAI

OpenAI's GPT model family is the most widely adopted LLM for Braze integrations. Key capabilities relevant to Braze workflows:

- **Text generation**: Subject lines, body copy, CTAs, push notifications
- **Structured output**: JSON-mode responses for injecting data into Braze attributes or Liquid templates
- **Fine-tuning**: Domain-specific tone and brand voice via fine-tuned models
- **Embeddings**: Semantic similarity for content recommendation and user segmentation

**Primary integration patterns:**
- Connected Content calls at send time (synchronous, latency-sensitive)
- Server-side enrichment via API before triggering Braze campaigns (asynchronous, preferred for complex prompts)

### Google Gemini

Gemini's multimodal capabilities extend AI use in Braze beyond text:

- **Multimodal reasoning**: Combine text + image analysis for dynamic creative selection
- **Long-context processing**: Analyze full user journey data or large product catalogs in a single prompt
- **Code generation**: Automate Liquid template generation or campaign logic scripting
- **Structured extraction**: Pull entities, sentiment, and attributes from unstructured user data for Braze profile enrichment

**Primary integration patterns:**
- Offline batch enrichment pipelines feeding Braze Custom Attributes
- Creative asset analysis prior to campaign setup
- Catalog-aware personalization (large product catalog + user context in single call)

### Anthropic (Claude)

Claude's design emphasis on safety, instruction-following, and long-context fidelity makes it well-suited for regulated industries and high-stakes messaging:

- **Constrained generation**: Reliable compliance with brand guidelines and regulatory requirements (e.g., financial, healthcare messaging)
- **Document understanding**: Summarize or extract structured data from policy documents, legal disclosures, product manuals
- **Reasoning chains**: Multi-step decision logic for complex segmentation or offer selection
- **Instruction fidelity**: High reliability when generating content that must stay within strict format boundaries (e.g., SMS character limits, app push payload constraints)

**Primary integration patterns:**
- Pre-send review pipelines for regulated content
- Complex offer/recommendation logic where reasoning transparency matters
- Long-form content generation (email body, in-app messages) with strict structural constraints

---

## Architecture Patterns

### Pattern 1: Connected Content (Synchronous, Send-Time)

Call an AI provider API directly from a Braze Connected Content block during message rendering.

**Use when:** Content must reflect the freshest possible user context and real-time data.

**Trade-offs:**
- Latency adds directly to send time (budget 300–800ms per call)
- API failures at send time can suppress messages — implement `default` fallbacks in Connected Content
- Rate limits from AI providers can cause send failures under campaign burst traffic
- Cache AI responses in Connected Content where user-invariant content is acceptable

**Key design decisions:**
- Cache at the Connected Content layer for content segments not requiring per-user personalization
- Use short, deterministic prompts with explicit output format constraints to reduce response variance and token cost
- Set `max_tokens` aggressively to bound latency

### Pattern 2: Server-Side Pre-Enrichment (Asynchronous)

Generate AI content in an upstream pipeline and store the output as Braze Custom Attributes or Catalog entries before the send is triggered.

**Use when:** Content generation requires complex reasoning, large context, or multi-step workflows that exceed Connected Content latency budgets.

**Trade-offs:**
- AI content may be stale relative to the user's most recent session
- Requires orchestration infrastructure (e.g., Lambda, Cloud Functions, Airflow)
- Enables richer prompts with full user history or large product catalogs as context

**Key design decisions:**
- Trigger enrichment from Braze webhook or Currents event (e.g., session start, purchase event)
- Store AI output as a typed Custom Attribute with a `generated_at` timestamp attribute alongside it
- Build in a staleness threshold — fall back to deterministic content if the attribute is older than N hours

### Pattern 3: Hybrid (Pre-Compute + Send-Time Slot Fill)

Pre-generate parameterized content templates server-side, then inject dynamic user variables at send time via Connected Content or Liquid.

**Use when:** Content structure is stable but a small number of user-specific variables need real-time injection.

**Example:** Pre-generate a product recommendation paragraph with a `{{product_name}}` slot server-side, store it as a Custom Attribute, then use Liquid to inject the user's browsed product at send time without a live AI call.

---

## Provider Selection Guide

| Dimension | OpenAI | Google Gemini | Anthropic (Claude) |
|---|---|---|---|
| Text generation quality | Excellent | Excellent | Excellent |
| Instruction fidelity | High | High | Very High |
| Multimodal | GPT-4o (text + image) | Native multimodal | Text-primary |
| Long context | 128k tokens | 1M tokens | 200k tokens |
| Structured output (JSON) | Native JSON mode | Function calling | Tool use |
| Latency (p50) | Low–medium | Medium | Medium |
| Regulated content use cases | Moderate | Moderate | Strong |
| Fine-tuning | Yes | Yes | No (Claude) |

---

## Reliability and Observability

### Fallback Strategy

Design every AI integration with a deterministic fallback:

1. Define a non-AI default for every AI-generated content slot (static copy, rule-based selection)
2. Catch provider errors at the boundary and route to fallback immediately — do not retry synchronously during Connected Content execution
3. Log which path (AI vs. fallback) was taken for every send for monitoring

### Rate Limit Management

- Use separate API keys per Braze campaign type to isolate rate limit consumption
- Implement exponential backoff in server-side pipelines
- Monitor token consumption per campaign and set alerts before quota thresholds

### Prompt Versioning

Treat prompts as versioned artifacts:

- Store prompts in a configuration layer (environment variable, parameter store, or CMS), not hardcoded in Connected Content or application code
- Tag each prompt version and log the version used alongside generated content for debugging and attribution
- Evaluate prompt changes against a test set before rolling to production traffic

---

## Topics Synthesized in This Skill

This skill synthesizes knowledge from the following topic references:

- **AI Model Providers Overview** — Comparative introduction to OpenAI, Google Gemini, and Anthropic capabilities relevant to Braze
- **OpenAI Integration** — GPT model usage patterns, Connected Content templates, structured output, and embeddings within Braze workflows
- **Google Gemini Integration** — Multimodal and long-context applications, batch enrichment pipelines, and catalog-aware personalization
- **Anthropic Integration** — Claude usage patterns for constrained generation, regulated industries, and high-fidelity instruction following within Braze messaging

---

## Additional Resources

### Reference Files

For detailed API call patterns and example Connected Content templates, consult:

- **`references/openai-integration.md`** — GPT Connected Content templates, JSON mode patterns, embedding-based segmentation
- **`references/gemini-integration.md`** — Multimodal workflows, batch enrichment architecture, large-context prompt design
- **`references/anthropic-integration.md`** — Claude constraints, regulated content workflows, tool use patterns for Braze
- **`references/provider-comparison.md`** — Detailed capability matrix, latency benchmarks, cost modeling guidance

`★ Insight ─────────────────────────────────────`
The skill body intentionally avoids deep API call specifics — those belong in `references/*.md` files per the progressive disclosure principle. The body stays focused on *architectural decision-making* (when to use each provider, which pattern to apply), which is the stable, always-useful layer. Provider API details change faster and are larger, making them ideal candidates for reference files loaded only when needed.
`─────────────────────────────────────────────────`
