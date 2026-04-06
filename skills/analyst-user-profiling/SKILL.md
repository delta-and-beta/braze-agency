---
name: analyst-user-profiling
description: 'User identification, attribute management, and data collection governance.'
metadata:
  role: braze-analyst
  topics:
    - analytics-setting-user-ids
    - analytics-setting-user-attributes
    - analytics-managing-data-collection
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill file uses **imperative/infinitive form** throughout ("Set the `external_id`..." not "You should set...") — a subtle but important convention because these files are consumed by AI, not humans, and direct instructions parse more reliably than advisory prose.
`─────────────────────────────────────────────────`

# User Profiling & Data Management

This skill governs how to identify users, enrich their profiles, and manage what data Braze collects — always balancing analytical completeness against data minimization principles. Apply it when designing user identity strategies, writing attribute-setting code, or advising on data governance tradeoffs.

---

## Scope

This skill synthesizes three interconnected concerns:

| Topic | What It Covers |
|---|---|
| **User IDs** | Establishing persistent identity via `external_id`, managing anonymous users, alias-based identity |
| **User Attributes** | Setting standard and custom attributes, data types, update semantics |
| **Data Collection Governance** | Controlling what Braze collects, SDK data controls, compliance considerations |

The **lens** throughout is data governance: every recommendation weighs analytical value against collection minimization, consent scope, and downstream compliance risk.

---

## User Identity: Setting User IDs

### The `external_id` Contract

Braze tracks users via an `external_id` — a stable, unique identifier owned by the implementation team (typically a database UUID or hashed email). Until an `external_id` is assigned, Braze generates an anonymous profile that:

- Cannot receive targeted campaigns
- Cannot be merged with server-side data imports
- Cannot be reliably de-duplicated across devices

To assign an `external_id`:

```javascript
// Web SDK
braze.changeUser("usr_abc123");

// iOS SDK
Appboy.sharedInstance()?.changeUser("usr_abc123")

// Server-side (REST)
POST /users/track
{ "external_id": "usr_abc123", ... }
```

**Governance considerations before assigning:**
- Avoid PII as `external_id` — use opaque internal IDs, not emails or phone numbers
- Once set, `external_id` is permanent for that profile; reassignment creates orphaned data
- Delay assignment until the user has consented to tracking where required by regulation

### Anonymous Users and Pre-identification

Anonymous profiles accumulate session data, events, and purchases before login. On identification, Braze merges the anonymous profile into the identified one — but **only forward from that point**; historical anonymous events are not retroactively associated.

Design pattern: capture meaningful funnel events on anonymous profiles so the merged profile has pre-registration behavioral context.

### User Aliases

User aliases provide a secondary identity layer — useful for:
- Identifying users before external_id is available (e.g., email-only leads)
- Cross-system correlation (e.g., Salesforce contact ID)

```javascript
braze.getUser().addAlias("salesforce_001", "salesforce_contact_id");
```

Aliases do not replace `external_id`; they supplement it. An alias pair is `(alias_label, alias_name)` — keep labels consistent across your integration or alias lookups will fail silently.

---

## User Attributes

### Standard vs. Custom Attributes

Braze provides built-in standard attributes (email, phone, first_name, language, country, etc.) with pre-built filtering support. Custom attributes extend the profile schema for domain-specific data.

**Setting standard attributes:**

```javascript
const user = braze.getUser();
user.setEmail("user@example.com");
user.setFirstName("Ada");
user.setLanguage("en");
user.setCountry("US");
```

**Setting custom attributes:**

```javascript
user.setCustomUserAttribute("subscription_tier", "pro");
user.setCustomUserAttribute("onboarding_completed", true);
user.setCustomUserAttribute("account_age_days", 42);
```

### Attribute Data Types and Update Semantics

Custom attributes support these types:

| Type | Notes |
|---|---|
| String | Max 255 characters; truncated silently if exceeded |
| Integer | Supports increment/decrement operations |
| Float | Use for monetary values with care — floating point precision applies |
| Boolean | Ideal for feature flags and consent tracking |
| Date | ISO 8601; used for time-based segmentation |
| Array | Max 25 elements; use for multi-value attributes like tag sets |

