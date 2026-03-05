# Phase 6: Release & Monitoring

> **Discipline**: DevOps + Data | **Sequence**: Sixth (Final)

## Goal

Deploy the validated feature to production, demonstrate it to stakeholders,
and close the feedback loop by measuring real-world impact.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| [Scrum Master](../agents/scrum-master.md) | Facilitates Sprint Review and Retrospective |
| [DevOps Engineer](../agents/devops-engineer.md) | Executes production deployment; monitors health; manages rollback |
| [Data Lead](../agents/data-lead.md) | Monitors dashboards post-release; reports to PO |
| [Product Owner](../agents/product-owner.md) | Accepts the feature; adjusts roadmap |
| [Tech Lead](../agents/tech-lead.md) | Oversees deployment; makes rollback decision |
| [Developer](../agents/developer.md) | Monitors application health post-deploy |

---

## Skills Used

- [telemetry-design](../skills/telemetry-design.md) — Monitoring live telemetry events

---

## Inputs

| Artifact | Source |
|---|---|
| `docs/features/{feature}/05-validation/validation-report.md` | Phase 5 |
| DoD checklist (fully signed) | Phase 5 |

---

## Activities (in order)

1. **Deployment** — DevOps Engineer executes CI/CD pipeline deployment to production.
2. **Health check** — DevOps Engineer verifies application health (error rates, latency, telemetry pipeline).
3. **Sprint Review** — SM facilitates demo to stakeholders; PO presents the feature.
4. **Monitoring window** — Data Lead tracks live telemetry; DevOps monitors infrastructure for 24–48h.
5. **Feedback report** — Data Lead delivers usage metrics to PO.
6. **Retrospective** — SM facilitates blameless retrospective; DevOps contributes deploy experience.

---

## Sprint Review Template

```markdown
## Sprint Review: {Sprint Name}

**Date**: YYYY-MM-DD | **Facilitator**: Scrum Master

### Features Demonstrated
| Feature | Status | Demo delivered by |
|---------|--------|-------------------|
| {feature-slug} | ✅ Released | [Agent] |

### Stakeholder Feedback
[Capture feedback during review]

### Backlog Adjustments
[Changes to backlog resulting from feedback]
```

---

## Post-Release Monitoring Checklist

- [ ] Error rate within acceptable thresholds (< 1% of requests)
- [ ] Telemetry events flowing to dashboard
- [ ] Adoption metric tracking toward target
- [ ] No rollback required within 24h
- [ ] Data Lead usage report delivered to PO

---

## Rollback Protocol

If a critical issue is discovered post-deploy:

1. Tech Lead makes rollback decision.
2. DevOps Engineer initiates rollback via CI/CD pipeline.
3. Scrum Master documents the incident in `docs/features/{feature}/06-release/incidents/rollback-YYYY-MM-DD.md`.
4. Feature returns to Phase 5 (no re-deployment without QA re-validation and Security sign-off).
5. PO notified within 30 minutes.

---

## Exit Gate (Sprint Closure)

| Criterion | Checked by |
|---|---|
| Sprint Review completed with stakeholder sign-off | SM |
| Deployment log written (`docs/features/{feature}/06-release/deploy-log.md`) | DevOps Engineer |
| Monitoring clean for 48h | Data Lead + DevOps Engineer |
| Retrospective held and action items documented | SM |
| Feature artifacts archived in `docs/features/{feature}/` | Tech Lead |

**Output**: `docs/features/{feature}/06-release/release-notes.md` + Usage report

**Feedback loop to**: Phase 1 (next cycle) via PO roadmap update
