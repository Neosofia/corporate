# System Backup and Recovery SOP

## Purpose

Establish a systematic approach to data backup and recovery to prevent loss, enable rapid restoration and maintain data integrity for all Neosofia IT systems.

## Scope

This SOP applies to any IT system that manages Neosofia client or corporate data.

### Assets in Scope

Each of the assets below will have an entry in this SOP that outlines the backup and recovery procedures Neosofia employs to protect client and corporate data. The table below uses the following glossary terms and abbreviations.

* [Recovery Point Objective (RPO)](/shared/glossary.md#recovery-point-objective-rpo)
* [Recovery Time Objective (RTO)](/shared/glossary.md#recovery-time-objective-rto)
* [Retention Period (RP)](/shared/glossary.md#retention-period)
* [Online Copies (OC)](/shared/glossary.md#online-copy)
* [Full Copy (full)](/shared/glossary.md#full-copy)
* [Incremental Copy (incr.)](/shared/glossary.md#incremental-copy)

Data/Support Asset         | RPO    | RP       | RTO     | OC
---------------------------|--------|----------|---------|------------------
[Hardware](#hw)            | N/A    | N/A      | 2 hours | N/A
[Operating Systems](#os)   | 1 day  | 7 days   | 1 hour  | 1 full + 6 incr.
[Virtual Machines](#vm)    | 1 day  | 28 days  | 1 hour  | 1 full + 27 incr.
[Public DNS Records](#net) | N/A    | N/A      | 1 hour  | N/A
[Source Code](#sc)         | 1 week | 25 years | 1 week  | 1 full
[System Logs](#logs)       | 15 min | 28 days  | 1 hour  | 1 full
[Credentials](#creds)      | 1 hour | 1 year   | 1 hour  | 1 full

Neosofia will store one offline copy of each asset above

## Responsibilities

The [IT System Administrators](/shared/roles.md#system-administrator-sa) will be responsible for
* [L4](/shared/roles.md#sa-levels) Architecture, design, implementation, and execution of the procedures outlined in this document.
* [L3](/shared/roles.md#sa-levels) System monitoring to determine if restoration procedures need to be executed on
* [L2](/shared/roles.md#sa-levels) Documentation of the backup and restoration procedure execution as evidence for auditors
* [L1](/shared/roles.md#sa-levels) Provide feedback on this document

The [IT Managers](/shared/roles.md#it-manager) will be responsible for 
* [L4](/shared/roles.md#itm-levels) Review of this document no less than once per year
* [L4](/shared/roles.md#itm-levels) Respond to and integrate feedback for this document
* [L3](/shared/roles.md#itm-levels) Review of this document when new IT systems are [procured](#tbd) or [retired](#tbd) to determine the system backup and restoration procedures that may require an update
* [L4](/shared/roles.md#itm-levels) Advise and mentor [IT System Administrators](/shared/roles.md#system-administrator-sa) in their responsibilities.

## Procedures 


### Hardware Procedures <a id="hw"></a>

Neosofia will maintain a 2% hardware inventory reserve to recover from hardware losses or will define procedures below to enable cloud resources to be used as a temporary replacement for system restoration. 

### Operating System Procedures <a id="os"></a>

#### OS Backup Procedure

When provisioning a new piece of hardware, the [OS setup script](/os/proxmox/rearSetup.sh) will automatically set up an OS level backup procedure to be run on a daily basis. Evidence that the script was successfully run can be found in the [system backup and recovery](#tbd) section of the evidence portal.

##### Entry Criteria

Rolling OS level backup procedures begin automatically starting at 2AM UTC

##### Backup Procedure and Automated Restoration Test

> [!NOTE]
> These procedures are executed programmatically on a daily basis and should not be manually executed

1. Create a full OS level snapshot and on-device (USB stick) rescue media needed to restore the system in the event of a hardware failure
1. Reboot the device into the rescue media's automated restoration program
1. Upon system restoration and reboot, upload the restoration logs into the evidence portal

##### Exit Criteria

If the daily OS backup procedure completes without errors, a status report is automatically sent to the evidence portal. If any errors occur, an email is sent to all [IT System Administrators](/shared/roles.md#system-administrator-sa) with details of the error to be remediated.

##### SLOs
* automated backup and system restoration should take no more than 15 minutes 99% of the time


#### OS Recovery Procedure

##### Entry Criteria

Upon notification of a system failure or data loss.

##### Procedure
1. Identify and replace defective hardware
1. Start machine into system restoration device (F7 or F11 key for most systems)
1. The restoration procedure should begin automatically. If the restoration procedures requests input due to hardware changes, contact a [L3](/shared/roles.md#sa-levels) IT system Administrator or higher for guidance on appropriate inputs.
1. Upon restoration, confirm the restoration evidence was uploaded to the portal.

##### Exit Criteria

if the automated restoration process fails an error email will be sent to all [IT System Administrators](/shared/roles.md#system-administrator-sa)

### VM Procedures <a id="vm"></a>

#### VM Backup Procedure

TBD

#### VM Restoration Procedure

TBD

### Networking Procedures <a id="net"></a>

#### Networking Backup Procedure

TBD

#### Networking Restoration Procedure

TBD

### Source Code Procedures <a id="sc"></a>


#### SC Backup Procedure

TBD

#### SC Restoration Procedure

TBD

### Log File Procedures <a id="logs"></a>


#### Log Backup Procedure

TBD

#### Log Restoration Procedure

TBD

### Credential Procedures <a id="creds"></a>


#### Credential Backup Procedure

TBD

#### Credential Restoration Procedure

TBD


## Policies Supported

* [Neosofia System Backup and Recovery](/shared/policies.md#system-backup-and-recovery)

## Regulations Supported 
 * GDPR Article 32
 * NIST SP 800-53 Section 3.6 Contingency Planning
 * Many more to be documented in the validation service
