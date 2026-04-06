---
name: administrative-app_settings-exports_log
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/exports_log
indexed_at: '2026-04-05'
keywords:
  - exports
  - segments
  - status
  - jobs
  - pending
  - cancel
  - tracking
  - audit
  - logs
triggers:
  - cancel export
  - share export log
  - track exports
  - view export status
  - pending exports
---
No specific skill applies here — this is a straightforward documentation transformation task.

---

## Exports Log

The Exports Log (`Settings` > `Exports Log`) tracks the status of export jobs. Currently supports **segment exports only**.

### What you can view

- Exported segment name
- Export status
- Export source
- Start and finish timestamps

### Cancel a pending export

Two ways to cancel from the **Exports Log** page:

1. Select the <kbd>⋮</kbd> menu next to the export → **Cancel Export**
2. Select the **Export ID** → **Cancel Export** on the export's detail page

Only *pending* exports can be cancelled; completed exports cannot be undone.

### Share an export log

Select the **Export ID** → **Share Log** to get a shareable link to that specific export's page.

### Related

- Segment CSV exports: use the segment export tool to generate the exports that appear here.

`★ Insight ─────────────────────────────────────`
- The Exports Log is read-only audit infrastructure — it surfaces export jobs initiated elsewhere (e.g., via the segment export tool), rather than being a trigger for new exports itself.
- The two cancel paths (ellipsis menu vs. Export ID detail page) offer the same action at different granularities: list-level quick action vs. detail-page confirmation flow — a common UX pattern for destructive operations.
`─────────────────────────────────────────────────`
