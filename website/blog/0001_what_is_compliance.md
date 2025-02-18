<!--- References -->
[pol]: /shared/policies.md#data-integrity-and-privacy-dip

# Neosofia Glossary and Architecture

This post introduces Neosofia's approach to compliance. After defining compliance and looking at a real-world example, we introduce an initial glossary that establishes standardized terminology and concepts throughout the organization. Lastly, we state that all documentation and code are and will continue to be open-source, reflecting Neosofia's dedication to transparency, information sharing, and community contribution.

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

If you're new to the world of compliance, please check out the [compliance terms](/shared/glossary.md#compliance-terms) section of our glossary. As stated in our first post, some of the challenges associated with compliance lie within the interpretation of a regulation, the procedures needed to comply, what evidence to gather, and how to validate that the evidence is sufficient for an auditor. Our mission is to streamline and automate these processes so you can focus on your company's core business. To demonstrate this concept, we'll work through the most common real-world examples that apply to almost any industry that operates technology systems. 

Our [policies][pol] help guide the organization into operating in a compliant manner, but without the thought put into the implementation and evidence to support that you're following your own rules -- they're just words on paper. Before we go into the details on how Neosofia will automate the gathering of evidence to ensure you're operating a compliant company, we'll start of by manually mapping out our own polices, procedures, guides, implementation, and evidence as a working example. With this example, you can start on your compliance journey today! And to support of all of our polices and procedures, we also produced a cornerstone of any compliant company -- our glossary.

## Glossary

“A mistake is to commit a misunderstanding.” -Bob Dylan

To minimize the chance of mistakes, our [glossary](/shared/glossary.md) will include the terminology we wish to standardize to create a shared context for all. To emphasize used glossary terms, we will always link to the glossary when a defined phrase is presented and use the commonly accepted abbreviation for conciseness.

## What's Next?

The [next post](./0004_mvc.md) will explore the policies and procedures **all** companies should consider adopting to secure their corporate and client data.

## One More Thing

As an organization, we're on a mission to help any company of any size improve their compliance, and this is why we've elected to make all of our policies, procedures, roles, glossary, evidence, design, and implementation open source. Most organizations today store this information in a private corporate data store and make evidence available for "on-site" review to protect their IP (which makes a lot of sense). As this repository is open source, you're free to use any content as you like under the terms of the [MIT license](https://en.wikipedia.org/wiki/MIT_License). Our only (legally non-binding) request is that you cite [Neosofia](https://github.com/neosofia/corporate) in any public-facing "thanks" or "powered by" section of your website should you use any of the content here. For other ways of supporting us, please check out our [contributing](/CONTRIBUTING.md) page.

[^credit]: created using "DALL•E 3 XL v2" on Huggingface with the prompt "flintstones car driven by a frantic looking person" seed: 1059621461 no negative prompts