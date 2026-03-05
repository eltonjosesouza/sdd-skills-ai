# Skill: DDD Modeling (Domain-Driven Design)

> **Layer**: Skills | **Used by**: Product Owner, Tech Lead, Developer

## What is this skill?

DDD Modeling defines how the team discovers, names, and structures the business
domain. It ensures that the code speaks the same language as the business — and
that AI-generated agents reflect real-world team structures, not technical abstractions.

---

## 1. Ubiquitous Language

The Ubiquitous Language is the **shared vocabulary** used by everyone on the team
*and* in the code. There is no separate "business language" and "technical language."

**Rules:**
- Every term introduced during Discovery is recorded in `scrum/protocol/glossary.md`.
- Developers MUST use glossary terms as identifier names (classes, methods, variables).
- If a term changes in business, it MUST change everywhere in the codebase.

**Glossary entry format:**
```markdown
### {Term}
- **Definition**: [What it means in this domain]
- **Introduced in**: Phase {N}, Sprint {N}
- **Bounded Context**: [{context name}]
- **Example**: [Usage in a sentence]
- **Alias (deprecated)**: [Former name, if applicable]
```

---

## 2. Bounded Contexts

A Bounded Context is a **clear boundary** within which a domain model applies.
Outside the boundary, the same concept may have a different name or meaning.

**Rules:**
- Each feature belongs to exactly one primary Bounded Context.
- Cross-context communication happens only through explicit interfaces (events or APIs).
- The Tech Lead MUST declare the Bounded Context in the Spec header.

**Contexts in this project:**

| Context | Responsibility |
|---|---|
| **Discovery** | User research, personas, problem definition |
| **Contract** | API Spec, telemetry schema, interface design |
| **Development** | Business logic, domain entities, use cases |
| **Quality** | Test strategy, contract validation, DoD |
| **Data** | Analytics, telemetry, dashboards, feedback loop |
| **Process** | Sprint ceremonies, impediments, retrospectives |

---

## 3. Key DDD Building Blocks

| Building block | Purpose | Example |
|---|---|---|
| **Entity** | Object with identity that persists over time | `Order`, `User`, `Sprint` |
| **Value Object** | Immutable descriptor, no identity | `Email`, `Priority`, `Status` |
| **Aggregate** | Cluster of entities with a root controlling invariants | `OrderAggregate` (root: `Order`) |
| **Domain Event** | Signal that something meaningful happened | `FeatureDeployed`, `UserRegistered` |
| **Repository** | Interface to load/save aggregates (no DB details) | `OrderRepository` |
| **Service** | Stateless operation that doesn't fit an entity | `PricingService`, `NotificationService` |

---

## 4. Context Map

Document the relationship between Bounded Contexts as the project grows:

```markdown
## Context Map — {Project Name}

| Upstream Context | Downstream Context | Relationship | Interface |
|---|---|---|---|
| Discovery | Contract | Customer/Supplier | User Story → Spec |
| Contract | Development | Conformist | Spec → Implementation |
| Development | Data | Open Host Service | Telemetry events |
| Data | Discovery | Partnership | Usage reports → PO |
```

---

## Common DDD Mistakes

| Mistake | Consequence | Correct approach |
|---|---|---|
| Using DTO names as domain names | Code doesn't speak business language | Use Glossary terms |
| Giant "God" context | Everything depends on everything | Split into focused contexts |
| Skipping Event Storming | Domain events discovered too late | Run Event Storming before Phase 2 |
| Anemic domain models | Business logic leaks into services | Put logic in aggregates |
