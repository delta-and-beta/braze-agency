---
name: brazeai-content_optimizer
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/brazeai/content_optimizer'
indexed_at: '2026-04-05'
keywords:
  - optimization
  - variants
  - canvas
  - content
  - bandit
  - email
  - personalization
  - message
  - combination
  - CTA
triggers:
  - how to optimize message variants
  - set up canvas content testing
  - test email subject lines
  - configure personalization combinations
  - enable content optimization
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units nested inside a skill's `references/` directory. The goal is to strip Jekyll/Liquid template artifacts and boilerplate while preserving the dense, factual content that an agent can retrieve and reason over at runtime.
`─────────────────────────────────────────────────`

## Content Optimizer

Content Optimizer is a Canvas step agent (currently **beta, email only**) that uses AI to generate, test, and automatically optimize message content variants at scale — without manual A/B test configuration.

### What it optimizes (email)

| Component | Goal | Test dimensions |
|---|---|---|
| Subject line | Increase open rate | Tone, urgency, personalization, emojis |
| Body header | Boost engagement | Emotional vs. value-driven vs. direct |
| Body content | Improve readability | Storytelling vs. feature lists, bullets vs. paragraphs, length |
| Primary CTA | Increase click-throughs | Action-led, benefit-focused, first-person phrasing |
| Themed combinations | Discover winners | Mix subject + body + CTA components together |

### How it works

Uses a **non-contextual multi-armed bandit** algorithm:

1. **Exploration phase** — On first launch, sends variants randomly to collect baseline performance data.
2. **Optimization phase** — Shifts traffic toward higher-performing combinations; reduces allocation to underperformers.
3. **Combinatorial learning** — Braze's proprietary bandit is built for combinatorial content: when one combination is sent, all combinations sharing the same components benefit from that send's data. This means faster learning than a standard bandit on the same data volume.

Each user receives exactly one message per Canvas entry. Re-entries are treated as new (no memory of previous variants sent).

### Key concepts

| Term | Description |
|---|---|
| Base message | Main message template; all send settings live here. |
| Content component | A testable element (e.g., subject line, CTA). Requires a Liquid tag inserted manually in the composer. |
| Content variant | One value a component can take. |
| Content combination | A unique message formed by mixing one variant per component. |
| Optimization event | The metric (opens, clicks) used to score combinations and allocate traffic. |

### Canvas entry setup

**Best fit:** Recurring or always-on Canvases with consistent daily volume (event-triggered, API-triggered, daily recurring entry).

**Avoid:** Single-send or "spiky" Canvases (e.g., monthly recurring) — the algorithm won't have time to learn before most users have already passed through the step.

**Mitigation for spiky Canvases:** Use Entry Controls to smooth user entries over multiple days.

### Limitations

- Beta; **email only**
- Max **125 combinations** per step
  - Up to **3 components** per step
  - Up to **5 variants** per component
- Marketers must **manually insert Liquid tags** for each component in the message composer
- No cross-entry memory; each re-entry is treated as a fresh user

### Relationship to Message step

Content Optimizer supports the same features as the standard Canvas Message step: quiet hours, Intelligent Timing, and event logging.
