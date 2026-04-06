---
name: export-custom-attributes-get-custom-attributes
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/custom_attributes/get_custom_attributes
indexed_at: '2026-04-05'
keywords:
  - attributes
  - custom
  - export
  - pagination
  - cursor
  - endpoint
  - metadata
  - REST
  - API
  - list
triggers:
  - export custom attributes
  - get custom attributes
  - retrieve custom attributes
  - list custom attributes
  - paginate attributes
---
## Get Custom Attributes

**Endpoint:** `GET /custom_attributes`

Export a list of custom attributes recorded for your app. Returns attributes in groups of 50, sorted alphabetically.

**Required permission:** `custom_attributes.get`

---

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `cursor` | Optional | String | Pagination cursor for retrieving subsequent pages |

---

### Example Requests

**Basic request:**
```bash
curl --request GET 'https://rest.iad-01.braze.com/custom_attributes' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**With pagination cursor:**
```bash
curl --request GET 'https://rest.iad-03.braze.com/custom_attributes?cursor=c2tpcDow' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "message": "success",
  "attributes": [
    {
      "array_length": 100,
      "data_type": "Number",
      "description": "The attribute description",
      "name": "The attribute name",
      "status": "Active",
      "tag_names": ["Tag One", "Tag Two"]
    }
  ]
}
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `array_length` | Number or null | Maximum array length (null if not applicable) |
| `data_type` | String | Attribute data type |
| `description` | String | Attribute description |
| `name` | String | Attribute name |
| `status` | String | Attribute status (e.g., `"Active"`) |
| `tag_names` | Array of strings | Tags associated with the attribute |

---

### Pagination

Each call returns up to 50 attributes. Use the `Link` response header to get the cursor for the next page, then pass it as the `cursor` query parameter.
