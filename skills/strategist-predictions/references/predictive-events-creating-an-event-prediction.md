---
name: predictive-events-creating-an-event-prediction
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/predictive_suite/predictive_events/creating_an_event_prediction
indexed_at: '2026-04-05'
keywords:
  - prediction
  - events
  - scoring
  - audience
  - window
  - training
  - model
  - schedule
  - archiving
  - likelihood
triggers:
  - how to create an event prediction
  - create a prediction
  - set up predictive events
  - define prediction audience
  - configure event prediction
---
## Creating an Event Prediction

A prediction is one instance of a trained ML model plus its parameters and data. Navigate to **Analytics** > **Predictive Events** to manage predictions.

**Limits:** Max 5 concurrently active predictions. Before purchasing, limit is 1 active preview prediction (preview predictions do not update scores or target users).

---

### Step 1: Create

1. Click **Create Prediction** → **Event Prediction**
2. Enter a unique name and optional description
3. Click **Forward** to proceed step-by-step, or **Build Now** to use all defaults

---

### Step 2: Event Tracking

Choose whether events are stored as **purchase events** or **custom events**.

**Event Window:** Time frame (up to 60 days) for predicting if a user will perform the event. Used for both:
- Training on historical data
- Scoring users post-creation ("how likely in the next N days")

---

### Step 3: Prediction Audience (Optional)

Default: **All Users**. To narrow scope, select **Define my own prediction audience** with filters.

**Key rules:**
- Filters should reflect user characteristics (active users, region, tenure), **not** whether the user already performed the target event — the model needs both completers and non-completers to learn
- Max audience size: **100 million users**
- If Event Window ≤ 14 days, "Last..." filters (e.g., Last Used App) **cannot exceed the Event Window duration**

**Full Filter Mode:** Enables all Braze segmentation filters, but requires one full Event Window to build (e.g., 14-day window = 14-day wait). Audience size estimates unavailable in this mode.

---

### Step 4: Update Schedule

Select the **maximum frequency** for regenerating likelihood scores. Match to your campaign cadence (e.g., weekly promotions → weekly updates).

> Preview and demo predictions never update likelihood scores.

---

### Step 5: Build

Click **Build Prediction** (or **Save As Draft** to return later).

- Build time: **30 minutes to a few hours** depending on data volume
- Model inputs: custom events, purchase events, campaign interaction events, session data
- On completion: page switches to analytics view + email notification sent
- On error: returns to edit mode with explanation

**Automatic retraining:** Every **two weeks** (separate from the score update schedule set in Step 4).

---

### Archived Predictions

- Archiving stops score updates immediately
- Unarchiving resumes updates on the original schedule
- Archived predictions are **never deleted** — they remain in the list indefinitely
