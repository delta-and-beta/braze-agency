---
name: engagement-tools-segments-regex
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/regex
indexed_at: '2026-04-05'
keywords:
  - regex
  - segmentation
  - patterns
  - filtering
  - modifiers
  - email
  - domain
  - numeric
  - matching
  - attributes
triggers:
  - how to use regex in braze segments
  - filter by email domain with regex
  - match numeric values with regex
  - test regex patterns
  - case-insensitive matching in segments
---
# Regex in Segments

Regular expressions (regex) define search patterns used in Braze segmentation and campaign filtering for flexible string matching.

## Modifiers by Context

| Context | Modifier | Behavior |
|---|---|---|
| Segmentation & filters | `/gi` | Case-insensitive, matches all occurrences |
| Custom event trigger properties & trigger filters | `/g` | Case-sensitive |

For case-insensitivity in custom event triggers, use `(?i)` inline:
```
Matches regex (?i)STOP(?-i)
```
This catches "stop", "STOP", "please stop", etc.

## Filter Behavior

- **`does not match regex`** — blank values are **excluded** (user is NOT included if value is blank)

## Common Patterns

### Email address (any valid inbox)
```
[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.-]+
```
- `[a-zA-Z0-9.+_-]+` — local part (before `@`)
- `[a-zA-Z0-9.-]+` — domain name
- `[a-zA-Z.-]+` — TLD

### Filter by email domain
Use `matches regex` with `@braze.com` (or any domain suffix).

### Filter numeric string ≥ x
```
^([x-y]|\d{z,})$
```
`x-y` = first-digit range, `z` = digits in x + 1. Example for ≥ 50:
```
^([5-9][0-9]|\d{3,})$
```

### Filter numeric string ≤ x
```
^([x-y]|[a-b])$
```
`x-y` = first-digit range, `a-b` = lower bound range. Example for ≤ 50:
```
^([5-9][0-9]|[0-4][0-9])$
```

### Filter custom attribute starting with string
Use `^` (caret) to anchor the start. Example — cities starting with "San":
```
^San \w
```
Matches: San Francisco, San Diego, San Jose, etc.

### Phone numbers
Must be in E.164 format before filtering.

## Testing Regex
Use [Regex101](https://regex101.com/) to test patterns. Braze's segmentation applies `/gi`; custom event triggers apply `/g`.
