---
name: getting-started-integration-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/integration_overview
indexed_at: '2026-04-05'
keywords:
  - integration
  - onboarding
  - discovery
  - campaigns
  - channels
  - segments
  - events
  - attributes
  - SDK
  - API
  - workspaces
  - dashboard
  - customization
triggers:
  - how to integrate Braze
  - Braze onboarding timeline
  - set up Braze workspace
  - define campaign planning
  - integrate Braze SDK
---
`★ Insight ─────────────────────────────────────`
- Jekyll template tags (`{% image_buster %}`, `{% alert %}`, `{{site.baseurl}}`) must be stripped — they're server-side directives that won't render in a plain markdown context
- The goal is **lossy compression**: drop decorative images and nav links, keep the instructional skeleton and concrete numbers (e.g., "6 weeks", "2-4 hours/week")
- Self-contained means inlining what was previously a hyperlink's destination, not just removing the link
`─────────────────────────────────────────────────`

```markdown
# Integration Overview

Braze onboarding is split into four phases: **Discovery & Planning → Integration → QA → Maintenance**.

Integration timelines range from 1–6 weeks depending on scope and team bandwidth. Many customers have integrated with a single engineer.

---

## Phase 1: Discovery & Planning (~6 weeks)

**Stakeholders:** Project lead, CRM lead, front/back-end engineers, product owners, marketers.

**Engineering time:** Leads 2–4 hrs/week; developers 10–20 hrs/week.

### Campaign Planning

CRM team defines:
- **Channel** — push, email, in-app messages, Content Cards, etc.
- **Delivery method** — scheduled or action-based
- **Target audience** — segment definition
- **Conversion events** — the success metric (e.g., logging a session)

> **Critical:** Integration cannot begin until campaign planning is complete. This step determines which Braze features must be configured.

### Data Requirements

- Standard attributes (name, email, DOB, country) are auto-tracked after SDK integration.
- Any additional data must be defined as **custom events or custom attributes**.
- Establish an **event taxonomy** consistent across your growth stack (e.g., match naming to your data warehouse).

### Customization Planning

Decide the level of UI customization needed:
- Use Braze default components (e.g., default Content Cards)
- Tweak look/feel to match brand guidelines
- Build fully custom UI backed by Braze analytics

Scope increases significantly with custom UI work.

### Dashboard & Access

- Team admin adds all users to the Braze dashboard.
- Developers use the dashboard to manage API keys and push credentials.

### Workspaces & API Keys

- **Workspaces** group users, segments, and API keys. Best practice: one workspace per app (or closely related apps).
- Each platform (iOS, Android, web) has its own API key within a workspace.
- **Set up separate dev and production workspaces** — use the test workspace API key during onboarding/QA to avoid polluting production data.

---

## Phase 2: Integration (1–6 weeks)

**Supported platforms:** iOS, Android, web, React Native, Unity, and other cross-platform wrappers.

**Developer skills needed:**
- Native layer development (app or web)
- REST API consumption
- Integration testing
- JSON web token authentication
- General data management

### Integration Steps (high-level)

1. Integrate the SDK for your platform(s)
2. Connect REST API for server-side data flows
3. Enable messaging channels (push, email, in-app, etc.)
4. Set up data import/export pipelines

---

## Phase 3: Quality Assurance

Verify that the data and messaging loop between Braze and your app/site works as expected. Use the **test workspace** throughout QA to isolate test data from production.

---

## Phase 4: Maintenance

After handing off to the marketing team, engineering continues to ensure platform stability, SDK updates, and any new channel integrations.

---

## Key Decisions Checklist

| Decision | Who | When |
|----------|-----|------|
| Define messaging use cases | CRM team | Discovery |
| Define custom event taxonomy | Dev + CRM | Discovery |
| Create test workspace | Admin | Before integration |
| Assign correct API key permissions | Admin/Dev | Before integration |
| Attend Braze technical overview sessions | Engineers | During onboarding |
```

`★ Insight ─────────────────────────────────────`
- The decision checklist table at the end synthesizes info scattered across the original — this "summary table" pattern is particularly valuable for topic files because agents can scan it without reading the full narrative
- Converting the alert blocks into inline callouts (bold text or blockquotes) preserves the warning intent without Jekyll-specific syntax
- Concrete numbers from the original ("6 weeks", "2–4 hrs/week", "1–6 weeks") are high-signal facts worth keeping verbatim — they answer planning questions directly
`─────────────────────────────────────────────────`
