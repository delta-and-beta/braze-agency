---
name: decisioning-studio-design-agents
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/design_agents
indexed_at: '2026-04-05'
keywords:
  - decisioning
  - agent
  - metric
  - dimensions
  - optimization
  - experiments
  - constraints
  - actions
  - audience
  - conversions
triggers:
  - design a decisioning agent
  - configure success metrics
  - set up action dimensions
  - define agent constraints
  - optimize customer engagement
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase are "atomic knowledge units" stored in `skills/{id}/references/*.md`. They're designed for fast lookup at the Default depth (Sonnet), so stripping Jekyll/Liquid templating and preserving dense, scannable structure is exactly right — the MCP semantic search needs clean prose, not template noise.
`─────────────────────────────────────────────────`

## Designing Decisioning Agents

A **decisioning agent** is a custom configuration in BrazeAI Decisioning Studio that optimizes a specific business goal by experimenting with and learning which combinations of actions work best for each customer.

### Core Concepts

| Term | Definition |
|------|-----------|
| **Decisioning agent** | Custom configuration targeting a specific business goal, defined by its success metric, dimensions, and options. |
| **Success metric** | The business metric to optimize (e.g. revenue, conversions, ARPU, CLV). The agent maximizes this through its actions. |
| **Dimensions** | The *types of levers* the agent can pull — e.g. offer, subject line, creative, channel, send time. |
| **Action bank** | The *specific options* available for each dimension lever. Defines the full universe of possible agent actions. |
| **Constraints** | Rules that limit agent actions to respect business requirements (e.g. geo-eligibility rules, budget caps). |

The agent can only take actions explicitly configured in the action bank. All possible behaviors are combinations of what you put there.

---

### Four Design Elements

**1. Success metric ("the goal")**
What outcome should the agent maximize? Use real business results — revenue, conversions, ARPU, customer lifetime value — not proxy metrics like clicks or opens.

**2. Audience ("the who")**
Who will the agent engage? Options include all customers, a segment (e.g. loyalty members), or a lifecycle cohort (e.g. recent purchasers, at-risk subscribers).

**3. Action bank ("the what")**
Define the dimensions and the specific options within each. The agent experiments across combinations to find what works best per customer.

**4. Constraints ("the how")**
Define rules the agent must follow — geography restrictions, budget limits, frequency caps, or eligibility rules.

---

### Best Practices

- Choose a success metric that directly aligns with business objectives, not vanity metrics.
- Prioritize dimensions most likely to move the needle on your success metric.
- Select dimension options (e.g. email vs. SMS, daily vs. weekly) based on expected impact.
- Decisioning Studio runs daily experiments automatically — no manual A/B test management needed.

---

### Agent Examples

| Agent Type | Goal | Key Dimensions Tested |
|-----------|------|-----------------------|
| **Repeat purchase** | Increase follow-up conversions post-sale | Product offers, message timing, frequency |
| **Cross-sell / upsell** | Maximize ARPU from subscriptions | Messages, send times, discounts, plan offers |
| **Renewal & retention** | Secure contract renewals, maximize NPV | Renewal offers, discount levels |
| **Winback** | Reactivate lapsed subscribers | Creative, message, channel, cadence |
| **Referral** | Drive new account openings via referrals | Emails, creatives, send times, card offers |
| **Lead nurturing** | Drive incremental revenue, optimize cost per customer | Customer segments, bidding methodology, bid levels, creative |
| **Loyalty & engagement** | Maximize purchases by new loyalty enrollees | Email cadence, offers, messaging |

BrazeAI learns the best combination for each individual customer over time, then orchestrates personalized sends through Braze to maximize the configured success metric.

`★ Insight ─────────────────────────────────────`
The tabular agent examples consolidate the `{% tabs %}` block (a Jekyll UI component) into a single scannable table — this is idiomatic for topic files since the MCP search indexes plain text. The four design elements map directly to the "goal/who/what/how" framework in the source, preserving the mental model without the rhetorical questions.
`─────────────────────────────────────────────────`
