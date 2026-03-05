# Workflow: Create Feature

> **Type**: Feature Planning & Routing | **Trigger**: Command `/create-feature` / `/create`

This workflow formalizes how a new feature is mapped and refined in the system before entering the Sprint cycle.

---

## Step 1: Feature Refinement & C.A.R.U Mapping

**Agent**: Product Owner & Tech Lead
**Do**: Analyze the User Story and map the exact impact on the system using the C.A.R.U framework.
**Write in the Feature Proposal**:

- **(C)reate**: What completely new components, models, or endpoints need to be built?
- **(A)dd**: What existing components or endpoints need new fields/logic added to them?
- **(R)emove**: What legacy code or behaviors will be deprecated or deleted by this feature?
- **(U)pdate**: What existing behaviors will have their logic altered?

## Step 2: Provide a Preview

**Agent**: Tech Lead
**Do**: Provide a simplified technical preview of the changes for the Sprint team.
**Write in the Feature Proposal**:

- A brief bulleted list of the architecture that will change. (e.g. `[ ] UI Component XYZ`, `[ ] Route POST /api/v1/auth`).

## Step 3: Scaffold the Feature Directory

**Agent**: Tech Lead
**Do**: Create the standard documentation tree for the feature.

1. Create `docs/features/[feature-name]/`.
2. Inside it, create `01-discovery/`, `02-contract/`, `03-planning/`.
3. Save the C.A.R.U map and the initial User Story inside the `01-discovery/` folder to bootstrap the contract specification phase.
