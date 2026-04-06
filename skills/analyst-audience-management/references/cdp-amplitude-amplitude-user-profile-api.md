---
name: cdp-amplitude-amplitude-user-profile-api
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/amplitude/amplitude_user_profile_api
indexed_at: '2026-04-05'
keywords:
  - profile
  - recommendations
  - cohort
  - user_properties
  - computations
  - device_id
  - amplitude
  - userprofile
  - control
  - items
triggers:
  - get user profile
  - fetch recommendations
  - retrieve cohort membership
  - get user properties
  - check recommendation results
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are loaded at runtime based on routing depth
- Stripping Jekyll templating (`{% raw %}`, `{: .reset-td-br-1}`) and consolidating scattered endpoint tables is the key preprocessing work here
- Keeping JSON examples verbatim preserves the most actionable information — they're harder to reconstruct from prose than parameter descriptions
`─────────────────────────────────────────────────`

---

## Amplitude User Profile API

Base URL: `https://profile-api.amplitude.com/v1/userprofile`

Serves user profiles including user properties, computed properties, cohort memberships, and recommendations. Intended for use with Connected Content calls.

---

### Request Parameters

| Parameter | Default | Description |
|---|---|---|
| `user_id` | — | External database user ID. Required unless `device_id` is set. |
| `device_id` | — | Anonymous device ID. Required unless `user_id` is set. |
| `get_recs` | `false` | Return recommendation results for this user. |
| `rec_id` | — | Recommendation ID(s) to retrieve. Required if `get_recs=true`. Comma-separate multiple IDs. |
| `rec_type` | — | Override experimental control: `model` (modeled recs) or `random` (random recs). |
| `get_amp_props` | `false` | Return full set of user properties (excludes computations). |
| `get_cohort_ids` | `false` | Return list of cohort IDs the user belongs to (only cohorts configured for tracking). |
| `get_computations` | `false` | Return all enabled computations for this user. |
| `comp_id` | — | Return a single computation by ID. Returns `null` if not found. Ignored if the computation is archived/deleted. |

### Response Fields (Recommendations)

| Field | Description |
|---|---|
| `rec_id` | The requested recommendation ID. |
| `child_rec_id` | Internal sub-recommendation ID used for A/B testing; usually matches `rec_id`. |
| `items` | List of recommended items for this user. |
| `is_control` | `true` if user is in the control group. |
| `recommendation_source` | Model name that generated the recommendation. |
| `last_updated` | Unix timestamp when recommendation was last generated and synced. |

---

### Endpoints & Examples

#### Get a recommendation

```
GET /v1/userprofile?user_id=testUser&get_recs=true&rec_id=testRecId
```

```json
{
  "userData": {
    "recommendations": [
      {
        "rec_id": "testRecId",
        "child_rec_id": "testRecId",
        "items": ["cookie", "cracker", "chocolate milk", "donut", "croissant"],
        "is_control": false,
        "recommendation_source": "model",
        "last_updated": 1608670720
      }
    ],
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": null,
    "cohort_ids": null
  }
}
```

#### Get multiple recommendations

Comma-separate `rec_id` values:

```
GET /v1/userprofile?user_id=testUser&get_recs=true&rec_id=testRecId,testRecId2
```

Each recommendation appears as a separate object in the `recommendations` array.

#### Get user properties

```
GET /v1/userprofile?user_id=testUser&get_amp_props=true
```

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "library": "http/1.0",
      "first_used": "2020-01-13",
      "last_used": "2021-03-24",
      "number_property": 12,
      "boolean_property": true
    },
    "cohort_ids": null
  }
}
```

#### Get cohort IDs

```
GET /v1/userprofile?user_id=testUser&get_cohort_ids=true
```

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": null,
    "cohort_ids": ["cohort1", "cohort3", "cohort7"]
  }
}
```

#### Get a single computation

```
GET /v1/userprofile?user_id=testUser&comp_id=testCompId
```

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-2": "3"
    },
    "cohort_ids": null
  }
}
```

#### Get all computations

```
GET /v1/userprofile?user_id=testUser&get_computations=true
```

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-1": "5000000.0",
      "computed-prop-2": "3"
    },
    "cohort_ids": null
  }
}
```

---

**Notes:**
- Computed properties are returned inside `amp_props`, not as a separate field.
- Cohort tracking is opt-in per cohort — `cohort_ids` will be `null` for untracked cohorts.
- `amp_props` is `null` unless `get_amp_props=true` or a `comp_id` is specified.

`★ Insight ─────────────────────────────────────`
- The original Jekyll table classes (`{: .reset-td-br-1}`) are presentation-only artifacts — stripping them makes the content portable across any Markdown renderer
- Combining "single computation" and "all computations" examples side-by-side makes it immediately clear that computed props surface inside `amp_props`, which is non-obvious from the prose alone
- The "Notes" footer captures cross-cutting behavioral rules that were implicit across multiple sections — surfacing them explicitly prevents gotcha bugs in integration code
`─────────────────────────────────────────────────`
