---
name: decisioning-studio-audience
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/audience
indexed_at: '2026-04-05'
keywords:
  - audience
  - decisioning
  - segment
  - treatment
  - control
  - braze
  - salesforce
  - integration
  - export
  - holdout
triggers:
  - configure audience
  - set up treatment groups
  - integrate with braze
  - export audience data
  - configure decisioning studio
---
## Decisioning Audience Configuration

Audiences are defined in a Customer Engagement Platform (Braze, SFMC, or other), then sent to Decisioning Studio, which divides customers into treatment groups for randomized controlled trials.

### Treatment Groups

| Group | Description | Required |
|-------|-------------|----------|
| **Decisioning Studio** | Customers receiving AI-optimized recommendations | Yes |
| **Random Control** | Customers receiving randomly selected options (baseline) | Yes |
| **Business-as-Usual** | Customers on the current marketing journey (vs. existing performance) | Optional |
| **Holdout** | Customers receiving no communications (measures overall campaign impact) | Optional |

### Platform Configuration

**Braze**
- Create a segment for the target audience
- Provide the Segment ID to AI Decisioning Services
- Multiple segments can be ingested and combined; a separate segment for a BAU comparator campaign is also supported

**Salesforce Marketing Cloud**
1. Configure an SFMC Data Extension for your audience; note the data extension ID
2. Set up an SFMC Installed Package with API integration permissions required by Decisioning Studio
3. Ensure the data extension refreshes daily (Decisioning Studio pulls latest incremental data)
4. Provide the extension ID and API key to AI Decisioning Services

**Other Platforms (via Google Cloud Storage)**

If the audience is not in Braze or SFMC, configure an automated export to a Braze-controlled GCS bucket:

- **mParticle** — native GCS integration available
- **Twilio Segment** — supports GCS destination
- **Treasure Data** — GCS export integration available
- **ActionIQ** — GCS integration via Integrations Brief
- **Adobe Experience Platform** — GCS destination in catalog

Contact AI Decisioning Services to receive a GCS bucket for export.

---

**Next:** Proceed to orchestration setup after audience is configured.

`★ Insight ─────────────────────────────────────`
- The original used Braze's Jekyll `{% tabs %}` liquid template syntax — stripping this and flattening into headers+sections preserves the same information while making it renderable in any markdown context.
- The table's `{: .reset-td-br-1}` CSS class annotations are presentation-layer only and carry no semantic meaning, so they're safely dropped.
- "Self-contained" topic files like this benefit from keeping the "Required/Optional" distinction explicit in the table rather than burying it in prose — it's the kind of decision-relevant fact engineers and architects scan for first.
`─────────────────────────────────────────────────`
