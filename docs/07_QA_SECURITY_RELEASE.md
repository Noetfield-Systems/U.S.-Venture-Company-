# Product correctness & release checklist v2
## Current verified
- Published public website, lead intake API and private operator queue on Railway.
- Single attached persistent volume and access-controlled operator API.
- Internal smoke tests: create lead, reject anonymous operator, read, update, delete test case.
- Domain availability and server health were checked in prior deployment cycle.

## Category-critical items not yet live
- [ ] Formation-specific wizard with entity choice, cofounder count and financing intent.
- [ ] True fee estimator showing state, agent, tax/report, optional specialist services and assumptions.
- [ ] Customer authentication and case portal separate from admin token.
- [ ] Verified licensed/legal document provider and agent engagement.
- [ ] Genuine Delaware/other-state filing submission adapter.
- [ ] Official filing receipt reconciliation, signed company documents.
- [ ] EIN case evidence and founder-share/83(b) deadline handling.
- [ ] Verified merchant-of-record and settlement webhooks.
- [ ] Compliance obligations/calendar with state and entity triggers.
- [ ] Post-formation support case tracking and independent QA.
- [ ] Authentication, encrypted documents, tenant separation, deletion retention and concurrent datastore.
- [ ] User-visible eligibility, service boundaries, country restrictions and proper specialist advice.
- [ ] Mobile (360/390px) rendering and accessibility/audited performance.

## Minimum e2e formation acceptance
Real founder consents and signs; provider accepts actual order; state fee accounted; filing submitted; state-issued confirmation independently retrieved; customer receives document and case status; no fictional timestamps. Any step lacking proof remains pending. Do not simulate a bank or company charter and label it production.

## Release labels
PLANNED: design only. AVAILABLE: implemented service with provider and real transaction path. SUBMITTED: evidence of official filing. COMPLETED: authoritative accepted state or result. These labels must never be conflated.
