---
name: architect-data-infrastructure
description: >-
  Manages data center selection, field-level encryption, and data point
  consumption architecture.
metadata:
  role: braze-architect
  topics:
    - data-infrastructure
    - data-infrastructure-data_centers
    - data-infrastructure-data_points
    - data-infrastructure-field_level_encryption
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files in Nick's plugin structure serve as routing artifacts as much as documentation — the "lens" framing tells Claude *which architectural questions this skill answers*, not just what topics it contains. This shapes how the complexity evaluator decides to load it.
`─────────────────────────────────────────────────`

# Data Infrastructure

## Scope and Purpose

This skill guides architectural decisions around Braze's data infrastructure layer — specifically how data is stored, protected, routed, and consumed. It synthesizes knowledge across data center geography, identifier-level encryption, and the data point model to inform design choices that affect compliance posture, operational cost, and platform performance.

Use this skill when designing systems that must satisfy data residency requirements, protect sensitive identifiers like email addresses, or optimize for Braze's consumption-based billing model.

## Lens: Designing for Residency, Encryption, and Efficient Consumption

The central architectural tension in Braze's data layer is between **compliance constraints** (where data lives, how it's protected) and **operational efficiency** (how much data you store and process). Good architecture in this domain satisfies both: selecting the right data center cluster locks in residency guarantees, field-level encryption protects identifiers at rest without sacrificing deliverability, and disciplined data point hygiene prevents runaway consumption costs.

Treat these three concerns as interconnected. A decision in one dimension (e.g., enabling field-level encryption) creates constraints in the others (e.g., email lookup behavior, SDK integration requirements).

## Topics This Skill Synthesizes

### Data Centers

Braze operates geographically distributed data center clusters to support data sovereignty, low latency, and scalable infrastructure. Cluster selection is made at workspace provisioning time and determines where customer data is stored and processed at rest.

Key architectural implications:
- **Data residency**: Cluster assignment is how Braze satisfies regional compliance requirements (e.g., EU data staying in EU clusters). This is a provisioning-time decision — not something that can be changed after the fact without migration.
- **SDK and API endpoint routing**: Each cluster exposes distinct endpoints. Architectures that hardcode `sdk.iad-01.braze.com`-style URLs must be parameterized by environment/cluster to support multi-region deployments.
- **Dashboard URLs**: Cluster determines the Braze dashboard subdomain (e.g., `dashboard-01.braze.com`). Operational runbooks should reference cluster-specific URLs to avoid cross-cluster confusion.

When designing for multi-region or compliance-sensitive deployments, cluster selection should be an explicit architectural decision documented in infrastructure runbooks — not an implicit default.

### Field-Level Encryption (Identifier)

Braze's identifier field-level encryption is an **add-on feature** that must be enabled by contacting your Braze account manager. It protects email addresses by ensuring only hashed and encrypted values are stored in Braze — the plaintext email never reaches Braze's systems.

Architectural requirements:
- **Pre-send hashing**: Email addresses must be hashed and encrypted **before** being sent to Braze via SDK or API. This is a client-side responsibility.
- **Integration surface impact**: Any system that reads or writes email identifiers — CRM sync, event tracking, audience export — must be updated to operate on encrypted values.
- **Irreversibility**: Because Braze stores only the encrypted form, email-based lookups and deduplication operate on hash equality. Architectures that rely on fuzzy matching or case-insensitive email normalization must handle normalization *before* hashing, consistently across all producers.

Design for field-level encryption as a **cross-cutting concern**: it affects every integration point that touches email as an identifier, not just the initial user creation flow.

### Data Points

Braze's data point model is the primary cost and consumption lever in platform architecture. Data points are consumed when custom attributes, custom events, or nested object fields are written to user profiles.

Architectural principles for efficient consumption:
- **Write only what is queried**: Attributes that are never used in segmentation, personalization, or triggering consume data points without return. Audit attribute usage before adding new fields.
- **Event vs. attribute trade-offs**: Behavioral data is often better modeled as events (which consume fewer data points and are time-series by nature) than as attributes that overwrite on each occurrence.
- **Nested objects**: Deeply nested custom attribute structures can multiply data point consumption unexpectedly. Flatten where possible, or use Braze's nested object feature with awareness of its counting semantics.
- **SDK vs. API writes**: Batch API updates can be structured to minimize redundant writes; SDK calls on every session touch may re-write unchanged attributes. Debounce or delta-check before writing.

Data point architecture should be reviewed at schema design time, not retroactively when consumption bills arrive.

## When to Use This Skill

Reach for this skill when:

- Selecting or validating a Braze data center cluster for a new workspace or regional expansion
- Designing integrations that handle email addresses and must satisfy PII protection requirements
- Evaluating whether to enable field-level encryption and understanding the integration changes it requires
- Auditing or designing a custom attribute/event schema to control data point consumption
- Building multi-environment Braze configurations (dev/staging/prod) that must route to correct cluster endpoints
- Advising on compliance requirements (GDPR, CCPA, data sovereignty) as they intersect with Braze's infrastructure model

## Key Trade-offs

| Decision | Benefit | Cost / Constraint |
|---|---|---|
| Field-level encryption | Email PII never stored in plaintext | All producers must hash before write; no fuzzy matching |
| EU/AP cluster selection | Data residency compliance | SDK/API endpoints differ; dashboards on cluster-specific URLs |
| Rich attribute schema | Flexible segmentation | Higher data point consumption; attribute bloat risk |
| Event-based behavioral modeling | Time-series fidelity, lower cost | Requires event schema design upfront |
| Batch API writes | Controlled consumption | Integration complexity vs. SDK simplicity |

`★ Insight ─────────────────────────────────────`
The trade-offs table above is an intentional design choice in skill files: it surfaces the *architectural decision* rather than just describing features. This is what makes a skill useful for an architect role versus a developer role — same facts, different framing.
`─────────────────────────────────────────────────`
