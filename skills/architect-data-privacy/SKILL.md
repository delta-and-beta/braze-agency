---
name: architect-data-privacy
description: >-
  Designs privacy-compliant data architectures using consent management and data
  governance partners.
metadata:
  role: braze-architect
  topics:
    - data-privacy-onetrust
    - data-privacy-ketch
    - data-privacy-datagrail
    - data-and-analytics-data-privacy
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A well-written skill file acts as a routing document — it tells a future Claude agent **when** to apply this knowledge, not just **what** the knowledge is. The lens (consent propagation, DSR automation, compliance-by-design) is especially important because it prevents the skill from being used generically — it anchors it to the architect's specific vantage point.
`─────────────────────────────────────────────────`

```markdown
# Data Privacy Architecture

## Overview

This skill guides the design of privacy-compliant data architectures for customer engagement platforms, with a focus on integrating consent management systems and data governance tooling into Braze workflows. It synthesizes knowledge from OneTrust, Ketch, and DataGrail to support architects who must make data flow decisions that respect user consent, satisfy data subject rights (DSR), and embed privacy as a first-class design constraint — not a post-hoc compliance checkbox.

**Core principle:** Privacy architecture is upstream of data architecture. Consent signals, DSR obligations, and regulatory scope must be resolved at the schema and pipeline design stage, before data enters Braze.

---

## When to Use This Skill

Use this skill when:

- Designing or reviewing data pipelines that carry PII or consent-governed attributes into Braze
- Integrating a consent management platform (CMP) — OneTrust, Ketch, or similar — with Braze subscription states or user attributes
- Automating data subject rights workflows (access, deletion, portability, opt-out) that must touch Braze user profiles
- Mapping regulatory scope (GDPR, CCPA, LGPD, etc.) to data collection and segmentation strategies
- Evaluating whether a proposed Braze integration respects consent propagation across downstream systems
- Advising on data minimization, retention policies, or cross-border data transfer constraints as they apply to engagement data
- Designing a "privacy-by-design" foundation for a new Braze workspace or tenant

Do **not** use this skill for:
- Operational Braze campaign setup unrelated to regulated data
- General GDPR legal interpretation (consult legal counsel)
- Identity resolution strategies not involving consent or DSR

---

## Lens: Consent Propagation, DSR Automation, and Compliance-by-Design

This skill views every architectural decision through three lenses:

### 1. Consent Propagation
How does a user's consent signal — captured at the edge (web, app, CMP) — reliably flow downstream into Braze and all connected systems without loss, delay, or override? The architect must trace the full consent lifecycle: capture → normalization → propagation → enforcement → audit trail.

### 2. Data Subject Rights Automation
When a user exercises a right (deletion, access, rectification, opt-out), the architecture must enable automated, auditable fulfillment across all systems that hold their data — including Braze profiles, event history, and exported segments. Manual DSR workflows are a liability at scale.

### 3. Compliance-by-Design
Privacy controls are built into schema design, data contracts, and pipeline topology — not bolted on after the fact. This includes attribute-level sensitivity tagging, purpose-bound data flows, and retention enforcement at the data layer rather than relying on application-level policy.

---

## Topics This Skill Synthesizes

### OneTrust Consent Management
OneTrust is a widely-adopted CMP providing consent capture (cookie banners, preference centers), consent storage, and API-based propagation. Key architectural touchpoints:

- **Consent API** → syncs consent decisions to Braze subscription groups or custom attributes in near-real-time
- **Universal Consent & Preference Management (UCPM)** → canonical consent record that Braze should treat as authoritative
- **DSR Automation** → OneTrust can orchestrate deletion/access requests across connected systems including Braze via its integration connectors
- **Audit trail** → OneTrust stores consent receipts; architects must ensure Braze does not override or conflict with the OneTrust record of truth

### Ketch Privacy Platform
Ketch positions itself as a "data control" layer with real-time consent enforcement and a developer-first API. Key architectural touchpoints:

- **Ketch Tag / Data Layer** → captures consent at the browser/app level; feeds downstream via webhook or event stream
- **Ketch Consent API** → queryable at runtime so Braze pipelines can gate data collection conditionally on current consent state
- **Programmatic DSR** → Ketch automates DSR fulfillment workflows with native connectors; Braze deletion must be triggered and confirmed
- **Dynamic consent enforcement** → Ketch's model supports per-purpose, per-jurisdiction consent, requiring Braze architects to map purposes to subscription states or attribute flags

### DataGrail Privacy Management
DataGrail specializes in continuous system detection and automated DSR fulfillment. Key architectural touchpoints:

- **Live Data Map** → continuously discovers where PII lives, including within Braze — useful for ongoing compliance audits
- **Request Manager** → automates DSR request intake, routing, and fulfillment; integrates with Braze to delete or export user data
- **Vendor risk** → DataGrail can surface Braze as a data processor in privacy impact assessments
- **Integration pattern** → DataGrail typically connects to Braze via the Braze User Delete and Export APIs; architects must ensure API credentials and data retention settings align

### Data Privacy Category Overview
Across all three platforms, the privacy tooling landscape converges on common architectural requirements:

- A **single consent record of truth** that all systems defer to (CMP is authoritative, Braze is a subscriber)
- **Idempotent deletion** — DSR-triggered deletes must be re-runnable without side effects
- **Consent versioning** — consent preferences change; Braze must reflect the *current* valid consent, not a stale snapshot
- **Jurisdiction awareness** — GDPR (EU), CCPA (California), LGPD (Brazil), and others impose different requirements; architecture must support per-user regulatory scope

---

## Core Patterns

### Consent Propagation Architecture

```
CMP (OneTrust / Ketch)
    │
    ▼ Webhook / API event
