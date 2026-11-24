# Gam3iya: Software Requirements Specification (SRS) v2

Version 2.0 (frontend-first). Date: 24 November 2026. Status: proposed. Simplified IEEE 830 structure for a learning project.
Related: [PRD](PRD.md), [Technical plan](../plan/technical-plan.md), [Milestones](../plan/milestones.md), [Scaffold](scaffold.md), [AGENTS.md](../AGENTS.md).

## 1. Introduction

### 1.1 Purpose

States what the Gam3iya web client must do and the qualities it must have, precisely enough to design, build, and test it. Intent and priorities are in the PRD.

### 1.2 Scope

Gam3iya records and displays contributions, schedule, and payouts of rotating savings circles. It does **not** move money, hold funds, or integrate with banks. In this version there is **no real server**: all data comes from a mock API (section 6) that follows the same contract a future backend would implement.

### 1.3 Definitions

| Term         | Meaning                                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| Circle       | One rotating savings group with fixed contribution and member count                |
| Cycle        | One round; one member receives the pot per cycle                                   |
| Organizer    | User who created and administers the circle (also a member)                        |
| Member       | User participating in a circle                                                     |
| Pot / payout | Total of the cycle's contributions given to the cycle's recipient                  |
| Piaster      | 1/100 of an Egyptian pound; the unit of every stored amount                        |
| Grace days   | Days after the due date before an unconfirmed payment counts as late               |
| Cairo date   | Calendar date in `Africa/Cairo`, as `YYYY-MM-DD`                                   |
| Design Ready | A Figma frame meeting the checklist in `design/stitch-prompt.md`, Part E           |
| Mock API     | MSW handlers plus a persisted store that implement the API contract in the browser |

### 1.4 Priorities and identifiers

P0 must ship; P1 if time allows; P2 future. Identifiers are stable and are used in tests, tickets, Figma frames, and the traceability matrix.

## 2. Overall description

### 2.1 Product perspective

A single-page web client (React) with shared packages `domain` (pure business rules) and `contracts` (Zod schemas and types), talking over `fetch` to `/api/v1`, answered by the mock API. From week 15 a small Next.js site serves public pages.

### 2.2 User classes

| Class       | Permissions summary                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Organizer   | All member actions in own circles, plus configure, invite, activate, confirm or reject, record payments and payouts, view history |
| Member      | View own circles, mark own payments, view schedule and statuses                                                                   |
| Demo viewer | Switch between demo organizer and demo member without registering                                                                 |

### 2.3 Operating environment

Last two versions of Chrome, Safari, Edge, Firefox on phones and desktops; minimum viewport 360 px. Node.js LTS for tooling.

### 2.4 Constraints

- All money is integer piasters; floating-point money is forbidden (lint rule and tests).
- All business dates are Cairo calendar dates; `packages/domain` takes `today` as a parameter and never reads the clock.
- Lateness is derived and never stored or returned by the API.
- No personal financial data (cards, bank accounts) is collected.
- Figma is the visual source of truth; Stitch output is reference only.

### 2.5 Assumptions

Users have an email address and a smartphone browser. Circle size is 2 to 30. Reminders are in-app and derived from the schedule.

## 3. Functional requirements

### 3.1 Accounts and sessions (mock)

| ID         | Requirement                                                                                                                               | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-AUTH-01 | Registration form with unique email, display name, password of at least 10 characters; field errors in both languages                     | P0       |
| FR-AUTH-02 | Login form; generic error message on failure                                                                                              | P0       |
| FR-AUTH-03 | Session: short-lived mock access token held in memory; mock refresh renews it silently once on a 401; a second failure signs the user out | P0       |
| FR-AUTH-04 | Logout clears session, query cache, and redirects to login                                                                                | P0       |
| FR-AUTH-05 | Route guard redirects unauthenticated users to login and returns them after sign-in                                                       | P0       |
| FR-AUTH-06 | Language choice (Arabic or English) persists and switches direction and strings live                                                      | P0       |
| FR-AUTH-07 | Demo switcher signs in as Mona (organizer) or Karim (member) with seeded data                                                             | P0       |
| FR-AUTH-08 | Password reset screens                                                                                                                    | P1       |

### 3.2 Circles

