---
name: engagement-tools-testing-global-control-group
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/global_control_group
indexed_at: '2026-04-05'
keywords:
  - control-group
  - exclusions
  - campaigns
  - canvases
  - testing
  - audience
  - buckets
  - uplift
  - transactional
  - treatment
triggers:
  - how to set up global control group
  - exclude campaigns from control group
  - measure campaign uplift
  - add exclusion tags
  - control group configuration
---
The `learn` skill is for capturing conversation insights — not relevant here. Proceeding with the documentation processing.

---

`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" stored under `skills/{skill-name}/references/`. They're intentionally self-contained so the routing system can serve them without broader context — which is exactly why the condensation step strips nav boilerplate and Jekyll template tags like `{% alert %}` and `{{site.baseurl}}`.
`─────────────────────────────────────────────────`

---

## Global Control Group

A Global Control Group designates a percentage of all users who receive **no campaigns or Canvases**, enabling measurement of messaging uplift over time by comparing their behavior against users who do receive messages.

---

### How It Works

- Users in the control group are excluded from **all channels, campaigns, and Canvases** with two exceptions:
  - **API campaigns** — control group users *still receive* these
  - **API-triggered Content Card campaigns** — control group users are *excluded*
- Feature flags cannot be enabled for control group users; they also cannot participate in feature flag experiments

**Random bucket number assignment:** Braze selects multiple ranges of random bucket numbers to populate the group. New users whose random bucket numbers fall in those ranges are automatically added. Deleted users shrink the group proportionally. The group size is always a constant percentage of the total user base.

**Treatment group:** A parallel, randomly selected group of non-control users (same approximate size, same bucket method) used as the comparison sample for uplift reporting. Each workspace has exactly one control group and one treatment sample group.

---

### Setup

**Location:** Audience > Global Control Group

**Steps:**
1. Enter a percentage of all users to assign to the control group
2. Review Braze's estimate of control, treatment, and treatment sample sizes (accuracy improves with larger workspaces)
3. Add **exclusion tags** — campaigns/Canvases with these tags bypass the control group and reach all targeted users (useful for transactional messages)
4. Save — active and future campaigns/Canvases immediately stop sending to the group

**Percentage guidelines:** See testing best practices documentation.

---

### Exclusion Settings

Tags added to exclusion settings exempt matching campaigns/Canvases from the control group. Those campaigns still reach every user in the target audience, including control group members.

**Use case:** Transactional messages that must reach every user.

---

### Making Changes

The Global Control Group **cannot be edited in place** — it must be disabled and recreated:

1. Disable the current group (**Settings** tab)
   - Users immediately become eligible for campaigns/Canvases
   - The group composition cannot be restored after disabling
2. Export a CSV of current members before disabling (recommended)
3. Save a new group with the desired percentage
   - Even the same percentage generates a **new, different** set of users

**Shuffling membership:** Disable and re-enable to shuffle. Recommended frequency: no more than once per month.

---

### Exporting Group Members

- **CSV:** Global Control Group Settings tab → download icon → **Export**
- **API:** Use the export endpoint (see API reference)

---

### Key Constraints

| Constraint | Detail |
|---|---|
| Cannot remove specific users | Use exclusion tags instead |
| Cannot edit group size in place | Must disable and recreate |
| Feature flags blocked | Control group users excluded from feature flag experiments |
| API campaigns exempted | Control group users still receive API campaigns |
| One group per workspace | Maximum one control group + one treatment sample |

---

### Membership Lifecycle

| Event | Effect on group |
|---|---|
| New user with matching bucket number | Automatically added |
| User deleted | Group shrinks proportionally |
| Users added to workspace | Group grows to maintain percentage |
| Group disabled | All members immediately eligible for messaging |
| New group saved at same % | Entirely new random member set |
