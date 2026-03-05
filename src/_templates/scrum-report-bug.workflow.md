# Workflow: Report Bug

> **Type**: Issue Tracking & Routing | **Trigger**: Command `/report-bug`

This workflow formalizes how bugs are reported and refined in the system before they are worked on by the development team.

---

## Step 1: Bug Location & Reproduction

**Agent**: QA Engineer or Product Owner
**Do**: Identify exactly where the bug manifests.
**Write in the Bug Report**:

- **Location**: Specific URL, Component, or Backend Service.
- **Steps to Reproduce**: 1, 2, 3 chronological steps to force the bug to occur.

## Step 2: Evidence Gathering

**Agent**: QA / Backend Dev / DevOps
**Do**: Provide concrete proof of the failure. This is mandatory for refinement.
**Write in the Bug Report**:

- **Logs / Stack Trace**: Paste the exact terminal or server error.
- **Screenshots / Video**: Link or reference visual evidence if it is a UI/UX bug.
- **Environment**: e.g., Production, Staging, Local (Mac/PC).

## Step 3: Target Solution & Refinement Map

**Agent**: Tech Lead
**Do**: Analyze the bug report and propose the technical solution approach before it enters the Sprint.
**Write in the Bug Report**:

- **Root Cause Hypothesis**: Why is it failing?
- **Target Solution**: What is the expected fix? (e.g. "Update database query in user-controller.js to include active status check").

## Step 4: Scaffold the Report

1. Use the `docs/bugs/BUG-[NNN].md` file to store the report. (If the folder does not exist, create it).
2. Number the bug sequentially.
3. Once refined and mapped with Location, Evidence, and Solution, the Bug is ready to be pulled into a Sprint or hotfixed.
