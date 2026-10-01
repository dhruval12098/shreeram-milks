# 01 — Customer Frontend Screen Completion

## Purpose

This document defines **what must exist before the ShreeRam Milks customer frontend can be considered complete**.

It is written for Codex / Claude Code / Cursor and must be used together with:

- `AGENTS.md`
- `docs/design-system.md`
- `docs/development-plan.md`
- `docs/frontend/02-ui-refinement.md`
- `docs/frontend/frontend-progress.md`

The customer app is currently in **Phase 1 — frontend + mock data** unless `src/services/apiClient.ts` performs real HTTP calls.

Do not start backend, database, AWS, Razorpay, production OTP, or admin-panel work while completing this document unless explicitly asked.

A route existing in `app/` does **not** mean the screen is complete.

A screen is complete only when its:
- information architecture
- visual hierarchy
- interaction states
- navigation
- localization
- accessibility
- empty/loading/error states where applicable
- Phase-1 mock behavior
- Play Store-safe user experience

are all intentionally implemented.

---

# 1. Mandatory Working Rules

Before changing any frontend screen, read:

```text
AGENTS.md
docs/design-system.md
docs/development-plan.md
docs/frontend/01-screen-completion.md
docs/frontend/02-ui-refinement.md
docs/frontend/frontend-progress.md
```

Follow the architecture:

```text
Screen
  ↓
Component
  ↓
Hook
  ↓
Service
  ↓
Mock Data     — Phase 1

Later:

Screen
  ↓
Component
  ↓
Hook
  ↓
Service
  ↓
API Client
  ↓
Backend
```

Never import mock JSON directly into a screen/component/hook.

Never add direct `fetch()` calls to screens.

Do not create fake backend success behavior.

---

# 2. Definition of "Frontend Complete"

The customer frontend is complete only when all of these are true:

- All intended customer routes exist.
- No visible navigation item leads to a dead screen.
- No feature is represented by a generic placeholder screen when feature-specific UX is required.
- All primary customer flows can be completed using realistic Phase-1 mock/local state.
- Every visible control either works, is intentionally disabled, or is not shown.
- All user-facing copy uses i18n.
- All visual implementation uses the existing design system.
- Every important data-driven screen supports loading, success, empty, and error states as applicable.
- Interaction polish matches `02-ui-refinement.md`.
- Accessibility baseline is present.
- Android back behavior is sensible.
- Safe-area/keyboard handling is correct.
- App launch/onboarding/auth mock flow is coherent.
- No customer-visible debug/demo wording remains unless intentionally required for internal builds.
- Play Store-facing permissions, privacy-sensitive UI, deep links, notifications, deletion/account controls, and release metadata dependencies have been identified and are not contradicted by the UI.
- Typecheck and lint pass.
- Tests pass where configured/relevant.

---

# 3. Existing Screens That Should Be Preserved, Not Rebuilt

The following areas are already comparatively strong and should be refined rather than redesigned from scratch unless a verified issue exists:

```text
Onboarding
Sign In
OTP Verification
Location / Serviceability
Delivery Slot Setup
Home
Products
Product Details
Search
Cart
Orders
Order Tracking
Subscriptions
Subscription Management
Subscription Vacation / Pause
Profile
Settings
```

Use these as visual/structural references.

Do not rewrite working architecture.

---

# 4. Delivery Addresses — Must Be Rebuilt

Current route:

```text
app/delivery-addresses.tsx
```

The current generic `ProfileDetailScreen` treatment is not sufficient.

## Required UI

Header:
- back action
- `Delivery Addresses`
- concise supportive subtitle

Address cards must clearly show:
- address type (`Home`, `Work`, `Other`)
- default badge
- recipient name
- phone number where useful
- full address
- pincode
- serviceable / not serviceable state where appropriate
- edit action
- delete action

Primary CTA:

```text
+ Add New Address
```

## Add/Edit Address

Create a proper add/edit flow using a dedicated route, modal, or bottom sheet consistent with the project.

Required fields:
- Full name
- Mobile number
- Flat / house / building
- Street / area
- Landmark
- Pincode
- City
- Address type
- Set as default

Validation:
- Indian mobile format
- six-digit pincode
- required address fields
- clear inline validation copy

Phase 1:
- persist only using local/client state
- do not connect backend
- keep service/model contracts future-ready

Deletion:
- destructive confirmation required
- default-address handling required
- no silent deletion

## Completion criteria

- Add address works.
- Edit address works.
- Delete confirmation works.
- Default state works.
- Empty-address state exists.
- Non-serviceable state has clear UI.
- Required text fields reject whitespace-only values.
- Editing a pincode recalculates local mock serviceability.
- All copy localized.
- No mock imports in screen.

---

# 5. Delivery Calendar & Holds — Must Be Rebuilt

Current route:

```text
app/delivery-calendar.tsx
```

Do not use a generic editable-row screen.

## Required UI

Header:
- Delivery Calendar
- subtitle

Calendar/date visualization:
- current month
- previous/next month controls
- today
- selected date
- scheduled
- delivered
- paused
- skipped

Provide a small legend using semantic colors.

