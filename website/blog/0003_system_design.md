# System Design

With any software system, it's critical to think through the UX, architecture, and design before implementation.

## Summary

Let's recap the prior posts before defining some new terms for our glossary.

* The UX should present the fewest number of questions to configure the service. When the validation process is run, it should create a fully traceable and actionable report (key issues reported first) that enables the user to quickly resolve compliance issues and conduct audits.
* The services should be open source and prioritize a self-hosted model while also offering paid hosting options.
* The design should enable the services to handle any company of any size in any industry.

## New Glossary Terms

### Hard/Soft Validation

A hard validation is one that can be proven true based on the evidence. For example, if a policy implies TLS version 1.1 and the evidence service gathers the TLS version, the version that the given URL provides can be directly compared to the policy. Soft policies cannot be proven true and must be validated by a human. For example, policies requiring SOPs can be a soft validation with a link to the SOP.

### Internal/External Validation

An external validation is one that can be performed from the public internet. For example, testing that the company's public-facing website conforms to a set of policies vs internal validations like testing disk encryption inside a company's cloud provider or data center.

### Push/Pull Validation

A pull validation is one that is initiated by the validation service. For example, getting the TLS version from a company's public-facing website is a pull validation. An example of push validation would be a system backup and recovery execution log being pushed into the evidence service.

## Design Considerations

Overall, we want to make the process of becoming and proving your compliance require a minimal amount of effort so that your initial set of audits don't end up looking like a scene where the shinny package you give to the auditor is missing several key features which then turns into an atomic bomb of audit findings.

![Atomic Gift](/shared/images/atomic-gift-exchange.png)[^credit]

### Example

The simple TLS example in our last post is what we consider a "hard external pull" validation as you can gather the evidence from outside the company network and test the result against a very specific requirement of TLS 1.2 or higher. A soft validation is when you can't test the policy against a specific expectation. An example of "soft internal" validation would be GDPR having the hidden implication that you should have a well-defined [System Backup and Recovery SOP](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md). When setting up your company, we may ask -- please enter the location of your system backup and recovery SOP to which you may respond `https://SomeInternalFileSystem.com/QMS/SOPs/Current/IT-B&R.doc` which the evidence service cannot access (as it's internal) and even if it was externally accessible, we can't validate the SOP as being sufficient to satisfy a regulation. However, providing the URL does add value as it is sufficient to soft check the regulation and make it easy for any auditor to quickly access the thing you claim satisfies the regulation.

### Internal vs External

One of the biggest challenges to overcome in policy validation software is where your services need to run. If we only ran our services in the cloud, we could only validate the things that are public-facing which for most organizations is just the tip of the compliance iceberg. Even inside a company, there are many zones in which a policy service would have to operate for workstations, labs, test environments, DMZ, production, Wi-Fi APs, and printers. Each zone has rules that *should* prevent a hacked printer from overtaking machines in our production environment. That's not to say we can't get value from having external validations and traceability between regulatory requirements and internally accessible resources, but to hit 100% validation with minimal effort, we need to support internally running evidence nodes that can take configuration information from the cloud node (or be pre-configured in an air gap situation) and report evidence back to the public-facing node.

There are many programs today that can run inside a protected/internal network that gather the information needed to prove compliance that we may consider integrating with, but for now, we'll make the design decision that our evidence service will need to have the ability to be pre-configured, deployed into a protected network, and either report findings back to a central service or store the evidence on the service itself for later review and integration.

### Push vs Pull

Ideally, all of our checks would be a pull style so that we can gather evidence without modifying existing [EASs](/shared/glossary.md#enterprise-application-software-eas) to push evidence into the service. For any organizations that are unwilling or unable to install an evidence service into their protected networks, modifications to existing [EASs](/shared/glossary.md#enterprise-application-software-eas) could push the needed evidence into the service. This is not ideal as every system wishing to adopt the push method would have to be modified to do so requiring significant effort by system administrators within the organization. The fallback to pushing evidence into the service would simply be linking to results of the running processes/procedures output. This adds value by creating traceability to the protected resources that could be made available for onsite inspection.

For example, our system backup and recovery SOP states or links to the implementation that enables us to back up each virtualization environment (Proxmox) every day using REAR. A natural byproduct of the backup and restoration procedures are the logs and exit code for the process. If Neosofia wanted to provide evidence that backup and recovery procedures were being successfully run we can do one of the following things:
* Point the evidence service to the central log location for all the backup and restoration tests. This requires our system administrators to put all the log files in a central location.
* Have each backup and restoration script push evidence into the evidence service. This would require all our system administrators to maintain hooks to push into the evidence service.
* Annotate in the evidence service the process for how to find the logs and validate them. For Neosofia, this might be a statement like "To validate system backup and recovery tests, log into the machine in question and inspect the `/var/log/rear.log` file."

Every choice is a tradeoff between implementation, system security, and rigor of the check. For Neosofia, we'll be electing to take the first option by pushing all of our automated procedures into a central log location which the evidence service will have access to parse through and validate. Should central logging not be an option, we'll elect to use the third option by providing instructions on how to manually validate the records.

### Hard vs Soft

The easiest design consideration by far is hard vs soft validations. If a validation can be proven without any chance of forgery or misrepresentation (e.g. TLS version >= 1.2) then it will be a hard validation. If it's a soft validation (e.g. your privacy policy contains the phrase "Data Protection Officer" or "contact us") we will design the system in such a way that enables us to improve the "hardness" of the validation over time.

> [!NOTE]
> Future versions of the evidence service may support storing API tokens to access protected/internal resources and may even apply string matching rules for documents like SOPs to help make soft validations harder. Until AI gets a lot smarter, we'll always have soft validations that require humans to validate.

## Summary

Based on all the design considerations above, we've elected to use the following technologies.

For the policy validation service, we've elected to use [Cedar](https://www.cedarpolicy.com/) as it supports customized schemas and stores relationships as a directed graph. For the evidence gathering service, we've elected to use [Ruby on Rails](https://rubyonrails.org/) for its ease of implementation, industry support, and extensive package set (Gems) that enables us to gather evidence from the widest range of resources possible. And for the website, we've elected to use [React](https://react.dev/) + [tailwindcss](https://tailwindcss.com/) because why would you use anything else for a front end ;)

## What's Next

Now that we have our first simple TLS example fully implemented in the validation and evidence services, all we need to do is:
* Add dozens of industries and subsectors to the evidence service
* Add hundreds of regions to the evidence service
* Add thousands of regulations that apply to a set of regions, industries, and subsectors to the validation service
* Add thousands of rules that apply to a set of regulations to the validation service
* Build the front end with a very slick UX
* Automate 90% of our own business operations with corresponding blog posts to explain why
* Build our own compliant data center/hosting/office environments + blog posts
* Write dozens of SOPs + blog posts
* And many more!

Wow! That's a lot of stuff. Where should we even begin? The [next post](./0004_mvc.md) in our series will explore the concept of minimal viable compliance (MVC) and the policies that apply to any company of any size in any industry. After that, we'll delve deeper into some of the more complex policies that organizations in specific industries should consider.

[^credit]: Created using [DALL•E 3 XL v2](https://huggingface.co/spaces/ChenoAi/dalle-3-xl-lora-v2) on Huggingface with the prompt: two people exchanging a gift and an atomic bomb detonating in the background.