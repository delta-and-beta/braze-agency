---
name: contributing-styling-examples
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/styling_examples'
indexed_at: '2026-04-05'
keywords:
  - headers
  - anchors
  - formatting
  - tables
  - markdown
  - styling
  - code
  - quotes
  - emphasis
  - strikethrough
triggers:
  - how to format headers
  - create custom anchors
  - style documentation
  - format tables
  - markdown syntax
---
`★ Insight ─────────────────────────────────────`
This content is a **style guide / demo page** — it contains duplicate content in paired "Styling" and "Markdown" tabs. The Markdown tab versions are the actionable references worth keeping. Lorem ipsum filler text, Jekyll template tags (`{% tabs %}`, `{% raw %}`), and CSS class annotations can be stripped as they're rendering artifacts, not doc content.
`─────────────────────────────────────────────────`

## Braze Docs Styling Reference

### Headers

Standard markdown heading levels H1–H6:

```markdown
# H1 Banner
## H2 Banner
### H3 Banner
#### H4 Banner
##### H5 Banner
###### H6 Banner
```

### Custom Header Anchors

Append `{#anchor-text}` to any heading to define a named anchor:

```markdown
# Heading Text {#anchor-text}
```

Link to it with a standard hash link:

```markdown
Here is my [link](#anchor-text)
```

Use lowercase letters and hyphens between words for anchor values.

### Text Formatting

```markdown
Normal Text
*Emphasize Text*
**Bold**
_**Bold Emphasize**_
~~Strikethrough~~
```

### Quotes and Code

Block quote:
```markdown
> Quoted Text
```

Inline code:
```markdown
Lorem ipsum ``sit amet, consectetur adipiscing elit``.
```

Code block (fenced):
````markdown
```
Lorem ipsum dolor sit amet...
```
````

### Tables

Standard markdown table syntax:

```markdown
| Instance | Dashboard URL                                                         | REST Endpoint                   |
|----------|-----------------------------------------------------------------------|---------------------------------|
| US-01    | `https://dashboard.braze.com` or<br> `https://dashboard-01.braze.com` | `https://rest.iad-01.braze.com` |
| EU-01    | `https://dashboard.braze.eu` or<br> `https://dashboard-01.braze.eu`   | `https://rest.fra-01.braze.eu`  |
| AU-01    | `https://dashboard.au-01.braze.com/`                                  | `https://rest.au-01.braze.com`  |
{: .reset-td-br-1 .reset-td-br-2 .reset-td-br-3 role="presentation"}
```

#### Resetting Table Word-Break by Column

To prevent long unbroken words from overflowing table cells, add the `reset-td-br-NUM` CSS classes after the table:

```markdown
{: .reset-td-br-1 .reset-td-br-2 .reset-td-br-3 .reset-td-br-4 role="presentation"}
```

- Replace `NUM` with the column number (1-indexed, max 4)
- Remove extra placeholders if your table has fewer than 4 columns
- Apply to every table — especially those with long code strings or unbreakable words in cells
