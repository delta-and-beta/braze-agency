---
name: data-distribution-export_braze_data-opening_csv_reports_in_excel
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/opening_csv_reports_in_excel
indexed_at: '2026-04-05'
keywords:
  - CSV
  - Excel
  - XLSX
  - Import
  - Formatting
  - Delimiters
  - Conversion
  - Reports
  - Data
  - Wizard
triggers:
  - how to open CSV in Excel
  - convert CSV to XLSX
  - fix leading zeroes in user IDs
  - import CSV preserving format
  - set Excel as default application
---
## Opening CSV Reports in Excel

CSV files may open in Excel by default, but if not, set Excel as the default application:
- **Windows:** [Change default programs](https://support.microsoft.com/en-us/windows/change-which-programs-windows-7-uses-by-default-62fd162f-8c82-0436-806f-c60d69dcf495)
- **Mac:** [Choose an app to open a file](https://support.apple.com/guide/mac-help/choose-an-app-to-open-a-file-on-mac-mh35597/mac)

### Convert CSV to XLSX/XLS

To convert a CSV to Excel format or remove comma delimiters from data, use the [AbleBits CSV Import Wizard guide](https://www.ablebits.com/office-addins-blog/convert-csv-excel/#import-csv-wizard).

### Leading Zeroes Stripped from User IDs

**Problem:** Excel treats CSV numeric values as numbers, stripping leading zeroes from user IDs (e.g., `007` becomes `7`).

**Fix:** Use the [Excel Text Import Wizard](https://www.ablebits.com/office-addins-blog/converting-csv-excel-issues/#leading-zeros) to import the CSV and set the affected column type to **Text**, preserving leading zeroes.
