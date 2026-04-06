---
name: contributing-bdocs
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/bdocs'
indexed_at: '2026-04-05'
keywords:
  - bdocs
  - links
  - redirects
  - deployment
  - markdown
  - braze-docs
  - references
  - syntax
triggers:
  - generate deployment PR
  - transform reference links
  - find broken links
  - create redirects
  - update documentation links
---
# bdocs — Braze Docs CLI Wrapper

`bdocs` is a shell script located at the root of the Braze Docs repository. It wraps common documentation maintenance tasks: link management, redirect generation, deployment descriptions, and syntax inspection.

## Basic Usage

```bash
./bdocs COMMAND
```

Pipe output to clipboard on macOS:

```bash
./bdocs COMMAND | pbcopy
```

## Commands

| Command | Purpose |
|---------|---------|
| `deploy` | Generate weekly deployment PR description (develop → main diff) |
| `release` | Generate monthly release PR description (main since last release) |
| `tlinks` | Transform reference-style links to inline links |
| `rlinks` | Remove unused reference links from bottom of file |
| `ulinks` | Update outdated links using latest redirect targets |
| `mredirects` | Create redirects for all renamed files in current branch |
| `fblinks` | Find broken links across the docs site |
| `lredirects` | Test new redirects by listing old URLs in current branch |
| `syntax` | Print all unique Markdown syntax supported by Braze Docs |
| `help` | Display help message |

---

### `deploy`

Compares PRs merged into `develop` but not `main`, outputs a Markdown list for the weekly deployment PR body.

```bash
$ ./bdocs deploy

- [#6980](https://github.com/braze-inc/braze-docs/pull/6980) - Update index.md
- [#6981](https://github.com/braze-inc/braze-docs/pull/6981) - Update ab_test_projection.md
```

---

### `release`

Compares PRs merged into `main` since the last release, grouped by deploy date.

```bash
$ ./bdocs release

## Deploy - September 17, 2024

- https://github.com/braze-inc/braze-docs/pull/8104 - Deploy - September 17, 2024
- https://github.com/braze-inc/braze-docs/pull/8039 - Add Trending item recommendations
```

---

### `tlinks`

Transforms reference-style links to inline links. Accepts a single file or directory. Automatically runs `rlinks` afterward.

```bash
./bdocs tlinks _docs/_user_guide/onboarding_faq.md
```

**Before:**
```markdown
[create your SSH token][2]

[2]: {{site.baseurl}}/developer_guide/platform_wide/sdk_authentication/
```

**After:**
```markdown
[create your SSH token]({{site.baseurl}}/developer_guide/authentication/)
```

> Note: Reference-style links are unsupported inside Liquid `{% tab %}` tags — use `tlinks` to fix these.

---

### `rlinks`

Removes unused reference link definitions from the bottom of Markdown files. Accepts a file or directory.

```bash
./bdocs rlinks _docs/_user_guide/onboarding_faq.md
```

**Before:**
```markdown
[create your SSH token]({{site.baseurl}}/developer_guide/authentication/)

[2]: {{site.baseurl}}/developer_guide/platform_wide/sdk_authentication/
```

**After:**
```markdown
[create your SSH token]({{site.baseurl}}/developer_guide/authentication/)
```

---

### `ulinks`

Updates outdated `{{site.baseurl}}` links by following redirect chains to their final destination. Uses `broken_redirect_list.js` as the redirect source of truth.

```bash
$ ./bdocs ulinks _docs/_developer_guide/content_cards/creating_custom_content_cards.md
Made 1 replacements in _docs/_developer_guide/content_cards/creating_custom_content_cards.md
```

**Before:**
```markdown
[log analytics]({{site.baseurl}}/developer_guides/android/content_cards/logging_analytics/)
```

**After:**
```markdown
[log analytics]({{site.baseurl}}/developer_guides/content_cards/analytics/)
```

**Why update old links:** Redirects in `broken_redirect_list.js` are intended for external traffic (Stack Overflow, Braze Blog, bookmarks) — not for internal doc-to-doc links. Internal links should always point to current URLs directly.

`★ Insight ─────────────────────────────────────`
- The `tlinks` → `rlinks` auto-chaining pattern is a good example of command composition: running `tlinks` always leaves a clean state by invoking `rlinks` implicitly, reducing the chance of dangling reference definitions.
- The redirect chain resolution in `ulinks` (one → two → three becomes one → three) is a transitive closure walk — worth noting as a non-obvious behavior that prevents accumulating multi-hop redirects.
`─────────────────────────────────────────────────`
