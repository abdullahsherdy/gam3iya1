# Technical plan v2: Gam3iya, frontend-first 16-week mentorship

Date: 24 November 2026. Status: proposed. Start date: to confirm with Esraa (week 1 begins on ____).
Sources: [PRD v2](../docs/PRD.md), [SRS v2](../docs/SRS.md), [AGENTS.md](../AGENTS.md), [milestones](milestones.md), [scaffold](../docs/scaffold.md), [Stitch prompt](../design/stitch-prompt.md).

## 0. What changed from v1

| Topic     | v1                                                                    | v2 (this plan)                                                                                                                       |
| --------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Focus     | Fullstack: React, then NestJS, PostgreSQL, MongoDB, Redis             | **Frontend mastery only.** Backend is not in the plan until the frontend gate (section 3) is passed                                  |
| Data      | Real API from week 6                                                  | Typed mock backend (MSW, persisted in the browser) for all 16 weeks. The API contract is kept so a real backend can replace it later |
| Design    | Not planned                                                           | **Design first:** Google Stitch generates, Figma is the source of truth (weeks 1 to 2)                                               |
| Next.js   | Full migration in week 9                                              | Public pages only, weeks 15 to 16 (ADR-010)                                                                                          |
| Testing   | API and e2e                                                           | Domain unit, component, MSW integration, Playwright, axe                                                                             |
| AI policy | Tutor weeks 1 to 4                                                    | Tutor weeks 1 to 5 (fundamentals), pair from week 6                                                                                  |
| Removed   | Auth hand-build, idempotency receipts, DB grants, k6, BullMQ, MongoDB | Moved to a future, unplanned "Phase B: backend"                                                                                      |

## 1. Commitment and how it is measured

| Item                | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Scope               | PRD v2 P0 in full. P1 (payment proof UI, print/PDF statement, corrections UI) only if on schedule. P2 excluded   |
| Team                | 1 student developer (Esraa), 1 mentor (Abdullah); AI assistant under section 6                                   |
| Duration            | 16 weeks                                                                                                         |
| Capacity            | 8 independent hours per week = 128 h, plus 2 live sessions of 90 min per week (teaching and review, not counted) |
| **Planned work**    | **112 h** across 54 work packages                                                                                |
| **Reserved buffer** | **16 h** (12.5%), 1 h per week                                                                                   |
| Load factor         | 112 / 128 = 87.5%                                                                                                |

Capacity is an assumption to confirm in week 1. Estimates are targets; the checkpoint replaces them with measurement.

## 2. Schedule

| Week | Milestone | Focus                                        | Work packages | Planned h | Buffer h | Gate                       |
| ---- | --------- | -------------------------------------------- | ------------- | --------- | -------- | -------------------------- |
| 1    | M0        | Environment, scaffold, CI, docs read-through | 0.1 to 0.5    | 7         | 1        |                            |
| 2    | M0        | Stitch to Figma design handoff               | 0.6 to 0.9    | 7         | 1        | **M0 exit** (Design Ready) |
| 3    | M1        | Semantic HTML, CSS, RTL, Intl                | 1.1 to 1.3    | 7         | 1        |                            |
| 4    | M1        | Tailwind, primitives, overlays               | 1.4 to 1.6    | 7         | 1        | **Checkpoint**             |
| 5    | M1        | App shell, Storybook, visual QA              | 1.7 to 1.10   | 7         | 1        | **M1 exit** and demo       |
| 6    | M2        | TypeScript and domain (TDD)                  | 2.1 to 2.3    | 7         | 1        |                            |
| 7    | M2        | React mental model and React 19              | 2.4 to 2.6    | 7         | 1        |                            |
| 8    | M2        | Actions, optimistic UI, forms                | 2.7 to 2.9    | 7         | 1        | **M2 exit** and demo       |
| 9    | M3        | Routing, contracts, MSW backend              | 3.1 to 3.3    | 7         | 1        |                            |
| 10   | M3        | TanStack Query, mutations                    | 3.4 to 3.6    | 7         | 1        |                            |
| 11   | M3        | Auth, flows, dashboards                      | 3.7 to 3.10   | 7         | 1        | **M3 exit** and demo       |
| 12   | M4        | Component and integration tests              | 4.1 to 4.3    | 7         | 1        |                            |
| 13   | M4        | Playwright, accessibility, debugging         | 4.4 to 4.6    | 7         | 1        |                            |
| 14   | M4        | Performance, CI/CD, security                 | 4.7 to 4.9    | 7         | 1        | **M4 exit**                |
| 15   | M5        | Next.js public pages                         | 5.1 to 5.3    | 7         | 1        |                            |
| 16   | M5        | Polish, case study, interviews               | 5.4 to 5.7    | 7         | 1        | **M5 exit** and demo day   |