| ID        | Requirement                                                                                                                      | Priority |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-CIR-01 | Four-step wizard: basics, money, schedule, payout method; each step validates before continuing and keeps values when going back | P0       |
| FR-CIR-02 | Amount input accepts EGP with up to two decimals and converts to integer piasters without floating-point arithmetic              | P0       |
| FR-CIR-03 | A circle is editable only while DRAFT                                                                                            | P0       |
| FR-CIR-04 | Activation is enabled only when members equal the member count; otherwise the reason is shown                                    | P0       |
| FR-CIR-05 | After activation the generated schedule is shown and the payout order is read-only                                               | P0       |
| FR-CIR-06 | Organizer can cancel a DRAFT or ACTIVE circle with a reason                                                                      | P0       |
| FR-CIR-07 | A circle shows COMPLETED when every cycle has a payout                                                                           | P0       |
| FR-CIR-08 | Duplicate a circle                                                                                                               | P1       |

### 3.3 Members and invitations

| ID        | Requirement                                                                                                                        | Priority |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-MEM-01 | Organizer creates an invitation link with a visible 7-day expiry; copy-to-clipboard and share action                               | P0       |
| FR-MEM-02 | A signed-in user joins a DRAFT circle through a valid link; no double join; clear messages for expired, full, or activated circles | P0       |
| FR-MEM-03 | Arranged order: drag-free, keyboard-operable reordering (move up and down) with unique positions                                   | P0       |
| FR-MEM-04 | Random draw: positions assigned by the mock API with a displayed commitment value                                                  | P0       |
| FR-MEM-05 | Remove a member while DRAFT                                                                                                        | P1       |

### 3.4 Payments

| ID        | Requirement                                                                                                                            | Priority |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-PAY-01 | Activation yields one payment per member per cycle, status PENDING                                                                     | P0       |
| FR-PAY-02 | A member can mark only their own PENDING payment as MARKED_PAID                                                                        | P0       |
| FR-PAY-03 | The organizer can confirm a MARKED_PAID payment, or reject it with a reason (returns to PENDING)                                       | P0       |
| FR-PAY-04 | The organizer can record a payment on a member's behalf, directly CONFIRMED, with a note                                               | P0       |
| FR-PAY-05 | Mutations send an `Idempotency-Key` header; the UI disables the control while pending so one click sends one request                   | P0       |
| FR-PAY-06 | LATE is derived in the client with `paymentView` for any non-confirmed payment whose Cairo date is later than due date plus grace days | P0       |
| FR-PAY-07 | Mark paid updates the UI optimistically and rolls back with a toast on failure                                                         | P0       |
| FR-PAY-08 | Corrections after cycle completion with mandatory reason and visible versions                                                          | P1       |
| FR-PAY-09 | Payment proof image attach UI                                                                                                          | P1       |

### 3.5 Payouts

| ID        | Requirement                                                                                                          | Priority |
| --------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-OUT-01 | Organizer records one payout per cycle; amount equals the sum of the cycle's payments and is shown before confirming | P0       |
| FR-OUT-02 | With unconfirmed payments the dialog requires a reason; the history entry carries a flag                             | P0       |
| FR-OUT-03 | After a payout the action is no longer offered for that cycle                                                        | P0       |
| FR-OUT-04 | A payout sets the cycle to COMPLETED                                                                                 | P0       |
| FR-OUT-05 | Print or PDF statement                                                                                               | P1       |

### 3.6 Dashboards, notifications, history

| ID         | Requirement                                                                                                  | Priority |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| FR-DASH-01 | Member sees per circle: next due date and amount, own payout cycle, progress                                 | P0       |
| FR-DASH-02 | Organizer sees, per cycle, the status of every member and totals that equal the data                         | P0       |
| FR-DASH-03 | Collection screens use cursor pagination (infinite load or "load more")                                      | P0       |
| FR-NOT-01  | Notifications two days before a due date and when a payment becomes late, once per event                     | P0       |
| FR-NOT-02  | List notifications and mark as read                                                                          | P0       |
| FR-AUD-01  | The mock API appends a history entry (actor, time, action, entity, reason, flags) for every financial change | P0       |
| FR-AUD-02  | The organizer can view the circle history; entries are read-only                                             | P0       |

### 3.7 Language, layout, and UI quality

