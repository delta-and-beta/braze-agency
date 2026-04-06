---
name: architect-templates
description: >-
  Design patterns for Canvas templates including Braze-provided templates for
  onboarding, abandoned cart, lapsed user, and custom template creation.
metadata:
  role: braze-architect
  topics:
    - canvas-get-started-braze-templates
    - canvas-get-started-braze-templates-abandoned-cart
    - canvas-get-started-braze-templates-back-in-stock
    - canvas-get-started-braze-templates-email-signup
    - canvas-get-started-braze-templates-feature-adoption
    - canvas-get-started-braze-templates-lapsed-user
    - canvas-get-started-braze-templates-onboarding
    - canvas-get-started-braze-templates-post-purchase-feedback
    - canvas-get-started-braze-templates-preference-survey
    - canvas-create-a-canvas-canvas-templates
    - canvas-create-a-canvas-templates
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Domain knowledge skills like this one differ from discipline/technique skills — they're reference guides organized around a practitioner's mental model (the "lens"), not a process to enforce. The lens (architect's perspective on reusability) shapes how topics are grouped and what relationships are surfaced.
`─────────────────────────────────────────────────`

# Template Architecture & Patterns

## Scope & Purpose

This skill covers how to design and leverage Braze Canvas templates to build reusable engagement workflows. It applies an **architect's lens**: rather than executing individual templates, the goal is understanding the structural patterns behind each template so you can compose, adapt, and extend them across diverse engagement scenarios.

Use this skill when:
- Selecting or recommending a Braze-provided template for a campaign brief
- Designing a net-new Canvas flow that mirrors a known engagement archetype (onboarding, re-engagement, transactional)
- Advising on template parameterization so a single flow serves multiple segments or brands
- Auditing an existing Canvas for structural debt (hardcoded values, missing exit conditions, duplicated branches)
- Creating or managing custom templates in the Braze dashboard

---

## The Architect's Lens: Reusability Patterns

Every Braze Canvas template is an opinionated answer to a recurring engagement problem. As an architect, read each template through three questions:

1. **What user state change triggers the journey?** (entry event / audience filter)
2. **What decision branches exist, and what data drives them?** (splits, filters, connected content)
3. **What are the exit conditions?** (conversion event, inactivity window, opt-out)

These three axes — trigger, branch, exit — define the reusable skeleton. Swapping the messaging content while preserving this skeleton is what makes a template genuinely reusable.

---

## Braze-Provided Template Catalog

### Lifecycle Engagement Templates

| Template | Entry Trigger | Core Pattern | Key Branch Signal |
|----------|--------------|--------------|-------------------|
| **Onboarding** | New user / first session | Sequential nurture with adoption milestones | Session count or feature interaction |
| **Onboarding with Preferences Survey** | New user | Onboarding + early data capture | Survey response → personalized path |
| **Lapsed User** | Inactivity window | Re-engagement with value reminder + incentive | Recency of last engagement |
| **Feature Adoption** | New feature release or targeted segment | Awareness → trial → habit loop | Feature interaction event |

**Architectural note on lifecycle templates:** These follow a **linear progression with fallback branches** — the happy path assumes increasing engagement, while fallback branches catch users who stall. Always define what happens at the end of the fallback (suppress, re-enter, hand off to lapsed flow).

### Transactional / Behavioral Templates

| Template | Entry Trigger | Core Pattern | Key Branch Signal |
|----------|--------------|--------------|-------------------|
| **Abandoned Cart** | Cart event without purchase within window | Real-time urgency series | Purchase completion event (exit) |
| **Back in Stock** | Inventory event matched to prior user interest | Single or short series triggered by catalog event | User interaction with item |
| **Post-Purchase Feedback** | Purchase confirmation event | Delayed feedback request | Feedback submission or timeout |

**Architectural note on behavioral templates:** These are **event-driven with tight timing constraints**. The exit condition (purchase, feedback submitted) must be defined first — otherwise the Canvas continues sending after the user has already converted. Always wire the conversion event before configuring message steps.

### Acquisition / Channel Templates

| Template | Entry Trigger | Core Pattern | Key Branch Signal |
|----------|--------------|--------------|-------------------|
| **Email Sign-up with Double Opt-In** | Email capture event | Confirmation gate → subscriber activation | Opt-in confirmation click |

**Architectural note:** This template is a **two-gate funnel** (capture → confirm → activate). The confirmation step is a hard requirement for compliance in many jurisdictions. Design the timeout window (how long before an unconfirmed lead is purged) as a configurable parameter.

---

## Topics Synthesized

This skill draws from the following reference topics:

- **Braze Canvas Templates Overview** — high-level catalog and discovery patterns
- **Canvas Templates Configuration** — creating, saving, and managing templates in the dashboard
- **Canvas Template Details** — parameterization, variable fields, and template metadata
- **Onboarding Template** — sequential adoption nurture pattern
- **Preference Survey Template** — onboarding + early personalization data capture
- **Lapsed User Template** — re-engagement with incentive branching
- **Feature Adoption Template** — awareness-to-habit loop pattern
- **Abandoned Cart Template** — real-time behavioral re-engagement
- **Back in Stock Template** — catalog-event-triggered messaging
- **Post-Purchase Feedback Template** — post-conversion insight capture
- **Email Signup Template** — double opt-in acquisition gate

---

## Creating and Managing Custom Templates

When none of the Braze-provided templates fit, you can save any Canvas as a template:

1. Build the Canvas with all structural logic in place (entry, branches, exits)
2. Use **template variables** for any value that will differ per use (audience name, offer amount, product name)
3. Save as template from the Canvas builder — templates are stored at the workspace level and available to all users
4. Templates capture step structure but not live segment or connected content definitions — these must be reconfigured per instance

**Design rule:** A template should be **structurally complete but content-agnostic**. If you find yourself hardcoding a product name or a specific discount value into a template, extract it as a variable or note it as a customization point in the template description.

---

## Common Structural Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| No conversion exit event | Users receive messages after converting | Define exit on purchase/feedback/opt-in before any message step |
| Hardcoded timing delays | Template unusable across different cadences | Parameterize delay windows (e.g., "{{re_engagement_delay_hours}}") |
| Missing frequency cap override | Template-based Canvases may still hit global caps | Evaluate whether the Canvas should override caps (abandoned cart often should) |
| Single-path fallback | Stalled users get no further treatment | Add inactivity branch at key milestones |
| No template description | Future users can't distinguish template variants | Write the trigger, primary use case, and any compliance notes in the template description field |

---

## When to Use This Skill

Consult this skill when the conversation involves:
- Selecting among Braze-provided templates for a brief
- Diagnosing why a Canvas flow isn't converting as expected (check trigger/branch/exit alignment)
- Designing a new Canvas and looking for a structural archetype to start from
- Reviewing whether a custom template is structured for reuse or is too brittle to share

For questions about individual message composition, personalization logic, or A/B test configuration within a Canvas, use the appropriate messaging or experimentation skills.

`★ Insight ─────────────────────────────────────`
The table format for the template catalog serves a specific architectural purpose: it makes the three reusable axes (trigger, pattern, branch signal) comparable across templates at a glance. This is more useful to an architect than prose descriptions, which would bury the structural relationships.
`─────────────────────────────────────────────────`
