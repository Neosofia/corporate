---
tags: [product, platform, open-source, clinical, ai]
---

# SPAWN grew up: from engineering platform to real product

[corporate-clinician]: ../public/shared/images/post-discharge-clinician-dashboard-corporate.png
[care-agent]: ../public/shared/images/post-discharge-care-agent-patient-detail.png
[risk-agent]: ../public/shared/images/post-discharge-risk-agent-summary.png

Two weeks ago, I posted about how [I built a Clinical Data Platform in 72hrs](https://www.linkedin.com/pulse/i-built-clinical-data-platform-72hrs-benjamin-young-fenhe/?trackingId=Npm7G9uwS28jA2meraN9GA%3D%3D), which was basically the software equivalent of saying "what if we took an April Fools' joke seriously, added authentication, authorization, auditing, service contracts, and then gave the whole thing Joe's original neon sign?"

That first iteration was about building a foundation others could build on -- role-based dashboards, a service registry, patient and clinician workflows, OpenTelemetry, contracts, templates, infrastructure, and the 5As underneath the whole thing. This iteration is where the rubber meets the road: a real post-operative care platform where patients, clinicians, and AI agents work together to improve outcomes, with a fresh look and feel to match.

Don't worry though, the original SPAWN (dark) mode is not gone! It remains available for those moments when your clinical workflow needs a little more "final boss of the post-op paperwork dungeon." But since the first post, the product has started moving in a more serious direction.

Let's talk about our first and most obvious new feature:

## Corporate mode

Born from the halls of mauve-colored cube dividers, grey carpets, and TPS reports comes our most transformative feature yet. Be warned: corporate mode is the light mode and may sear the eyes of those cube trolls working in dimly lit spaces.

![Corporate clinician dashboard][corporate-clinician]

The UI polish is nice -- and if I'm being real, probably the only thing people and investors notice about the site -- but the real change is that SPAWN is becoming less of a reference architecture and more of a coherent post-discharge care platform.

## The AI care agent

The patient conversation view now shows the care assistant doing something more useful than simply proving the chat service works.

In this synthetic example, the patient reports worsening abdominal pain and nausea after a laparoscopic cholecystectomy. The care assistant responds with practical guidance, asks follow-up questions, and gives clear escalation advice when symptoms could indicate a post-operative complication.

![AI care assistant and patient record view][care-agent]

The important part is not that there is a chat bubble with an AI sparkle on it. What matters is that the conversation sits next to the clinical record.

The clinician does not have to jump between three systems to understand what happened. The thread, the procedure context, the imaging, and the latest clinical evidence are in one workspace. That is the path from signal to evidence to decision, which is the actual product problem.

## The AI risk evaluation agent

The risk evaluation agent adds another layer. It reads the care thread and produces a rolling clinical summary that can help prioritize review.

![AI risk evaluation summary][risk-agent]

In this example, the agent identifies persistent severe abdominal pain with new nausea, notes the absence of fever or systemic instability, and still flags the case for prompt evaluation because the pattern could indicate a post-operative complication.

That is the shape I want from AI in a clinical workflow: not magic, not a replacement. It should organize context, surface risk, and make it easier for a human clinician to decide what needs attention next -- which, IMHO, is what every AI-augmented system should strive for.

## From platform to product

The [last post](https://www.linkedin.com/pulse/i-built-clinical-data-platform-72hrs-benjamin-young-fenhe/?trackingId=Npm7G9uwS28jA2meraN9GA%3D%3D) was mostly about the platform: authentication, authorization, auditing, service registration, contracts, templates, workflows, and infrastructure.

This follow-up is about the product beginning to sit on top of that foundation. The original article asked whether a platform could be assembled quickly from real services. This one asks whether it can start behaving like a product a care team would actually want to use.

The pieces are starting to connect:

- A patient has a post-discharge episode, not just a generic account.
- The care assistant has procedure context and a conversation history.
- The clinician sees risk, records, and chat in one place.
- The operator sees whether the services underneath are healthy.
- The same application can wear neon armor or a corporate cardigan.

That last bullet is, obviously, the most important architectural achievement ;)

## It is now 100% open source 🤓

Enough product manager cosplay. If you build things for a living, you know how hard it **really** is to make an enterprise platform tick. That's where the last two weeks went -- the biggest shifts on the design and implementation side, aimed at making it much easier to operate hundreds of web services across dozens of domains while keeping a loosely coupled, tightly aligned product that stays fault-tolerant when something breaks.

Since the [last post](https://www.linkedin.com/pulse/i-built-clinical-data-platform-72hrs-benjamin-young-fenhe/?trackingId=Npm7G9uwS28jA2meraN9GA%3D%3D), every service is on GitHub. Securing the platform is meant to feel boring in a good way: SDK middleware for the repetitive parts, human-readable Cedar policy files for the rules that actually matter. [`authentication-in-the-middle`](https://github.com/Neosofia/sdk/tree/main/python/authentication-middleware) validates JWTs consistently across services; [`authorization-in-the-middle`](https://github.com/Neosofia/sdk/tree/main/python/authorization-middleware) maps REST routes to Cedar principal/action/resource and enforces default-deny at the boundary. The [authorization README](https://github.com/Neosofia/sdk/blob/main/python/authorization-middleware/README.md) is the Rosetta stone -- policy authors and backend engineers can reason about access without spelunking through middleware when something 403s.

The [CDP](https://github.com/Neosofia/cdp) repo is where product policy and local operations live together. Cedar and JSON companions ship as a versioned bundle you can read and diff; [Docker Compose](https://github.com/Neosofia/cdp/blob/main/OPERATIONS.md) brings up the backend stack, bootstrap helpers generate per-service env files, and seed scripts like [`seed_demo_platform.py`](https://github.com/Neosofia/cdp/blob/main/scripts/seed_demo_platform.py) load synthetic patients so you can walk a clinician journey on a laptop without hand-crafting database rows.

Dozens of repositories are a lot to keep straight. The [workspace](https://github.com/Neosofia/workspace) repo opens all of them in one editor workspace -- CDP, services, schemas, SDK, infrastructure -- with a shared [AGENTS.md](https://github.com/Neosofia/workspace/blob/main/AGENTS.md) so humans and coding agents follow the same rules of engagement instead of improvising conventions repo by repo.

Every repo is public. See the [appendix](#appendix--open-source-repositories) for the full map.

So yes, SPAWN grew up a bit.

It still has neon mode.

But now it also has corporate mode, care workflows, risk summaries, operational dashboards, and enough open-source plumbing for anyone to build their own enterprise data platform.

Now you can bring your own blazer!

## Appendix -- open source repositories

- [authentication](https://github.com/Neosofia/authentication) — Platform identity authority -- external IdP sign-in (WorkOS AuthKit today), platform JWT minting, service registry, and machine credentials for service-to-service calls.
- [user](https://github.com/Neosofia/user) — Authoritative Tier-2 role registry and user profiles; login-time provisioning from Authentication; Cedar-enforced admin and self-service APIs.
- [capabilities](https://github.com/Neosofia/capabilities) — UI control plane -- evaluates Cedar-backed `{ key: boolean }` entitlements for menus and features without hard-coding product vocabulary in generic infrastructure.
- [chat](https://github.com/Neosofia/chat) — Authoritative conversation store across web, app, and SMS channels; care-assistant completions on patient turns; PHI-complete message persistence.
- [care-episode](https://github.com/Neosofia/care-episode) — Procedure-scoped post-discharge episodes, recovery summaries, demo clinical records, patient chat proxy, and clinical risk evaluation after each patient turn.
- [notification](https://github.com/Neosofia/notification) — Focused message relay -- contact-form and operational email via Resend today; room to grow into SMS and paging without every product owning deliverability.
- [cdp](https://github.com/Neosofia/cdp) — Reference clinical data platform -- Spawn UI, specs, ADRs, constitution, Docker Compose stacks, policy bundle, and local seed/bootstrap helpers.
- [schemas](https://github.com/Neosofia/schemas) — Immutable versioned JSON Schema for structured logs, OpenAPI contract validation, and other cross-service vocabulary CI can pin and fail on.
- [sdk](https://github.com/Neosofia/sdk) — Shared Python middleware and logging libraries consumed by every service (three packages -- see below).
- [templates](https://github.com/Neosofia/templates) — Copier scaffolds for new repos -- production-ready Python service boilerplate and a shared React/shadcn UI registry.
- [infrastructure](https://github.com/Neosofia/infrastructure) — Repeatable deploy and recovery -- Proxmox/LXC scripts, OpenTofu modules, public- and private-cloud runbooks.
- [platform-workflows](https://github.com/Neosofia/platform-workflows) — Reusable GitHub Actions for build, test, security scan, and publish so every service repo shares the same supply-chain bar.
- [workspace](https://github.com/Neosofia/workspace) — Multi-repo editor workspace (`cdp.code-workspace`) plus shared agent and engineering conventions in `AGENTS.md`.
- [corporate](https://github.com/Neosofia/corporate) — Neosofia company website -- marketing pages, blog, public policies, and compliance resources.
- [docs](https://github.com/Neosofia/docs) — QMS document generator and tooling for version-locked policy and SOP output.

The [SDK](https://github.com/Neosofia/sdk) repo publishes three independently versioned Python packages:

- [`authentication-in-the-middle`](https://github.com/Neosofia/sdk/tree/main/python/authentication-middleware) — JWT validation (JWKS or static keys), tier-1 actor classification, and Flask decorators so every API authenticates callers the same way.
- [`authorization-in-the-middle`](https://github.com/Neosofia/sdk/tree/main/python/authorization-middleware) — Cedar authorization at the request boundary -- REST-to-policy inference, OpenAPI-backed write validation, and the [README](https://github.com/Neosofia/sdk/blob/main/python/authorization-middleware/README.md) that maps routes to principal/action/resource.
- [`logenvelope`](https://github.com/Neosofia/sdk/tree/main/python/logenvelope) — Structured JSON logging that conforms to the platform log schema -- consistent event types, no PHI in log lines, SIEM-ready output.
