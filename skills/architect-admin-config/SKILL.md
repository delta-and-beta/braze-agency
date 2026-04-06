---
name: architect-admin-config
description: >-
  Designs workspace structures, manages platform settings, rate limits, and API
  configurations.
metadata:
  role: braze-architect
  topics:
    - administrative-app_settings
    - administrative-app_settings-workspaces
    - administrative-app_settings-company_settings
    - administrative-app_settings-api_settings_tab
    - administrative-app_settings-email_settings
    - administrative-app_settings-push_settings
    - administrative-app_settings-messaging_rate_limits
    - administrative-app_settings-multi_language_settings
    - administrative-app_settings-tags
    - administrative-app_settings-subscription_and_usage
    - administrative-app_settings-manage_your_braze_users
    - administrative-app_settings-internal_groups_tab
    - administrative-app_settings-brand_guidelines
    - administrative-app_settings-exports_log
    - administrative-app_settings-event_user_log_tab
    - administrative-app_settings-message_activity_log_tab
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick plugin skills differ from personal superpowers skills — they don't follow TDD. They're reference documents for Claude to consult at query time, loaded selectively based on routing depth and keyword matching via `skill_index.json`. The lens guides what angle to take when synthesizing topics into guidance.
`─────────────────────────────────────────────────`

# Administration & Configuration

This skill covers how to structure Braze workspaces, configure platform-wide settings, and manage organizational controls — from API keys and rate limits to user permissions and diagnostic tooling.

Use this skill when the query involves:
- Setting up or reorganizing workspace structure across apps or brands
- Configuring global platform defaults (push, email, multi-language)
- Managing API credentials, IP allowlists, or SDK identifiers
- Diagnosing delivery issues via activity logs or event logs
- Controlling who can access what through user management and internal groups
- Monitoring data consumption and billing thresholds
- Applying tags or brand guidelines across campaigns and Canvases

---

## Scope

This skill synthesizes the following topic areas:

| Topic | What It Covers |
|---|---|
| **Workspaces** | Grouping related apps into shared environments; when to split vs. consolidate |
| **App Settings Overview** | Per-app configuration within a workspace |
| **Company Settings** | Admin-level global settings affecting all Braze users in the account |
| **API Settings** | REST API key creation, IP allowlisting, SDK app identifiers |
| **Manage Braze Users** | Inviting users, assigning roles, controlling dashboard access |
| **Internal Groups** | Test user groups for SDK/API debugging; up to 1,000 users per group |
| **Push Settings** | Global push defaults, TTL (Time to Live) configuration |
| **Email Settings** | Outbound sender configuration, reply-to addresses, email preferences |
| **Multi-Language Settings** | Locale configuration for translation tag delivery |
| **Messaging Rate Limits** | Global send-rate caps to protect deliverability and infrastructure |
| **Tags** | Organizing and filtering campaigns, Canvases, and segments; status labels |
| **Brand Guidelines** | Global visual and content constraints applied across messaging |
| **Subscription and Usage** | Billing page; monitoring data consumption across workspaces and sources |
| **Message Activity Log** | Diagnostic log for push, email, webhook, and API send errors |
| **Event User Log** | SDK/API error log per user; 30-day retention; used for debugging |
| **Exports Log** | Tracking and monitoring the status of dashboard export jobs |

---

## Lens: Structural and Operational Governance

This skill approaches Braze configuration through the lens of **organizational design and operational control**:

- **Workspace architecture** — how to group apps to reflect business structure while keeping data and permissions clean
- **Platform defaults** — which global settings cascade across all campaigns vs. which require per-message configuration
- **Access control** — how user roles, API key scopes, and internal groups limit blast radius and enable safe testing
- **Observability** — how to use the Message Activity Log, Event User Log, and Exports Log to diagnose delivery failures without needing engineering escalation
- **Compliance readiness** — IP allowlisting, rate limits, and audit trails that matter for security reviews

When a user asks about "why messages aren't sending," route through the diagnostic tools here. When they ask about "how to set up a new region or brand," route through workspace and company settings.

---

## Key Decisions This Skill Informs

**Workspace design:** Separate workspaces by brand or region when data isolation or separate billing is required. Group iOS/Android/web for the same product into one workspace — they share user profiles and segments.

**API key scoping:** Create one key per integration with the minimum required permissions. Enable IP allowlisting for production keys. Rotate keys rather than sharing them across environments.

**Rate limits:** Global messaging rate limits protect infrastructure and sender reputation. They apply across all campaigns — verify limits before high-volume sends or during peak periods.

**User access:** Braze user roles control what dashboard users can view and edit. Internal groups are distinct — they're for test device/user management, not access control.

**Diagnostics workflow:** Start with Message Activity Log for delivery errors → drill into Event User Log for SDK-level errors → check Exports Log if a data export job is missing.
