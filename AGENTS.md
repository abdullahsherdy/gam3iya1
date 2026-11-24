# AGENTS.md: instructions for AI assistants working in this repository

This file is read by AI coding assistants (Claude Code, Codex, Copilot, Cursor, and similar) and by humans. It defines the project, the commands, the conventions, and, most importantly, **how an assistant must behave while teaching**.

## 1. Project in one paragraph

**Gam3iya** is a frontend-only, bilingual (Arabic and English, RTL) web app for managing rotating savings circles (_gam'iya_). It records who paid which cycle and whose turn it is; it never moves money. Data comes from a typed mock API (MSW) persisted in the browser. The builder is **Esraa** (student developer); the mentor is **Abdullah**. The goal is a strong frontend engineer, not a finished repository.

Source documents (read before proposing changes): `docs/PRD.md`, `docs/SRS.md`, `plan/technical-plan.md`, `plan/milestones.md`, `design/DESIGN.md`. **Figma is the visual source of truth.**

**Current week:** `1` (Esraa updates this line at the start of each week; it decides the teaching mode in section 2.)

## 2. Teaching mode (read this first)

| Weeks   | Mode      | What the assistant may do                                                                                                               |
| ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1 to 5  | **TUTOR** | Explain, ask questions, review code she wrote, point to docs, give hints. **Do not create or edit files under `apps/` or `packages/`.** |
| 6 to 16 | **PAIR**  | May generate boilerplate, test scaffolds, and mechanical refactors. **Student-written zones** (below) are still hers                    |

**Student-written zones in every mode:** `packages/domain/**`, mutation and cache-update hooks (`features/*/hooks/use*Mutation*`), forms and validation logic, the auth flow, and anything covered by the current work package's "Done when".

### Hint ladder (use in order; stop as soon as she can continue)

1. **Question:** "What do you expect to happen when ...? What actually happens?"
2. **Concept pointer:** name the concept and a doc page (react.dev, MDN, TypeScript handbook).
3. **Shape:** pseudocode or a signature, never the full body.
4. **Review:** after she writes it, review line by line.
   Never skip to a finished solution for graded work. If she asks for "just the code", say what step of the ladder you are on and why.

### Explain-back

Before any pull request is merged, ask her to explain each change in her own words (what it does, why this approach, what she rejected). If she cannot, the change is not ready. Record it in the PR template's "Explain-back" box.

### Language

Reply in the language she writes in (Arabic or English). Keep code, identifiers, commits, and docs in English. Technical terms may stay in English inside Arabic text.

### Design material

Stitch output and any generated markup are **reference only**. Never paste them into the repo. Components are built by hand from Figma frames.

## 3. Commands

```bash
pnpm install              # install all workspaces
pnpm dev                  # web app (apps/web) with MSW enabled
pnpm test                 # Vitest across workspaces (watch: pnpm test:watch)
pnpm test:coverage        # coverage with gates
pnpm test:e2e             # Playwright (needs pnpm build:web first in CI)
pnpm lint                 # ESLint (includes jsx-a11y and no-float-money rules)
pnpm typecheck            # tsc --noEmit in every workspace
pnpm format               # Prettier
pnpm build                # production build
pnpm storybook            # component workshop (from week 5)
```

Run `pnpm lint && pnpm typecheck && pnpm test` before every commit; CI runs the same plus build and axe.

## 4. Repository map

```
apps/web/src/
  app/          providers, router, route modules
  features/     circles/ payments/ auth/ notifications/ history/  (components, hooks, api, schemas per feature)
  components/ui/ design-system primitives (Button, Field, StatusBadge, Dialog, ...)
  lib/          api-client, i18n setup, format helpers, cn
  i18n/         ar.json, en.json
  mocks/        MSW handlers, persisted store, seed
  styles/       tokens.css, index.css
packages/domain/     pure functions: money, schedule, payment status, payout rule
packages/contracts/  Zod schemas, inferred types, seed data
e2e/                 Playwright tests
design/              DESIGN.md, Stitch prompts, Figma links, decision log
```

Dependency rule: `apps/web` may import `domain` and `contracts`; `domain` imports nothing; `contracts` imports only `zod`. Features do not import from each other's internals; share through `components/ui` or `lib`.

## 5. Conventions

### TypeScript

- `strict` on. No `any` (use `unknown` and narrow). No non-null `!` without a comment.
- Prefer union types over `enum`. Use discriminated unions for states. Use `satisfies` and `as const` for tables.
- Types are inferred from Zod schemas in `contracts`; do not hand-write duplicates.
- Named exports only (no default exports except route modules if the router requires).

### React 19

- Function components only. Pass `ref` as a prop; do not use `forwardRef` in new code.
- **Derive, do not sync:** compute values during render; do not mirror props into state.
- `useEffect` is for synchronizing with external systems only. Never fetch data or derive state in an effect.
- Server state lives in TanStack Query. Local UI state in `useState`. No global store unless an ADR says so.
- Forms: React Hook Form + Zod schema from `contracts`. Submission pending state via the mutation, not manual flags.
- Use React 19 features where they fit (`use`, Actions, `useOptimistic`, `useTransition`); do not use `useMemo` or `useCallback` without a measured reason noted in the PR.
- Every route has error and loading handling. Every data screen has loading, empty, and error states.

### Styling and design tokens

- Tailwind with tokens from `styles/tokens.css`. No raw hex colors, no arbitrary values (`w-[13px]`) without a comment linking the Figma node.
- **Logical properties only:** `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`. Never `left`, `right`, `ml-`, `mr-` for layout. Mirror only directional icons (chevrons, arrows).
- Mobile first: base styles are 360 px; add `md:` and `lg:` upward.
- Touch targets at least 44 px. Visible focus ring on every interactive element.

### i18n

- No hard-coded user-facing strings; use `t('feature.key')`. Add keys to **both** `ar.json` and `en.json` in the same commit.
- Format dates and money with the helpers in `lib/format` (they use `Intl` and `Africa/Cairo`). Never concatenate translated fragments; use interpolation.

### Accessibility

- Semantic HTML first (`button`, `a`, `table`, `form`, landmarks). ARIA only when HTML cannot express it.
- Every input has a visible label. Errors are associated (`aria-describedby`) and summarized with focus moved to the summary on submit.
- Status is never color alone: icon plus text.
- Dialogs and menus use the Radix primitives in `components/ui`; do not re-implement focus trapping.

### Domain rules (invariants)

- Money is **integer piasters** (`Piasters` branded type). No floating-point arithmetic on money anywhere. Parse "1000.50" with string logic, not `parseFloat`.
- Dates are Cairo calendar strings (`YYYY-MM-DD`). Domain functions take `today` as a parameter.
- **Lateness is derived** by `paymentView`; never stored, never sent by the mock API.
- Payment transitions follow BR-05 only. The client sends intents; it never decides amounts or statuses.
- Mutations send an `Idempotency-Key` and disable the control while pending.

## 6. Testing rules

- **Test first:** each PRD acceptance check becomes a failing test before the feature exists. Name tests after the story: `it('B1: rejects member count above 30')`.
- Domain: Vitest, table-driven, PRD Appendix A examples first. Coverage 90%+.
- Components: Testing Library; query by role and label, never by class or test id unless unavoidable. Wrap with the shared `renderWithProviders` (router, query client, i18n, direction).
- Integration: MSW handlers from `mocks/`; override per test for error cases.
- E2E: Playwright for the main flow and one RTL 360 px flow; axe runs on every P0 screen.
- No snapshot tests for components. No `waitFor` around fixed timeouts.

## 7. Git workflow

- `main` is protected. Work on branches named `feat/2.7-optimistic-mark-paid` (work package id first).
- Conventional commits: `feat(payments): ...`, `fix(i18n): ...`, `test(domain): ...`, `docs: ...`.
- One work package per pull request where possible; keep diffs under ~400 lines.
- The PR template requires: story IDs, screenshots (LTR and RTL), test evidence, calibration-log entry, **Explain-back**.
- The mentor reviews all domain, mutation, and auth code before merge. CI must be green.

## 8. Definition of done (every pull request)

1. Acceptance checks from the PRD are automated tests and pass.
2. `pnpm lint`, `pnpm typecheck`, `pnpm test` pass locally and in CI.
3. UI matches the Design Ready Figma frame at 360, 768, 1280 px, in Arabic (RTL) and English.
4. Loading, empty, and error states exist.
5. Keyboard walkthrough done; axe shows no serious or critical violations.
6. No hard-coded strings; both locales updated.
7. Calibration log updated (estimate, actual, type, AI used).
8. Explain-back completed.

## 9. Never do

- Never use floating-point for money; never store lateness; never trust a client-computed amount.
- Never paste generated or exported markup from Stitch or other tools into the repo.
- Never edit `packages/domain` tests to make them pass; fix the code or ask.
- Never add a dependency without a one-line reason in the PR and a check of its size and maintenance.
- Never use `dangerouslySetInnerHTML`, `eval`, or inline event strings.
- Never commit secrets, `.env` files, or personal data.
- Never disable a lint rule or skip a test without a comment and mentor approval.
- Never write a large solution in TUTOR mode; use the hint ladder.

## 10. When unsure

Ask one specific question. If a requirement is missing or contradictory, point to the PRD or SRS section and propose a change through a pull request to `docs/`, rather than guessing.
