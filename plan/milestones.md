# Milestones and tasks: Gam3iya frontend-first (16 weeks, 112 planned hours)

Companion to [technical-plan.md](technical-plan.md). Hours are planned build hours. Each task has an id (`WP.task`), hours, and a clear output. Set your estimate in the calibration log **before** starting, record the actual after.

**Task states:** `[ ]` todo, `[~]` doing, `[x]` done. **Types** (for the calibration log): setup, design, html-css, ui, domain, react, testing, devops, docs.
**Every work package ends with explain-back** and a pull request (except design packages, which end with a mentor review).

---

## M0: Foundations and design handoff (weeks 1-2, 14 h)

**Exit gate (Design Ready):**

- GitHub repo with protected `main`, PR template, CI green on a pull request (lint, typecheck, test)
- `AGENTS.md` committed; calibration log has entries; diagnostic reviewed
- Figma file: 13 screens (S01 to S13) at 360 px, S03, S06, S08 also at 768 and 1280 px, Figma variables, components, states frame
- `design/DESIGN.md`, `tokens.css` draft, story IDs annotated on every frame
- ADR-001, ADR-002, ADR-008 written

### Week 1: environment, scaffold, CI (7 h)

> **Starter pre-built (v2.1).** The mentor supplies a verified scaffold (see `docs/scaffold.md` section 4). WP 0.2 and 0.3 keep their hours but become **read, verify, break-and-fix, extend**: she explains every file, fixes three seeded breakages (a type error, a lint violation, a failing test), and adds one thing herself (a path alias or a lint rule). Tutor mode applies.

**WP 0.1 Dev environment and Git basics** · 1.5 h · setup

- [ ] 0.1.1 Install Node LTS (fnm or nvm), enable pnpm with Corepack, VS Code with ESLint, Prettier, Tailwind, Error Lens (0.5)
- [ ] 0.1.2 Create the GitHub repo, clone, `.gitignore`, `.nvmrc`, first commit, working authentication (0.5)
- [ ] 0.1.3 Branch, commit, pull request, merge a README change; mentor reviews (0.5)
- Done when: she explains branch, commit, remote, and pull request without notes.

**WP 0.2 Monorepo and web app scaffold** · 2 h · setup

- [ ] 0.2.1 `pnpm-workspace.yaml`, root `package.json` scripts, `tsconfig.base.json` with strict (0.5)
- [ ] 0.2.2 Vite `react-ts` app in `apps/web` on the latest React 19; remove template demo code (0.5)
- [ ] 0.2.3 `packages/domain` and `packages/contracts` stubs imported from the web app via workspace protocol (0.5)
- [ ] 0.2.4 Path aliases, Vitest configured, one smoke test passing in each workspace (0.5)
- Done when: structure matches `docs/scaffold.md`; `pnpm dev` and `pnpm test` work.

**WP 0.3 Quality tooling and first CI** · 1.5 h · devops

- [ ] 0.3.1 ESLint flat config with typescript-eslint and jsx-a11y; Prettier (0.5)
- [ ] 0.3.2 Husky and lint-staged on commit (0.5)
- [ ] 0.3.3 `.github/workflows/ci.yml` (install with cache, lint, typecheck, test, build), PR template, branch protection (0.5)
- Done when: a red lint error blocks the PR in CI.

**WP 0.4 Read the docs; calibration log** · 1 h · docs

- [ ] 0.4.1 Read PRD and SRS; write at least 10 questions in `docs/questions.md` (0.5)
- [ ] 0.4.2 Create `plan/calibration-log.csv` and commit `AGENTS.md`; update "Current week" (0.5)
- Done when: questions answered in the session; every answer that changes a requirement is a PR to `docs/`.

**WP 0.5 Diagnostic task** · 1 h · react

- [ ] 0.5.1 Build a small typed React component: list of payments with a status filter and a piaster-to-EGP formatter, no libraries (1)
- Done when: mentor has reviewed it; the review sets her starting level for weeks 6 to 8 pacing.

### Week 2: Stitch to Figma (7 h)

**WP 0.6 Stitch round 1** · 2 h · design

