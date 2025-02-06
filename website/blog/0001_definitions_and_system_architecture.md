# Neosofia Glossary and Architecture

This post introduces Neosofia's approach to compliance and system architecture. After defining compliance and looking at a real-world example, we introduce an initial glossary and system architecture that establishes standardized terminology and concepts throughout the organization. Lastly, we state that all documentation and code are and will continue to be open-source, reflecting Neosofia's dedication to transparency, information sharing, and community contribution.

## What is Compliance?

What would the world be like if there were no regulations or policies? Or put another way, what if there was nothing to comply with? Would we live in a world packed with snake oil vendors peddling whatever wares possible to consumers despite their safety and efficacy? A world where technology companies use every scrap of information without our consent to push whatever products the highest marketing bidder can pay for? A world where the risk of being harmed while driving or taking public transit is a function of how much safety you can afford to pay for?

![Flintstone car](../../shared/images/flintstones-car.png)[^credit]

Compliance is done to conform with regulations, policies, and standards, but the desired end result is a world where every human, regardless of their ability to pay, is 1) safe from harm, 2) has a right to their privacy, and 3) has the right to choose how they live their lives without infringing on 1 or 2 for anybody else.

When I hear compliance, I think:
 * How can I make technology systems *secure* to protect each person's right to privacy?
 * How can I produce a *safe and effective* product?

When a "moral" company hears compliance, they think:
 * How can I minimize my IT expenses to comply with all the regulations applicable to us and protect my IP?
 * How can I produce a safe and effective product for the lowest cost while remaining compliant?

Amoral companies don't think about compliance. They view it as an obstacle to selling more products with the highest margin possible without considering the implications. Sadly, companies like [Theranos](https://en.wikipedia.org/wiki/Theranos#Exposure_and_downfall) appear in the news far too frequently these days.

This series of posts will blend the human desire to provide a safe, effective, and secure product/service with the "moral" company's desire to comply with regulations at the lowest cost possible. When you think of compliance, think safe, effective, secure, and cost-efficient. Or:

> Primum non nocere

First, do no harm.

> Secundo mihi pecuniam

Second, show me the money!

## Compliance From 30,000 Feet

If you're new to the world of compliance, please check out the [compliance terms](/shared/glossary.md#compliance-terms) section of our glossary. As stated in our first post, some of the challenges associated with compliance lie within the interpretation of a regulation, the procedures needed to comply, what evidence to gather, and how to validate that the evidence is sufficient for an external auditor. Our mission is to streamline and automate these processes so you can focus on your company's core business. To demonstrate this concept, we'll work through the most common real-world examples that apply to almost any industry that operates technology systems. We will tackle these examples in the order needed to create a company from the ground up. The first example will focus on system backup and recovery procedures, then move into more human procedures and policies concerning a quality management system.

The [system backup and recovery SOP](/website/procedures/IT-245-System%20Backup%20and%20Recovery.md) is an example of compliance in action as it ties together how we operate (procedures), with the policies and regulations the procedures support, and the evidence that our procedures are being executed. All the information is presented in a fully traceable format that an auditor can use to validate that we're operating a compliant organization. Neosofia has elected to make this information public and has fully automated the backup and restoration test procedures so that evidence is continually generated whenever the implementation changes. This means that we have a continually generated and publicly available set of evidence with full traceability between our policies, procedures, architecture, design, and implementation.

In support of our first SOP, we also produced two cornerstones of a compliant company, our glossary and high-level system architecture.

## Glossary

“A mistake is to commit a misunderstanding.” -Bob Dylan

To minimize the chance of mistakes, our [glossary](/shared/glossary.md) will include the terminology we wish to standardize to create a shared context for all. To emphasize used glossary terms, we will always link to the glossary when a defined phrase is presented and use the commonly accepted abbreviation for conciseness.

## Architecture

At the foundation of any compliant [EAS](/shared/glossary.md#EAS) lies a set of system architecture diagrams that define how technology systems and system users interact with each other. To express these relationships, Neosofia has elected to adopt the [C4 model](https://c4model.com/) and more specifically [Structurizr](https://structurizr.com/) to generate all architecture diagrams.

The initial set of [EASs](/shared/glossary.md#EAS) documented will include all the hardware and third-party services needed to operate a *minimally* compliant technology organization, which can be found in our [hardware readme](/hardware/readme.md).

> [!NOTE]
> The policy validation and evidence aggregation compliance tools are designed to work with any service regardless of the vendor. The choices above are ones Neosofia has elected to make for reasons that will be covered in future posts.

To better understand the relationship between the systems above, we created two C4 diagrams. The first architecture diagram is a system landscape diagram that shows the role of each software system and how it relates to other systems and users.

![System Landscape Diagram](../../shared/images/system-landscape-v1.svg)

Our second diagram shows how systems are deployed from a physical and logical point of view with a description of the technologies used to provide the service in question.

![Deployment Diagram](../../shared/images/deployment-diagram-v1.svg)

## Deeper Dive

For interactive architecture diagrams that allow you to change the layout, zoom in/out of the various components, filter based on tags, and/or reveal regulatory perspectives for each system, clone this repo and follow the instructions in the [architecture README](../../architecture/README.md).

## What's Next?

The [next post](./0002_putting_it_all_together.md) in our series will look at an example company and how the two services we're building can help them become more compliant.

## One More Thing

As an organization, we're on a mission to help any company of any size improve their compliance, and this is why we've elected to make all of our policies, procedures, roles, glossary, evidence, design, and implementation open source. Most organizations today store this information in a private corporate data store and make evidence available for "on-site" review to protect their IP (which makes a lot of sense). As this repository is open source, you're free to use any content as you like under the terms of the [MIT license](https://en.wikipedia.org/wiki/MIT_License). Our only (legally non-binding) request is that you cite [Neosofia](https://github.com/neosofia/corporate) in any public-facing "thanks" or "powered by" section of your website should you use any of the content here. For other ways of supporting us, please check out our [contributing](/CONTRIBUTING.md) page.

[^credit]: created using "DALL•E 3 XL v2" on Huggingface with the prompt "flintstones car driven by a frantic looking person" seed: 1059621461 no negative prompts