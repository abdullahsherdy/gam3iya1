# Architecture decision records

Esraa writes each ADR in the week shown, using the template below. A decision is **Accepted** or **Reversed** only with evidence linked.

| ADR | Decision                                                                              | Status   | Validated |
| --- | ------------------------------------------------------------------------------------- | -------- | --------- |
| 001 | pnpm monorepo with shared `domain` and `contracts` packages                           | Accepted | Week 1    |
| 002 | React 19 + Vite SPA first                                                             | Accepted | Week 1    |
| 003 | Tailwind v4 on tokens, Radix primitives                                               | Proposed | Week 4    |
| 004 | Money as integer piasters; dates as Cairo calendar dates                              | Accepted | Week 6    |
| 005 | TanStack Query for server state; no global store                                      | Proposed | Week 10   |
| 006 | MSW persisted in `localStorage` as the mock backend                                   | Proposed | Week 9    |
| 007 | i18next + `Intl`                                                                      | Proposed | Week 3    |
| 008 | Stitch generates, Figma is the source of truth, exported code is reference only       | Accepted | Week 2    |
| 009 | Test pyramid and gates                                                                | Proposed | Week 12   |
| 010 | Next.js for public pages only; the app stays a Vite SPA                               | Proposed | Week 15   |
| 011 | Hosting and previews                                                                  | Proposed | Week 14   |
| 012 | TypeScript pinned to 6.x until typescript-eslint supports 7 (mentor, already decided) | Accepted | Week 1    |

## Template

```markdown
# ADR-NNN: Title

## Status

Proposed | Accepted | Reversed | Superseded by ADR-NNN

## Context

What problem and constraints led to this decision?

## Decision

What did we choose?

## Alternatives considered

- Option: why not

## Consequences

- Positive:
- Negative:

## Validation and reversal

What evidence confirms this? What would make us reverse it?
```
