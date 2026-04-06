---
name: data-unification
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data'
indexed_at: '2026-04-05'
keywords:
  - sessions
  - limits
  - blocks
  - dummy
  - integration
  - SDK
  - policy
  - accounts
  - events
  - bans
triggers:
  - user exceeds session limits
  - resolve blocked dummy users
  - contact account manager for block removal
---
# Data Unification Overview

## User Session Limits

Braze automatically bans or blocks users (referred to as "dummy users") who exceed **5 million sessions** and have no further SDK events ingested. This policy exists because such accounts are typically the result of misintegration rather than legitimate usage.

**If a legitimate user is affected:** Contact your Braze account manager to resolve the block.
