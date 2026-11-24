# Gam3iya: Product Requirements Document (PRD) v2

Version 2.0 (frontend-first). Date: 24 November 2026. Status: proposed. Owner: Abdullah Sherdy (mentor, product owner). Builder: Esraa (student developer).
Related: [SRS](SRS.md), [Technical plan](../plan/technical-plan.md), [Milestones](../plan/milestones.md), [Stitch prompt](../design/stitch-prompt.md), [AGENTS.md](../AGENTS.md).

> **One-page brief.** Gam3iya is a shared, transparent ledger for rotating savings circles. It does not move money. For the 16 weeks of this mentorship it is a **frontend-only product**: a bilingual (Arabic and English), mobile-first React app running against a typed mock API. Design comes first (Stitch to Figma), code follows the design, every acceptance check becomes a test.

## 1. Problem and opportunity

A _gam'iya_ is a rotating savings circle common in Egypt. A group contributes a fixed amount every cycle (week or month); one member receives the whole pot each cycle until everyone has received it once. It runs on trust and is tracked today in WhatsApp messages, voice notes, and notebooks.

Pain points heard repeatedly:

- No single reliable record of who paid which cycle.
- Disputes ("I paid you on the 5th") cannot be settled.
- The organizer carries the whole burden of chasing late payers and answering "whose turn is it?".
- Payout order is contested when decided informally.

**Opportunity.** A transparent, shared ledger that makes a circle easier to run and to trust, without handling money.

## 2. Goals and non-goals

### Goals

| #   | Goal                                                                 | How we know                                                                                                            |
| --- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| G1  | An organizer can set up and run a circle without a notebook          | A new organizer creates and activates a 10-member circle in under 10 minutes (usability check)                         |
| G2  | Every member sees their own status and the full schedule at any time | Dashboard shows next due date, amount, payout turn                                                                     |
| G3  | Every financial change is explainable                                | 100% of payment and payout changes show in the history view with actor, time, and reason where required                |
| G4  | Fast and usable on a mid-range phone                                 | Lighthouse 90+ (performance, accessibility, best practices) on public pages; app shell LCP under 2.5 s on simulated 4G |
| G5  | Arabic is first-class                                                | Every P0 screen reviewed by a native reviewer in right-to-left at 360 px                                               |
| G6  | The build is a credible frontend portfolio and learning vehicle      | Deployed app, CI green, tests, case-study README, frontend system design document                                      |

### Non-goals (this version)

- **Moving money.** No payment gateway, wallet, card or bank data. The app records what members report and the organizer confirms.
- **Lending, interest, or credit scoring.** Not a financial service.
- **Legal enforcement.** The ledger supports trust; it is not a contract.
- **A real backend.** Data comes from a typed mock API (MSW) persisted in the browser. A real backend is a possible future phase, not part of this plan. The API contract is written so it can replace the mock without changing screens.
- **Native mobile apps and offline-first sync.**

## 3. Users and personas

| Persona             | Description                                                           | Needs                                                                                  |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Mona, Organizer** | 38, accountant, organizes a 12-member monthly circle among colleagues | Set-up in minutes, one place to see who paid, reminders, proof for disputes            |
| **Karim, Member**   | 26, engineer, member of two circles                                   | Know exactly when and how much to pay, mark payment done, see his payout turn          |
| **Demo viewer**     | Recruiter or interviewer opening the live demo                        | Understand the product in 2 minutes; switch between Mona and Karim without registering |

## 4. Scope and release plan

P0 required; P1 built only if on schedule; P2 future.

| Area             | P0                                                           | P1                                                               | P2                          |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- | --------------------------- |
| Account (mock)   | Register, login, silent session renewal, logout, language    | Password reset screens                                           | Social login                |
| Circle           | Create (4-step wizard), edit while draft, activate, cancel   | Duplicate a circle                                               | Swap-turn requests          |
| Members          | Invite by link, join, payout order (arranged or random draw) | Remove member in draft                                           | Replacement member          |
| Payments         | Mark paid, confirm, reject with reason, record on behalf     | Payment proof image UI; corrections UI with version history (C5) | Reliability score           |
| Payout           | Record payout, override with reason                          | Print or PDF statement                                           | Analytics                   |
| Visibility       | Dashboard, schedule, derived late status, history view       | Activity feed                                                    | Charts                      |
| Reminders        | In-app notifications derived from the schedule               |                                                                  | Email, WhatsApp share links |
| Language         | Arabic and English, RTL                                      | Arabic-Indic digits option                                       | More locales                |
| Public site (M5) | Landing page, invite preview page                            |                                                                  |                             |