- [ ] 0.6.1 Create the Stitch project; paste the master prompt and `DESIGN.md` from `design/stitch-prompt.md` (0.5)
- [ ] 0.6.2 Generate S01 to S04 on mobile, one screen per prompt (1)
- [ ] 0.6.3 Critique with the checklist (Part E); **write two refinement prompts yourself** (0.5)
- Done when: four mobile screens pass the critique checklist or have a written list of fixes.

**WP 0.7 Stitch round 2** · 1.5 h · design

- [ ] 0.7.1 Generate S05 to S08 (0.75)
- [ ] 0.7.2 Generate S09, S10, S12, S13 and the states kit S11 (0.75)
- Done when: all 13 screens exist with realistic Arabic and English data.

**WP 0.8 Figma cleanup** · 2.5 h · design

- [ ] 0.8.1 Copy to Figma (or fallback from ADR-008); one page per flow; consistent frame and layer names (0.5)
- [ ] 0.8.2 Variables for color, spacing, radius, and text styles from `DESIGN.md` (0.75)
- [ ] 0.8.3 Components with variants: Button, Input, StatusBadge, Card, ListItem, Tabs (0.5)
- [ ] 0.8.4 Auto layout and 768 and 1280 px frames for S03, S06, S08 (0.75)
- Done when: no hard-coded colors remain in frames; components use variables.

**WP 0.9 Design review and handoff** · 1 h · design

- [ ] 0.9.1 Mentor review against the Design Ready checklist (0.5)
- [ ] 0.9.2 Annotate story IDs and states on frames; link frames in `design/figma-links.md` (0.25)
- [ ] 0.9.3 Export tokens into `design/DESIGN.md` and a draft `tokens.css` (0.25)
- Done when: M0 exit gate is met.

---

## M1: Design system and UI craft (weeks 3-5, 21 h)

**Exit gate:**

- Component gallery (Storybook or `/dev/components`) with every primitive in LTR and RTL
- App shell responsive at 360, 768, 1280; language switcher works
- Visual QA against Figma done; deltas logged and fixed or accepted
- Axe: zero serious or critical on the gallery; Lighthouse accessibility 90+ on the shell
- ADR-003 and ADR-007 written; mentor demo

### Week 3: HTML, CSS, RTL, Intl (7 h)

**WP 1.1 Semantic HTML** · 2.5 h · html-css

- [ ] 1.1.1 Hand-write S06 (circle detail) as static HTML: landmarks, heading order, a real `table` for the schedule, labelled form controls (1.5)
- [ ] 1.1.2 Validate markup; navigate it by keyboard only and with a screen reader quick pass (0.5)
- [ ] 1.1.3 Explain-back: why `button` and not `div` (0.5)

**WP 1.2 CSS layout and responsive** · 2.5 h · html-css

- [ ] 1.2.1 `tokens.css` as CSS custom properties from Figma (0.5)
- [ ] 1.2.2 Mobile-first layout with flexbox and grid; no fixed widths (1)
- [ ] 1.2.3 Breakpoints at 768 and 1280; try one container query (0.5)
- [ ] 1.2.4 Overlay the page on the Figma frame and list differences (0.5)

**WP 1.3 RTL and Intl** · 2 h · html-css

- [ ] 1.3.1 Convert physical to logical properties (`margin-inline-start`, `inset-inline-end`) (0.75)
- [ ] 1.3.2 `dir` and `lang` switching; decide which icons mirror (0.5)
- [ ] 1.3.3 `Intl.DateTimeFormat` with `Africa/Cairo`; `Intl.NumberFormat` for EGP in `ar-EG` and `en-EG` (0.75)
- Done when: the static page is correct at 360 px in both directions.

### Week 4: Tailwind, primitives, overlays (7 h)

**WP 1.4 Tailwind v4 from tokens** · 2 h · ui

- [ ] 1.4.1 Install and map `tokens.css` into the Tailwind theme (0.75)
- [ ] 1.4.2 Logical utilities and `rtl:` variants (0.5)
- [ ] 1.4.3 Migrate the week-3 static page to Tailwind (0.75)

