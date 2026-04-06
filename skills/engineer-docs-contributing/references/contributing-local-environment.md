---
name: contributing-local-environment
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/local_environment'
indexed_at: '2026-04-05'
keywords:
  - fork
  - clone
  - ruby
  - repository
  - ssh
  - dependencies
  - bundle
  - asdf
  - rbenv
  - development
triggers:
  - set up local environment
  - clone documentation repository
  - install dependencies
  - start development server
  - contribute to documentation
---
The `learn` skill doesn't apply here — this is a documentation transformation task.

---

## Local Environment Setup

**Prerequisites:** Fork the `braze-inc/braze-docs` repository on GitHub before starting.

### Required Software

| Type | Tool | Notes |
|------|------|-------|
| Ruby version manager | rbenv | Required; alternatives at ruby-lang.org/installation |
| Package manager | Homebrew | For installing CLI tools |
| Tool manager | asdf | For Node.js version switching |
| Terminal (Windows) | WSL | Required on Windows for Unix commands |
| Text editor | VS Code or IntelliJ IDEA | — |

**VS Code plugins:** Liquid + Jekyll Linter, Markdown Linter, Spellchecker  
**IntelliJ plugins:** Markdown, Grazie Lite (spellcheck)

---

### Step 1: Create SSH Key

Create an SSH key for your GitHub account. On WSL, follow the Linux instructions.

### Step 2: Clone Your Fork

```bash
cd ~
git clone git@github.com:YOUR-USERNAME/braze-docs.git
```

### Step 3: Add Upstream Remote

```bash
cd ~/braze-docs
git remote add upstream git@github.com:braze-inc/braze-docs.git
```

Verify:
```bash
git remote -v
# origin    git@github.com:YOUR-USERNAME/braze-docs.git (fetch/push)
# upstream  git@github.com:braze-inc/braze-docs.git (fetch/push)
```

### Step 4: Install Ruby 3.3.0

```bash
cd ~/braze-docs
ruby --version  # check current version
rbenv install 3.3.0  # if not installed
```

### Step 5: Install Dependencies

```bash
brew install asdf
bundle --version    # verify Bundler 2+
gem install bundler # upgrade if needed
bundle install && asdf install
```

### Step 6: Start Local Server

```bash
rake         # English (http://127.0.0.1:4000)
rake es      # Spanish
rake fr      # French
rake ja      # Japanese
rake ko      # Korean
rake pt_br   # Portuguese (Brazil)
```

Stop server: **Control+C** in terminal.