| ID         | Requirement                                                                                        | Priority |
| ---------- | -------------------------------------------------------------------------------------------------- | -------- |
| FR-I18N-01 | Every user-facing string exists in Arabic and English; no hard-coded strings                       | P0       |
| FR-I18N-02 | Layout mirrors for Arabic using logical properties; directional icons are mirrored, others are not | P0       |
| FR-I18N-03 | Dates show in Cairo time; amounts as EGP with two decimals through `Intl`                          | P0       |
| FR-UI-01   | Every data screen has loading (skeleton), empty, and error (with retry) states                     | P0       |
| FR-UI-02   | Every status is shown by icon and text as well as color                                            | P0       |
| FR-UI-03   | Visual parity with the Design Ready Figma frames at 360, 768, and 1280 px                          | P0       |
| FR-UI-04   | A component gallery shows all primitives with an RTL toggle                                        | P0       |

### 3.8 Public site (M5)

| ID        | Requirement                                                                                   | Priority |
| --------- | --------------------------------------------------------------------------------------------- | -------- |
| FR-PUB-01 | Landing page server-rendered with metadata and Open Graph tags                                | P0       |
| FR-PUB-02 | Invite preview page shows circle name, member count, and cycle length only, never member data | P0       |

## 4. Business rules

| ID    | Rule                                                                                                                                                        |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01 | A circle has exactly one cycle per member; each member receives the pot once                                                                                |
| BR-02 | Every member pays in every cycle, including their own payout cycle                                                                                          |
| BR-03 | Due date of cycle k = start + (k - 1) x cycle length; for monthly circles the day is clamped to the last day of shorter months                              |
| BR-04 | Payout amount of a cycle = contribution x member count                                                                                                      |
| BR-05 | Allowed payment transitions: PENDING to MARKED_PAID; MARKED_PAID to CONFIRMED or PENDING (reject); PENDING to CONFIRMED (organizer on behalf); nothing else |
| BR-06 | Payout order cannot change after activation                                                                                                                 |
| BR-07 | A user sees only circles in which they hold a membership; other circle ids behave as not found                                                              |
| BR-08 | The client never sends amounts or statuses as authority; it sends intents (mark, confirm) and displays what the API returns                                 |

## 5. Non-functional requirements

| ID          | Category        | Requirement                                                                                                                                                                |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-PERF-01 | Performance     | LCP under 2.5 s, INP under 200 ms, CLS under 0.1 on a mid-range phone over simulated 4G for the landing page and app shell                                                 |
| NFR-PERF-02 | Performance     | Initial JavaScript for the app shell under 200 kB gzip; routes are lazy loaded                                                                                             |
| NFR-A11Y-01 | Accessibility   | WCAG 2.2 AA on all P0 screens: keyboard operable, visible focus, contrast 4.5:1 for text, targets at least 44 px on mobile, labelled form fields, error summary with focus |
| NFR-A11Y-02 | Accessibility   | Automated axe checks in CI with zero serious or critical violations                                                                                                        |
| NFR-I18N-01 | Localization    | Correct layout in LTR and RTL at 360 px                                                                                                                                    |
| NFR-SEC-01  | Security        | No `dangerouslySetInnerHTML`; user text is always escaped; no secrets in the repository; `pnpm audit` in CI                                                                |
| NFR-SEC-02  | Security        | Strict Content-Security-Policy on deployed pages                                                                                                                           |
| NFR-MNT-01  | Maintainability | Business logic lives in `packages/domain` with at least 90% coverage; web app at least 70%                                                                                 |
| NFR-MNT-02  | Maintainability | Every pull request passes lint, typecheck, tests, build, and axe in CI                                                                                                     |
| NFR-MNT-03  | Maintainability | TypeScript strict; `any` is a lint error                                                                                                                                   |
| NFR-TST-01  | Testing         | Each PRD acceptance check has a test written before the feature                                                                                                            |
| NFR-OBS-01  | Observability   | Errors caught by boundaries are logged through one `reportError` function (console in this phase)                                                                          |
| NFR-PRV-01  | Privacy         | Only email and display name exist in mock data; the invite preview exposes no member data                                                                                  |

## 6. External interfaces: the API contract (served by the mock)

Base `/api/v1`, JSON, camelCase. Errors use RFC 9457 problem details (`application/problem+json`) with `type`, `title`, `status`, `detail`, `errors[]`. Collections use `?cursor=&limit=` (default 20, max 100) and return `{ data, pagination: { nextCursor, hasMore } }`. Payment and payout writes require `Idempotency-Key`.

