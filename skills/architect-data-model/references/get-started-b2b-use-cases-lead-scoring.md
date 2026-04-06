---
name: get-started-b2b-use-cases-lead-scoring
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/b2b_use_cases/lead_scoring
indexed_at: '2026-04-05'
keywords:
  - scoring
  - canvas
  - leads
  - webhook
  - integration
  - attributes
  - warehouse
  - mql
  - handoff
  - engagement
triggers:
  - set up lead scoring
  - integrate external scoring
  - send qualified leads to sales
  - automate lead handoff
  - score leads by behavior
---
# B2B Lead Scoring

Braze supports real-time lead score updates via native Canvas workflows or external integrations, with automated handoff to Sales teams.

## Simple Lead Scoring (Native Canvas)

### Canvas Setup

**Entry Schedule:** Action-Based, triggering on:
- `Change Custom Attribute Value` — your lead score attribute (e.g., `lead score`)
- `Add an Email Address`

**Audience Controls:**
- Target relevant segments (exclude employees, existing customers, etc.)
- Re-eligibility: Allow re-entry, Specified Window = **0 seconds** (users re-enter immediately)
- Subscription Settings: **All users including unsubscribed users** (operational, no messages sent)

### Canvas Structure

1. Add an **Action Path** step under your variant
2. Create up to 8 **Action Groups** — each group = a set of behaviors worth the same point value

Example groupings:
| Group | Trigger Events | Score Change |
|---|---|---|
| Group 1 | Session start, custom events (e.g., webinar signup) | +1 point |
| Group 2 | High-intent actions (e.g., demo request) | +5 points |
| Group 3 | Negative signals (e.g., unsubscribe) | -1 point |
| Everyone Else | No action taken in window | Decrement for inactivity |

3. After each Action Group path, add a **User Update** step:

| Field | Value |
|---|---|
| Attribute Name | `lead score` (your custom attribute) |
| Action | `Increment By` or `Decrement By` |
| Value | Point delta for that group |

## External Lead Scoring

### Options

**Technology Partners:** Braze has B2B partners with native lead scoring integrations.

**API Integration:** Push external scores into Braze via `POST /users/track` — works with any external model or tool.

**Cloud Data Warehouse (Bidirectional):**
- *Braze as data source:* Export engagement data (email opens, clicks, landing page visits) to your warehouse to feed external models using:
  - **Braze Currents** — streaming event export
  - **Snowflake Secure Data Sharing**
- *Warehouse as score source:* Write computed scores back to Braze as custom attributes via API or CDI

## Lead Handoff (MQL → Sales)

Once a lead crosses a score threshold, use a **webhook campaign** to notify Sales. Trigger the webhook when `lead score` reaches your MQL threshold (e.g., ≥ 50), sending structured lead data to your CRM or sales tool.

`★ Insight ─────────────────────────────────────`
- The 0-second re-eligibility window is a deliberate design choice — lead score updates are stateless increments, so users need to re-enter the Canvas on every triggering event without any cooldown.
- Using `Change Custom Attribute Value` as an entry trigger means the Canvas reacts to score changes from *any* source (API, webhook, CDI), not just native Canvas actions — this makes external and internal scoring models interoperable with the same workflow.
`─────────────────────────────────────────────────`
