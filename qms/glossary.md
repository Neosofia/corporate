# Neosofia Glossary

## General Terms

### To Be Determined (TBD)

TBD is used to introduce an idea that is intended to be proven or confirmed as true, indicating that further evidence or proof is needed. For Neosofia it is a placeholder to indicate that upon request, evidence for the supported policy or procedure can be demonstrated. Also, an alias for to be demonstrated or to be done. 

### Keep it Simple Stupid (KISS)

A design principle that emphasizes simplicity and clarity in design and systems.

### Do Not Repeat Yourself (DRY)

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. [^dry]

### Enterprise Application Software (EAS)

> Computer software used to satisfy the needs of an organization rather than its individual users. [^eas]

#### EAS Examples
 * Business intelligence (BI)
 * Content Management System (CMS)
 * Customer Relationship Management (CRM)
 * Database Management System (DBMS)
 * Enterprise Resource Planning (ERP)
 * Enterprise Asset Management (EAM)
 * Human Resource Management (HRM)
 * Knowledge Management (KM)
 * Product Lifecycle Management (PLM)
 * Supply Chain Management (SCM)
 * Software Configuration Management (SCM) - such as Version Control System (VCS)
 * Intrusion Detection Prevention (IDS) - and by extension Intrusion Prevention System (IPS)
 * Security Information Event Management (SIEM)


## Compliance Terms

### Minimal Viable Compliance (MVC)

The smallest set of policies any organization of any size in any industry should consider implementing for their organization. This is also known as level 1 compliance.

#### Compliance Levels

The classification of policies and procedures into three compliance levels to simplify the policy/regulation/industry matrix. The levels are

* Level 1: The policies and procedures any organization should adopt if they're collecting non-public data of any kind.
* Level 2: The policies and procedures any organization that deals with PII should adopt. For example, collecting data for the purpose of marketing on your website (PII), technology (SaaS) providers operating in lightly regulated industries, or any small business with employees beyond the owners.
* Level 3: Specialized organizations operating in heavily regulated industries. Healthcare, banking, transportation, and power are some sectors that typically fall into level 3 compliance as they often have the most number of regulations governing them. [^regsbysector]

### Quality Management System (QMS)

A formalized system that documents processes, procedures, and responsibilities for achieving quality policies and objectives. It helps coordinate and direct an organization’s activities to meet customer and regulatory requirements and improve its effectiveness and efficiency on a continuous basis.

#### Plan Do Check Act (PDCA)

An iterative four-step management method used in business for the control and continuous improvement of processes and products. It is also known as the Deming Cycle or Shewhart Cycle.

1. **Plan**: Identify an opportunity and plan for change.
2. **Do**: Implement the change on a small scale.
3. **Check**: Use data to analyze the results of the change and determine whether it made a difference.
4. **Act**: If the change was successful, implement it on a wider scale and continuously assess your results. If the change did not work, begin the cycle again.

PDCA is a simple yet powerful tool for driving continuous improvement in organizations.

Neosofia may also use the acronym PIE-ME (Plan, rapid Implementation, Experiment, Measure, Evaluate) to separate the rapid and highly iterative nature of the PIE phase from the longer term ME phase of measurement and evaluation. This fail-fast approach for the PIE phase may lead to several failed experiments, but those that do pass also benefit from the rigor of the more traditional PDCA cycle. Also, it's :pie:


#### Elements of a QMS

* Quality policies
* Quality objectives
* Organizational structure and responsibilities
* Data management
* Processes and procedures
* Continuous improvement
* Document control
* Internal audits
* Corrective and preventive actions

### Policy (POL)

> A deliberate system of guidelines to guide decisions and achieve rational outcomes. A policy is a statement of intent and is implemented as a procedure or protocol. A rule created by an organization to achieve their goals. [^pol]

### Regulation (REG)

A policy, typically authored by a government body, that must be complied with in order to do business in the market/region to which the policy applies. Some regulations act as a gate to do business while others can be ignored with the risk of fines and sanctions.

#### Examples
* HIPAA
* GDPR
* COPPA
* SOC
* OSHA
* HITECH (Act)

### Procedure (PROC)

A set of steps taken to achieve a desired outcome

