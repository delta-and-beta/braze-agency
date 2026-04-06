---
name: predictive-churn-creating-a-churn-prediction
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_churn/creating_a_churn_prediction
indexed_at: '2026-04-05'
keywords:
  - churn
  - prediction
  - analytics
  - audience
  - filters
  - segmentation
  - scoring
  - model
  - window
  - users
triggers:
  - how to create a churn prediction
  - define churn in Braze
  - set up prediction audience
  - build churn model
  - configure churn filters
---
## Creating a Churn Prediction in Braze

### Step 1: Create a New Prediction

Navigate to **Analytics** > **Predictive Churn**. Select **Create Prediction** > **Churn Prediction**.

**Limits:**
- Max 5 concurrently active churn predictions (paid)
- 1 active preview prediction (pre-purchase) — does not update scores or allow targeting

On the **Basics** page, give the prediction a unique name and optional description. Use **Build Now** to skip to the last step with defaults, or **Forward** to configure step-by-step.

---

### Step 2: Define Churn

Specify what constitutes churn using filters in the **Churn Definition** panel. Define churn as something a user either:
- **Does once** (`do`) — e.g., uninstalls the app
- **Stops doing** (`do not`) — e.g., has not started a session in 7 days

**Churn Window:** The lookback period (up to 60 days) used to identify churned users for model training. After build, the _Churn Risk Score_ reflects the probability of churning within this window.

**Semantic note on active users:**
- For `do not`: active users are those who *performed* the action recently and then stopped.
- For `do`: active users are those who *did not* take the action before the event.
- Example: If churn = "no purchase in 60 days", then only users who *did* purchase in the past 60 days are considered active — the churn audience may appear much smaller than the full user base.

Filters can be combined with `AND` / `OR`. The UI shows estimated historical user counts and minimum data requirements.

---

### Step 3: Filter Prediction Audience

The prediction audience is who the model trains on and scores. Default is **All Users** (active per churn definition).

To narrow scope, select **Define my own prediction audience** and apply filters. Example: a ride-sharing app building a rider-churn model should filter to riders only.

**Constraints:**
- Prediction audience cannot exceed **100 million users**
- When churn window ≤ 14 days, `Last...` filters (e.g., "Last Used App") **cannot exceed the churn window length**
- The churn window looks back from the model's last run date

**Full Filter Mode:** Unlocks all Braze segmentation filters, but requires one full churn window to collect data before the prediction builds. Audience size estimates are unavailable in this mode.

`★ Insight ─────────────────────────────────────`
- The churn definition determines who counts as "active" — this is a closed-world assumption that can dramatically shrink the effective audience. Understanding this prevents surprise when audience sizes look small.
- Braze's two-tier filter system (standard vs. Full Filter Mode) is a latency/capability tradeoff: standard filters give immediate predictions, Full Filter Mode gives full segmentation power at the cost of a full churn-window delay.
- The churn window serves double duty: it defines the training lookback *and* the future risk window in the output score — so the same 7-day window means "trained on 7-day lapse" and "score = P(churn in next 7 days)".
`─────────────────────────────────────────────────`
