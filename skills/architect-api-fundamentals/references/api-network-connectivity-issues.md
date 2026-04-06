---
name: api-network-connectivity-issues
source_url: 'https://braze-inc.github.io/braze-docs/_api/network_connectivity_issues'
indexed_at: '2026-04-05'
keywords:
  - DNS
  - CDN
  - Firewall
  - TLS
  - Connectivity
  - Network
  - MTR
  - iptables
  - Fastly
  - Cloudflare
triggers:
  - How to diagnose API connectivity issues
  - Fix firewall blocking API calls
  - Configure DNS for API endpoints
  - Test network connectivity with MTR
  - Troubleshoot TLS/HTTPS connection failures
---
## API Network Connectivity Issues

### DNS Configuration

Braze API endpoints use a CDN (Fastly) that routes to the nearest POP based on DNS. Use DNS servers co-located with your server and with correct IP location metadata — avoid generic public DNS that may route inefficiently.

### Firewall & TLS Issues

Firewalls that intercept or modify HTTPS/TLS traffic will break Braze API connections.

**Fixes:**
- Disable HTTPS/TLS acceleration or modification on your firewall/router
- Allowlist outbound traffic to `fastly.com`

### iptables

SYN/ACK/RST packet filtering via iptables can cause connectivity failures. Allowlist outbound traffic to `fastly.com` to resolve.

### Allowlisting IP Ranges

Retrieve current IP ranges from:
- **Fastly**: `https://api.fastly.com/public-ip-list`
- **Cloudflare**: `https://api.cloudflare.com/client/v4/ips`

> Note: These IPs change over time — do not hardcode them.

### Diagnosing Persistent Issues

When filing a support request, include:
1. **MTR test** results — run from the affected server, not a dev machine
2. **Fastly Debug** output (`http://www.fastly-debug.com/`)
3. **Network capture** (tcpdump / `.pcap`) if obtainable

**MTR tooling by OS:**
| OS | Resource |
|----|----------|
| GNU/Linux | `mtr` via package manager; see DigitalOcean MTR guide |
| macOS | `brew install mtr` |
