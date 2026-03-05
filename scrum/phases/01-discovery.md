# Phase 1: Discovery & Definition

> **Discipline**: DDD | **Sequence**: First

## Goal

Understand the problem before proposing any solution. Define the domain language
that will be used throughout all subsequent phases.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [Product Owner](../agents/product-owner.md) | Defines the problem and writes the User Story |
| [UX Designer](../agents/ux-designer.md) | Validates prototype with users |
| [Data Lead](../agents/data-lead.md) | Validates feasibility from historical data |
| [Scrum Master](../agents/scrum-master.md) | Facilitates the discovery session |

---

## Skills Used

- [ddd-modeling](../skills/ddd-modeling.md) — Ubiquitous Language definition, context mapping

---

## Inputs

| Artifact | Source |
|---|---|
| Backlog item | Product Owner / Stakeholders |
| Historical dashboards | Data Lead |
| User research | UX Designer |

---

## Activities (in order)

1. **Problem framing** — PO articulates the problem in business language. No solutions discussed.
2. **Domain term identification** — Team identifies new terms; PO adds them to `scrum/protocol/glossary.md`.
3. **Data feasibility check** — Data Lead presents evidence that the problem exists and is measurable.
4. **Prototype** — UX Designer creates and validates an interactive prototype.
5. **User Story writing** — PO writes the final User Story using the Ubiquitous Language.

---

## Exit Gate

| Criterion | Checked by |
|---|---|
| User Story written using only Glossary terms | Tech Lead |
| UX prototype validated with real users or usability test | UX Designer |
| Data Lead confirms measurable success metric exists | Data Lead |
| No open ambiguities in User Story | PO |

**Output**: `docs/features/{feature}/01-discovery/user-story.md` + `docs/features/{feature}/01-discovery/prototype.md`

**Handoff to**: [Phase 2 — Contract Design](./02-contract.md)
