# U.S. Venture Company — U.S. incorporation and startup-operations platform
**Version 2.0 | 2026-11-13 | founding-stage; legal entity is not yet incorporated**

This is an independent proposed American venture: a platform for global founders planning to form a Delaware C-Corp or U.S. LLC, set up equity/EIN and understand ongoing corporate obligations. **Primary product benchmark: Stripe Atlas.** Direct competitors: Clerky, Firstbase, doola, Gust Launch, StartGlobal and Commenda. We do **not** benchmark unrelated CRMs, design tools or abstract enterprise SaaS.

### Product reality
LIVE: English-responsive public homepage, formation-readiness intake with entity choice and funding intent, server-side consented storage, limited private operator console, API health/status.
NOT YET LIVE: U.S. legal entity, formation filing, EIN applications, founder share issuance, 83(b) filing, bank/merchant approval, customer authentication, partner execution, financial checkout, real customer incorporated.
No fake company filings, bank accounts, customer logos, partnership endorsements, paid customers or financing performance.

### Legal and founder boundaries
Two proposed owners: Canada-based nonexecutive investor/shareholder, California-resident U.S. founding partner. Equity split, board/officer roles, agent, actual contracts and filing are unfinalized. Noetfield Systems Inc. is a separate Canadian technology vendor under prospective agreement, not the registered company or its automatically authorized manager. State of incorporation and actual state-of-business obligations differ.

### Developer run
Node.js 20+. No npm dependencies.
- npm start — executes local smoke test then starts HTTP server.
- npm test — checks intake creation, admin authentication, update, delete, and formation-intent storage.
- GET /api/health /api/status
- POST /api/intake (assessment, with explicit contact consent)
- GET/PATCH/DELETE /api/admin/leads (Bearer ADMIN_TOKEN)
- /operator — private operator UI.

Production Railway: one replica, persistent volume at DATA_DIR=/data, high-entropy ADMIN_TOKEN. File-based JSON storage is for modest pilot throughput; migrate to Postgres before sensitive file collection, customer workspaces or replicas.

### Where to read
- [Master blueprint](docs/00_MASTER_BLUEPRINT.md)
- [ICP and GTM](docs/01_PRODUCT_ICP_GTM.md)
- [Founder/entity operating boundaries](docs/02_COMPANY_FORMATION.md)
- [Noetfield vendor/Company OS](docs/03_OPERATIONS_COMPANY_OS.md)
- [30/60/90 growth plan](docs/04_GROWTH_30_60_90.md)
- [Contracts and privacy templates](docs/05_LEGAL_PRIVACY_TEMPLATES.md)
- [Investor thesis](docs/06_INVESTOR_DATAROOM.md)
- [QA and proof obligations](docs/07_QA_SECURITY_RELEASE.md)
- [Primary sources](docs/08_SOURCES.md)
- [Direct competitor evidence matrix](docs/09_COMPETITOR_EVIDENCE_MATRIX.md)
- [Atlas-category visual and product UX spec](docs/10_ATLAS_NATIVE_UX_SPEC.md)
- [Pricing and unit economics](docs/11_PRICING_UNIT_ECONOMICS.md)
- [Website marketing copy](docs/12_MARKETING_COPY_EN.md)

**Runbook:** marketing intake is real. Official company formation services must only be advertised as available once qualified filing/payment contracting and verifiable delivery are genuinely in place.
