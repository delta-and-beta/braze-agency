---
name: personalization-and-dynamic-content-promotion-codes
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/promotion_codes
indexed_at: '2026-04-05'
keywords:
  - promotion-codes
  - code-consumption
  - liquid
  - multichannel
  - deduction
  - canvas
  - conditional-logic
  - expiration
triggers:
  - insert promotion codes in messages
  - configure code consumption behavior
  - save codes to user profiles
  - set up promotion code lists
  - manage expired codes
---
## Promotion Codes Overview

Promotion codes insert unique, time-limited values into messages to drive conversions. Lists hold up to 20 million codes; each code expires after up to six months.

### Code Consumption Behavior

Codes are deducted **before** the message sends. Key rules:

- Failed/undelivered messages still consume a code
- Multichannel sends apply the **same code** across all channels for a given user
- Conditional Liquid deducts from **all referenced lists**, even if only one branch renders
- Re-entering a Canvas step consumes a **new** code
- Multiple snippets referencing the same list in one message use the **same code**

```liquid
{% if user.is_vip %}
  {% promotion('vip-deal') %}
{% else %}
  {% promotion('regular-deal') %}
{% endif %}
```
Both `vip-deal` and `regular-deal` lists have codes deducted, even though the user only sees one branch.

### Supported Channels

| Supported | Not Supported |
|-----------|---------------|
| Email, push (mobile + web), Content Cards, webhook, SMS, WhatsApp | In-app messages, Transactional Email campaigns |

### Empty or Expired Lists

- Expired codes are deleted after six months
- Message is **canceled** if it should have contained a code from an empty/expired list
- Message **sends normally** if Liquid logic determines no code was needed

### Test Sends

By default, test sends and seed group emails consume promotion codes. Contact your Braze account manager to disable this during testing.

### Saving Codes to User Profiles

Promotion codes can be saved to a user profile for future messages via a **User Update** Canvas step.

`★ Insight ─────────────────────────────────────`
- The "deducted before send" model means list sizing must account for failed deliveries — the original doc recommends uploading more codes than expected usage
- The conditional Liquid deduction behavior is a common gotcha: branching logic doesn't protect unused code lists from being consumed
- The multichannel same-code guarantee is enforced at the user level, not the send level — useful to know when designing multi-touch campaigns
`─────────────────────────────────────────────────`
