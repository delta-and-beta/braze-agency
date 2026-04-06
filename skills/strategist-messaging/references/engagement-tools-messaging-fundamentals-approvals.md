---
name: engagement-tools-messaging-fundamentals-approvals
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/approvals
indexed_at: '2026-04-05'
keywords:
  - approvals
  - campaigns
  - canvases
  - workflow
  - permissions
  - launch
  - audience
  - messaging
  - conversion
triggers:
  - enable approval workflow
  - who can approve campaigns
  - approval reset behavior
  - canvas vs campaign approvals
  - sections requiring approval
---
# Message Approvals

Approval workflows add a final checkpoint before launching Campaigns or Canvases, requiring authorized users to approve each required section.

## Enabling

Go to **Settings > Approval Workflow** and toggle:
- **Use approval workflow for all Campaigns in [workspace]**
- **Use approval workflow for all Canvases in [workspace]**

Off by default. Not supported for API campaigns or Transactional Email campaigns.

## Required Approvals Before Launch

**Campaigns** — must approve all four sections:
- Messages
- Delivery
- Target Audience
- Conversion Events

**Canvases** — must approve all five sections:
- Conversion Events
- Entry Schedule
- Target Audience
- Send Settings
- Build Canvas

Default status for every section: **Pending Approval**.

## Permissions

Required permission: **"Approve and Deny Campaigns"** or **"Approve and Deny Canvases"** (applies per entity type). Can be scoped to Workspaces, Teams, or Permission Sets.

With the permission, a user can:
- Self-approve their own changes
- Approve and launch
- Approve without launching (another user with "Send Campaigns, Canvases" can launch)
- Neither approve nor launch

## Approval Reset Behavior

Any saved change to a Campaign or Canvas — even a minor one — **resets all approval statuses to Pending Approval**. This applies to both drafts and post-launch edits.

## Campaign vs. Canvas: Key Difference

- **Campaigns**: No draft mode for live edits. The approver must approve changes directly since there is no separate draft version. Requires the editor to have "Approve and Deny Campaigns" to edit a live campaign.
- **Canvases**: Edits can be saved as a draft; a separate user can then approve and launch.

## Canvas Save vs. Approve Order (Important)

Approval status and canvas content saves are independent:
1. Make edits → click **Save**
2. After save completes → approve sections on Summary step
3. Only click **Save** again if you make further edits (this will reset all approvals)

> Clicking **Approve** saves approval immediately. Clicking **Save** saves content/settings only — it does not save approval status.

---

`★ Insight ─────────────────────────────────────`
- The Jekyll `{% tabs %}` / `{% alert %}` liquid tags are presentation layer only — stripping them and inlining the content as flat markdown makes the topic file portable across any renderer.
- The "reset on save" behavior is the highest-friction footgun in this feature; surfacing it prominently (and separately for Canvas vs. Campaign) is the most valuable thing a condensed reference can do.
- Separating the Campaign/Canvas distinction into a single comparison section rather than repeating context in both branches reduces cognitive load without losing any facts.
`─────────────────────────────────────────────────`
