---
name: contributing-your-first-contribution
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/your_first_contribution'
indexed_at: '2026-04-05'
keywords:
  - GitHub
  - contribution
  - pull request
  - documentation
  - Markdown
  - Git
  - branch
  - commit
  - fork
  - develop
triggers:
  - how to contribute to Braze Docs
  - making my first pull request
  - getting started with documentation contributions
  - setting up local environment for editing docs
  - creating a documentation branch
---
## Your First Contribution to Braze Docs

Braze Docs uses a docs-as-code workflow. Contributions happen via GitHub using either the web interface or a local environment.

---

### Contribution Methods

| Method | Use Case | Requirements |
|--------|----------|--------------|
| GitHub website | Small, single-document changes | None — ready immediately |
| Local environment | Complex or multi-document changes | Must set up local environment first |

---

### GitHub Website Method

1. Navigate to `github.com/braze-inc/braze-docs`
2. Open `_docs/` — URL structure mirrors the directory structure
   - Example: `braze.com/contributing/home` → `_docs/_contributing/home.md`
3. Click **Edit this file**, make changes using Markdown
4. Click **Commit changes**
5. Select **"Create a new branch for this commit and start a pull request"** (not commit to main)
6. Click **Propose changes**
7. Click **compare across forks**
8. Set base repository to `braze-inc/braze-docs`
9. Click **Create pull request**

> If `braze-inc/braze-docs` is missing from base branches, there's a fork origin issue — see Troubleshooting.

---

### Local Environment Method

#### Setup

```bash
cd ~/PATH_TO_REPOSITORY   # e.g., cd ~/braze/braze-docs
pwd
git status
```

#### Create a working branch

```bash
git checkout develop
git pull
git checkout -b BRANCH_NAME   # e.g., fixing-typo-in-metadata
```

#### Edit and stage changes

Edit files using Markdown, then check status:

```bash
git status
# Shows modified files, e.g.:
#   modified: _docs/_home/metadata.md
```

Stage changes:

```bash
git add --all              # Stage all changed files
# OR
git add PATH_TO_FILE       # Stage a specific file
```

Commit:

```bash
git commit -m "Short description of change"
```

---

### Key Facts

- The `develop` branch is the source of truth — always branch from it
- Branch names should be short, hyphen-separated descriptions (e.g., `fixing-typo-in-metadata`)
- `git status` after each step helps visualize the workflow
- File location follows URL path: `braze.com/section/page` → `_docs/_section/page.md`
