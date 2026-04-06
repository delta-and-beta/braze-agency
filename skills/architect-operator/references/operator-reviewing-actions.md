---
name: operator-reviewing-actions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/operator/reviewing_actions
indexed_at: '2026-04-05'
keywords:
  - operator
  - actions
  - approval
  - dashboard
  - cards
  - messages
  - webhooks
  - editor
  - review
  - auto-approve
triggers:
  - review operator actions
  - approve dashboard changes
  - operator action cards workflow
  - auto-approve toggle
  - decline operator changes
---
## Reviewing BrazeAI Operator Actions

BrazeAI Operator presents proposed dashboard changes as **action cards** for review before execution.

### Action Card Workflow

1. Operator summarizes its plan
2. Each proposed change appears as a separate card (shows previous vs. proposed values side by side)
3. Reviewer approves or declines each card individually
4. Approved actions execute in Braze; declined actions are skipped
5. If an action fails post-approval, Operator notifies with failure details

### Supported Editors / Pages

Action cards are available in:
- **Message editors:** In-app messages (traditional editor only), Content Cards, Email (HTML editor only), Push notifications, SMS/MMS/RCS, Webhooks
- **Create custom agent** page

On unsupported pages, Operator provides manual step-by-step instructions instead.

### Modifying a Plan

- Approve or reject all pending actions first, then describe the desired change in a new message
- Approved actions **cannot be undone** through Operator — describe the new change or edit manually in the dashboard

### Auto-Approve Toggle

Located in the Operator chat panel.

| Setting | Behavior |
|---|---|
| **On** | Actions execute immediately without manual approval |
| **Off** (default) | All actions require manual review |

**Exceptions:** Even with auto-approve on, some actions always require explicit approval — generating images and workspace-level setting changes.

**Reset behavior:** Auto-approve resets on page refresh, new tab, or logout. Navigating between dashboard pages does not reset it. Can be turned off at any time.
