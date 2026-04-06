---
name: decisioning-studio-orchestration-setup
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/orchestration_setup
indexed_at: '2026-04-05'
keywords:
  - orchestration
  - CEP
  - Braze
  - Salesforce
  - campaigns
  - templates
  - API
  - credentials
  - Liquid
  - integration
triggers:
  - how to set up orchestration with a CEP
  - how to integrate with Braze
  - how to create API-triggered campaigns
  - how to configure dynamic content and personalization
---
## Orchestration Setup

Orchestration connects Decisioning Studio to your Customer Engagement Platform (CEP). The agent decides **what/when** to send; the CEP handles **how** to send it.

---

## Supported CEPs

| CEP | Integration Type | Complexity |
|-----|-----------------|------------|
| **Braze** | Native API integration (recommended) | Low |
| **Salesforce Marketing Cloud** | API events + Journey Builder | Medium |
| **Other CEPs** | Custom (recommendation file) | High |

---

## Prerequisites by CEP

### Braze
- REST API key with permissions: user data, messages, campaigns, Canvas, segments, templates
- Braze dashboard URL (e.g., `https://dashboard-01.braze.com`)
- App ID (Settings > App Settings)
- Email display name + sender address (Settings > Email Preferences)
- Base message templates (used to create API-triggered campaigns)
- Test user ID

### Salesforce Marketing Cloud
- App package credentials: Client ID, Client Secret, Auth Base URI, REST Base URI, SOAP Base URI
- API scopes: channels, assets, automations, journeys, contacts, data extensions, tracking events
- Data extensions for: subscriber data, engagement data, recommendations
- Email templates with template IDs
- Journey Builder access (multi-step journeys with API event entry sources)

### Other CEPs (Recommendation File Approach)
- CEP must ingest CSV/JSON recommendation files with per-customer decisions
- Campaigns must support dynamic field population from recommendation data
- Custom engineering required to read files and trigger communications

---

## Campaign Planning

### Base Templates
- An agent uses one or more base templates; selecting the right one per customer is itself a personalized decision
- Plan channels: email, push, SMS (each may need separate templates/campaigns)
- Identify dynamic elements: subject lines, CTAs, offers, timing — these become API trigger properties

### Re-eligibility
- Set campaigns to allow re-eligibility within **15 minutes** (enables repeated testing)
- In production, agents respect frequency caps and will not send the same campaign more than once per day

### API Trigger Properties (Braze)

| Dimension | Liquid Syntax |
|-----------|--------------|
| Subject line | `{{api_trigger_properties.${subject_line}}}` |
| Call to action | `{{api_trigger_properties.${cta_message}}}` |
| Offer | `{{api_trigger_properties.${offer_id}}}` |
| Discount amount | `{{api_trigger_properties.${discount}}}` |

---

## Braze Integration Steps

1. **Create API key** — Settings > API Keys, with permissions for user data, messages, campaigns, Canvas, segments, templates

2. **Set up API-triggered campaigns** — One campaign per base template; include API trigger properties for all optimized dimensions

3. **Configure re-eligibility** — Set all campaigns to re-eligible within 15 minutes

4. **Add dynamic placeholders** — Insert `api_trigger_properties` Liquid tags into campaign content for each optimized dimension

### Email Campaign Example
For a campaign optimizing template selection + CTA, create one API-triggered campaign per template. In the template body:
```
{{api_trigger_properties.${cta_message}}}
```

### Push Campaign Example
Create a push campaign with message body driven by API trigger properties for the optimized message variant.
