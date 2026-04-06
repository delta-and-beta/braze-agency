---
name: personalization-engines-dynamic-yield
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalization_engines/dynamic_yield
indexed_at: '2026-04-05'
keywords:
  - personalization
  - recommendations
  - email
  - braze
  - targeting
  - algorithms
  - content
  - blocks
triggers:
  - embed dynamic yield in braze
  - create experience blocks
  - set up recommendations
  - configure dynamic content
  - personalize emails at open time
---
## Dynamic Yield Personalization Engine

Dynamic Yield (a Mastercard company) integrates with Braze to embed personalized **Experience Blocks** into email campaigns. Blocks are rendered at email-open time, enabling real-time personalization.

**Prerequisites:** Active Dynamic Yield account at `adm.dynamicyield.com`.

---

## Experience Block Types

| Block | Purpose |
|-------|---------|
| **Recommendations** | Algorithmically sourced personalized content; populated at open time |
| **Dynamic Content** | Audience/affinity-targeted promotions; winner determined at open time |

---

## Setup Workflow

### 1. Create an Experience Block
Navigate to **Email > Experience Emails > Create New**, then select **Create Experience Block**.

### 2. Configure Recommendations Block
1. Drag a Recommendations block into the email body
2. Select algorithm: popularity, user affinity, similarity, or others
   - **Popularity**: optionally shuffle to avoid repeat recommendations
   - **Similarity**: requires context items — add statically in builder or via merge tag in embed code (useful for shipping confirmation emails)
3. Optionally exclude already-purchased products
4. Add custom filter rules: pin products to slots, include/exclude by price, category, or other properties
5. Configure display: item template, item count, row count

### 3. Configure Dynamic Content Block
1. Drag a Dynamic Content block into the email body
2. Define design and content variables for the first variation; save
3. Set target audience in the Dynamic Content pane
4. Add additional variations for other audiences or fallback to all users
5. Set variation priorities (higher priority wins when user qualifies for multiple)

### 4. Set Up ESP Integration (Braze Token)
1. Click the **ESP Integration** icon on the Experience Email list page
2. Enter the Braze token that maps to the user's **CUID** and **Email ID**

### 5. Embed in Braze
1. In **Experience Emails**, click **Generate Code**
2. Click **Copy to Clipboard**
3. Paste the embed code into your Braze email campaign editor
4. Continue with standard Braze design, test, and publish workflow

---

## Key Behaviors

- Personalization resolves **at email open time**, not send time
- Code generation locks certain elements; other elements remain editable after generation
- URL parameters can be added to track clicks in analytics tools
- Attribute window options: **7 days** (default) or **1 day**
- After code is generated, only elements that [don't affect the code](https://support.dynamicyield.com/hc/en-us/articles/4404013832465-Experience-Email#h_01FAZPXB6MH094J1MWS5N86FXH) can be edited

`★ Insight ─────────────────────────────────────`
- The "render at open time" model is architecturally significant: it shifts personalization from a batch/send-time computation to a real-time lookup, making the Braze embed code essentially a placeholder that Dynamic Yield resolves on each open — this is why the integration only needs a CUID/Email ID token, not full profile data
- The two block types map to two distinct ML paradigms: Recommendations use collaborative/content-based filtering (user-item affinity), while Dynamic Content uses rule/segment targeting — knowing this distinction helps when debugging why a user sees one experience vs another
`─────────────────────────────────────────────────`
