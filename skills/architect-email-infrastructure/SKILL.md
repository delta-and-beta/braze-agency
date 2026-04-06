---
name: architect-email-infrastructure
description: >-
  Email setup including authentication, IP warming, domain configuration,
  deliverability, and SSL.
metadata:
  role: braze-architect
  topics:
    - email-setup-ssl
    - email-setup-setting-up-ips-and-domains
    - email-setup-ip-warming
    - email-setup-automated-ip-warming
    - email-setup-import-your-email-list
    - email-setup-email-validation
    - email-setup-deliverability-pitfalls-and-spam-traps
    - email-setup-authentication
    - email-setup-consent-and-address-collection
    - email-email-setup
    - email-transactional-message-api-campaign
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill reveals that skill descriptions should describe *when to use* (triggering conditions), not *what the skill does* — Claude uses descriptions as load/no-load decisions, so they're more like routing matchers than summaries.
- Skill files optimized for "Claude search" (CSO) front-load keywords — error messages, symptoms, tool names — so the relevant skill surfaces when Claude encounters a related problem.
`─────────────────────────────────────────────────`

Here's the skill file body:

---

# Email Infrastructure

## Overview

This skill covers the full lifecycle of configuring, authenticating, and optimizing email delivery in Braze from an infrastructure perspective. It synthesizes guidance on IP provisioning, domain authentication, SSL, list hygiene, and deliverability — the foundational layer that must be correctly in place before campaign content or personalization matters.

**Core principle:** Email deliverability is an infrastructure problem before it is a content problem. SPF/DKIM/DMARC misconfiguration, rushed IP warming, or poor list hygiene will cause deliverability failures regardless of message quality.

## When to Use

Use this skill when:

- Setting up a new Braze email sending environment (IPs, domains, subdomain selection)
- Diagnosing deliverability failures, spam folder placement, or bounce spikes
- Configuring or auditing SPF, DKIM, or DMARC DNS records
- Planning or troubleshooting IP warming — manual or automated
- Enabling SSL/HTTPS for tracked links and custom domains
- Importing an existing email list into Braze for the first time
- Evaluating transactional email routing (API-triggered vs. campaign)
- Reviewing consent practices and list collection for compliance readiness

**Not this skill:** Campaign content, Liquid templating, A/B testing, or analytics — those belong to the messaging and analytics skill domains.

## Infrastructure Lens

This skill approaches email through the lens of **how to configure, secure, and optimize email delivery systems**. That means:

- DNS and record correctness over sender intent
- IP reputation and warm-up sequencing over campaign scheduling
- Authentication chain validity (SPF → DKIM → DMARC alignment) over individual send settings
- Bounce and spam trap hygiene as ongoing operational health, not a one-time setup

When diagnosing a deliverability issue, this skill reasons from infrastructure outward: check auth records first, then IP reputation, then list quality, then content.

## Topics Synthesized

| Topic | Infrastructure Concern |
|---|---|
| **Email Setup Overview** | End-to-end checklist: domain, IP, auth, SSL |
| **IP & Domain Setup** | Subdomain selection, dedicated vs. shared IPs, DNS propagation |
| **IP Warming** | Manual schedule, volume ramp, inbox provider reputation build |
| **Automated IP Warming** | Braze-managed ramp using `IP Warming` feature (early access) |
| **Email Authentication (SPF/DKIM/DMARC)** | Record syntax, alignment modes, DMARC policy enforcement |
| **Email SSL Configuration** | HTTPS for tracked links, CDN integration, certificate management |
| **Email Validation** | Local-part and host-part rules, dashboard vs. end-user address validation |
| **Import Email List** | List hygiene requirements before first send, suppression seeding |
| **Consent & Address Collection** | Opt-in mechanisms, permission flags, compliance posture |
| **Deliverability Pitfalls & Spam Traps** | Recycled traps, pristine traps, bounce categories, blocklist recovery |
| **Transactional Email API** | API-triggered send path, transactional vs. marketing routing, SLA considerations |

## Key Infrastructure Concepts

### Authentication Chain

```
SPF   → "This IP is authorized to send for this domain"
DKIM  → "This message was cryptographically signed by the sending domain"
DMARC → "What to do when SPF/DKIM fail, and where to send reports"
```

All three must be configured. DMARC only enforces if SPF *or* DKIM aligns with the `From:` domain header — misaligned subdomains are a common silent failure.

### IP Warming Sequence

New dedicated IPs have no reputation. ISPs throttle or block unfamiliar IPs by default. Warming builds reputation by:

1. Starting at low volume (hundreds/day) with highest-engagement segments
2. Gradually increasing over 4–8 weeks
3. Monitoring bounce rates, spam complaints, and inbox placement throughout

Automated IP warming in Braze manages this schedule without manual volume management, but still requires monitoring.

### List Quality Gate

An unclean list imported to Braze will poison IP reputation on first send. Before importing:
- Remove hard bounces and known invalids
- Seed suppression lists with known unsubscribes
- Validate address format (Braze enforces RFC-compliant local and host part rules)
- Confirm opt-in status — sending to purchased or scraped lists triggers spam trap hits

## Common Failure Patterns

| Symptom | Likely Infrastructure Root Cause |
|---|---|
| High spam folder placement | DMARC not enforced, or `p=none` with alignment failures |
| Sudden bounce spike | IP not warmed before volume increase |
| Tracked links broken or flagged | SSL not configured on custom tracking domain |
| Deliverability drops after list import | Invalid addresses or spam traps imported |
| DMARC reports showing failures | SPF `~all` softfail combined with no DKIM, causing DMARC miss |
| Transactional emails delayed | Routed through marketing IP pool instead of dedicated transactional path |

## Quick Reference: Setup Sequence

For a new Braze email environment, configure in this order:

1. Provision dedicated sending IP(s)
2. Configure sending subdomain (e.g., `mail.brand.com`, never root domain)
3. Add SPF TXT record for sending IP/domain
4. Generate and publish DKIM keys via Braze dashboard
5. Set DMARC policy (`p=none` initially for monitoring, then `p=quarantine`/`p=reject`)
6. Enable SSL on custom tracking domain
7. Seed suppression list and validate import list quality
8. Begin IP warming with highest-engagement segment at low volume
9. Monitor inbox placement via seed testing throughout warm-up
