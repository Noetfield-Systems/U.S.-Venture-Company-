# RELEASE & OPERATIONS QUALITY CHECKLIST
- [x] Public copy in English, mobile layout, dark premium visual language, accessible form and keyboard controls.
- [x] Founder assessment multi-step and same-origin POST API with required consent, strict field bounds and honeypot.
- [x] Response reference ID, no customer record in public response.
- [x] Private operator endpoint with constant-time bearer comparison, PII restricted, updates and delete.
- [x] Security headers incl CSP, no public business logos/false customer counts, no actual payments claimed.
- [x] Health and state endpoint.
- [ ] Persistent production volume mounted and verified through restart.
- [ ] Live HTTP roundtrip intake -> operator read -> update -> delete.
- [ ] Real sender support/inquiry response workflow and rate limiting across replicas.
- [ ] Entity formation, bank account, processor and payment proof.
- [ ] Noetfield Company OS vendor integration and independent QA receipt.

Reliability notes: Node JSON file storage suits low-traffic single replica only. Never run multiple web replicas against the same file. Before scale, migrate to transactional Postgres, email notifications, session-based operator auth and durable async jobs. Preserve signed consent evidence and retention. A customer-funded pilot must have a real authorized merchant entity.
