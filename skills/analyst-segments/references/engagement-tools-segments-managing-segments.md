---
name: engagement-tools-segments-managing-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/managing_segments
indexed_at: '2026-04-05'
keywords:
  - segments
  - filtering
  - archive
  - campaigns
  - canvases
  - tracking
  - messaging
  - audience
  - bulk
  - starred
triggers:
  - how to filter segments
  - how to archive a segment
  - how to search for segments
  - how to duplicate segments
  - where are segments being used
---
## Managing Segments

The Segments section provides a list view for creating, editing, and organizing segments.

### Filtering and View Options

**Status filter:** Narrow list to active or archived segments (non-archived = active).

**Available filters:**
- Last Edited By / Last Edited (time range)
- Estimated Size (approximate user count range)
- Tags / Teams
- Advanced Tracking Segments Only — shows only segments with Analytics Tracking enabled

**Available columns:**
- Filters count, Last edited / Last edited by
- Tags, Teams, Estimated size
- Canvases count, Campaigns count

**Starred segments:** Use "Show Starred Only" to filter to your starred segments.

> Note: View settings (filters, columns) reset to defaults when you leave and return to the Segments section.

### Segment Actions

Hover over a segment and select the menu icon to access:
- **Edit** — modify segment filters
- **Duplicate** — create a copy
- **Archive** — archives the segment and any campaigns/Canvases using it
- **Add to starred** — bookmark for quick access

**Bulk actions:** Check multiple segment checkboxes to bulk archive or bulk tag.

### Messaging Use

Navigate to a segment's **Messaging Use** tab to see where it's referenced (other segments, campaigns, Canvases).

> Segments using the **Segment Membership** filter cannot be referenced by other segments (prevents reference loops).

### Changes Since Last Viewed

The **Changes Since Last Viewed** metric on the segment overview page tracks edits by other team members. Selecting it opens a changelog showing: what changed (name, description, target audience), who made the change, and when. Use this for auditing.

### Searching

Enter terms in the search field. Search is term-based by default — `test segment 1` matches any segment containing "test", "segment", or "1" anywhere in the name.

Use quotes for exact phrase matching: `"test segment 1"` returns only segments containing that exact phrase.

**Finding segment references in Canvases:** Use the **Target segment** filter on the Canvas page to find Canvas Audience segments. For all references across segments/campaigns/Canvases, use a segment's Messaging Use section.
