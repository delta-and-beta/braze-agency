---
name: administrative-privacy-spam_regulations
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/privacy/spam_regulations
indexed_at: '2026-04-05'
keywords:
  - spam
  - compliance
  - consent
  - regulations
  - email
  - SMS
  - CASL
  - CAN-SPAM
  - notifications
  - exemptions
triggers:
  - how to comply with spam laws
  - email compliance requirements
  - spam filter best practices
  - consent requirements for messaging
  - regional anti-spam regulations
---
`★ Insight ─────────────────────────────────────`
- Topic files in this system serve as **atomic knowledge units** nested under `skills/{skill-name}/references/` — they should be self-contained and scannable, not structured as navigational docs
- Stripping Jekyll template tags (like `{{site.baseurl}}`) is important here since these don't resolve outside the source docs context
- The goal is "condensed reference" not summary — preserve specifics (dates, organization names, rule numbers) that an agent would need to cite accurately
`─────────────────────────────────────────────────`

## Spam Regulations

Senders of email, push notifications, and SMS must comply with regional anti-spam laws. Laws vary by jurisdiction — always check [local regulations](https://en.wikipedia.org/wiki/Email_spam_legislation_by_country).

---

## CAN-SPAM (United States)

Applies to commercial email sent in the U.S. Enforced by the Federal Trade Commission.

**7 requirements:**
1. No false or misleading header info (`From`, `To`, `Reply-To`)
2. No deceptive subject lines
3. Identify the message as an advertisement
4. Include sender's physical address
5. Provide a clear opt-out mechanism
6. Honor opt-out requests promptly
7. Monitor third parties sending on your behalf

**Exemption:** Transactional emails are exempt from rules 2–7, but rule 1 (no false headers) still applies.

---

## Canadian Anti-Spam Law (CASL)

Effective July 1, 2014. Applies to email and push notifications sent to Canadian residents.

**Key requirement:** Recipients must provide **expressed or implied consent** before you communicate with them.

### CASL vs. CAN-SPAM

| | CASL | CAN-SPAM |
|---|---|---|
| Jurisdiction | Where message is **received** (affects non-Canadian senders) | Where sender is located |
| Consent model | **Opt-in** required | Opt-out allowed |

### Enforcement
- CRTC, Competition Bureau, and Office of the Privacy Commissioner may investigate and litigate
- After the transition period (ended July 1, 2017), individuals can also sue

### CASL Exemptions
- Messages opened outside Canada
- Messages to family/personal relations
- Messages to employees or contractors
- Warranty, product recall, safety, or security information for products the recipient used/purchased
- Factual notifications about subscriptions, memberships, or accounts
- Product/service delivery, including updates or upgrades

### Consent Types

**Implied consent** — may be legally valid in some jurisdictions but **is not sufficient for Braze**. Braze's Acceptable Use Policy requires explicit consent for all email and SMS/MMS.

**Express consent** — written or oral confirmation. The message requesting consent must clearly describe:
- Why consent is being sought
- The person or organization seeking it

---

## Spam Filters

No universal solution exists — each filter scores "spamminess" differently.

### Avoid spam filter triggers
- Superfluous HTML tags (e.g., from Microsoft Word)
- Abnormal text formatting
- Excessive `!` or `?` punctuation
- ALL CAPS text
- Known spam trigger words

Use multivariate (A/B) testing with varying content to identify deliverability issues.

### Build and maintain sender reputation
- Set clear expectations at sign-up (content type, frequency)
- Use a **double opt-in** process: send a confirmation email with a link after initial opt-in
- Ask users to add you to their address book
- Grow lists organically — purchased lists are often stale and damage reputation
- Implement a **sunset policy**: remove bouncing addresses regularly; bounce rates are a key ISP reputation signal
- Send consistently — long gaps cause recipients to forget you and mark as spam

---

## Channel-Specific Notes

### Email
List quality is critical. Bad addresses cause bounces, blocklisting, spam trap hits, and lower response rates. Regularly cull inactive addresses and remove obvious bounces.

**Opt-in models (from weakest to strongest list quality):**
- Opt-out (unchecked box) — weakest
- Opt-in (checked box)
- Confirm opt-in (thanks email with unsubscribe link)
- Double opt-in (email requiring click to confirm) — strongest

### iOS Push
Users are always prompted to opt-in via the iOS system dialog on first app open. All iOS push subscribers have explicitly opted in by definition.

### Android Push
Users are considered opted in by implied consent via privacy policy or EULA. Consider implementing an **explicit opt-in screen** on first launch to increase quality and transparency about notification types.
