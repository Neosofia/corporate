# Documentation Gold Standards

Six months from now, someone will hit unexpected behavior -- a future architect, a new client, a new engineer on day one, or you at 2 a.m. wondering *why* the system works this way. The code says what it does; these documents say how it got there and what we intended.

Neosofia keeps docs in git on purpose: versioned, reviewable, tied to the same merge bar as the product. Constitutions, specs, ADRs, C4 models, `OPERATIONS.md`, changelogs -- each type answers a different question. We are building a clinical platform; clarity, disambiguation, and a single source of truth are safety features.

## Platform-wide (product repos, e.g. CDP)

### Constitution (`architecture/constitution.md`)

Stable, enduring principles every other artifact aligns with or amends explicitly.

Exemplar: [constitution.md](https://github.com/Neosofia/cdp/blob/main/architecture/constitution.md).

- **Core principles** -- A small set of outcome-oriented statements with rationale.
- **Governance** -- How this document sits relative to other artifacts and how disagreements are resolved.
- **Amendments** -- How changes to the constitution are proposed, reviewed, and recorded.

### Service specifications (`specs/`)

Product specifications describe **what each component must do**.

Cross-cutting transport, client platform support, logging, API contracts, and accessibility live in [000-platform-baseline.md](https://github.com/Neosofia/cdp/blob/main/specs/000-platform-baseline.md); feature specs inherit it and state component-specific additions.

Exemplar: [018-user-service.md](https://github.com/Neosofia/cdp/blob/main/specs/018-user-service.md).

- **Story first** -- Open with why the service exists and how it fits the platform, then client objectives, then functional and operational requirements.
- **Objectives in client language** -- State what operators, end users, and deploying products need to accomplish: intent and outcomes.
- **Requirements with context** -- Each requirement states the obligation and, where helpful, why it matters. Requirements are binding by default. Operational requirements describe what operators can measure or deploy.
- **Workflows (Given/When/Then)** -- Multi-step behavior as one happy path in plain language so readers see how objectives connect. Keep scenarios short and focused.

### Architecture decision records (`architecture/adrs/`)

Short, durable records of **architecturally significant** decisions so future contributors understand *why* a choice was made. Based on Michael Nygard's [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html).

Exemplar: [0001-use-adrs-and-c4-for-architecture-governance.md](https://github.com/Neosofia/cdp/blob/main/architecture/adrs/0001-use-adrs-and-c4-for-architecture-governance.md).

- **When to write one** -- Decisions that affect structure, non-functional characteristics, dependencies, interfaces, or construction techniques. One ADR, one significant decision.
- **Title** -- Short noun phrase (for example, "Use ADRs and C4 for architecture governance").
- **Context** -- Forces at play (technical, organizational, regulatory, project-local), value-neutral. Call out tensions; the same force may appear in many ADRs.
- **Decision** -- The team's response in full sentences, active voice.
- **Status** -- Lifecycle state. Superseded ADRs stay in the repo with a pointer to the replacement.
- **Consequences** -- What follows after the decision -- benefits, trade-offs, and follow-on work. Earlier ADR consequences often become context for later ones.
- **Size and tone** -- Short enough to read in one sitting. Write as a conversation with a future developer: paragraphs and full sentences.
- **Numbering** -- Sequential, monotonic IDs. Accepted ADRs are immutable; supersede with a new ADR when the decision changes.

### C4 architecture views (`architecture/structurizr/`)

**Maps of your code** at four zoom levels -- Context, Container, Component, and Code -- like zooming in and out on a map. Based on Simon Brown's [C4 model](https://c4model.com/introduction).

Exemplar: [structurizr/workspace.dsl](https://github.com/Neosofia/cdp/blob/main/architecture/structurizr/workspace.dsl).

- **Purpose** -- Shared visual language for onboarding, architecture reviews, risk identification, and threat modeling. Consistent notation and naming across every view in the collection.
- **One level per diagram** -- Each diagram answers one question for one audience. Link views so the zoom path reads Context → Container → Component → Code.
- **Level 1: System Context** -- Where the software system fits in the world: people in specific roles, the system, external dependencies, high-level interactions in plain language.
- **Level 2: Container** -- Deployable applications and data stores inside the system (logical units). How they communicate and the key technology choices.
- **Level 3: Component** -- One container at a time: grouped functionality behind clear interfaces, named concretely and aligned with the codebase.
- **Level 4: Code** -- Implementation detail lives in the repo; Component views link there when readers need to go deeper.
- **Supporting views** -- [System landscape](https://c4model.com/diagrams/system-landscape), [dynamic](https://c4model.com/diagrams/dynamic), and [deployment](https://c4model.com/diagrams/deployment) diagrams add portfolio, runtime, and infrastructure perspective alongside the core levels.
- **Diagram hygiene** -- Explained notation; labelled relationships; consistent element names across views; defined acronyms; readable views.
- **Living model** -- Architecture model in git as the single source of truth. Refresh Context and Container when system boundaries change; refresh Component views when internal structure materially changes.


## Per service repo

Every deployable service (authentication, user, capabilities, chat, etc.) owns the artifacts below at its repo root unless noted.

### Technical overview (`README.md`)

What this product does and how it fits the broader platform -- the front door for anyone landing in the repo.

Exemplar: [authentication/README.md](https://github.com/Neosofia/authentication/blob/main/README.md).

- **Product overview** -- One or two paragraphs on the problem the service solves and its role in the mesh. Lead with intent and outcomes.
- **Resource pointers** -- Links to sibling docs. One line per link: audience and purpose.
- **Glossary (optional)** -- Shared vocabulary where terms differ by layer or integration boundary.

### Operations (`OPERATIONS.md`)

How developers and system administrators run the service locally and in the cloud -- from empty laptop to verified healthy.

Exemplar: [authentication/OPERATIONS.md](https://github.com/Neosofia/authentication/blob/main/OPERATIONS.md).

- **Prerequisites** -- Tools, accounts, and external systems with install or signup links. A table works well.
- **Environment setup** -- What sample env files document and what operators supply from vault or handoff; required and optional settings.
- **Local development** -- Path from clone to healthy local service: dependencies, migrations, ports, smoke checks. Sub-pages when local and cloud paths diverge.
- **Cloud operations** -- Deployed-environment steps, verification, and pointers to infrastructure runbooks.
- **Common tasks** -- Recurring commands with copy-paste examples where they speed up the work.

### Security (`SECURITY.md`)

Security posture, controls, and reviewer guidance.

Exemplar: [authentication/SECURITY.md](https://github.com/Neosofia/authentication/blob/main/SECURITY.md).

**TODO:** Gold standard in progress.

### API contract (`openapi.json`)

Machine-readable API contract at the repo root for CI, codegen, and integrators.

Exemplar: [user/openapi.json](https://github.com/Neosofia/user/blob/main/openapi.json). Shared JSON Schemas: [schemas repo](https://github.com/Neosofia/schemas).

- **Single contract** -- Runtime validation and contract tests align with this file on every release.

### Changelog (`CHANGELOG.md`)

Human-readable changelog per [Keep a Changelog](https://keepachangelog.com/) -- outcomes for people who use or administer the product.

File name `CHANGELOG.md`, title `# Changelog`, sections **Added**, **Changed**, **Fixed**, **Removed**.

- **User-visible outcomes** -- What they can do or notice: screens, workflows, behavior.
- **Product language** -- Name UI areas the way users see them.

### Installation plan (`INSTALLATION_PLAN.md`)

Product Installation Plan (PIP): per-version deploy steps, configuration changes, post-deploy verification, and evidence.

- **Operator steps** -- Deploy steps, version pins, secrets, migrations, and smoke tests.
- **Evidence** -- What to capture to prove the version landed correctly.

## Release identifiers

Version strings exposed to operators, integrators, and health probes.

- **CDP UI** -- **CalVer** `YYYY.MM.DD` in the app footer (release day).
- **Backend services** -- **Semver** from the project manifest, exposed on `GET /health` as `"version": "<semver>"` alongside `"status"`.
