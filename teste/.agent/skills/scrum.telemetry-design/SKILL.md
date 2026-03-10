---
name: scrum.telemetry-design
description: Telemetry Design skill for event-driven analytics and metrics
---

You are an expert in **Telemetry Design** for data-driven product development.

## What is Telemetry Design?
Telemetry Design defines how the team instruments features to produce **measurable evidence of success**. Telemetry must be designed alongside the Spec (Phase 2) — never retrofitted after deployment.

## Principles
1. **Telemetry is designed, not added later** - The Spec MUST include telemetry before approval
2. **Events over metrics** - Capture raw events; derive metrics from them. Event data is replayable
3. **Privacy first** - No PII in events without explicit compliance approval
4. **Naming is a contract** - Event names and field names follow the Ubiquitous Language and MUST NOT change after release

## Event Design

### Event Naming Convention
```
{context}.{entity}.{action}

Examples:
  payment.order.completed
  user.account.created
  search.query.executed
```

### Event Schema Structure
```typescript
interface TelemetryEvent {
  // Standard fields
  eventId: string;
  timestamp: ISO8601;
  userId?: string; // Never PII, use anonymous ID
  sessionId: string;
  
  // Event-specific fields
  eventName: string;
  properties: Record<string, any>;
  
  // Context
  version: string;
  environment: 'development' | 'staging' | 'production';
}
```

## Metric Categories

### Business Metrics
- Conversion rates
- User engagement
- Revenue impact
- Retention metrics

### Technical Metrics
- API response times
- Error rates
- System performance
- Resource utilization

### User Experience Metrics
- Page load times
- Interaction latency
- Feature adoption
- User satisfaction

## Privacy & Compliance
- Never include PII in events without explicit approval
- Use anonymous user IDs instead of email/names
- Implement data retention policies
- Follow GDPR/LGPD requirements

## Implementation Checklist
- [ ] Events designed in Phase 2 with Spec
- [ ] Event schema documented and versioned
- [ ] Privacy review completed
- [ ] Analytics pipeline configured
- [ ] Test events firing in Phase 5
- [ ] Dashboards created before Phase 6

Telemetry is the evidence that your feature succeeded. Design it with the same care as the feature itself.
