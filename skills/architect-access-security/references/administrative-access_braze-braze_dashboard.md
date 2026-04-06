---
name: administrative-access_braze-braze_dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/braze_dashboard
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - workspace
  - campaign
  - Canvas
  - segment
  - navigation
  - search
  - permissions
  - roles
  - notifications
triggers:
  - access the braze dashboard
  - switch workspaces
  - search campaigns
  - manage permissions
  - navigate dashboard sections
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are the atomic knowledge units nested inside `skills/{name}/references/`. They're intentionally stripped of navigation chrome (Jekyll `{{site.baseurl}}` refs, image tags) so they read as portable, self-contained reference docs — not web pages. The pipeline consumes these via embedding, so density matters more than formatting polish.
`─────────────────────────────────────────────────`

---

# Braze Dashboard

The Braze dashboard is your central workspace for building, managing, and analyzing customer engagement. Access at `dashboard.braze.com` (US) or `dashboard.braze.eu` (EU).

## Key Areas

- **Home page** — Recently edited content and key performance metrics at a glance; includes a "Pick up where you left off" section showing recent campaigns, Canvases, and segments with type/status tags
- **Left side navigation** — Organizes tools by function (messaging, audience, analytics, settings); minimizable to reduce clutter
- **Global header** — Search, support links, language settings, notifications, account settings, and BrazeAI Operator™

## Workspaces

Content is organized into workspaces (by brand, region, product line, or team). Each workspace has its own campaigns, data, and settings. Permissions can differ between workspaces (e.g., edit access in one, view-only in another).

- Switch workspaces via the dropdown at the top of the side navigation
- Mark workspaces as favorites (via Account Profile settings) to pin them to the top of the switcher

## Dashboard Search

Open global search from the header (or keyboard shortcut). Recently opened pages appear immediately with no query needed.

**Searchable content:** campaign names, Canvas names, Content Blocks, segment names, email template names, pages (including synonyms).

**Filtering:** Toggle **Show active and draft only** to exclude archived items (default includes archived).

**Exact match:** Wrap terms in quotes — e.g., `"all users"` — to find items with that exact phrase.

**Keyboard shortcuts:**

| Action | Shortcut |
|---|---|
| Open search | Mac: `⌘+K` / Windows: `Ctrl+K` |
| Move between results | `↑` / `↓` |
| Select result | `Enter` |
| Close search | `Esc` |

## Side Navigation

- **Minimize** — Press "Minimize menu" to collapse; hover icons to see tooltips
- **Responsive** — Auto-collapses on small screens; tap the hamburger icon to reopen

## Access and Permissions

Sign in at `dashboard.braze.com`. Page access and action permissions are controlled by assigned user roles. Contact your Braze administrator if permissions are missing.
