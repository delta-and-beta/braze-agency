---
name: data-unification-user_data-delete_users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/delete_users
indexed_at: '2026-04-05'
keywords:
  - delete
  - deletion
  - users
  - segment
  - profiles
  - audience
  - compliance
  - pending
  - cancellation
triggers:
  - delete users
  - cancel deletion
  - deletion status
  - bulk delete
  - segment deletion
---
## Delete Users

User deletion lets you remove profiles no longer needed, created in error, or required for compliance (GDPR, CCPA). Feature is in early access.

### Permissions Required

| Permission | Description |
|------------|-------------|
| Delete Users | Permanently delete users individually or in bulk |
| View User Deletion Records | View user deletion records |

### Constraints

| Constraint | Details |
|------------|---------|
| Max segment size | 100 million user profiles per deletion |
| Waiting period | 7 days before segment deletion processes |
| Concurrency | Only one segment deletion at a time (including the 7-day wait) |
| Individual deletion | Permanent — cannot be recovered |

### Delete an Individual User

1. Go to **Audience** > **Search Users**
2. Search for and select the user
3. On their profile, select **⋮ Show options** > **Delete User**

Deletion completes within a few minutes.

### Delete a Segment of Users

1. Create a segment containing the profiles to delete
2. Go to **Audience** > **Manage Audience** > **Delete Users** tab
3. Select **Delete users**, choose the segment, then **Next**
4. Type `DELETE` to confirm, then select **Delete users**

Users are **not deleted immediately** — they enter a 7-day pending period. Braze emails you when deletion completes.

A **Pending Deletion** segment filter is automatically created so you can:
- See exact users tied to a specific deletion run
- Exclude them from campaigns during the waiting period
- Export the list for compliance/record-keeping

### Confirm a Segment Deletion

Braze sends a confirmation email with the profile count. Log in to confirm within the email's time frame — otherwise the request expires.

### Cancel a Segment Deletion

You have 7 days to cancel. Any users already deleted before cancellation cannot be restored.

1. Go to **Audience** > **Manage Audience** > **Delete Users** tab
2. Select the eye icon next to a pending deletion
3. Select **Cancel deletion**

### Check Deletion Status

**Manage Audience page** (`Audience > Manage Audience > Delete Users`):

| Field | Description |
|-------|-------------|
| Request Date | Date request was made; use with Pending Deletion filter |
| Requester | User who initiated the request |
| Segment Name | Segment used to select users |
| Status | Pending / In Progress / Complete |

**Segment filters**: Use the auto-created **Pending Deletion** filter for exact user lists.

**Security event report**: Download from **Security settings** for historical deletion records.

### Key Limits

- Segment deletions cannot exceed 100 million profiles
- Only one segment deletion job runs at a time
- Individual deletions are immediate and irreversible
- Segment deletions have a mandatory 7-day cancellation window before processing
