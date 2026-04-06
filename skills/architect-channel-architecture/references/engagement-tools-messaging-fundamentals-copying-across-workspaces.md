---
name: engagement-tools-messaging-fundamentals-copying-across-workspaces
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/copying_across_workspaces
indexed_at: '2026-04-05'
keywords:
  - campaign
  - canvas
  - workspace
  - copy
  - channels
  - email
  - SMS
  - webhook
  - template
  - conversion
triggers:
  - how to copy campaigns across workspaces
  - copy canvases to another workspace
  - what content gets copied when duplicating campaigns
  - supported channels for workspace copying
  - copy email templates between workspaces
---
## Copying Campaigns and Canvases Across Workspaces

Copies are created as **drafts** until you edit and launch.

### Supported Channels

| Type | Supported | Not Supported |
|---|---|---|
| **Campaigns** | SMS, in-app messages, push, email, webhooks, email templates, feature flags, Content Blocks | Content Cards |
| **Canvases** | Email, in-app messages, push, webhooks, SMS | LINE, Content Cards, WhatsApp |

Multi-channel campaigns with any unsupported channel cannot be copied.

### How to Copy

**Campaign:** Gear icon → **Copy to workspace**

**Canvas:** Vertical ellipsis menu → **Copy to workspace**

After copying, review and test all fields before launching.

> **Canvas note:** Audience Sync step settings are not copied, but the steps themselves are included in the journey.

---

### What Gets Copied vs. Omitted

#### Campaign/Canvas Details

| Copied | Omitted |
|---|---|
| Description, Type | Territories, Tags |
| Actions (nested) | Segments, Approvals |
| Conversion behaviors (nested) | Trigger schedule |
| Quiet time & frequency capping | Summaries, Filters |
| Recipient subscription state | Exit criteria (Canvas only) |
| Recurring schedule, Is Transactional | |

#### Conversion Behaviors & Actions

| Copied | Omitted |
|---|---|
| Type behavior | Workspace IDs |
| Campaign/Canvas interaction | Campaign/Canvas ID |
| Custom event name, Product name | |

#### Message Variations

| Copied | Omitted |
|---|---|
| Send percentage, Type | API ID, Seed group IDs, Link template IDs, Internal user group IDs |

#### Email Message Variation

| Copied | Omitted |
|---|---|
| Email body, Message extras, Title, Subject | From address, Reply to, BCC, Link template, Link aliasing, Translations |

#### Email Body

| Copied | Omitted |
|---|---|
| Plain text, HTML/drag-and-drop, Preheader, Inline CSS, AMP HTML | Link aliasing, Translations |

#### Email Templates

| Copied | Omitted |
|---|---|
| Email body, Description, Subject, Headers | API IDs, Image IDs, Territories, Tags, Translations |

#### Content Blocks

| Copied | Omitted |
|---|---|
| Name, Description, Content, HTML/drag-and-drop | Link aliasing, API keys, Territories, Tags |

#### SMS Message Variation

| Copied | Omitted |
|---|---|
| Body, Link shortening, Click tracking, Media items | Messaging service, VCF media items |

---

### Liquid References

Liquid references in message bodies are copied, but **will not function across workspaces**. A Canvas copied from Workspace A to Workspace B cannot reference Workspace A's data — trigger actions, audience filters, and workspace-specific variables must be reconfigured in the destination workspace.