**WP 1.5 Core primitives** · 2.5 h · ui

- [ ] 1.5.1 Button (variants, loading), Field with label, hint, error, Card, StatusBadge (icon plus text), Skeleton, Spinner (2)
- [ ] 1.5.2 Gallery route listing each with all states (0.5)

**WP 1.6 Overlay primitives** · 2.5 h · ui

- [ ] 1.6.1 Dialog, Tabs, Toast, Select built on Radix; focus returns to the trigger (1.5)
- [ ] 1.6.2 Keyboard test of each by hand; note findings (0.5)
- [ ] 1.6.3 One paragraph of API docs per component (0.5)
- **Checkpoint (end of week 4):** compute the ratio from the calibration log (technical plan, section 3).

### Week 5: shell, Storybook, QA (7 h)

**WP 1.7 App shell** · 2 h · ui

- [ ] 1.7.1 Header, mobile bottom navigation, desktop side navigation, skip link, language switcher (1.25)
- [ ] 1.7.2 Check at 360, 768, 1280 in LTR and RTL (0.75)

**WP 1.8 Component workshop** · 2 h · ui

- [ ] 1.8.1 Storybook with Vite and Tailwind (0.5)
- [ ] 1.8.2 Stories for every primitive with an RTL toolbar toggle (1)
- [ ] 1.8.3 Accessibility addon; fix what it finds (0.5)
- Cut-order item 2 replaces this with the `/dev/components` gallery.

**WP 1.9 Visual QA against Figma** · 2 h · ui

- [ ] 1.9.1 Per-component checklist: spacing, type, color, states (1)
- [ ] 1.9.2 Fix deltas; log accepted deltas with a reason (1)

**WP 1.10 M1 demo and retro** · 1 h · docs

- [ ] 1.10.1 Demo the gallery and shell (0.25)
- [ ] 1.10.2 Calibration review (0.25)
- [ ] 1.10.3 Write ADR-003 (styling) and ADR-007 (i18n) (0.5)

---

## M2: TypeScript, domain, React 19 core (weeks 6-8, 21 h)

**Exit gate:**

- PRD Appendix A examples A1 to A5 pass as automated tests; `packages/domain` coverage 90%+ in CI
- Circles list from typed seed data; create-circle wizard validates in both languages
- Mark-paid form with `useActionState`, pending button, and `useOptimistic`, with rollback demonstrated (A6)
- She explains the React render cycle, state updates, and effects at a whiteboard; ADR-004 written; demo

### Week 6: TypeScript and domain by TDD (7 h)

**WP 2.1 TypeScript in practice** · 2.5 h · domain

- [ ] 2.1.1 Strict-mode exercises: narrowing, unions, generics on circle types (1)
- [ ] 2.1.2 Branded `Piasters`; discriminated union for payment states (1)
- [ ] 2.1.3 `satisfies` and `as const` for cycle-length and status tables (0.5)

**WP 2.2 Money and schedule (test first)** · 3 h · domain

- [ ] 2.2.1 Failing tests for A4 (money): parse, sum, format (0.75)
- [ ] 2.2.2 Implement `toPiasters`, `parseEgp`, `sum`, `formatEgp` (0.5)
- [ ] 2.2.3 Failing tests for A1 and A2: weekly, biweekly, monthly, month-end clamp (0.75)
- [ ] 2.2.4 Implement `dueDate(start, length, k)` computed from the start date (1)

**WP 2.3 Status and payout rules (test first)** · 1.5 h · domain

- [ ] 2.3.1 Failing tests for A3 (lateness boundary) and A5 (payout reason) (0.5)
- [ ] 2.3.2 Implement `paymentView` with Cairo date strings and `canRecordPayout` (1)

### Week 7: React mental model and React 19 (7 h)

**WP 2.4 Domain hardening** · 1 h · domain

- [ ] 2.4.1 Edge cases: leap year, 30-day months, boundary days; coverage gate at 90% in CI (1)

**WP 2.5 React mental model** · 3 h · react

