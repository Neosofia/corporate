# QMS Document Generation

This directory contains the local QMS document generation tooling.

The `generate.bash` script sources `website/qms/doc/.env` for local document generation settings.

Create or update `website/qms/doc/.env` with values like:

```env
COMPANY="Neosofia"
DISCLAIMER="This document is for internal use only."
WATERMARK="Official Copy"
WEBSITE_BASE_DIR="/"
WEBSITE_BASE_URL="http://localhost:3000/"
SCCS_BASE_URL="https://github.com/Neosofia/corporate"
```

Variable meanings:

* `COMPANY` — company name used in generated document metadata.
* `DISCLAIMER` — disclaimer text added to generated documents.
* `WATERMARK` — watermark text displayed in generated PDFs.
* `WEBSITE_BASE_DIR` — base path used when rewriting local Markdown links.
* `WEBSITE_BASE_URL` — public website base URL for rewritten links in generated docs.
* `SCCS_BASE_URL` — source-control URL prefix used for changelog and signature links.

`SCCS_BASE_URL` can be provided either as the repository root URL or as the repository commit URL.
The script will normalize:

* `https://github.com/Neosofia/corporate` → `https://github.com/Neosofia/corporate/commit/`
* `https://github.com/Neosofia/corporate/commit` → `https://github.com/Neosofia/corporate/commit/`
* `https://github.com/Neosofia/corporate/commit/` → unchanged

`SCCS_BASE_URL` may be provided with or without a trailing slash; the script normalizes it automatically.
`WEBSITE_BASE_URL` should be configured in the exact form you want used for rewritten links.

The script already has defaults for `COMPANY`, `DISCLAIMER`, `WATERMARK`, and `WEBSITE_BASE_DIR`, but `WEBSITE_BASE_URL` and `SCCS_BASE_URL` should be configured for correct generated links.
