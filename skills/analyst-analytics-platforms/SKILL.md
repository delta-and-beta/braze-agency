---
name: analyst-analytics-platforms
description: >-
  Configures analytics and attribution platforms for user behavior tracking,
  campaign measurement, and engagement analysis.
metadata:
  role: braze-analyst
  topics:
    - analytics-thoughtspot
    - analytics-tellius
    - analytics-saleswings
    - analytics-npaw
    - analytics-mixpanel
    - analytics-kubit
    - analytics-kickbox
    - analytics-inbox-monster
    - analytics-heap
    - analytics-contentsquare
    - analytics-branch
    - analytics-apteligent
    - analytics-appsflyer
    - analytics-amplitude
    - analytics-airbridge
    - data-and-analytics-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files for Claude Code plugins are loaded progressively: metadata always in context, SKILL.md body only when triggered. This means the body should be lean (~1,500-2,000 words) and reference detail files rather than embedding everything.
- The "lens" concept here is the analyst's mental model — it frames *how* to interpret the topic knowledge (e.g., "look at Mixpanel through the lens of funnel analysis"), not just what the topics contain.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Analytics Platform Integration

## Purpose

This skill covers integration between Braze and third-party analytics, attribution, and measurement platforms. Apply this skill when configuring data flows between Braze and analytics partners, designing event taxonomies for cross-platform measurement, evaluating attribution models, or troubleshooting data inconsistencies across measurement tools.

The analytical lens throughout is: **event taxonomy design, attribution windows, funnel analysis, and cross-platform measurement fidelity** — not simply "what does each platform do," but how to integrate them coherently with Braze as the engagement layer.

---

## When to Use This Skill

Apply this skill when the task involves:

- Configuring a Braze integration with an analytics or attribution partner
- Designing or auditing event taxonomies that span Braze and an analytics platform
- Setting attribution windows or resolving attribution conflicts between platforms
- Building funnel analyses using cohorts or events sourced from Braze
- Importing user cohorts from analytics platforms (AppsFlyer, Kubit, Amplitude, etc.) into Braze
- Diagnosing discrepancies between Braze campaign metrics and downstream analytics tools
- Evaluating mobile attribution or deep linking behavior via Branch, AppsFlyer, or Airbridge
- Assessing email deliverability data via Kickbox or Inbox Monster in the context of Braze sending

---

## Analytical Lens

### Event Taxonomy Design

When connecting Braze to any analytics platform, the event schema is the contract between systems. Inconsistent event names, properties, or user identifiers cause silent data loss and broken funnels.

Priorities when designing or auditing a taxonomy:
- Establish a canonical event naming convention before configuring any integration (e.g., `snake_case` verbs: `email_opened`, `purchase_completed`)
- Map Braze standard events (session start, push received, email click) to their equivalents in the downstream platform
- Identify which properties Braze sends by default vs. which require custom event attributes — analytics platforms often expect enriched payloads
- Confirm user identity resolution: Braze `external_id` must align with the platform's user identifier to avoid fragmented profiles

### Attribution Windows

Attribution window configuration is one of the highest-impact and least-visible settings in any mobile or cross-channel analytics stack.

Key considerations:
- Attribution windows in mobile attribution platforms (AppsFlyer, Branch, Airbridge) define how long after an ad impression or click a conversion is credited — misalignment with Braze's campaign conversion windows causes reporting gaps
- Multi-touch attribution (Kubit, Amplitude) requires that Braze engagement events (email opens, push clicks) are passed downstream as touchpoints, not just as conversion signals
- View-through attribution windows in NPAW or video analytics contexts require that impression events are captured server-side, not relying solely on SDK events
- For B2B contexts (SalesWings), attribution to lead score changes requires time-windowed correlation between Braze campaign exposure and scoring model updates

### Funnel Analysis

Funnel analysis across Braze and analytics partners requires identifying where each platform owns which part of the funnel:

- Braze owns the *engagement layer*: message delivery, open, click, conversion
- Analytics platforms (Amplitude, Mixpanel, Heap, Contentsquare) own *behavioral layer*: in-product actions, session flow, feature adoption
- Attribution platforms (AppsFlyer, Branch, Airbridge) own the *acquisition layer*: install, first open, channel source

When building cross-platform funnels, define explicit handoff points and validate that the user identifier is consistent at each transition. Funnel drop-off analysis should account for attribution window boundaries — users who convert outside the window may appear as organic in the analytics platform but attributed in Braze.

### Cross-Platform Measurement Fidelity

Data fidelity issues are common and systematic. When diagnosing discrepancies:

1. Check identity resolution first: mismatched user IDs between systems account for the majority of row count differences
2. Verify event delivery: use Braze Currents or webhook logs to confirm events were sent, then audit the receiving platform's ingestion logs
3. Account for time zone differences in event timestamps — Braze stores UTC; some platforms default to local time
4. Confirm deduplication logic: platforms like Heap and Contentsquare may deduplicate on different keys than Braze, causing apparent discrepancies

---

## Platform Coverage

This skill synthesizes knowledge across the following integrated platforms:

