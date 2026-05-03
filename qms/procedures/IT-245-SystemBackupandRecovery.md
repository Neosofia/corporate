<!--- Internal Links --->
[rpo]:  qms/glossary.md#recovery-point-objective-rpo
[rto]:  qms/glossary.md#recovery-time-objective-rto
[rp]:   qms/glossary.md#retention-period
[oc]:   qms/glossary.md#online-copy
[full]: qms/glossary.md#full-copy
[incr]: qms/glossary.md#incremental-copy
[tbd]:  qms/glossary.md#to-be-determined-tbd

[sa]:   qms/roles.md#system-administrator-sa
[itm]:  qms/roles.md#it-manager
[itm-lvl]: qms/roles.md#itm-levels
[sa-lvl]:  qms/roles.md#sa-levels

<!--- External Links --->
[os-setup]: https://github.com/Neosofia/infrastructure/blob/main/hypervisor/proxmox/9/rearSetup.sh

# System Backup and Recovery SOP

## Purpose

Establish a systematic approach to data backup and recovery to prevent loss, enable rapid restoration and maintain data integrity for all Neosofia IT systems.

## Scope

This SOP applies to any IT system that manages Neosofia client or corporate data.

[hwp]: #hardware-procedures
[osp]: #operating-system-procedures
[vmp]: #vm-procedures
[netp]: #networking-procedures
[scp]: #source-code-procedures
[logsp]: #log-file-procedures
[credsp]: #credential-procedures
### Assets in Scope

Each of the assets below will have an entry in this SOP that outlines the backup and recovery procedures Neosofia employs to protect client and corporate data.

Data/Support Asset         | [RPO][rpo] | [RP][rp] | [RTO][rto] | [OC][oc]
---------------------------|------------|----------|------------|---------------------------------
[Hardware][hwp]            | N/A        | N/A      | 2 hours    | N/A
[Operating Systems][osp]   | 1 day      | 7 days   | 1 hour     | 1 [full][full] + 6 [incr.][incr]
[Virtual Machines][vmp]    | 1 day      | 28 days  | 1 hour     | 1 full + 27 incr.
[Public DNS Records][netp] | N/A        | N/A      | 1 hour     | N/A
[Source Code][scp]         | 1 week     | 25 years | 1 hour     | N/A
[System Logs][logsp]       | N/A        | 30 days  | N/A        | N/A
[Credentials][credsp]      | 1 hour     | 1 year   | 1 hour     | 1 full

## Responsibilities

[IT System Administrators][sa] will be responsible for
* [L4][sa-lvl] Architecture, design, implementation, and execution of the procedures outlined in this document.
* [L3][sa-lvl] System monitoring to determine if restoration procedures need to be executed on
* [L2][sa-lvl] Documentation of the backup and restoration procedure execution as evidence for auditors
* [L1][sa-lvl] Provide feedback on this document

[IT Managers][itm] will be responsible for 
* [L4][itm-lvl] Review of this document no less than once per year
* [L4][itm-lvl] Respond to and integrate feedback into this document
* [L3][itm-lvl] Review of this document when new IT systems are [procured][tbd] or [retired][tbd] to determine the system backup and restoration procedures that may require an update
* [L4][itm-lvl] Advise and mentor [IT System Administrators][sa] in their responsibilities.

## Procedures 

### Hardware Procedures

Neosofia will maintain a 2% hardware inventory reserve to recover from hardware losses or will define procedures below to enable cloud resources to be used as a temporary replacement for system restoration. 

### Operating System Procedures
 
#### Backup

When provisioning a new piece of hardware, the [IT System Administrators][sa] runs the [OS setup script][os-setup] that creates an OS level backup cron job to be run automatically starting at 2AM UTC every day. The automated backup script will:

1. Create a full OS level snapshot and on-device (USB stick) rescue media needed to restore the system in the event of a hardware failure
1. Reboot the device into the rescue media's automated restora tion program
1. Upon system restoration and reboot, the restoration logs are sent to the central log service
1. If the daily OS backup procedure completes without errors, a status report is automatically sent to the central log server. If any errors occur, an email is sent to all [IT System Administrators][sa] with details of the error to be remediated.

Automated backup and system restoration should take no more than 15 minutes 99% of the time

#### Recovery

Upon notification of a system failure, the [IT System Administrators][sa] will

1. Identify and replace defective hardware
1. Boot the machine from the restoration media (USB Stick)
1. The restoration procedure should begin automatically. If the restoration procedures requests input due to hardware changes, contact a [L3][sa-lvl] IT system Administrator or higher for guidance on appropriate inputs.
1. If successful, confirm the automated restoration logs were sent to the central log server. if the automated restoration process fails contact a [L4+ SA][sa-lvl] to troubleshoot the error.
1. Update the inventory management system and procure replacement hardware if the stock level falls below 2%. 
 
### VM Procedures

[TBD][tbd]


[ui]: https://unifi.ui.com/ 
### Networking Procedures

### Backup

All network configurations are automatically backed up on a weekly basis by the networking equipment vendor. When a new piece of networking equipment is acquired, follow the procedures below to ensure the device is being backed up.

1. Log into the [networking management interface][ui] and navigate to the system backup setting
1. Ensure the system backup checkbox is checked and click the back up now button
1. Observe that no errors are reported upon backup and verify that the device is writing to the central log server

### Restore

In the event of a networking equipment failure, follow the following steps

1. Replace the failed device with the same model 
1. Log into the [networking management interface][ui] and navigate to the settings panel of the new device
1. from the existing device configuration menu, select the failed device profile and apply it to the new device.



[script]: https://github.com/Neosofia/corporate/blob/main/.github/workflows/gl-push.yml
[pr]: qms/glossary.md#pull-request-pr
[scs]: qms/glossary.md#source-control-system-scs
[pb]: qms/glossary.md#protected-branch
### Source Code

#### Backup

Whenever a [pull request][pr] is merged into a [protected branch][pb] an [automated script][script] pushes changes to a secondary [SCS][scs] vendor.

#### Restoration

Should the primary [SCS][scs] vendor be compromised in such a way that the source files can not be restored to their original state, the restoration procedures below should be initiated.

1. Checkout the git repository from the secondary [SCS][scs] vendor
1. Create a new (blank) repository in the primary [SCS][scs] vendor
1. push the git repository from the secondary vendor into the newly created repo on the primary vendor
1. Make a test pull request against the primary repository and merge
1. Observe that the changes to the primary repo are synced to the secondary repo
1. if the test succeeds, notify all members of the repository that it has been restored and that all changes should be submitted to the primary repository. If the test fails, notify your manager and troubleshoot failures with them until there is resolution.

### Log File Procedures

All log files are pushed to an immutable central log server and retained for 30 days.

### Credential Procedures

[TBD][tbd]
