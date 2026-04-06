---
name: strategist-lead-generation
description: >-
  Optimizes lead capture funnels, interactive content, and acquisition partner
  integrations for growth.
metadata:
  role: braze-strategist
  topics:
    - leads-capture-wyng
    - leads-capture-wunderkind
    - leads-capture-viralsweep
    - leads-capture-quikly
    - leads-capture-outgrow
    - leads-capture-justuno
    - leads-capture-jebbit
    - leads-capture-facebook-via-zapier
    - extensions-surveys-jebbit
    - data-and-analytics-leads-capture
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill is a **synthesis layer** over raw vendor docs — its value is the *lens* (conversion funnel design, lead scoring), not the individual integration specs
- Skill files in this plugin pattern use domain-expert perspective to stitch together atomic topics (Jebbit, Wyng, etc.) into actionable strategy guidance
- The `ROLE: braze-strategist` framing means the skill should speak in terms of outcomes (pipeline quality, CPL) rather than implementation steps
`─────────────────────────────────────────────────`

Here is the skill markdown body:

---

# Lead Capture & Growth Strategy

## Overview

This skill covers the design, evaluation, and optimization of lead capture systems integrated with Braze. It synthesizes knowledge across interactive content platforms, contest and sweepstakes mechanics, urgency-driven capture tools, and social acquisition channels—viewed through the lens of **conversion funnel design, lead scoring, acquisition channel ROI, and interactive content strategy**.

Use this skill when advising on how to grow and qualify a contact database, select the right capture mechanism for a given audience segment, or evaluate trade-offs between acquisition partners.

---

## Lens: How to Think About Lead Capture in Braze

This skill applies four strategic filters to every lead capture decision:

### 1. Conversion Funnel Design
Every capture tool creates a micro-funnel. Evaluate tools not just on volume but on where they sit in the funnel:
- **Top-of-funnel** (awareness): contests, sweepstakes, viral mechanics (ViralSweep), urgency campaigns (Quikly)
- **Mid-funnel** (consideration): interactive content like quizzes, calculators, assessments (Outgrow, Jebbit)
- **Bottom-of-funnel** (intent): exit-intent popups, targeted overlays (Justuno), lead ad retargeting (Facebook Lead Ads)

A well-designed funnel uses different tools at each stage rather than relying on a single capture mechanism.

### 2. Lead Scoring
Not all captured leads are equal. Prioritize integrations that pass **declared data** (first-party attributes volunteered by the user) alongside the contact record:
- Jebbit and Outgrow excel here—quiz responses and calculator inputs map directly to Braze custom attributes for segmentation
- Wyng and Justuno can pass behavioral signals (e.g., which popup triggered, which offer was accepted)
- Facebook Lead Ads via Zapier typically passes only form fields—plan enrichment steps downstream

Use Braze's custom attribute and event model to capture this declared data at the moment of acquisition, not as a later enrichment step.

### 3. Acquisition Channel ROI
Evaluate each integration against cost-per-lead (CPL) and downstream engagement metrics, not just raw volume:
- **Organic/viral**: ViralSweep contests drive low-CPL acquisition but often attract prize-seekers; pair with qualification messaging post-capture
- **Paid social**: Facebook Lead Ads delivers intent-qualified leads but requires Zapier automation to flow into Braze reliably; audit Zap failure rates
- **On-site**: Justuno popups and Wyng widgets capture high-intent traffic already on-property—typically the highest LTV cohort

Recommend tracking `lead_source` and `lead_capture_tool` as Braze custom attributes on every acquired contact to enable channel-level cohort analysis.

### 4. Interactive Content Strategy
Interactive formats (quizzes, assessments, calculators) outperform passive forms for both conversion rate and data quality. When recommending a capture mechanic:
- Choose **Outgrow** for calculators, assessments, and recommendation engines that generate a personalized result
- Choose **Jebbit** for branching product finders and declared-data experiences embedded in campaign flows
- Choose static form-based tools (Wyng, Facebook Lead Ads) only when interactivity isn't feasible or the audience context doesn't support it

---

## Topics This Skill Synthesizes

| Topic | Tool / Platform | Primary Capture Mechanic |
|---|---|---|
| Jebbit Interactive Content Extension | Jebbit | Branching quizzes, product finders, declared-data experiences |
| Jebbit Lead Capture Experiences | Jebbit | Embedded lead capture within interactive experiences |
| Outgrow Interactive Lead Capture | Outgrow | Quizzes, calculators, assessments, recommendations |
| Justuno Lead Capture & Popups | Justuno | Exit-intent, dynamic overlays, advanced audience targeting |
| ViralSweep Contests & Lead Capture | ViralSweep | Sweepstakes, contests, instant win, waitlists, referral mechanics |
| Quikly Urgency-Based Lead Capture | Quikly | Time-limited and urgency-driven acquisition campaigns |
| Facebook Lead Ads via Zapier | Facebook + Zapier | Paid social lead forms piped into Braze via Zapier automation |
| Wyng Lead Capture | Wyng | On-site lead capture widgets and experiences |
| Wunderkind Lead Capture | Wunderkind | Identity resolution and behavioral lead capture |
| Lead Capture Category Overview | — | Cross-platform patterns and integration selection guidance |

---

## When to Use This Skill

Use this skill when:
- Selecting a lead capture integration for a new acquisition campaign or channel
- Evaluating whether a current capture tool is passing the right data attributes into Braze for downstream segmentation
- Diagnosing low post-capture engagement (suggests poor lead quality or missing declared data)
- Designing a multi-stage funnel that uses different capture tools at different awareness levels
- Advising on Zapier-based integrations (Facebook Lead Ads) and their reliability trade-offs
- Recommending interactive content formats to increase both conversion rate and data richness

---

## Common Mistakes

**Treating all leads as equivalent at capture time.** Tools like ViralSweep contests attract prize-seekers. Without qualification messaging or segmentation by `lead_source`, these contacts drag down overall engagement metrics and inflate list size without proportional revenue impact.

**Skipping declared-data mapping.** Jebbit and Outgrow are most valuable when quiz/assessment responses are mapped to Braze custom attributes at capture. If the integration is set up to pass only an email address, the strategic value of interactive content is lost.

**Relying on Zapier automation without monitoring.** Facebook Lead Ads via Zapier is a common failure point. Zap errors silently drop leads. Always configure Zapier error notifications and audit the pipeline periodically against Facebook Ads Manager lead counts.

**Using urgency tools (Quikly) without a post-capture nurture sequence.** Urgency-driven capture creates a spike of new contacts with high recency but low familiarity with the brand. Plan a dedicated welcome/onboarding Canvas to bridge the gap.
