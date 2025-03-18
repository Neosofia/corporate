[glos]: /website/qms/glossary.md
[pol]: /website/qms/policies.md
[blog-0005]: /blog/0005_beyond_mvc.md

[sop]:   /website/qms/glossary.md#standard-operating-procedure-sop
[qms]:   /website/qms/glossary.md#quality-management-system-qms
[qmsel]: /website/qms/glossary.md#elements-of-a-qms
[mfa]:   /website/qms/glossary.md/#multi-factor-authentication-mfa
[eas-ex]: /website/qms/glossary.md#eas-examples
[gdp]:   /website/qms/glossary.md#good-documentation-practices-gdp
[capa]:  /website/qms/glossary.md#corrective-action-and-preventative-action-capa

[lvl]: /website/qms/glossary.md#compliance-levels
[inf]: /website/qms/glossary.md#formal-vs-informal-procedures
[sop-sbr]: /website/qms/procedures/IT-245-SystemBackupandRecovery.md

[lic]: https://github.com/Neosofia/corporate/blob/main/LICENSE
[iso9001]: https://www.iso.org/standard/62085.html

# Quality Management System (QMS)

Per our [glossary][glos], a QMS is

> A formalized system that documents processes, procedures, and responsibilities for achieving quality [policies][pol] and objectives. It helps coordinate and direct an organization’s activities to meet customer and regulatory requirements and improve its effectiveness and efficiency on a continuous basis.

If you read our blog post regarding our definition of the three [levels of compliance][blog-0005], a [QMS][qms] is typically defined for some [level two][lvl] organizations and most [level three][lvl] organizations. Some [level one][lvl] organizations could benefit from standardizing company procedures like onboarding, accounting, technical system administration, etc. but having a formal [SOP][sop] with formalized training is typically not needed.

From the definition of the [elements of a QMS][qmsel], we typically advise our clients at each of the following levels to implement the following.

## Level One Organization Checklist

When a level one client reaches out to us, we advise them to complete the checklist below to start their compliance journey. Based on the response to the first question, we'll go deeper into the types of data that are stored which almost always involves PII in the form of name, email and phone number for [CRM][eas-ex] purposes. The first questions also facilitates a conversation around the technical systems that need to be secured.

Almost every company we work with is different based on their region, industry, subsector, and services they provide. Regardless of this diversity, we've crafted template polices and procedures that you can use as a starting point to go on your compliance journey. However, If you choose to use these templates without any consulting agreement with us, they come without any type of warranty per our [license][lic].

- Identify all information flow to determine the technical systems that need to be secured
- Enable [MFA][mfa] for all technical systems
- identify region/industry specific employee management regulations and define [informal][inf] onboarding and offboarding procedures to increases process consistency and regulatory compliance
- identify and link to guides concerning accounting procedures to follow based on your region/industry
- define and test informal [system backup and recovery procedures][sop-sbr]
- If you have a website, add a privacy policy indicating how you can/will use your client's data.

This entire process typically takes one or two days of effort spread over the course of a week to achieve, and the outcome is a significantly securer company that is protecting not only their employee and client interests, but also their own.

## Level Two Organization Checklist

Level two organizations are typically rapidly growing technology companies that are looking to enter into the medium and large size market, but are being blocked by vendor qualification criteria requiring SOC2 or ISO-27001. These standards mandate many aspects of a QMS and IT security best practices. 

In general, the following policies, procedures, and documentation must be created to:

- Ensure documents are controlled per a standard such as [GDP][gdp] or [ISO 9001][iso9001]
- Formalize employee training via an [LMS][eas-ex]
- Define organization mission/vision, structure, roles, and responsibilities. 
- Facilitate internal and external audits
- Continually improves the organization through [CAPAs][capa]
- Ensure operational consistency in the form of change control procedures
- Support traceability through complete audit trails that are always tied to a person, time, detailed changes, and reason for the change
- Create a secure operating environment through the adoption well established security standards
- Manage risk


Depending on your industry, region, subsector, company size, etc. some combination of the above points will be focused on more than others, but in general you must ensure that your employees are:
- Qualified to execute on the responsibilities for their assigned roles when hired
- Trained on all the documents above per their assigned roles
- Retain proof of procedural execution of SOPs (optional for some L2 organizations)


## Level Three Organization in General

Level three organizations are where the compliance volume is cranked up to 11. The best way to summarize a level three organizations is to make a general statement that every action needed to achieve something takes no fewer than three people. Here are some examples:

 * To create or update any controlled document you need an: Author, Reviewer and Approver (GDP)
 * To make any change to a software system, you need a: Product owner, Engineer, and QC. (SDLC/CSV)
 * To update any "medium/high" risk change on any "high" risk IT system you need a unique person to: Initiate/Author, Review, Approve, Implement, and Verify the CR.

In addition to the separation of responsibilities you must also follow the principle of least privilege throughout all of your [EASs][eas-ex] and provide evidence that your procedures were executed as indicated in the SOPs. We won't create a checklist here as level three organizations will typically have their own industry specific checklist to go through which will be covered in future [blog][/blog/] posts.


