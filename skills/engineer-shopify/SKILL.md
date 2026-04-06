---
name: engineer-shopify
description: >-
  Technical implementation of Shopify-Braze integrations including standard,
  custom, and catalog sync configurations.
metadata:
  role: braze-engineer
  topics:
    - ecommerce-shopify
    - shopify-shopify-overview
    - shopify-shopify-standard-integration
    - shopify-shopify-standard-integration-third-party-tagging
    - shopify-shopify-custom-integration
    - shopify-shopify-data-features
    - shopify-shopify-catalogs
    - shopify-multiple-stores
    - shopify-discount-codes
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's skill files act as Claude's "working memory" for a domain — the body must orient Claude toward the right mental model before it reads any topic reference files. The "lens" statement is load-bearing: it tells Claude *how* to interpret ambiguous queries (e.g., is "discount codes" a messaging question or a data-sync question?).
- Progressive disclosure is key here: the skill body should be a map, not the territory. Topic details live in `references/` files; SKILL.md just needs enough to route Claude correctly and fast.
- Writing in imperative form ("Consult X when...", "Use this skill to...") keeps the skill terse and machine-readable — Claude consumes this more reliably than prose narration.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Shopify Integration Engineering

## Purpose

This skill covers the technical implementation of Shopify-Braze integrations — from first-time setup through advanced catalog sync, multi-store orchestration, and headless storefront configurations. Apply this skill when the task concerns how Shopify data flows into Braze, how events are tracked and attributed, or how storefront architectures (standard, Hydrogen, headless) connect to Braze services.

**Lens:** Data synchronization, event tracking, and storefront integration patterns.

This means approaching every question through the lens of: *what data moves, when does it move, and how does the storefront architecture shape that movement?* Attribution, payload shape, sync latency, and webhook reliability are first-class concerns here. UX or campaign-side questions (e.g., Canvas design, segmentation logic) are out of scope — route those to the appropriate messaging or data skill.

---

## When to Use This Skill

Use this skill to answer questions about:

- Setting up the Shopify standard integration or a custom/headless Shopify integration
- Configuring third-party tag managers (e.g., Google Tag Manager) alongside the Shopify standard integration
- Understanding which Shopify events are tracked, what their payloads look like, and how historical backfill works
- Syncing Shopify product catalogs to Braze Catalogs
- Connecting multiple Shopify store domains to a single Braze workspace
- Sending unique Shopify discount codes through Braze promotion codes
- Debugging data gaps, event attribution issues, or sync failures between Shopify and Braze

If the question is about what a Shopify integration *can do* (feature overview), consult the **Shopify Integration Overview** topic. If it concerns *how to implement* a specific configuration, consult the relevant setup topic below.

---

## Topics Synthesized

This skill draws from the following topic references:

| Topic | Focus |
|---|---|
| **Shopify Integration Overview** | High-level feature set, supported use cases, prerequisites |
| **Shopify Standard Integration** | Setup steps for the native Braze-Shopify connector |
| **Shopify Standard Integration — Third-Party Tagging** | Layering GTM or similar tools over the standard integration |
| **Shopify E-commerce Overview** | Commerce event model and how Shopify events map to Braze |
| **Shopify Data Features** | Tracked events, example payloads, historical backfill, product sync mechanics |
| **Shopify Custom Integration** | Hydrogen stores and headless Shopify — custom storefront setup |
| **Shopify Catalogs** | Syncing Shopify product catalog to Braze Catalogs for personalization |
| **Shopify Multiple Stores** | Multi-domain workspace configuration and cross-market orchestration |
| **Shopify Discount Codes** | Sending unique Shopify discount codes via Braze promotion codes |

---

## Integration Architecture Patterns

Three primary integration patterns exist. Match the pattern to the storefront architecture before recommending a configuration:

**Standard Integration**
The native Braze app in the Shopify App Store. Installs a script tag automatically. Suitable for standard Shopify storefronts. Covers checkout events, order lifecycle events, and customer data sync out of the box.

**Standard Integration + Third-Party Tagging**
The standard integration script tag runs alongside a tag manager (e.g., GTM). Requires careful event deduplication — the same Shopify event must not fire twice into Braze. Consult the third-party tagging topic for sequencing and conflict avoidance.

**Custom Integration (Headless / Hydrogen)**
For Shopify Hydrogen stores or any headless storefront that does not use Shopify's standard theme engine. Requires manual instrumentation of Braze Web SDK calls. Events must be explicitly mapped and fired — nothing is automatic. Consult the custom integration topic for setup patterns and required event contracts.

---

## Data Sync Considerations

When debugging or designing data flows, apply these first principles:

- **Event attribution**: Verify whether an event is fired client-side (Web SDK), server-side (webhook), or both. Deduplication keys matter when both paths are active.
- **Historical backfill**: The standard integration supports a one-time historical order backfill. Confirm whether backfill has run and what its scope is before diagnosing missing historical data.
- **Product catalog sync**: Shopify product sync to Braze Catalogs is a separate configuration from the event integration. It is not enabled by default. Consult the Catalogs topic for sync frequency, field mapping, and limitations.
- **Multi-store**: Each Shopify store domain is connected independently. Cross-store user identity resolution depends on shared identifiers (email, external ID). Consult the multiple stores topic for workspace-level configuration.
- **Discount codes**: Braze promotion code lists must be populated with Shopify-generated codes. The integration does not auto-generate codes — the flow is: generate in Shopify → import to Braze → reference in messaging.

---

## Additional Resources

Detailed payloads, setup walkthroughs, and configuration examples are in the topic reference files for this skill. When a question requires specifics — exact event names, payload field definitions, step-by-step setup sequences — load the relevant topic reference rather than relying on this overview.

For questions that cross Shopify into broader Braze data concepts (Catalogs architecture, promotion code mechanics, workspace configuration), coordinate with the Data Activation or Workspace Configuration skills as appropriate.

---

`★ Insight ─────────────────────────────────────`
- The integration pattern table does double duty: it helps Claude route setup questions to the right topic *and* helps it catch mismatches early (e.g., a user describing a headless store but asking about the standard integration setup).
- The "Data Sync Considerations" section encodes the most common debugging heuristics. Putting these in SKILL.md (not just references) means Claude has them in immediate context when a user describes a data gap — no second file load needed.
- Ending with an explicit handoff note ("coordinate with Data Activation or Workspace Configuration skills") is a pattern worth internalizing: skills that know their own boundaries reduce hallucination at the edges of their domain.
`─────────────────────────────────────────────────`
