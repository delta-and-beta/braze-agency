---
name: predictive-churn-use-case
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_churn/use_case
indexed_at: '2026-04-05'
keywords:
  - churn
  - prediction
  - segmentation
  - campaign
  - engagement
  - scoring
  - audience
  - personalization
  - recommendations
  - conversion
triggers:
  - reduce churn with re-engagement
  - identify at-risk users
  - segment by churn risk score
  - build recurring campaign
  - measure churn reduction
---
## Churn Prediction Use Case: Reduce Churn with Re-engagement

### Overview

Uses Predictive Churn to proactively identify at-risk users before they go inactive, then delivers personalized re-engagement messages. The goal is to intervene while users are still active, not after they've already churned.

**Example context:** Streaming platform with 14-day churn definition (no `stream_started` event in 14 days). Previous generic "We miss you" email had ~3% conversion.

---

### Step 1: Create a Churn Prediction Model

1. Navigate to **Analytics > Predictive Churn**
2. Create a new prediction (e.g., "Churn risk in 2 weeks")
3. Define churn: user does **not** perform custom event `stream_started`
4. Set **prediction window**: 14 days
5. Set **prediction audience**: users who triggered relevant events in the past 30 days
6. Set **update schedule**: weekly
7. Click **Create prediction**

Training takes ~1 hour. After training, check the **prediction quality score** — "Good" indicates reliable predictions. The model analyzes recent sessions, view frequency, and content interactions.

---

### Step 2: Segment Users by Churn Risk Score

Each eligible user receives a **Churn Risk Score (0–100)** after training completes.

**To determine the targeting threshold:** Use the prediction audience slider to preview coverage vs. precision trade-offs based on expected true positives.

Create a segment using the **Churn Risk Score filter**:
- Select the relevant churn prediction
- Filter: score **more than 70** → label as "Likely to churn"

---

### Step 3: Build a Recurring Re-engagement Campaign

1. Create a **recurring campaign** targeting the "Likely to churn" segment
2. Enable **Intelligent Timing** — delivers at each user's optimal engagement time
3. Set **conversion event** to `stream_started` (tracks return-to-view behavior)
4. Channel: **email** (space for personalized content picks)

**Email content pattern:**
- Subject: `Don't leave these titles hanging`
- Header: `Your next great watch is waiting`
- Body: Personalized content picks, soft re-engagement tone
- CTA: `View more picks` → deep-links into app
- Recommendations: powered by **AI Item Recommendations** from product catalog

This creates a self-running weekly flow — only at-risk users are messaged, preventing over-messaging.

---

### Step 4: Measure and Iterate

**Key metrics to track:**
| Metric | Example Result |
|--------|---------------|
| Open Rate | 31% |
| Click Rate | 15% |
| Conversion Rate (stream within 48h) | 11% |
| Churn reduction vs. control | 28% improvement over generic campaign |

**Analytics touchpoints:**
- **Campaign analytics** — open/click/conversion rates
- **Funnel report** — identify drop-off between click and conversion
- **Segment volume over time** — track weekly "Likely to churn" population as a lifecycle health indicator
- **Prediction Analytics page** — compare predicted vs. actual churners to validate model accuracy

**Iteration levers:**
- A/B test subject lines
- Test different timing windows
- Experiment with content formats (e.g., carousel-style in-app messages)
- Adjust CTA copy if click→conversion friction is high

---

### Key Dependencies

| Feature | Purpose |
|---------|---------|
| Predictive Churn | Scores users 0–100 for likelihood of inactivity |
| Churn Risk Score filter | Segments users in Braze by score threshold |
| Intelligent Timing | Per-user optimal send time |
| AI Item Recommendations | Dynamic personalized content suggestions |
| Custom event: `stream_started` | Both the churn definition trigger and conversion event |
