---
name: data-infrastructure-data_centers
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/infrastructure/data_centers
indexed_at: '2026-04-05'
keywords:
  - latency
  - regions
  - routing
  - sovereignty
  - infrastructure
  - scalability
  - compliance
  - messaging
triggers:
  - which region should I use
  - how to minimize latency
  - data sovereignty requirements
  - choose data center region
  - account region setup
---
## Data Centers

Braze operates geographically distributed data centers to support data sovereignty, low latency, and scalable infrastructure.

### How Routing Works

- User requests are routed to the **nearest data center** automatically
- Minimizes latency for real-time messaging and push notifications
- Infrastructure scales horizontally across multiple data centers to handle traffic spikes

### Available Regions

| Region | Code |
|--------|------|
| Australia | `AU` |
| European Union | `EU` |
| Indonesia | `ID` |
| Japan | `JP` |
| United States | `US` |

### Account Setup

- Data center region is selected **at account creation time**
- Contact your Braze account manager to determine the optimal region based on your users' geography
- Region selection affects where user data is **processed and stored** (data sovereignty implications)

### Key Considerations

- **Data sovereignty**: Each region stores data within its jurisdiction — relevant for GDPR (EU), and other regional compliance requirements
- **Latency**: Choose the region closest to your primary user base
- **Scalability**: Multi-data-center architecture handles promotional surges without manual intervention
