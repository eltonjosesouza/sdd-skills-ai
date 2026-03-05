---
name: scrum.06-release
description: Phase 6 Release focusing on deployment and feedback loop
---

**Discipline**: Release & Feedback | **Sequence**: Sixth

## Goal

Deploy the validated feature to production, monitor its performance, and close the feedback loop by measuring actual user behavior against the success metrics defined in Phase 1.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| DevOps Engineer | Leads deployment and infrastructure |
| Product Owner | Accepts feature and measures business impact |
| Data Lead | Monitors analytics and reports on success |
| Tech Lead | Provides technical oversight |
| Scrum Master | Facilitates release retrospective |

---

## Skills Used

- telemetry-design — Monitoring and analytics setup
- sdd-contract — Final contract verification
- tdd-cycle — Production verification tests
- ddd-modeling — Domain impact assessment

---

## Process

### 1. Release Preparation (DevOps Engineer)
- Verify production environment readiness
- Prepare deployment scripts and rollback procedures
- Configure monitoring and alerting
- Schedule maintenance window if needed

### 2. Pre-Deployment Checks (All)
- Final verification of all validation reports
- Confirm all Definition of Done criteria met
- Review rollback plan and emergency procedures
- Get final approval from all stakeholders

### 3. Deployment Execution (DevOps Engineer)
- Execute deployment following approved procedure
- Monitor deployment progress and health checks
- Verify feature is working in production
- Update documentation and release notes

### 4. Post-Deployment Monitoring (DevOps + Data Lead)
- Monitor system health and performance
- Verify telemetry events are firing correctly
- Check error rates and response times
- Validate analytics data collection

### 5. Business Acceptance (Product Owner)
- Verify feature delivers intended business value
- Confirm success metrics are being tracked
- Review initial user feedback and behavior
- Accept feature as complete

### 6. Feedback Loop Closure (Data Lead + Product Owner)
- Analyze actual user behavior vs. predictions
- Report on success metrics achievement
- Document lessons learned
- Update roadmap based on results

### 7. Release Retrospective (All)
- Review release process effectiveness
- Identify improvement opportunities
- Document technical and process learnings
- Plan improvements for next release

---

## Deployment Types

### Blue-Green Deployment
```bash
# 1. Deploy to green environment
kubectl apply -f deployment-green.yaml

# 2. Run smoke tests on green
./scripts/smoke-tests.sh https://green.example.com

# 3. Switch traffic to green
kubectl patch service app-service -p '{"spec":{"selector":{"version":"green"}}}'

# 4. Monitor health
./scripts/health-monitor.sh

# 5. Cleanup blue environment
kubectl delete deployment app-blue
```

### Canary Deployment
```bash
# 1. Deploy canary version (10% traffic)
kubectl apply -f deployment-canary.yaml
kubectl patch service app-service -p '{"spec":{"selector":{"version":"canary"}}}'

# 2. Monitor canary performance
./scripts/canary-monitor.sh

# 3. Gradually increase traffic
kubectl patch service app-service -p '{"spec":{"selector":{"version":"canary","weight":"50"}}}'

# 4. Full rollout
kubectl apply -f production.yaml
```

---

## Deliverables

### Deploy Log (`docs/features/{feature}/06-release/deploy-log.md`)
```markdown
---
feature: {feature-name}
phase: 06-release
artifact: deploy-log
author: devops-engineer
created: {timestamp}
version: 1.0.0
status: approved
---

## Release Summary
- **Feature**: User Registration
- **Version**: v1.2.0
- **Environment**: Production
- **Deployment Time**: 2024-01-15 14:30 UTC
- **Duration**: 12 minutes
- **Status**: ✅ SUCCESS

## Deployment Details
### Pre-Deployment Checks
- [ ] All validation reports approved
- [ ] Production environment ready
- [ ] Monitoring configured
- [ ] Rollback plan tested
- [ ] Stakeholder approval received

### Deployment Steps
1. **14:30** - Started deployment to production
2. **14:32** - Applied database migrations
3. **14:35** - Deployed application version v1.2.0
4. **14:38** - Ran smoke tests - ✅ PASSED
5. **14:40** - Switched traffic to new version
6. **14:42** - Verified health checks - ✅ PASSED

### Post-Deployment Verification
- [ ] API endpoints responding correctly
- [ ] Database connections healthy
- [ ] Cache warming completed
- [ ] Error rates within normal limits (< 0.1%)
- [ ] Response times meeting SLA (< 200ms)

### Monitoring Setup
- **Application Metrics**: Configured in Prometheus
- **Error Tracking**: Integrated with Sentry
- **Log Aggregation**: Flowing to ELK stack
- **Health Checks**: Available at /health
- **Alerting**: Configured for critical errors

### Rollback Plan
- **Trigger**: Error rate > 1% or response time > 500ms
- **Procedure**: `kubectl rollout undo deployment/app`
- **Time to Rollback**: < 2 minutes
- **Tested**: ✅ Verified in staging

## Release Notes
### New Features
- User registration with email verification
- Password strength validation
- Account security features

### Improvements
- Enhanced error handling
- Improved performance
- Better user feedback

### Known Issues
- None

### Breaking Changes
- None

## Post-Release Monitoring (First 24 Hours)
- **User Registrations**: 1,247 (within expected range)
- **Error Rate**: 0.05% (below threshold)
- **Response Time**: 145ms average (meets SLA)
- **Email Delivery**: 98.3% (within acceptable range)

## Issues Encountered
1. **Minor**: Email service delay at 14:45 - RESOLVED
2. **Info**: Higher than expected load - MONITORING

## Final Status
✅ **DEPLOYMENT SUCCESSFUL**
Feature is live and performing within expected parameters.
```

