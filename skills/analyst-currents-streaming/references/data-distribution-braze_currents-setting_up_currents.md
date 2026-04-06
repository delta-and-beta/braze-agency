---
name: data-distribution-braze_currents-setting_up_currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/braze_currents/setting_up_currents
indexed_at: '2026-04-05'
keywords:
  - currents
  - integration
  - events
  - connector
  - credentials
  - payload
  - transformation
  - partner
  - streaming
  - authentication
triggers:
  - How to set up Currents
  - Configure Currents partner
  - Forward events to third party
  - Transform event fields
  - Test Currents integration
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are atomic knowledge units nested under `skills/{id}/references/` — they're designed to be retrieved independently during query routing, so self-containment is critical
- Stripping Jekyll liquid templating (`{% %}`, `{{ }}`) and image references is essential since these are build-time artifacts that have no meaning in the generated plugin context
`─────────────────────────────────────────────────`

## Setting Up Currents

Braze Currents streams event data to third-party partners in real time. It is included with select Braze packages.

---

## Requirements

Every Currents integration requires the following from the destination partner:

| Requirement | Description |
|---|---|
| Partner account | You must have an active account with the partner before Braze can send data. |
| Partner API Key or Token | Found in the partner's dashboard. Paste into the Braze integrations page. **Must stay current — invalid credentials disable the connector and drop events.** |
| Auth Code / Secret Key / Cert File | Credentials that authorize Braze to write to your partner account. Keep these updated. |
| Bucket or Folder Path | Required by some partners. Copy exactly from the partner dashboard. |

> **Critical:** If credentials expire and the connector is inactive for more than **5 days**, events are permanently dropped.

---

## Setup Steps

### Step 1 — Choose integration type

Two integration patterns are available:

- **Batched JSON payload** → behavioral analytics and CDP partners (e.g., mParticle, Segment)
- **Flat file / Data Storage** → for custom analysis pipelines or complex data processing

### Step 2 — Open Currents

Navigate to **Partner Integrations > Currents** in the Braze dashboard.

### Step 3 — Add a partner connector

Use the dropdown at the top of the Currents page to add a partner (called a "Currents connector"). Each partner has its own configuration steps — refer to the [available partners list](https://www.braze.com/docs/user_guide/data/braze_currents/available_partners/).

### Step 4 — Configure events

Select which events to forward:

- **Customer Behavior Events** — session starts, purchases, custom events, etc.
- **Message Engagement Events** — email opens, push clicks, etc.

### Step 5 — Set up field transformations (optional)

Transform specific string fields before they are sent:

| Transformation | Behavior |
|---|---|
| **Remove** | Replaces field value with `[REDACTED]`. Use when partner rejects empty fields. |
| **Hash** | Applies SHA-256 hashing to the field value. |

Transformations apply to the field across **all events** where it appears. Example: hashing `email_address` affects Email Send, Email Open, Email Bounce, and Subscription Group State Change events.

### Step 6 — Test the integration

**Payload size limit:** Events with payloads exceeding **900 KB** are dropped.

Two testing options:

**Send Test Events**
Select **Send Test Events** to fire one event per selected event type to the connector.

**Test Currents Connectors**
Free sandbox connectors for validating destinations:
- Up to **10 test connectors** per workspace
- Maximum **1,500 events per 24-hour period** (resets at midnight UTC, updated hourly)
- Once the limit is reached, no events are sent until the next reset

To promote a test connector to production: edit the integration and select **Upgrade Test Integration**.

---

## Updating Currents

Edit the existing connector in **Partner Integrations > Currents** to update credentials, event selections, or field transformations.

---

## IP Allowlisting

If the destination partner requires IP allowlisting, refer to the [Braze data center IP list](https://www.braze.com/docs/user_guide/data/braze_currents/) for the IPs Braze uses to send Currents data.

`★ Insight ─────────────────────────────────────`
- Notice the table format is preserved — it's the most reference-scannable structure for credential requirements, which engineers frequently look up mid-integration
- The 5-day drop warning and 900 KB payload limit are the kind of operationally critical "gotchas" worth keeping prominent — they cause hard-to-debug data loss if missed
`─────────────────────────────────────────────────`
