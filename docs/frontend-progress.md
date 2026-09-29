# Frontend Completion Progress — ShreeRam Milks

## Purpose

This file is the single progress tracker for completing and freezing the customer frontend.

Codex must read this file before frontend work and update it only after work is actually implemented and verified.

Do not mark an item complete merely because:
- a file exists
- a route renders
- text is visible
- mock data is present

Mark complete only after the relevant acceptance criteria in:

```text
docs/frontend/01-screen-completion.md
docs/frontend/02-ui-refinement.md
```

have been satisfied.

---

# Phase A — Screen Completion

## Core Remaining Screens

- [x] Delivery Addresses rebuilt as feature-specific UI
- [x] Add Address flow implemented
- [x] Edit Address flow implemented
- [x] Delete Address confirmation implemented
- [x] Delivery Calendar & Holds rebuilt
- [x] Calendar delivery-state legend implemented
- [x] Selected-day detail state implemented
- [x] Calendar pause/skip navigation connected
- [x] Doorstep Instructions rebuilt
- [x] Doorstep preference save feedback implemented
- [x] Help & Support rebuilt
- [x] Recent-order support entry implemented
- [x] Support issue categories implemented
- [x] FAQ experience implemented
- [x] Checkout Payment upgraded
- [x] Order Success upgraded
- [x] Edit Profile implemented
- [x] Language selector implemented and wired to i18n

## Product Decisions

- [x] Wallet / Passbook decision confirmed
- [x] Wallet implemented OR visible dead wallet affordance removed
- [x] Farm Visit decision confirmed
- [x] Farm Visit implemented OR visible dead affordance removed
- [x] Quality Reports decision confirmed
- [x] Reports implemented OR visible dead affordance removed

---

# Phase B — UI Refinement

## Typography

- [ ] Add intentional compact overline token if needed
- [ ] Add intentional badge-label token if needed
- [ ] Remove arithmetic font scaling hacks
- [ ] Fix Product Details `10% OFF` / `MOST POPULAR` label sizing
- [ ] Verify Gujarati typography and wrapping

## Bottom Navigation

- [ ] Reduce cart badge visual size
- [ ] Reduce cart badge number size
- [ ] Add sensible two-digit / `99+` behavior
- [ ] Verify badge position on Android/iOS
- [ ] Refine active/inactive nav state
- [ ] Add subtle nav interaction animation if appropriate

## Interaction Feedback

- [ ] Button press behavior consistent
- [ ] Product card press feedback
- [ ] Add/Added feedback
- [ ] Account/settings row feedback
- [ ] Selection card feedback
- [ ] Category/filter chip feedback
- [ ] Delivery-slot feedback
- [ ] Calendar/date feedback
- [ ] Payment method feedback

## Touch Targets

- [ ] Product Add control
- [ ] Quantity +/- controls
- [ ] Back buttons
- [ ] Edit/delete icons
- [ ] Category chips
- [ ] Calendar navigation
- [ ] Day selectors
- [ ] FAQ rows
- [ ] Language rows
- [ ] Bottom nav tabs

## Color / Hierarchy

- [ ] Audit overuse of solid primary fill
- [ ] Use primary tint for secondary selected states where appropriate
- [ ] Verify primary/pressed/navigation brand colors
- [ ] Resolve any unconfirmed warning/info colors before release
- [ ] Verify surface/background hierarchy
- [ ] Reduce unnecessary borders
- [ ] Verify radius semantics

## Layout Consistency

- [ ] Header heights consistent
- [ ] Back button alignment consistent
- [ ] Screen horizontal padding consistent
- [ ] Section spacing rhythm consistent
- [ ] Sticky bottom actions consistent
- [ ] Bottom-sheet styling consistent
- [ ] Small Android width QA
- [ ] Safe-area QA

## States

- [ ] Loading states audited
- [ ] Empty states audited
- [ ] Error states audited
- [ ] Disabled states audited
- [ ] Save/submission states audited
- [ ] Success feedback audited
- [ ] Retry actions audited

## Motion / Smoothness

- [ ] Motion token usage audited
- [ ] Card press motion standardized
- [ ] Selection transition standardized
- [ ] Bottom nav motion standardized
- [ ] Bottom sheet motion standardized
- [ ] No excessive/non-native screen animations
- [ ] Growing lists use FlatList/FlashList
- [ ] Avoid obvious render-time jank

## Haptics

- [ ] Haptic use decision confirmed
- [ ] If used, only meaningful actions have haptics
- [ ] No haptic spam

---

# Phase C — Architecture & Frontend Contract Audit

- [ ] No screen imports `src/mock-data/*`
- [ ] No component imports `src/mock-data/*`
- [ ] No hook imports `src/mock-data/*`
- [ ] Only services access mock data
- [ ] No screen/component performs direct `fetch()`
- [ ] Data-driven UI uses typed models
- [ ] Service contracts are future-API-friendly
- [ ] No duplicate global/server state
- [ ] TanStack Query remains server/external data layer
- [ ] Zustand remains client-only shared state
- [ ] No unnecessary dependencies introduced
- [ ] No `any`
- [ ] No committed `console.log`
- [ ] No fake production API/payment/auth success paths

---

# Phase D — Navigation & Flow QA

## Entry/Auth Mock Flow

- [ ] Launch route correct
- [ ] Onboarding correct
- [ ] Sign in correct
- [ ] OTP mock verification correct
- [ ] Location/serviceability flow correct
- [ ] Delivery setup flow correct
- [ ] Home entry correct

## Commerce

