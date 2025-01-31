# Putting It All Together

So far we've been looking at pieces of a bigger picture when it comes to compliance. This is the post where we bring all the concepts together and show you how everything will fit. We'll start by defining terms to help create a shared context then go into a typical company compliance journey with the Neosofia evidence and validation services.

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


## Putting it Together with an Example

Let's look at a hypothetical example of an organization to walk through how the policy validation and evidence aggregation services can help them become more compliant. Here is a short description of our example organization:

> We're a technology services company that connects anybody on the planet with a web browser to their dream ugly sweater. The R&D team operates out of San Francisco, New York City, London, Madrid, and Berlin to bring your ugly sweater dreams to life. Our cotton is lovingly sheared from the finest alpacas in the Swiss Alps. Login to our site, answer three personal questions and our AI powered assistant will create your dream ugly sweater.

![Ugly Sweater](/shared/images/ugly-sweater-swiss.png)[^credit]

Despite the short company description, there is a minefield of regulations that they need to consider in order to legally operate without the fear of fines or lawsuits. If we were to map each activity to a regulation, it might look something like
* Payment Processing => [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard), [PSD2](https://en.wikipedia.org/wiki/Payment_Services_Directive) (EU), [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (EU)
* R&D (employees) => [FLSA](https://en.wikipedia.org/wiki/Fair_Labor_Standards_Act_of_1938) (US), [OSHA](https://en.wikipedia.org/wiki/Occupational_Safety_and_Health_Administration) (US), [EWTD](https://en.wikipedia.org/wiki/Working_Time_Directive_2003) (EU), [Read Bribery Act 2010](https://www.gov.uk/government/publications/bribery-act-2010-guidance) (UK)
* Supply Chain and Manufacturing => SCO (CH)

And within each regulation is a set of rules that an organization must follow. For example, GDPR directly states or indirectly implies that the "controller" must respect the rights of the "data subject" which includes
* a priori consent to data processing
* the right to be forgotten
* the right of access to their data
* the right to data portability
* encryption in flight (with TLS 1.2 as a hidden implication)
* data breach notification
* privacy by design
* and many more!

What we end up with is a many-to-many (spiderweb) relationship between the industry, sub-sector, applicable regulation, and laws/policies that must be honored. And just to make things even more complicated, some regulations have sections with hidden implications that are interpreted differently based on the auditor! :facepalm:

Many companies make ticking the regulatory compliance boxes easier by providing you with a service that handles the compliance aspects, but you need to be sure that the vendor does comply with all the correct regulations, typically through some type of vendor qualification process, and that you also list that vendor as a "processor". Using the payments example, you may elect to use [Stripe](https://stripe.com/en-es/guides/pci-compliance) as your processor, but you're still handling credit card data as the controller and other "subject" data and PII needed to provide your services that require you to still comply with subsections of the applicable regulations like PCI DSS and GDPR.

## Using the Policy Validation Service For Our Example

To use our [policy validation service](https://github.com/Neosofia/policy-validation-service), a company would first need to answer questions about where you do business and the industry/sub-sector they operate in. Based on your answers, the service has a mapping ([directed graph](https://en.wikipedia.org/wiki/Directed_graph)) of all the applicable rules you must follow. Based on the rules you need to follow, you may have to answer additional questions for the [evidence aggregator service](https://github.com/Neosofia/evidence-aggregator-service) to gather evidence and pass it to the policy service for validation. To illustrate the point, we'll walk through one simple validation then go into the more generic architecture diagram.

1. Ugly sweater company enters information requested by the Neosofia Compliance platform website including their URL LoveUglySweater.com
1. After pressing a validate me button, The evidence service makes a call to `https://LoveUglySweater.com` to gather one piece of evidence -- the supports TLS versions.
1. The evidence service makes a call to the policy validation service with the supported TLS versions that was gathered from the prior step.
1. The evidence service stores the supported TLS versions and the validation service result (PASS/FAIL) with corresponding policies/rules/regulations that the evidence supports.

The validation and evidence services will continue this process for each regulation/law/policy that applies to the company, and when finished, produce a full compliance report that is catered to your organization. As the report has the links needed to validate the gathered evidence, it can be presented to auditors as the one document needed to conduct the audit. It may also be used as a guide for improving regulatory compliance.

The process diagram below is a more generic set of steps including human/software system interactions with the evidence service. In general, the evidence service should ask the organization looking to be compliant the fewest number of questions to produce a report that has the highest value in terms of proving compliance. The reports should drive a workflow that enables the organization to quickly and with minimal effort, become increasingly compliant.

![using the policy tools](/shared/images/using-policy-tools.svg)

## Summary and What's Next

A typical user of the services will only have to think about entering basic information such as industry, subsector, links to documents, and websites. However, as the architects and designers of these services, we need to think through the best ways to gather evidence and validate it so that we can guide any company into being more compliant with the regulations and laws that apply to them. If you're curious about how we'll design these services please check out our [next post](./0003_system_design.md) and
 if you're interested in exploring other topics, please visit our [readme](./readme.md) for an index of currently written and future posts.

[^credit]: created using [DALL•E 3 XL v2](https://huggingface.co/spaces/ChenoAi/dalle-3-xl-lora-v2) on Huggingface with the prompt: ugly sweater with alpaca and "swiss made" logo on it