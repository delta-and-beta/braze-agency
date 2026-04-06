---
name: engagement-tools-segments-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - segments
  - campaign
  - filters
  - complexity
  - csv
  - regex
  - analytics
  - audience
  - troubleshooting
  - canvas
triggers:
  - how to resolve segment complexity errors
  - convert regex filters to CSV
  - fix campaign audience targeting issues
  - troubleshoot segment filtering problems
  - understand filter byte limits
---
## Segment Troubleshooting

### Error: Target Audience Too Complex to Launch

Triggered when a campaign/Canvas audience exceeds Braze's query character threshold. Filters in segments are translated into database queries — the character count of these queries is not 1:1 with dashboard-visible characters.

**What counts toward the limit:**
- All filters across all referenced segments
- Additional filters added directly in the Target Audience step
- Filter values (e.g., 30,000 zip codes, long regex strings)

**How to resolve:**
- Remove redundant filters that appear across multiple segments
- Remove references to outdated data (e.g., filters referencing stopped Canvases)
- Convert regex-based ID/email lists to a CSV import → becomes a single efficient CSV filter
- Use a CDI segment to pull the group directly from your data warehouse

> **Note:** Character limits were enforced starting April 2025. Campaigns/Canvases created before April 2025 are exempt and may continue to exceed the limit — but editing or cloning an exempt item removes the exemption.

---

### Banner: X Active/Stopped Campaigns Exceed Complexity Threshold

Appears at the top of campaign/Canvas lists. Click the banner to filter to affected items, then apply the steps above.

---

### Error: Filter Exceeds 10,000 Bytes

Individual segment filters are capped at **10,000 bytes** (~10,000 English chars or ~3,333 Japanese chars). Most common with regex filters targeting lists of user IDs or email addresses.

**To convert regex filters to CSV:**
1. Export users from the affected segment or regex filter
2. Clean the CSV — keep Braze ID or Appboy ID; remove unneeded columns and stale users
3. Re-import the CSV — Braze groups users into a single efficient CSV-based filter

---

### User No Longer in a Segment

User data changes due to their own activity or interactions with other campaigns/Canvases. If re-eligibility is enabled, the user profile reflects the latest received campaign data.

---

### App Filter Returns Users of Other Apps

**Apps Used** filters return users who have *at least* that app — not users who *exclusively* have that app.

---

### Filter Options Changed

Filter options are tied to the **data type** Braze recognizes for a custom attribute. If options changed, data is being sent in a different format than before.

- Check current recognized type: **Data Settings > Custom Attributes**
- Changing a custom attribute's data type in the dashboard will **reject** data sent in the old format
- See [custom attribute data types] for type-specific filtering options

---

### Analytics Mismatch: Messages Sent / Unique Recipients vs. Segment Count

When `Has received message from campaign X` segment count doesn't match Campaign Analytics:

| Cause | Explanation |
|---|---|
| Users archived/deleted post-send | *Unique Recipients* is an incremented counter; segment counts only existing users |
| Re-eligibility enabled | Users can receive the campaign multiple times; *Unique Daily Recipients* counts the same user multiple times across days |