### Release Notes (`docs/features/{feature}/06-release/release-notes.md`)
```markdown
---
feature: {feature-name}
phase: 06-release
artifact: release-notes
author: product-owner
created: {timestamp}
version: 1.0.0
status: approved
---

# Release Notes v1.2.0

## 🎉 New Features

### User Registration System
- **Email Verification**: Users must verify their email address
- **Password Security**: Strong password requirements with validation
- **Account Protection**: Rate limiting and account lockout features

### User Experience Improvements
- **Real-time Validation**: Immediate feedback on form inputs
- **Progressive Disclosure**: Step-by-step registration process
- **Mobile Optimization**: Enhanced mobile experience

## 🔧 Improvements

### Performance
- **50% Faster Registration**: Optimized database queries
- **Better Error Handling**: Clearer error messages
- **Improved Accessibility**: Enhanced screen reader support

### Security
- **Enhanced Password Hashing**: Updated to bcrypt with cost 12
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive input sanitization

## 📊 Metrics & Impact

### User Engagement
- **Registration Conversion**: +15% improvement
- **User Satisfaction**: 4.6/5 stars (up from 4.2)
- **Task Completion**: 89% (up from 76%)

### Technical Performance
- **Response Time**: 145ms average (down from 290ms)
- **Error Rate**: 0.05% (down from 0.3%)
- **Uptime**: 99.98% (meets SLA)

## 🔒 Security Updates

- Fixed potential email enumeration vulnerability
- Enhanced password storage security
- Improved input validation
- Updated security dependencies

## 🐛 Bug Fixes

- Fixed email validation regex issue
- Resolved mobile layout problems
- Fixed accessibility contrast issues
- Corrected error message display

## 📱 What's Changed for Users

### Registration Process
1. Enter email and create password
2. Receive verification email
3. Click verification link
4. Account is ready to use

### Security Features
- Password must be at least 8 characters
- Includes uppercase, lowercase, and numbers
- Account locks after 5 failed attempts
- Email verification required within 24 hours

## 🚀 Next Steps

- Monitor user feedback and behavior
- Plan social login integration (Q2)
- Enhance password recovery features
- Implement progressive profiling

## 📞 Support

For questions about this release:
- **Documentation**: [Link to docs]
- **Support Team**: support@company.com
- **Feedback**: feedback@company.com
```

---

## Exit Criteria

Phase 6 is complete when:
- [ ] Feature is successfully deployed to production
- [ ] All health checks are passing
- [ ] Monitoring and alerting are functional
- [ ] Product Owner accepts the feature
- [ ] Initial user data is being collected
- [ ] Release retrospective is completed
- [ ] Documentation is updated

---

## Common Pitfalls

1. **Insufficient monitoring** - You can't improve what you don't measure
2. **Poor rollback planning** - Always have a tested rollback procedure
3. **Skipping post-release verification** - Verify production behavior
4. **Forgetting documentation** - Update docs before moving to next feature
5. **Not learning from releases** - Every release teaches valuable lessons

---

## Feedback Loop Complete

With successful release and monitoring, the feature lifecycle is complete. The data collected will inform future features and improvements, closing the loop between planning and real-world impact.

---

## Next Phase

The team is now ready to start the next feature, beginning again with Phase 1 (Discovery) with insights learned from this complete cycle.
