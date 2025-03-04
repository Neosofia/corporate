<!---
Referenced Glossary Terms
-->
[eas]: /qms/glossary.md#enterprise-application-software-eas
[ds]:  /qms/glossary.md#data-sensitivity-levels
[dip]: /qms/glossary.md#data-integrity4
[sop]: /qms/glossary.md#standard-operating-procedure-sop
[sso]: /qms/glossary.md#single-sign-on-sso
[mfa]: /qms/glossary.md#multi-factor-authentication-mfa
[api]: /qms/glossary.md#application-programming-interface-api
[sms]: /qms/glossary.md#simple-messaging-service-sms
[ear]: /qms/glossary.md#encryption-at-rest-ear
[eif]: /qms/glossary.md#encryption-in-flight-eif
[eee]: /qms/glossary.md#end-to-end-encryption-eee
[tbd]: /qms/glossary.md#to-be-determined-tbd

<!---
Referenced Roles
-->
[sa]: /qms/roles.md#system-administrator-sa

<!---
External Links
Move to glossary?
-->
[soc2]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[iso]: https://www.iso.org/standard/27001

# Neosofia Policies

## Introduction

Welcome to the Neosofia Policies document. This document outlines the policies that Neosofia follows to ensure data integrity, security, and quality management across all its operations.

## Information Technology (IT)

### Design Principles
* Everything as Code (or config) (or markdown) in a public source code control system.
* Automate everything that can be automated.

### Data Integrity and Privacy (DIP)

The following policies are designed to ensure that all Neosofia data assets are protected from unauthorized or unintended data access or manipulation.

#### Level 1 DIP

Neosofia *must* adopt the following level one [DIP][dip] policies:

<!--- Proton Links --->
[psfg]: https://proton.me/support/sieve-advanced-custom-filters
[efe]: /email/expire_after_90_days.sieve
[pf]: https://account.proton.me/u/4/mail/filters
[eec]: /shared/images/evidence/ProtonEmail90DayFilter.png
[eet]: /shared/images/evidence/ProtonEmail90DayTest.png
[pmfag]: https://proton.me/support/two-factor-authentication-2fa
[pmfaa]: /shared/images/evidence/ProtonMFAAdmin.png

<!--- Zoom Links --->
[zcg]: https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060329
[zcws]: https://zoom.us/account/setting?tab=chat
[zces]: /shared/images/evidence/ZoomChat90DayPolicy.png
[zmfag]: https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066054
[zmfas]: /shared/images/evidence/ZoomMFAAdminSetting.png

<!--- Cloudflare Links --->
[cfmfag]: https://developers.cloudflare.com/fundamentals/setup/account/account-security/2fa/
[cfmfaa]: /shared/images/evidence/CloudFlareMFAAdmin.png
[cfmfas]: /shared/images/evidence/CloudflareMFASetup.png

<!--- OS Links --->
[winearg]: https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/
[macearg]: https://support.apple.com/guide/mac-help/protect-data-on-your-mac-with-filevault-mh11785/mac
[clevisg]: https://github.com/latchset/clevis
[luksg]: https://gitlab.com/cryptsetup/cryptsetup
[cleivs+luksg]: https://blog.dowhile0.org/2017/10/18/automatic-luks-volumes-unlocking-using-a-tpm2-chip/

[winble]: /shared/images/evidence/WindowsDesktopBitlocker.png
[macfve]: /shared/images/evidence/MacDesktopFileVault.png
[lukse]: /shared/images/evidence/PVE0001LUKS.png

[pveluksi]: /os/proxmox/pveSetup.sh

<!--- Neosofia Links --->
[sopsbr]: /website/procedures/IT-245-System%20Backup%20and%20Recovery.md

| ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Policy | SOP | Guides | Implementation | Evidence |
|-|-|-|-|-|-|
| POL-IT-0001 | All emails, without exception, will be deleted after 90 days | N/A | [Proton Sieve Filters][psfg] | [Proton Sieve Filter Code][efe], [Proton Filter List][pf], [Configured Filter Screen Shot][eec] | [Configured Filter Test][eet] |
| POL-IT-0002 | All chat messages, without exception, will be deleted after 90 days | N/A | [Zoom Team chat settings][zcg] | [Configured Chat Retention Screen Shot][zces] | [TBD][tbd] |
| POL-IT-0003 | All systems must have multifactor authentication (MFA) enabled. Authenticator apps with biometric verification are preferred for [MFA][mfa], with SMS as a fallback option if app-based MFA is not an option. | N/A | [Proton MFA][pmfag], [Zoom MFA][zmfag], [Cloudflare MFA][cfmfag] | [Proton MFA Global Setting][pmfaa], [Zoom MFA Global Setting][zmfas], [Cloudflare MFA Global Setting][cfmfaa]     | [TBD][tbd] | 
| POL-IT-0004 | Once per year, all documents not accessed or modified for over 365 days will be archived for long-term storage. Once per year, all long-term storage documents older than two years will be purged. This policy does not apply to financial or legal documents that must be retained for more than two years. | N/A | [TBD][tbd]: Currently confirming if Proton Drive supports data retention policy settings or tools to manually comply | [TBD][tbd] | [TBD][tbd]
| POL-IT-0005 | Neosofia will define and maintain system backup and recovery [SOP][sop]s to protect client, company, and employee data from loss, unintended manipulation, and improper data residency. The 3-2-1-1-0 backup principle will be employed for all data. | [System Backup and Recovery SOP][sopsbr] | N/A | [TBD][tbd] | [TBD][tbd] |
| POL-IT-0006 | All [EASs][eas] will employ encryption at rest and in flight. | [TBD][tbd]: add EAR and EIF to vendor qualification SOP.| N/A | N/A | N/A |
| POL-IT-0007 | All company workstations and servers will employ disk-level encryption to ensure all cached information saved from [EASs][eas] or entered by a client, is encrypted at rest | [TBD][tbd]: add to system administration SOP | [Windows BitLocker][winearg], Mac OS [FileVault][macearg], Linux [LUKS][luksg] + [Clevis][clevisg] | [PVE LUKS Setup Automation][pveluksi] | [Ben's Windows Desktop][winble], [Ben's Mac Desktop][macfve], [Neosofia PVE Server][lukse] |