Selected-day detail should show:
- product
- quantity
- time slot
- delivery address
- state
- relevant action

Useful actions:
- Skip this delivery
- Pause subscription
- Manage schedule

Connect vacation/pause action to the existing subscription vacation flow rather than duplicating logic.

Empty selected date:
- proper empty state

Phase 1:
- mock/local behavior only
- use service/hook if data-driven
- calendar dates must be generated from the displayed month using full dates,
  correct month length, and weekday offset; mock delivery records must match
  the full date rather than only the day number
- skip/pause actions must update shared mock/local delivery state so the
  resulting state remains consistent when revisiting the calendar

---

# 6. Doorstep Instructions — Must Be Rebuilt

Current route:

```text
app/doorstep-instructions.tsx
```

Required sections:

## Delivery handoff
Examples:
- Hand it to me
- Leave at the door
- Leave in milk box
- Leave with security

Use clear radio/selection UI.

## Quiet delivery preferences
Examples:
- Do not ring the bell
- Do not call unless required
- Notify me after delivery

## Drop location
Examples:
- Front door
- Side gate
- Milk box
- Security desk

## Additional instructions
Multiline input.

Helper copy:

> Your delivery partner will see these instructions before every delivery.

Primary CTA:

```text
Save Instructions
```

Phase 1:
- save locally
- show success acknowledgment
- clear the saved acknowledgment when the user edits the draft
- maintain future service contract shape

---

# 7. Help & Support — Must Be Rebuilt

Current route:

```text
app/help-support.tsx
```

Required structure:

## Primary support actions
- Chat with us
- Call support

Do not integrate Agora yet unless explicitly asked.

If an action is not truly connected:
- show a clearly intentional frontend state
- do not pretend a live support channel exists

## Recent order support
Show recent/current order card with:
- order number
- delivery date/time
- product summary
- `Report an issue`

## Issue categories
Examples:
- Delivery not received
- Late delivery
- Wrong product
- Quality issue
- Payment issue
- Subscription issue
- Address issue
- Other

## FAQ
Use accordion rows if appropriate:
- Delivery timing
- Subscription pause
- Payments/refunds
- Milk quality
- Changing address
- Skipping delivery

## Play Store relevance
Support/contact entry must remain easy to find because users and reviewers may look for:
- customer support
- account/deletion assistance
- privacy/contact pathways

Mock/local behavior is expected in Phase 1. FAQ and issue-category selections
must show relevant frontend content. If chat or calling is not connected, state
that clearly instead of showing unrelated support text or implying a live
connection.

---

# 8. Checkout Payment — Must Be Upgraded

Current route:

```text
app/checkout-payment.tsx
```

The current screen is too thin.

Required:
- checkout progress
- amount payable
- payment method list
- selection state
- payment reassurance
- disabled/loading state
- mock success behavior only
- carry the selected serviceable address and delivery slot through review and
  payment into the success summary; prevent continuing when no serviceable
  address is selected

Suggested methods:

```text
UPI
Credit / Debit Card
ShreeRam Wallet
```

Do not expose real payment credentials.

Do not imply payment is actually processed in Phase 1.

Do not show internal developer/demo text in the final customer UI.

A build-time development flag may show demo wording internally if needed.

---

# 9. Order Success — Must Be Upgraded

Current route:

```text
app/order-success.tsx
```

Required:
- success visual
- Order Confirmed
- order number
- delivery date
- delivery slot
- delivery address
- use the same generated mock order ID for success and tracking; show the
  checkout-selected address and delivery slot
- primary CTA: Track Order
- secondary CTA: Back Home / Continue Shopping

Do not overcrowd.

Back-stack behavior must not accidentally return the user to payment submission.

---

# 10. Edit Profile — Must Be Implemented

Recommended route:

```text
app/edit-profile.tsx
```

Required:
- avatar/photo
- full name
- mobile number
- email
- save

Phone number:
- may be read-only in Phase 1
- if change requires OTP in future, indicate appropriately rather than inventing backend logic

Photo:
- if image picking is implemented, verify permission implications
- do not request camera/photos permission unless needed
- prefer photo library only if that matches product requirement

Play Store:
- avoid requesting broad storage permissions
- use modern Android photo picker when eventually implemented

---

# 11. Language Selection — Must Be Implemented

Recommended route:

```text
app/language.tsx
```

Options:
- English
- ગુજરાતી

Must use the existing i18n system.

No second localization state system.

Changing language should visibly update UI.

Persist selection using existing client-state conventions.
In Phase 1 this means local device persistence, not backend account sync.

Profile edits should use the shared local profile state anywhere the profile
is displayed, including Settings.

---

# 12. Wallet / Passbook — Product Decision Required

The current UI exposes wallet/passbook concepts.

Before frontend freeze:

### If wallet is a real V1 feature
Create:

```text
app/wallet.tsx
```

with:
- balance
- add money CTA
- recent transactions
- transaction states
- empty state

Use:

```text
mock-data
service
hook
screen
```

Do not hardcode transaction arrays in the route.

### If wallet is not a real V1 feature
Remove or intentionally disable the entry.

Never leave a dead tappable row.

Do not invent financial business logic in Phase 1.

