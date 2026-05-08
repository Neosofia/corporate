# SDLC Best Practices Checklist

A practical checklist for shipping secure, observable, maintainable services. The checklist is language-agnostic; examples are illustrative, not prescriptive.

---

## Quick Reference

### Architecture & Separation of Concerns
- [ ] Keep transport, application logic, domain rules, persistence, and external integrations separated behind clear interfaces
- [ ] Keep controllers, handlers, and consumers thin; put business rules in reusable application services or use cases
- [ ] Keep long-running, scheduled, or retryable work out of the request path; run it as an explicit background worker or job
- [ ] Each service owns its contracts and data; integrate with other systems through published APIs or events, not direct database access

### Configuration & 12-Factor
- [ ] Store config and secrets in the environment or deploy-time configuration systems, not in code or per-environment branches
- [ ] Validate all required configuration at startup, provide safe defaults for non-secrets, and document every setting
- [ ] Use a deterministic local port-mapping strategy that avoids collisions across the full stack and document it per service
- [ ] Keep services stateless and disposable; store durable state in backing services
- [ ] Treat databases, queues, caches, object stores, and third-party APIs as attached resources configured per deploy
- [ ] Treat the Dockerfile or equivalent image definition as the authoritative operating environment; keep dev and prod as close as practical by promoting the same versioned image or materially identical build output
- [ ] Run admin, migration, and one-off tasks from the same codebase and release process as the main service

### Input Validation & Contracts
- [ ] Validate type, shape, length, format, and allowed values at every trust boundary
- [ ] Reject unknown fields by default unless extensibility is intentional and documented
- [ ] Cap payload size and return structured, generic error responses that do not echo unsafe input
- [ ] Keep published contracts and runtime validation in sync
- [ ] Expose liveness and readiness endpoints appropriate for orchestration and uptime checks

### Logging & Observability
- [ ] Emit structured logs to stdout or stderr as event streams
- [ ] Include consistent metadata in every log or event: timestamp, service, environment, severity, event type, and correlation, request, or trace identifiers where available
- [ ] Never log secrets or regulated or sensitive user data
- [ ] Capture service-level metrics and traces for latency, throughput, error rate, saturation, and dependency health
- [ ] Warn at startup when production-critical settings are using weak, local-only, or degraded modes

### Security & Resilience
- [ ] Enforce security controls appropriate to the surface area: TLS, security headers, CSRF or CORS policy, trusted proxy configuration, and least-privilege access
- [ ] Apply authentication and authorization at explicit boundaries; require authorization on every endpoint unless it is explicitly public and documented
- [ ] Each repo owns and clearly expresses its default authorization policies as code or declarative policy artifacts, for example Cedar
- [ ] Set explicit timeouts on outbound calls and use retries, backoff, circuit breaking, and idempotency only where the semantics support them
- [ ] Apply rate limiting to every endpoint, with explicit documented exemptions only where they are operationally required, such as health checks
- [ ] Keep diagnostic detail in internal telemetry; keep external error responses generic

### Supply Chain, Build & Release
- [ ] Pin and verify every supply-chain input: dependency lockfiles, base images, CI actions, internal packages, generated artifacts, and other third-party build inputs
- [ ] Use reproducible builds from committed manifests and lockfiles; do not resolve a fresh dependency graph during CI or release builds
- [ ] Keep runtime artifacts minimal: exclude build tools and dev-only dependencies, run as a non-privileged user where applicable, and define health checks
- [ ] Use multi-stage builds or equivalent build segregation to streamline the build process and keep final runtime images small and reproducible
- [ ] Produce immutable, versioned images and other release artifacts and record enough provenance to identify exactly what was built and deployed

### Testing & Delivery
- [ ] Integration tests verify all happy paths with the "right" level of mocking (mocking external systems such as APIs and databases, but testing the application through its real HTTP framework). For APIs, assert the HTTP code and verify the response conforms directly to the OpenAPI schema.
- [ ] Unit tests evaluate error conditions and boundaries by quickly isolating that part of the code and asserting the correct behavior (codes, logging, return values).
- [ ] Include at least one container test to prove the final image can execute, environment variables propagate correctly, and the health API endpoint responds. See the [Neosofia Authentication test_container.py](https://github.com/Neosofia/authentication/blob/main/tests/integration/test_container.py) as an example.
- [ ] Configuration files (like `config.py` and `gunicorn.py`) can be responsibly excluded from coverage mapping, provided their structure is exercised implicitly through booting integration tests.
- [ ] Keep each routinely executed automated test suite under 60 seconds; split slower environment-heavy checks into explicit suites rather than letting the default path sprawl.
- [ ] Enforce automated quality gates in CI: tests, linting, typing or static analysis, contract checks, policy checks, and at least 90% code coverage with a failing build below that threshold.
- [ ] Gate release on green automation and keep rollback to the last known-good release simple and rehearsed.

---

## Why These Categories Matter

### Architecture & Separation of Concerns

Thin adapters and explicit interfaces keep transport choices, data access, and business rules from bleeding into one another. That reduces accidental coupling, makes components testable in isolation, and lets you change storage, protocols, or deployment shape without rewriting core behavior.

### Configuration & 12-Factor

A service should behave like the same application in every environment, with configuration supplied from the outside. Stateless, disposable services, explicit backing services, deterministic local port allocation, and an authoritative image definition reduce configuration drift and make the full stack easier for operators to run locally and in production.

### Input Validation & Contracts

Every boundary is a trust boundary. Strict validation, bounded payloads, generic errors, and synchronized API contracts keep public behavior predictable and reduce injection, schema drift, and interoperability bugs.

### Logging & Observability

Logs, metrics, and traces are operational interfaces, not afterthoughts. Treating logs as structured event streams and keeping sensitive data out of them makes systems easier to operate without creating a second data leak surface.

### Security & Resilience

Security failures often come from implicit trust and missing limits. Default-on authorization, repo-owned policy definitions, explicit proxy and browser security rules, outbound timeouts, and endpoint-level rate limiting keep normal faults and hostile traffic from cascading into outages or data exposure.

### Supply Chain, Build & Release

Reproducibility is the foundation of trustworthy delivery. If dependencies, image definitions, CI actions, or internal artifacts are not pinned and verifiable, you cannot prove what you tested, built, or deployed, and versioned images lose their value as the unit of release.

### Testing & Delivery

Unit tests catch local logic defects; integration and end-to-end tests catch wiring, runtime, and deployment failures. Keeping routinely executed suites under a 60-second budget makes them likely to be run continuously, while an explicit 80% coverage ggate keeps delivery pressure from eroding test depth over time (we enforce 90% in most microservices).