## 5. User stories and acceptance checks

Each check is written so it can become an automated test before the feature is built. Story IDs appear in Figma frames, tickets, tests, and pull requests.

### 5.1 Accounts

- **A1.** As a user I can register with email and password. _Check:_ duplicate email rejected with a clear message; password under 10 characters rejected; no password is ever displayed or stored in the mock database in clear text (the mock stores a placeholder hash).
- **A2.** As a user I stay signed in and can sign out. _Check:_ an expired session is renewed silently once; after logout, protected routes redirect to login and the cache is cleared.
- **A3.** As a user I choose Arabic or English. _Check:_ the choice persists across reloads; the layout direction and all strings switch without a reload.

### 5.2 Circles and members

- **B1.** As an organizer I create a circle with name, contribution, member count (2 to 30), cycle length, start date, grace days, and payout method. _Check:_ contribution is a positive whole number of piasters (entered as EGP with up to two decimals); member count outside 2 to 30 is rejected; each step validates before "Next".
- **B2.** As an organizer I invite members with a link. _Check:_ the link shows an expiry (7 days); it cannot add more members than slots; joining after activation shows a clear refusal.
- **B3.** As an organizer I choose payout order by arranging it or by a random draw. _Check:_ the draw shows a commitment value; after activation the order is read-only.
- **B4.** As an organizer I activate the circle when all slots are filled. _Check:_ the button is disabled with an explanation while a slot is empty; activation shows the generated schedule exactly once.

### 5.3 Payments and payouts

- **C1.** As a member I mark my payment as paid. _Check:_ only my own pending payment offers the action; the UI updates optimistically and rolls back with a message on failure; double-clicking sends one request.
- **C2.** As an organizer I confirm or reject (reason required) a marked payment, or record one on a member's behalf. _Check:_ a member never sees these actions; every outcome appears in the history view.
- **C3.** As a member I see when I am late. _Check:_ lateness is derived from due date plus grace days in Cairo time and is never stored or sent by the server.
- **C4.** As an organizer I record the payout for a cycle. _Check:_ with unconfirmed payments the reason field is required and the entry is flagged in history; a second payout for the same cycle is not offered.
- **C5. (P1)** As an organizer I correct a payment after its cycle closed. _Check:_ a reason is required; a new version is shown and earlier versions stay visible.

### 5.4 Visibility and reminders

- **D1.** As a member I see my dashboard: next due date, amount, my payout cycle, circle progress. _Check:_ amounts match Appendix A.
- **D2.** As an organizer I see per-cycle status for every member (paid, marked, pending, late). _Check:_ counts on screen equal counts computed from the data.
- **D3.** As a user I see an in-app reminder two days before a due date and when a payment becomes late. _Check:_ one reminder per event; reminders can be marked read.

### 5.5 Experience quality (frontend stories)

- **E1.** As a user on a 360 px phone I can complete every P0 flow without horizontal scrolling. _Check:_ Playwright viewport test.
- **E2.** As a keyboard or screen reader user I can complete the main flow. _Check:_ axe reports no serious or critical violations; manual keyboard walkthrough passes.
- **E3.** As a user on a slow connection I see skeletons and clear error and empty states, never a blank screen. _Check:_ each data screen has loading, error, and empty variants matching the Figma states frame.

## 6. Experience principles

1. **Mobile first.** Most users open the link from WhatsApp on a phone.
2. **Arabic first-class.** RTL is designed in, not patched on.
3. **One obvious next action** on every screen ("Mark as paid").
4. **Trust through transparency.** Everyone in a circle sees the same schedule and statuses.
5. **Never lose money data.** Amounts are exact; actions are safe to retry.
6. **Status is never color alone.** Every status has an icon and text.