- [ ] 2.5.1 Components, props, composition (0.75)
- [ ] 2.5.2 State, derived values, lifting state (0.75)
- [ ] 2.5.3 Effects: "you might not need an effect", cleanup, dependency rules (0.75)
- [ ] 2.5.4 Build `CircleCard` list from typed seed with search and filter (0.75)

**WP 2.6 React 19 features** · 3 h · react

- [ ] 2.6.1 Ref as a prop; context read with `use` (0.75)
- [ ] 2.6.2 `use` with Suspense for a promise-based read (0.75)
- [ ] 2.6.3 `useTransition` for tab switching (0.75)
- [ ] 2.6.4 React DevTools profiler first look; read about `useEffectEvent` and `Activity` (0.75)

### Week 8: Actions, optimism, forms (7 h)

**WP 2.7 Actions and optimistic UI** · 3 h · react

- [ ] 2.7.1 Mark-paid with `<form action>` and `useActionState` against a fake async function (1)
- [ ] 2.7.2 Pending state with `useFormStatus` in a submit button (0.5)
- [ ] 2.7.3 `useOptimistic` with rollback on error; test A6 (1)
- [ ] 2.7.4 Draw the update lifecycle diagram from memory (0.5)

**WP 2.8 Create-circle wizard (B1)** · 3 h · react

- [ ] 2.8.1 React Hook Form with a Zod schema from `contracts` (1)
- [ ] 2.8.2 Four steps with per-step validation; values kept when going back (1)
- [ ] 2.8.3 Bilingual errors, error summary with focus, EGP input to piasters (1)

**WP 2.9 M2 demo and ADR-004** · 1 h · docs

- [ ] 2.9.1 Demo (0.25); ADR-004 money and dates (0.5); calibration review (0.25)

---

## M3: Routing, data layer, product flows (weeks 9-11, 21 h)

**Exit gate:**

- Stories A1 to A3, B1 to B4, C1 to C4, D1 to D3 demoable end to end as Mona and Karim against the mock API
- Role-aware UI (A7); loading, empty, error states on every data screen (E3)
- All requests parsed with Zod; no `fetch` outside the API client; ADR-005 and ADR-006 written; demo

### Week 9: routing, contracts, mock backend (7 h)

**WP 3.1 Routing** · 3 h · ui

- [ ] 3.1.1 React Router v7 route table from `docs/scaffold.md` (1)
- [ ] 3.1.2 Nested layouts with `Outlet`; lazy routes with Suspense (1)
- [ ] 3.1.3 Route error boundary, 404, protected-route skeleton (1)

**WP 3.2 Contracts and seed** · 2 h · domain

- [ ] 3.2.1 Zod schemas for entities and request and response payloads (1)
- [ ] 3.2.2 Typed seed data matching Appendix A (Mona, Karim, a late payment, an unconfirmed payment) (0.5)
- [ ] 3.2.3 `parse` helper used at every boundary (0.5)

**WP 3.3 MSW mock backend** · 2 h · ui

- [ ] 3.3.1 Handlers for circles, members, cycles, following the SRS contract (1)
- [ ] 3.3.2 Persisted store in `localStorage` with version key and reset (0.5)
- [ ] 3.3.3 Latency and failure injection (0.5)

### Week 10: TanStack Query and mutations (7 h)

**WP 3.4 API client and reads** · 3 h · react

- [ ] 3.4.1 Fetch wrapper: problem-details errors, Zod parse, `Idempotency-Key` helper (1)
- [ ] 3.4.2 Query key factory; `useCircles` with infinite pagination (1)
- [ ] 3.4.3 `staleTime` choices, devtools, prefetch on hover (1)

**WP 3.5 Mutations** · 3 h · react

- [ ] 3.5.1 Mark paid, confirm, reject, record with optimistic update and rollback (1.5)
- [ ] 3.5.2 Invalidation strategy documented in ADR-005 (0.5)
- [ ] 3.5.3 One click sends one request; idempotency key reused on retry (0.5)
- [ ] 3.5.4 Test a race: two quick actions on the same payment (0.5)

**WP 3.6 Loading, empty, error** · 1 h · ui

