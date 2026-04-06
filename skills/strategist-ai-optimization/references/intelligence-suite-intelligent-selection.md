---
name: intelligence-suite-intelligent-selection
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/intelligence_suite/intelligent_selection
indexed_at: '2026-04-05'
keywords:
  - intelligent-selection
  - bandit
  - variant
  - conversion
  - campaign
  - canvas
  - optimization
  - traffic
  - algorithm
  - re-eligibility
triggers:
  - how to set up intelligent selection
  - optimize campaign variants automatically
  - when to use bandit algorithm
  - improve conversion with intelligent selection
  - configure variant distribution
---
## Intelligent Selection

A BrazeAI feature that automatically adjusts variant distribution for recurring campaigns and Canvases twice daily, using a **multi-armed bandit algorithm** to shift traffic toward higher-performing variants while filtering out underperformers.

**Best for:** Recurring campaigns. Single-send campaigns should use traditional A/B tests instead.

---

### Prerequisites

**Campaigns:**
- Recurring schedule (single-send not supported)
- At least 2 message variants
- Conversion event defined
- Re-eligibility window ≥ 24 hours

**Canvas:**
- At least 2 message variants in a Message step
- At least 1 conversion event

---

### Setup

**Campaign:** Add in the **Target Audiences** step of the campaign composer (multi-send only).

**Canvas:** Add at least one conversion event and two variants, then select a variant percentage in the Build step to expose the Intelligent Selection toggle.

---

### How It Works

1. Analyzes conversion performance twice daily
2. Gradually shifts traffic toward better-performing variants
3. Runs until it reaches **95% confidence** that continuing won't improve conversion rate by more than 1% of its current rate
4. Typically selects one **Winning Variant** and gives it 100% of future sends

**Early-stage behavior:** During the training period, variants receive approximately equal sends regardless of configured percentages. Final allocations are set only after sufficient data is gathered. Use fixed A/B variants if even early distribution is undesirable.

---

### When Intelligent Selection Is Unavailable (grayed out)

- No conversion events added
- Single-send campaign
- Re-eligibility window < 24 hours
- Canvas has only one variant (no control group or additional variants)
- Canvas has only a control group (no variants)

---

### Re-eligibility Restriction (< 24 hours)

Re-eligibility windows under 24 hours are blocked because:
- Intelligent Selection cannot guarantee users receive the same variant on re-entry (distribution shifts continuously)
- Users re-entering before variant performance is re-evaluated skew the dataset
- A 24-hour gap ensures a statistically valid dataset for the algorithm

**Example of distribution shift between rounds:**

| Variant | Round 1 | Round 2 |
|---------|---------|---------|
| Variant A | 20% | 15% |
| Variant B | 20% | 25% |
| Control | 60% | 60% |

---

`★ Insight ─────────────────────────────────────`
The multi-armed bandit approach here is a classic explore/exploit tradeoff — early sends explore all variants roughly equally, then traffic exploits the best performer once confidence is established. The 95%/1% stopping criterion is a standard regret-minimization heuristic: stop when the expected gain from continuing is negligible relative to current conversion rate.
`─────────────────────────────────────────────────`
