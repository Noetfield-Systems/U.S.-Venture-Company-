# OPERATIONS · NOETFIELD VENDOR INTERFACE
US founder assessment -> US-side prospect CRM -> approved commercial proposal -> signed scope + paid confirmed -> WorkPacket authorized by real officer -> vendor SOW to Noetfield Systems Inc. -> Company OS worker/agent -> bounded artifact -> independent QA -> verified delivery receipt -> client approval and follow-up.

## Objects
tenant_id, lead_id, source, consent_at, qualification, stage, owner, next_action, next_action_date, offer_id, quote_id, contract_id, payment_state, work_order_id, packet_id, vendor_ack, delivery_state, artifact_link, qa_verdict, receipt_hash, customer_acceptance, outcome, followup_due.

## Minimum WorkPacket
UUID, issuer and authorized approver, customer consent, bounded objective, due date, max spend, allowed tools, exclusions, data classification, owner, acceptance tests, rollback, escalation. Workflow: proposed -> approved -> accepted -> in progress -> QA -> delivered -> accepted/returned.

## Separation
Noetfield is not U.S. corporate owner or bank agent by default. Shared workforce services may only receive scoped minimum client data; maintain tenant segmentation, permitted retention, redacted logs and private credentials. Not yet connected to canonical Company OS; the new website currently stores inquiries and presents an operator follow-up desk, not an autonomously verified client-delivery system.

## Current implementation
POST /api/intake persists actual consented prospect. /operator authenticated via server ADMIN_TOKEN supports change of stage, owner, next action, next date, notes and deletion. One service volume required. No synthetic leads inserted. No automatic payments/agent execution emitted.
