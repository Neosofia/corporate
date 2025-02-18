# Architecture and Design

Our introductory posts to compliance have been focused on manually curating policies, procedures, guides, implementation, and the evidence needed to prove your organization is compliant. To make this process more efficient, we'll be outlining the architecture and design of the validation and evidence gathering services to automate these manual processes.

## Architecture

At the foundation of any compliant [EAS](/shared/glossary.md#EAS) lies a set of system architecture diagrams that define how technology systems and system users interact with each other. To express these relationships, Neosofia has elected to adopt the [C4 model](https://c4model.com/) and more specifically [Structurizr](https://structurizr.com/) to generate all architecture diagrams.

The initial set of [EASs](/shared/glossary.md#EAS) documented will include all the hardware and third-party services needed to operate a *minimally* compliant technology organization, which can be found in our [hardware readme](/hardware/readme.md).

> [!NOTE]
> The policy validation and evidence aggregation compliance tools are designed to work with any service regardless of the vendor. The choices above are ones Neosofia has elected to make for reasons that will be covered in future posts.

To better understand the relationship between the systems above, we created two C4 diagrams. The first architecture diagram is a system landscape diagram that shows the role of each software system and how it relates to other systems and users.

![System Landscape Diagram](../../shared/images/system-landscape-v1.svg)

Our second diagram shows how systems are deployed from a physical and logical point of view with a description of the technologies used to provide the service in question.

![Deployment Diagram](../../shared/images/deployment-diagram-v1.svg)

### Deeper Dive

For interactive architecture diagrams that allow you to change the layout, zoom in/out of the various components, filter based on tags, and/or reveal regulatory perspectives for each system, clone this repo and follow the instructions in the [architecture README](../../architecture/README.md).


## An Example Organization

Rather than continue to look at Neosofia, let's look at a hypothetical example of an organization to walk through how the policy validation and evidence aggregation services can help them become more compliant. Here is a short description of our example organization:

> We're a technology services company that connects anybody on the planet with a web browser to their dream ugly sweater. The R&D team operates out of San Francisco, New York City, London, Madrid, and Berlin to bring your ugly sweater dreams to life. Our cotton is lovingly sheared from the finest alpacas in the Swiss Alps. Login to our site, answer three personal questions, and our AI-powered assistant will create your dream ugly sweater.

![Ugly Sweater](/shared/images/ugly-sweater-swiss.png)[^credit]

Despite the short company description, there is a minefield of regulations that they need to consider in order to legally operate without the fear of fines or lawsuits. If we were to map each activity to a regulation, it might look something like:
* Payment Processing => [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard), [PSD2](https://en.wikipedia.org/wiki/Payment_Services_Directive) (EU), [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (EU)
* R&D (employees) => [FLSA](https://en.wikipedia.org/wiki/Fair_Labor_Standards_Act_of_1938) (US), [OSHA](https://en.wikipedia.org/wiki/Occupational_Safety_and_Health_Administration) (US), [EWTD](https://en.wikipedia.org/wiki/Working_Time_Directive_2003) (EU), [Read Bribery Act 2010](https://www.gov.uk/government/publications/bribery-act-2010-guidance) (UK)
* Supply Chain and Manufacturing => SCO (CH)

And within each regulation is a set of rules that an organization must follow. For example, GDPR directly states or indirectly implies that the "controller" must respect the rights of the "data subject," which includes:
* a priori consent to data processing
* the right to be forgotten
* the right of access to their data
* the right to data portability
* encryption in flight (with TLS 1.2 as a hidden implication)
* data breach notification
* privacy by design
* and many more!

What we end up with is a many-to-many (spiderweb) relationship between the industry, sub-sector, applicable regulation, and laws/policies that must be honored. And just to make things even more complicated, some regulations have sections with hidden implications that are interpreted differently based on the auditor! :facepalm:

Many companies make ticking the regulatory compliance boxes easier by providing you with a service that handles the compliance aspects, but you need to be sure that the vendor complies with all the correct regulations, typically through some type of vendor qualification process, and that you also list that vendor as a "processor." Using the payments example, you may elect to use [Stripe](https://stripe.com/en-es/guides/pci-compliance) as your processor, but you're still handling PII data as the controller! The email address used to sign up plus three personal questions to customize the sweater are considered PII and would still fall under GDPR, numerous other regional regulations, and many subsections of the PCI DSS if any piece of credit card information touches your systems (even if it acts as a proxy to the payment provider). More broadly put, compliance is not a one-off event – it's a continuous and substantial effort of assessment and remediation that requires you to have awareness of the regulations that apply to you and how information flows through every part of your company.

## Using the Policy Validation Service For Our Example

To use our [policy validation service](https://github.com/Neosofia/policy-validation-service), a company would first need to answer questions about where they do business and the industry/sub-sector they operate in. Based on your answers, the service has a mapping ([directed graph](https://en.wikipedia.org/wiki/Directed_graph)) of all the applicable rules you must follow. Based on the rules you need to follow, you may have to answer additional questions for the [evidence aggregator service](https://github.com/Neosofia/evidence-aggregator-service) to gather evidence and pass it to the policy service for validation. To illustrate the point, we'll walk through one simple validation then go into the more generic architecture diagram.

1. Ugly sweater company enters information requested by the Neosofia Compliance platform website, including their URL LoveUglySweater.com.
1. After pressing a validate me button, the evidence service makes a call to `https://LoveUglySweater.com` to gather one piece of evidence -- the supported TLS versions.
1. The evidence service makes a call to the policy validation service with the supported TLS versions that were gathered from the prior step.
1. The evidence service stores the supported TLS versions and the validation service result (PASS/FAIL) with corresponding policies/rules/regulations that the evidence supports.

The validation and evidence services will continue this process for each regulation/law/policy that applies to the company, and when finished, produce a full compliance report that is catered to your organization. As the report has the links needed to validate the gathered evidence, it can be presented to auditors as the one document needed to conduct the audit. It may also be used as a guide for improving regulatory compliance.

The process diagram below is a more generic set of steps including human/software system interactions with the evidence service. In general, the company tracking website should ask the organization looking to be compliant the fewest number of questions to produce a report that has the highest value in terms of proving compliance. The reports should drive a workflow that enables the organization to quickly and with minimal effort, become increasingly compliant. The two main actors in the setup and continued interaction are the employees at Love Ugly Sweater responsible for ensuring they're compliant and the IT system administrators that can fill in the technical details to validate the systems they manage. With minimal effort, the software system helps companies become increasingly compliant over time with the evidence needed to prove their compliance to external entities.

![using the policy tools](/shared/images/using-policy-tools.svg)

## System Design

With any software system, it's critical to think through the UX, architecture, and design before implementation. At a high level, we'll be making the following architectural and UX design decisions.

* The UX should present the fewest number of questions to configure the service. When the validation process is run, it should create a fully traceable and actionable report (key issues reported first) that enables the user to quickly resolve compliance issues and conduct audits.
* The services should be open source and prioritize a self-hosted model while also offering paid hosting options.
* The design should enable the services to handle any company of any size in any industry.


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



[^credit]: created using [DALL•E 3 XL v2](https://huggingface.co/spaces/ChenoAi/dalle-3-xl-lora-v2) on Huggingface with the prompt: ugly sweater with alpaca and "swiss made" logo on it

[^credit-atom]: Created using [DALL•E 3 XL v2](https://huggingface.co/spaces/ChenoAi/dalle-3-xl-lora-v2) on Huggingface with the prompt: two people exchanging a gift and an atomic bomb detonating in the background.