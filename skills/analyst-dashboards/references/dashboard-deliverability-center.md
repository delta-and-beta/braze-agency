---
name: dashboard-deliverability-center
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/deliverability_center
indexed_at: '2026-04-05'
keywords:
  - deliverability
  - postmaster
  - email
  - reputation
  - domains
  - metrics
  - DNS
  - integration
  - Gmail
  - sender
triggers:
  - setup Gmail Postmaster
  - verify email domains
  - integrate Postmaster with Braze
  - check domain reputation
  - troubleshoot delivery errors
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase serve as atomic knowledge units — the goal is maximum signal-to-noise ratio. Jekyll template tags (`{% details %}`, `{{site.baseurl}}`), image busters, and table CSS classes are all noise to strip. The resulting file should read like a well-organized internal wiki page.
`─────────────────────────────────────────────────`

## Deliverability Center

The Deliverability Center in the Braze dashboard integrates with **Gmail Postmaster Tools** to track email performance data for your sending domains. View domains by **IP Reputation** or **Delivery Errors** to discover and troubleshoot deliverability issues.

**Location:** Analytics > Email Performance > Deliverability Center tab

**Required permissions:** "Access Campaigns, Canvases, Cards, Segments, Media Library" + "View Usage Data" (legacy), or granular permissions including View Reports and View Usage Data.

---

### Setup: Google Postmaster Account

1. Go to [Google Postmaster Tools dashboard](https://postmaster.google.com/managedomains).
2. Click the **+** icon (bottom right).
3. Enter your **root (parent) domain** — not the subdomain used in Braze.
   - Verifying the root domain lets you add subdomains later without additional TXT records.
   - Example: verify `braze.com` → then add `demo.braze.com` as a subdomain for subdomain-level metrics.
4. Add the generated **TXT record** to your domain's DNS (managed by your DNS provider).
5. Return to Google Postmaster Tools and click **Verify**.

> **Note:** If subdomains aren't appearing in the Deliverability Center, it's because only the root domain was added to Google Postmaster. After root domain verification, add subdomains manually — they verify automatically and enable subdomain-level metrics in Braze.

---

### Integrating Google Postmaster with Braze

Prerequisites: Domains must already be added to Gmail Postmaster Tools.

1. Go to **Analytics > Email Performance > Deliverability Center** tab.
2. Select **Connect with Google Postmaster**.
3. Select your Google Account and click **Allow** (grants Braze permission to view email traffic metrics).

Verified domains will appear in the Deliverability Center. Also accessible via **Partner Integrations > Technology Partners > Google Postmaster**.

After integration, Braze pulls **reputation and error data for the last 30 days**. Data may take several minutes to populate.

---

### Metrics Reference

#### IP Reputation

| Rating | Meaning |
|--------|---------|
| **High** | Good track record; low spam complaints |
| **Medium/Fair** | Positive engagement; occasional spam complaints; most mail reaches inbox |
| **Low** | Elevated spam complaint rate; mail likely filtered to spam folder |
| **Bad** | History of high spam complaints; mail almost always rejected or filtered to spam |

#### Domain Reputation

| Rating | Meaning |
|--------|---------|
| **High** | Very low spam rate; complies with Gmail sender guidelines; rarely filtered to spam |
| **Medium/Fair** | Positive engagement; low volume of spam complaints; most mail reaches inbox |
| **Low** | Regular spam complaints; mail likely filtered to spam folder |
| **Bad** | Elevated spam complaint history; mail almost always rejected or filtered to spam |

#### Authentication

Tracks percentage of emails passing each authentication standard:

| Standard | Description |
|----------|-------------|
| **SPF** (Sender Policy Framework) | % of emails that passed SPF vs. all emails from the domain that attempted SPF (excludes spoofed mail) |
| **DKIM** (DomainKeys Identified Mail) | % of emails with valid DKIM signatures |
| **DMARC** (Domain-based Message Authentication, Reporting and Conformance) | % of emails aligned with DMARC policy |

`★ Insight ─────────────────────────────────────`
The original doc had duplicate table rows in the Domain Reputation section (the "High" definition was copy-pasted with slight variation). The condensed version merges these into the cleaner description. When processing docs for topic files, deduplication like this improves LLM retrieval quality since repeated text inflates apparent importance of that specific phrasing.
`─────────────────────────────────────────────────`