### Standard Operating Procedure (SOP)

An approved procedures employees must follow. In addition to procedures, SOPs will typically include entry/exit criteria, assigned roles, responsibilities, purpose, scope/limitations and [SLOs](#service-level-objective-slo) for determining How Who does What and When.

### Evidence

Proof that a policy or procedure is being followed

### Validation (VAL)

Evaluation of evidence to determine if it is accurate and reliable to prove compliance.

NOTE: Validation != Testing.

### Audit

Validation of a system or multiple systems (set of evidence). Audits can be internal or external from the organizations point of view.

## Customer Service Terms

This section of the glossary is for terms used in the context of providing clients with a measurable level of quality.

### Service Level Indicator (SLI)

> A measure of the service level provided by a service provider to a customer. [^sli]

#### SLI Examples
 * Web page response time
 * Customer support ticket response time


### Service Level Objective (SLO)

> Target value or range of values for a service level that is measured by an [SLI](#service-level-indicator-sli). [^slo] 

#### SLO Examples
 * 99% of web page response times are less than 500ms
 * 99% of customer support tickets are handled in less than 24hrs

### Service Level Agreement (SLA)

> An agreement between a service provider and a customer. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user. [^sla]

#### SLA Examples
* If the service provider does not meet their web page response time for one calendar month, the client will be refunded 5% of their monthly application support fee.
* If the service provider does not meet their customer support ticket handling time for one calendar month, the client will be refunded 5% of their monthly professional service support fee.


## Information Technology Terms 

### Terms Specific to Neosofia Services

#### Industry

The sector of an economy made up of manufacturing enterprises. Examples include:
 * finance
 * healthcare
 * textile

#### Sub-sector

An area of economic activity that forms part of one of the larger areas into which the economic activity is divided. Examples include:
  * healthcare - pharma, medical devices, provider, payer, etc.
  * finance - retail banking, business banking, investment banking, etc.

#### Business Operations

Activities that businesses engage in on a daily basis to increase the value of the enterprise and earn a profit. Subcategories include regions where:
* your employees work
* you provide services
* you provide goods
* you manufacture goods
* you source materials
* you do R&D
* you're publicly traded


#### Hard/Soft Validation

A hard validation is one that can be proven true based on the evidence. For example, if a policy implies TLS version 1.1 and the evidence service gathers the TLS version, the version that the given URL provides can be directly compared to the policy. Soft policies cannot be proven true and must be validated by a human. For example, policies requiring SOPs can be a soft validation with a link to the SOP.

#### Internal/External Validation

An external validation is one that can be performed from the public internet. For example, testing that the company's public-facing website conforms to a set of policies vs internal validations like testing disk encryption inside a company's cloud provider or data center.

#### Push/Pull Validation

A pull validation is one that is initiated by the validation service. For example, getting the TLS version from a company's public-facing website is a pull validation. An example of push validation would be a system backup and recovery execution log being pushed into the evidence service.


### Role Based Access Control (RBAC)

A method of regulating access to computer or network resources based on the roles of individual users within an enterprise. Users are assigned roles, and roles are assigned permissions to perform certain operations.

### Software Development Lifecycle (SDLC)

A process used by the software industry to design, develop, and test high-quality software. The SDLC aims to produce high-quality software that meets or exceeds customer expectations, reaches completion within times and cost estimates.

### Computer Systems Validation (CSV)

The process of ensuring (and documenting) that a computer-based system will produce information or data that meets a set of defined requirements. It is commonly used in regulated industries to ensure compliance with regulations.

### Data Integrity

The accuracy and consistency of data stored in a database, data warehouse, or other construct. It is a critical aspect of the design, implementation, and usage of any system that stores, processes, or retrieves data.


#### Data Loss Prevention (DLP)

> A strategy for ensuring that sensitive data is not lost, misused, or accessed by unauthorized users. DLP software products use business rules to classify and protect confidential and critical information so that unauthorized end users cannot accidentally or maliciously share data whose disclosure could put the organization at risk. [^dlp]

#### Data Sensitivity Levels

* Low: Public information, marketing materials, press releases
* Medium: Internal communications, company intellectual property, project documentation
* High: Personally identifiable information (PII), health records, financial data, trade secrets

### Encryption at Rest (EAR)

The protection of data that is stored on a disk (including solid-state drives) or backup media. It ensures that data is unreadable to unauthorized users when it is not being accessed or used.

### Encryption in Flight (EIF)

The protection of data that is being transmitted over a network. It ensures that data is unreadable to unauthorized users while it is being sent from one location to another.

### End-to-End Encryption (EEE)

A method of data transmission where only the communicating users can read the messages. In principle, it prevents potential eavesdroppers – including telecom providers, Internet providers, and even the provider of the communication service – from being able to access the cryptographic keys needed to decrypt the conversation.

### Application Programming Interface (API)

A set of rules and definitions that allows software programs to communicate with each other. APIs are used to enable the integration of different systems and to allow third-party developers to create applications that can interact with other software.

### Simple Messaging Service (SMS)

A text messaging service component of most telephone, Internet, and mobile device systems. It uses standardized communication protocols to enable mobile devices to exchange short text messages.

### Source Code Control (SCC)

The practice of tracking and managing changes to software code. Source code control systems are used to keep track of modifications to code, allowing multiple developers to collaborate on a project without overwriting each other's work.

### Continuous Integration and Continuous Delivery (CI/CD)

A method to frequently deliver apps to customers by introducing automation into the stages of app development. The main concepts attributed to CI/CD are continuous integration, continuous delivery, and continuous deployment.

### Single Sign On (SSO)

An authentication process that allows a user to access multiple applications with one set of login credentials. SSO is a common feature in enterprise environments, where users may need to access a variety of different systems and applications.

### Multi-Factor Authentication (MFA)

A security system that requires more than one method of authentication from independent categories of credentials to verify the user’s identity for a login or other transaction. MFA combines two or more independent credentials: what the user knows (password), what the user has (security token), and what the user is (biometric verification).

### System Backup and Recovery

The process of creating and storing copies of data that can be used to protect organizations against data loss. Recovery involves restoring the data from the backup to its original or a new location in the event of data loss.


#### Retention Period

The minimum amount of time backup data must be saved for.

#### Recovery Point Objective (RPO)

> The point in time that the restarted infrastructure will reflect, expressed as "the maximum targeted period in which data (transactions) might be lost from an IT service due to a major incident". [^backup]

#### Recovery Time Objective (RTO)

> The amount of time elapsed between disaster and restoration of business functions. [^backup]

#### Online Copy

A copy of live data that is available to the device that manages the data in question. 

#### Offline Copy

An immutable copy of live data typically used for data restoration when the live and online copies of the data have become corrupted.

#### Full Copy

A complete snapshot of the data including metadata needed to restore it.

#### Incremental Copy

An incremental backup stores data changed since a reference point in time. The reference point is relative to the most recent full copy of the data 

#### Live Copy

A real time copy of live data. This most common example is two hard drives in a mirrored RAID 1 array.

#### Continuous Data Protection (CDP)

> A backup that instantly saves a copy of every change made to the data. This allows restoration of data to any point in time and is the most comprehensive and advanced data protection. Near-CDP backup applications—often marketed as "CDP"—automatically take incremental backups at a specific interval, for example every 15 minutes, one hour, or 24 hours. They can therefore only allow restores to an interval boundary. [^backup]



[^eas]: https://en.wikipedia.org/wiki/Enterprise_software "EAS"

[^sli]:https://en.wikipedia.org/wiki/Service_level_indicator "SLI"

[^slo]:https://en.wikipedia.org/wiki/Service-level_objective "SLO"

[^sla]:https://en.wikipedia.org/wiki/Service-level_agreement "SLA"

[^dlp]: https://en.wikipedia.org/wiki/Data_loss_prevention_software "DLP"

[^pol]:https://en.wikipedia.org/wiki/Policy "POL"

[^backup]: https://en.wikipedia.org/wiki/Backup "Backup"

[^regsbysector]: https://www.lisam.com/news/10-most-regulated-industries-in-the-us/ "10 Most Regulated Industries in the U.S."

[^dry]: https://en.wikipedia.org/wiki/Don't_repeat_yourself "DRY"