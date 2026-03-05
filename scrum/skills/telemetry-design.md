# Skill: Telemetry Design

> **Layer**: Skills | **Used by**: Data Lead, Developer, QA Engineer

## What is this skill?

Telemetry Design defines how the team instruments features to produce
**measurable evidence of success**. Telemetry must be designed alongside the
Spec (Phase 2) — never retrofitted after deployment.

---

## Principles

1. **Telemetry is designed, not added later.** The Spec MUST include telemetry before approval.
2. **Events over metrics.** Capture raw events; derive metrics from them. Event data is replayable.
3. **Privacy first.** No PII in events without explicit compliance approval.
4. **Naming is a contract.** Event names and field names follow the Ubiquitous Language and MUST NOT change after release without a migration plan.

---

## Event Design

### Event Naming Convention

```
{context}.{entity}.{action}

Examples:
  payment.order.completed
  discovery.feature.approved
  development.test.failed
  quality.contract.validated
```

### Standard Event Envelope

Every event MUST include these fields:

```json
{
  "event": "context.entity.action",
  "timestamp": "2026-03-04T15:00:00Z",
  "session_id": "uuid-v4",
  "feature_id": "feature-slug",
  "env": "production | staging | development"
}
```

### Domain-Specific Payload

Additional fields specific to this event go in a `properties` object:

```json
{
  "..envelope fields...",
  "properties": {
    "custom_field": "value"
  }
}
```

---

## Success Metrics Framework

Each feature MUST define at minimum:

| Metric type | Question it answers | Example |
|---|---|---|
| **Adoption** | Are users actually using it? | `% sessions with event X` |
| **Completion** | Do they finish the flow? | `% users who reach final step` |
| **Error rate** | How often does it fail? | `% events with error payload` |
| **Business value** | Is it delivering ROI? | `revenue_impact from feature` |

---

## PII Checklist

Before including any field in an event:

- [ ] Is this field PII? (name, email, phone, IP, device ID)
- [ ] If yes: Is it hashed/anonymized? Document the hashing method.
- [ ] If yes: Is this approved by Legal/Compliance?
- [ ] Is the retention period for this event defined?

---

## Telemetry Document Template

The Data Lead produces this file in Phase 2, stored at `docs/features/{feature}/02-contract/telemetry.md`:

```markdown
## Telemetry Design: {Feature Name}

**Author**: Data Lead | **Date**: YYYY-MM-DD
**Spec reference**: docs/features/{feature}/02-contract/spec.md

### Events

| Event name | Trigger | Phase |
|---|---|---|
| `{context}.{entity}.{action}` | [When] | [Spec section] |

### Event Detail: {event_name}

**Payload**:
| Field | Type | PII? | Description |
|-------|------|------|-------------|
| `field` | string | No | [what it means] |

**PII handling**: [None / Hashed with SHA-256 / Approved by compliance on YYYY-MM-DD]

### Success Metrics
| Metric | Formula | Target |
|--------|---------|--------|
| Adoption | events / sessions × 100 | ≥ 60% |

### Dashboard location
[Link to dashboard or `TODO: create after deploy`]
```
