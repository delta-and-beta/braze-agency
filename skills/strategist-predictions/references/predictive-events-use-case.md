---
name: predictive-events-use-case
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_events/use_case
indexed_at: '2026-04-05'
keywords:
  - predictive
  - upgrade
  - segmentation
  - likelihood-score
  - subscription
  - canvas
  - conversion
  - targeting
  - personalization
  - event-prediction
triggers:
  - predict subscription upgrades
  - segment users by upgrade likelihood
  - personalize messaging by intent
  - increase upgrade conversion rate
  - target users ready to upgrade
---
`★ Insight ─────────────────────────────────────`
- Jekyll liquid tags like `{% image_buster %}` and `{{site.baseurl}}` are build-time artifacts — strip them entirely rather than converting to placeholder URLs
- The tab structure (`{% tabs %}`) carries meaningful content (per-segment message copy) worth preserving as flat sections rather than discarding
- Percentage metrics in the raw doc are truncated mid-sentence — include what's complete and omit the broken trailing data
`─────────────────────────────────────────────────`

Here's the processed topic file:

---

## Event Prediction Use Case: Predicting Subscription Upgrades

Braze Predictive Events lets you model the likelihood a user performs a specific custom event, then segment users by that probability score to tailor messaging by intent level.

### Scenario

A health/fitness app (free + paid tiers) wants to increase Pro plan upgrades without blasting discounts to users who would have upgraded anyway. Current approach: send "50% off Pro" to all free-tier users at day 7 → ~5% conversion, but over-discounts high-intent users.

**Goal:** Use `upgraded_to_pro` event prediction to split users by upgrade likelihood and send differentiated messages.

---

### Step 1: Create the Predictive Model

1. Navigate to **Analytics > Predictive Events**
2. Create a new prediction named e.g. *"Upgrade to Pro in 7 days"*
3. Set **target event** to the custom event: `upgraded_to_pro`
4. Set **prediction window** to 7 days
5. Set an update schedule and save

Braze trains a model on historical user behavior to predict who will fire `upgraded_to_pro` within the window.

---

### Step 2: Segment by Event Likelihood Score

After training, Braze assigns an **Event Likelihood Score (0–100)** to each eligible user.

Create segments using the **Event Likelihood Score** filter (select your prediction):

| Segment | Filter |
|---|---|
| **Likely to upgrade** | Score > 70 |
| **Needs nudge to upgrade** | Score > 40 AND < 70 |

> Tip: Combine likelihood score filters with other attributes (e.g., feature usage) to create subgroups. Example: split each segment by "frequently uses fitness tracking" → 4 total subgroups for more precise targeting.

---

### Step 3: Personalize Messaging by Intent Level

Build a Canvas with an **Audience Paths** step targeting the 4 subgroups. Set the Canvas **conversion event** to `upgraded_to_pro` for automatic tracking.

#### Message Strategy by Path

**High intent, fitness-focused**
- Subject: *Go further with your fitness goals*
- Angle: Unlock deeper insights (advanced analytics, muscle group tracking) — no discount
- CTA: *Start your free Pro trial*

**High intent, other**
- Subject: *You're almost there—Pro is ready when you are*
- Angle: Broader Pro benefits (custom plans, coaching, personalization) — no discount
- CTA: *Start your free Pro trial*

**Low intent, fitness-focused**
- Subject: *Ready to train smarter? Try Pro at 50% off*
- Angle: Reduce friction with limited-time offer tied to fitness goals
- CTA: *Get 50% off Pro*

**Low intent, other**
- Subject: *50% off Pro—just for this weekend*
- Angle: Simple benefits-first + discount, soft language, no pressure
- CTA: *Get 50% off Pro*

---

### Step 4: Measure and Optimize

Review performance in **Canvas Analytics** after the campaign runs. Representative results (email channel):

| Path | Open Rate | Click Rate | Conversion Rate | Discount |
|---|---|---|---|---|
| High intent, fitness | 34% | 20% | 13% | None |
| High intent, other | 30% | — | — | None |

**Key optimization levers:**
- Adjust score thresholds (e.g., raise "Likely" cutoff from 70 → 75) based on observed conversion rates
- Test whether high-intent users respond better to feature-specific vs. generic benefit copy
- Monitor discount redemption vs. organic conversions to quantify over-discounting reduction

---

### Key Concepts

- **Event Likelihood Score**: 0–100 per-user score predicting probability of a custom event firing within the prediction window
- **Prediction window**: The future time horizon (e.g., 7 days) over which the model predicts event occurrence
- **Audience Paths (Canvas)**: Step that routes users into branches based on segment membership, enabling intent-differentiated message flows
