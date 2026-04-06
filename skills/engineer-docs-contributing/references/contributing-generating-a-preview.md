---
name: contributing-generating-a-preview
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/generating_a_preview'
indexed_at: '2026-04-05'
keywords:
  - preview
  - local
  - server
  - branch
  - rake
  - development
  - languages
  - api
  - build
  - restart
triggers:
  - generate local preview
  - start local server
  - preview documentation locally
  - set up local development
  - restart development server
---
## Generating a Local Site Preview

### Prerequisites
Assumes `braze-docs` repo is cloned and dependencies installed.

### Steps

**1. Checkout a branch**
```bash
git checkout BRANCH_NAME
# example:
git checkout BD-2346-fixing-typo-swift
```

**2. Start the local server** (from `braze-docs` directory)
```bash
# English (default)
rake

# Other languages
rake es    # Spanish
rake fr    # French
rake ja    # Japanese
rake ko    # Korean
rake pt_br # Portuguese (Brazil)

# With API rendering
MARKDOWN_API=true rake              # Renders {% markdown_embed %} tag content
PARTNER_API=true rake               # Renders tiles on partner landing pages
MARKDOWN_API=true PARTNER_API=true rake  # Both
```

Server starts at `http://127.0.0.1:4000` (Sinatra on port 4000).

**3. Open preview**
Navigate to `http://127.0.0.1:4000` in your browser.

**4. Stop the server**
Press `Control + C` in the terminal.

---

### Auto-Reload Behavior

Most file changes trigger automatic rebuild — refresh the browser (`Cmd+R` / `Ctrl+R`) to see updates.

**Requires manual server restart** when:
- A file or directory is **renamed**
- A new file or directory is **added**
- A file inside `_includes/` is **edited**

To restart: stop with `Ctrl+C`, then run `rake` again.
