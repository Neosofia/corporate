<!--- Internal Links -->
[cl]:   /website/qms/glossary.md#compliance-levels
[kiss]: /website/qms/glossary.md#keep-it-simple-stupid-kiss
[ear]:  /website/qms/glossary.md#encryption-at-rest-ear
[mfa]:  /website/qms/glossary.md#multi-factor-authentication-mfa
[eas]:  /website/qms/glossary.md#enterprise-application-software-eas
[sso]:  /website/qms/glossary.md#single-sign-on-sso
[qms]:  /website/qms/glossary.md#quality-management-system-qms
[sdlc]: /website/qms/glossary.md#software-development-lifecycle-sdlc
[csv]:  /website/qms/glossary.md#computer-systems-validation-csv
[sop]:  /website/qms/glossary.md#standard-operating-procedure-sop
[rbac]: /website/qms/glossary.md#role-based-access-control-rbac
[sa]:   /website/qms/roles.md#system-administrator-sa
[rm]:   /website/blog/readme.md
[next]: /website/blog/2000_system_architecture_and_design.md
[tony]: /website/public/shared/images/tony-hackaroni.png

<!--- External Links -->

# Beyond MVC

In our prior post, we explored what MVC could look like for an organization starting on their compliance journey and began to adopt policies for Neosofia that would check essential boxes that apply to any organization. We also started to segregate some of the policies into one of three levels. The goal of having [three levels of compliance][cl] is to reduce the complexity of the many-to-many spiderweb of Regulation <=> Industry <=> Region <=> Policy <=> Procedure mapping for your specific company. As you read through blog posts, policies, and procedures, the level indicators are designed to help you decide if adoption is appropriate for your organization. Eventually, the validation and evidence services will handle a more granular mapping that ensures you're doing everything you need to and no more, but for now, we'll [KISS][kiss] and break everything down into three levels as we manually review each policy and procedure.

## TL;DR

All policies and procedures developed by Neosofia will have level indicators. These indicators are designed to help easily guide other organizations into adopting a set of policies that are appropriate for their company. For a description of each level, check out our [glossary][cl].

## Exploring Level 1

*Hackaroni* is a landscaping company in New York state (USA) that specializes in stonework and other hardscape projects. They're a small team of about 10 full-time employees with one office manager and the owner providing operational support to the ten laborers doing the actual project work. They use the Office 365 suite to coordinate their efforts and communicate with each other and clients via email. Each person uses their personal phone for voice communications.

This is a classic level 1 mom-and-pop type small business example that defines millions of organizations around the world. Drawing from our last post, the recommended policies to adopt would be something like:
* [MFA][mfa] for Office 365/email access via the web
* Role-based access and data retention policies for company documents
* Policies and procedures implemented to ensure worker safety (OSHA)

And some more advanced policies if employees need to travel and work online:
* Company-issued laptops with [EAR][ear]
* Automated software updates for company devices
* Company-issued phones with pre-installed and configured communication/authentication applications.

Before we talk about implementing these policies, let's tell a story about one of the Hackaroni family stone workers who loved to gamble -- let's call him Tony. One day, Tony was looking for some more gambling software online. He found a new app that looked good and proceeded to download it onto his personal computer. After his gambling session ended, he logged into his work email to see what projects needed his attention tomorrow. Several months went by and as long-running projects came to an end and as final invoices went out to clients, the company started to realize they had a serious problem.

Client after client indicated that they had already paid for the full project cost in advance per multiple emails received many weeks and months prior. Confused, the owner attempted to reconcile the issue with her office manager, but he was equally confused. Soon more complaints started to come in from more clients with emails that appeared to come from Tony Hackaroni. After reaching out to their part-time IT consultant, what had happened started to become clear.

When Tony installed the software on his computer, it also installed a keylogger. :facepalm: When he logged into his company email through a web browser, the keylogger scraped his username and password. The details were hard to put back together as the hackers covered their tracks, but based on the "forged" emails from clients, it appears that the hackers used the email account plus client/project spreadsheet stored in Office 365 to send real emails to clients requesting fund transfers to start or finish projects. When all was said and done, 40 clients transferred an average of $15k for financial damages in excess of $600k. In addition to the direct financial impact, the following data was taken:
* All Hackaroni employee PII including social security numbers, bank account numbers, addresses, etc. for the 100+ current and former employees that worked at the company in the last 25 years.
* All Hackaroni client PII including email addresses, home addresses, phone numbers, bank account details, payments, etc. -- more than 5,000 clients serviced over the last 25 years.
* Vendor data including private contact information of employees, contracts, invoices, bank account data for payments.

