# Your Compliance Sucks -- Technologists' Musings Regarding Regulatory Compliance

Welcome to our zeroth post! This series will explore the world of international regulations and how technology can be used to not only improve your organization's compliance, but also make you organization more efficient.

## Why are we doing this?

Companies of every size from startups to large enterprises struggle with their compliance and collectively spend *250+ billion* on proving they are compliant or getting fined for not complying. For each regulation you need a group of individuals to write, maintain, and enforce it; each company needs a group of individuals to interpret, document, implement, prove, and maintain their compliance; lastly, you need an independent party to review (audit) and certify that you're compliant. And despite decades of technology advancements, this process is still grossly inefficient and error-prone.

The first issue is that regulations are typically vague and leave out practical real world guidance to organizations that then lead to hidden implication and false assumption. Fore example -- even after 30+ years of maturation regarding something as "simple" as password length ([reg ref](regulationxyz)), you can ask 10 auditors how long a password should be and still get 20 answers... Not only do auditors disagree, but each of the tens of thousands of companies that must comply are left to spend resources interpreting each regulation, implementing what they think is the correct interpretation only to be told by auditors that their interpretation is incorrect. Password length is just one example out of thousands that compounds into wasted effort across multiple organizations.

Even if your organization correctly interprets every regulation, the second issue that leads to inefficiency lies within policy alignment within the organization. In the real world, the actual implementation of a policy/procedure vs what is written in a text document rarely matches. Employees aren't trained, don't care, or are not interested in "slowing" themselves down to comply as their productivity, not compliance with regulations, is measured and used to determine their yearly bonus/promotion/raise. Companies also fall into the trap of writing a bunch of standard operating procedures to appease auditors but fall short in terms of training and enforcing those procedures as they too like employees just want to "go faster". And in our capitalistic society, many organizations take a risk based approach to compliance and will eat fines or lose clients as the expense needed to comply would have been more than the probability of being caught and fined.

Interpreting the myriad of regulations and proving your compliance is still a shockingly inefficient process despite all of our advancements in technology. There are many niche companies/products that specialize in vertical or horizontal market segments like MasterControl for GxP in life sciences, HashiCorp Sentinel for applying policies to infrastructure as code (IAC) systems provisioned via Terraform, or OPA for a more generic infrastructure policy machine. Despite a myriad of products that function well in their respective vertical or horizontal market, nothing truly ties everything together.

Given a magic wand, I would wish for an environment in which every employee has the tools they need/want to quickly do their job and that compliance is a "free" byproduct of doing your job. I would also wish that every piece of compliance evidence be available for inspection at any time. Essentially, I want *compliance by design* (CBD) for free, without any loss in efficiency (or fun) for the organization and its employees.

## How will we get there?

This zeroth post is the first of hundreds that will incrementally build on building a company (Neosofia) as a model for others to draw from and services that:

 * Reveal the hidden implications within regulations
 * Enable organizations to programmatically verify their compliance with regulations
 * Enable organizations to retrospectively integrate their existing systems into *compliance by design* (CBD) way of thinking
 * Provide startups and other smaller organizations with a "getting started" template for quickly spinning up cost-effective corporate systems that are compliant out of the box.

Before we begin to architect, design, and implement our solutions to the above, we must establish some initial principles for corporate systems we select that will be a part of our software/service supply chain:

 * All services must be manageable and observable via an API
 * 3rd party services must have a "free" tier
 * Self-hosted services must have an active open source community backing with a path to paid hosting options
 * Everything as Code (or config) (or markdown) in a public source code control system
 * Automate everything that can be automated

## Where do we want to go?

When we're done with the first iteration of this project, what will we have? 

Primary Endpoints: 
 * A company whose policies, implementation of, and evidence to prove regulatory compliance is publicly available and fully traceable
 * A FISMA authority to operate (ATO)

Secondary/Interim Endpoints:
 * ISO-27001, GDPR+, and/or SOC2 Type 2 certifications
 * A model for other organizations to follow for achieving compliance by design (CBD)


## What is next?

The [next post](0001_definitions_and_system_architecture.md) in this series will establish a set of definitions and examples for what compliance is and the architecture of the systems that will support our desired endpoints.