- [ ] 3.6.1 Skeletons, retry button, empty states per Figma S11 on all data screens (1)

### Week 11: auth, flows, dashboards (7 h)

**WP 3.7 Auth flow (A1, A2)** · 2.5 h · react

- [ ] 3.7.1 Register and login forms; session in memory; silent renewal on 401 (1.25)
- [ ] 3.7.2 Route guards with return-to; logout clears cache (0.75)
- [ ] 3.7.3 Role-aware UI and the demo switcher (0.5)

**WP 3.8 Invites, join, activation (B2 to B4)** · 1.5 h · ui

- [ ] 3.8.1 Invite link with expiry and copy; join page S12 with refusal states (0.75)
- [ ] 3.8.2 Keyboard reordering for arranged order; draw with commitment; activate with disabled-reason (0.75)

**WP 3.9 Dashboards and organizer cycle view (C1 to C4, D1, D2)** · 2 h · ui

- [ ] 3.9.1 Member dashboard and derived status badges via `paymentView` (0.75)
- [ ] 3.9.2 Organizer matrix with confirm, reject (reason), record, and payout dialog with reason flow (1.25)

**WP 3.10 Notifications and history (D3, G3)** · 1 h · ui

- [ ] 3.10.1 Derived reminders, mark read, history list (1)
- Stretch (P1): corrections UI (C5), only if buffer remains.

---

## M4: Quality: tests, accessibility, performance, CI/CD (weeks 12-14, 21 h)

**Exit gate:**

- Web coverage 70%+, domain 90%+; MSW integration tests for A5, A6, A7
- Playwright main flow and one RTL 360 px flow green in CI with trace artifacts
- Axe zero serious or critical; manual keyboard and screen-reader pass recorded
- Lighthouse mobile 90+ on shell; bundle under budget; CI under 6 minutes; preview deploys; security checklist clean
- ADR-009 and ADR-011 written

### Week 12: component and integration tests (7 h)

**WP 4.1 Component tests** · 3 h · testing

- [ ] 4.1.1 `renderWithProviders` (router, query client, i18n, direction) (0.75)
- [ ] 4.1.2 Tests for StatusBadge, Field, and the mark-paid form (1.25)
- [ ] 4.1.3 Wizard test with `user-event` (1)

**WP 4.2 Integration tests with MSW** · 2.5 h · testing

- [ ] 4.2.1 Optimistic rollback on 500 (A6) (1)
- [ ] 4.2.2 Role guard and member-versus-organizer actions (A7) (0.5)
- [ ] 4.2.3 Organizer counts equal data (D2) (0.5)
- [ ] 4.2.4 Payout with reason (A5) (0.5)

**WP 4.3 Coverage and test review** · 1.5 h · testing

- [ ] 4.3.1 Coverage gates in CI; remove brittle tests; one-page "what to test and why" (1.5)

### Week 13: end to end, accessibility, debugging (7 h)

**WP 4.4 Playwright** · 3 h · testing

- [ ] 4.4.1 Main flow: register, create, invite, activate, mark, confirm, payout (2)
- [ ] 4.4.2 RTL 360 px flow with a screenshot assertion (0.5)
- [ ] 4.4.3 Run in CI with trace artifacts (0.5)

**WP 4.5 Accessibility** · 2.5 h · testing

- [ ] 4.5.1 axe inside Playwright on every P0 screen (0.75)
- [ ] 4.5.2 Keyboard-only walkthrough of the main flow (0.75)
- [ ] 4.5.3 Screen reader pass (NVDA or VoiceOver) on two screens (0.5)
- [ ] 4.5.4 Fix list; adjust tokens for contrast (0.5)

**WP 4.6 Debugging toolkit** · 1.5 h · react

- [ ] 4.6.1 DevTools network, performance, memory; React DevTools; source maps; fix three bugs the mentor seeded (1.5)

### Week 14: performance, CI/CD, security (7 h)

**WP 4.7 Performance** · 3 h · react

