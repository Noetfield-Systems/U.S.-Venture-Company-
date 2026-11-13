# Formation Company OS — operations, actors, and object model v2
## Scope and architecture
The U.S. venture owns its customers, contracts, bank and official cases after formal creation. Noetfield Systems Inc., when separately contracted, provides technical execution and workflow automation; it is not the director, officer, tax professional or authorized state filer.

## Founding-stage production reality
Public visitor -> three-step readiness form -> POST /api/intake -> durable JSON queue -> authenticated /operator -> status/owner/next action/deletion. This chain is real. It is a prospect intake, not a filing engine or a customer incorporation portal. No Company OS service-to-service integration is currently verified.

## Future canonical case state machine
NEW_LEAD -> QUALIFIED -> PLAN_READY -> QUOTED -> CONTRACT_SIGNED -> PAYMENT_CONFIRMED -> INTAKE_VERIFIED -> FILING_AUTHORIZED -> FILING_SUBMITTED -> STATE_ACCEPTED -> ENTITY_VERIFIED -> EIN_PENDING -> EIN_RECEIVED -> ACTIVE_SUPPORT.
Paths: NEEDS_INFO, HOLD_CUSTOMER, PROVIDER_REJECTED, REFUND_DUE, CANCELLED. Never mark legal/financial state using simulated or manual guessed evidence.

## Required entities
founder_profile (residency, email verified), entity_case (jurisdiction/entity_type), cofounder_invite, case_party (ownership and role), disclosure_acceptance, quote (fee components), authorized_provider, legal_document, signature_event, equity_grant, tax_deadline, official_filing_event, official_filing_receipt, ein_event, bank_application, case_task, owner, next_action_date, service_contract, verified_payment, support_ticket, operation_receipt, audit_event.
Identifiers: case_id, tenant_id, actor_id; immutable provenance and timestamps on financial/legal transitions.

## Human vs AI division
- Human founder/customer: authorizes identity, equity, formation signatures, fees, filings, bank matters.
- U.S. entity's actual officer: contract and approved spending authority per governance.
- Qualified provider: official filings and licensed advice where required.
- Noetfield: research, checklist compilation, doc routing, CRM workflows, notifications, evidence extraction and verification adapters.
- Independent QA: compares completion claims to official source/receipt.
AI cannot make itself an officer or generate "Filed" status without official provider evidence.

## WorkPacket interface
case_id, tenant_id, requester, approver, task_type, allowed_actions, provider, max_spend, deadline, required_consent, privacy_class, output_schema, success_test, rollback, data_retention. Receipt = status, evidence URI, file hash, QA verdict, timestamp, approved signer.

## Data protection
Marketing intake contains no government IDs or bank credentials. Future document vault requires scoped access control, encryption, retention & deletion, audited provider transfer, real consent, verified role permissions. Current JSON storage is single-instance; migrate to Postgres for concurrency and production sensitive forms.
