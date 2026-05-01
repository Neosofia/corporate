[qms]: qms/glossary.md#quality-management-system-qms
[pol]: qms/policies.md
[blog-0005]: /blog/0005_beyond_mvc.md
[sop]:   qms/glossary.md#standard-operating-procedure-sop
[qms]:   qms/glossary.md#quality-management-system-qms
[lvl]: qms/glossary.md#compliance-levels
[proc]: qms/procedures/
[roles]: qms/roles.md

# Quality Management System (QMS)

The Neosofia QMS is the structured documentation layer for our quality, compliance, and operational controls.
It is organized around a single policy document, a glossary of terms, and a library of procedures that describe how work is meant to happen.

It contains:

- a single policy document: [Policies][pol]
- a glossary of defined terms: [Glossary](/qms/glossary/)
- a collection of procedures: [Procedures](/qms/procedures/)

All QMS content is stored as Markdown in git. That gives us:

- version history for every change
- reviewable pull requests instead of opaque PDFs or word documents
- a single source of truth for policy, procedure, and glossary updates

When a regulatory or audit-ready package is required, we use [Neosofia Docs](https://github.com/Neosofia/docs) to generate PDF output from the same Markdown source. For more background, see our blog post [Transforming the QMS Document Paradigm for SOPs](../blog/1100_gdp.md).
This lets us keep the authoring workflow in text while still producing formatted documents with:

- title page, version, and effective date
- table of contents
- headers, footers, and page numbering
- document change history and approvals

## QMS structure

- [Policies][pol]
- [Glossary](/qms/glossary/)
- [Procedures](/qms/procedures/)

## Related checklists

* [Level 1 Checklist](../resources/checklists/level1.md)
* [Level 2 Checklist](../resources/checklists/level2.md)
* [Level 3 Checklist](../resources/checklists/level3.md)
