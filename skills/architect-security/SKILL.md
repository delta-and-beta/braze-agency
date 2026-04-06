---
name: architect-security
description: >-
  Security qualifications, vulnerability disclosure, and compliance requirements
  for Braze integrations.
metadata:
  role: braze-architect
  topics:
    - disclosures-security-qualifications
    - disclosures-security-and-vulnerability-disclosure
    - disclosures-open-source-software-disclosure
    - disclosures-innovation-statement
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files for plugins serve a different purpose than superpowers process skills — they're **domain knowledge documents** that teach Claude what a role-persona knows, not behavioral procedures. The frontmatter (`name`/`description`) is omitted here because the pipeline generates it separately from the skill content during assembly.
`─────────────────────────────────────────────────`

# Security & Compliance

## Overview

This skill covers Braze's security posture, vulnerability disclosure processes, open source software obligations, and compliance qualifications. Use it when evaluating whether a Braze integration meets organizational security standards, when responding to vendor security questionnaires, or when advising on responsible disclosure of vulnerabilities found in Braze services.

**Lens:** Security and compliance perspective — every recommendation should be evaluated against organizational risk tolerance, regulatory requirements, and Braze's published commitments.

---

## When to Use This Skill

- Assessing Braze's security certifications or compliance posture (SOC 2, ISO 27001, GDPR, etc.)
- Advising on how to report a discovered vulnerability in Braze services
- Reviewing open source license obligations introduced by Braze SDKs
- Responding to security review boards or procurement questionnaires about Braze
- Evaluating whether Braze's innovation/AI practices align with data governance policies

---

## Topics Synthesized

| Topic | What It Covers |
|-------|----------------|
| **Security Qualifications** | Certifications, audit reports, and compliance frameworks Braze maintains |
| **Security & Vulnerability Disclosure** | How to report vulnerabilities, SLA expectations, and the responsible disclosure process |
| **Open Source Software Disclosure** | OSS components bundled in Braze SDKs, license types, and obligations |
| **Innovation Statement** | Braze's position on AI/ML use and how customer data is used in product development |

---

## Security Qualifications

Braze maintains security certifications that satisfy most enterprise procurement requirements. When advising on compliance fit, verify the current certificate scope against the integration's data residency region.

**Common certifications held by Braze:**
- SOC 2 Type II (Security, Availability, Confidentiality)
- ISO 27001
- GDPR compliance documentation
- CCPA readiness

**How to apply:** Point security reviewers to Braze's Trust Center or request reports via your Braze account team. Do not rely on cached certification claims — certificates expire and scopes change.

---

## Security & Vulnerability Disclosure

Braze operates a responsible disclosure program. If a vulnerability is found during a penetration test, red team engagement, or incidental discovery:

**Reporting channel:** `security@braze.com`

**What to include in a report:**
- Affected service or endpoint
- Reproduction steps
- Potential impact assessment
- Supporting evidence (screenshots, request/response logs — redact any PII)

**Expectations:**
- Braze acknowledges reports and investigates before public disclosure
- Coordinated disclosure timelines are negotiated with the reporter
- Do not publish findings before Braze has had the opportunity to remediate

**For integration architects:** If your penetration test scope includes Braze-hosted endpoints, obtain written authorization from Braze before testing. Unauthorized scanning of Braze infrastructure violates the terms of service.

---

## Open Source Software Disclosure

Braze SDKs incorporate open source components. This creates license obligations for organizations embedding the SDK in their own products.

**Key considerations:**
- Review Braze's OSS disclosure documentation for the SDK version in use
- Common license types found in Braze dependencies: MIT, Apache 2.0, BSD — these are permissive and generally require attribution, not source disclosure
- Copyleft licenses (GPL family) in transitive dependencies require closer legal review
- Braze publishes OSS notices alongside SDK releases; validate these match your version

**How to apply:** When advising on SDK adoption, flag the OSS disclosure review as a prerequisite gate in the vendor onboarding checklist. Legal review is required before shipping an app that bundles Braze SDK in regulated industries.

---

## Innovation Statement

Braze's innovation and AI/ML practices govern how customer data flows into product improvement and model training pipelines.

**Core principle:** Braze distinguishes between **operational data** (used to deliver the service) and **training data** (used to improve AI features). Review the current Data Processing Agreement (DPA) to confirm the boundary for your contract.

**What to verify with your account team:**
- Whether your data is used for cross-customer model training
- Opt-out mechanisms for AI-assisted features if your data governance policy requires them
- How Braze's Sage AI features interact with message content and behavioral data

**How to apply:** For organizations in regulated verticals (finance, healthcare), escalate the innovation statement review to your DPO before enabling any AI-assisted Braze features (e.g., Intelligent Timing, predictive churn, Sage AI).

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Citing a SOC 2 report older than 12 months | Request the current report from your Braze account team |
| Scanning Braze-hosted endpoints without authorization | Get written permission scoped to your tenant before any security testing |
| Assuming permissive OSS licenses require no action | Attribution requirements still apply; document them in your NOTICE files |
| Enabling Sage AI features without DPA review | Review the DPA and confirm data use boundaries with legal first |
| Publishing vulnerability findings immediately | Follow coordinated disclosure — contact security@braze.com first |
