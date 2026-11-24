# Stitch prompt pack: Gam3iya UI and UX

How to use: generate **one screen per prompt**, in this order. Paste Part A first (project context), upload or paste Part B as the design system (`DESIGN.md`), then run the screen prompts in Part C. Refine with Part D. Judge every screen with Part E before it goes to Figma.

Stitch is the generator; **Figma is the source of truth** (ADR-008). Never paste Stitch code into the repo.

---

## Part A: Master prompt (paste first)

```
Design a mobile-first responsive web app called "Gam3iya" (جمعيتي), a shared ledger for
rotating savings circles ("gam'iya") in Egypt. A group of friends or colleagues each pay a fixed
amount every month; each cycle one member receives the whole pot until everyone has received it.
The app does NOT move money. It records who reported paying, lets the organizer confirm, and shows
everyone the same schedule so there are no disputes.

Users:
- Mona, 38, accountant, the ORGANIZER of a 12-member monthly circle. Wants setup in minutes and
  one place to see who paid.
- Karim, 26, engineer, a MEMBER of two circles. Wants to know when and how much to pay, mark his
  payment, and see when he receives the pot.

Platform: mobile first at 360 px width, then tablet (768) and desktop (1280). Most users open the
app from a WhatsApp link on a mid-range Android phone.

Languages: Arabic and English. Arabic is first-class: design every screen in right-to-left
Arabic as well as left-to-right English. Mirror layout and directional icons only.
Currency: Egyptian pounds shown as "١٬٠٠٠٫٥٠ ج.م" in Arabic and "EGP 1,000.50" in English.
Dates use the Cairo calendar date, e.g. "5 Nov 2026" / "٥ نوفمبر ٢٠٢٦".

Tone: calm, trustworthy, friendly, community-oriented. Not fintech-flashy, no gradients, no stock
photos, no crypto look. Think of a well-kept paper notebook made clear and shared.

UX principles:
1. One obvious primary action per screen (for example "Mark as paid").
2. Every status is shown by icon AND text, never color alone.
3. Show the full state of the circle at a glance; the organizer should never need to ask
   "who has not paid?".
4. Every list needs loading (skeleton), empty, and error states.
5. Touch targets at least 44 px; text contrast at least 4.5:1; visible focus states.

Use realistic data. Members: منى أحمد (Mona Ahmed), كريم سمير (Karim Samir), نور حسن (Nour Hassan),
يوسف عادل (Youssef Adel), هبة مصطفى (Heba Mostafa), عمر خالد (Omar Khaled). Include one very long
Arabic name to test wrapping. Circle: "جمعية الشغل" (Work Circle), 10 members, EGP 1,000 per cycle,
monthly, starts 5 Nov 2026, 3 grace days, pot EGP 10,000.
```

## Part B: DESIGN.md (design system)

```markdown 
# Gam3iya design system

## Principles

Calm, clear, trustworthy. Generous spacing, strong hierarchy, one primary action per screen.

## Color (verify contrast with a checker before use)

- Primary: #0B6E63 (deep teal). Text on primary: #FFFFFF.
- Primary soft background: #E3F1EE.
- Surface: #FFFFFF. Page background: #FAF8F4 (warm off-white). Border: #E5E1D8.
- Text: #1B1F23. Muted text: #5B6470 (at least 4.5:1 on surface).
- Status (always with icon and text):
  - Confirmed: #1F7A45 on #E4F4EA, check-circle icon.
  - Marked as paid (waiting for organizer): #1D4ED8 on #E6EEFF, clock icon.
  - Pending: #5B6470 on #EEF0F2, circle icon.
  - Late: #B42318 on #FDECEA, alert-triangle icon.
  - Accent (highlight for "your payout turn"): #E8A33D with dark text #3A2A05.

## Typography

- Family: IBM Plex Sans Arabic (supports Arabic and Latin).
- Scale: 12 caption, 14 body-small, 16 body, 18 subtitle, 22 title, 28 display.
- Weights: 400 regular, 600 semibold. Line height 1.5 body, 1.3 titles.
- Numbers: tabular figures for money and dates.

## Spacing and shape

- 4 px grid; common steps 8, 12, 16, 24, 32.
- Radius: 12 for cards and inputs, 999 for badges and chips.
- Elevation: borders first; one soft shadow for dialogs only.
- Minimum touch target 44 x 44 px; mobile screen padding 16 px.

## Components

Button (primary, secondary, ghost, destructive; sizes md 44 px, lg 52 px), Input with label above
and helper or error text below, Select, Segmented control, Tabs, Card, List item with leading
avatar and trailing status badge, Status badge, Progress bar with text "3 of 10 cycles", Bottom
navigation (Circles, Notifications, Settings) on mobile, Side navigation on desktop, Dialog (bottom
sheet on mobile), Toast, Skeleton, Empty state with illustration-free icon and one action.

## RTL rules

Mirror layout, progress direction, and chevrons; do not mirror logos, check marks, or numbers.
Use logical start and end, never left and right.
```

