---
name: get-started-workspaces
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/get_started/workspaces'
indexed_at: '2026-04-05'
keywords:
  - workspace
  - workspaces
  - segmentation
  - targeting
  - profiles
  - campaigns
  - canvases
  - instances
  - connectors
  - teams
triggers:
  - how to set up workspaces
  - when to use separate workspaces
  - cross-platform targeting
  - multiple app instances
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they sit inside `skills/{name}/references/` and are optimized for vector embedding and fast retrieval, so stripping HTML, Jekyll tags, and navigation chrome is essential for clean semantic search results.
`─────────────────────────────────────────────────`

## Workspaces

Workspaces are isolated data silos in Braze. Multiple app versions (iOS, Android, web) can send data to the same workspace; each is called an **app instance**.

### Two Core Purposes

- **Unifying user data** — Multiple app instances in one workspace allow seamless cross-platform targeting (e.g., iOS + Android + web users share one profile).
- **Separating distinct activities** — Distinct brands or user bases should use separate workspaces.

---

### When to Share a Workspace (Multiple App Instances)

Use a single workspace when:
- You have nearly identical apps across platforms
- You have major app revisions but want to continue targeting the same users on upgrade
- Users can move between app versions (e.g., free → premium)

**Segmentation filters affected by shared workspaces** (data is aggregated across all app instances):
- Last Used App / First Used App
- Session Count
- Money Spent In-App
- Push Subscription *(all-or-none: unsubscribe from one = unsubscribe from all)*
- Email Subscription *(all-or-none: compliance risk)*

### When to Use Separate Workspaces

- Development vs. production environments of the same app
- Different sub-brands (e.g., individual games from a game studio)
- Different regional/language localizations

---

### Key Workspace-Scoped Elements

Everything below lives inside a workspace and **cannot be shared across workspaces**:

| Element | Notes |
|---|---|
| **App instances** | One per platform/version combination. Each gets its own API key. |
| **Teams** | Scoped access by location, language, or custom attributes. |
| **User permissions** | Granular per-dashboard-user or per-team controls within the workspace. |
| **Currents connectors** | Real-time event stream exports; not shared across workspaces. Separate environments need separate connectors (additional purchase). |
| **User profiles** | All persistent user data; also useful for troubleshooting engagement history and segment membership. |
| **Segments, Campaigns, Canvases** | Cannot reference data from another workspace. |

---

### App Instance Setup Rule

Create one app instance per platform per app version.

**Example** — Free/Pro app on iOS and Android:
```
Free iOS app    → API key 1
Free Android app → API key 2
Pro iOS app     → API key 3
Pro Android app  → API key 4
```

---

### Approach Comparison

| | Separate Workspaces | Shared Workspace |
|---|---|---|
| **Structure** | One workspace, one app instance | One workspace, multiple app instances |
| **User profile** | One profile per app | One profile across all apps |
| **Targeting** | Precise, no cross-app data bleed | Broad, aggregated filters |
| **Currents** | Connector needed per workspace | One connector covers all instances |
| **Best for** | Different brands, dev/prod split | Same app across platforms |

---

### Planning Checklist

- [ ] Group only the same (or very similar) apps under one workspace
- [ ] Account for Currents connector count before splitting workspaces
- [ ] Remember push/email subscriptions are workspace-wide (all-or-none)
- [ ] Create separate app instances for every platform × version combination
- [ ] Use separate workspaces for development and production

`★ Insight ─────────────────────────────────────`
The table at the end of the source was incomplete (the HTML was cut off), but the semantic content was fully recoverable from the prose — a good reminder that topic file generation should be content-driven, not markup-driven. Nick's triage and topic steps filter exactly this kind of structural noise before embedding.
`─────────────────────────────────────────────────`