**Increment semantics** — for counters, prefer increment over set to avoid race conditions:

```javascript
user.incrementCustomUserAttribute("login_count", 1);
```

**Array operations** — arrays support add/remove rather than full replacement:

```javascript
user.addToCustomAttributeArray("interests", "photography");
user.removeFromCustomAttributeArray("interests", "gaming");
```

### Attribute Governance Checklist

Before adding a new custom attribute, evaluate:

1. **Necessity**: Is this attribute required for a defined campaign or segmentation use case?
2. **Sensitivity**: Does it encode health, financial, or protected-class data? If yes, apply stricter access controls and document the legal basis.
3. **Retention**: Is there a plan to unset or expire this attribute when it becomes stale?
4. **Duplication**: Does a standard attribute already serve this purpose?

Avoid creating attributes "in case they're useful later." Unneeded attributes accumulate, inflate storage costs, and create compliance surface area.

---

## Data Collection Governance

### SDK Data Controls

Braze SDKs collect data automatically by default. Governance posture requires explicitly disabling collection that isn't needed.

**Disable location tracking (if not used for geofencing/campaigns):**

```javascript
// Web SDK — disable automatic location collection
braze.initialize("API_KEY", {
  enableGeolocation: false
});
```

**Control session tracking:**

```javascript
// Manual session handling for kiosk/shared-device scenarios
braze.openSession();
braze.closeSession();
```

**Wipe user data on logout (shared devices or strict consent models):**

```javascript
braze.wipeData();  // Deletes local SDK data; does not delete server-side profile
```

Note: `wipeData()` removes the local `device_id` and generates a new anonymous identity on next launch. Use deliberately — it breaks continuity for returning users on personal devices.

### Consent and Data Subject Rights

For GDPR/CCPA compliance workflows:

- **Right to erasure**: Use the `/users/delete` REST endpoint, not SDK calls. SDK-side wipe only clears local state.
- **Marketing opt-out**: Set `email_subscribe` / `push_subscribe` attribute to `"unsubscribed"` — do not delete the profile, as that loses suppression state.
- **Consent timestamps**: Store as custom date attributes (`gdpr_consent_at`, `ccpa_opt_out_at`) so consent history is queryable.

### What Not to Collect

Apply this filter before instrumenting any attribute or event:

- **No raw PII as attribute values** where an opaque ID suffices
- **No sensitive inferences** (health conditions, political views, religion) unless legally permissible and explicitly consented to
- **No redundant duplicates** of data already in your warehouse — Braze is an activation layer, not a source of truth

---

## Common Patterns and Anti-Patterns

### Pattern: Lazy Identification

Assign `external_id` only after explicit authentication, not on first app open. Capture funnel events on the anonymous profile until the user authenticates, then call `changeUser()` once.

### Pattern: Attribute Hygiene via Unset

Stale attributes mislead segmentation. Unset attributes when they no longer apply:

```javascript
user.setCustomUserAttribute("trial_active", null);  // Unsets the attribute
```

### Anti-Pattern: Email as `external_id`

Using email as `external_id` creates problems when users change their email — the profile becomes orphaned. Use a stable internal UUID and store email as a standard attribute.

### Anti-Pattern: Over-instrumentation

Tracking every conceivable user action inflates event volume costs and complicates data models. Define a tracking plan before instrumenting — instrument against campaign and analytics requirements, not as a "collect everything" strategy.

---

## Governance Decision Framework

When advising on user data decisions, apply this sequence:

1. **What is the activation use case?** (Campaign targeting, personalization, analytics)
2. **What is the minimum data required for that use case?** (Prefer narrow over broad)
3. **What is the legal basis for collection?** (Consent, legitimate interest, contract)
4. **What is the retention and deletion plan?** (Define before collecting)
5. **Is Braze the right store?** (Operational data → Braze; analytical history → warehouse)

`★ Insight ─────────────────────────────────────`
The governance framework above follows a **data minimization-first** ordering — use case before collection, not collection before use case. This inverts the common anti-pattern of "collect everything, figure out usage later," which is both costly in Braze (event/attribute volume billing) and a compliance liability.
`─────────────────────────────────────────────────`
