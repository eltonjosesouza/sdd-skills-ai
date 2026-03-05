opa # scrum/ — Scrum Agents Standards Kit

> A documentation framework for standardizing how AI agents and human teams
> collaborate through Scrum, applying **SDD + TDD + DDD** disciplines.

---

## How to Read This Kit

**An agent starting a new task** should:
1. Identify the **current phase** of the feature → read the matching `phases/` file.
2. Confirm their **role** in that phase → read the matching `agents/` file.
3. Load the **skills** listed in that agent file → read `skills/` as needed.
4. Follow the **protocol rules** → reference `protocol/` files.

**A newcomer joining the team** should:
1. Read `protocol/scrum-flow.md` — the full phase sequence.
2. Read `protocol/communication.md` — how artifacts are passed between agents.
3. Read their own `agents/{role}.md` file.

---

## Structure

```
scrum/
├── README.md                     ← You are here
│
├── protocol/                     ← The rulebook (read first)
│   ├── scrum-flow.md             ← Phase sequence and ceremony mapping
│   ├── communication.md          ← Artifact-first coordination rules
│   └── dod-checklist.md          ← Definition of Done
│
├── agents/                       ← Who does what (inputs/outputs per phase)
│   ├── product-owner.md
│   ├── scrum-master.md
│   ├── ux-designer.md
│   ├── developer.md
│   ├── qa-engineer.md
│   ├── security-engineer.md      ← Threat modeling, SAST, secure code review
│   ├── devops-engineer.md        ← CI/CD, environments, deployment, rollback
│   ├── data-lead.md
│   └── tech-lead.md
│
├── skills/                       ← Reusable discipline guides
│   ├── sdd-contract.md           ← How to write, read, and validate Specs
│   ├── tdd-cycle.md              ← Red → Green → Refactor discipline
│   ├── ddd-modeling.md           ← Ubiquitous Language, Bounded Contexts
│   └── telemetry-design.md       ← Event design, metrics, PII handling
│
├── phases/                       ← Phase-level quick reference
│   ├── 01-discovery.md           ← DDD: problem framing
│   ├── 02-contract.md            ← SDD: Spec authoring and freeze
│   ├── 03-sprint-planning.md     ← Scrum: task breakdown and commitment
│   ├── 04-development.md         ← TDD: parallel implementation
│   ├── 05-validation.md          ← Contract + UX + Data triple validation
│   └── 06-release.md             ← Deploy, monitor, feedback loop
│
└── workflows/                    ← End-to-end orchestration
    ├── project-init.md           ← Standard procedure to initialize projects/repos
    ├── feature-lifecycle.md      ← Full 6-phase feature flow
    ├── sprint-planning.md        ← Sprint Planning ceremony
    └── bug-fix.md                ← Corrective flow with TDD
```

---

## Quick Reference: Who Acts in Which Phase

| Phase | PO | SM | UX | Dev | QA | Security | DevOps | Data | TL |
|---|---|---|---|---|---|---|---|---|---|
| 1 Discovery | ✅ Lead | ✅ Facilitates | ✅ Lead | — | — | — | — | ✅ Validates | — |
| 2 Contract | reviews | tracks | input | — | ✅ Reviews | ✅ Threat model | — | ✅ Lead | ✅ Lead |
| 3 Planning | ✅ Clarifies | ✅ Facilitates | clarifies | ✅ Estimates | ✅ Strategy | ✅ Sec tasks | ✅ Infra tasks | — | ✅ Guides |
| 4 Development | — | ✅ Daily | — | ✅ Lead | — | ✅ Code review | ✅ CI/CD+Staging | — | ✅ Reviews |
| 5 Validation | — | tracks DoD | ✅ Validates | standby | ✅ Lead | ✅ SAST+Audit | — | ✅ Validates | resolves |
| 6 Release | ✅ Accepts | ✅ Review/Retro | — | monitors | — | — | ✅ Lead | ✅ Lead | ✅ Oversight |

---

## Governing Constitution

All principles enforced by this kit are defined in:
[`.specify/memory/constitution.md`](../.specify/memory/constitution.md)

---

## Document Structure (`docs/`)

The team organizes its work using a hybrid **Feature-Driven** and **Sprint-Driven** structure:

```
docs/
├── architecture/                       ← Global cross-feature constraints
│   ├── tech-stack.md                   (Languages, frameworks, core libs)
│   ├── tooling.md                      (DevOps, CLI tools, IDE configs)
│   ├── data-model.md                   (High-level ERDs, global models)
│   └── decisions/                      (Architecture Decision Records - ADRs)
│       └── 001-adopt-nextjs.md
│
├── features/
│   └── {feature-slug}/                 ← Persistent domain artifacts
│       ├── 01-discovery/               (user-story.md, prototype.md)
│       ├── 02-contract/                (spec.md, telemetry.md, threat-model.md)
│       ├── 03-planning/                (test-strategy.md)
│       ├── 05-validation/              (validation-report.md, security-report.md)
│       └── 06-release/                 (deploy-log.md, release-notes.md)
│
└── sprints/
    ├── sprint-01/                      ← Timeboxed execution tracking
    │   ├── backlog.md                  (Sprint backlog and goals)
    │   ├── retrospective.md    
    │   └── tasks/
    │       ├── T-001.md
    │       └── T-002.md
    └── sprint-02/
```