- [ ] Home → Products
- [ ] Products → Product Details
- [ ] Product Details → Cart
- [ ] Search → Product Details
- [ ] Cart → Checkout Address
- [ ] Checkout Address → Review
- [ ] Review → Payment
- [ ] Payment → Success
- [ ] Success → Track Order
- [ ] Success → Home
- [ ] Checkout cannot accidentally double-submit
- [ ] Back navigation cannot accidentally resubmit payment

## Subscription

- [ ] Product → Subscription setup
- [ ] Subscriptions list
- [ ] Manage subscription
- [ ] Vacation/pause flow
- [ ] Calendar links correctly to subscription actions

## Profile

- [ ] Profile → Orders
- [ ] Profile → Subscriptions
- [ ] Profile → Calendar
- [ ] Profile → Addresses
- [ ] Profile → Doorstep Instructions
- [ ] Profile → Settings
- [ ] Profile → Help
- [ ] Profile → Edit Profile if exposed
- [ ] Profile → Wallet if retained

## Settings

- [ ] Language action works
- [ ] Support action works
- [ ] Logout UI is intentional
- [ ] All visible settings rows either work, are disabled, or are removed
- [ ] No dead tap targets

---

# Phase E — Localization QA

- [ ] All user-facing copy migrated to i18n
- [ ] English keys complete
- [ ] Gujarati keys complete
- [ ] No untranslated fallback strings in normal flows
- [ ] Gujarati buttons do not clip
- [ ] Gujarati navigation labels do not clip
- [ ] Gujarati cards do not overflow
- [ ] Long addresses wrap correctly
- [ ] Error/success/empty copy localized

---

# Phase F — Accessibility QA

- [ ] Interactive controls have roles
- [ ] Interactive controls have useful labels
- [ ] Selected/toggled controls expose state
- [ ] Important status is not communicated only by color
- [ ] Minimum touch target respected
- [ ] Text contrast visually acceptable
- [ ] Screen-reader order is sensible for key flows
- [ ] Inputs have useful labels/placeholders
- [ ] Destructive actions are clearly announced

---

# Phase G — Android / Play Store Readiness

This phase does **not** mean the app is ready to publish. It means frontend decisions will not block release later.

## App Identity

- [ ] Final app display name identified
- [ ] Android package name confirmed
- [ ] App icon present
- [ ] Adaptive Android icon present
- [ ] Splash experience present
- [ ] No obvious development placeholder branding remains

## Permissions

- [ ] No unnecessary Android permissions requested
- [ ] Location permission, if later used, has contextual rationale
- [ ] Manual address/pincode path works without precise location
- [ ] Notification permission, if later used, is requested contextually
- [ ] App works when notification permission is denied
- [ ] Camera/photo permission is not requested at startup
- [ ] Modern picker strategy planned for profile photo if needed

## Privacy & Account Controls

- [ ] Privacy Policy route/link location planned
- [ ] Terms/Legal route/link location planned if applicable
- [ ] Support/contact is discoverable
- [ ] Logout is discoverable
- [ ] Account deletion UI location planned
- [ ] Account deletion does not falsely claim completion before backend exists
- [ ] Marketing vs transactional notification preference strategy identified
- [ ] No hidden sensitive-data collection UI

## Play Store Data Safety Dependencies

- [ ] Any analytics SDK planned for later is documented
- [ ] Any crash-reporting SDK planned for later is documented
- [ ] Any notification SDK planned for later is documented
- [ ] Any payment SDK planned for later is documented
- [ ] Any chat SDK planned for later is documented
- [ ] UI data collection matches what will eventually be declared in Data Safety

## Store Review UX

- [ ] App has a usable path even if optional permissions are denied
- [ ] No screen traps user behind optional permissions
- [ ] No fake "payment complete" production claim
- [ ] No fake "account deleted" production claim
- [ ] Support/contact experience is understandable
- [ ] Core features can be demonstrated during review
- [ ] Internal/demo debug copy can be removed/disabled for release builds

## Android Device Behavior

- [ ] Hardware back button QA
- [ ] Keyboard QA
- [ ] Safe-area/inset QA
- [ ] Small-screen QA
- [ ] App background/resume QA
- [ ] Network loss QA
- [ ] Slow image/loading QA

---

# Phase H — Pre-Admin Frontend Freeze QA

Before moving to admin-panel development:

- [ ] All Phase A items complete
- [ ] All Phase B items complete
- [ ] Architecture audit complete
- [ ] Navigation audit complete
- [ ] Localization audit complete
- [ ] Accessibility audit complete
- [ ] Android/Play Store frontend-readiness audit complete
- [ ] No intentional V1 customer screen remains missing
- [ ] No customer-visible placeholder screen remains
- [ ] No visible dead action remains
- [ ] No known high-severity UI defect remains

Verification:

```bash
npm run typecheck
npm run lint
npm run test   # when configured / applicable
```

- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Relevant tests pass
- [ ] Any pre-existing unrelated failures documented

---

# Frontend Freeze Definition

Only after all required items above are complete, mark:

```text
CUSTOMER FRONTEND PHASE 1: COMPLETE
```

At that point the next implementation sequence is:

```text
1. Admin Panel
2. Backend/API
3. Customer App API Wiring
4. Production Auth
5. Payments
6. Notifications / Messaging
7. Privacy & Account Deletion Backend
8. Play Store policy verification against current rules
9. Release build / internal testing
10. Production submission
```

Important:

Play Store policy details can change. Before actual submission, perform a fresh policy check against the current Google Play requirements rather than relying only on this development document.
