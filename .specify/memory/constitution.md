<!--
Sync Impact Report:
- Version Change: 0.0.0 -> 1.0.0 (Initial Ratification)
- Modified Principles: Created 5 custom principles based on SDD Skills AI CLI structure and SDD philosophy.
- Added Sections: N/A
- Removed Sections: Removed empty SECTION_2 and SECTION_3 from the template.
- Templates Requiring Updates: (✅) None initially; the generic templates apply reasonably well to this CLI structure.
- Follow-up TODOs: None.
-->

# SDD Skills AI Constitution

## Core Principles

### I. Wrap and Simplify

The CLI MUST act as a wrapper to initialize projects using Spec-Driven Development tools (`@fission-ai/openspec`, `spec-kit`, `@vudovn/ag-kit`, and `antigravity-awesome-skills`), prioritizing orchestration over maintaining massive predefined setups for every framework.

### II. Spec-Driven Organization

The specification (test) acts as the living documentation and primary driver for the code. `.spec.ts` files MUST be co-located exactly alongside their implementations within focused Use Case directories (e.g., `src/modules/.../useCases/featureName/featureName.spec.ts` next to `featureName.ts`).

### III. AI-Friendly Environment Setup

Project scaffolding MUST prioritize generating AI-friendly contexts (like `spec.md` for OpenSpec) and MUST allow selective injection of AI agent skills (e.g., via `sdd-skills-ai apply-skills` for Antigravity Kit or Awesome Skills).

### IV. Zero-Friction Initialization

The tool MUST support zero-install usage via `npx sdd-skills-ai init` (including interactive modes when arguments are omitted) as well as global installation patterns.

### V. Test-Ready by Default

Generated projects MUST come pre-configured with TypeScript, Jest (`ts-jest`), NPM scripts (ready for `npm run test`), and a concrete example use case to immediately demonstrate the Spec-Driven development cycle.

## Governance

This Constitution supersedes all other practices for SDD Skills AI.
All PRs and reviews MUST verify compliance with the Spec-Driven and AI-friendly principles outlined above. Any newly added CLI wrappers or templates MUST respect the co-location rule (Principle II) and test-readiness (Principle V).

**Version**: 1.0.0 | **Ratified**: 2026-02-27 | **Last Amended**: 2026-02-27
