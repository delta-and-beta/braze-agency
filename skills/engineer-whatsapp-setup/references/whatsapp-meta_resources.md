---
name: whatsapp-meta_resources
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/meta_resources
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - marketing
  - messaging
  - limits
  - templates
  - quality
  - restrictions
  - utility
  - accounts
triggers:
  - WhatsApp marketing message limits
  - Meta message delivery restrictions
  - WhatsApp template quality rating
  - per-user marketing template caps
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{skill-name}/references/` and should be self-contained so agents can load just the relevant slice without full context
- Chronological update logs are high-noise for reference use; the key transformation is collapsing them into thematic fact groups (current limits, active restrictions, pricing model) so agents can answer "what is true now" rather than "what changed when"
`─────────────────────────────────────────────────`

## Meta Resources

### Official Documentation

| Topic | Link |
|-------|-------|
| Display name guidance | https://www.facebook.com/business/help/757569725593362 |
| Enabling Meta Insights | https://www.facebook.com/business/help/218116047387456 |
| Phone Number Requirements | https://developers.facebook.com/docs/whatsapp/cloud-api/phone-numbers |
| Messaging Limits | https://developers.facebook.com/docs/whatsapp/messaging-limits |
| Quality Rating | https://www.facebook.com/business/help/896873687365001 |
| Marketing Messages API | https://developers.facebook.com/documentation/business-messaging/whatsapp/marketing-messages/overview/ |
| Per-user marketing limits | https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates#per-user-marketing-template-message-limits |
| Opt-in policy | https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in/ |

---

### Current Restrictions & Active Enforcements

**US Marketing Messages (paused as of April 1, 2025)**
- Meta has indefinitely paused delivery of all marketing template messages to WhatsApp users with US phone numbers (`+1` dialing code + US area code)
- Error code: `131049`
- Utility, service, authentication, and response messages are still allowed in the US
- All message types to non-US numbers are unaffected

**Per-User Marketing Template Limits (global, March 2025+)**
- Meta caps the number of marketing templates a user can receive across all businesses in a given period
- Messages less likely to be read are deprioritized first
- Exception: if a user replies to a marketing message, a 24-hour service window opens — marketing messages within that window do not count toward the limit
- US users are subject to stricter limits ahead of holiday seasons

**Quality-Based Account Enforcements (November 2024+)**
- Accounts with extremely low read rates face messaging blocks
- Enforced globally on WhatsApp Business Accounts (WABAs)
- Monitor with error code `131049` via Braze Currents or Message Activity Log

**Template Category Misuse (March 2025+)**
- Meta enforces restrictions for businesses misusing utility/marketing categorization
- Penalties: 7–30 day restrictions on template creation and category reviews

---

### Pricing Model (July 1, 2025 overhaul)

- **Billing changed from per-conversation to per-message**
- Utility messages sent within a 24-hour service window are **free**
- Updated utility/authentication rates apply in multiple markets with new volume tiers
- Template miscategorization (utility vs. marketing) can result in template rejection and submission restrictions

**Regional Rate Cuts (October 2025)**
- Lower utility/authentication rates: Argentina, Egypt, Mexico, North America
- Lower marketing rates: Mexico (effective October 1, 2025)

---

### Messaging Limits

**Portfolio-level limits (October 2025+)**
- Limits are now shared across all phone numbers within a business portfolio (previously per-phone)
- Portfolios inherit the highest existing limit from any number in the portfolio
- Higher limits can be reached within 6 hours
- **Risk:** Businesses without an "unlimited" number may see aggregate limits decrease

**Marketing Messages API (November 2025+, formerly Marketing Messages Lite API)**
- Replaces static Cloud API limits with dynamic, engagement-based limits
- **Not available in:** EMEA, Japan, South Korea for optimized delivery
- Utility/authentication messages continue through Cloud API automatically

---

### Official Business Account (OBA) Approval

**Process changed October 2025** — OBA status is now restricted:
- Eligible via: government entities, large Meta advertisers, direct advertisers, or through a Business Solution Provider (BSP) like Braze (up to 5 per week)
- Prerequisites: business verification, 2-step verification, approved display name, notability
- Contact your customer success manager (CSM) for assistance

---

### Opt-in Policy (Updated November 2024)

Meta no longer requires channel-specific WhatsApp consent. Businesses may message users if:
1. The user provided their phone number
2. The user gave opt-in permission for general messaging (not WhatsApp-specific)

**Still required regardless:**
- Clearly state the user is opting in to receive communications
- Clearly state the business name
- Comply with applicable local law

> **Braze recommendation:** Collect WhatsApp-specific opt-in anyway for better engagement and customer experience. Consult your legal team.

---

### Upcoming Changes

**June 2026: Business-scoped user IDs**
- Meta will replace phone number sharing with user IDs for privacy
- Braze is developing a solution ahead of rollout
- Expected rollout: June 2026

`★ Insight ─────────────────────────────────────`
- The transformation flattens the changelog narrative into policy-state groupings (restrictions, pricing, limits, OBA) — this lets an agent answer "is marketing to the US allowed?" without parsing dates
- The US `131049` error code appears in multiple overlapping updates; consolidating it under one heading avoids an agent retrieving contradictory-seeming "duplicate" facts
`─────────────────────────────────────────────────`