## 7. Screen inventory (design handoff)

Each screen is generated in Stitch, cleaned in Figma, and must be **Design Ready** before coding (see `design/stitch-prompt.md`, Part E).

| ID  | Screen                                                 | Stories         | Route                    |
| --- | ------------------------------------------------------ | --------------- | ------------------------ |
| S01 | Landing                                                | all (explainer) | `/`                      |
| S02 | Register and login                                     | A1, A2          | `/register`, `/login`    |
| S03 | My circles (home)                                      | D1              | `/circles`               |
| S04 | Create circle wizard (4 steps)                         | B1, B3          | `/circles/new`           |
| S05 | Circle in draft: members and invite                    | B2, B3, B4      | `/circles/:id/members`   |
| S06 | Circle detail: overview and schedule                   | D1, D2          | `/circles/:id`           |
| S07 | Member payment sheet (mark as paid)                    | C1, C3          | dialog on S06            |
| S08 | Organizer cycle view (confirm, reject, record, payout) | C2, C4, D2      | `/circles/:id/cycles/:n` |
| S09 | Notifications                                          | D3              | `/notifications`         |
| S10 | Settings and language                                  | A3              | `/settings`              |
| S11 | States kit: loading, empty, error, 404                 | E3              | shared                   |
| S12 | Invite landing (accept)                                | B2              | `/join/:token`           |
| S13 | History (audit) view                                   | G3              | `/circles/:id/history`   |

## 8. Success metrics

| Metric                                                                       | Target           |
| ---------------------------------------------------------------------------- | ---------------- |
| New organizer creates and activates a circle                                 | Under 10 minutes |
| Lighthouse on public pages (performance, accessibility, best practices, SEO) | 90 or higher     |
| Domain package test coverage                                                 | 90% or higher    |
| Web app coverage (components and hooks)                                      | 70% or higher    |
| Axe serious or critical violations on P0 screens                             | Zero             |
| CI duration on a pull request                                                | Under 6 minutes  |
| Explain-back passed on pull requests                                         | 100%             |

## 9. Risks and open questions

| Risk or question                                           | Response                                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Users may expect the app to move money                     | Stated on the landing page and in onboarding                                                     |
| Financial data raises trust and legal questions            | Ledger only; no card or bank data; mock data only in this phase; review before any public launch |
| Arabic copy and RTL quality                                | Native review in week 14; RTL tested from week 3                                                 |
| Realistic circle sizes and cycle lengths                   | Validate with five real organizers in week 14                                                    |
| _Decided:_ does the recipient also pay in their own cycle? | Yes, every member pays every cycle (BR-02)                                                       |

## Appendix A: Worked examples (these become tests)

**A1. Schedule.** 10 members, EGP 1,000 per cycle, monthly, start 5 November 2026, grace 3 days. 10 cycles. Cycle 1 due 5 November 2026; cycle 2 on 5 December 2026; cycle 10 on 5 August 2027. Each payout is 10 x 1,000 = EGP 10,000 (1,000,000 piasters).

**A2. Month-end clamp.** Monthly circle starting 31 January 2027: cycle 1 due 31 January, cycle 2 due 28 February 2027, cycle 3 due 31 March. Due dates are computed from the start date, never chained.

**A3. Lateness.** A payment due 5 November 2026 with 3 grace days is on time through 8 November 2026 and late from 9 November 2026 (Cairo date) if not yet confirmed.

**A4. Money.** EGP 1,000.50 is stored as 100050 piasters. Ten such payments total 1,000,500 piasters, displayed as EGP 10,005.00. No floating-point arithmetic.

**A5. Payout with an unconfirmed payment.** Nine of ten payments confirmed. Recording the payout without a reason is rejected; with a reason it succeeds and the history entry carries the reason and a flag.

**A6. Optimistic rollback.** Karim marks a payment as paid; the mock API returns 500. The badge shows "Marked" immediately, then returns to "Pending" with an error toast within one render cycle after the response; no other row changes.

**A7. Role view.** Signed in as Karim, circle S06 shows no confirm, reject, record, or payout actions anywhere. Signed in as Mona, the same circle shows them.
