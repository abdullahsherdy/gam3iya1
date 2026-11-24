# Gam3iya

A shared ledger for rotating savings circles (gam'iya). Frontend-first, bilingual (Arabic and English, RTL), mobile first. It never moves money.

Docs: [PRD](docs/PRD.md) · [SRS](docs/SRS.md) · [Technical plan](plan/technical-plan.md) · [Milestones](plan/milestones.md) · [Scaffold](docs/scaffold.md) · [AGENTS.md](AGENTS.md)

## Quick start

```bash
corepack enable          # or: npm i -g pnpm
pnpm install
pnpm dev                 # http://localhost:5173
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Requires Node 22 or newer (see `.nvmrc`).

## Repository layout

`apps/web` (React 19 + Vite) · `packages/domain` (pure rules) · `packages/contracts` (schemas) · `docs/` · `plan/` · `design/` · `e2e/`
