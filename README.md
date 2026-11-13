# U.S. Venture Company — founding-stage launch platform

**Public repo | pre-incorporation | 13 November 2026**

This is the implementation repository for a proposed U.S.-incorporated, globally operated venture launch and execution platform. Neither this repository nor the public website means the legal entity has been incorporated. Its legal name, officers, board, ownership split, and registered agent are still pending.

## Live application
- Premium English-language responsive website and working multi-step venture assessment.
- Secure server-side form validation, rate limit, consent timestamp, durable prospect queue.
- Restricted operator desk at \`/operator\` with status, owner, next action and notes.
- Pricing labeled as pilot hypotheses, not a payment link.
- Explicit pre-incorporation and no-fabricated-traction disclosures.

## Stack and run
Requires Node.js 20+. No external runtime dependencies.

\`\`\`bash
npm start
# GET /api/health and /api/status
# POST /api/intake
\`\`\`

Railway recommended: set \`DATA_DIR=/data\`; mount a persistent service volume at \`/data\`; set high-entropy \`ADMIN_TOKEN\` (do not commit it). One service replica due to file-backed writes. Set \`PORT\` using Railway runtime default. For enterprise or multi-replica scale, move to managed Postgres before introducing concurrent workers.

## Documentation
Read [docs/00_MASTER_BLUEPRINT.md](docs/00_MASTER_BLUEPRINT.md) and [docs/01_PRODUCT_ICP_GTM.md](docs/01_PRODUCT_ICP_GTM.md), then company formation, operations, contracts, investor assets and quality checklist. The original full 27-document planning package remains a separate founder working artifact; repository docs contain an operationally integrated summary.

## Company boundaries
- **Founder A:** Canada-based non-executive shareholder/investor (proposed).
- **Founder B:** California-based founding shareholder; any director/officer role only upon explicit agreement.
- **Noetfield Systems Inc.:** separate Canadian technical service vendor (prospective, under arms-length scope).
- **Entity:** Delaware C-Corp proposed; unregistered as of this release.
- Do not hold out as a registered company, legal adviser, bank, government affiliate, placement agent, or investor-backed venture.

## Verification
For public health use \`GET /api/health\`. For operator access provide \`Authorization: Bearer <ADMIN_TOKEN>\` to \`GET /api/admin/leads\`. Do not put admin tokens in public URLs or client HTML. Customers only receive a random inquiry reference; their details are not publicly indexed.

## Remaining external launch steps
Confirm company name, corporate formation, bank/merchant, director/officer roles, cap table, contract signatures, tax characterization, and lawful service supply before activating checkout. Real cases must pass evidence checks before claiming delivery or traction.