## Part C: Screen prompts

Run each separately after Parts A and B. Replace nothing; they carry the story IDs.

**S01 Landing** (all stories)

```
Landing page for Gam3iya. Hero: headline "Run your gam'iya without the notebook" (Arabic: "أدِر جمعيتك بدون الدفتر"),
one-line subtitle stating the app does not handle money, primary button "Start a circle", secondary
"See a demo". Below: three short blocks (Everyone sees the same schedule / Mark and confirm payments /
Never argue about who paid), a "How it works" 3-step strip, a trust note "Gam3iya records. It never
holds your money.", footer with language switch. Mobile first, then desktop.
```

**S02 Register and login** (A1, A2)

```
Register and login on one screen with a segmented control to switch. Fields: display name (register
only), email, password with show/hide and a rule hint "At least 10 characters". Inline error states
shown for: email already used, password too short. Primary button full width. Below: "Continue as demo:
Mona (organizer) / Karim (member)" two secondary buttons. Language switch top corner.
```

**S03 My circles** (D1)

```
Home screen after sign in: "My circles". List of circle cards, each with name, role badge (Organizer or
Member), progress "Cycle 3 of 10", next due date and amount for me, and a status badge. A highlighted
card for "Your payout turn is cycle 6, 5 Apr 2027". Floating primary action "New circle". Bottom
navigation. Also design the empty state ("No circles yet") with one action, and a loading skeleton.
Desktop: two-column cards with side navigation.
```

**S04 Create circle wizard** (B1, B3)

```
Four-step wizard with a step indicator "Step 2 of 4". Step 1 Basics: circle name. Step 2 Money:
contribution in EGP, member count (2 to 30) with stepper. Step 3 Schedule: cycle length (weekly,
biweekly, monthly), start date, grace days 0 to 7 (default 3). Step 4 Payout order: choose "I will
arrange the order" or "Random draw", and a summary card showing the pot (EGP 10,000) and the number
of cycles. Show validation errors on step 2 (member count 31 rejected). Sticky bottom bar with Back and
Next. Draw the screens for steps 2 and 4 in detail.
```

**S05 Circle in draft: members and invite** (B2, B3, B4)

```
Circle in DRAFT. Header with circle name and a "Draft" badge. Section "Members 7 of 10" as a list
with avatars and payout position numbers; arranged order uses Move up and Move down buttons (no drag).
Section "Invite": link with expiry "Expires in 7 days", Copy button, Share button. Bottom primary
button "Activate circle" disabled with the helper text "3 members still needed". Also show the
activated-state variant with the order locked and a lock icon.
```

**S06 Circle detail** (D1, D2)

```
Active circle detail. Header: name, progress "Cycle 3 of 10", pot EGP 10,000. Tabs: Overview,
Schedule, Members, History. Overview: a "Next due" card with amount, date and the one primary action
"Mark as paid" for the member, a card for "Your payout turn". Schedule tab: table or list of 10 cycles
with due date, recipient, and my status badge. A cycle I am late for shows the Late badge. Design for
member view; note that the organizer sees extra actions.
```

**S07 Member payment sheet** (C1, C3)

