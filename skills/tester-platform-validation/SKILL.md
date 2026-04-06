---
name: tester-platform-validation
description: >-
  Diagnoses platform access issues, validates message activity logs, and
  resolves export and delivery problems.
metadata:
  role: braze-tester
  topics:
    - administrative-access_braze-troubleshooting
    - administrative-access_braze-support
    - administrative-access_braze-portal
    - administrative-access_braze-language
    - administrative-app_settings-message_activity_log_tab
    - administrative-app_settings-event_user_log_tab
    - data-distribution-export_braze_data-export_troubleshooting
    - data-distribution-export_braze_data-faqs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files for Claude Code plugins serve as **semantic routing signals** — the description and keyword density determine whether the skill gets loaded at all. Writing skills is closer to writing good search index entries than writing docs.
`─────────────────────────────────────────────────`

# Platform Troubleshooting

## Overview

This skill covers systematic diagnosis and resolution of Braze platform issues — from account access failures and export problems to message delivery errors and dashboard configuration. Use it when a user reports they cannot access the platform, an export is missing or expired, messages aren't appearing in logs, or they need to escalate to Braze Support.

**Core principle:** Work from the outermost access layer inward — confirm the user can log in before diagnosing message delivery, and confirm delivery before diagnosing export behavior.

## When to Use

Use this skill when:
- A user is locked out or receives an unexpected error on login
- An export file is missing, expired, or not appearing in S3
- A campaign or API send has no entries in the Message Activity Log
- SDK or API calls are producing errors visible in the Event User Log
- A user needs to change their dashboard language
- A user wants to submit product feedback or view the Braze roadmap
- Escalation to Braze Support is needed

**Do not use** for campaign logic errors, audience segmentation issues, or SDK integration bugs — those fall under delivery and integration troubleshooting skills.

---

## Access Troubleshooting

### Locked Out of Account

Identify lockout type from the error message shown:

| Error Type | First Step |
|---|---|
| **Password error** | Verify the correct Braze dashboard instance URL; reset password if confirmed correct |
| **SSO/SAML error** | Contact your company's IT/identity team — Braze cannot reset SSO credentials |
| **MFA error** | Use backup codes or contact your Braze admin to reset MFA |
| **Account disabled** | Contact your Braze admin — only admins can re-enable accounts |

> Ask the user to confirm which dashboard instance they're using (e.g., `dashboard-01.braze.com` vs `dashboard-03.braze.eu`). Instance mismatch is a common password-error false alarm.

---

## Diagnostic Logs

### Message Activity Log

**Location:** Settings > Message Activity Log

Use for: Errors and delivery status from campaigns and API sends.

**Filterable error types:**
- Push notification errors
- Email delivery errors
- Webhook failures
- API message errors

**Triage steps:**
1. Filter by the campaign or API send identifier
2. Check the error code and description
3. Cross-reference with send time to confirm the log window covers the send

> Logs are near real-time but may have a short delay. If no entries appear immediately after a send, wait 2–5 minutes before concluding delivery failed.

---

### Event User Log

**Location:** Settings > Event User Log

Use for: SDK and API call errors, with raw event data for deep inspection.

**Log retention:** 30 days — entries older than 30 days are not recoverable.

**Filterable dimensions:**
- Event type (SDK call, API call, custom event)
- Associated app
- Timestamp
- Raw data payload

**Triage steps:**
1. Filter by user identifier and time range
2. Examine the raw data field for malformed payloads or missing required fields
3. Note the event type to determine whether the issue is SDK-side or API-side

---

## Export Troubleshooting

### S3 Behavior (With Storage Partner Credentials)

If S3 credentials are configured in Braze:
- **All** exports route to your S3 bucket — selective routing is not supported
- Files are persistent (no expiration)
- Verify the export completed by checking the bucket directly; Braze does not send email links when S3 is configured

### Default Braze S3 Bucket (No Storage Partner)

Files are **temporary and expire after 4 hours**.

| Export Type | Delivery Method |
|---|---|
| CSV | Braze emails a download link (ZIP of multiple smaller files) |
| JSON/Other | Available via dashboard download until expiration |

**If a user reports a missing export:**
1. Check whether 4 hours have elapsed — if so, re-run the export
2. Confirm S3 credentials are or are not configured (determines where to look)
3. Check spam/junk for the download email if no S3 is configured

---

## Dashboard Language

**Location:** Globe icon (`fa-globe`) in the global header

**Steps:**
1. Select the globe icon in the global header
2. Choose the desired language from the dropdown
3. Changes apply immediately — no page reload required

> Language setting is per-user and does not affect other users in the same workspace.

---

## Braze Support & Portal

### Accessing Support

**Location:** Support > Get help in the Braze dashboard

Access level depends on the user's permissions and designated contact status:
- **Designated contacts** reach the Braze Support portal directly
- **Non-designated users** are routed to internal contacts or self-service resources

When escalating to Braze Support, collect:
- Dashboard instance URL
- Affected campaign/canvas ID or API endpoint
- Timestamps of the issue
- Relevant error codes from Message Activity Log or Event User Log
- Steps already taken

### Braze Product Portal

**Location:** Community > Product Roadmap in the dashboard

Use for: Viewing the product roadmap and submitting feature ideas.

Portal sections typically include upcoming features, features in development, and a submission form for new ideas. Point users here when they have feature requests rather than support issues.

---

## Systematic Triage Checklist

Use this sequence to avoid diagnosing the wrong layer:

```
1. Can the user log in?
   └─ No → Access Troubleshooting
   └─ Yes ↓

2. Did the message send?
   └─ Check Message Activity Log for errors
   └─ No entries → check send configuration, not delivery

3. Did the SDK/API call register?
   └─ Check Event User Log for the user + time range

4. Is the export missing?
   └─ Check S3 config → check 4-hour expiry → re-run if needed

5. Is the issue unresolved?
   └─ Escalate via Support > Get help with full context collected above
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Looking in Message Activity Log before confirming the send executed | Check campaign/canvas send history first |
| Assuming S3 files are temporary when a storage integration is configured | Confirm whether S3 credentials exist in Settings |
| Advising a password reset for an SSO lockout | SSO credentials are managed outside Braze — escalate to IT |
| Searching Event User Log beyond 30 days | Logs do not exist past 30 days; acknowledge data is gone |
| Sending users to Support before collecting diagnostic context | Always capture timestamps, IDs, and error codes first |
