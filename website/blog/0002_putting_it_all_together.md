# Putting It All Together

So far we've been looking at pieces of a bigger picture when it comes to compliance. This is the post where we bring all the concepts together and show you how everything will fit. We'll start by defining terms to help create a shared context then go into a typical company journey going on their path to compliance with the Neosofia tools.

## New Terms

### Industry

The sector of an economy made up of manufacturing enterprises. Examples include
 * finance
 * healthcare
 * textile

 ### Sub-sector

 An area of economic activity that forms part of one of the larger areas into which the economic activity is divided. Examples include:
  * healthcare - pharma, medical devices, provider, payer, etc.
  * finance - retail banking, business banking, investment banking, etc.

### Business Operations

Activities that businesses engage in on a daily basis to increase the value of the enterprise and earn a profit. Sub categories include regions where:
* your employees work
* you provide services
* you provide goods
* you manufacture goods
* you source materials
* you do R&D
* you're publicly traded

### Hard/Soft Validation

A hard validation is one which can be proven true based on the evidence. For example, if a policy implies TLS version 1.1 and the evidence service gathers the TLS version, the version that the given URL provides can be directly compared to the policy. Soft policies can not be proven true and must be validated by a human. For example, polices requiring SOPs can be a soft validation with a link to the SOP.

### Internal/External Validation

An external validation is one that can be performed from the public internet. For example, testing that the companies public facing website conforms to a set of policies vs internal validations like testing disk encryption inside a companies cloud provider or data center.

### Push/Pull Validation

A pull validation is one that is initiated by the validation service. For example, getting TLS version from a companies public facing website is a pull validation. An example push validation would be a system backup and recovery execution log being pushed into the evidence service.

## Putting it Together with an Example

Let's look at a hypothetical example of an organization to walk through how the policy validation and evidence aggregation services can help.

We're a technology services company that connects anybody on the planet with a web browser to their dream ugly sweater. The R&D team operates out of San Francisco, New York City, London, Madrid, and Berlin to bring your ugly sweater dreams to life. Our cotton is lovingly sheared from the finest alpacas in the Swiss Alps. Login to our site, answer three personal questions and our AI powered assistant will create your dream ugly sweater.

![Ugly Sweater](/shared/images/ugly-sweater-swiss.png)[^credit]

Despite the short company description, there is a minefield of regulations that a company would have to consider in order to legally operate without the fear of fines or lawsuits. If we were to map each activity to a regulation, it might look something like
* Payment Processing => PCI DSS, PSD2 (EU), GDPR (EU)
* R&D (employees) => FLSA (US), OSHA (US), EWTD (EU), Read Bribery Act 2010 (UK)
* Manufacturing => SCO (CH)

And within each regulation is a set of rules that an organization must follow. For example, GDPR directly states or indirectly implies that the "controller" must respect the rights of the "data subject" which includes
* a priori consent to data processing
* the right to be forgotten
* the right of access to their data
* the right to data portability
* encryption in flight (with TLS 1.1 as a hidden implication)
* data breach notification
* and many more!

What we end up with is a many-to-many relationship between the industry, sub-sector, applicable regulation, and laws/policies that must be honored. And just to make things even more complicated, some regulations have sections with hidden implications that are interpreted differently based on the auditor. :facepalm:

Many companies make ticking the regulatory compliance boxes easier by providing you with a service that checks most of these boxes, but you yourself need to be sure that the vendor does comply with all the correct regulation, typically through some type of vendor qualification process, and that you also list that vendor as a "processor". Using the payments example, you may elect to use Stripe as your processor, but you're still handling credit card data as the controller and other "subject" data and PII needed to provide your services that require you to still comply with sub sections of the applicable regulations.

## Policy Validation Service

To use the policy validation service you first need to answer questions about where you do business and the industry/sub-sector you operate in. Based on your answers, the service has a mapping ([directed graph](https://en.wikipedia.org/wiki/Directed_graph)) of all the applicable rules you must follow. Based on the rules you follow, you may have to answer additional questions for the evidence aggregator service to gather the evidence and pass it to the policy service for validation. To illustrate the point, we'll first walk through a simple validation then go into the more generic architecture diagram.

1. Ugly sweater company enters information requested by the Neosofia Compliance platform website including their URL LoveUglySweater.com
1. After pressing a validate me button, The evidence service makes a call to `https://LoveUglySweater.com`
1. The evidence service makes a call to the policy validation service with the TLS result from hitting the companies URL
1. The evidence service stores the result of the http call and the validation service result with policies/rules/regulations that the result supports as it relates to the company

Rinse and repeat the above process for each regulation/law/policy that applies to the company, and you'll then have a full compliance report that is catered to your organization. You can even use the results to point auditors to when needed. :)

The process diagram below is a more generic form of how each system interacts with each other. In general, the evidence services should ask the organization looking to be compliant the fewest number of questions to produce a report that has the highest value in terms of proving compliance. The reports should drive a workflow that enables the organization to quickly and minimal effort, become increasingly compliant.

![using the policy tools](/shared/images/using-policy-tools.svg)[^credit]

### Hard vs Soft and Internal vs External Validation

The TLS example above is what we consider a "hard external" validation as you can gather the evidence from outside the company network and test the result against a very specific requirement of (TLS 1.1 or higher). A soft validation is when you can't test the policy against a specific expectation. An example "soft internal" validation would be GDPR having the hidden implication that you should have a well-defined [System Backup and Recovery SOP](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md). When setting up your company, we may ask the question -- please enter the location of your system backup and recovery SOP to which you may respond `https://SomeInternalFileSystem.com/QMS/SOPs/Current/IT-B&R.doc` which the evidence service can not access (as it's internal) and even if it was externally accessible, we can't validate the SOP as being sufficient to satisfy a regulation. However, the URL is sufficient to soft check the regulation and make it easy for any auditor to quickly access the thing you claim satisfies the regulation.

> [!NOTE]
> Future versions of the evidence service may support storing api tokens to access protected/internal resources and may even apply string matching rules for documents like SOPs to help make soft validations harder. Until AI gets a lot smarter, we'll always have soft validations that require humans to validate.

## What's Next

TBD: Setting up the validation and evidence services and walking through a real world example.

## Deeper Cut: Design Decisions

For the policy validation service we elected to use [Cedar](https://www.cedarpolicy.com/) as it supports customized schemas and stores relationships as a directed graph. For the evidence gathering service we've elected to use [Ruby on Rails](https://rubyonrails.org/) for its easy of implementation, industry support, and extensive package set (Gems) that enables us to gather evidence from the widest range of resources possible. And for the website, we've elected to use [React](https://react.dev/) + [tailwindcss](https://tailwindcss.com/) because why would you use anything else ;)

[^credit]: created using [DALL•E 3 XL v2](https://huggingface.co/spaces/ChenoAi/dalle-3-xl-lora-v2) on Huggingface with the prompt: ugly sweater with alpaca and "swiss made" logo on it