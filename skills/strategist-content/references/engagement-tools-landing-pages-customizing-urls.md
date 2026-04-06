---
name: engagement-tools-landing-pages-customizing-urls
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/customizing_urls
indexed_at: '2026-04-05'
keywords:
  - domain
  - subdomain
  - DNS
  - CNAME
  - landing
  - workspace
  - SSL
  - CAA
  - migration
triggers:
  - connect custom domain
  - customize landing page URLs
  - domain troubleshooting
  - remove custom domain
  - migrate domain workspace
---
## Customizing Landing Page URLs

Connect a custom subdomain to your Braze workspace so landing pages use your brand domain instead of Braze's default. For example, connecting `forms.example.com` makes page URLs like `forms.example.com/holiday-sale`.

**Limit:** One subdomain per workspace. To increase your domain limit, contact your Braze account manager.

---

### Connect a Domain

1. Go to **Settings** > **Landing Page Settings**
2. Enter the subdomain (e.g., `forms.example.com`) and select **Submit**
3. Copy the **TXT** and **CNAME** records shown into your DNS provider's settings
4. Return to the Braze dashboard to verify the connection

> DNS propagation can take up to 48 hours. Braze will begin using your custom domain once verification completes.

---

### Remove a Domain

Requires Braze administrator role.

1. Go to **Settings** > **Landing Page Settings**
2. Select **Remove Custom Domain** and confirm
3. Remove the DNS records from your domain provider

**Effect:** All landing pages using the removed domain automatically revert to Braze's default domain.

---

### Migrate a Domain to Another Workspace

Subdomain will be unavailable during migration.

1. Remove the custom domain from the current workspace
2. Add the domain to the target workspace
3. Reconfigure DNS with the new records provided

---

### Troubleshooting

#### Domain connection failed
- Confirm the domain entered matches what was submitted to Braze
- Verify the TXT and CNAME records in your DNS provider match exactly what Braze provided

#### Domain stuck on "Connecting" despite valid DNS records

If all records show "Connected" but domain status stays "Connecting" for more than 4 hours, check for:

**CAA Records** — Your domain's CAA records may restrict which certificate authorities can issue SSL certs. Braze uses LetsEncrypt via Cloudflare. Add this CAA record to your subdomain:

| Field | Value |
|-------|-------|
| Record type | CAA |
| Value | `0 issue "letsencrypt.org"` |

**Cloudflare Zone Holds** — If your org uses Cloudflare, a zone hold may block Braze from creating the custom domain. Ask your IT team to temporarily release the hold.

**After resolving either issue:** Delete and recreate the custom domain in the Braze dashboard to restart validation.

---

### Constraints

- Cannot connect more than one subdomain per workspace
- Cannot share one subdomain across multiple workspaces
- Cannot reuse a subdomain already assigned to your main website or sending domain — existing DNS records conflict with required CNAME records

`★ Insight ─────────────────────────────────────`
- The original doc contains Jekyll template tags (`{% image_buster %}`, `{% multi_lang_include %}`, `{% alert %}`) — these are stripped in the processed version since they won't render outside Jekyll and add no informational value to a reference file
- The FAQ section was merged into **Constraints** — FAQs are structurally redundant when the constraints are stated directly; consolidating reduces scan time without losing facts
- The CAA/Cloudflare troubleshooting is the most operationally dense section, so the table format was preserved to keep values copy-pasteable
`─────────────────────────────────────────────────`