```
Bottom sheet opened from "Mark as paid": cycle 3, amount EGP 1,000, due 5 Jan 2027, optional note
field, primary "I paid", secondary "Cancel". Then a success state ("Marked as paid. Waiting for Mona to
confirm") and an error state ("Could not save. Try again") with a retry button. Include a late variant
of the header that says "Late since 9 Nov".
```

**S08 Organizer cycle view** (C2, C4, D2)

```
Organizer view for cycle 3. Summary bar: "Confirmed 6 · Marked 2 · Pending 1 · Late 1" with icons. List of
members, each with status badge and the right action: Confirm and Reject (marked), Record payment
(pending or late). Reject opens a dialog with a required reason field. Bottom card "Record payout to
Heba: EGP 10,000". When someone has not confirmed, the payout dialog warns "2 payments are not
confirmed" and requires a reason. Desktop: table with row actions.
```

**S09 Notifications** (D3)

```
Notifications list grouped by Today and Earlier. Items: "Payment due in 2 days: EGP 1,000, Work Circle",
"Your payment is late", "Mona confirmed your payment". Unread items have a dot and a bold title; a
"Mark all as read" action. Empty and loading states.
```

**S10 Settings** (A3)

```
Settings: profile (display name, email), language segmented control (العربية / English) with a live
preview note, "Sign out", and a Developer section with "Reset demo data" and "Simulate slow network".
```

**S11 States kit** (E3)

```
A sheet of reusable states: skeleton for a list of cards, skeleton for a table, empty state for circles,
empty state for notifications, inline error with retry button, full-screen error, 404 page, offline
banner, and a toast for success and for error. Keep illustration-free, icon plus text.
```

**S12 Invite landing** (B2)

```
Landing for an invite link. Shows only: circle name, "10 members · EGP 1,000 monthly · starts 5 Nov
2026". Primary "Join this circle" (asks to sign in if needed). Variants: link expired, circle full,
already activated. Do not show any member names.
```

**S13 History** (G3)

```
Organizer history for a circle: chronological list of entries "Mona confirmed Karim's payment, cycle 3",
"Payout recorded to Heba with reason: 1 payment unconfirmed" (flagged with a warning icon), each with
time and actor. Filter by cycle. Read-only. Empty and loading states.
```

## Part D: Refinement prompts

Write your own second-round prompts (Esraa), then compare with these:

- **RTL fix:** "Redo this screen in right-to-left Arabic. Mirror layout and chevrons, keep numbers and check marks unmirrored, use logical start and end alignment. Do not translate numbers into English digits."
- **Long text:** "Replace the member names with very long Arabic and English names and show how rows wrap without breaking the layout."
- **Density:** "Reduce vertical spacing by 20% but keep touch targets at 44 px."
- **States:** "Add the loading skeleton, empty, and error variants of this screen."
- **Consistency:** "Use only the colors, radii, and type scale in the design system. List any deviation."
- **Accessibility:** "Increase contrast of muted text to at least 4.5:1 and add icons to every status. Add visible focus rings on inputs and buttons."
- **Desktop:** "Show the 1280 px version with side navigation and a two-column layout."

## Part E: Checklists

### Critique checklist (before Figma)

- [ ] One obvious primary action
- [ ] Statuses use icon and text
- [ ] Contrast of text and status colors checked (4.5:1)
- [ ] Touch targets at least 44 px
- [ ] Arabic version exists and reads right-to-left correctly; numbers and currency format correct
- [ ] Long names wrap; nothing overflows at 360 px
- [ ] Realistic data matches PRD Appendix A (pot EGP 10,000, due 5 Nov 2026)
- [ ] The screen never implies the app moves money

### Design Ready checklist (before coding a screen)

- [ ] Story IDs annotated on the frame
- [ ] Loading, empty, error, and (where relevant) disabled states exist
- [ ] 360 px frame, plus 768 and 1280 px for S03, S06, S08
- [ ] Arabic (RTL) and English frames
- [ ] Colors, spacing, radius, and text use Figma variables and styles only
- [ ] Components are real components with variants; auto layout throughout
- [ ] Interaction notes: what happens on tap, on error, on success
- [ ] Focus order and heading order noted
- [ ] Mentor sign-off recorded in `design/design-decisions.md`
