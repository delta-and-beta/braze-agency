---
name: api-data-retention
source_url: 'https://braze-inc.github.io/braze-docs/_api/data_retention'
indexed_at: '2026-04-05'
keywords:
  - retention
  - deletion
  - profiles
  - archival
  - attributes
  - events
  - privacy
  - dormant
  - purge
  - compliance
triggers:
  - how long is data retained
  - delete user profile
  - GDPR erasure request
  - inactive user archival
  - data retention policy
---
`★ Insight ─────────────────────────────────────`
Topic files are atomic knowledge units — the goal is maximum signal density. Jekyll template syntax (`{{site.baseurl}}/...`) and Liquid tags (`{% alert note %}`) must be stripped since they're meaningless outside the source site. Retention periods scattered across sections are the real payload here — grouping them into a scannable table will make this far more useful as a reference.
`─────────────────────────────────────────────────`

# API Data Retention

## Default Retention

User profile data (attributes, custom attributes, custom events, purchases) is stored indefinitely for active users for the duration of the account contract.

## Customer-Managed Deletion

Customers can delete data directly via the Braze dashboard or API:

- **Delete entire user profile**: Use the Delete User API endpoint (`POST /users/delete`)
- **Delete or amend attributes**: Use the Track User API endpoint (`POST /users/track`) — set attribute values to null to clear them

**Limitation**: Behavioral events (custom events, sessions, campaigns, purchases) cannot be individually deleted from a profile. To remove them, you must delete the entire user profile.

For privacy/GDPR erasure requests, a single user may have multiple profiles — all must be deleted to fully erase their data.

## Automated Retention Policies (Braze-Managed)

| Storage Layer | Retention Period | Notes |
|---|---|---|
| Active user profiles | Indefinite | Until deleted by customer or account ends |
| Inactive/Dormant users | Archived weekly | Users with no reachable contact info and no recorded activity |
| Subprocessor transit data | Up to 90 days | Short-term, for recovery purposes |
| Data Lake (PII in event logs) | 2 years | Aggregate reporting database; separate from dashboard data |
| API-deleted data in Data Lake | Up to 3 weeks propagation | Deletion does not affect segmentation; ensures removal from all systems |
| Backup servers | 6 months after deletion | Then purged per internal processes |

## Inactive/Dormant User Archival

Braze runs a weekly process to archive users who are:
- Unreachable (no email, phone, push token, app usage, or web visits)
- Have no recorded activity on their profile
- Have not been messaged via Braze

Customers can prevent archival by recording a data point at regular intervals. Braze Canvas can automate this to effectively disable archival for specific user segments.

## Messaging Interaction Data

Campaign and Canvas interaction data (opens, receives, variant assignments) is retained for retargeting purposes. Availability windows vary by interaction type — consult the messaging interaction data availability documentation for specifics.

`★ Insight ─────────────────────────────────────`
Notice the three-tier retention structure: customer-controlled (API/dashboard), feature-level automated (archival, interaction data), and infrastructure-level (Data Lake, backup servers). The 3-week lag between API deletion and Data Lake propagation is a commonly surprising detail for compliance workflows — worth surfacing prominently in any reference doc.
`─────────────────────────────────────────────────`