I know, all the IT and compliance people are screaming at their monitors:

* DID YOU ENABLE MFA?!?!?!
* WHY DOES A STONE WORKER NEED ACCESS TO ALL CLIENT AND EMPLOYEE DATA?!?!?!
* WHY ARE YOU CLINGING TO 25 YEARS OF DATA?!?!?!

The answer is interesting because this company is **real**. The names have been changed, and some creative liberties were taken in telling the story, but this actually happened. So what were the excuses the owner gave for not following the simple and easy-to-implement best practices?
* It's annoying to enter a 6-digit code once per day
* Restricting spreadsheet access is too hard
* I expect my employees to not do stupid things

What did the owner do? She fired Tony for "being stupid". When the client refused to accept even the most basic suggestions of employing MFA and restricting document/folder access to the office manager and owner -- I knew they were doomed. After the fact, trying to explain how privacy, security, and compliance start at the top of the organization was clearly going to be a lost cause. Had the organization taken 2 minutes to check the MFA option for the MS account then take 10 minutes ensuring everybody had a phone number in the company directory or the Authenticator app installed on their phone, millions of dollars in damages, hundreds of hours of billable time, and poor Tony's job loss could have been averted.

![Tony Hackaroni][tony][^credit]

## Exploring Level 2

*Get'er Done* is revolutionizing the world with their self-professed "greatest task management system ever". An amazingly intuitive web application that is also feature-rich and all for the ultra-low cost of $5/user/mo for their basic plan and $20/user/mo for their enterprise plan.

This company knows technology and has selected best-in-class SaaS solutions to use as its [EASs][eas]. They've enabled [MFA][mfa] on all of their systems, implemented [SSO][sso] when possible or not locked behind a steep enterprise/SSO paywall, and manually review access logs periodically to check for unauthorized access. Get'er Done has checked all the level 1 compliance boxes and is going through its level 2 journey as it attempts to get a SOC2 Type 2 certification. Get'er Done is starting to experience the compliance wall as most of its medium-sized and larger clients insist on some type of security certification before adopting the product beyond basic limited pilots and proof of concepts.

This SaaS company also has these level 2 compliance checks going for it:
* A basic privacy policy posted on their website
* Terms of services and EULA that are accepted as part of the sign-up process
* Defined but untested system backup and recovery procedures
* A managed device policy for company laptops and mobile phones
* [EASs][eas] to handle all corporate-level compliance concerns like -- corporate, employee, and retail taxes, invoicing, contracts, etc.

They're currently working on:
* Defining a [QMS][qms] to handle incidents, continued improvement, deviations, etc.
* Refining their [SDLC][sdlc] procedures to produce a higher quality and more secure product by applying [CSV][csv] processes.
* Refining and implementing a stricter set of [RBAC][rbac] for all systems.
* Improving network security by documenting current and target state network zone isolation, routing, and monitoring (IDS/IPS)
* Adding several performance monitoring endpoints to take a measured approach to client experience.
* Company training for anti-phishing
* Defining roles and responsibilities for every function in the company and tying them into [SOPs][sop]
* Producing copious amounts of evidence to prove all of the above is being done.

Things were going well! That is -- until the day they were hacked.

Get'er Done was so busy with all of its compliance items as it chased bigger contracts that it failed to fully execute on one of its level one checks. The hack went something like this -- due to a bug in one of the logging packages that its software relied on, hackers were able to gain access to company production servers, export all client data, and then delete everything! About an hour after the hack, the CTO had an email from the hackers:

> Your client data is for sale on the dark web for $5M if you want it.

