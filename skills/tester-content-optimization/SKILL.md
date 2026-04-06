---
name: tester-content-optimization
description: >-
  Tests and optimizes message content using A/B testing partners and content
  optimization tools.
metadata:
  role: braze-tester
  topics:
    - content-optimization-testing-trustpilot
    - content-optimization-testing-notify
    - content-optimization-testing-just-words
    - content-optimization-testing-just-ai
    - content-optimization-testing-jacquard
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill reinforces that skill files should be discovery-optimized — keywords appear early, descriptions target triggering conditions, and the structure flows from overview → when-to-use → reference material. Since the user explicitly excluded frontmatter, I'll front-load the purpose and partner-specific context that semantic search would otherwise find via YAML.
`─────────────────────────────────────────────────`

# Content Optimization & Testing

## Overview

This skill covers the full lifecycle of **message content testing and optimization** within Braze, bridging native A/B testing capabilities with third-party AI and content intelligence partners.

The lens here is **content performance**: not just what gets sent, but which words, timing, and personalization signals drive measurable engagement. Use this skill when the goal shifts from "deploy a campaign" to "learn which version of the campaign works better."

## When to Use This Skill

Apply this skill when:

- Setting up A/B or multivariate content tests across email, push, SMS, or in-app channels
- Integrating an external content intelligence platform (Trustpilot, Notify, Jacquard, Just Words, Just AI) via Connected Content
- Optimizing copy, send timing, or personalization logic based on performance data
- Fetching dynamic social proof (reviews, ratings) to embed in message content
- Configuring predictive send-time or language optimization for a campaign

**Not this skill:** Campaign delivery mechanics, audience segmentation, or channel-level A/B testing infrastructure live in other skills. This skill is specifically about *content* — the words, scores, and signals that determine message quality.

## Content Optimization Partners

### Trustpilot — Social Proof Content

Trustpilot surfaces customer reviews and trust scores that can be embedded in Braze messages via **Connected Content**.

**Key pattern — two-phase OAuth flow:**
1. Fetch a short-lived token from the Trustpilot auth endpoint
2. Use the token to retrieve review content or aggregate scores
3. Cache aggressively: `:cache_max_age 3600` is critical to avoid rate limits on token fetches

```liquid
{% connected_content https://api.trustpilot.com/v1/oauth/oauth-business-users-for-authentication
  :method post
  :headers {"Authorization": "Basic {{encoded_credentials}}"}
  :cache_max_age 3600
  :save token_response %}

{% connected_content https://api.trustpilot.com/v1/private/business-units/{{business_unit_id}}/reviews
  :headers {"Authorization": "Bearer {{token_response.access_token}}"}
  :save reviews %}
```

The `:cache_max_age` on the token fetch is non-negotiable — without it, every message render triggers a fresh OAuth round-trip.

### Notify — Predictive Engagement Timing

Notify is an AI-driven platform that integrates with Braze to deliver personalized messaging across email, SMS, push, and other channels using **predictive engagement timing**.

Core capabilities:
- Per-user optimal send-time prediction
- Channel affinity modeling (who prefers SMS vs email)
- Real-time engagement scoring fed back into Braze via Custom Attributes or Connected Content

Integration approach: Notify typically surfaces a send-time or score attribute per user that Braze reads at send time. The content itself may be templated around predicted engagement windows.

### Jacquard — AI Language Optimization

Jacquard specializes in **microcopy and language optimization** — generating and testing message variants at scale using AI trained on brand voice and performance data.

Use Jacquard when:
- You need statistically significant copy variants without manual copywriting
- Brand voice consistency must be enforced across high-volume test matrices
- The goal is language-level optimization (word choice, tone, CTA phrasing)

Jacquard typically integrates via Connected Content or pre-populates Braze Content Blocks with winning variants post-test.

### Just Words — Copy Testing

Just Words is a content optimization tool focused on **message copy performance**. Documentation coverage is limited — treat as a Connected Content integration pattern similar to Jacquard: fetch optimized copy at render time or sync winning variants to Content Blocks after tests conclude.

### Just AI — AI Content Generation

Just AI provides AI-generated content variants for personalization at scale. Like Just Words, source documentation is sparse — follow the same Connected Content pattern, ensuring token/auth caching is in place for any OAuth-gated endpoints.

## Connected Content Patterns for Content Partners

All five partners above surface content via Braze **Connected Content**. Common pitfalls:

| Pattern | Recommendation |
|---|---|
| Auth token caching | Always use `:cache_max_age` — minimum 3600s for OAuth tokens |
| Null/empty responses | Wrap fetched content in `{% if %}` guards before rendering |
| Render-time latency | Cache aggressively; pre-fetch to Content Blocks where possible |
| Personalization fallback | Define default copy for users with no optimization signal |

## A/B Testing Integration

When pairing these partners with Braze's native A/B infrastructure:

- Use **Content Blocks** to hold winning variants promoted after a Jacquard or Just Words test
- Use **Liquid personalization** to route users to partner-optimized content based on Notify's engagement score attributes
- Use **Campaign Analytics** exports to feed performance data back into Jacquard/Just AI for model refinement

## Quick Reference

| Partner | Primary Use | Integration Method |
|---|---|---|
| Trustpilot | Social proof / ratings | Connected Content (OAuth, cached) |
| Notify | Send-time optimization | Custom Attributes or Connected Content |
| Jacquard | Language/copy variants | Connected Content or Content Blocks |
| Just Words | Copy testing | Connected Content |
| Just AI | AI copy generation | Connected Content |
