---
name: engineer-canvas-flows
description: >-
  Building, managing, and maintaining Canvas flows including drafts, versioning,
  and post-launch changes.
metadata:
  role: braze-engineer
  topics:
    - canvas-managing-cloning-canvases
    - canvas-managing-change-your-canvas-after-launch
    - canvas-managing-canvas-version-history
    - canvas-managing-canvas-drafts
    - canvas-ideas-launching-canvas-flow
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill's CSO principle applies here: this skill file needs to be optimized for *discovery* (will Claude recognize when to load it?) and *application* (will it guide the right behavior?). Since it's a domain reference skill, keywords like "Canvas Flow", "version history", "draft" matter more than discipline enforcement.
- The user explicitly overrides the frontmatter requirement — user instructions take precedence over skill guidelines.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# Canvas Flow Management

## Overview

This skill covers the full lifecycle of a Braze Canvas built with **Canvas Flow** — from initial construction and pre-launch testing through post-launch edits, versioning, and draft management. Use this skill when implementing, modifying, or maintaining any Canvas Flow in Braze.

> **Scope:** Canvas Flow only. The original Canvas experience is deprecated and cannot be used to create or duplicate Canvases. All new Canvases must use Canvas Flow.

---

## When to Use This Skill

Use this skill when you need to:

- Prepare and launch a new Canvas Flow
- Clone an existing Canvas (including migrating from original Canvas to Canvas Flow)
- Edit a live Canvas after it has been launched
- Save or publish a draft of an in-progress Canvas
- Review or restore a previous version of a Canvas using version history

---

## Lens: Implementation

This skill approaches Canvas management from an **implementation perspective** — the concrete steps, constraints, and workflows a Braze engineer uses to build, clone, version, and manage Canvas Flows. It does not cover campaign strategy or content design.

---

## Topics This Skill Synthesizes

### 1. Launching Canvas Flow

Pre-launch preparation for a Canvas Flow covers:

- Identifying **launch checkpoints** — verifying entry criteria, audience filters, and step connections before going live
- Running **test sends** or preview modes to validate message content and branching logic
- Understanding the distinction between *saving* a Canvas and *launching* it (launched Canvases immediately begin processing users)

**Key constraint:** Once launched, a Canvas begins evaluating users immediately. Pre-launch checks cannot be undone after the first user enters.

---

### 2. Cloning Canvases to Canvas Flow

When duplicating or migrating Canvases:

- Use the **Clone to Canvas Flow** action to create an editable copy of any Canvas — including those originally built in the legacy experience
- Cloned Canvases are created as **drafts** and must be relaunched independently
- Cloning does not transfer analytics from the original; the clone starts fresh

**Key constraint:** You can no longer create or duplicate Canvases using the original Canvas experience. Always clone into Canvas Flow.

---

### 3. Post-Launch Canvas Changes

Editing an active Canvas after launch:

- You can **insert new steps** into an existing flow without stopping the Canvas
- Some fields (e.g., entry schedule, audience re-eligibility) may be editable directly; others require creating a draft
- Changes to an active Canvas take effect immediately for users who have not yet reached that step — users already in-progress are unaffected until they reach the modified step

**Recommended practice:** Use drafts (see below) for significant structural changes to avoid unintended behavior on live users.

---

### 4. Canvas Version History

Canvas version history allows you to:

- **View analytics** tied to any specific previously launched version
- **Inspect the user journey** (step configuration, branching) as it existed at a prior point in time
- **Reference past configurations** for debugging or compliance review

Version history is read-only. You cannot roll back a live Canvas to a previous version; you can only view what the prior version looked like.

---

### 5. Canvas Drafts

Draft management for active Canvases:

- While a Canvas is live, you can create a **draft** of it to stage upcoming changes
- Only **one draft** can exist per Canvas at a time
- Drafts do not affect the running Canvas — users continue through the live version until the draft is launched
- Launching a draft replaces the current live version and creates a new entry in version history

**Key workflow:**
1. Open active Canvas → Create draft
2. Make edits within the draft
3. Test/review draft changes
4. Launch draft → becomes the new live version

---

## Quick Reference

| Task | Approach |
|------|----------|
| Launch a new Canvas | Complete pre-launch checklist, verify steps and filters, then launch |
| Duplicate a Canvas | Clone to Canvas Flow → opens as a draft |
| Edit a live Canvas safely | Create a draft → edit → test → launch draft |
| Make minor live edits | Edit directly in the active Canvas (no draft required for small changes) |
| Review a past configuration | Open Canvas → Version History → select version |
| Restore a past version | Not directly possible; must manually re-create from version history view |

---

## Common Mistakes

- **Editing live without a draft** for structural changes — can cause unexpected behavior for in-flight users
- **Assuming clone inherits analytics** — clones start with zero data
- **Forgetting to launch a draft** — a saved draft does not go live until explicitly launched
- **Using original Canvas experience** — no longer supported for new Canvases; always use Canvas Flow
