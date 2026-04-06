---
name: engagement-tools-segments-creating-a-segment
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/creating_a_segment
indexed_at: '2026-04-05'
keywords:
  - segment
  - filter
  - audience
  - behavioral
  - demographic
  - exclusion
  - operator
  - membership
  - reachable
  - targeting
triggers:
  - how to create a segment
  - setting up segment filters
  - excluding users from segments
  - combining filters with AND OR
  - configuring segment scope
---
## Creating a Segment

Segments target users by demographic, behavioral, or technical characteristics. They update in real-time and you can create as many as needed.

### Navigation
**Audience** > **Segments** > **Create Segment**

### Setup Steps

**1. Name your segment** — Use descriptive names (e.g., "Lapsed Users - 14 days"). Optionally add:
- Description (intent + notes for team members)
- Team assignment
- Tags for organization

**2. Choose app/platform scope**
- **Users from all apps** (default) — all users
- **Users from specific apps** — users with at least one session in specified apps
- **Users from no apps** — users with no sessions (typically imported via REST API)

**3. Add filters** — Combine as many filters as needed for specificity.

---

### Filter Groups

Every filter belongs to a filter group. A segment can have multiple filter groups.

- Filters within a group: joined by **AND** or **OR**
- Between groups: joined by **AND** or **OR**

**Examples:**
```
(A AND B AND C) OR (C AND E AND F)
(A OR B OR C) AND (C OR D OR F)
```

**OR** — includes users matching any one of the filters  
**AND** — excludes users who don't pass every filter

#### Avoid OR with negative filters on the same attribute

Do **not** use `OR` with two or more of these when referencing the same attribute:
- `not included`
- `is not`
- `does not equal`
- `does not match regex`

Doing so will match users with *any* value for that attribute (effectively everyone).

**Correct pattern for "foodies but not non-foodies AND not candy-lovers":**
Use `AND` operator — ensures users are in "foodies" and simultaneously not in either exclusion segment.

---

### Exclusion Groups

Optional groups that **always connect with AND NOT** to filter groups.

- Users matching exclusion criteria are removed from the segment even if they match filter criteria
- Excluded users don't count toward *Total reachable users*
- The *Estimated Reachable Users* stat in an exclusion group shows remaining users after exclusion

---

### Key Constraints

- **Segment Membership filter**: Segments using this filter cannot be nested into other segments (prevents circular references and performance issues). Recreate the nested segment's filters directly instead.
- **"is any of" operator**: Maximum 256 items per field
- **New users**: Braze only generates profiles after a user's first app open — you cannot target users who have never opened the app
