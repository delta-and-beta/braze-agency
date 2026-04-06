---
name: content-optimization-testing-jacquard
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/content_optimization_testing/jacquard
indexed_at: '2026-04-05'
keywords:
  - Jacquard
  - optimization
  - Currents
  - integration
  - variants
  - tracking
  - credentials
  - S3
  - PII
  - Braze
triggers:
  - set up Jacquard integration with Braze
  - configure Currents for language optimization
  - optimize message language variants
  - track email clicks for Jacquard
  - enable real-time language optimization
---
`★ Insight ─────────────────────────────────────`
- Nick's topic files are atomic knowledge units stored in `skills/{id}/references/` — they're designed to be retrieved by semantic search, so self-contained density matters more than narrative flow
- The Jekyll template syntax (`{{site.baseurl}}`) and table CSS classes (`.reset-td-br-1`) are platform artifacts that should be stripped — they break rendering outside the source docs site
`─────────────────────────────────────────────────`

Here is the condensed topic file:

---

## Jacquard Dynamic Optimisation

Jacquard uses AI and computational linguistics for brand language optimization. The Dynamic Optimisation feature (powered by Jacquard X) integrates with Braze via **Currents** and **Connected Content** to collect click-tracking data and optimize message language variants in real-time.

### Prerequisites

- **Jacquard account** — required for the partnership
- **Jacquard connect server token** — serves as the Braze campaign password to access Jacquard language variants; request from your Jacquard customer success manager
- **Braze Currents** — must be enabled on your account for data export

### Setup Steps

**1. Get Jacquard Amazon S3 credentials**
Contact your Jacquard customer success manager to provision a dedicated S3 bucket. You'll receive unique credentials (access key ID + secret) and a bucket folder name (typically your company name).

**2. Create a Current in Braze**
- Navigate to **Currents > Create New Current > Amazon S3 Data Export**
- Name the Current and provide a contact email
- Enter the Jacquard AWS access key ID and secret access key
- Set S3 bucket name to: `phrasee-braze-currents-exports`
- Set S3 bucket folder to the value provided by Jacquard (usually your company name)
- Under **General Settings**: enable "Include events from anonymous users"
- Under **Manage Engagement Events**: enable "Email Click"
- Select **Launch Current**

**3. Remove PII from the data stream**
Contact your Braze account team to disable PII transmission (email addresses, etc.) for data passed to Jacquard. By default, Currents includes PII attributes — Jacquard cannot accept PII, so this step is **required**.

**4. Embed Jacquard X code snippets**
Request Connected Content code snippets from your Jacquard account team. Place them in your email templates — they dynamically pull language variants and inject a tracking pixel, enabling real-time optimization via Jacquard X.

### How It Works

```
Braze sends email → Jacquard X snippet pulls language variant via Connected Content
     ↓
Subscriber clicks → Braze Currents sends click event to Jacquard S3 bucket
     ↓
Jacquard ties click events to language variants → real-time optimization
```