#### Level 2 DI

In addition to the level 1 DI, Neosofia *should* adopt the following level two data integrity policies:

* All networking equipment will enforce [EIF][eif].
* [EAS][eas]s are accessed through a [SSO][sso] solution. An [EAS][eas] that does not support [SSO][sso] may be used if the data it manages is classified as [low sensitivity][ds].
* Passwords will be no less than 15 characters in length and rotated on an annual basis.
* Accounts will be locked after 5 failed login attempts and reset after 1 hour. Lockouts will alert all [SAs][sa].
* [API][api] Access tokens will be rotated on an annual basis.
* [MFA][mfa] must be app-based, not [SMS][sms] based.
* All company workstations will employ a 30-minute screen saver timeout to force re-authentication. For portable systems, lid shut events will force re-authentication, and all employees that leave their workstation unattended must lock the screen in public spaces.

* [EAS][eas]s must employ role-based access and follow the principle of least privilege.
* All company workstations will require username and password authentication to unlock the disk encryption.
* All employees will be trained on anti-phishing tactics.
* [EAS][eas]s must have audit trails and access logs pushed into a central location.
* Workstations will use sinkhole DNS providers for anti-malware protection.
* Workstations and servers will have security patches applied no less than once per month.
* All systems will employ UPS backup power systems and have graceful shutdown procedures defined/tested.
* All file-sharing activity will be logged.
* Documents may only be shared with internal company employees via pre-defined functional teams.
* If documents/data must be shared with clients, service providers, or external contractors, access must be password protected and limited to 28 days.

#### Level 3 DI

In addition to the level 1 and 2 DI policies, Neosofia will consider adopting the following level three data integrity policies:

##### Monitoring
* All system logins will be logged and analyzed for atypical access patterns (SIEM).
* All [EAS][eas]s will be logged and analyzed for atypical access patterns (SIEM).
* All logs will be monitored for PII leaks (SIEM).

##### Networking
* Zone-based networking must be employed (to keep evil printers at bay).
* IPS and IDS must be employed.
* Honeypots must be employed.
* Firewall with networking blocks for UN-sanctioned countries.
* RADIUS managed VLAN assignment and separation.
* Self-hosted services will be air-gapped from any third-party service providers.
* N+1 Firewall redundancy for all data centers and non-home offices.
* N+1 Power redundancy Dual UPS+independent power rails for all data centers and non-home offices.
* N+1 WAN redundancy for all data centers and non-home offices.
* Multi-zone and Multi-region operations for critical business functions.

##### Data Centers and Offices
* Biometric access and logging for all non-home locations.
* Camera monitoring with AI face detection and event analysis will be employed at all data centers and non-home offices.

##### Other
* [MFA][mfa] applications *must* be managed by Neosofia.
* All [EAS][eas]s will only be accessible from a company-approved/managed device.
* Outbound emails to external addresses may not have attachments.
* Workstations will not allow access to USB storage devices.
* Workstations will have antivirus software installed.


## Employee Experience (EE)

* EE will define [SOP][sop]s for recruiting, onboarding, and offboarding.
* EE will define training (LMS) and qualification (CV) management [SOP][sop]s.

## Quality Management (QM)

* In coordination with all BUs, QM will define a QMS that includes:
    * Incident Management [SOP][sop]s.
    * Document Management (GDP) [SOP][sop]s.
    * Vendor Management [SOP][sop]s.
    * Deviation Management [SOP][sop]s.
    * Risk Management [SOP][sop]s.
    * Records (evidence) Management [SOP][sop]s.
    * Quality Assurance including audit procedures and SMT oversight/responsibilities [SOP][sop]s.
* An employee with a QM role can not assume roles outside the QM department.

## Client Services (CS)

## Operations (OP)

### Ethics
* Fraud, Bribery, and Disclosure [SOP][sop]s.

### Continuity 
* Business Continuity [SOP][sop]s.

### Vendor Management

#### Vendor Qualification
* All third-party service providers must have a [SOC2][soc2] or [ISO 27001][iso] certification.
* All services must be manageable and observable via an API.
* Third-party services must have a "free" tier.
* Self-hosted services must have an active open-source community backing with a path to paid hosting options.
