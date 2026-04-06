---
name: tester-quality
description: >-
  Validating content quality using AI-assisted QA and brand guideline
  compliance.
metadata:
  role: braze-tester
  topics:
    - generative-ai-content-qa
    - generative-ai-brand-guidelines
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skills differ from personal workflow skills: they're **knowledge synthesis artifacts** that tell an agent what it knows about a domain, not behavioral rules for the agent itself
- The `LENS` field acts as an interpretive frame — it narrows which aspect of each topic gets emphasized when the agent answers queries (e.g., "brand compliance before launch" vs. "creative brainstorming")
- Topic content fragments are the raw atomic units; the SKILL.md is the synthesis layer that gives them coherent structure for retrieval
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Content Quality Assurance

## Scope and Purpose

This skill covers the pre-send quality assurance process for AI-assisted content in Braze — validating that messages are accurate, on-brand, and compliant before they go live. It synthesizes Braze's Brand Guidelines configuration and the AI Content QA (BrazeAI) tooling into a single lens focused on **content correctness and brand compliance validation before launch**.

Use this skill when:
- Reviewing AI-generated copy for brand voice alignment
- Running pre-send checks on SMS, push, or in-app messages
- Diagnosing why AI Content QA flagged or passed a piece of content
- Configuring or updating Brand Guidelines to enforce tone and personality rules
- Advising on which channels support AI-assisted quality checks

## Topics Synthesized

### Brand Guidelines
Brand Guidelines in Braze's AI Copywriting Assistant allow teams to encode brand voice, tone, and personality constraints so that AI-generated copy stays consistent with organizational standards. Guidelines can be created from the message composer or via **Settings > Brand Guidelines**.

**Key validation considerations:**
- Are brand guidelines currently active and applied to the relevant campaign or canvas?
- Does the generated copy reflect the configured tone (e.g., formal, playful, authoritative)?
- Are prohibited terms, required phrases, or stylistic constraints being respected?
- When copy diverges from brand voice, check whether guidelines need updating or whether the AI prompt needs refinement

**Compliance before launch:** Brand Guidelines are not a post-publish audit tool — they are a pre-send configuration that shapes generation. If content feels off-brand at review time, the root cause is typically missing or under-specified guidelines, not a generation failure.

### AI Content QA (BrazeAI)

AI Content QA is a pre-send content quality check powered by BrazeAI. It is available for **SMS, Android push, iOS push, and traditional in-app messages only** — it does not apply to email, Content Cards, or webhook steps.

**What AI Content QA checks:**

| Check Area | What it validates |
|------------|-------------------|
| Clarity | Message is understandable and unambiguous |
| Grammar & spelling | No errors that reduce perceived quality |
| Tone alignment | Content matches configured brand tone |
| Actionability | Call-to-action is present and clear where expected |
| Channel fit | Copy length and formatting suit the delivery channel |

**Validation lens — before launch:**
- Run AI Content QA as a final gate before campaign activation
- A passing QA check indicates structural and tonal correctness; it does not guarantee conversion or engagement
- A flagged check should be treated as a blocker unless the team explicitly accepts the deviation with documented rationale
- QA results are advisory on unsupported channels — do not assume silent pass means implicit approval

## Perspective: Content Correctness and Brand Compliance Before Launch

This skill approaches all content questions from the perspective of a **pre-launch gatekeeper**, not a creative collaborator. The goal is to catch problems before they reach end users.

When evaluating content:
1. **Correctness first** — Is the message factually and grammatically sound? Does it say what was intended?
2. **Brand compliance second** — Does it match the voice, tone, and constraints defined in Brand Guidelines?
3. **Channel fit third** — Is it appropriate for the delivery surface (character limits, push norms, SMS regulations)?
4. **AI QA result last** — Use the BrazeAI check as a final confirmation, not the first filter

If any layer fails, the content should not launch until the issue is resolved or formally accepted.

## Common Failure Patterns

- **Brand Guidelines not applied**: AI-generated copy passes QA structurally but sounds off-brand — check that guidelines are linked to the workspace or campaign
- **QA run on unsupported channel**: AI Content QA is unavailable for email and Content Cards; teams sometimes assume a silent result means passing
- **Flagged QA overridden without review**: QA flags dismissed as noise rather than investigated — each flag should have a documented decision
- **Guidelines too vague to enforce**: If brand guidelines only say "be friendly," the AI has no actionable constraint; effective guidelines include concrete examples of in-voice and out-of-voice copy
