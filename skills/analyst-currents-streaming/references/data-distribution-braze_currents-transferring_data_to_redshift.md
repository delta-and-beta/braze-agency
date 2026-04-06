---
name: data-distribution-braze_currents-transferring_data_to_redshift
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/braze_currents/transferring_data_to_redshift
indexed_at: '2026-04-05'
keywords:
  - redshift
  - currents
  - s3
  - etl
  - manifest
  - avro
  - iam
  - warehouse
  - loader
  - postgresql
triggers:
  - transfer currents data to redshift
  - load braze currents into redshift
  - redshift s3 loader setup
  - configure braze currents pipeline
  - how to set up redshift currents integration
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/` and are loaded at the Default depth (Sonnet) for fast lookups, so they must be self-contained
- The ETL pattern here (manifest table as idempotency guard) is a common warehouse loading idiom: track what's been loaded separately so you can re-run safely
- Avro field-to-column type mapping (`string→text`, `int→integer`) is a non-obvious requirement that belongs front-and-center in a reference file
`─────────────────────────────────────────────────`

## Transferring Braze Currents Data to Amazon Redshift

Braze Currents data is structured to load directly into Amazon Redshift from S3 via an ETL script (`s3loader.py`). Reference: [currents-examples GitHub repo](https://github.com/Appboy/currents-examples/tree/master/redshift-s3-loader).

---

## How the Loader Works

The script uses a **manifest table** in Redshift to track already-loaded files, enabling idempotent, incremental loads:

1. List all files in S3; diff against the manifest table to find new files
2. Generate a Redshift [manifest file](http://docs.aws.amazon.com/redshift/latest/dg/loading-data-files-using-manifest.html) for the new files
3. Execute a `COPY` query to load new files from S3 → Redshift
4. Insert loaded filenames into the manifest table
5. Commit

---

## Dependencies

```bash
pip install boto3
pip install psycopg2
```

---

## Required Permissions

### 1. Redshift IAM Role (S3 Read Access)
Create an IAM role that allows Redshift to execute `COPY` from S3. [AWS guide](http://docs.aws.amazon.com/redshift/latest/gsg/rs-gsg-create-an-iam-role.html). You'll pass its ARN to the loader as `role`.

### 2. VPC Inbound Rule (if Redshift is in a VPC)
In your Redshift cluster → VPC Security Groups → add inbound rule:
- **Type**: Redshift
- **Protocol**: TCP
- **Port**: your cluster port
- **Source**: loader server IP (or "Anywhere" for testing)

### 3. IAM User (S3 Full Access)
Create an IAM user with `AmazonS3FullAccess`. Used by the loader to read Currents files and write manifest files.

**Credential options** (in order of preference):
- Environment variables
- `~/.aws/credentials` shared credential file
- [AWS config file](http://boto3.readthedocs.io/en/latest/guide/configuration.html#configuring-credentials)
- Direct assignment to `aws_access_key_id` / `aws_secret_access_key` fields on `S3LoadJob` (**not recommended**)

---

## Configuration

### Redshift Connection
```python
host = '{YOUR_CLUSTER}.redshift.amazonaws.com'
port = 5439
database = '{YOUR_DATABASE}'
user = '{YOUR_USER}'
password = '{YOUR_PASSWORD}'
role = '{YOUR_REDSHIFT_ROLE_ARN}'
```

### Job Configuration
```python
s3_bucket = '{YOUR_CURRENTS_BUCKET}'
s3_prefix = '{YOUR_CURRENTS_PREFIX}'
redshift_table = 'content_card_impression'

# Column def must match Avro field names; type mapping: string→text, int→integer
redshift_column_def = [
    ('id', 'text'),
    ('user_id', 'text'),
    ('external_user_id', 'text'),   # nullable in Avro
    ('app_id', 'text'),
    ('content_card_id', 'text'),
    ('campaign_id', 'text'),        # nullable
    ('send_id', 'text'),            # nullable
    ('time', 'integer'),
    ('platform', 'text'),           # nullable
    ('device_model', 'text'),       # nullable
]

batch_size = 1000  # optional: copy N files per commit to avoid large single operations
```

**Key constraint:** The Redshift column definition must match Avro field names exactly. The loader uses Redshift's Avro `auto` option, so mismatches cause `COPY` failures.

---

## Full Sample

```python
if __name__ == '__main__':
    host = '{YOUR_CLUSTER}.redshift.amazonaws.com'
    port = 5439
    database = '{YOUR_DATABASE}'
    user = '{YOUR_USER}'
    password = '{YOUR_PASSWORD}'
    role = '{YOUR_REDSHIFT_ROLE_ARN}'

    aws_access_key_id = None       # use env vars or ~/.aws/credentials instead
    aws_secret_access_key = None

    cc_impression_redshift = RedshiftEndpoint(
        host, port, database, user, password,
        'content_card_impression',
        [('id','text'),('user_id','text'),('external_user_id','text'),
         ('app_id','text'),('content_card_id','text'),('campaign_id','text'),
         ('send_id','text'),('time','integer'),('platform','text'),('device_model','text')]
    )
    cc_impression_s3 = S3Endpoint('{YOUR_CURRENTS_BUCKET}', '{YOUR_CURRENTS_PREFIX}')

    job = S3LoadJob(cc_impression_redshift, cc_impression_s3, role,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key)
    job.perform()
```

---

## Key Notes

- The manifest table prevents duplicate loads on re-runs — safe to run repeatedly
- Use `batch_size` when file volume is large; the loader will commit incrementally
- Never hard-code AWS credentials in source code

`★ Insight ─────────────────────────────────────`
- The manifest table pattern is Nick's "idempotency at the loader layer" — analogous to how Nick's own pipeline checks freshness before re-fetching (Step 1: Discover)
- Avro's `auto` parsing mode in Redshift `COPY` relies on field-name matching, not positional — this is why the column def must mirror the schema exactly, a common gotcha
`─────────────────────────────────────────────────`
