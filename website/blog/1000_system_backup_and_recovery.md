# System Backup and Recovery

Whether you host services in the cloud or self-host, the vast majority (if not all) of regulations mandate that you must have well-defined system backup and recovery procedures that are tested periodically and can quickly restore user access to their data. Regulations aside, it's a good business practice to think through your operational dependencies and how you could recover from a loss of service. When most startups begin their technology journey, no thought is given to all the failure modes that can result in the loss of operations. And even if you start in the cloud, you don't magically get system backup and recovery for free!

This post will go into some of the failure modes that can interrupt business operations and explore how our [IT-245-System Backup and Recovery](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md) SOP addresses those failure modes.

## Background Reading

If you haven't already, please read our prior posts regarding our overall system [architecture](./0001_definitions_and_system_architecture.md#architecture) and a [broad](./0001_definitions_and_system_architecture.md#compliance-from-30000ft) overview of what compliance means.

## System Backup and Recovery SOP

Our [first SOP](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md) follows a traditional SOP format by defining a purpose, scope, roles, responsibilities, and procedures. However, the operational failure modes are what help us decide the assets we need to have defined procedures for. In the infancy stage of our development, these failure modes include:

* a single employee workstation having a meltdown
* a server hosting an [EAS](/shared/glossary.md#EAS) having a meltdown
* our public DNS system being compromised
* our source code control system being compromised
* our email, chat, document control systems being compromised
* our secrets storage systems being compromised
* our log servers being compromised

### Compute and Storage -- Hardware, OS, and VMs

We're covering the first two points under our [hardware](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md#hardware-procedures), [OS](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md#operating-system-procedures) and [virtual machine](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md#vm-procedures) procedures as we've architected our system to be an all-in-one system with employee workstations being on the same virtualization platform running our self-hosted [EASs](/shared/glossary.md#enterprise-application-software-eas).

Based on our system architecture, we've elected to use REAR for our host-level backup of the Proxmox OS to a USB stick, independent drives within our Beelink EQ12 to back up virtual machines and LXC containers onto, and OneDrive as our remote offsite storage facility. The SOP [IT-245-System Backup and Recovery](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md) procedures support a 3-2-1-1-0 strategy as we have three copies of all systems and data, on two mediums with one being offsite, one being "offline" (air gap to compute), and an integrity checking process that runs after every backup to ensure the media we're storing can be restored.

### Networking

The first iteration in this project is a single node in our business mesh network thus routing is limited to a single public access point for (http and https) services plus public DNS. The process diagram below helps us identify the data we need to back up in order to quickly recover from a compromise in our DNS or networking solutions.

![client server request diagram](/shared/images/client-server-request-process.svg)

Our procedures need to cover backup and restoration of the following data used to:
* translate our host name to an IP address (Cloudflare)
* protect our internal web services with firewall rules and routing

By walking through the process diagrams used to provide web services, it helps identify the data we need to protect and better define the procedures that will minimize business downtime and/or data loss. We highlight these procedures in the [networking procedures](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md#networking-procedures) section in the backup and recovery SOP.

### Email, Chat, and Document Storage

Neosofia has elected to use [Proton](https://proton.me/) and [Zoom](https://www.zoom.com/) for business communication services. Each of these organizations has been validated (via a vendor qualification process that is TBD) to ensure email, chat, phone, and document storage systems are protected against loss. Neosofia also has a 30-day retention policy for these systems so that these mediums are not treated as a long-term storage solution. This policy is a forcing function to ensure approved long-term storage mediums that fall under the backup and recovery SOPs are used.

Given the 30-day retention policy and as these vendors have been qualified, Neosofia will not develop system backup and recovery procedures for these services.

### Secrets

The loss of secrets used to encrypt data and access systems could lead to a catastrophic loss of the entire company. A loss event for these items could lead to a complete system data leak or total loss of access to the data as it could not be decrypted and processed.

### Logs

Logs help us understand what is happening in our environment and allow us to debug what went wrong in the event of an incident. We'll retain three months of log data at an offsite location to aid in investigations should our source systems become corrupted.

## Summary

By identifying the data assets we need to protect and by reviewing a common service access pattern, we developed a comprehensive SOP to ensure that all of our corporate and client data assets are backed up and that we can quickly restore services in the event of an unanticipated incident.

## Deeper Dive

TBD: Move to other blog posts covering QMS and OS topics

If you're taking the self-hosted journey along with us, you can reproduce the compute and storage section of this post by following the instructions in the [Proxmox README](/os/proxmox/README.md) setup guide. Upon finishing the guide, you should have a fully functioning virtualization environment with backup and recovery procedures in place.

Those of you that have worked with more traditional SOPs may have found them lacking as they typically don't point you to the actual architecture/design/implementation (if automated), evidence that the SOP is being followed, regulations that the SOP/evidence supports, etc. Our SOP enhances the traditional Word Doc SOP by:
* Directly linking to terms in a central glossary
* Directly linking to roles in a central role definition document
* Linking responsibilities to roles and job levels. Maybe we can programmatically generate JDs!
* Forcing us to think about the content vs spending hours trying to get Word to properly indent and number our sections :sob:
* Using signed commits to act as a *valid* electronic signature
* Using Git and GitHub metadata to act as a revision history and automatically version control the document. The change log is the commit history with exact diffs!
* SLOs to measure quality
* Tying a version-locked document generation tool (md to pdf) to produce exact (paper A4? Letter? Legal?) copies of SOPs as they existed at the point in time they were authored, reviewed, and approved including section numbering and change history authors, etc.

All the points above will be covered in future posts as we dive deeper into our quality management system.