# Claude Code kickoff (mentor)

## 1. Tech-lead decisions already made in this scaffold

| Decision                                                                         | Why                                                                                                             |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Internal packages export TypeScript source, no build step                        | Fewer moving parts for a learner; Vite and Vitest compile them directly. Revisit only if a package is published |
| TypeScript pinned to 6.x                                                         | typescript-eslint rejects TS 7 at startup (verified on 24 Nov 2026). Unpin when it supports 7 (ADR-012)         |
| Type-checked ESLint (`recommendedTypeChecked`)                                   | Catches floating promises and unsafe `any` that plain linting misses; worth the extra seconds                   |
| Domain purity enforced by lint (no clock, no `parseFloat`, no framework imports) | Turns the AGENTS.md invariants into failing builds                                                              |
| No Tailwind, Router, Zod, MSW, Query yet                                         | Each arrives in its own work package so she meets the problem before the tool                                   |
| `@types/node` in the web tsconfig                                                | Only for `vite.config.ts` and `vitest.config.ts`; do not use Node APIs in `src/`                                |
| Node 22 in `.nvmrc`                                                              | What this scaffold was verified on; move to the current LTS in WP 0.1 and rerun the checks                      |
| CI action versions pinned to majors (`@v4`)                                      | Bump at setup time; Dependabot comes in WP 4.8                                                                  |

## 2. First ten minutes

```bash
cd gam3iya
git init -b main && pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build   # all must pass
git add -A && git commit -m "chore: initial scaffold"      # pre-commit hook runs lint-staged
```

Then create the GitHub repo, push, and enable branch protection on `main`: require a pull request, one approval, and the `verify` status check; block force pushes; require linear history.

## 3. Two Claude Code setups

| Who                          | Settings                                                                                                                            | Mode                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| You (building and reviewing) | `.claude/settings.json` as committed                                                                                                | PAIR for the scaffold and for review work             |
| Esraa, weeks 1 to 5          | Copy `.claude/tutor-mode.settings.json` over `.claude/settings.json` in her clone, and keep `Current week` in `AGENTS.md` at 1 to 5 | TUTOR: Claude Code cannot edit `apps/` or `packages/` |

Open `/permissions` in Claude Code once and confirm the deny rules show up; the path pattern syntax is the part most worth verifying. From week 6, restore the normal settings.

## 4. Prompts to run in Claude Code (as mentor)

**Orient and verify**

```
Read CLAUDE.md, AGENTS.md, docs/scaffold.md and plan/milestones.md (Week 1). Run pnpm lint, typecheck, test and build and report the results. List anything in the scaffold that disagrees with the docs. Do not change files.
```

**Week-1 break-and-fix exercises (WP 0.2 and 0.3)**

```
Create a branch exercise/week1-breakfix with exactly three seeded breakages, each in its own commit with an innocent message: (1) a TypeScript error in packages/domain, (2) an ESLint violation of a custom project rule in apps/web, (3) a failing test in packages/contracts. Write the answer key to a file outside the repo at ~/answers.md. Do not mention the breakages in commit messages or code comments.
```

**Week-1 review (after her pull request)**

```
/review focus: WP 0.2 and 0.3, explain-back readiness
```

**Each week**

```
Read plan/milestones.md for week N. Summarize the tasks, the PRD stories and SRS ids involved, and the tests she should write first. Propose three oral questions to ask her at the start of the session. Do not write any implementation.
```

## 5. Using the senior-developer and react-expert skills here

Both skills say project rules win over their defaults. Where they differ from `AGENTS.md`, `AGENTS.md` wins:

| Skill advice                                                                      | This project                                                                                |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Memoize callbacks and objects passed to memoized children; avoid functions in JSX | Measure first (WP 4.7); inline handlers are fine; React Compiler is evaluated in week 14    |
| Zustand, Redux as state options                                                   | TanStack Query for server state, `useState` for local state; a store needs an ADR (ADR-005) |
| Server Components patterns                                                        | Only in `apps/site` from week 15; the app is a Vite SPA                                     |
| Suspense and error boundaries everywhere                                          | Adopted: every route has error and loading handling                                         |
| `tsc --noEmit` loop and strict mode                                               | Adopted: part of the verification loop in `CLAUDE.md`                                       |

## 6. Known caveats

- Package majors moved since most tutorials were written (Vite 8, Vitest 5, ESLint 10). Check release notes before copying old snippets.
- `react-hooks` v7 includes React Compiler lint rules. If a rule seems too strict for a learner, discuss it in session before disabling it.
- Claude Code permission and import syntax can change; verify with `/permissions` and `/memory`.
