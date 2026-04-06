---
name: operator-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/operator/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - operator
  - troubleshooting
  - error
  - limit
  - connection
  - response
  - data
  - campaign
triggers:
  - operator not responding
  - troubleshoot operator errors
  - daily usage limit exceeded
  - operator data access
  - refresh operator panel
---
`★ Insight ─────────────────────────────────────`
Topic files serve as atomic knowledge units in Nick's two-layer hierarchy — they live inside `skills/{name}/references/` and are designed to be self-contained chunks that agents can retrieve independently. Keeping them dense and scannable (vs. prose-heavy) makes semantic search more precise at query time.
`─────────────────────────────────────────────────`

## BrazeAI Operator Troubleshooting

### Common Issues & Fixes

| Issue | Action |
|-------|--------|
| No response | Refresh the page and re-open the Operator panel. |
| Off-topic answers | Reframe the question more specifically; name the feature or workflow. |
| Error / "Try again" prompt | Operator is temporarily unavailable or connection was interrupted. Retry after a few minutes. |
| Daily usage limit exceeded | Company-wide limit reached. Wait up to 24 hours for reset. |

### Limitations

**Data access**
- Can read the active page's contents (except inside drag-and-drop editors).
- Can look up company-specific data: past campaigns, catalogs, custom attributes.
- Cannot generate new reports or run reporting queries.

**Usage limits**
- Company-wide daily cap; resets every 24 hours.
- When reached, a "Daily usage limit exceeded" banner appears in chat and blocks further requests until reset.
