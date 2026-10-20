# ZiCON Cloud — BTC1 architecture implementation plan

## Executive summary

The deliverable is an interactive and technically annotated **conceptual system explorer**, not a connected payment product. It allows a client to inspect the proposed Next.js BTC1 interface, wallet pathways, protected API, Lightning Labs stack, RFQ/liquidity nodes and Bitcoin settlement model.

### First decisions to confirm

1. **BTC1 protocol** — Is BTC1 minted as a Taproot Asset on Bitcoin, or is it an independent chain, wrapped token, EVM token, or something else? Capture asset IDs, supply, divisibility, group key and chain/network.
2. **Custody model** — Self-custodial user wallet or backend custodial wallet? Who holds private keys? How are permissions and funds segregated?
3. **Payment model** — On-chain Taproot Asset transfers, Lightning asset channels, ordinary BTC Lightning invoices, or both?
4. **Edge/RFQ partners** — Which entity offers an asset edge node? What are quote expiry, fees, rates and liquidity constraints?
5. **Swap21 specifics** — Verify developer API docs, supported assets/chains, swap/bridge model, SLA, authentication and partner onboarding.
6. **MetaMask value proposition** — Wallet identity and signing, EVM asset swap, or cross-chain bridge? These are separate products and should not be conflated.

## Proposed functional layers

```text
Next.js dashboard / wallet UX
   |-- MetaMask (EVM only; optional bridge design)
   |-- Swap21 (unknown provider APIs; pending)
   |-- BTC1 asset-aware wallet UI
                   |
        API gateway + access policy
             (auth / RBAC / audit / idempotency)
                   |
       litd integrated process / RPC adapter
          |              |           |
          LND          tapd      optional services
          |              |
 Lightning channels   asset proofs/mint/transfer
          \             /
         Edge node + RFQ price oracle
                   |
        Bitcoin Lightning network
                   |
       Bitcoin blockchain (channel settlement,
               funding, Taproot anchoring)
```

Note: This ASCII chart illustrates functional relationships, not a single mandatory linear execution path. The exact architecture depends on custody and which services are enabled.

## Suggested work phases

**Phase 1 — Discovery & working demo (1–2 weeks estimate, pending technical discovery).** Confirm BTC1 protocol/wallet support. Deliver UI information architecture, interactive explorer, component annotations and Signet proof of concept design.

**Phase 2 — Lightning test infrastructure (2–3 weeks estimate).** Deploy monitored signet/regtest Bitcoin + `litd` / `lnd` / `tapd` services, secure RPC networking, authentication gateway, channel setup and basic invoice/payment calls. Evidence must come from actual test transactions.

**Phase 3 — Taproot Assets transfers (2–4 weeks estimate).** Verify BTC1 asset identity, issuance/proofs, asset channel configuration, partner RFQ/edge liquidity, quote expiry and reconciliation, channel safety, operational backup and recovery tests.

**Phase 4 — External integrations (effort unknown).** Implement MetaMask only for agreed EVM capability; Swap21 only after provider capability/contract and sandbox tests. Bridge custody/finality risks require explicit client approval.

**Phase 5 — Hardening (2–4 weeks estimate).** Monitoring, alerting, secure secrets, disaster recovery rehearsal, access audit, UX failure cases, security testing and staged release.

*All durations are preliminary and non-binding; feasibility strongly depends on external providers, custody rules and liquidity.*

## Suggested API gateway contract (illustrative only; NOT Lightning Labs API routes)

| Endpoint | Description | Underlying concept |
|---|---|---|
| `GET /api/network/status` | Node and sync status | LND GetInfo & node health |
| `GET /api/assets` | BTC1 balances / IDs | Taproot Assets state |
| `POST /api/invoices` | Create intent, then invoice | LND/taproot asset invoice depending on selected protocol |
| `POST /api/payments` | Validate and initiate a payment | Idempotent server orchestration |
| `GET /api/payments/:id` | Reconciliation/status | Invoice or payment tracking |
| `GET /api/channels` | Channel summary | LND / Taproot Asset channel state |
| `GET /api/rfq/quote` | Get time-bounded quote | Edge node + RFQ service |
| `POST /api/external/swap21/quote` | Provider adapter placeholder | Only after API verification |

The frontend never calls LND REST with privileged macaroons directly. Client payments require authorization, rate limits, suitable liquidity and defensively scoped credentials. Most Lightning/LND streaming RPCs are not plain one-shot HTTP GETs; evaluate client-facing SSE or WebSocket relays separately.

## Backend security, data and observability

- Per-user role/scope checks, independent signing/security threat model and wallet custody policy.
- LND TLS and least-privilege macaroons. No tokens in localStorage or source files.
- Store payment intent statuses, idempotency hashes and reconciliation events in a transactional database.
- Metrics: chain sync, peer/channel uptime, liquidity levels, HTLC failures, asset proof availability, quote expiry, bridge error rates and node disk space.
- Backup: LND seed and static channel backups plus appropriate tapd database/proofs and live restore practice. The LND seed alone is insufficient for Taproot Asset recovery according to Lightning Labs operational guidance.

## Official documentation links

- [Integrated litd](https://docs.lightning.engineering/lightning-network-tools/lightning-terminal/integrating-litd)
- [Get tapd](https://docs.lightning.engineering/lightning-network-tools/taproot-assets/get-tapd)
- [Taproot Asset channels](https://docs.lightning.engineering/lightning-network-tools/taproot-assets/taproot-assets-channels)
- [Edge nodes](https://docs.lightning.engineering/the-lightning-network/taproot-assets/edge-nodes)
- [RFQ](https://docs.lightning.engineering/lightning-network-tools/taproot-assets/rfq)
- [LND REST endpoints](https://lightning.engineering/api-docs/api/lnd/rest-endpoints/index.html)
- [Macaroon security](https://docs.lightning.engineering/lightning-network-tools/lnd/macaroons)
- [Operational safety](https://docs.lightning.engineering/lightning-network-tools/taproot-assets/operational-safety-guidelines)