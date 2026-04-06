---
name: contributing-git-and-github
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/git_and_github'
indexed_at: '2026-04-05'
keywords:
  - git
  - github
  - branch
  - commit
  - push
  - pull
  - fork
  - review
  - pr
  - merge
triggers:
  - create a pull request
  - push changes to remote
  - request code review
  - create a branch
  - update from develop
---
## Git and GitHub Workflow

### Get Latest Changes

```bash
git checkout develop
git pull
```

### Create a Branch

```bash
git checkout -b BRANCH_NAME
```

Use a short, non-space-separated description (e.g., `fixing-typo-in-metadata`).

### Create a Pull Request

Stage and commit your changes:

```bash
git add --all
git commit -m "COMMIT_MESSAGE"
```

Push to the remote — use `upstream` for forked repos (external contributors), `origin` for cloned repos (internal contributors):

```bash
git push -u upstream BRANCH_NAME   # forked
git push -u origin BRANCH_NAME     # cloned
```

Then go to the Braze Docs GitHub repository and select **Compare & pull request**. Fill out the PR description using the Markdown comment prompts provided. Submit as a **Draft pull request** until ready.

### Allow Maintainer Edits

On your PR, check **Allow edits and access to secrets from maintainers** so the Docs team can make style/formatting fixes.

### Request a Review

1. Select **Ready for review** on your PR.
2. Under **Reviewers**, add `braze-inc/docs-team`.
3. Press `Esc` to confirm.

If changes are requested, you'll be notified via your GitHub notification settings. Approved PRs are deployed the following **Tuesday or Thursday**.
