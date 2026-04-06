---
name: intelligence-suite-tutorial
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/intelligence_suite/tutorial
indexed_at: '2026-04-05'
keywords:
  - timing
  - selection
  - canvas
  - optimization
  - personalization
  - variants
  - testing
  - delivery
  - messaging
  - intelligence
triggers:
  - when to send messages
  - which message to send
  - combine intelligent timing and selection
  - optimize promotion delivery
  - test message variants
---
## Intelligence Suite Tutorial: Quick Service Restaurant

Practical walkthrough using Intelligent Timing and Intelligent Selection together in a Canvas to send personalized, optimized promotions.

### Scenario

SandwichEmperor wants to promote a limited-time menu item (Royal Roast) via Canvas using two Intelligence Suite features.

---

### Step 1: Intelligent Timing (When to Send)

- **Purpose:** Analyzes each user's past interactions with the app and each messaging channel to select the optimal send time per user.
- **Result:** Different users receive the promotion at different times (e.g., afternoon vs. evening) based on their individual behavior.
- **Fallback:** Configure a fallback time for users with insufficient interaction history — typically the most popular app usage time across all users.
- **Where:** Set in the delivery settings of a Canvas Message step.

---

### Step 2: Intelligent Selection (Which Message to Send)

- **Purpose:** A/B tests multiple message variants and auto-optimizes sends toward the best performer over time.
- **Setup:** Three variants tested — push notification, email, SMS.
- **Cadence:** Analyzes performance twice daily; gradually increases sends to the winning variant.
- **Convergence:** Once a winner is determined with statistical confidence, 100% of sends go to that variant.
- **Where:** Configured in the A/B Testing section of a Canvas with Intelligent Selection enabled.

---

### Step 3: Launch

With both features active, the Canvas self-optimizes across two dimensions simultaneously:
- **Timing** — per-user optimal send window
- **Messaging** — best-performing content variant

No manual intervention needed post-launch; the system shifts send distribution automatically.

---

### Key Takeaways

| Feature | Optimizes | Mechanism |
|---|---|---|
| Intelligent Timing | *When* to send | Per-user historical behavior analysis |
| Intelligent Selection | *What* to send | Continuous A/B performance evaluation |

Both features can run concurrently in the same Canvas without conflict.

---

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are "atomic knowledge units" — they should be self-contained and answerable without other context, which is why the table summarizing both features at the end is more valuable here than in the original narrative doc.
- The original doc uses Jekyll template syntax (`{% image_buster ... %}`) for images — stripping these is correct since they resolve to nothing outside the Braze docs site and would clutter the topic file.
- The two-dimension framing (timing + content) is the core insight worth preserving — it makes this tutorial useful as a reference for *why* you'd combine these features, not just *how*.
`─────────────────────────────────────────────────`