- [ ] 4.7.1 Lighthouse and WebPageTest baseline (0.5)
- [ ] 4.7.2 Bundle analyzer; route-level splitting (1)
- [ ] 4.7.3 Profile one re-render problem and fix it by measurement; evaluate React Compiler and record the result (1)
- [ ] 4.7.4 Font and image loading strategy; INP check (0.5)

**WP 4.8 CI/CD** · 3 h · devops

- [ ] 4.8.1 Jobs: lint, typecheck, unit, build, e2e; Node matrix; caching (1)
- [ ] 4.8.2 Preview deployment per pull request (1)
- [ ] 4.8.3 Release tags, changelog, Dependabot (0.5)
- [ ] 4.8.4 Required checks and approvals on `main`; write ADR-011 (0.5)

**WP 4.9 Frontend security** · 1 h · devops

- [ ] 4.9.1 CSP header on the host, `pnpm audit` in CI, XSS review of every place user text renders, environment variable rules (1)

---

## M5: Next.js, ship, interview readiness (weeks 15-16, 14 h)

**Exit gate:**

- `apps/site` (Next.js App Router) deployed with landing and invite preview; Lighthouse 90+ in all four categories
- Case-study README with screenshots and architecture diagram; all ADRs Accepted or Reversed with evidence
- Frontend system design document reviewed by the mentor
- Three mock interviews completed with at least Level 3 in 6 of 8 rubric areas (rubric supplied by the mentor in week 15)
- Frontend gate (technical plan, section 3) passed

### Week 15: Next.js public pages (7 h)

**WP 5.1 Next.js fundamentals** · 3.5 h · ui

- [ ] 5.1.1 Create `apps/site`; shared tokens and `contracts` (0.5)
- [ ] 5.1.2 Landing page S01 statically rendered with metadata and Open Graph (1)
- [ ] 5.1.3 Invite preview page with `generateMetadata`, showing only circle name, member count, cycle length (1)
- [ ] 5.1.4 Table comparing SSG, SSR, CSR for her own pages, with reasons (1)

**WP 5.2 Server and client boundaries** · 3 h · ui

- [ ] 5.2.1 Server versus Client Components: where `"use client"` goes and why (1)
- [ ] 5.2.2 `loading.tsx`, `error.tsx`, streaming with Suspense (1)
- [ ] 5.2.3 One route handler serving seed data from `contracts` for the invite preview (1)

**WP 5.3 ADR-010** · 0.5 h · docs

- [ ] 5.3.1 Decision record: public pages in Next.js, app stays a Vite SPA; what would change it (0.5)

### Week 16: polish, case study, interviews (7 h)

**WP 5.4 Polish and case study** · 2.5 h · docs

- [ ] 5.4.1 Fixes from the Arabic reviewer and the five organizers (1.5)
- [ ] 5.4.2 README case study: problem, screenshots (LTR and RTL), architecture, decisions, what she would do next (1)

**WP 5.5 Frontend system design** · 2 h · docs

- [ ] 5.5.1 Document: rendering strategy, state and caching, performance budget, accessibility and i18n, design system and monorepo at team scale (2)

**WP 5.6 Career assets** · 1.5 h · docs

- [ ] 5.6.1 CV bullets from measurable results, LinkedIn, GitHub profile README (1.5)

**WP 5.7 Interview prep and demo day** · 1 h · docs

- [ ] 5.7.1 Prepare a five-minute project walkthrough and three failure stories (1)
- Three mock interviews (two frontend rounds, one frontend system design) run in live sessions and are not counted as build time.

---

## Totals

| Milestone | Weeks  | Planned h | Work packages    |
| --------- | ------ | --------- | ---------------- |
| M0        | 1-2    | 14        | 0.1 to 0.9 (9)   |
| M1        | 3-5    | 21        | 1.1 to 1.10 (10) |
| M2        | 6-8    | 21        | 2.1 to 2.9 (9)   |
| M3        | 9-11   | 21        | 3.1 to 3.10 (10) |
| M4        | 12-14  | 21        | 4.1 to 4.9 (9)   |
| M5        | 15-16  | 14        | 5.1 to 5.7 (7)   |
| **Total** | **16** | **112**   | **54**           |
