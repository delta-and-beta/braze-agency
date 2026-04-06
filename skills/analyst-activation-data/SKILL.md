---
name: analyst-activation-data
description: >-
  Manages custom event schemas, attribute definitions, naming conventions, and
  report metric interpretation.
metadata:
  role: braze-analyst
  topics:
    - data-activation-report_metrics
    - data-activation-custom_data
    - data-activation-custom_data-events
    - data-activation-custom_data-custom_events
    - data-activation-custom_data-custom_attributes
    - data-activation-custom_data-purchase_events
    - data-activation-custom_data-recommended_events
    - data-activation-custom_data-event_naming_conventions
    - data-activation-custom_data-managing_custom_data
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill bodies in Nick's plugin architecture serve as the "always-loaded when triggered" layer — they should orient Claude without overwhelming the context window. The key is telling Claude *when* to use the skill and *where* to find deeper information, not trying to pack in all the detail here. The topics listed are the `references/` layer that gets loaded selectively at query time.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Custom Data & Event Analytics

Defines, tracks, and analyzes custom data schemas in Braze to produce actionable business insights. Apply this skill to answer questions about custom events, custom attributes, purchase events, recommended events, naming conventions, and how to interpret report metrics tied to behavioral data.

## Scope and Purpose

Custom data is the foundation of personalized engagement. Braze distinguishes between several data primitives — custom events (behavioral actions), custom attributes (persistent user traits), purchase events (transactional records), and recommended events (schema-standardized eCommerce actions) — each with different tracking semantics, reporting capabilities, and schema management requirements.

This skill covers the full lifecycle of custom data:

- **Schema definition** — choosing between event types, setting attribute data types, structuring event properties
- **Tracking strategy** — when to use custom events vs. attributes vs. purchases, naming conventions, pre-population
- **Report interpretation** — reading and comparing metrics (opens, clicks, conversions, audience size) across channels and campaigns
- **Data governance** — managing schemas in the dashboard, blocklisting stale data, avoiding naming pitfalls

## Lens: How to Define, Track, and Analyze Custom Data Schemas for Actionable Business Insights

Approach every custom data question through this lens:

1. **What business question needs answering?** — Start from the insight or segmentation goal, then work backward to the schema design.
2. **Which data primitive fits?** — Custom events for time-series behavioral tracking, custom attributes for persistent state, purchase events for revenue, recommended events for standardized eCommerce lifecycle reporting.
3. **What are the governance constraints?** — Naming conventions, blocklisting, pre-population, and schema drift all affect long-term data quality.
4. **How does the metric connect to behavior?** — Report metrics (opens, AMP clicks, influenced opens) must be interpreted in the context of attribution windows, channel, and event schema.

## Topics This Skill Synthesizes

| Reference Topic | What It Covers |
|---|---|
| **Custom Events** | Logging behavioral actions, event properties, use cases vs. custom attributes |
| **Custom Attributes** | Persistent user traits, data types, dashboard management, no time-series support |
| **Purchase Events** | Revenue logging, product arrays, `revenue` property, eCommerce segmentation |
| **Recommended Events** | Standardized eCommerce schemas, pre-built Canvas templates, lifecycle dashboards |
| **Events (Overview)** | Braze-defined event primitives and when to choose each type |
| **Managing Custom Data** | Pre-population, blocklisting, schema hygiene, dashboard configuration |
| **Event Naming Conventions** | Structural naming rules, preventing targeting errors, consistent taxonomy |
| **Custom Data Overview** | Conceptual foundation for Braze's custom data model |
| **Report Metrics** | Metric definitions across channels (email AMP clicks/opens, influenced opens, audience counts) |

## When to Use This Skill

Apply this skill when the task involves any of the following:

- Designing or reviewing a custom event schema or attribute taxonomy
- Deciding whether to use a custom event, custom attribute, purchase event, or recommended event
- Interpreting a Braze campaign or Canvas report metric (opens, clicks, conversions, audience)
- Establishing or auditing event naming conventions for a data team
- Pre-populating custom data before SDK integration is complete
- Blocklisting or cleaning up stale custom events or attributes
- Mapping eCommerce lifecycle stages to Braze's recommended event schema
- Explaining the difference between influenced opens, direct opens, and AMP opens
- Advising on schema changes that affect segmentation, reporting, or Canvas templates

## Key Distinctions to Apply

**Custom Events vs. Custom Attributes:**
Custom events are time-stamped actions (trackable in funnels, triggerable in campaigns). Custom attributes are stateless snapshots — no graphs, no trend analysis. Use events when timing matters; use attributes when only the current value matters.

**Purchase Events vs. Custom Events for Transactions:**
Purchase events carry native Braze revenue semantics (`revenue`, `currency`, product arrays) and feed into revenue reporting. Do not replicate purchase tracking via custom events — use the dedicated purchase logging API to preserve downstream reporting integrity.

**Recommended Events vs. Custom Events:**
Recommended events use Braze-defined names and property schemas, unlocking pre-built Canvas templates and lifecycle dashboards. Custom events are fully user-defined. Prefer recommended events for standard eCommerce flows (cart abandon, checkout, product view) when the pre-built reporting value outweighs naming flexibility.

**Report Metric Scope:**
Metrics like AMP Clicks and AMP Opens apply only to AMP-enabled email. Influenced Opens require a push-email attribution window. Always confirm channel applicability before comparing metrics across campaign types.

## Schema Governance Principles

- Pre-populate custom events and attributes in the Braze dashboard before SDK integration so they appear in segment builders and campaign dropdowns immediately.
- Use a consistent naming structure (e.g., `object_action` or `category_subcategory_action`) and apply it uniformly across platforms and teams.
- Blocklist events or attributes that are no longer tracked rather than leaving orphaned schema entries — stale data causes targeting errors.
- Avoid encoding values into event names (e.g., `purchase_10_dollars`) — use event properties for variable data.