The CTO then promptly ordered the most senior [SA][sa] to execute the system restoration procedures. The SA heard the terrible news, quickly leapt into action, and logged into the system (AWS S3 bucket) where all the system backups were kept. But there was nothing there. It was all gone. Because the production servers had access to the S3 buckets with all the backup files, the hackers nuked both the production database AND all the backups :( But this was no ordinary [SA][sa], she feared this might happen one day and just the other day she happened to copy the most recent backup file to a secure off-site location that the hackers did not have access to. VINDICATION!!! The hack had been thwarted, and the data was secure. The CTO gleefully started to type a smug response to the hackers as the [SA][sa] went about restoring the data on the new production database. A few minutes later, the [SA][sa] then walked through the CTO's door with a very solemn look on her face. The backup did not have the data on it. It never had the data they needed because they never tested the restoration process.

Get'er Done declared bankruptcy and insolvency the next day.

Another sad but true story. When it comes to compliance and security, do the basic stuff (level 1) extremely well first then move onto the more advanced stuff. The key lessons, in priority order from this incident are
* Define, implement, and TEST your system backup and recovery procedures
* Make sure at least one of your full backups is not accessible to the machines that manage the data.
* Make sure you have defined and tested server software patching procedures

## Exploring Level 3

After numerous meetings with investors, the slick co-owners of Get'er Done have formed a new company and are determined to continue on their path to creating the greatest task management system the world has ever seen! Smash Task (ST) has transcended what Get'er Done was able to do by learning from their mistakes and eventually completing all their level 1 and 2 compliance checks to obtain their ISO 27001 and SOC 2 certifications! Nothing can stop this juggernaut of a company. Well -- maybe their sales team can.

The 800-pound gorilla that leads up the sales team is salivating over a $20M contract with the US government. In a sales pitch to the government, he proudly pounds his chest while waving ST's ISO and SOC certifications around as if he actually did any of the hard work needed to obtain them. While discussing compliance, the government employees' wry smile may have triggered alarm bells for normal people, but the 800-pound sales beast didn't even flinch when they plainly said "you need FedRAMP certification to work with us". Full of self-confidence the head of sales declared that they'll have the certification by the end of the month!

If you're a compliance :nerd_face: like me, you know how absurd it would be to even think about FedRAMP certification in any less than two years. If you're not a compliance nerd, let's compare the various levels in terms of walking up a hill:
* Level 1: basic best practices including MFA and system backups -- walking up a small hill in the woods (250M)
* Level 2: Implementing controls to obtain ISO 27001 and SOC 2 certifications -- climbing up Machu Pichu (2,500M)
* Level 3: implementing the controls needed to obtain FedRAMP -- climbing up a mountain 4x taller than Everest (25,000M)

The added levels of time, cost, and complexity needed to obtain FedRAMP is, in the words of a famous rapper, "Kray Kray". This post won't go into the details as to why FedRAMP is "kray kray", but the topic will be explored in future posts.

Back to our story -- upon return from his pitch, the head of sales proudly declares that they will be awarded the contract and all they have to do is have FedRAMP certification by the end of the month. Happy with the results, the CEO looks at the chief security and compliance officer (CCO/CSO) to validate the timelines for FedRAMP. The CSO is completely frozen in their expression. After about 10 seconds the CEO asks if the CSO is ok. Still no response and after many seconds of silence the CSO calmly stands up, walks out the door, and was never seen again. Of all the smart people in that room, only one knew of the horrors that lie within that certification and the damage that it would cause to the organization to obtain it.

Smash Task got their FedRAMP certification eventually. It only took 2 years, cost $25M, increased attrition rate from 10% to 30%, and resulted in numerous personal and professional relationships that were destroyed along the way. By the time ST got their certification, the government program was slashed and replaced with a $200k contract instead.

## Summary

It's fun telling these very close to real life stories, but what's the lesson in this one? Compliance is like an onion -- it has many layers. You have to focus on the inner layers first and master them before moving out to the next layer. These blog posts exist to help make mastering those first couple of layers easier for small businesses to YOLO themselves without having to hire an army of compliance and security experts. We're doing that by highlighting the common failure points with funny stories, but we also need to condense those guidelines into a simple checklist without all the narration.

## What's Next

Our introduction to compliance series of posts ends here and now branches into a choose-your-own-adventure style book where you decide what to do/read next. Future posts will be indexed in our [readme][rm] and organized into the following areas:

 * [Neosofia validation and evidence service system architecture and design][next]
 * Getting started checklists and document templates
 * Picking best in class 3rd party vendors
 * Quality Management Systems
 * Security
 * Technology
 * Procedures, Policies, Guides and Evidence

We want to make compliance and security more accessible for all. Thank you for making it through our first set of posts. We hope you've been able to apply some of the lessons to your own organization and look forward to seeing you again.


[^credit]: created using "DALL•E 3 XL v2" on Huggingface with the prompt: tan man with huge biceps, one arm has a large hammer breaking rocks, the other hand is pulling on a slot machine lever
