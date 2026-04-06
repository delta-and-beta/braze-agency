---
name: engagement-tools-testing-multivariant-testing
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing
indexed_at: '2026-04-05'
keywords:
  - multivariate
  - A/B
  - testing
  - variants
  - control
  - randomization
  - campaign
  - messaging
  - experiment
  - groups
triggers:
  - how to run A/B test
  - set up multivariate testing
  - test multiple variants
  - add control group
  - test message copy
---
```
★ Insight ─────────────────────────────────────
Topic files in Nick's pipeline serve as "atomic knowledge units" — each should
be self-contained so the MCP server can return it as a standalone search result
without requiring surrounding context. This means aggressive removal of
cross-links, template tags (like `{% alert %}`), and navigation boilerplate.
─────────────────────────────────────────────────
```

## Multivariate and A/B Testing Overview

### Definitions

**A/B test** — Compares user responses to multiple versions of the same campaign that share marketing goals but differ in wording or style. Tests a single variable at a time.

**Multivariate test** — Tests two or more variables simultaneously. Example: testing both copy _and_ emoji presence in a push notification requires 4 variants (2 copy options × 2 emoji options). In Braze, "multivariate test" and "A/B test" are used interchangeably — setup process is identical.

> Note: To test differences in message _timing_ or _scheduling_, use Canvas rather than multivariate testing.

### When to Use

- **First-time use of a messaging channel** — Experiment before committing to an approach
- **Evergreen/onboarding campaigns** — High-reach campaigns benefit most from optimization
- **Multiple competing message ideas** — Let data decide rather than intuition
- **Validating conventional marketing tactics** — Every audience is different; test before assuming "tried and true" tactics work

### Key Testing Guidelines

| Guideline | Why It Matters |
|-----------|---------------|
| Use large sample sizes | Small samples are skewed by outliers; larger samples reveal smaller winning margins |
| Randomly assign users to groups | Removes selection bias; ensures response differences reflect message quality, not audience composition |
| Isolate what you're testing | Clear variable isolation makes it easier to attribute impact |
| Decide test duration upfront | Stopping early when results look favorable introduces confirmation bias |
| Add tests _before_ campaign launch | Post-launch additions produce incorrect/misleading statistics |
| Include a control group | Establishes whether messaging outperforms sending nothing at all |

### Fixing a Launched Campaign

If you need to add a test to an already-launched campaign:

1. Clone the launched campaign
2. Stop the original campaign
3. Add the test to the cloned campaign

> Changing variants while a test is running invalidates the test and restarts it.

### Variant Distribution

Up to **8 randomly selected test groups** are supported per multivariate test. Randomization is applied at test creation to ensure group composition parity.

```
★ Insight ─────────────────────────────────────
The condensed format strips Liquid template tags (`{% alert %}`, `{% multi_lang_include %}`),
Jekyll `{{site.baseurl}}` link syntax, and section anchors (`{#the-benefits-of}`) —
all of which are rendering artifacts that add noise when consumed as plain-text
context by an LLM agent. The table format for guidelines compresses 8 paragraphs
into scannable reference material without losing actionable detail.
─────────────────────────────────────────────────
```
