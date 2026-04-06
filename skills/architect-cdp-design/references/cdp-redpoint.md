---
name: cdp-redpoint
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/redpoint
indexed_at: '2026-04-05'
keywords:
  - CDP
  - Redpoint
  - Braze
  - integration
  - segmentation
  - orchestration
  - profiles
  - attributes
  - templates
  - channels
triggers:
  - integrate Redpoint with Braze
  - set up Redpoint CDP
  - configure outbound channels
  - map attributes to Braze
  - create export templates
---
## Redpoint CDP Integration with Braze

Redpoint is a campaign orchestration platform with segmentation, scheduling, and automation capabilities. This integration is maintained by Redpoint.

### Integration Modes

| Mode | Behavior |
|------|----------|
| **Braze Onboarding and Upsert** | Upserts user profiles — inserts new records or updates existing ones |
| **Braze Append** | Updates profiles only if the user already exists in Braze |

Each mode requires its own export template and outbound channel.

### Prerequisites

- Braze REST API key with `users.track` permission (created at **Settings > API Keys**)
- Braze REST endpoint URL for your instance
- Redpoint Data Management artifacts — request from [Redpoint Support](https://support.redpointglobal.com)

### Custom Attributes Added to Braze Profiles

| Field | Description |
|-------|-------------|
| `rpi_cdp_attributes` | Redpoint CDP profile attribute object |
| `rpi_audience_outputs` | Array of audience output tags from Braze channel executions |
| `rpi_offers` | Array of offer tags from Braze channel executions |
| `rpi_contact_ids` | Array of offer history contact IDs |
| `rpi_channel_exec_ids` | Array of channel execution IDs |

### Setup Steps

#### Step 1: Create Export Templates in Redpoint Interaction (RPI)

**Template 1 — Braze Onboarding and Upsert**

Map Redpoint CDP attributes to Braze user profile fields:

| Redpoint Attribute | Braze Header Row Value |
|--------------------|------------------------|
| PID | `external_id` |
| First Name | `first_name` |
| Last Name | `last_name` |
| Primary Email | `email` |
| Primary Country | `country` |
| DOB | `dob` |
| Gender | `gender` |
| Primary City | `home_city` |
| Primary Phone | `phone` |

Also add **Output Name** from the Offer History table. Additional custom attributes (e.g., education, income, marital status) can be appended.

**Template 2 — Braze Append**

Only two attributes needed:

| Redpoint Attribute | Header Row Value |
|--------------------|------------------|
| PID | `external_id` |
| Output Name | `output_name` |

**Date Format (both templates):** Options tab → Date Format → Custom Format → `yyyy-MM-dd`

#### Step 2: Create Outbound Channels in RPI

Create two **Outbound Delivery** channels:
- `Braze Onboarding and Upsert`
- `Braze Append`

> After initial onboarding, ensure subsequent Upsert workflows select only records changed since the last sync.

#### Step 3: Configure Each Channel

**General tab:**
- Assign the matching export template to each channel
- Set **Export path format** pointing to a shared network/FTP/external content location accessible by both Redpoint Interaction and Redpoint Data Management
- Path must end with: `\\[Channel]\\[Offer]\\[Workflow ID]`

**Post Execution tab:**
- Enable **Post-execution** checkbox
- Enter your Redpoint Data Management web service URL (identical on both channels)

#### Step 4: Set Up Redpoint Data Management (RPDM) Components

Import the RPDM artifacts archive provided by Redpoint Support. The archive includes a README with detailed component setup instructions.

`★ Insight ─────────────────────────────────────`
- The two-mode design (Upsert vs. Append) maps directly to Braze's `/users/track` endpoint behavior — upsert creates or updates, append only modifies existing records, preventing accidental profile creation from orphaned data.
- The `external_id` field (mapped from Redpoint's `PID`) is the critical join key between the two systems; without it, Braze cannot reconcile which user profile to update.
- The post-execution webhook pattern (Step 3b) is how Redpoint Data Management is triggered after RPI channel execution — this is a pipeline handoff, not a direct Braze call. RPDM reads the exported file and calls Braze's REST API.
`─────────────────────────────────────────────────`
