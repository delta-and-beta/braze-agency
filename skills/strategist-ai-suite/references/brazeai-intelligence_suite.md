---
name: brazeai-intelligence_suite
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/intelligence_suite/tutorial
indexed_at: '2026-04-05'
keywords:
  - timing
  - selection
  - canvas
  - multivariate
  - variants
  - engagement
  - channels
  - optimization
triggers:
  - how to optimize send time
  - set up intelligent selection
  - configure multivariate testing
  - automate campaign delivery
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units — they live in `skills/{skill-name}/references/` and are designed to be retrieved independently during semantic search. The goal is maximum signal-to-noise: strip tutorial scaffolding, keep the operational facts that a Claude agent needs to give accurate answers.
`─────────────────────────────────────────────────`

## Intelligence Suite

The Braze Intelligence Suite automates two key decisions in campaign delivery: **when** to send (Intelligent Timing) and **what** to send (Intelligent Selection). Both features work within Canvas.

---

### Intelligent Timing

Analyzes each user's past interactions with the app and messaging channels to automatically select the optimal send time per user.

**How it works:**
- Evaluates per-user engagement history across all channels
- Selects the best time individually — different users receive messages at different times (e.g., afternoon vs. evening)
- Requires a **fallback time** for users with insufficient history; common choice is the most popular app-usage time across all users

**Where to configure:** Message step → Intelligent Timing delivery settings

---

### Intelligent Selection

Runs multivariate testing across message variants and progressively shifts send volume toward the best performer.

**How it works:**
- Analyzes performance of all variants **twice per day**
- Gradually increases send share for better-performing variants, decreases for underperformers
- Once a winner is statistically determined, routes **100% of sends** to that variant

**Supported variant types:** push notification, email, SMS (can test across channels)

**Where to configure:** Canvas → A/B Testing section → enable Intelligent Selection

---

### Using Both Together (Recommended Pattern)

Combining Intelligent Timing + Intelligent Selection optimizes both dimensions simultaneously:

1. **Intelligent Timing** → controls *when* each user receives the message
2. **Intelligent Selection** → controls *which* message variant each user receives
3. Launch Canvas — send distribution self-adjusts over time as data accumulates

This combination requires no manual iteration; the system converges on the best time and best message per user automatically.
