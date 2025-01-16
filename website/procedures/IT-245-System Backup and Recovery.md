# System Backup and Recovery

## Purpose

Establish a systematic approach to data backup and recovery to prevent loss, enable rapid restoration and maintain data integrity

## Scope

This SOP applies to any information system that manages Neosofia client or corporate data.

### Assets in Scope

Each of the assets below will have an entry in this SOP that outlines the backup and recovery procedures Neosofia employs to protect client and corporate data. The table below uses the following glossary terms and abbreviations.

* [Recovery Point Objective (RPO)](/shared/glossary.md#recovery-point-objective-rpo)
* [Recovery Time Objective (RTO)](/shared/glossary.md#recovery-time-objective-rto)
* [Retention Period (RP)](/shared/glossary.md#retention-period)
* [Online Copies (OC)](/shared/glossary.md#online-copy)
* [Full Copy (full)](/shared/glossary.md#full-copy)
* [Incremental Copy (incr.)](/shared/glossary.md#incremental-copy)
* [Live Copy (live)](/shared/glossary.md#live-copy)


Data/Support Asset         | RPO    | RP       | RTO     | OC
---------------------------|--------|----------|---------|------------------
[Hardware](#hw)            | N/A    | N/A      | 2 hours | N/A
[Operating Systems](#os)   | 1 day  | 7 days   | 1 hour  | 1 full + 6 incr.
[Virtual Machines](#vm)    | 1 day  | 28 days  | 1 hour  | 1 full + 27 incr.
[Public DNS Records](#dns) | N/A    | N/A      | 1 hour  | N/A
[Source Code](#sc)         | 1 week | 25 years | 1 week  | 1 full


## Responsibilities

The [IT System Administrators](/shared/roles.md#system-administrator-sa) will be responsible for
* [L4](#job-level-tbd) Architecture, design, implementation, and execution of the procedures outlined in this document.
* [L3](#job-level-tbd) System monitoring to determine if restoration procedures need to be executed on
* [L2](#job-level-tbd) Documentation of the backup and restoration procedure execution as evidence for auditors
* [L1](#job-level-tbd) Provide feedback on this document

The [IT Managers](/shared/roles.md#it-manager) will be responsible for 
* [L4](#job-level-tbd) Review of this document no less than once per year
* [L4](#job-level-tbd) Respond to and integrate feedback for this document
* [L3](#job-level-tbd) Review of this document when new IT systems are [procured](#tbd) or [retired](#tbd) to determine the system backup and restoration procedures that may require an update
* [L4](#job-level-tbd) Advise and mentor [IT System Administrators](/shared/roles.md#system-administrator-sa) in their responsibilities.

## Procedures 


### Hardware Backup Procedures <a id="hw"></a>

Neosofia will maintain a 2% hardware inventory reserve to recover from hardware losses or will define procedures below to enable cloud resources to be used as a temporary replacement for system restoration. 


### Operating System Procedures <a id="os"></a>

#### OS Backup Procedure

When provisioning a new piece of hardware, the [OS setup script](/os/proxmox/rearSetup.sh) will automatically set up an OS level backup procedure to be run on a daily basis. Evidence that the script was successfully run can be found in the [system backup and recovery](#tbd) section of the evidence portal.

##### Entry Criteria

Rolling OS level backup procedures begin automatically starting at 2AM UTC

##### Backup Procedure and Automated Restoration Test

> [!NOTE]
> These procedures are executed programmatically on a daily basis

1. Create a full OS level snapshot and on-device (USB stick) rescue media needed to restore the system in the event of a hardware failure
1. Reboot the device into the rescue media's automated restoration program
1. Upon system restoration and reboot, upload the restoration logs into the evidence portal

##### Exit Criteria

If the daily OS backup procedure completes without errors, a status report is automatically sent to the evidence portal. If any errors occur, an email is sent to all [IT System Administrators](/shared/roles.md#system-administrator-sa) with details of the error to be corrected

##### SLOs
* automated backup and system restoration should take no more than 15 minutes 99% of the time


#### OS Restoration Procedure

##### Entry Criteria

Upon notification of a system failure or data loss

##### Procedure
1. replace defective hardware
1. start machine into system restoration device
1. ???