### Mobile Attribution & Deep Linking
- **AppsFlyer** — Cohort import via AppsFlyer Audiences; mobile attribution with configurable attribution windows; integration via SDK and server-to-server
- **Branch** — Deep linking attribution; deferred deep link handling; branch-to-Braze user identity bridging
- **Airbridge** — Mobile measurement partner (MMP); install and re-engagement attribution
- **Apteligent** — Mobile application performance; crash analytics correlated with Braze engagement events

### Product & Behavioral Analytics
- **Amplitude** — Product analytics; cohort sync to Braze; event streaming bidirectionally
- **Mixpanel** — Product analytics; event taxonomy alignment; cohort-based targeting in Braze
- **Heap** — Retroactive event capture; session replay correlation; funnel analysis feeding Braze segments
- **Contentsquare** — Digital experience analytics; heatmaps and session data correlated with Braze campaign exposure

### Warehouse-Native & AI Analytics
- **Kubit** — Warehouse-native product analytics; cohort import from data warehouse into Braze
- **Tellius** — AI-driven analytics and natural language querying; decision intelligence over Braze engagement data
- **ThoughtSpot** — Live analytics on cloud data; self-service BI over Braze data warehouse exports

### Email & Deliverability Analytics
- **Kickbox** — Email verification and deliverability analytics; list hygiene before Braze sends
- **Inbox Monster** — Inbox placement monitoring; deliverability diagnostics integrated with Braze sending volumes

### Specialized Analytics
- **NPAW** — Video analytics for media companies; QoE (Quality of Experience) data correlated with Braze engagement
- **SalesWings** — B2B lead scoring; intent signal analytics; score updates triggering Braze campaign logic

---

## Integration Patterns

### Cohort Import Pattern
Used by: AppsFlyer, Kubit, Amplitude (when configured)

Cohorts defined in the analytics platform are pushed to Braze as segments. Validate:
- The `external_id` used in the analytics platform matches Braze's `external_id`
- Cohort refresh cadence is appropriate for the campaign targeting use case
- Cohort membership updates in Braze without creating duplicate user profiles

### Event Streaming Pattern
Used by: Amplitude, Mixpanel, Heap, Contentsquare

Braze sends engagement events (via Currents or webhooks) downstream; the analytics platform sends behavioral events upstream. Validate:
- Schema consistency in both directions
- No circular event loops (e.g., analytics platform triggering a Braze event that re-triggers the analytics platform)
- Latency SLA of the streaming pipeline relative to campaign trigger timing

### SDK-Level Attribution Pattern
Used by: AppsFlyer, Branch, Airbridge, Apteligent

The attribution SDK runs alongside the Braze SDK in the mobile app. Validate:
- SDK initialization order (attribution SDK should initialize before Braze to ensure install attribution is captured)
- Attribution data is passed to Braze via `setAttributionData()` or equivalent before user profile is written
- Deep link handling does not interfere with Braze in-app message rendering

### Deliverability Feedback Pattern
Used by: Kickbox, Inbox Monster

Platform provides list hygiene or inbox placement signals that inform Braze send strategy. Apply:
- Kickbox verification results to suppress invalid addresses before importing to Braze
- Inbox Monster placement data to identify sending reputation issues before campaign launch

---

## Common Failure Modes

| Symptom | Likely Cause | Resolution |
|---|---|---|
| Attribution platform shows fewer conversions than Braze | Attribution window narrower than Braze conversion window | Align windows or document the difference |
| Cohort in Braze is smaller than in source platform | External ID mismatch | Audit identity mapping between platforms |
| Funnel drop-off at handoff point between systems | Event not firing or being dropped | Check Currents logs and platform ingestion logs |
| Email analytics platform shows different send volume than Braze | Suppression lists differ between platforms | Sync suppression lists before sends |
| Amplitude/Mixpanel event counts diverge from Braze | Deduplication rules differ | Align deduplication keys and document expected delta |

---

## Additional Resources

Consult the topic reference files for platform-specific configuration details, SDK initialization sequences, and field mappings:

- **`references/mobile-attribution.md`** — AppsFlyer, Branch, Airbridge, Apteligent setup details
- **`references/product-analytics.md`** — Amplitude, Mixpanel, Heap, Contentsquare integration patterns
- **`references/warehouse-analytics.md`** — Kubit, Tellius, ThoughtSpot data pipeline details
- **`references/email-analytics.md`** — Kickbox and Inbox Monster deliverability workflows
- **`references/attribution-windows.md`** — Window configuration reference across platforms

---

`★ Insight ─────────────────────────────────────`
- The "common failure modes" table is a high-value addition to any analytics integration skill — these failure modes are *cross-cutting* across all the platforms listed and would be lost if only documented per-platform in reference files. Putting shared diagnostic patterns in SKILL.md and per-platform specifics in references/ is the right split.
- Framing the skill around integration *patterns* (cohort import, event streaming, SDK-level attribution) rather than just listing platforms makes this skill useful for platforms not explicitly listed — a new partner using the cohort import pattern gets coverage automatically.
`─────────────────────────────────────────────────`