| #   | Milestone                                         | Weeks | Planned h |
| --- | ------------------------------------------------- | ----- | --------- |
| M0  | Foundations and design handoff                    | 1-2   | 14        |
| M1  | Design system and UI craft                        | 3-5   | 21        |
| M2  | TypeScript, domain, React 19 core                 | 6-8   | 21        |
| M3  | Routing, data layer, product flows                | 9-11  | 21        |
| M4  | Quality: tests, accessibility, performance, CI/CD | 12-14 | 21        |
| M5  | Next.js, ship, interview readiness                | 15-16 | 14        |
|     | **Total**                                         |       | **112**   |

Week 11 is the densest week (four packages). Protect its buffer hour and review it at the week-10 session.

## 3. Checkpoint, gates, and cut order

**Checkpoint (end of week 4).** Weeks 1 to 4 contain the first real build hours. From the calibration log (WP 0.4), compute **actual / estimated** per work type (setup, design, html-css, ui, domain, react, testing, devops, docs).

- At or below 1.25 overall: continue.
- Above 1.25: apply the cut order below until the remaining estimate fits the remaining capacity.
- Record the result and cuts at the bottom of this file. A miss is data, not failure; estimating honestly is a taught skill.

**Never cut:** domain tests, accessibility checks, the pull request workflow, money integrity, explain-back.

**Cut order**

1. P1 stretch items (payment proof UI, print/PDF statement, corrections UI).
2. Storybook replaced by a simple `/dev/components` gallery route (WP 1.8).
3. Playwright reduced to the one main flow (WP 4.4).
4. Next.js scope reduced to the landing page only (WP 5.1 to 5.2).
5. Frontend system design document shortened to two pages (WP 5.5).

**Frontend gate (before any backend work is planned).** All M5 exit criteria met, and the mentor confirms Esraa can, unaided, build a new feature from a Figma frame to a tested, accessible, bilingual pull request in under 6 hours.

## 4. Technology (versions are checked at install time)

| Concern               | Choice                                                                                                               | Why                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Language              | TypeScript 6.x, strict. **Pinned below 7** because typescript-eslint does not support TS 7 yet; revisit when it does | Shared contracts; the main learning goal                      |
| UI library            | React 19 (npm latest was 19.3 on 24 Nov 2026)                                                                        | Actions, `use`, `useOptimistic`, ref as a prop                |
| Build                 | Vite                                                                                                                 | Fast feedback; framework-free fundamentals                    |
| Styling               | Tailwind CSS v4 on CSS variable tokens, after plain CSS in week 3                                                    | Industry standard; Stitch exports Tailwind-friendly markup    |
| Accessible primitives | Radix UI                                                                                                             | Focus management and ARIA done right; she studies, not copies |
| Routing               | React Router v7 (library mode)                                                                                       | Nested routes, lazy loading                                   |
| Server state          | TanStack Query v5                                                                                                    | Caching, optimistic updates                                   |
| Forms                 | React Hook Form + Zod                                                                                                | Validation shared through `packages/contracts`                |
| i18n                  | i18next + react-i18next, `Intl` for dates and money                                                                  | Arabic and English, RTL                                       |
| Mock backend          | MSW 2 with a persisted store                                                                                         | Real network behavior without a server                        |
| Tests                 | Vitest, Testing Library, Playwright, axe                                                                             | Pyramid in WP 4.x                                             |
| Quality               | ESLint flat config + jsx-a11y, Prettier, Husky, lint-staged                                                          | Rules enforced, not remembered                                |
| CI/CD                 | GitHub Actions; preview deploys per pull request                                                                     | Required learning goal                                        |
| Design                | Google Stitch (generate), Figma (source of truth)                                                                    | Esraa's requirement, and real team practice                   |
| Monorepo              | pnpm workspaces: `apps/web`, `packages/domain`, `packages/contracts` (+ `apps/site` in M5)                           | ADR-001                                                       |

## 5. Architecture decisions