| Method and path                                             | Role              | Purpose                              | Requirement           |
| ----------------------------------------------------------- | ----------------- | ------------------------------------ | --------------------- |
| `POST /auth/register`, `POST /auth/login`                   | public            | Create account, sign in              | FR-AUTH-01, 02        |
| `POST /auth/refresh`, `POST /auth/logout`                   | user              | Renew, sign out                      | FR-AUTH-03, 04        |
| `GET /me`, `PATCH /me`                                      | user              | Profile and locale                   | FR-AUTH-06            |
| `POST /circles`, `GET /circles`                             | user              | Create draft, my circles             | FR-CIR-01, FR-DASH-01 |
| `GET /circles/{id}`, `PATCH /circles/{id}`                  | member, organizer | Detail, edit draft                   | FR-CIR-03             |
| `POST /circles/{id}/invites`                                | organizer         | Create invite                        | FR-MEM-01             |
| `GET /invites/{token}`, `POST /invites/{token}/accept`      | public, user      | Preview, join                        | FR-MEM-02, FR-PUB-02  |
| `PUT /circles/{id}/payout-order`                            | organizer         | Arrange or draw                      | FR-MEM-03, 04         |
| `POST /circles/{id}/activate`, `POST /circles/{id}/cancel`  | organizer         | Lifecycle                            | FR-CIR-04 to 06       |
| `GET /circles/{id}/cycles`                                  | member            | Schedule and payments (raw statuses) | FR-DASH-02            |
| `POST /payments/{id}/mark-paid`                             | member (owner)    | Mark own payment                     | FR-PAY-02             |
| `POST /payments/{id}/confirm`, `/reject`, `/record`         | organizer         | Confirm, reject, record              | FR-PAY-03, 04         |
| `POST /cycles/{id}/payout`                                  | organizer         | Record payout                        | FR-OUT-01 to 04       |
| `GET /circles/{id}/history`                                 | organizer         | History                              | FR-AUD-02             |
| `GET /me/notifications`, `POST /me/notifications/{id}/read` | user              | Notifications                        | FR-NOT-01, 02         |

Error types (suffix of `https://gam3iya.example/errors/`): `unauthenticated` (401), `forbidden` (403), `not-found` (404, also for out-of-scope), `invalid-transition` (409), `idempotency-conflict` (409), `validation-error` (422), `rate-limited` (429).

### Mock behavior requirements

| ID      | Requirement                                                                                                                              |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| MOCK-01 | State persists in `localStorage` under a versioned key; "Reset demo data" in settings restores the seed                                  |
| MOCK-02 | Configurable latency (default 300 to 800 ms) and failure injection (query parameter or settings toggle)                                  |
| MOCK-03 | Handlers enforce BR-05, BR-07, role checks, and idempotency exactly as a real backend must, so screens are built against honest behavior |
| MOCK-04 | Seed matches PRD Appendix A: Mona's 10-member circle, Karim as member, one late payment, one unconfirmed payment                         |

## 7. Data requirements

Entities: user, circle, membership, invite, cycle, payment, payout, history entry, notification. Schemas live in `packages/contracts` and are parsed at every boundary (API responses and form input).

## 8. Traceability matrix

| PRD story               | Requirements                       | Screens       | Work packages      |
| ----------------------- | ---------------------------------- | ------------- | ------------------ |
| A1 to A3                | FR-AUTH-01 to 08                   | S02, S10      | 3.7, 1.3           |
| B1                      | FR-CIR-01 to 03                    | S04           | 2.8                |
| B2                      | FR-MEM-01, 02                      | S05, S12      | 3.8                |
| B3                      | FR-MEM-03, 04                      | S05           | 3.8                |
| B4                      | FR-CIR-04, 05                      | S05, S06      | 3.8                |
| C1                      | FR-PAY-02, 05, 07                  | S06, S07      | 2.7, 3.5           |
| C2                      | FR-PAY-03, 04                      | S08           | 3.5, 3.9           |
| C3                      | FR-PAY-06                          | S06, S08      | 2.3, 3.9           |
| C4                      | FR-OUT-01 to 04                    | S08           | 3.9                |
| C5 (P1)                 | FR-PAY-08                          | S08           | stretch            |
| D1, D2                  | FR-DASH-01 to 03                   | S03, S06, S08 | 3.9                |
| D3                      | FR-NOT-01, 02                      | S09           | 3.10               |
| G3                      | FR-AUD-01, 02                      | S13           | 3.10               |
| E1 to E3                | FR-UI-01 to 04, NFR-A11Y, NFR-I18N | all           | 1.x, 3.6, 4.4, 4.5 |
| Landing, invite preview | FR-PUB-01, 02                      | S01, S12      | 5.1, 5.2           |
