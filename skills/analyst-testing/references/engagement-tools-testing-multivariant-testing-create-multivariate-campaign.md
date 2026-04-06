---
name: engagement-tools-testing-multivariant-testing-create-multivariate-campaign
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing/create_multivariate_campaign
indexed_at: '2026-04-05'
keywords:
  - multivariate
  - variants
  - campaign
  - conversion
  - optimization
  - segmentation
  - control-group
  - personalization
  - testing
  - channel
triggers:
  - create multivariate campaign
  - set up A/B test variants
  - configure conversion tracking
  - launch optimized campaign
  - assign segments to variants
---
## Create Multivariate / A/B Campaign

**Constraint:** Targets a single channel and single device type (e.g., iOS push only — not iOS + Android in same campaign). Up to 8 variants.

---

### Setup Steps

**1. Create campaign**
Navigate to **Messaging > Campaigns** → **Create campaign** → select a single channel.

**2. Compose variants**
- Up to 8 variants (copy, images, titles, emojis, deep links, etc.)
- A/B test = 1 variable changes; Multivariate = 2+ variables change

**3. Schedule**
All standard delivery types supported. **Important caveats:**
- Cannot edit campaign after test begins — changes invalidate the experiment
- Avoid edits within 1 hour of launch
- **Optimizations** (Winning Variant, Personalized Variant) require single-send campaigns — not available for recurring or re-eligibility campaigns

**4. Segment + distribute users**
Assign segments to variants + optional control group. Single-send push/email/webhook campaigns can also use an **optimization** (reserves audience portion for a second optimized send).

**5. Conversion event** (optional)
Set a Primary Conversion Rate event to track post-receive actions. Required if using conversion rate as winning criterion.

**6. Review and launch**

---

### Control Group

Reserve a percentage of the audience that receives no message — used to establish a baseline conversion rate.

| Scenario | Behavior |
|----------|----------|
| Winner by Opens/Clicks | **Not recommended** — control group can't open/click, so their rate is always 0% |
| Rate limiting | Rate limit is NOT applied to control group the same way → potential time bias; use appropriate conversion windows |
| Intelligent Selection | Control group = 20% if each variant gets >20%; shrinks if more variants; adjusts dynamically as results come in |

---

### What to Test by Channel

| Channel | Testable Elements | Key Metrics |
|---------|------------------|-------------|
| Push | Copy, images/emoji, deep links, number framing ("triple" vs "200% increase"), time framing ("ends at midnight" vs "ends in 6 hours") | Opens, Conversion Rate |
| Email | Subject line, display name, salutation, body copy, images/emoji, number/time framing | Opens, Conversion Rate |
| In-app message | Same as push + image specifications | Clicks, Conversion Rate |

---

### Key Rules

- Editing a **live** experiment invalidates it and removes results
- If experiment is **completed** and you edit post-send, results remain — but relaunching removes them
- Funnel reports complement A/B tests to understand variant impact on conversion paths