| ADR | Decision                                                                        | Status   | Validated | Reversal rule                                                                   |
| --- | ------------------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------------------------- |
| 001 | pnpm monorepo with `domain` and `contracts` packages                            | Accepted | Week 1    | Reverse if setup costs more than 2 h over budget                                |
| 002 | React 19 + Vite SPA first                                                       | Accepted | Week 1    | None for the first 14 weeks                                                     |
| 003 | Tailwind v4 on tokens, Radix primitives                                         | Proposed | Week 4    | Reverse to CSS Modules if utilities hide her CSS understanding                  |
| 004 | Money as integer piasters; dates as Cairo calendar dates                        | Accepted | Week 6    | None; this is an invariant                                                      |
| 005 | TanStack Query for server state; no global store                                | Proposed | Week 10   | Add a store only for a proven client-state need                                 |
| 006 | MSW persisted in `localStorage` as the mock backend                             | Proposed | Week 9    | Reverse to in-memory if persistence causes test flakiness                       |
| 007 | i18next + `Intl`                                                                | Proposed | Week 3    | Reverse to a small custom hook if the bundle cost is above 15 kB gzip           |
| 008 | Stitch generates, Figma is the source of truth, exported code is reference only | Accepted | Week 2    | Reverse if Figma export is unavailable on her account: rebuild from screenshots |
| 009 | Test pyramid and gates                                                          | Proposed | Week 12   | Adjust gates at the checkpoint                                                  |
| 010 | Next.js for public pages only; the app stays a Vite SPA                         | Proposed | Week 15   | Port the dashboard only if WP 5.2 finishes early                                |
| 011 | Hosting and previews                                                            | Proposed | Week 14   | Decide from free-tier limits at that time                                       |

## 6. AI assistant policy

The goal is a strong engineer, not a finished repository.

| Weeks   | Mode      | Rule                                                                                                                                      |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1 to 5  | **Tutor** | Explanations, questions, reviews, hints. She writes all code. The agent does not edit `apps/` or `packages/`                              |
| 6 to 16 | **Pair**  | May generate boilerplate, test scaffolds, refactors. She writes domain logic, mutation hooks, forms and validation, and auth flow herself |
| Always  | Rules     | Explain-back before merge; tests first from PRD acceptance checks; Stitch or AI-generated markup is never pasted into the repo            |

Calibration log per work package: estimate (set before starting), actual, type, AI used. Details for agents are in `AGENTS.md`.

## 7. Inputs and due dates

| Input                                                                 | Owner   | Due          |
| --------------------------------------------------------------------- | ------- | ------------ |
| Laptop, GitHub account, Figma account, Stitch access (Google account) | Student | Week 1       |
| Diagnostic task completed                                             | Student | Week 1       |
| Stitch to Figma export verified on her account                        | Mentor  | Week 2 start |
| Hosting free-tier account (Vercel, Netlify, or Cloudflare Pages)      | Student | Week 12      |
| Native Arabic reviewer                                                | Mentor  | Week 14      |
| Five real organizers (or friends running a gam'iya) to test           | Mentor  | Week 14      |
| Two engineers for mock interviews, and the 8-area rubric              | Mentor  | Week 15      |
| Pull request review turnaround of 24 hours                            | Mentor  | Every week   |

A late input moves the dependent item to a labelled placeholder; it does not move the deadline.

## 8. Risks

| Risk                                               | Effect             | Response                                                                                |
| -------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Measured ratio above 1.25                          | Deadline missed    | Week-4 checkpoint and cut order                                                         |
| Design phase grows past 2 weeks                    | Coding starts late | Time-box; "Design Ready" covers P0 screens only; polish later                           |
| Stitch output is generic or weak in Arabic and RTL | Poor screens       | Master prompt plus `DESIGN.md`; human cleanup in Figma is part of the learning          |
| Stitch to Figma export unavailable or changed      | Handoff blocked    | Fallback in ADR-008; verify in week 1                                                   |
| AI over-reliance                                   | Skills not built   | Tutor mode, explain-back, oral questions each session                                   |
| Week 11 overload                                   | M3 gate slips      | Protect buffer; corrections UI is already P1                                            |
| Inconsistent weekly hours                          | Cumulative delay   | Weekly buffer; progress check each session                                              |
| Perception that documents are unnecessary          | Disengagement      | Traceability: every Figma frame, ticket, and test carries a story ID (see mentor notes) |
| Single mentor                                      | Review bottleneck  | 24-hour turnaround; checklists                                                          |

## 9. Decisions the mentor must confirm

1. Gam3iya remains the single project, now frontend-only for the 16 weeks.
2. Backend is out of the plan until the frontend gate.
3. 8 independent hours per week; 2 live sessions of 90 minutes.
4. Tailwind v4 + Radix (ADR-003) and Next.js for public pages only (ADR-010).
5. AI policy in section 6, including "Stitch code is reference only".
6. Corrections UI (C5) is P1 in v2.

## 10. Checkpoint record

| Date | Ratio | Cuts applied | Notes |
| ---- | ----- | ------------ | ----- |
|      |       |              |       |
