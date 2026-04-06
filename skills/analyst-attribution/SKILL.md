---
name: analyst-attribution
description: >-
  Attribution modeling, campaign measurement, and multi-touch analysis across
  mobile and web attribution partners.
metadata:
  role: braze-analyst
  topics:
    - message-orchestration-attribution
    - attribution-singular
    - attribution-linkrunner
    - attribution-kochava
    - attribution-branch-for-attribution
    - attribution-appsflyer
    - attribution-airbridge
    - attribution-adjust
  keywords: []
  generator: nick
  version: 1.0.0
---
The writing-skills skill is TDD-focused for creating process/workflow skills. This task is content synthesis for a domain knowledge skill file (part of Nick's pipeline step 6). I'll generate the markdown body directly since all inputs are provided.

`★ Insight ─────────────────────────────────────`
Nick's skill files serve a dual purpose: they're read by Claude agents at runtime to inform responses, so the structure needs to be both human-readable documentation AND machine-parseable context. The "lens" concept here is critical — it tells Claude *how* to interpret the topic content, not just *what* it covers.
`─────────────────────────────────────────────────`

```markdown
# Attribution & Measurement Analytics

## Scope and Purpose

This skill covers **mobile and web attribution modeling, multi-touch measurement, and campaign analytics** across Braze's supported attribution partner ecosystem. Use this skill when analyzing user acquisition funnels, diagnosing attribution discrepancies, configuring attribution partner integrations, or interpreting conversion data from mobile and web campaigns.

**Analytical lens:** Approach all attribution questions through the lens of **conversion causality** — which touchpoints drove installs, re-engagements, or conversions, and how confidently can that claim be made given the measurement methodology in use.

---

## Attribution Partner Ecosystem

Braze integrates with multiple mobile measurement partners (MMPs) and attribution platforms. Each has distinct capabilities, data models, and integration patterns:

### Mobile Measurement Partners (MMPs)

| Partner | Specialty | Key Differentiator |
|--------|-----------|-------------------|
| **Adjust** | Mobile attribution & analytics | Comprehensive picture combining attribution + advanced analytics |
| **AppsFlyer** | Mobile attribution | Widely adopted MMP with deep ecosystem integrations |
| **Branch** | Mobile linking + attribution | Deep linking combined with attribution; cross-platform journey tracking |
| **Kochava** | Mobile attribution + audience | Audience Platform enables planning, targeting, and activation alongside attribution |
| **Singular** | Unified marketing analytics | Combines attribution, cost aggregation, creative reporting, and workflow automation |

### Emerging & Specialized Platforms

| Partner | Specialty | Key Differentiator |
|--------|-----------|-------------------|
| **Airbridge** | Unified mobile measurement | Combines attribution, incremental measurement, and marketing mix modeling (MMM) |
| **LinkRunner** | Mobile attribution & analytics | Community-maintained integration; focuses on user acquisition tracking |

---

## Analytical Framework

### Multi-Touch Attribution Models

When analyzing attribution data across partners, consider which model is in use:

- **Last-touch** — Credits the final touchpoint before conversion (most common MMP default)
- **First-touch** — Credits the initial acquisition source
- **Linear** — Distributes credit equally across all touchpoints
- **Algorithmic/data-driven** — Model-weighted based on historical conversion patterns

Different partners may use different default models, which creates apparent discrepancies when comparing reports.

### Attribution Windows

Each partner configures attribution windows independently. Mismatches between Braze event timing and partner attribution windows are a common source of data discrepancies. Key questions to ask:

- What is the click-through attribution window?
- What is the view-through attribution window (if enabled)?
- Does the partner support re-engagement attribution separately from install attribution?

### Cross-Channel Measurement Considerations

- **Web-to-app journeys**: Branch specializes in this via deep links; Airbridge and Adjust also support cross-platform attribution
- **Incrementality testing**: Airbridge includes incremental measurement natively; other partners may support via integrations
- **Marketing Mix Modeling (MMM)**: Airbridge includes MMM as part of its platform; Singular aggregates cost data that feeds MMM tools

---

## Integration Architecture

Attribution partners connect to Braze via **server-to-server callbacks** (postbacks). The general data flow:

```
User Action → Attribution Partner SDK (on device)
    → Partner Platform (attributes the install/event)
        → Postback to Braze (user-level attribution data)
            → Braze user profile updated with attribution fields
```

**Standard attribution fields populated in Braze:**
- `campaign` — Ad campaign name
- `adgroup` — Ad group or ad set name
- `ad` — Individual ad creative name
- `network` — Ad network or media source

These fields are accessible for segmentation, personalization, and Canvas branching in Braze.

---

## When to Use This Skill

Apply this skill when:

- **Diagnosing attribution discrepancies** between Braze and an MMP (different install counts, revenue figures, event counts)
- **Configuring a new attribution partner integration** — understanding the postback setup, required fields, and event mapping
- **Designing attribution-aware segmentation** — using attribution data fields to target users by acquisition source
- **Evaluating partner capabilities** for a specific use case (e.g., "which partner supports incrementality testing?")
- **Analyzing ROAS or CPA** using attribution data surfaced in Braze user profiles
- **Troubleshooting missing attribution data** on user profiles or campaign reports

---

## Key Concepts and Gotchas

**Deterministic vs. probabilistic attribution**
Most partners prioritize deterministic matching (device ID, IDFA/GAID) but fall back to probabilistic (fingerprinting) when device IDs are unavailable (e.g., iOS 14.5+ with ATT). Understand which method is in use before interpreting data.

**Partner SDK vs. server-side integration**
Most MMP integrations require the partner SDK alongside the Braze SDK. Server-side-only integrations are less common and may have data latency.

**Organic attribution**
Users who install without clicking an ad are attributed as "organic." Segmenting paid vs. organic cohorts is a core use case for this data.

**Re-engagement vs. re-attribution**
Partners distinguish between re-engagement (existing users returning via a paid ad) and re-attribution (reassigning an existing user to a new source). Braze handles these differently in user profiles.

**LinkRunner community maintenance**
The LinkRunner integration is community-maintained. Treat its behavior and documentation as potentially less stable than partner-maintained integrations.

---

## Cross-Skill Dependencies

- **Campaign & Messaging Analytics** — Attribution data pairs with send/open/click metrics to build full-funnel ROAS analysis
- **Audience Segmentation** — Attribution fields (campaign, network, adgroup) enable acquisition-source-based segments in Braze
- **Data Pipeline & Currents** — Attribution data can flow through Currents for warehouse-level analysis alongside engagement events
```

`★ Insight ─────────────────────────────────────`
The table-based partner comparison is intentional: Claude agents scan structured data faster than prose when making routing decisions at runtime. The "When to Use This Skill" section mirrors the CSO (Claude Search Optimization) principle from writing-skills — use symptom-language that matches what analysts actually say when stuck, not what engineers say when building.
`─────────────────────────────────────────────────`