---

# 13. Farm Visit — Product Decision Required

If retained:
- dedicated route
- date
- time
- visitor count
- basic booking form
- mock/local submission
- clear confirmation state

If not V1:
- remove/disable entry

Do not leave fake booking completion.

---

# 14. Quality Reports — Product Decision Required

If retained:
- dedicated screen
- product/batch identification
- quality attributes
- certification/report status
- optional document CTA

Any scientific/quality values in Phase 1 must be clearly mock/demo data and must not be presented as verified production claims.

If not V1:
- remove/disable entry

---

# 15. Navigation Integrity Audit

Audit every visible action in:

```text
Home
Products
Product Details
Search
Cart
Checkout
Orders
Order Tracking
Subscriptions
Profile
Settings
Addresses
Calendar
Instructions
Support
Wallet
Language
Edit Profile
```

Every interactive element must be:
- working
- intentionally disabled
- or removed

No dead rows.

No buttons that visually imply a route but do nothing.

No route with no obvious way back.

---

# 16. i18n Completion

Move all user-facing strings to:

```text
src/locales/en.json
src/locales/gu.json
```

This includes:
- buttons
- headers
- helper copy
- placeholders
- empty states
- error states
- success messages
- dialog copy
- labels
- badges
- support text

Do not hardcode new customer-facing English text.

Gujarati layout must remain readable.

Test long translated strings for:
- clipping
- wrapping
- button overflow
- bottom navigation overflow

---

# 17. Android / Play Store UI Readiness

The frontend must be designed so Play Store integration later does not require a UX rewrite.

## Permissions

Do not request permissions simply because a library can use them.

Only request permissions when the feature actually requires them.

Potential future permissions must be tied to explicit user action:
- Notifications
- Camera
- Photos
- Location

### Location
If using location later:
- explain why before system permission prompt
- allow manual pincode/address entry
- do not block the app solely because precise location is denied

### Notifications
If push notifications are introduced:
- notification permission should be requested contextually
- provide Settings toggle
- app should still function if denied
- transactional notifications and marketing notifications should be distinguishable where practical

### Camera / Photos
Do not request at startup.
Request only when editing profile/uploading proof/etc.

---

# 18. Account and Data Controls for Play Store Readiness

If the app allows account creation/login in production, plan the UI for:
- Log out
- Account deletion / deletion request
- Privacy Policy
- Terms / Legal
- Contact Support

These do not need real backend deletion in Phase 1, but the final frontend architecture must not make them impossible to add.

Before release, account deletion requirements must be implemented both:
- in-app
- and via the required web deletion mechanism if applicable to Play policy at release time

Do not claim data is deleted unless backend deletion actually exists.

---

# 19. Privacy-Sensitive Product UX

Before release wiring:
- no OTP/token/payment detail logging
- no hidden collection of sensitive user data
- no unnecessary phone/contact/location permission
- any analytics/SDK added later must be declared in privacy/data-safety documentation

Frontend should clearly separate:
- required service data
- optional preferences
- marketing consent

---

# 20. Play Store Release Surface Requirements

Frontend work must preserve space for / identify dependencies on:

- Production app name
- App icon
- Adaptive Android icon
- Splash screen
- Package name
- Version name/code
- Privacy Policy link
- Terms link if used
- Support contact
- Account deletion entry
- Notification settings
- Language support
- Permission rationale copy
- Offline/network error states
- Update-required screen if backend later requires minimum app version

Do not hardcode release URLs until final values are provided.

---

# 21. App Lifecycle & Device Behavior

Before frontend freeze:
- Android hardware back button behaves correctly
- keyboard never hides primary form actions
- safe area works
- orientation behavior is intentional
- screens do not break on small Android devices
- dynamic text scaling does not destroy critical controls where feasible
- loading overlays do not trap users
- double-tapping a submit button does not duplicate actions
- app resumes cleanly after backgrounding

---

# 22. Final Screen Completion Acceptance Checklist

A screen may be marked complete only if:

```text
[ ] It has feature-specific UX.
[ ] It follows design-system tokens.
[ ] It uses existing components where appropriate.
[ ] It has correct information hierarchy.
[ ] It has working interactions.
[ ] It has correct navigation.
[ ] It has loading/empty/error states where applicable.
[ ] It has disabled/submitting state where applicable.
[ ] User-facing copy is localized.
[ ] Touch targets are acceptable.
[ ] Accessibility labels/roles are present.
[ ] Keyboard/safe-area behavior is correct.
[ ] It does not directly import mock data.
[ ] It does not use direct fetch.
[ ] It does not fake production integrations.
[ ] It does not require unnecessary Android permissions.
[ ] Play Store-sensitive behaviors are not contradicted by the UI.
```

---

# 23. Final Gate

Do not mark this document complete until:

```bash
npm run typecheck
npm run lint
```

and tests when configured/relevant.

After this document and `02-ui-refinement.md` are fully completed and the final QA section of `frontend-progress.md` passes, the customer frontend can be treated as **Phase-1 frontend complete** and development may move to:

```text
Admin Panel
then
Backend/API Wiring
then
Production Integrations
then
Play Store Release Validation
```
