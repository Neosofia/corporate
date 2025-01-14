# Neosofia Glossary and Architecture

## What is Compliance?

What would the world be like if there were no regulations or polices? Or put another way, what if there was nothing to comply with? Would we live in a world packed with snake oil vendors pedaling whatever wares possible to consumers despite their safety and efficacy? A world where technology companies use every scrap of information without our consent to push whatever products the highest marketing bidder can pay for? A world where the risk of being harmed while driving or taking public transit is a function of how much safety you can afford to pay for?

![Created using "DALL•E 3 XL v2" with the prompt "sketchy car with no body being driven by A frantic looking person while standing up"](../../shared/images/flintstones-car.png)[^credit]

Compliance is done to conform with regulations, polices, and standards, but the desired end result is a world where every human, regardless of their ability to pay, is 1) safe from harm 2) has a right to their privacy and 3) has the right to choose how they live their lives without infringing on 1 or 2 for anybody else.

When I hear compliance I think:
 * How can I make technology systems *secure* to protect each person's right to privacy
 * How can I produce a *safe and effective* product

When a "moral" company hears compliance, they think:
 * How can I minimize my IT expenses to comply with all the regulations applicable to us and protect my IP
 * How can I produce a safe and effective product for the lowest cost while remaining compliant

Amoral companies don't think about compliance. They view it as obstacle to selling more products with the highest margin possible without considering the implications. And sadly, companies like [Theranos](https://en.wikipedia.org/wiki/Theranos#Exposure_and_downfall) can be found in the news in what feels like an all to frequent basis these days.

This series of posts will blend the more human desire to provide a safe, effective, and secure product/service with the "moral" companies desire to comply with regulations at the lowest cost possible. When you see compliance -- think safe, effective, secure, and cost-efficient. Or

> Primum non nocere

First, do no harm.

> Secundo mihi pecuniam

Second, show me the money!

## Compliance From 30,000ft

If you're new to the world of compliance, please check out the [compliance terms](../../shared/glossary.md#compliance-terms) section of our glossary. As stated in our first post, some of the challenges associated with compliance lie within the interpretation of a regulation, procedures needed to comply, what evidence to gather, how to validate that the evidence is sufficient for an external auditor etc. Our mission is to streamline and automate these processes so you can focus on your companies core business. To demonstrate this concept, we'll work through the most common real world examples that apply to almost any industry that operates technology systems. We will tackle these examples in the order needed to create a company from the ground up. The first example will focus on system backup and recovery procedures (given its technical nature) then move into some more human procedures and polices concerning a quality management system.

The post below is a work in progress example of policies, procedures, and evidence as it relates to system backup and recovery -- a technical cornerstone for any business operating any technology system.

### System Backup and Recovery Example 

#### Policy

Neosofia will define and maintain system backup and recovery SOPs to protect client, company and employee data from loss, unintended manipulation, and improper data residency.

#### Related Regulations
 * GDPR Article 32
 * NIST SP 800-53 Section 3.6 Contingency Planning
 * Many many many more!

#### SOP

TBD: [IT-245-System Backup and Recovery.md](tbd)

#### Evidence

TBD: [link to policy validation service output](tbd)

When this work in progress example is complete, the not so secret sauce will lie in the policy validation service output as that will tie our evidence of compliance into all the regulations that require it. Neosofia has also elected to make this information public and has fully automated the backup and restoration test procedures so that evidence is continually generated whenever the implementation changes. This means that we will have full traceability between our policies, procedures, architecture, design, implementation, evidence, and the regulations that are applicable website in a publicly accessible that is available for review 24/7 by any entity.

After a rinse and repeat of the same working examples for several other areas of the business, Neosofia will apply for a validation certificate from an external entity whose auditors will only be pointed to this site to conduct their analysis and issue findings. Neosofia will respond to those findings until a validation certificate is issued by the TBD authority.

Before we finalize our first working example, let's quickly cover two more compliance cornerstones -- a centralized glossary and high level system architecture.

## Glossary

“A mistake is to commit a misunderstanding.”
-Bob Dylan

To minimize the chance of mistakes, our [glossary](../../shared/glossary.md) will include the terminology we wish to standardize to create a shared context for all. To emphasize used glossary terms, we will always link to the glossary when a defined phrase is presented and use the commonly accepted abbreviation.

## Architecture

At the foundation of any compliant [EAS](../../shared/glossary.md#EAS) lies a set of system architecture diagrams that defines how technology systems and system users interact with each other. To express these relationships, Neosofia has elected to adopt the C4 model and more specifically Structurizr to generate all architecture diagrams. 

The initial set of [EASs](../../shared/glossary.md#EAS) documented will include all the hardware and software needed to operate a minimally compliant technology organization including:
 * A Beelink EQ12 with N100 processor for the service defined below.
 * Proxmox for the host operating system
 * Cloudflare for public DNS
 * Let's Encrypt for SSL certificates
 * GitHub for [SCCS](../../shared/glossary.md#SCCS)
 * piHole for internal DNS and basic malware protection

And the initial set of compliance checks provided by our compliance service will include
 * Encryption in flight
 * Basic malware (sinkhole) protection via DNS
 * System Backup and recovery procedures per the example above

Our first end state will be a set of systems that are destroyed and programmatically rebuilt once per day. We rebuild daily to act as a forcing function that tests our backup and recovery procedures. 

 Most organizations run their compliance checks on a quarterly or yearly basis, which can quickly lead to a degradation of compliance or security. To avoid this drift in system state vs security/compliance, all Neosofia compliance checks will be run on a daily basis after the system restoration test. We will also (whenever possible) declaratively manage resources and validate system changes before deployment into a production environment.

To better understand the systems we'll first be working with, two C4 diagrams were created to better visualize our starting point. The first architecture diagram is a system landscape diagram that shows the role of each software system and how it relates to others systems and users. 

![System Landscape Diagram](../../shared/images/system-landscape-v1.svg)

Our second diagram show how systems are deployed from a physical and logical point of view with a description of the technologies used to provide the service in question.

![Deployment Diagram](../../shared/images/deployment-diagram-v1.svg)

## What's Next?

The [next post](1000_system_backup_and_recovery.md) in our series will go into more detail on our system backup and recover procedures that will become part of our broader business continuity plan.


## Deeper Dive

For interactive architecture diagrams that allow you to change the layout, zoom in/out of the various components, filter based on tags, and/or reveal regulatory perspectives for each system clone this repo and follow the instructions in the [architecture README](../../architecture/README.md)

To reproduce this setup, follow the instructions in the [Proxmox README](../../os/proxmox/README.md) setup guide. Upon finishing the guide, you should have fully functioning virtualization environment with backup and recovery procedures in place.

## A Request

As an organization we're on a mission to help any company of any size improve their compliance and this is why we've elected to make all of our polices, procedures, roles, glossary, evidence, design, and implementation open source. Most organizations today store this information in a private corporate data store and make evidence available for "on-site" review to protect their IP (which makes a lot of sense). As this repository is open source, you're free to use any content as you like. Our only (legally non-binding) request is that you cite [Neosofia](https://github.com/neosofia/corporate) in any public facing "thanks" or "powered by" section of your website should you use any of the content here. 

[^credit]: created using "DALL•E 3 XL v2" on Huggingface with the prompt "flintstones car driven by a frantic looking person" seed: 1059621461 no negative prompts