Consent Normalization Layer      ← canonical consent model
    │
    ▼ Braze /users/track
Subscription Group State         ← maps consent purpose → Braze subscription
Custom Attribute: consent_v       ← consent version for audit
    │
    ▼ Segment filter
Campaign / Canvas Eligibility    ← enforcement at send time
```

**Key constraint:** Never let Braze subscription state become the source of truth for consent. Braze reflects consent; the CMP owns it.

### DSR Deletion Flow

```
User submits deletion request
    │
    ▼
CMP / DataGrail Request Manager
    │
    ├─▶ Braze DELETE /users/delete  (profile, event history)
    ├─▶ Braze DELETE /users/track   (any pending writes cancelled)
    └─▶ Confirm deletion receipt → DSR audit log
```

**Key constraint:** Braze soft deletes are insufficient for GDPR Article 17. Use the hard-delete endpoint and capture the confirmation timestamp.

### Compliance-by-Design: Attribute Tagging

Classify every custom attribute and event property at schema definition time:

| Classification | Handling |
|---|---|
| `pii:direct` | Encrypt at rest, include in DSR scope |
| `pii:indirect` | Audit access, include in DSR scope |
| `consent_governed` | Gate collection on active consent signal |
| `derived` | Document derivation logic, assess re-identification risk |
| `operational` | No special handling |

---

## Quick Reference

| Scenario | Recommended Approach |
|---|---|
| Sync OneTrust consent → Braze | Webhook to middleware → `/users/track` subscription group update |
| GDPR deletion request | DataGrail or OneTrust DSR → Braze hard-delete API → confirmation receipt |
| Consent version mismatch | CMP is authoritative; re-sync Braze attribute on consent update event |
| CCPA opt-out | Map "Do Not Sell" signal → Braze subscription group + custom attribute flag |
| Multi-jurisdiction user | Store `regulatory_scope` attribute; use Braze Connected Content or Canvas to apply jurisdiction-specific logic |
| Consent expiry | Use Braze Canvas with scheduled re-consent trigger; block sends until renewed |

---

## Common Mistakes

**Treating Braze subscription groups as the consent system of record**
Subscription groups are an enforcement mechanism, not a consent database. Consent must be managed upstream; Braze reflects it.

**Conflating marketing preference with legal consent**
A user can have opted out of promotional email (preference) while still having active consent for transactional messages (legal basis). Model these separately.

**Missing consent propagation delay**
CMPs may have latency between capture and API availability. Design pipelines to tolerate brief inconsistency; do not backfill sends that occurred in the window before consent was confirmed.

**DSR deletion without downstream propagation**
Deleting a Braze profile does not delete data in S3 exports, data warehouse copies, or partner sends. The deletion architecture must enumerate all downstream systems.

**Consent version drift**
If a user's consent was captured under an older policy version that no longer provides valid legal basis, the profile may be non-compliant even with an "active" subscription state. Track consent version as a first-class attribute.
```

`★ Insight ─────────────────────────────────────`
The pattern of separating the CMP as "authoritative" and Braze as "subscriber" reflects a real architectural principle in privacy systems: the system that **captures** consent must remain the single source of truth. When Braze can silently override a consent state (e.g., via an import or API call without CMP validation), the entire compliance posture breaks. The consent propagation diagram makes this constraint explicit rather than leaving it as a convention.
`─────────────────────────────────────────────────`
